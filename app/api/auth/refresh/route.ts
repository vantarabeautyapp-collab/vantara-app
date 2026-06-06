/**
 * POST /api/auth/refresh
 * ─────────────────────────────────────────────────────────────────────────────
 * Refresh token rotation:
 *  1. Reads the vt_refresh HttpOnly cookie
 *  2. Verifies it is a valid, unexpired refresh token
 *  3. Issues a NEW access token + NEW refresh token (old one is implicitly invalidated)
 *  4. Issues a new CSRF token
 *
 * On failure, clears all auth cookies to force re-login.
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  verifyRefreshToken, signToken, signRefreshToken,
  generateCsrfToken, setAuthCookies, clearAuthCookies,
  REFRESH_COOKIE,
}                                     from '@/lib/auth'
import { getUserById }                from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token.' }, { status: 401 })
  }

  // ── Verify refresh token ────────────────────────────────────────────────
  const payload = verifyRefreshToken(refreshToken)
  if (!payload) {
    const res = NextResponse.json({ error: 'Invalid or expired session. Please log in again.' }, { status: 401 })
    clearAuthCookies(res)
    return res
  }

  // ── Load user (check account still exists + get current role) ──────────
  const user = getUserById(payload.userId)
  if (!user) {
    const res = NextResponse.json({ error: 'Account not found.' }, { status: 401 })
    clearAuthCookies(res)
    return res
  }

  // ── Issue new tokens ────────────────────────────────────────────────────
  const newAccessToken  = signToken({ userId: user.id, email: user.email, role: user.role })
  const newRefreshToken = signRefreshToken(user.id)
  const newCsrfToken    = generateCsrfToken()

  const { passwordHash: _ph, ...userOut } = user

  const response = NextResponse.json({
    user:    userOut,
    token:   newAccessToken,
    message: 'Token refreshed.',
  })

  setAuthCookies(response, newAccessToken, newRefreshToken, newCsrfToken)

  return response
}
