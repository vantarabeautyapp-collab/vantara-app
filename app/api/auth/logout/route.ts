/**
 * POST /api/auth/logout
 * Clears all auth cookies and invalidates the session.
 */

import { NextResponse } from 'next/server'
import { clearAuthCookies } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully.' })
  clearAuthCookies(response)
  return response
}
