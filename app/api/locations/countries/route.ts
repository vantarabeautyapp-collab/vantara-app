import { NextResponse } from 'next/server'
import { AFRICAN_COUNTRIES } from '@/lib/africa-locations'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json(
    AFRICAN_COUNTRIES.map(c => ({
      code: c.code,
      name: c.name,
      flag: c.flag,
      dialCode: c.dialCode,
      region: c.region,
      currency: c.currency,
      payments: c.payments,
    })),
    {
      headers: {
        'Cache-Control': 'public, max-age=86400', // cache 24h — country list never changes
      },
    }
  )
}
