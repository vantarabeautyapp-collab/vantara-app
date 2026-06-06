/**
 * Vantara — Input Validation Schemas
 * ─────────────────────────────────────────────────────────────────────────────
 * All API input validation lives here. Pure runtime guards using manual checks
 * (no external schema library dependency) so they work in Node.js edge runtime.
 *
 * Usage:
 *   const result = validateLoginInput(body)
 *   if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 })
 *   const { email, password } = result.data
 */

// ─── Shared regexes ────────────────────────────────────────────────────────
// RFC 5321 simple — rejects edge cases that cause injection
const EMAIL_RE   = /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/
// Only printable ASCII excluding common injection vectors
const SAFE_RE    = /^[^\x00-\x1f\x7f<>'"`;\\|{}\[\]]+$/
const PHONE_RE   = /^\+?[0-9\s\-().]{7,20}$/
const ISO2_RE    = /^[A-Z]{2}$/
const UUID_RE    = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// ─── Result type ────────────────────────────────────────────────────────────
type Result<T> =
  | { ok: true;  data:  T }
  | { ok: false; error: string }

function ok<T>(data: T): Result<T>     { return { ok: true, data } }
function err(msg: string): Result<never> { return { ok: false, error: msg } }

// ─── Helper validators ─────────────────────────────────────────────────────
function requireString(v: unknown, field: string, max = 255): string | null {
  if (!v || typeof v !== 'string' || !v.trim()) return `${field} is required.`
  if (v.length > max) return `${field} is too long (max ${max} chars).`
  return null
}

// ─── Login ─────────────────────────────────────────────────────────────────
interface LoginInput { email: string; password: string }

export function validateLoginInput(body: unknown): Result<LoginInput> {
  if (typeof body !== 'object' || body === null) return err('Invalid request body.')
  const b = body as Record<string, unknown>

  const emailErr = requireString(b.email, 'Email')
  if (emailErr) return err(emailErr)
  const email = (b.email as string).trim().toLowerCase()
  if (!EMAIL_RE.test(email)) return err('A valid email address is required.')
  if (email.length > 320)    return err('Email address is too long.')

  const passErr = requireString(b.password, 'Password', 128)
  if (passErr) return err(passErr)

  return ok({ email, password: b.password as string })
}

// ─── Register ──────────────────────────────────────────────────────────────
interface RegisterInput {
  name:         string
  email:        string
  password:     string
  phone?:       string
  city?:        string
  countryCode:  string
  role:         'customer' | 'business'
  businessName?: string
  businessType?: string
}

export function validateRegisterInput(body: unknown): Result<RegisterInput> {
  if (typeof body !== 'object' || body === null) return err('Invalid request body.')
  const b = body as Record<string, unknown>

  // Name
  const nameErr = requireString(b.name, 'Full name', 100)
  if (nameErr) return err(nameErr)
  const name = (b.name as string).trim()
  if (!SAFE_RE.test(name)) return err('Name contains invalid characters.')

  // Email
  const emailErr = requireString(b.email, 'Email', 320)
  if (emailErr) return err(emailErr)
  const email = (b.email as string).trim().toLowerCase()
  if (!EMAIL_RE.test(email)) return err('A valid email address is required.')

  // Password
  const passErr = requireString(b.password, 'Password', 128)
  if (passErr) return err(passErr)
  const password = b.password as string
  if (password.length < 8) return err('Password must be at least 8 characters.')
  // Complexity: at least one letter and one number
  if (!/[a-zA-Z]/.test(password)) return err('Password must contain at least one letter.')
  if (!/[0-9]/.test(password))    return err('Password must contain at least one number.')

  // Role
  const role: 'customer' | 'business' =
    (b.role as string) === 'business' ? 'business' : 'customer'

  // Optional fields
  const phone = b.phone && typeof b.phone === 'string' && PHONE_RE.test(b.phone.trim())
    ? b.phone.trim() : ''
  const city = b.city && typeof b.city === 'string'
    ? b.city.trim().slice(0, 100) : ''
  const countryCode = b.countryCode && typeof b.countryCode === 'string' && ISO2_RE.test((b.countryCode as string).toUpperCase())
    ? (b.countryCode as string).toUpperCase() : 'KE'

  // Business fields
  let businessName: string | undefined
  let businessType: string | undefined
  if (role === 'business') {
    const bnErr = requireString(b.businessName, 'Business name', 150)
    if (bnErr) return err(bnErr)
    businessName = (b.businessName as string).trim()
    businessType = b.businessType && typeof b.businessType === 'string'
      ? b.businessType.slice(0, 50) : ''
  }

  return ok({ name, email, password, phone, city, countryCode, role, businessName, businessType })
}

// ─── Profile update ────────────────────────────────────────────────────────
interface ProfileUpdateInput {
  name?:        string
  phone?:       string
  city?:        string
  countryCode?: string
  businessName?: string
}

export function validateProfileUpdate(body: unknown): Result<ProfileUpdateInput> {
  if (typeof body !== 'object' || body === null) return err('Invalid request body.')
  const b = body as Record<string, unknown>
  const out: ProfileUpdateInput = {}

  if (b.name !== undefined) {
    if (typeof b.name !== 'string' || !b.name.trim()) return err('Name cannot be empty.')
    if (b.name.length > 100) return err('Name is too long.')
    if (!SAFE_RE.test(b.name.trim())) return err('Name contains invalid characters.')
    out.name = b.name.trim()
  }
  if (b.phone !== undefined) {
    if (typeof b.phone !== 'string' || (!PHONE_RE.test(b.phone.trim()) && b.phone.trim() !== ''))
      return err('Invalid phone number format.')
    out.phone = b.phone.trim().slice(0, 20)
  }
  if (b.city !== undefined) {
    out.city = typeof b.city === 'string' ? b.city.trim().slice(0, 100) : ''
  }
  if (b.countryCode !== undefined) {
    if (typeof b.countryCode !== 'string' || !ISO2_RE.test(b.countryCode.toUpperCase()))
      return err('Invalid country code.')
    out.countryCode = b.countryCode.toUpperCase()
  }
  if (b.businessName !== undefined) {
    out.businessName = typeof b.businessName === 'string'
      ? b.businessName.trim().slice(0, 150) : ''
  }

  return ok(out)
}

// ─── Payment (Flutterwave) ─────────────────────────────────────────────────
interface FlutterwavePaymentInput {
  amount:      number
  currency:    string
  email:       string
  name:        string
  phone?:      string
  description: string
  reference:   string
  redirectUrl?: string
}

const CURRENCY_RE  = /^[A-Z]{3}$/
const AMOUNT_MAX   = 10_000_000 // 10M in local currency
const SAFE_DESC_RE = /^[^\x00-\x1f\x7f<>'"`;\\]{1,200}$/

export function validateFlutterwavePayment(body: unknown): Result<FlutterwavePaymentInput> {
  if (typeof body !== 'object' || body === null) return err('Invalid request body.')
  const b = body as Record<string, unknown>

  if (typeof b.amount !== 'number' || isNaN(b.amount) || b.amount <= 0 || b.amount > AMOUNT_MAX)
    return err('Invalid payment amount.')

  if (typeof b.currency !== 'string' || !CURRENCY_RE.test(b.currency))
    return err('Invalid currency code.')

  if (typeof b.email !== 'string' || !EMAIL_RE.test(b.email.toLowerCase()))
    return err('Valid customer email is required.')

  if (typeof b.name !== 'string' || !b.name.trim() || b.name.length > 100)
    return err('Customer name is required.')

  if (typeof b.description !== 'string' || !SAFE_DESC_RE.test(b.description))
    return err('Invalid payment description.')

  if (typeof b.reference !== 'string' || !b.reference.trim() || b.reference.length > 100)
    return err('Payment reference is required.')

  // Optional: validate redirect URL is a proper https URL
  if (b.redirectUrl !== undefined) {
    try {
      const u = new URL(b.redirectUrl as string)
      if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new Error()
    } catch {
      return err('Invalid redirect URL.')
    }
  }

  return ok({
    amount:      b.amount as number,
    currency:    (b.currency as string).toUpperCase(),
    email:       (b.email as string).toLowerCase().trim(),
    name:        (b.name as string).trim(),
    phone:       b.phone && typeof b.phone === 'string' ? b.phone.trim().slice(0, 20) : undefined,
    description: b.description as string,
    reference:   (b.reference as string).trim(),
    redirectUrl: b.redirectUrl as string | undefined,
  })
}

// ─── Stripe checkout ────────────────────────────────────────────────────────
interface StripeCheckoutInput { planId: string; userId: string }
const VALID_PLANS = new Set(['premium', 'elite'])

export function validateStripeCheckout(body: unknown): Result<StripeCheckoutInput> {
  if (typeof body !== 'object' || body === null) return err('Invalid request body.')
  const b = body as Record<string, unknown>

  if (typeof b.planId !== 'string' || !VALID_PLANS.has(b.planId))
    return err('Invalid plan selection.')

  if (typeof b.userId !== 'string' || !UUID_RE.test(b.userId) && !b.userId.startsWith('u_'))
    return err('Invalid user ID.')

  return ok({ planId: b.planId, userId: b.userId })
}

// ─── Output sanitization ────────────────────────────────────────────────────
/** Strip HTML tags and null bytes from a string before storing or reflecting it */
export function sanitizeString(input: string): string {
  return input
    .replace(/\x00/g, '')           // null bytes
    .replace(/<[^>]*>/g, '')        // HTML tags
    .replace(/javascript:/gi, '')   // js: URI scheme
    .replace(/data:/gi, '')         // data: URI scheme
    .trim()
}

/** Sanitize an object's string values recursively (one level deep) */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === 'string' ? sanitizeString(v) : v
  }
  return out as T
}

export { EMAIL_RE, SAFE_RE, PHONE_RE, ISO2_RE }
