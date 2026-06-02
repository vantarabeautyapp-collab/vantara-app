import { NextRequest, NextResponse } from 'next/server'
import { AFRICAN_COUNTRIES, COUNTRY_MAP } from '@/lib/africa-locations'

export const runtime = 'nodejs'

// Reverse geocode lat/lon → country + city using OpenStreetMap Nominatim (free, no key needed)
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat and lon required' }, { status: 400 })
  }

  const numLat = parseFloat(lat)
  const numLon = parseFloat(lon)
  if (isNaN(numLat) || isNaN(numLon) || numLat < -90 || numLat > 90 || numLon < -180 || numLon > 180) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${numLat}&lon=${numLon}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'Vantara/1.0 (beauty marketplace)',
          'Accept-Language': 'en',
        },
        signal: AbortSignal.timeout(5000),
      }
    )

    if (!res.ok) throw new Error('Nominatim request failed')

    const data = await res.json()
    const address = data.address ?? {}

    // Extract country code
    const countryCode = (address.country_code ?? '').toUpperCase()

    // Only return result if it's an African country we support
    const country = COUNTRY_MAP.get(countryCode)
    if (!country) {
      return NextResponse.json({
        supported: false,
        message: 'Location not in a supported African country. Please select your country manually.',
      })
    }

    // Extract city name (Nominatim uses different fields depending on zoom level)
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      address.state_district ||
      ''

    return NextResponse.json({
      supported: true,
      countryCode,
      countryName: country.name,
      flag: country.flag,
      city,
      currency: country.currency,
      payments: country.payments,
    })
  } catch (err) {
    console.error('Geocode error:', err)
    return NextResponse.json({ error: 'Could not determine location. Please select manually.' }, { status: 503 })
  }
}
