'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Eye, EyeOff, ArrowRight, ArrowLeft,
  User, Store, CheckCircle, AlertCircle
} from 'lucide-react'
import Logo from '@/components/Logo'
import LocationPicker, { type LocationValue } from '@/components/LocationPicker'

type Step = 'role' | 'details' | 'confirm'

const BUSINESS_TYPES = [
  { id: 'barbershop',      label: 'Barbershop',      icon: '✂️' },
  { id: 'hair_salon',      label: 'Hair Salon',       icon: '💇' },
  { id: 'nail_studio',     label: 'Nail Studio',      icon: '💅' },
  { id: 'makeup_studio',   label: 'Makeup Studio',    icon: '💄' },
  { id: 'beauty_parlour',  label: 'Beauty Parlour',   icon: '✨' },
  { id: 'grooming_lounge', label: 'Grooming Lounge',  icon: '🪮' },
]

export default function RegisterPage() {
  const [step,          setStep]         = useState<Step>('role')
  const [role,          setRole]         = useState<'customer' | 'business'>('customer')
  const [showPassword,  setShowPassword] = useState(false)
  const [loading,       setLoading]      = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error,         setError]        = useState('')
  const [businessType,  setBusinessType] = useState('')
  const [location,      setLocation]     = useState<LocationValue | null>(null)
  const [form,          setForm]         = useState({
    name: '', email: '', phone: '', password: '', businessName: '',
  })

  const steps: Step[] = ['role', 'details', 'confirm']
  const stepIndex = steps.indexOf(step)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // ── Google OAuth ────────────────────────────────────────────────────────────
  function handleGoogleSignUp() {
    setGoogleLoading(true)
    window.location.href = `/api/auth/google?role=${role}`
  }

  // ── Email / password registration ───────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!location?.countryCode) {
      setError('Please select your country and town.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:         form.name,
          email:        form.email,
          phone:        form.phone,
          password:     form.password,
          countryCode:  location.countryCode,
          city:         location.city,
          role,
          businessName: form.businessName,
          businessType,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed.'); return }
      localStorage.setItem('vt_token', data.token)
      localStorage.setItem('vt_user',  JSON.stringify(data.user))
      setStep('confirm')
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Confirmation screen ─────────────────────────────────────────────────────
  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-emerald-brand/20 border border-emerald-brand/30 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle size={36} className="text-emerald-light" aria-hidden />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-text-primary mb-3">You&apos;re in!</h1>
          <p className="text-text-secondary mb-8">
            {role === 'business'
              ? `Your business profile for ${form.businessName} has been created. Our team will verify it within 24 hours.`
              : `Welcome to Vantara, ${form.name}. Discover your signature look — your Vantara Passport has been activated with 100 welcome points!`
            }
          </p>
          <div className="glass-card-gold rounded-2xl p-4 mb-8 text-left">
            <div className="text-sm font-semibold text-gold mb-2">
              {role === 'business' ? '🎉 What happens next?' : '🎁 Welcome bonus'}
            </div>
            <ul className="space-y-1.5 text-xs text-text-secondary">
              {(role === 'customer'
                ? ['100 welcome points added to your Beauty Passport', 'Discover and book from 12,000+ professionals', 'Earn more points on every booking']
                : ['Our verification team reviews your business (24h)', 'You receive a Verified badge once approved', 'Your listing goes live — customers can start booking']
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={12} className={`${role === 'customer' ? 'text-emerald-light' : 'text-gold'} mt-0.5 shrink-0`} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={role === 'business' ? '/business/dashboard' : '/home'}
            className="w-full btn-gold rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
          >
            {role === 'business' ? 'Go to Dashboard' : 'Start Discovering'}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" aria-label="Vantara home">
            <Logo size="sm" usePng />
          </Link>
          {step !== 'role' && (
            <button
              onClick={() => setStep(step === 'details' ? 'role' : 'details')}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={15} aria-hidden /> Back
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8" role="progressbar" aria-valuenow={stepIndex + 1} aria-valuemax={2}>
          {steps.slice(0, 2).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                stepIndex > i
                  ? 'bg-emerald-brand border-emerald-brand text-white'
                  : stepIndex === i
                  ? 'border-2 border-gold text-gold bg-gold/10'
                  : 'border border-border text-text-muted'
              }`}>
                {stepIndex > i ? <CheckCircle size={14} aria-hidden /> : i + 1}
              </div>
              <span className={`text-xs ${stepIndex === i ? 'text-text-primary' : 'text-text-muted'}`}>
                {i === 0 ? 'Account Type' : 'Your Details'}
              </span>
              {i < 1 && <div className={`flex-1 h-px ${stepIndex > i ? 'bg-emerald-brand' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 1 — Role selection ── */}
        {step === 'role' && (
          <div className="animate-fade-up">
            <h1 className="font-playfair text-3xl font-bold text-text-primary mb-1">Join Vantara</h1>
            <p className="text-text-muted text-sm mb-8">How will you be using the platform?</p>
            <div className="grid gap-4">
              {([
                { id: 'customer' as const, icon: User,  title: "I'm a Customer",       desc: 'Discover and book beauty services near me',            color: 'text-gold',          bg: 'bg-gold/10',          border: 'border-gold/30' },
                { id: 'business' as const, icon: Store, title: "I'm a Business Owner", desc: 'List my salon or barbershop and get bookings',          color: 'text-emerald-light', bg: 'bg-emerald-brand/10', border: 'border-emerald-brand/30' },
              ]).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setRole(opt.id); setStep('details') }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-left w-full hover:scale-[1.01] ${
                    role === opt.id ? `${opt.bg} ${opt.border}` : 'border-border glass-card hover:border-white/10'
                  }`}
                  aria-pressed={role === opt.id}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${opt.bg} border ${opt.border} shrink-0`}>
                    <opt.icon size={22} className={opt.color} aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{opt.title}</div>
                    <div className="text-sm text-text-muted mt-0.5">{opt.desc}</div>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-text-muted shrink-0" aria-hidden />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-text-muted mt-8">
              Already have an account?{' '}
              <Link href="/login" className="text-gold hover:text-gold-light font-medium transition-colors">Sign in</Link>
            </p>
          </div>
        )}

        {/* ── Step 2 — Details ── */}
        {step === 'details' && (
          <div className="animate-fade-up">
            <h1 className="font-playfair text-2xl font-bold text-text-primary mb-1">
              {role === 'business' ? 'Your Business Details' : 'Create Your Account'}
            </h1>
            <p className="text-text-muted text-sm mb-6">
              {role === 'business' ? 'Tell us about your business' : 'Fill in your details to get started'}
            </p>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
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
              {googleLoading ? 'Redirecting to Google…' : 'Sign up with Google'}
            </button>

            {/* Divider */}
            <div className="relative py-3 mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-xs text-text-muted bg-[#0A0A0A]">or fill in your details</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="name">Full Name</label>
                <input id="name" type="text" autoComplete="name" placeholder="Your full name" className="input-dark" value={form.name} onChange={e => update('name', e.target.value)} required aria-required="true" />
              </div>
              {role === 'business' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="businessName">Business Name</label>
                    <input id="businessName" type="text" placeholder="e.g. Crown Cuts Barbershop" className="input-dark" value={form.businessName} onChange={e => update('businessName', e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Business Type</label>
                    <div className="grid grid-cols-3 gap-2" role="group">
                      {BUSINESS_TYPES.map(bt => (
                        <button
                          key={bt.id}
                          type="button"
                          onClick={() => setBusinessType(bt.id)}
                          aria-pressed={businessType === bt.id}
                          className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs transition-all ${
                            businessType === bt.id
                              ? 'border-gold/40 bg-gold/10 text-gold'
                              : 'border-border text-text-muted hover:border-border hover:bg-surface-hover'
                          }`}
                        >
                          <span className="text-lg">{bt.icon}</span>
                          <span className="leading-tight text-center">{bt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="email">Email Address</label>
                <input id="email" type="email" autoComplete="email" placeholder="you@example.com" className="input-dark" value={form.email} onChange={e => update('email', e.target.value)} required aria-required="true" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" autoComplete="tel" placeholder={location?.countryCode ? `${location.flag} number` : '+254 7XX XXX XXX'} className="input-dark" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
              <LocationPicker
                value={location}
                onChange={setLocation}
                label="Your Location"
                required
                showPayments
              />
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    className="input-dark pr-11"
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    required
                    minLength={8}
                    aria-required="true"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted p-1" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff size={16} aria-hidden /> : <Eye size={16} aria-hidden />}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={15} className="shrink-0" aria-hidden />
                  {error}
                </div>
              )}

              <div className="pt-1">
                <p className="text-xs text-text-muted mb-3">
                  By creating an account you agree to our{' '}
                  <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link>.
                </p>
                <button type="submit" disabled={loading} className="w-full btn-gold rounded-xl py-3 text-sm font-semibold disabled:opacity-60">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden>
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Create Account <ArrowRight size={16} aria-hidden />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
