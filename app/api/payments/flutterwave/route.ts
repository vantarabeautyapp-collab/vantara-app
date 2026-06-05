/**
 * POST /api/payments/flutterwave
 * Creates a Flutterwave standard payment link.
 * Used for booking payments in Nigeria, Ghana, Uganda, Tanzania, South Africa, etc.
 *
 * Required env vars:
 *   FLUTTERWAVE_SECRET_KEY             — e.g. FLWSECK_TEST-xxxx or FLWSECK_LIVE-xxxx
 *   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY — e.g. FLWPUBK_TEST-xxxx
 *
 * Docs: https://developer.flutterwave.com/reference/standard
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface FlutterwavePayload {
  amount:       number
  currency:     string
  email:        string
  name:         string
  phone?:       string
  description:  string
  reference:    string   // unique tx ref
  redirectUrl?: string
  meta?:        Record<string, string>
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Flutterwave not configured' }, { status: 503 })
  }

  let body: FlutterwavePayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const {
    amount, currency, email, name, phone, description, reference, redirectUrl, meta
  } = body

  if (!amount || !currency || !email || !name || !reference) {
    return NextResponse.json({ error: 'Missing required fields: amount, currency, email, name, reference' }, { status: 400 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://vantarafrique.com'

  try {
    const res = await fetch('https://api.flutterwave.com/v3/payments', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        tx_ref:        reference,
        amount,
        currency:      currency.toUpperCase(),
        redirect_url:  redirectUrl ?? `${appUrl}/bookings?payment=success`,
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
        meta: {
          source: 'vantara_app',
          ...meta,
        },
      }),
      signal: AbortSignal.timeout(15_000),
    })

    const data = await res.json()

    if (data.status !== 'success') {
      console.error('[Flutterwave] Payment init failed:', data)
      return NextResponse.json(
        { error: data.message ?? 'Payment initialization failed' },
        { status: 502 },
      )
    }

    return NextResponse.json({ url: data.data.link, reference })

  } catch (err: any) {
    console.error('[Flutterwave] Request error:', err)
    return NextResponse.json(
      { error: err.message ?? 'Payment service unavailable' },
      { status: 500 },
    )
  }
}

/**
 * GET /api/payments/flutterwave?tx_ref=xxx&status=successful
 * Verify a payment after Flutterwave redirect (webhook-style verification).
 */
export async function GET(req: NextRequest) {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const { searchParams } = new URL(req.url)
  const txRef            = searchParams.get('tx_ref')
  const status           = searchParams.get('status')
  const transactionId    = searchParams.get('transaction_id')

  if (status !== 'successful' || !transactionId) {
    return NextResponse.json({ verified: false, reason: 'Payment not successful' })
  }

  try {
    const res = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
        signal:  AbortSignal.timeout(10_000),
      },
    )
    const data = await res.json()

    if (data.data?.status === 'successful') {
      return NextResponse.json({
        verified:    true,
        txRef:       data.data.tx_ref,
        amount:      data.data.amount,
        currency:    data.data.currency,
        customerEmail: data.data.customer?.email,
      })
    }
    return NextResponse.json({ verified: false, reason: 'Verification failed' })

  } catch (err: any) {
    return NextResponse.json({ verified: false, reason: err.message }, { status: 500 })
  }
}
