/**
 * Vantara — API Authentication Helper
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralises the "who is making this request?" logic used across all API routes.
 *
 * Usage:
 *   const user = requireAuth(req)
 *   if (!user) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
 *
 *   const user = requireRole(req, ['admin', 'super_admin'])
 *   if (!user) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
 */

import type { NextRequest }  from 'next/server'
import { verifyRequest, validateCsrf, type TokenPayload } from './auth'
import { getUserById }       from './db'

type Role = 'customer' | 'business' | 'staff' | 'admin' | 'super_admin'

// ─── Authentication ────────────────────────────────────────────────────────
/**
 * Returns the verified token payload if the request carries a valid access token.
 * Returns null if missing or invalid.
 */
export function requireAuth(req: NextRequest): TokenPayload | null {
  return verifyRequest(req)
}

// ─── RBAC ──────────────────────────────────────────────────────────────────
/**
 * Returns the token payload only if the user's role is in the allowed list.
 * Returns null otherwise.
 */
export function requireRole(req: NextRequest, allowed: Role[]): TokenPayload | null {
  const payload = verifyRequest(req)
  if (!payload) return null
  if (!allowed.includes(payload.role as Role)) return null
  return payload
}

// ─── Full user record ──────────────────────────────────────────────────────
/**
 * Returns the full UserRecord for the authenticated user.
 * Useful when you need fresh data beyond what's in the JWT.
 */
export async function getAuthUser(req: NextRequest) {
  const payload = verifyRequest(req)
  if (!payload) return null
  return getUserById(payload.userId) ?? null
}

// ─── CSRF guard for mutating endpoints ────────────────────────────────────
/**
 * Returns an error string if CSRF check fails, null if it passes.
 * Use on POST/PUT/PATCH/DELETE routes.
 */
export function checkCsrf(req: NextRequest): string | null {
  if (!validateCsrf(req)) return 'CSRF validation failed. Please refresh the page.'
  return null
}

// ─── Combined: auth + CSRF + role ─────────────────────────────────────────
export interface AuthResult {
  ok:      boolean
  payload: TokenPayload | null
  error:   string | null
  status:  number
}

/**
 * Full check: CSRF + auth + optional role list.
 * Returns an AuthResult you can destructure inline.
 *
 * @example
 * const auth = guardRequest(req, ['business', 'admin'])
 * if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })
 * const { payload } = auth
 */
export function guardRequest(
  req:      NextRequest,
  roles?:   Role[],
  skipCsrf?: boolean,
): AuthResult {
  // CSRF check (only for mutating methods)
  const method = req.method.toUpperCase()
  const isMutating = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
  if (isMutating && !skipCsrf) {
    const csrfError = checkCsrf(req)
    if (csrfError) return { ok: false, payload: null, error: csrfError, status: 403 }
  }

  // Auth check
  const payload = verifyRequest(req)
  if (!payload) return { ok: false, payload: null, error: 'Unauthorized.', status: 401 }

  // Role check
  if (roles && roles.length > 0 && !roles.includes(payload.role as Role)) {
    return { ok: false, payload: null, error: 'Forbidden: insufficient permissions.', status: 403 }
  }

  return { ok: true, payload, error: null, status: 200 }
}
