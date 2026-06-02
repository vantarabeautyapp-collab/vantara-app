import { NextRequest, NextResponse } from 'next/server'
import { City } from 'country-state-city'
import { COUNTRY_MAP } from '@/lib/africa-locations'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const country = searchParams.get('country')?.toUpperCase()
  const query = searchParams.get('q')?.toLowerCase().trim()

  if (!country) {
    return NextResponse.json({ error: 'country parameter required' }, { status: 400 })
  }

  // Only serve African countries
  if (!COUNTRY_MAP.has(country)) {
    return NextResponse.json({ error: 'Country not supported' }, { status: 400 })
  }

  const allCities = City.getCitiesOfCountry(country) ?? []

  let cities = allCities.map(c => ({
    name: c.name,
    stateCode: c.stateCode,
    latitude: c.latitude,
    longitude: c.longitude,
  }))

  // Filter by search query if provided
  if (query) {
    cities = cities.filter(c => c.name.toLowerCase().includes(query))
  }

  // Sort: exact matches first, then alphabetical
  if (query) {
    cities.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(query) ? 0 : 1
      const bStarts = b.name.toLowerCase().startsWith(query) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return a.name.localeCompare(b.name)
    })
  } else {
    cities.sort((a, b) => a.name.localeCompare(b.name))
  }

  return NextResponse.json(
    { cities: cities.slice(0, 100) }, // cap at 100 per request
    {
      headers: { 'Cache-Control': 'public, max-age=86400' },
    }
  )
}
