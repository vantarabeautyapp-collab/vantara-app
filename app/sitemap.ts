import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'

// Public salon IDs — add real IDs from DB as the platform grows
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

  // ── Core public pages — highest priority ───────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:             BASE,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        1.0,
    },
    {
      url:             `${BASE}/search`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.95,
    },
    {
      url:             `${BASE}/about`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.85,
    },
    {
      url:             `${BASE}/register`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.75,
    },
    {
      url:             `${BASE}/login`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${BASE}/privacy-policy`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
    {
      url:             `${BASE}/terms`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
  ]

  // ── Category search pages — high SEO value ─────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map(cat => ({
    url:             `${BASE}/search?category=${cat}`,
    lastModified:    now,
    changeFrequency: 'daily' as const,
    priority:        0.85,
  }))

  // ── City search pages — local SEO ──────────────────────────────────────────
  const cityPages: MetadataRoute.Sitemap = CITIES.map(city => ({
    url:             `${BASE}/search?city=${city}`,
    lastModified:    now,
    changeFrequency: 'daily' as const,
    priority:        0.85,
  }))

  // ── City × Category combinations — long-tail SEO ──────────────────────────
  const cityCategCombo: MetadataRoute.Sitemap = CITIES.flatMap(city =>
    SERVICE_CATEGORIES.map(cat => ({
      url:             `${BASE}/search?city=${city}&category=${cat}`,
      lastModified:    now,
      changeFrequency: 'weekly' as const,
      priority:        0.75,
    }))
  )

  // ── Individual salon / business profile pages ──────────────────────────────
  const salonPages: MetadataRoute.Sitemap = SALON_IDS.map(id => ({
    url:             `${BASE}/salon/${id}`,
    lastModified:    now,
    changeFrequency: 'weekly' as const,
    priority:        0.7,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...cityPages,
    ...cityCategCombo,
    ...salonPages,
  ]
}
