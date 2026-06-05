import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/search',
          '/login',
          '/register',
          '/privacy-policy',
          '/terms',
          '/salon/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/business/',
          '/home',
          '/bookings',
          '/profile',
          '/rewards',
          '/booking',
          '/_next/',
          '/auth/callback',
        ],
      },
      {
        // Give major search engines extra permissions
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot', 'Slurp'],
        allow: '/',
        disallow: ['/api/', '/admin/', '/business/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
