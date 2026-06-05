/**
 * Google OAuth 2.0 utilities (server-side only — never import in client code)
 *
 * Required environment variables:
 *   GOOGLE_CLIENT_ID      — From Google Cloud Console → APIs & Services → Credentials
 *   GOOGLE_CLIENT_SECRET  — From the same OAuth 2.0 client
 *
 * Authorised redirect URI to register in Google Cloud Console:
 *   https://vantarafrique.com/api/auth/google/callback
 *   http://localhost:3005/api/auth/google/callback  (for local dev)
 */

const GOOGLE_AUTH_URL   = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL  = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO   = 'https://www.googleapis.com/oauth2/v3/userinfo'

function getRedirectUri(): string {
  const base = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3005'
  return `${base}/api/auth/google/callback`
}

/** Build the Google OAuth consent-screen URL */
export function getGoogleAuthURL(state?: string): string {
  const clientId = process.env.GOOGLE_CLIENT_ID
  if (!clientId) throw new Error('GOOGLE_CLIENT_ID is not set')

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  getRedirectUri(),
    response_type: 'code',
    scope:         'openid email profile',
    access_type:   'offline',
    prompt:        'select_account',
    ...(state ? { state } : {}),
  })
  return `${GOOGLE_AUTH_URL}?${params.toString()}`
}

export interface GoogleUserInfo {
  sub:            string   // Google user ID
  email:          string
  email_verified: boolean
  name:           string
  given_name:     string
  family_name:    string
  picture:        string
}

/** Exchange authorization code → access token → user info */
export async function exchangeGoogleCode(code: string): Promise<GoogleUserInfo> {
  const clientId     = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) throw new Error('Google OAuth credentials not configured')

  // 1. Exchange code for tokens
  const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id:     clientId,
      client_secret: clientSecret,
      redirect_uri:  getRedirectUri(),
      grant_type:    'authorization_code',
    }),
    signal: AbortSignal.timeout(10_000),
  })

  const tokens = await tokenRes.json()
  if (!tokens.access_token) {
    throw new Error(`Token exchange failed: ${tokens.error_description ?? tokens.error ?? 'unknown'}`)
  }

  // 2. Fetch user profile
  const profileRes = await fetch(GOOGLE_USERINFO, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
    signal: AbortSignal.timeout(5_000),
  })
  if (!profileRes.ok) throw new Error('Failed to fetch Google user profile')

  const profile: GoogleUserInfo = await profileRes.json()
  if (!profile.email) throw new Error('Google profile missing email')
  if (!profile.email_verified) throw new Error('Google email is not verified')

  return profile
}
