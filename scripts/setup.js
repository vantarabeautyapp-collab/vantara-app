#!/usr/bin/env node
/**
 * Vantara Setup Script
 * Run: node scripts/setup.js
 *
 * Guides you through setting up every required service.
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const BOLD = '\x1b[1m'
const GREEN = '\x1b[32m'
const GOLD = '\x1b[33m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'
const RED = '\x1b[31m'
const DIM = '\x1b[2m'

function section(title) {
  console.log(`\n${GOLD}${'─'.repeat(60)}${RESET}`)
  console.log(`${BOLD}${GOLD}${title}${RESET}`)
  console.log(`${GOLD}${'─'.repeat(60)}${RESET}\n`)
}

function ok(msg) { console.log(`${GREEN}✓${RESET} ${msg}`) }
function info(msg) { console.log(`${BLUE}ℹ${RESET} ${msg}`) }
function warn(msg) { console.log(`${GOLD}⚠${RESET} ${msg}`) }
function err(msg) { console.log(`${RED}✗${RESET} ${msg}`) }

const envPath = path.join(__dirname, '..', '.env.local')
const envExamplePath = path.join(__dirname, '..', '.env.example')

// Read current .env.local if it exists
let currentEnv = {}
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const [key, ...rest] = line.split('=')
    if (key && !key.startsWith('#')) currentEnv[key.trim()] = rest.join('=').trim()
  }
}

function checkVar(name, description) {
  if (currentEnv[name]) {
    ok(`${name} — ${DIM}configured${RESET}`)
    return true
  } else {
    warn(`${name} — ${DIM}NOT set — ${description}${RESET}`)
    return false
  }
}

console.log(`\n${BOLD}${GOLD}Vantara — Setup Status${RESET}\n`)
console.log(`${DIM}Checks your .env.local against all required services.${RESET}`)

// ─── 1. App ─────────────────────────────────────────────────────────────────
section('1 · App Config')
checkVar('NEXT_PUBLIC_APP_URL', 'Set to http://localhost:3005 for dev')
if (!currentEnv['JWT_SECRET']) {
  const secret = crypto.randomBytes(48).toString('hex')
  warn(`JWT_SECRET not set. Generated a secure one:`)
  console.log(`  ${DIM}JWT_SECRET=${secret}${RESET}`)
  console.log(`  Add this to .env.local`)
} else {
  ok('JWT_SECRET — configured')
}

// ─── 2. Convex ──────────────────────────────────────────────────────────────
section('2 · Convex Database')
info('1. Create account: https://convex.dev')
info('2. Run: npm run convex:dev')
info('3. This auto-fills CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL')
const convexOk = checkVar('NEXT_PUBLIC_CONVEX_URL', 'Run: npx convex dev')
checkVar('NEXT_PUBLIC_CONVEX_SITE_URL', 'Run: npx convex dev')
if (convexOk) {
  info('After setting up: npm run convex:seed  (loads demo data)')
}

// ─── 3. Better-Auth ─────────────────────────────────────────────────────────
section('3 · Better-Auth (Authentication)')
info('Run: npx convex env set BETTER_AUTH_SECRET $(openssl rand -base64 32)')
checkVar('BETTER_AUTH_SECRET', 'See .env.example instructions')

// ─── 4. Social OAuth ────────────────────────────────────────────────────────
section('4 · Social Login')
info('Google:    https://console.cloud.google.com → APIs → Credentials → OAuth Client')
checkVar('GOOGLE_CLIENT_ID', 'See .env.example')
checkVar('GOOGLE_CLIENT_SECRET', 'See .env.example')
info('Facebook:  https://developers.facebook.com → My Apps → Facebook Login')
checkVar('FACEBOOK_CLIENT_ID', 'See .env.example')
checkVar('FACEBOOK_CLIENT_SECRET', 'See .env.example')
info('Microsoft: https://portal.azure.com → Azure AD → App registrations')
checkVar('MICROSOFT_CLIENT_ID', 'See .env.example')
checkVar('MICROSOFT_CLIENT_SECRET', 'See .env.example')

// ─── 5. Stripe ──────────────────────────────────────────────────────────────
section('5 · Stripe (Payments)')
info('Dashboard: https://dashboard.stripe.com/apikeys')
info('Webhooks:  Dashboard → Developers → Webhooks → Add: /api/webhooks/stripe')
checkVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 'Get from Stripe dashboard')
checkVar('STRIPE_SECRET_KEY', 'Get from Stripe dashboard')
checkVar('STRIPE_WEBHOOK_SECRET', 'Get after adding webhook endpoint')

// ─── 6. PostHog ─────────────────────────────────────────────────────────────
section('6 · PostHog (Analytics)')
info('Dashboard: https://posthog.com → Project Settings → API Key')
checkVar('NEXT_PUBLIC_POSTHOG_KEY', 'Get from PostHog')

// ─── 7. Sentry ──────────────────────────────────────────────────────────────
section('7 · Sentry (Error Tracking)')
info('Dashboard: https://sentry.io → Create Next.js project → Client Keys')
checkVar('NEXT_PUBLIC_SENTRY_DSN', 'Get from Sentry project settings')

// ─── 8. Linear ──────────────────────────────────────────────────────────────
section('8 · Linear (Issue Tracking)')
info('Dashboard: https://linear.app → Settings → API → Personal API Keys')
checkVar('LINEAR_API_KEY', 'Get from Linear settings')
checkVar('LINEAR_TEAM_ID', 'Settings → Workspace → Teams')

// ─── 9. Termly ──────────────────────────────────────────────────────────────
section('9 · Termly (Privacy Policy)')
info('Dashboard: https://termly.io → Add Policy → Privacy Policy → Embed')
checkVar('NEXT_PUBLIC_TERMLY_POLICY_ID', 'Get the data-id from your Termly embed code')

// ─── 10. Railway ────────────────────────────────────────────────────────────
section('10 · Railway (Web App Deployment)')
info('1. Create account: https://railway.app')
info('2. New Project → Deploy from GitHub repo')
info('3. Add service variables from .env.example')
info('4. Railway auto-detects Next.js and deploys with zero config')
info('5. Custom domain: Railway dashboard → Settings → Domains')

// ─── Summary ─────────────────────────────────────────────────────────────────
section('Summary')
const allRequired = ['NEXT_PUBLIC_CONVEX_URL', 'BETTER_AUTH_SECRET', 'NEXT_PUBLIC_APP_URL']
const configured = allRequired.filter(k => currentEnv[k])
const pct = Math.round((configured.length / allRequired.length) * 100)
console.log(`${BOLD}Setup progress: ${pct}% (${configured.length}/${allRequired.length} required variables)${RESET}`)
console.log(`\n${DIM}Run this script any time to check setup status: ${RESET}${BOLD}npm run setup${RESET}\n`)
