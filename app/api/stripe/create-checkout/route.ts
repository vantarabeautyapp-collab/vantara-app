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
 */

import { NextRequest, NextResponse } from 'next/server'
import { toUSD } from '@/lib/payments'

export const runtime = 'nodejs'

const PLANS = {
  premium: {
    name:        'Vantara Premium',
    priceKES:    4999,   // KES/month (updated pricing)
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

export async function POST(req: NextRequest) {
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

  const planData = PLANS[plan as keyof typeof PLANS]
  const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vantarafrique.com'

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey)

    // Determine payment methods based on country
    // M-Pesa via Stripe is available for Kenya (requires Stripe M-Pesa beta)
    const isKenya = countryCode.toUpperCase() === 'KE'
    const paymentMethodTypes: any[] = ['card', 'link']
    // Uncomment when your Stripe account has M-Pesa enabled:
    // if (isKenya) paymentMethodTypes.push('m_pesa')

    // Use KES billing for Kenyan businesses, USD for others
    const useLocalCurrency = isKenya && stripeKey.includes('live') // KES requires live mode
    const currency    = useLocalCurrency ? 'kes' : 'usd'
    const unitAmount  = useLocalCurrency
      ? planData.priceKES * 100   // KES in cents
      : planData.priceUSD * 100   // USD in cents

    const session = await stripe.checkout.sessions.create({
      mode:                 'subscription',
      payment_method_types: paymentMethodTypes,
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
      },
      subscription_data: {
        metadata: { businessId, plan },
        trial_period_days: 14, // 14-day free trial
      },
      success_url: `${appUrl}/business/settings?upgraded=1&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${appUrl}/business/settings?cancelled=1`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })

  } catch (err: any) {
    console.error('[Stripe] Checkout error:', err)
    return NextResponse.json(
      { error: err.message ?? 'Payment session could not be created. Please try again.' },
      { status: 500 },
    )
  }
}
