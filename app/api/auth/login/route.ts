import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/db'
import { verifyPassword, signToken } from '@/lib/auth'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > 2048) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const { email, password } = body as Record<string, string>

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }
  if (!password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
  }
  if (password.length > 128) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  // Constant-time lookup + verify (prevents timing-based user enumeration)
  const user = getUserByEmail(email)
  const isValid = user ? verifyPassword(password, user.passwordHash) : false

  // Always perform a hash comparison even for non-existent users (timing attack prevention)
  if (!user) {
    // Fake constant-time delay
    verifyPassword(password, '$2a$10$fakehashfakehashfakehashfakehashfakehashfakehash')
  }

  if (!user || !isValid) {
    // Add small jitter to prevent precise timing analysis
    await new Promise(r => setTimeout(r, 100 + Math.random() * 100))
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  const token = signToken({ userId: user.id, email: user.email, role: user.role })
  const { passwordHash: _ph, ...userOut } = user

  return NextResponse.json({ token, user: userOut })
}
