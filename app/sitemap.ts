import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'

// Public salon IDs from mock data — add real IDs here as the DB grows
const SALON_IDS = ['b1', 'b2', 'b3', 'b4', 'b5']

const SERVICE_CATEGORIES = [
  'barbershop',
  'hair-salon',
  'nail-studio',
  'makeup-artist',
  'braiding',
  'skincare',
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
    { url: BASE,                          lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/search`,              lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/register`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/login`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy-policy`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map(cat => ({
    url: `${BASE}/search?category=${cat}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const cityPages: MetadataRoute.Sitemap = CITIES.map(city => ({
    url: `${BASE}/search?city=${city}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const salonPages: MetadataRoute.Sitemap = SALON_IDS.map(id => ({
    url: `${BASE}/salon/${id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...cityPages, ...salonPages]
}
