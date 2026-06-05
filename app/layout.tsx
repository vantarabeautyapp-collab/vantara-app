import type { Metadata, Viewport } from 'next'
import { Suspense }                 from 'react'
import './globals.css'
import { ErrorBoundary }   from '@/components/ErrorBoundary'
import { Analytics }       from '@/components/Analytics'
import JsonLd, {
  websiteSchema,
  organizationSchema,
  webApplicationSchema,
} from '@/components/JsonLd'

// ─── Site constants ──────────────────────────────────────────────────────────
const BASE      = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'
const SITE_NAME = 'Vantara'
const TAGLINE   = 'Discover. Book. Glow.'
const FULL_TITLE = `${SITE_NAME} — ${TAGLINE}`
const DESC      = 'Book top-rated salons, barbers, makeup artists, and beauty professionals across Africa. Instant booking, verified professionals, loyalty rewards, and real reviews.'
const OG_IMAGE  = `${BASE}/og-image.png`

// ─── Viewport ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#0A0A0A' },
  ],
}

// ─── Default metadata (per-page can override with generateMetadata) ───────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE),

  title: {
    default:  FULL_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESC,

  keywords: [
    'salon booking Africa', 'barbershop Nairobi', 'hair salon Kenya',
    'beauty services Africa', 'book haircut online', 'makeup artist Nairobi',
    'nail salon Kampala', 'beauty booking app Africa', 'Vantara',
    'African beauty marketplace', 'salon near me Kenya', 'barber near me Nairobi',
    'M-Pesa beauty booking', 'braiding Nairobi', 'locs Dar es Salaam',
    'beauty Lagos Nigeria', 'best barber Accra Ghana',
  ],

  authors:   [{ name: 'Vantara', url: BASE }],
  creator:   'Vantara',
  publisher: 'Vantara',
  category:  'beauty',

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    type:            'website',
    locale:          'en_KE',
    alternateLocale: ['en_NG', 'en_GH', 'en_UG', 'en_TZ'],
    url:             BASE,
    siteName:        SITE_NAME,
    title:           FULL_TITLE,
    description:     DESC,
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    `${SITE_NAME} — Africa's Beauty & Grooming Marketplace`,
        type:   'image/png',
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       FULL_TITLE,
    description: 'Book premium beauty professionals across Africa.',
    site:        '@vantarafrique',
    creator:     '@vantarafrique',
    images:      [OG_IMAGE],
  },

  // ── Canonical + alternates ──────────────────────────────────────────────────
  alternates: {
    canonical: BASE,
    languages: {
      'en-KE': BASE,
      'en-NG': BASE,
      'en-GH': BASE,
      'en-UG': BASE,
      'en-TZ': BASE,
    },
  },

  // ── Icons ───────────────────────────────────────────────────────────────────
  icons: {
    icon:     [
      { url: '/favicon.ico',                sizes: 'any' },
      { url: '/icon-192.png',               sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png',               sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple:    [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  // ── Manifest ────────────────────────────────────────────────────────────────
  manifest: '/manifest.json',

  // ── Search engine verification ──────────────────────────────────────────────
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
    },
  },

  // ── App metadata ────────────────────────────────────────────────────────────
  applicationName: SITE_NAME,
  referrer:        'origin-when-cross-origin',
  formatDetection: {
    email:     false,
    address:   false,
    telephone: false,
  },
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect"    href="https://fonts.googleapis.com" />
        <link rel="preconnect"    href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Fonts — Playfair Display + Inter — preload critical subsets */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Geo / local SEO meta */}
        <meta name="geo.region"         content="KE"       />
        <meta name="geo.placename"      content="Nairobi"  />
        <meta name="ICBM"               content="-1.2921, 36.8219" />
        <meta name="geo.position"       content="-1.2921;36.8219"  />
      </head>

      <body className="bg-[#0A0A0A] text-[#F0EDE8] antialiased">
        <ErrorBoundary>
          {/* Structured data — loaded on every page */}
          <JsonLd schema={[
            websiteSchema(),
            organizationSchema(),
            webApplicationSchema(),
          ]} />

          {children}
        </ErrorBoundary>

        {/* Analytics — deferred, won't block render */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
