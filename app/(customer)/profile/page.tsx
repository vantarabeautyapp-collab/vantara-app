'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Edit3, Settings, Bell, Shield, Star, LogOut,
  MapPin, Phone, Mail, Crown, ChevronRight, Heart, Calendar
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const MENU_ITEMS = [
  { label: 'Saved Places', icon: Heart, href: '/saved', badge: '4' },
  { label: 'Notifications', icon: Bell, href: '/notifications', badge: '3' },
  { label: 'Payment Methods', icon: Shield, href: '/payments' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

export default function ProfilePage() {
  const { user, loading, clear } = useCurrentUser()

  // AuthGuard in layout handles redirect; render nothing while loading
  if (loading || !user) return null

  const tierColors: Record<string, { text: string; bg: string; border: string }> = {
    bronze: { text: 'text-amber-600', bg: 'bg-amber-600/15', border: 'border-amber-600/30' },
    silver: { text: 'text-slate-300', bg: 'bg-slate-400/15', border: 'border-slate-400/30' },
    gold:   { text: 'text-gold',      bg: 'bg-gold/15',       border: 'border-gold/30' },
    platinum:{ text: 'text-purple-400',bg: 'bg-purple-500/15', border: 'border-purple-400/30' },
  }
  const tc = tierColors[user.loyaltyTier] || tierColors.silver

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="relative px-4 pt-12 pb-6 border-b border-border">
        <div className="absolute top-0 left-0 right-0 h-32 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.5), transparent 70%)' }} />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image src={user.avatar} alt={user.name} width={72} height={72} className="rounded-2xl border-2 border-gold/30" />
              <div className={cn('absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-xs font-bold border', tc.bg, tc.border, tc.text)}>
                {user.loyaltyTier.charAt(0).toUpperCase() + user.loyaltyTier.slice(1)}
              </div>
            </div>
            <div>
              <h1 className="font-playfair text-xl font-bold text-text-primary">{user.name}</h1>
              <div className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                <MapPin size={11} /> Nairobi, Kenya
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Crown size={11} className="text-gold" />
                <span className="text-xs text-gold font-semibold">{user.loyaltyPoints.toLocaleString()} points</span>
              </div>
            </div>
          </div>
          <Link href="/profile/edit" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center border border-border">
            <Edit3 size={16} className="text-text-secondary" />
          </Link>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Bookings', value: user.totalBookings },
            { label: 'Reviews', value: '12' },
            { label: 'Saved', value: '4' },
          ].map(s => (
            <div key={s.label} className="glass-card rounded-xl p-3 text-center border border-border">
              <div className="font-playfair font-bold text-xl text-text-primary">{s.value}</div>
              <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="glass-card rounded-2xl p-4 border border-border space-y-3">
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider">Contact Info</div>
          {[
            { icon: Mail, value: user.email },
            { icon: Phone, value: user.phone },
          ].map(({ icon: Icon, value }) => (
            <div key={value} className="flex items-center gap-3 text-sm text-text-secondary">
              <Icon size={14} className="text-text-muted shrink-0" />
              {value}
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="glass-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {MENU_ITEMS.map(item => (
            <Link key={item.label} href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface-hover transition-colors">
              <div className="w-9 h-9 rounded-xl glass-card flex items-center justify-center border border-border shrink-0">
                <item.icon size={16} className="text-text-secondary" />
              </div>
              <span className="flex-1 text-sm text-text-primary">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/25 font-bold">{item.badge}</span>
              )}
              <ChevronRight size={15} className="text-text-muted" />
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={async () => {
            try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }) } catch {}
            clear()
            window.location.href = '/'
          }}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>

        <div className="text-center text-xs text-text-muted pb-2">
          Vantara v1.0.0 · Member since {user.joinedAt}
        </div>
      </div>

      <CustomerNav />
    </div>
  )
}
