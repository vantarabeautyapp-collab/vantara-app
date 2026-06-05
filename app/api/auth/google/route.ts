/**
 * GET /api/auth/google
 * Initiates Google OAuth flow. Redirects to Google's consent screen.
 *
 * Query params:
 *   role — 'customer' | 'business' (default: 'customer')
 *          Passed as OAuth state so the callback knows which account type to create.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthURL } from '@/lib/google-auth'

export async function GET(req: NextRequest) {
  if (!process.env.GOOGLE_CLIENT_ID) {
    // Google OAuth not configured — return a helpful error instead of crashing
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/login?error=google_not_configured`,
    )
  }

  const { searchParams } = new URL(req.url)
  const role  = searchParams.get('role')  ?? 'customer'
  const from  = searchParams.get('from')  ?? ''  // redirect destination after auth

  // Encode role + from into state string (URL-safe)
  const state = Buffer.from(JSON.stringify({ role, from })).toString('base64url')

  try {
    const url = getGoogleAuthURL(state)
    return NextResponse.redirect(url)
  } catch (err) {
    console.error('[Google OAuth] Failed to build auth URL:', err)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/login?error=oauth_error`,
    )
  }
}
