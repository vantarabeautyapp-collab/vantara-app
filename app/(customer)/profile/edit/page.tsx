'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, Camera, CheckCircle } from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { cn } from '@/lib/utils'

export default function EditProfilePage() {
  const { user, loading } = useCurrentUser()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    name:     user?.name     ?? '',
    email:    user?.email    ?? '',
    phone:    user?.phone    ?? '',
    city:     user?.city     ?? 'nairobi',
    bio:      '',
  })

  if (loading || !user) return null

  function update(key: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--color-background)' }}>
      <header className="sticky top-0 z-30 border-b border-border backdrop-blur-xl px-4 py-4"
        style={{ background: 'rgba(18,13,8,0.95)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center">
              <ArrowLeft size={17} className="text-text-secondary" />
            </Link>
            <h1 className="font-playfair font-bold text-text-primary">Edit Profile</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={cn(
              'btn-gold rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-1.5 disabled:opacity-60 transition-all',
              saved && 'border-emerald-brand/40 bg-emerald-brand/15 text-emerald-light'
            )}
          >
            {saving
              ? <span className="flex items-center gap-1.5"><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving…</span>
              : saved
              ? <><CheckCircle size={14} />Saved!</>
              : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="px-4 pt-5 space-y-5">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Image src={user.avatar} alt={user.name} width={88} height={88} className="rounded-2xl border-2 border-gold/30" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gold flex items-center justify-center border-2 border-background shadow-lg hover:bg-gold-light transition-colors"
              aria-label="Change photo">
              <Camera size={14} className="text-[#120D08]" />
            </button>
          </div>
          <p className="text-xs text-text-muted">Tap to change photo</p>
        </div>

        {/* Fields */}
        <div className="glass-card rounded-2xl border border-border p-4 space-y-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Personal Info</p>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Full Name</label>
            <input
              className="input-dark w-full"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
            <input
              type="email"
              className="input-dark w-full"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Phone</label>
            <input
              type="tel"
              className="input-dark w-full"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="+254 700 000 000"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">City</label>
            <select
              className="input-dark w-full"
              value={form.city}
              onChange={e => update('city', e.target.value)}
            >
              <option value="nairobi">Nairobi, Kenya</option>
              <option value="kampala">Kampala, Uganda</option>
              <option value="dar-es-salaam">Dar es Salaam, Tanzania</option>
              <option value="lagos">Lagos, Nigeria</option>
              <option value="accra">Accra, Ghana</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Bio <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <textarea
              className="input-dark w-full resize-none h-20"
              value={form.bio}
              onChange={e => update('bio', e.target.value)}
              placeholder="A short note about yourself…"
            />
          </div>
        </div>

        {/* Hair & Style preferences */}
        <div className="glass-card rounded-2xl border border-border p-4 space-y-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Style Preferences</p>
          <p className="text-xs text-text-muted leading-relaxed">
            These help our Style Match AI recommend the best professionals for your hair type and style goals.
          </p>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Hair Type</label>
            <select className="input-dark w-full">
              <option value="">Select hair type…</option>
              <option>Type 4C — Coily / Kinky</option>
              <option>Type 4B — Kinky</option>
              <option>Type 4A — Tightly Coiled</option>
              <option>Type 3C — Curly Coily</option>
              <option>Type 3B — Curly</option>
              <option>Type 3A — Loose Curly</option>
              <option>Type 2 — Wavy</option>
              <option>Type 1 — Straight</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Preferred Services</label>
            <div className="flex flex-wrap gap-2">
              {['Braiding', 'Natural Hair', 'Locs', 'Fades', 'Makeup', 'Skincare', 'Nails', 'Weaves'].map(s => (
                <button key={s} className="text-xs px-3 py-1.5 rounded-full border border-border text-text-muted hover:border-gold/30 hover:text-gold transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CustomerNav />
    </div>
  )
}
