'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import Logo, { LogoIcon } from '@/components/Logo'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole]           = useState<'customer' | 'business'>('customer')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // ── Email/password sign-in ─────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed.'); return }
      localStorage.setItem('vt_token', data.token)
      localStorage.setItem('vt_user',  JSON.stringify(data.user))
      window.location.href = data.user.role === 'business' ? '/business/dashboard' : '/home'
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Google OAuth ───────────────────────────────────────────────────────────
  function handleGoogleSignIn() {
    setGoogleLoading(true)
    // Redirect to our Google OAuth initiation route
    window.location.href = `/api/auth/google?role=${role}`
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">

      {/* Left — branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111108] to-[#0A0A0A]" />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 70%)' }}
          />
        </div>
        <div className="relative z-10">
          <Link href="/" aria-label="Vantara home">
            <Logo size="md" usePng />
          </Link>
        </div>
        <div className="relative z-10">
          <blockquote className="font-playfair text-3xl font-bold text-text-primary leading-tight mb-4">
            &ldquo;Discover. Book. Glow.&rdquo;
          </blockquote>
          <p className="text-text-secondary">
            Africa&apos;s Beauty &amp; Grooming Marketplace. Book verified professionals across Nairobi, Kampala, Lagos, and beyond.
          </p>
          <div className="flex items-center gap-4 mt-8">
            {[
              { value: '12K+', label: 'Professionals' },
              { value: '4.8★', label: 'Avg Rating' },
              { value: '5',    label: 'Countries' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-playfair text-xl font-bold gold-text">{s.value}</div>
                <div className="text-xs text-text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-xs text-text-muted">
          © 2026 Vantara · Nairobi · Kampala · Dar es Salaam
        </div>
      </div>

      {/* Right — form panel */}
      <main className="flex-1 flex items-center justify-center px-4 py-12" role="main">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex justify-center mb-8" aria-label="Vantara home">
            <Logo size="md" usePng />
          </Link>

          <h1 className="font-playfair text-3xl font-bold text-text-primary mb-1">Welcome back</h1>
          <p className="text-text-muted text-sm mb-8">Africa&apos;s Beauty &amp; Grooming Marketplace</p>

          {/* Role toggle */}
          <div className="flex rounded-xl border border-border p-1 mb-6 gap-1" role="group" aria-label="Account type">
            {(['customer', 'business'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                aria-pressed={role === r}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-150 capitalize ${
                  role === r
                    ? 'bg-gold/15 text-gold border border-gold/25'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {r === 'customer' ? 'Customer' : 'Business Owner'}
              </button>
            ))}
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border text-text-secondary text-sm font-medium hover:bg-surface-hover hover:border-gold/20 transition-all duration-150 disabled:opacity-60 disabled:cursor-wait mb-4"
            aria-label="Continue with Google"
          >
            {googleLoading ? (
              <svg className="animate-spin h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            {googleLoading ? 'Redirecting to Google…' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="relative py-3 mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-text-muted bg-[#0A0A0A]">or sign in with email</span>
            </div>
          </div>

          {/* Error from URL (e.g. oauth failure) */}
          {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('error') && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
              <AlertCircle size={15} className="shrink-0" />
              Google sign-in failed. Please try again or use email.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="input-dark"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-required="true"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="input-dark pr-11"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <a href="#" className="text-xs text-gold hover:text-gold-light transition-colors">Forgot password?</a>
              </div>
            </div>

            {error && (
              <div role="alert" className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={15} className="shrink-0" aria-hidden />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold rounded-xl py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={16} aria-hidden />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-gold hover:text-gold-light transition-colors font-medium">
              Create one free
            </Link>
          </p>

          <p className="text-center text-xs text-text-muted mt-4">
            By signing in you agree to our{' '}
            <Link href="/terms" className="text-gold/70 hover:text-gold transition-colors">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" className="text-gold/70 hover:text-gold transition-colors">Privacy Policy</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}
