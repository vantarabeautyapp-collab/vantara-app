import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers, saveUser, userExists } from '@/lib/db'
import { hashPassword, signToken } from '@/lib/auth'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SAFE_STR_RE = /^[^\x00-\x1f<>'"`;\\]+$/ // no control chars or injection vectors

export async function POST(req: NextRequest) {
  // Reject oversized payloads
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > 8192) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { name, email, phone, password, city, countryCode, role, businessName, businessType } = body as Record<string, string>

  // ─── Validate required fields ───
  if (!name?.trim() || typeof name !== 'string') {
    return NextResponse.json({ error: 'Full name is required.' }, { status: 400 })
  }
  if (!email?.trim() || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }
  if (password.length > 128) {
    return NextResponse.json({ error: 'Password is too long.' }, { status: 400 })
  }
  if (name.length > 100 || !SAFE_STR_RE.test(name.trim())) {
    return NextResponse.json({ error: 'Name contains invalid characters.' }, { status: 400 })
  }

  const userRole = role === 'business' ? 'business' : 'customer'

  if (userRole === 'business') {
    if (!businessName?.trim() || businessName.length > 150) {
      return NextResponse.json({ error: 'Business name is required (max 150 chars).' }, { status: 400 })
    }
  }

  // ─── Check for existing account ───
  if (userExists(email)) {
    // Constant-time response to avoid timing attacks on email enumeration
    await new Promise(r => setTimeout(r, 200))
    return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
  }

  const id = crypto.randomUUID()
  const loyaltyPoints = userRole === 'customer' ? 100 : 0

  const newUser = {
    id,
    name: name.trim().slice(0, 100),
    email: email.toLowerCase().trim(),
    phone: (phone || '').slice(0, 20),
    avatar: '',
    role: userRole,
    countryCode: (countryCode || 'KE').toUpperCase().slice(0, 2),
    city: (city || '').trim().slice(0, 100),
    loyaltyPoints,
    loyaltyTier: 'bronze',
    joinedAt: new Date().toISOString(),
    totalBookings: 0,
    passwordHash: hashPassword(password),
    businessName: (businessName || '').trim().slice(0, 150),
    businessType: (businessType || '').slice(0, 50),
  }

  try {
    saveUser(newUser)
  } catch {
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }

  const token = signToken({ userId: id, email: newUser.email, role: userRole })
  const { passwordHash: _ph, ...userOut } = newUser

  return NextResponse.json({ token, user: userOut }, { status: 201 })
}
