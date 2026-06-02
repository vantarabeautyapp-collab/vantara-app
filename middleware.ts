import { NextRequest, NextResponse } from 'next/server'

// ─── In-memory rate limiter ──────────────────────────────────────────────────
// Per-instance. For multi-instance Railway deployments, replace with Upstash Redis.
const rateLimitMap = new Map<string, { count: number; resetAt: number; blocked?: boolean }>()
const accountLockMap = new Map<string, { failures: number; lockedUntil?: number }>()

function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now()
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

// Track failed login attempts per email (account lockout)
export function recordAuthFailure(email: string): { locked: boolean; remainingSeconds: number } {
  const now = Date.now()
  const entry = accountLockMap.get(email) ?? { failures: 0 }
  if (entry.lockedUntil && now < entry.lockedUntil) {
    return { locked: true, remainingSeconds: Math.ceil((entry.lockedUntil - now) / 1000) }
  }
  entry.failures++
  const lockDuration =
    entry.failures >= 10 ? 60 * 60 * 1000 :   // 1 hour after 10 failures
    entry.failures >= 5  ? 15 * 60 * 1000 :   // 15 min after 5 failures
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

// Clean up stale entries every 10 min
setInterval(() => {
  const now = Date.now()
  rateLimitMap.forEach((entry, key) => { if (now > entry.resetAt) rateLimitMap.delete(key) })
  accountLockMap.forEach((entry, key) => { if (entry.lockedUntil && now > entry.lockedUntil) accountLockMap.delete(key) })
}, 10 * 60 * 1000)

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

function rateLimitResponse(retryAfter: number) {
  return new NextResponse(
    JSON.stringify({ error: 'Too many requests. Please wait before trying again.' }),
    { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfter) } }
  )
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = getClientIp(req)

  // ─── Stricter limits on auth endpoints (login, register) ────────────────
  if (pathname === '/api/auth/login' || pathname === '/api/auth/register') {
    const result = rateLimit(`strict-auth:${ip}`, 10, 15 * 60 * 1000) // 10/15min
    if (!result.ok) return rateLimitResponse(result.retryAfter)
  }

  // ─── General auth endpoints (social, me, refresh) ───────────────────────
  if (pathname.startsWith('/api/auth/')) {
    const result = rateLimit(`auth:${ip}`, 30, 15 * 60 * 1000) // 30/15min
    if (!result.ok) return rateLimitResponse(result.retryAfter)
  }

  // ─── Location API (geocoding can be abused) ──────────────────────────────
  if (pathname.startsWith('/api/locations/geocode')) {
    const result = rateLimit(`geocode:${ip}`, 10, 60 * 1000) // 10/min
    if (!result.ok) return rateLimitResponse(result.retryAfter)
  }

  // ─── Payment endpoints (prevent Stripe abuse) ───────────────────────────
  if (pathname.startsWith('/api/stripe/')) {
    const result = rateLimit(`stripe:${ip}`, 5, 60 * 1000) // 5/min
    if (!result.ok) return rateLimitResponse(result.retryAfter)
  }

  // ─── General API — all other routes ─────────────────────────────────────
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/webhooks/')) {
    const result = rateLimit(`api:${ip}`, 120, 60 * 1000) // 120/min
    if (!result.ok) return rateLimitResponse(result.retryAfter)
  }

  const res = NextResponse.next()

  // ─── Security headers ────────────────────────────────────────────────────
  const isDev = process.env.NODE_ENV !== 'production'
  const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL ?? ''
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? ''

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://app.termly.io`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    `img-src 'self' data: blob: https://images.unsplash.com https://randomuser.me ${convexUrl}`,
    `connect-src 'self' ${convexUrl} ${convexSiteUrl} https://app.posthog.com https://api.linear.app https://nominatim.openstreetmap.org`,
    "frame-src https://js.stripe.com https://hooks.stripe.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].filter(Boolean).join('; ')

  res.headers.set('Content-Security-Policy', csp)
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-XSS-Protection', '1; mode=block')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=()')
  if (!isDev) {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }
  res.headers.delete('X-Powered-By')
  res.headers.set('Server', 'StyleAfrique')

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.ico|.*\\.webp).*)',
  ],
}
