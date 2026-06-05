/**
 * GET /api/auth/google/callback
 * Receives the authorization code from Google, creates/finds the user,
 * issues a JWT, and hands it off to the client via a short-lived cookie.
 */

import { NextRequest, NextResponse } from 'next/server'
import { exchangeGoogleCode } from '@/lib/google-auth'
import { getUserByEmail, createOAuthUser } from '@/lib/db'
import { signToken } from '@/lib/auth'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3005'
const IS_PROD = process.env.NODE_ENV === 'production'

function errorRedirect(reason: string): NextResponse {
  return NextResponse.redirect(`${APP_URL}/login?error=${encodeURIComponent(reason)}`)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code  = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // User denied permission on the consent screen
  if (error === 'access_denied') return errorRedirect('google_denied')
  if (!code) return errorRedirect('no_code')

  // Decode state
  let role: string = 'customer'
  let from: string = ''
  if (state) {
    try {
      const decoded = JSON.parse(Buffer.from(state, 'base64url').toString())
      role = decoded.role ?? 'customer'
      from = decoded.from ?? ''
    } catch { /* ignore malformed state */ }
  }

  try {
    const googleUser = await exchangeGoogleCode(code)

    // Find or create user
    let user = getUserByEmail(googleUser.email)

    if (!user) {
      user = createOAuthUser({
        name:     googleUser.name,
        email:    googleUser.email,
        role:     role === 'business' ? 'business' : 'customer',
        avatar:   googleUser.picture,
        provider: 'google',
      })
    }

    // Issue JWT
    const token = signToken({ userId: user.id, email: user.email, role: user.role })

    // Build safe user object for client
    const { passwordHash: _ph, ...userOut } = user
    const userJson = JSON.stringify(userOut)

    // Determine destination
    const destination = from
      || (user.role === 'business' ? '/business/dashboard' : '/home')

    // Hand token to client via short-lived, non-httpOnly cookies so the
    // /auth/callback page can move them to localStorage (matching existing auth flow)
    const response = NextResponse.redirect(`${APP_URL}/auth/callback?to=${encodeURIComponent(destination)}`)

    const cookieOptions = {
      httpOnly: false,                      // must be readable by client JS
      secure:   IS_PROD,
      sameSite: 'lax'  as const,
      maxAge:   90,                         // 90 seconds — just for the handoff
      path:     '/',
    }

    response.cookies.set('vt_oauth_token', token,   cookieOptions)
    response.cookies.set('vt_oauth_user',  userJson, cookieOptions)

    return response

  } catch (err) {
    console.error('[Google OAuth] Callback error:', err)
    return errorRedirect('oauth_failed')
  }
}
