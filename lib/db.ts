import fs from 'fs'
import path from 'path'

export interface UserRecord {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: string
  countryCode: string   // ISO 3166-1 alpha-2, e.g. "KE"
  city: string          // free-text town/city name
  loyaltyPoints: number
  loyaltyTier: string
  joinedAt: string
  totalBookings: number
  passwordHash: string
  businessName: string
  businessType: string
}

function getDataDir(): string {
  const dir = process.env.DATA_PATH || path.join(process.cwd(), '.data')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return dir
}

function usersPath(): string {
  return path.join(getDataDir(), 'users.json')
}

export function getAllUsers(): UserRecord[] {
  const p = usersPath()
  if (!fs.existsSync(p)) return []
  try {
    return JSON.parse(fs.readFileSync(p, 'utf-8')) as UserRecord[]
  } catch {
    return []
  }
}

export function getUserByEmail(email: string): UserRecord | null {
  return getAllUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) ?? null
}

export function getUserById(id: string): UserRecord | null {
  return getAllUsers().find(u => u.id === id) ?? null
}

export function saveUser(user: UserRecord): void {
  const users = getAllUsers()
  const idx = users.findIndex(u => u.id === user.id)
  if (idx >= 0) {
    users[idx] = user
  } else {
    users.push(user)
  }
  fs.writeFileSync(usersPath(), JSON.stringify(users, null, 2), 'utf-8')
}

export function userExists(email: string): boolean {
  return getAllUsers().some(u => u.email.toLowerCase() === email.toLowerCase())
}

/**
 * Create a user from OAuth (no password required).
 * Pass role, name, email, and optionally avatar from Google/provider.
 */
export function createOAuthUser(params: {
  name:     string
  email:    string
  role:     string
  avatar?:  string
  provider?: string
}): UserRecord {
  const { name, email, role, avatar = '', provider = 'google' } = params
  const id = `u_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  const newUser: UserRecord = {
    id,
    name,
    email,
    phone:         '',
    avatar,
    role,
    countryCode:   '',
    city:          '',
    loyaltyPoints: role === 'customer' ? 100 : 0,
    loyaltyTier:   'bronze',
    joinedAt:      new Date().toISOString().slice(0, 10),
    totalBookings: 0,
    passwordHash:  '',   // OAuth users have no password
    businessName:  '',
    businessType:  '',
  }
  saveUser(newUser)
  return newUser
}
