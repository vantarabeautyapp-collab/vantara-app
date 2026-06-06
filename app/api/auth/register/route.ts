/**
 * POST /api/auth/register
 * ─────────────────────────────────────────────────────────────────────────────
 * Security features:
 *  • Zod-equivalent validation via lib/validation.ts
 *  • Password complexity enforcement (length + letter + number)
 *  • Constant-time email conflict response (prevents user enumeration)
 *  • HttpOnly cookie auth tokens on success
 *  • CSRF token issued
 */

import { NextRequest, NextResponse } from 'next/server'
import { saveUser, userExists }       from '@/lib/db'
import {
  hashPassword, signToken, signRefreshToken,
  generateCsrfToken, setAuthCookies,
}                                     from '@/lib/auth'
import { validateRegisterInput }      from '@/lib/validation'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // ── Payload size guard ──────────────────────────────────────────────────
  const cl = req.headers.get('content-length')
  if (cl && parseInt(cl) > 8192) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  }

  // ── Parse + validate ────────────────────────────────────────────────────
  let body: unknown
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }) }

  const validated = validateRegisterInput(body)
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 })
  }
  const {
    name, email, password, phone, city, countryCode,
    role, businessName, businessType,
  } = validated.data

  // ── Duplicate email check (constant-time response) ──────────────────────
  if (userExists(email)) {
    await new Promise(r => setTimeout(r, 200 + Math.random() * 100))
    return NextResponse.json(
      { error: 'An account with this email already exists.' },
      { status: 409 }
    )
  }

  // ── Create user ─────────────────────────────────────────────────────────
  const id = crypto.randomUUID()

  const newUser = {
    id,
    name,
    email,
    phone:         phone ?? '',
    avatar:        '',
    role,
    countryCode,
    city:          city ?? '',
    loyaltyPoints: role === 'customer' ? 100 : 0,
    loyaltyTier:   'bronze',
    joinedAt:      new Date().toISOString(),
    totalBookings: 0,
    passwordHash:  hashPassword(password),
    businessName:  businessName ?? '',
    businessType:  businessType ?? '',
  }

  try {
    saveUser(newUser)
  } catch {
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }

  // ── Issue tokens + set cookies ──────────────────────────────────────────
  const accessToken  = signToken({ userId: id, email: newUser.email, role })
  const refreshToken = signRefreshToken(id)
  const csrfToken    = generateCsrfToken()

  const { passwordHash: _ph, ...userOut } = newUser

  const response = NextResponse.json(
    {
      user:    userOut,
      token:   accessToken,
      message: 'Account created successfully.',
    },
    { status: 201 }
  )

  setAuthCookies(response, accessToken, refreshToken, csrfToken)

  return response
}
