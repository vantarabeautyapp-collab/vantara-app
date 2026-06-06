/**
 * Vantara — Authentication Utilities
 * ─────────────────────────────────────────────────────────────────────────────
 * Security model:
 *  • Access token  : short-lived JWT (15 min), stored in HttpOnly cookie
 *  • Refresh token : long-lived JWT (30 days), stored in HttpOnly Secure cookie
 *  • CSRF token    : random token stored in non-HttpOnly cookie, sent as header
 *
 * Tokens flow:
 *  1. Login → sets vt_access + vt_refresh + vt_csrf cookies
 *  2. Every API request → reads vt_access cookie, verifies CSRF header
 *  3. /api/auth/refresh → rotates refresh token, issues new access token
 *  4. /api/auth/logout → clears all three cookies
 */

import bcrypt from 'bcryptjs'
import jwt    from 'jsonwebtoken'
import type { NextRequest, NextResponse } from 'next/server'

const IS_PROD = process.env.NODE_ENV === 'production'

// ─── JWT secret ───────────────────────────────────────────────────────────
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    if (IS_PROD) throw new Error('[Vantara] JWT_SECRET must be set (min 32 chars) in production.')
    console.warn('[Vantara] JWT_SECRET not set — using insecure dev secret. Set it before deploying.')
    return 'dev-only-secret-do-not-use-in-production-' + process.pid
  }
  return secret
}

// ─── Password ─────────────────────────────────────────────────────────────
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12)
}

export function verifyPassword(password: string, hash: string): boolean {
  if (!hash) return false // OAuth users have no hash
  return bcrypt.compareSync(password, hash)
}

// ─── Token payload ────────────────────────────────────────────────────────
export interface TokenPayload {
  userId: string
  email:  string
  role:   string
  iat?:   number
  exp?:   number
}

// ─── Access token (15 min) ────────────────────────────────────────────────
export function signToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(
    { userId: payload.userId, email: payload.email, role: payload.role },
    getJwtSecret(),
    { expiresIn: '15m' }
  )
}

// ─── Refresh token (30 days) ──────────────────────────────────────────────
export function signRefreshToken(userId: string): string {
  return jwt.sign({ userId, type: 'refresh' }, getJwtSecret(), { expiresIn: '30d' })
}

// ─── Verify tokens ────────────────────────────────────────────────────────
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as TokenPayload
  } catch {
    return null
  }
}

export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as { userId: string; type: string }
    if (payload.type !== 'refresh') return null
    return { userId: payload.userId }
  } catch {
    return null
  }
}

// ─── CSRF token ───────────────────────────────────────────────────────────
export function generateCsrfToken(): string {
  // Use crypto.randomUUID — available in Node 18+ and edge runtime
  return crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
}

// ─── Cookie options ───────────────────────────────────────────────────────
const BASE_COOKIE_OPTS = {
  path:     '/',
  sameSite: 'lax' as const,
  secure:   IS_PROD,
} as const

export const ACCESS_COOKIE  = 'vt_access'
export const REFRESH_COOKIE = 'vt_refresh'
export const CSRF_COOKIE    = 'vt_csrf'

/** Set all three auth cookies on a response object */
export function setAuthCookies(
  response: NextResponse,
  accessToken:  string,
  refreshToken: string,
  csrfToken:    string,
) {
  response.cookies.set(ACCESS_COOKIE, accessToken, {
    ...BASE_COOKIE_OPTS,
    httpOnly: true,
    maxAge:   15 * 60,                // 15 minutes
  })
  response.cookies.set(REFRESH_COOKIE, refreshToken, {
    ...BASE_COOKIE_OPTS,
    httpOnly: true,
    maxAge:   30 * 24 * 60 * 60,     // 30 days
    path:     '/api/auth',           // only sent to auth endpoints
  })
  // CSRF token: NOT httpOnly so JS can read and send as header
  response.cookies.set(CSRF_COOKIE, csrfToken, {
    ...BASE_COOKIE_OPTS,
    httpOnly: false,
    maxAge:   30 * 24 * 60 * 60,
  })
}

/** Clear all auth cookies (logout) */
export function clearAuthCookies(response: NextResponse) {
  const expired = { ...BASE_COOKIE_OPTS, maxAge: 0 }
  response.cookies.set(ACCESS_COOKIE,  '', { ...expired, httpOnly: true })
  response.cookies.set(REFRESH_COOKIE, '', { ...expired, httpOnly: true, path: '/api/auth' })
  response.cookies.set(CSRF_COOKIE,    '', expired)
}

// ─── Read access token from request ──────────────────────────────────────
export function getTokenFromRequest(req: NextRequest): string | null {
  // 1. HttpOnly cookie (preferred)
  const cookieToken = req.cookies.get(ACCESS_COOKIE)?.value
  if (cookieToken) return cookieToken

  // 2. Authorization header (for mobile apps / API clients)
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7)

  return null
}

/** Verify the access token from an incoming request */
export function verifyRequest(req: NextRequest): TokenPayload | null {
  const token = getTokenFromRequest(req)
  if (!token) return null
  return verifyToken(token)
}

// ─── CSRF validation ──────────────────────────────────────────────────────
/**
 * Validate CSRF for state-changing requests.
 * The client must send the CSRF token (from the `vt_csrf` cookie) in the
 * `X-CSRF-Token` header. We compare it to the value in the httpOnly-adjacent
 * non-httpOnly cookie.
 *
 * For API clients using Bearer tokens (no cookies), CSRF doesn't apply —
 * the check is skipped if no CSRF cookie is present.
 */
export function validateCsrf(req: NextRequest): boolean {
  const cookieCsrf  = req.cookies.get(CSRF_COOKIE)?.value
  if (!cookieCsrf) return true  // Bearer-auth path — no CSRF needed

  const headerCsrf  = req.headers.get('x-csrf-token')
  if (!headerCsrf) return false

  // Constant-time comparison
  if (cookieCsrf.length !== headerCsrf.length) return false
  let diff = 0
  for (let i = 0; i < cookieCsrf.length; i++) {
    diff |= cookieCsrf.charCodeAt(i) ^ headerCsrf.charCodeAt(i)
  }
  return diff === 0
}
