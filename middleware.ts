/**
 * Vantara — Edge Middleware
 * ─────────────────────────────────────────────────────────────────────────────
 * Runs on every request before route handlers.
 *
 * Responsibilities:
 *  1. Rate limiting (per-IP, per-endpoint)
 *  2. Account lockout tracking
 *  3. CORS headers
 *  4. Security headers (CSP, HSTS, Permissions-Policy, …)
 *  5. Request size guard headers
 *
 * Architecture note:
 *  CSRF validation lives in lib/auth.ts and is called by individual API routes
 *  (not here) because the edge middleware cannot import Server-only modules.
 */

import { NextRequest, NextResponse } from 'next/server'

const IS_PROD       = process.env.NODE_ENV === 'production'
const ALLOWED_ORIGIN = IS_PROD
  ? (process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com')
  : 'http://localhost:3005'

// ─────────────────────────────────────────────────────────────────────────────
//  IN-MEMORY RATE LIMITER
//  For multi-instance deployments: replace with Upstash Redis / Cloudflare KV.
// ─────────────────────────────────────────────────────────────────────────────
const rateLimitMap  = new Map<string, { count: number; resetAt: number }>()
const accountLockMap = new Map<string, { failures: number; lockedUntil?: number }>()

function rateLimit(
  key: string, limit: number, windowMs: number,
): { ok: boolean; retryAfter: number } {
  const now   = Date.now()
  const entry = rateLimitMap.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count++
  return { ok: true, retryAfter: 0 }
}

// ─── Account lockout (exported for use in login route) ────────────────────
export function recordAuthFailure(email: string): { locked: boolean; remainingSeconds: number } {
  const now   = Date.now()
  const entry = accountLockMap.get(email) ?? { failures: 0 }
  if (entry.lockedUntil && now < entry.lockedUntil) {
    return { locked: true, remainingSeconds: Math.ceil((entry.lockedUntil - now) / 1000) }
  }
  entry.failures++
  const lockDuration =
    entry.failures >= 10 ? 60 * 60 * 1000  :  // 1 hour after 10 failures
    entry.failures >= 5  ? 15 * 60 * 1000  :  // 15 min after 5 failures
    0
  if (lockDuration > 0) entry.lockedUntil = now + lockDuration
  accountLockMap.set(email, entry)
  return { locked: false, remainingSeconds: 0 }
}

export function clearAuthFailures(email: string) {
  accountLockMap.delete(email)
}

export function isAccountLocked(email: string): { locked: boolean; remainingSeconds: number } {
  const entry = accountLockMap.get(email)
  if (!entry?.lockedUntil) return { locked: false, remainingSeconds: 0 }
  const remaining = entry.lockedUntil - Date.now()
  if (remaining <= 0) { accountLockMap.delete(email); return { locked: false, remainingSeconds: 0 } }
  return { locked: true, remainingSeconds: Math.ceil(remaining / 1000) }
}

// Clean up stale entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  rateLimitMap.forEach((e, k)  => { if (now > e.resetAt) rateLimitMap.delete(k) })
  accountLockMap.forEach((e, k) => { if (e.lockedUntil && now > e.lockedUntil) accountLockMap.delete(k) })
}, 10 * 60 * 1000)

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

function tooManyRequests(retryAfter: number) {
  return new NextResponse(
    JSON.stringify({ error: 'Too many requests. Please slow down.' }),
    {
      status: 429,
      headers: {
        'Content-Type':  'application/json',
        'Retry-After':   String(retryAfter),
        'X-RateLimit-Limit': '10',
      },
    }
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  MIDDLEWARE
// ─────────────────────────────────────────────────────────────────────────────
export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl
  const ip     = getClientIp(req)
  const method = req.method.toUpperCase()

  // ── CORS pre-flight ──────────────────────────────────────────────────────
  const requestOrigin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = (
    requestOrigin === ALLOWED_ORIGIN ||
    requestOrigin === 'http://localhost:3005' ||
    requestOrigin === 'http://localhost:3000'
  )

  if (method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin':      isAllowedOrigin ? requestOrigin : ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods':     'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':     'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age':           '86400',
      },
    })
  }

  // ── Rate limiting ────────────────────────────────────────────────────────
  // 1. Auth endpoints — tightest limits
  if (pathname === '/api/auth/login' || pathname === '/api/auth/register') {
    const r = rateLimit(`auth-strict:${ip}`, 10, 15 * 60 * 1000) // 10/15min per IP
    if (!r.ok) return tooManyRequests(r.retryAfter)
  }

  // 2. All auth endpoints (refresh, Google OAuth, etc.)
  if (pathname.startsWith('/api/auth/')) {
    const r = rateLimit(`auth:${ip}`, 30, 15 * 60 * 1000)
    if (!r.ok) return tooManyRequests(r.retryAfter)
  }

  // 3. Geocoding (can be abused to enumerate locations)
  if (pathname.startsWith('/api/locations/geocode')) {
    const r = rateLimit(`geocode:${ip}`, 10, 60 * 1000) // 10/min
    if (!r.ok) return tooManyRequests(r.retryAfter)
  }

  // 4. Payment endpoints
  if (pathname.startsWith('/api/stripe/') || pathname.startsWith('/api/payments/')) {
    const r = rateLimit(`payments:${ip}`, 5, 60 * 1000) // 5/min
    if (!r.ok) return tooManyRequests(r.retryAfter)
  }

  // 5. Error reporting (prevent log flooding)
  if (pathname === '/api/errors') {
    const r = rateLimit(`errors:${ip}`, 20, 60 * 1000)
    if (!r.ok) return tooManyRequests(r.retryAfter)
  }

  // 6. General API (exclude webhooks — they use their own auth)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/webhooks/')) {
    const r = rateLimit(`api:${ip}`, 120, 60 * 1000) // 120/min
    if (!r.ok) return tooManyRequests(r.retryAfter)
  }

  // ── Build response with security headers ─────────────────────────────────
  const res = NextResponse.next()

  // ── CORS headers ─────────────────────────────────────────────────────────
  if (requestOrigin && isAllowedOrigin) {
    res.headers.set('Access-Control-Allow-Origin',      requestOrigin)
    res.headers.set('Access-Control-Allow-Credentials', 'true')
    res.headers.set('Vary', 'Origin')
  }

  // ── Content Security Policy ───────────────────────────────────────────────
  const convexUrl      = process.env.NEXT_PUBLIC_CONVEX_URL       ?? ''
  const convexSiteUrl  = process.env.NEXT_PUBLIC_CONVEX_SITE_URL  ?? ''

  const csp = [
    "default-src 'self'",
    // script-src: allow GTM + GA4; 'unsafe-inline' required for Next.js inline scripts
    `script-src 'self' 'unsafe-inline'${IS_PROD ? '' : " 'unsafe-eval'"} https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com https://app.termly.io`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    `img-src 'self' data: blob: https://images.unsplash.com https://randomuser.me https://lh3.googleusercontent.com https://www.google-analytics.com https://www.gravatar.com ${convexUrl}`,
    `connect-src 'self' ${convexUrl} ${convexSiteUrl} https://app.posthog.com https://api.linear.app https://nominatim.openstreetmap.org https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com https://www.google-analytics.com https://api.flutterwave.com https://api2.amplitude.com wss://*.convex.cloud`,
    "frame-src https://js.stripe.com https://hooks.stripe.com https://accounts.google.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://accounts.google.com https://checkout.stripe.com",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    IS_PROD ? "upgrade-insecure-requests" : "",
    "block-all-mixed-content",
  ].filter(Boolean).join('; ')

  res.headers.set('Content-Security-Policy', csp)

  // ── Standard security headers ─────────────────────────────────────────────
  res.headers.set('X-Content-Type-Options',    'nosniff')
  res.headers.set('X-Frame-Options',           'DENY')
  res.headers.set('X-XSS-Protection',          '1; mode=block')
  res.headers.set('Referrer-Policy',           'strict-origin-when-cross-origin')
  res.headers.set('Cross-Origin-Opener-Policy',  'same-origin')
  res.headers.set('Cross-Origin-Embedder-Policy','require-corp')
  res.headers.set('Cross-Origin-Resource-Policy','same-origin')

  // ── Permissions Policy ────────────────────────────────────────────────────
  res.headers.set('Permissions-Policy', [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'payment=(self)',
    'usb=()',
    'interest-cohort=()',
    'browsing-topics=()',
  ].join(', '))

  // ── HSTS (production only) ────────────────────────────────────────────────
  if (IS_PROD) {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }

  // ── Remove server fingerprinting ──────────────────────────────────────────
  res.headers.delete('X-Powered-By')
  res.headers.delete('Server')

  // ── Rate limit headers (informational) ───────────────────────────────────
  res.headers.set('X-RateLimit-Policy', '120;w=60')

  return res
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|ico|webp|jpg|jpeg|gif|woff2?|ttf|otf|eot|css|js\\.map)).*)',
  ],
}
