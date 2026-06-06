/**
 * POST /api/webhooks/stripe
 * ─────────────────────────────────────────────────────────────────────────────
 * Receives Stripe webhook events, verifies the signature, and processes them.
 *
 * Events handled:
 *   checkout.session.completed       → mark subscription active
 *   customer.subscription.updated    → handle plan changes
 *   customer.subscription.deleted    → downgrade to free tier
 *   invoice.payment_failed           → track failure, notify team
 *   invoice.payment_action_required  → card requires 3DS / action
 *   payment_intent.payment_failed    → individual payment failure
 *   charge.dispute.created           → chargeback alert (critical)
 *   charge.refunded                  → refund confirmation log
 *
 * All payment failures are reported to POST /api/errors for observability
 * and Linear issue creation (high/critical events).
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3005'

/** Fire-and-forget error report — never blocks the webhook response */
async function reportPaymentEvent(params: {
  type:     string
  message:  string
  context:  Record<string, unknown>
  severity: 'low' | 'medium' | 'high' | 'critical'
}) {
  try {
    await fetch(`${APP_URL}/api/errors`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type:     params.type,
        message:  params.message,
        context:  params.context,
        severity: params.severity,
        url:      '/api/webhooks/stripe',
      }),
      signal: AbortSignal.timeout(5_000),
    })
  } catch { /* best-effort */ }
}

export async function POST(req: NextRequest) {
  const stripeKey     = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const body = await req.text()
  const sig  = req.headers.get('stripe-signature') ?? ''

  let event: any
  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey)
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('[Stripe Webhook] Signature verification failed:', err.message)
    void reportPaymentEvent({
      type:     'stripe_webhook_signature_failed',
      message:  `Webhook signature verification failed: ${err.message}`,
      context:  { sigHeader: sig?.slice(0, 50) },
      severity: 'high',
    })
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`[Stripe Webhook] ${event.type} (id: ${event.id})`)

  switch (event.type) {

    // ── Successful checkout ─────────────────────────────────────────────────
    case 'checkout.session.completed': {
      const session = event.data.object
      const { businessId, plan, userId } = session.metadata ?? {}
      console.log(`[Stripe] ✅ Checkout completed: business=${businessId} plan=${plan} user=${userId}`)
      // TODO: Update business planTier in Convex when Convex is configured
      break
    }

    // ── Subscription updated ────────────────────────────────────────────────
    case 'customer.subscription.updated': {
      const sub = event.data.object
      console.log(`[Stripe] 🔄 Subscription updated: ${sub.id} status=${sub.status}`)
      break
    }

    // ── Subscription cancelled ──────────────────────────────────────────────
    case 'customer.subscription.deleted': {
      const sub = event.data.object
      const { businessId } = sub.metadata ?? {}
      console.log(`[Stripe] ❌ Subscription cancelled: ${sub.id} business=${businessId}`)
      // TODO: Downgrade business to free tier in DB
      break
    }

    // ── Invoice payment failed ──────────────────────────────────────────────
    case 'invoice.payment_failed': {
      const invoice      = event.data.object
      const attemptCount = invoice.attempt_count ?? 1
      const amountDue    = invoice.amount_due   ?? 0
      const currency     = invoice.currency     ?? ''

      console.error(
        `[Stripe] 💳 Payment FAILED: invoice=${invoice.id} amount=${amountDue} ${currency} ` +
        `attempt=${attemptCount} customer=${invoice.customer}`,
      )

      void reportPaymentEvent({
        type:     'payment_failed',
        message:  `Invoice payment failed (attempt ${attemptCount}): ${amountDue} ${currency.toUpperCase()}`,
        context: {
          invoiceId:         invoice.id,
          customerId:        invoice.customer,
          customerEmail:     invoice.customer_email,
          subscriptionId:    invoice.subscription,
          amountDue,
          currency,
          attemptCount,
          billingReason:     invoice.billing_reason,
          nextPaymentAttempt: invoice.next_payment_attempt,
        },
        severity: attemptCount >= 3 ? 'critical' : 'high',
      })
      // TODO: Trigger dunning email via Resend/SendGrid
      break
    }

    // ── 3DS / authentication required ──────────────────────────────────────
    case 'invoice.payment_action_required': {
      const invoice = event.data.object
      console.warn(`[Stripe] ⚠️ 3DS action required: invoice=${invoice.id} customer=${invoice.customer}`)
      void reportPaymentEvent({
        type:     'payment_action_required',
        message:  `Payment requires customer action (3DS): invoice ${invoice.id}`,
        context:  { invoiceId: invoice.id, customerId: invoice.customer },
        severity: 'medium',
      })
      break
    }

    // ── PaymentIntent failure ───────────────────────────────────────────────
    case 'payment_intent.payment_failed': {
      const pi             = event.data.object
      const failureCode    = pi.last_payment_error?.code    ?? 'unknown'
      const failureMessage = pi.last_payment_error?.message ?? 'Unknown reason'

      console.error(
        `[Stripe] 💳 PaymentIntent FAILED: ${pi.id} code=${failureCode} — ${failureMessage}`,
      )

      void reportPaymentEvent({
        type:     'payment_intent_failed',
        message:  `Payment intent failed: ${failureCode} — ${failureMessage}`,
        context: {
          paymentIntentId: pi.id,
          amount:          pi.amount,
          currency:        pi.currency,
          failureCode,
          failureMessage,
          customerId:      pi.customer,
        },
        severity: 'high',
      })
      break
    }

    // ── Chargeback / dispute ────────────────────────────────────────────────
    case 'charge.dispute.created': {
      const dispute = event.data.object
      console.error(
        `[Stripe] 🚨 DISPUTE: ${dispute.id} amount=${dispute.amount} ${dispute.currency} reason=${dispute.reason}`,
      )

      void reportPaymentEvent({
        type:     'chargeback_created',
        message:  `Chargeback dispute: ${dispute.amount} ${dispute.currency?.toUpperCase()} reason=${dispute.reason}`,
        context: {
          disputeId:  dispute.id,
          chargeId:   dispute.charge,
          amount:     dispute.amount,
          currency:   dispute.currency,
          reason:     dispute.reason,
          status:     dispute.status,
          dueBy:      dispute.evidence_details?.due_by,
        },
        severity: 'critical',
      })
      break
    }

    // ── Refund ──────────────────────────────────────────────────────────────
    case 'charge.refunded': {
      const charge = event.data.object
      console.log(`[Stripe] 💰 Refund: charge=${charge.id} refunded=${charge.amount_refunded}`)
      break
    }

    default:
      // Log unhandled events at debug level so new events don't get silently dropped
      console.log(`[Stripe Webhook] Unhandled event: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
