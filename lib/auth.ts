import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable must be set (min 32 chars) in production.')
    }
    // Dev-only warning — never reaches production
    console.warn('[Vantara] JWT_SECRET not set. Using an insecure dev-only secret. Set JWT_SECRET in .env.local before going to production.')
    return 'dev-only-secret-do-not-use-in-production-' + process.pid
  }
  return secret
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12) // increased from 10 to 12
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}

export interface TokenPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(
    { userId: payload.userId, email: payload.email, role: payload.role },
    getJwtSecret(),
    { expiresIn: '15m' } // short-lived access token (was 30d — security fix)
  )
}

export function signRefreshToken(payload: Pick<TokenPayload, 'userId'>): string {
  return jwt.sign({ userId: payload.userId }, getJwtSecret(), { expiresIn: '30d' })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as TokenPayload
  } catch {
    return null
  }
}
