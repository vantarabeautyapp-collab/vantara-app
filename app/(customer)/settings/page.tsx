'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft, Bell, Moon, Globe, Shield, Lock,
  ChevronRight, Smartphone, Info, LogOut, Trash2
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface Toggle {
  id:      string
  label:   string
  sub?:    string
  value:   boolean
}

export default function SettingsPage() {
  const { clear } = useCurrentUser()

  const [notifToggles, setNotifToggles] = useState<Toggle[]>([
    { id: 'bookings',      label: 'Booking reminders',       sub: '1 hour before your appointment', value: true  },
    { id: 'promos',        label: 'Deals & promotions',       sub: 'Flash deals from saved businesses', value: true  },
    { id: 'points',        label: 'Points & rewards',         sub: 'When you earn or can redeem',     value: true  },
    { id: 'reviews',       label: 'Review requests',          sub: 'After each completed visit',      value: false },
    { id: 'new_arrivals',  label: 'New businesses nearby',    sub: 'When new pros join in your city', value: false },
  ])

  const [privToggles, setPrivToggles] = useState<Toggle[]>([
    { id: 'location',    label: 'Location access',      sub: 'For nearby search and routing',     value: true  },
    { id: 'analytics',   label: 'Usage analytics',      sub: 'Help us improve the app',           value: true  },
    { id: 'personalise', label: 'Personalised content',  sub: 'Tailored recommendations for you', value: true  },
  ])

  function toggle(setFn: typeof setNotifToggles, id: string) {
    setFn(prev => prev.map(t => t.id === id ? { ...t, value: !t.value } : t))
  }

  function ToggleRow({ t, onToggle }: { t: Toggle; onToggle: () => void }) {
    return (
      <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
        <div className="min-w-0 mr-4">
          <p className="text-sm text-text-primary">{t.label}</p>
          {t.sub && <p className="text-xs text-text-muted mt-0.5">{t.sub}</p>}
        </div>
        <button
          onClick={onToggle}
          role="switch"
          aria-checked={t.value}
          className={cn(
            'relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
            t.value ? 'bg-gold' : 'bg-surface-elevated border border-border'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
              t.value ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--color-background)' }}>
      <header className="sticky top-0 z-30 border-b border-border backdrop-blur-xl px-4 py-4"
        style={{ background: 'rgba(18,13,8,0.95)' }}>
        <div className="flex items-center gap-3">
          <Link href="/profile" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center">
            <ArrowLeft size={17} className="text-text-secondary" />
          </Link>
          <h1 className="font-playfair font-bold text-text-primary">Settings</h1>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-5">

        {/* Account */}
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 px-1">Account</p>
          <div className="glass-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {[
              { icon: Lock,        label: 'Change Password',    href: '#' },
              { icon: Smartphone,  label: 'Linked Accounts',    href: '#' },
              { icon: Globe,       label: 'Language & Region',  href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface-hover transition-colors">
                <div className="w-8 h-8 rounded-xl glass-card flex items-center justify-center border border-border shrink-0">
                  <Icon size={15} className="text-text-secondary" />
                </div>
                <span className="flex-1 text-sm text-text-primary">{label}</span>
                <ChevronRight size={14} className="text-text-muted" />
              </Link>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 px-1">Notifications</p>
          <div className="glass-card rounded-2xl border border-border px-4">
            {notifToggles.map(t => (
              <ToggleRow key={t.id} t={t} onToggle={() => toggle(setNotifToggles, t.id)} />
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 px-1">Privacy</p>
          <div className="glass-card rounded-2xl border border-border px-4">
            {privToggles.map(t => (
              <ToggleRow key={t.id} t={t} onToggle={() => toggle(setPrivToggles, t.id)} />
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 px-1">About</p>
          <div className="glass-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {[
              { icon: Info,  label: 'About Vantara',       href: '/about' },
              { icon: Shield, label: 'Privacy Policy',     href: '/privacy-policy' },
              { icon: Info,   label: 'Terms of Service',   href: '/terms' },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface-hover transition-colors">
                <div className="w-8 h-8 rounded-xl glass-card flex items-center justify-center border border-border shrink-0">
                  <Icon size={15} className="text-text-secondary" />
                </div>
                <span className="flex-1 text-sm text-text-primary">{label}</span>
                <ChevronRight size={14} className="text-text-muted" />
              </Link>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="space-y-2">
          <button
            onClick={async () => {
              try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }) } catch {}
              clear()
              window.location.href = '/'
            }}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-border text-text-muted text-sm hover:border-red-500/20 hover:text-red-400 hover:bg-red-500/5 transition-colors">
            <Trash2 size={15} /> Delete Account
          </button>
        </div>

        <p className="text-center text-xs text-text-muted pb-2">Vantara v1.0.0</p>
      </div>

      <CustomerNav />
    </div>
  )
}
