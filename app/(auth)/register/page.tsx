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
  { id: 'barbershop', label: 'Barbershop', icon: '✂️' },
  { id: 'hair_salon', label: 'Hair Salon', icon: '💇' },
  { id: 'nail_studio', label: 'Nail Studio', icon: '💅' },
  { id: 'makeup_studio', label: 'Makeup Studio', icon: '💄' },
  { id: 'beauty_parlour', label: 'Beauty Parlour', icon: '✨' },
  { id: 'grooming_lounge', label: 'Grooming Lounge', icon: '🪮' },
]

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<'customer' | 'business'>('customer')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [location, setLocation] = useState<LocationValue | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    businessName: '',
  })

  const steps: Step[] = ['role', 'details', 'confirm']
  const stepIndex = steps.indexOf(step)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          countryCode: location.countryCode,
          city: location.city,
          role,
          businessName: form.businessName,
          businessType,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Registration failed.')
        return
      }
      localStorage.setItem('vt_token', data.token)
      localStorage.setItem('vt_user', JSON.stringify(data.user))
      setStep('confirm')
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-emerald-brand/20 border border-emerald-brand/30 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle size={36} className="text-emerald-light" />
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
                  <CheckCircle size={12} className={`${role === 'customer' ? 'text-emerald-light' : 'text-gold'} mt-0.5 shrink-0`} />
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
            <ArrowRight size={16} />
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
          <Link href="/">
            <Logo size="sm" usePng />
          </Link>
          {step !== 'role' && (
            <button
              onClick={() => setStep(step === 'details' ? 'role' : 'details')}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              <ArrowLeft size={15} /> Back
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.slice(0, 2).map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                stepIndex > i
                  ? 'bg-emerald-brand border-emerald-brand text-white'
                  : stepIndex === i
                  ? 'border-2 border-gold text-gold bg-gold/10'
                  : 'border border-border text-text-muted'
              }`}>
                {stepIndex > i ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-xs ${stepIndex === i ? 'text-text-primary' : 'text-text-muted'}`}>
                {i === 0 ? 'Account Type' : 'Your Details'}
              </span>
              {i < 1 && <div className={`flex-1 h-px ${stepIndex > i ? 'bg-emerald-brand' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 — Role selection */}
        {step === 'role' && (
          <div className="animate-fade-up">
            <h1 className="font-playfair text-3xl font-bold text-text-primary mb-1">Join Vantara</h1>
            <p className="text-text-muted text-sm mb-8">How will you be using the platform?</p>
            <div className="grid gap-4">
              {([
                { id: 'customer' as const, icon: User, title: "I'm a Customer", desc: 'Discover and book beauty services near me', color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/30' },
                { id: 'business' as const, icon: Store, title: "I'm a Business Owner", desc: 'List my salon or barbershop and get bookings', color: 'text-emerald-light', bg: 'bg-emerald-brand/10', border: 'border-emerald-brand/30' },
              ]).map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setRole(opt.id); setStep('details') }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-left w-full hover:scale-[1.01] ${
                    role === opt.id ? `${opt.bg} ${opt.border}` : 'border-border glass-card hover:border-white/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${opt.bg} border ${opt.border} shrink-0`}>
                    <opt.icon size={22} className={opt.color} />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{opt.title}</div>
                    <div className="text-sm text-text-muted mt-0.5">{opt.desc}</div>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-text-muted shrink-0" />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-text-muted mt-8">
              Already have an account?{' '}
              <Link href="/login" className="text-gold hover:text-gold-light font-medium transition-colors">Sign in</Link>
            </p>
          </div>
        )}

        {/* Step 2 — Details */}
        {step === 'details' && (
          <div className="animate-fade-up">
            <h1 className="font-playfair text-2xl font-bold text-text-primary mb-1">
              {role === 'business' ? 'Your Business Details' : 'Create Your Account'}
            </h1>
            <p className="text-text-muted text-sm mb-6">
              {role === 'business' ? 'Tell us about your business' : 'Fill in your details to get started'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Full Name</label>
                <input type="text" placeholder="Your full name" className="input-dark" value={form.name} onChange={e => update('name', e.target.value)} required />
              </div>
              {role === 'business' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Business Name</label>
                    <input type="text" placeholder="e.g. Crown Cuts Barbershop" className="input-dark" value={form.businessName} onChange={e => update('businessName', e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Business Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {BUSINESS_TYPES.map(bt => (
                        <button
                          key={bt.id}
                          type="button"
                          onClick={() => setBusinessType(bt.id)}
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
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Email Address</label>
                <input type="email" autoComplete="email" placeholder="you@example.com" className="input-dark" value={form.email} onChange={e => update('email', e.target.value)} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Phone Number</label>
                <input type="tel" placeholder={location?.countryCode ? `${location.flag} ${location.countryName.slice(0,2)} number` : '+254 7XX XXX XXX'} className="input-dark" value={form.phone} onChange={e => update('phone', e.target.value)} />
              </div>
              <LocationPicker
                value={location}
                onChange={setLocation}
                label="Your Location"
                required
                showPayments
              />
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    className="input-dark pr-11"
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    required
                    minLength={8}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted p-1">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={15} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="pt-1">
                <p className="text-xs text-text-muted mb-3">
                  By creating an account you agree to our{' '}
                  <a href="#" className="text-gold">Terms of Service</a> and{' '}
                  <a href="#" className="text-gold">Privacy Policy</a>.
                </p>
                <button type="submit" disabled={loading} className="w-full btn-gold rounded-xl py-3 text-sm font-semibold disabled:opacity-60">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Create Account <ArrowRight size={16} />
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
