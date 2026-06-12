import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'

// Next.js inserts URL strings into <loc> XML elements without escaping special characters.
// Pre-escape & → &amp; so the sitemap XML is well-formed and passes Google/Bing validation.
function loc(url: string): string {
  return url.replace(/&/g, '&amp;')
}

const SALON_IDS = ['b1', 'b2', 'b3', 'b4', 'b5']

const SERVICE_CATEGORIES = [
  'barbershop',
  'hair-salon',
  'nail-studio',
  'makeup-artist',
  'braiding',
  'skincare',
  'locs',
  'bridal-makeup',
]

const CITIES = [
  'nairobi',
  'kampala',
  'dar-es-salaam',
  'lagos',
  'accra',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: loc(BASE),                       lastModified: now, changeFrequency: 'daily',   priority: 1.00 },
    { url: loc(`${BASE}/search`),           lastModified: now, changeFrequency: 'daily',   priority: 0.95 },
    { url: loc(`${BASE}/about`),            lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: loc(`${BASE}/register`),         lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: loc(`${BASE}/login`),            lastModified: now, changeFrequency: 'monthly', priority: 0.60 },
    { url: loc(`${BASE}/privacy-policy`),   lastModified: now, changeFrequency: 'yearly',  priority: 0.30 },
    { url: loc(`${BASE}/terms`),            lastModified: now, changeFrequency: 'yearly',  priority: 0.30 },
  ]

  const categoryPages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map(cat => ({
    url:             loc(`${BASE}/search?category=${cat}`),
    lastModified:    now,
    changeFrequency: 'daily' as const,
    priority:        0.85,
  }))

  const cityPages: MetadataRoute.Sitemap = CITIES.map(city => ({
    url:             loc(`${BASE}/search?city=${city}`),
    lastModified:    now,
    changeFrequency: 'daily' as const,
    priority:        0.85,
  }))

  // & between query params is escaped to &amp; via loc() — required for valid XML
  const cityCategCombo: MetadataRoute.Sitemap = CITIES.flatMap(city =>
    SERVICE_CATEGORIES.map(cat => ({
      url:             loc(`${BASE}/search?city=${city}&category=${cat}`),
      lastModified:    now,
      changeFrequency: 'weekly' as const,
      priority:        0.75,
    }))
  )

  const salonPages: MetadataRoute.Sitemap = SALON_IDS.map(id => ({
    url:             loc(`${BASE}/salon/${id}`),
    lastModified:    now,
    changeFrequency: 'weekly' as const,
    priority:        0.70,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...cityPages,
    ...cityCategCombo,
    ...salonPages,
  ]
}
