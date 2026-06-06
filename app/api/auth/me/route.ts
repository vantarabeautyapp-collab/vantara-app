/**
 * GET /api/auth/me
 * Returns the authenticated user's profile.
 * Reads from HttpOnly cookie (preferred) or Authorization header (API clients).
 */

import { NextRequest, NextResponse } from 'next/server'
import { getUserById }               from '@/lib/db'
import { requireAuth }               from '@/lib/api-auth'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const payload = requireAuth(req)
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const user = getUserById(payload.userId)
  if (!user) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 })
  }

  const { passwordHash: _, ...userOut } = user
  return NextResponse.json(userOut)
}
