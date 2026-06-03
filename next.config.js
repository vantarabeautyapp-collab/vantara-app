/** @type {import('next').NextConfig} */
const isCapacitorBuild = process.env.NEXT_EXPORT === 'true'

const nextConfig = {
  swcMinify: false,

  // Static export only for Capacitor mobile builds.
  // Railway uses `next start` (no standalone needed).
  ...(isCapacitorBuild ? { output: 'export', trailingSlash: true } : {}),

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: '**.convex.cloud' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },

  experimental: {
    forceSwcTransforms: false,
  },

  // Sentry source map uploads (only in production builds)
  ...(process.env.SENTRY_AUTH_TOKEN && isProduction ? {
    sentry: {
      hideSourceMaps: true,
      disableClientWebpackPlugin: false,
      disableServerWebpackPlugin: false,
    },
  } : {}),

  // Security headers applied at Next.js level (supplement middleware.ts)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Robots-Tag', value: process.env.NODE_ENV === 'production' ? 'index,follow' : 'noindex' },
        ],
      },
      {
        // Webhook endpoints: allow raw body, no CSRF
        source: '/api/webhooks/(.*)',
        headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
      },
    ]
  },
}

module.exports = nextConfig
