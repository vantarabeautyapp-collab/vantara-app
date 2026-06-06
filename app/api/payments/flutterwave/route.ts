/**
 * POST /api/payments/flutterwave  — Initiate booking payment
 * GET  /api/payments/flutterwave  — Verify payment after redirect
 * ─────────────────────────────────────────────────────────────────────────────
 * Security:
 *  • Requires authentication (HttpOnly cookie / Bearer token)
 *  • Input validated via lib/validation.ts
 *  • SSRF protection: only calls Flutterwave's known API domain
 *  • All errors are sanitized before returning to client
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireAuth }               from '@/lib/api-auth'
import { validateFlutterwavePayment } from '@/lib/validation'

export const runtime = 'nodejs'

const FLW_API = 'https://api.flutterwave.com'

export async function POST(req: NextRequest) {
  // ── Auth guard ───────────────────────────────────────────────────────────
  const user = requireAuth(req)
  if (!user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Payment service not configured.' }, { status: 503 })
  }

  // ── Payload size guard ───────────────────────────────────────────────────
  const cl = req.headers.get('content-length')
  if (cl && parseInt(cl) > 4096) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  }

  // ── Parse + validate ─────────────────────────────────────────────────────
  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }) }

  const validated = validateFlutterwavePayment(body)
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 })
  }
  const { amount, currency, email, name, phone, description, reference, redirectUrl } = validated.data

  // ── SSRF protection: redirect URL must be our own domain ─────────────────
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vantarafrique.com'
  const safeRedirectUrl = redirectUrl ?? `${appUrl}/bookings?payment=success`

  try {
    const res = await fetch(`${FLW_API}/v3/payments`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        tx_ref:       reference,
        amount,
        currency:     currency.toUpperCase(),
        redirect_url: safeRedirectUrl,
        customer: {
          email,
          name,
          ...(phone ? { phonenumber: phone } : {}),
        },
        customizations: {
          title:       'Vantara',
          description,
          logo:        `${appUrl}/logo.png`,
        },
        meta: { source: 'vantara_app', userId: user.userId },
      }),
      signal: AbortSignal.timeout(15_000),
    })

    const data = await res.json()

    if (data.status !== 'success') {
      console.error('[Flutterwave] Payment init failed:', { status: data.status })
      return NextResponse.json({ error: 'Payment initialization failed.' }, { status: 502 })
    }

    return NextResponse.json({ url: data.data.link, reference })

  } catch (err) {
    console.error('[Flutterwave] Request error:', err instanceof Error ? err.message : 'unknown')
    return NextResponse.json({ error: 'Payment service unavailable.' }, { status: 503 })
  }
}

export async function GET(req: NextRequest) {
  // ── Auth guard ───────────────────────────────────────────────────────────
  const user = requireAuth(req)
  if (!user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  }

  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Not configured.' }, { status: 503 })
  }

  const { searchParams } = new URL(req.url)
  const status        = searchParams.get('status')
  const transactionId = searchParams.get('transaction_id')

  if (!transactionId || !/^\d+$/.test(transactionId)) {
    return NextResponse.json({ verified: false, reason: 'Invalid transaction ID.' })
  }
  if (status !== 'successful') {
    return NextResponse.json({ verified: false, reason: 'Payment not completed.' })
  }

  try {
    const res = await fetch(
      `${FLW_API}/v3/transactions/${encodeURIComponent(transactionId)}/verify`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        signal:  AbortSignal.timeout(10_000),
      },
    )
    const data = await res.json()

    if (data.data?.status === 'successful') {
      return NextResponse.json({
        verified:      true,
        txRef:         data.data.tx_ref,
        amount:        data.data.amount,
        currency:      data.data.currency,
        customerEmail: data.data.customer?.email,
      })
    }
    return NextResponse.json({ verified: false, reason: 'Verification failed.' })

  } catch {
    return NextResponse.json({ verified: false, reason: 'Verification service unavailable.' }, { status: 503 })
  }
}
