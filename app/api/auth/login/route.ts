/**
 * POST /api/auth/login
 * ─────────────────────────────────────────────────────────────────────────────
 * Security features:
 *  • Input validation via lib/validation.ts
 *  • Constant-time password comparison (prevents timing attacks)
 *  • Jitter on failure (prevents precise timing analysis)
 *  • Account lockout via middleware.ts (recordAuthFailure / isAccountLocked)
 *  • HttpOnly + Secure cookies for access & refresh tokens
 *  • CSRF token issued as non-httpOnly cookie
 *  • Returns minimal user object (no passwordHash)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail }             from '@/lib/db'
import {
  verifyPassword, signToken, signRefreshToken,
  generateCsrfToken, setAuthCookies,
}                                     from '@/lib/auth'
import { validateLoginInput }         from '@/lib/validation'
import {
  isAccountLocked, recordAuthFailure, clearAuthFailures,
}                                     from '@/middleware'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // ── Payload size guard ──────────────────────────────────────────────────
  const cl = req.headers.get('content-length')
  if (cl && parseInt(cl) > 2048) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  }

  // ── Parse + validate ────────────────────────────────────────────────────
  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }) }

  const validated = validateLoginInput(body)
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 })
  }
  const { email, password } = validated.data

  // ── Account lockout check ───────────────────────────────────────────────
  const lockStatus = isAccountLocked(email)
  if (lockStatus.locked) {
    return NextResponse.json(
      { error: `Account temporarily locked. Try again in ${lockStatus.remainingSeconds}s.` },
      { status: 429 }
    )
  }

  // ── Constant-time lookup + verify ───────────────────────────────────────
  const user    = getUserByEmail(email)
  const isValid = user
    ? verifyPassword(password, user.passwordHash)
    : (verifyPassword(password, '$2a$12$placeholder.hash.to.prevent.timing.attack.0000000000000'), false)

  if (!user || !isValid) {
    recordAuthFailure(email)
    // Jitter: 100-250ms to prevent precise timing analysis
    await new Promise(r => setTimeout(r, 100 + Math.random() * 150))
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  // ── Success — clear lockout, issue tokens ───────────────────────────────
  clearAuthFailures(email)

  const accessToken  = signToken({ userId: user.id, email: user.email, role: user.role })
  const refreshToken = signRefreshToken(user.id)
  const csrfToken    = generateCsrfToken()

  const { passwordHash: _ph, ...userOut } = user

  const response = NextResponse.json(
    {
      user:    userOut,
      // Also return token in body for mobile/API clients that can't use cookies
      token:   accessToken,
      message: 'Login successful.',
    },
    { status: 200 }
  )

  setAuthCookies(response, accessToken, refreshToken, csrfToken)

  return response
}
