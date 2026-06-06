/**
 * POST /api/stripe/create-checkout
 * Creates a Stripe Checkout session for business subscription plans.
 *
 * Supports:
 *   - Card (global)
 *   - M-Pesa (Kenya — requires Stripe M-Pesa beta access, falls back to card only)
 *   - Link (Stripe's 1-click checkout)
 *
 * For African booking payments (one-time), use /api/payments/flutterwave instead.
 *
 * Security:
 *   - Requires authentication (HttpOnly cookie / Bearer token)
 *   - Requires role === 'business'
 *   - Errors reported to /api/errors for observability
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireRole }  from '@/lib/api-auth'

export const runtime = 'nodejs'

const PLANS = {
  premium: {
    name:        'Vantara Premium',
    priceKES:    4999,   // KES/month
    priceUSD:    39,     // USD/month for international billing
    description: 'Verified badge · Featured placement · Unlimited bookings · Analytics · Staff management · Promotions tool',
    features:    ['Verified badge', 'Priority listing', 'Unlimited bookings', 'Booking analytics', 'WhatsApp integration', 'Up to 5 staff'],
  },
  elite: {
    name:        'Vantara Elite',
    priceKES:    9999,
    priceUSD:    79,
    description: 'Elite badge · Top search placement · Full analytics · API access · Unlimited staff · Dedicated support',
    features:    ['Elite badge', 'Top search placement', 'Full analytics suite', 'API access', 'Unlimited staff', 'Dedicated support'],
  },
} as const

/** Fire-and-forget error report to our error ingestion API */
async function reportStripeError(params: {
  message:  string
  context:  Record<string, unknown>
  severity: 'medium' | 'high' | 'critical'
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3005'
  try {
    await fetch(`${appUrl}/api/errors`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type:     'stripe_error',
        message:  params.message,
        context:  params.context,
        severity: params.severity,
        url:      '/api/stripe/create-checkout',
      }),
      signal: AbortSignal.timeout(5_000),
    })
  } catch { /* best-effort — never block the response */ }
}

export async function POST(req: NextRequest) {
  // ── Auth guard — must be a business account ─────────────────────────────
  const authUser = requireRole(req, ['business'])
  if (!authUser) {
    return NextResponse.json(
      { error: 'Authentication required. Please sign in as a business account.' },
      { status: 401 },
    )
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'Payment not configured. Please contact support.' }, { status: 503 })
  }

  let body: { plan: string; businessId: string; countryCode?: string; email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { plan, businessId, countryCode = 'KE', email } = body

  if (!plan || !(plan in PLANS)) {
    return NextResponse.json({ error: 'Invalid plan. Choose premium or elite.' }, { status: 400 })
  }

  if (!businessId) {
    return NextResponse.json({ error: 'businessId is required' }, { status: 400 })
  }

  // Verify the authenticated user owns this business
  if (authUser.userId !== businessId) {
    void reportStripeError({
      message:  'Business ID mismatch — possible IDOR attempt',
      context:  { requestedBusinessId: businessId, authenticatedUserId: authUser.userId },
      severity: 'high',
    })
    return NextResponse.json({ error: 'Unauthorized business account.' }, { status: 403 })
  }

  const planData = PLANS[plan as keyof typeof PLANS]
  const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vantarafrique.com'

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey)

    // Determine payment methods based on country
    const isKenya = countryCode.toUpperCase() === 'KE'
    const paymentMethodTypes: string[] = ['card', 'link']
    // Uncomment when your Stripe account has M-Pesa enabled:
    // if (isKenya) paymentMethodTypes.push('m_pesa')

    // Use KES billing for Kenyan businesses in live mode; USD otherwise
    const useLocalCurrency = isKenya && stripeKey.includes('live')
    const currency    = useLocalCurrency ? 'kes' : 'usd'
    const unitAmount  = useLocalCurrency
      ? planData.priceKES * 100
      : planData.priceUSD * 100

    const session = await stripe.checkout.sessions.create({
      mode:                 'subscription',
      payment_method_types: paymentMethodTypes as any,
      billing_address_collection: 'auto',
      ...(email ? { customer_email: email } : {}),
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name:        planData.name,
              description: planData.description,
              metadata: {
                plan,
                features: planData.features.join(', '),
              },
            },
            unit_amount: unitAmount,
            recurring:   { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      metadata: {
        businessId,
        plan,
        countryCode,
        userId: authUser.userId,
      },
      subscription_data: {
        metadata: { businessId, plan, userId: authUser.userId },
        trial_period_days: 14, // 14-day free trial
      },
      success_url: `${appUrl}/business/settings?upgraded=1&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${appUrl}/business/settings?cancelled=1`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })

  } catch (err: any) {
    const stripeCode    = err?.code     ?? 'unknown'
    const stripeType    = err?.type     ?? 'unknown'
    const stripeMessage = err?.message  ?? 'Stripe error'

    console.error('[Stripe] Checkout session creation failed:', {
      code:    stripeCode,
      type:    stripeType,
      message: stripeMessage,
      plan,
      businessId,
    })

    // Report to error tracker
    void reportStripeError({
      message:  `Stripe checkout session creation failed: ${stripeMessage}`,
      context:  {
        stripeCode,
        stripeType,
        plan,
        businessId,
        countryCode,
        userId: authUser.userId,
      },
      severity: stripeCode === 'rate_limit' ? 'medium' : 'high',
    })

    return NextResponse.json(
      { error: 'Payment session could not be created. Please try again.' },
      { status: 500 },
    )
  }
}
