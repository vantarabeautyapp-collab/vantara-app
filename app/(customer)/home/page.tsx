'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  Search, MapPin, Bell, Star, Clock, ArrowRight,
  Crown, CheckCircle, Shield, Zap, ChevronRight, Scissors
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { BUSINESSES, RECENT_APPOINTMENTS } from '@/lib/mock-data'
import { cn, formatCurrency, getStatusColor, getStatusLabel, timeAgo } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const QUICK_CATEGORIES = [
  { id: 'barbershop', label: 'Barbers', emoji: '✂️' },
  { id: 'salon', label: 'Salons', emoji: '💇' },
  { id: 'nails', label: 'Nails', emoji: '💅' },
  { id: 'makeup', label: 'Makeup', emoji: '💄' },
  { id: 'braiding', label: 'Braids', emoji: '🪢' },
  { id: 'locs', label: 'Locs', emoji: '🌀' },
]

export default function CustomerHomePage() {
  const { user, loading } = useCurrentUser()

  // AuthGuard in layout handles redirect; render nothing while loading
  if (loading || !user) return null

  const openNow = BUSINESSES.filter(b => b.isOpen)
  const featured = BUSINESSES.filter(b => b.featured)
  const upcoming = RECENT_APPOINTMENTS.filter(a => a.status === 'confirmed' || a.status === 'pending')

  const tierColors: Record<string, string> = {
    bronze: 'from-amber-700/30 to-amber-900/20',
    silver: 'from-slate-500/30 to-slate-700/20',
    gold: 'from-gold/30 to-gold-dim/20',
    platinum: 'from-purple-600/30 to-purple-900/20',
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-text-muted">Good afternoon,</div>
            <div className="font-semibold text-text-primary text-sm">{user.name.split(' ')[0]} 👋</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass-card-gold">
              <Crown size={11} className="text-gold" />
              <span className="text-xs font-semibold text-gold capitalize">{user.loyaltyTier}</span>
            </div>
            <button className="relative w-9 h-9 rounded-xl glass-card flex items-center justify-center" aria-label="Notifications">
              <Bell size={17} className="text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold" />
            </button>
          </div>
        </div>
        {/* Location + Search row */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card">
            <Search size={15} className="text-text-muted shrink-0" />
            <span className="text-text-muted text-sm">Search salons, barbers, nail studios...</span>
          </Link>
          <button className="w-10 h-10 rounded-xl glass-card flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-gold" />
          </button>
        </div>
      </header>

      <div className="px-4 space-y-6 pt-4">
        {/* Beauty Passport Card */}
        <div className={cn(
          'rounded-2xl p-5 bg-gradient-to-br relative overflow-hidden border',
          user.loyaltyTier === 'silver' ? 'from-slate-800/60 to-slate-900/40 border-slate-600/30' : 'from-gold-subtle to-surface border-gold/20'
        )}>
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${user.loyaltyTier === 'gold' ? '#C9A84C' : '#94A3B8'}, transparent)` }} />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Crown size={13} className="text-gold" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">Beauty Passport</span>
              </div>
              <div className="font-playfair text-3xl font-bold text-text-primary">{user.loyaltyPoints.toLocaleString()}</div>
              <div className="text-xs text-text-muted mt-0.5">points available</div>
            </div>
            <span className={cn(
              'px-2.5 py-1 rounded-full text-xs font-bold uppercase',
              user.loyaltyTier === 'silver' && 'bg-slate-400/20 text-slate-300 border border-slate-400/30',
              user.loyaltyTier === 'gold' && 'bg-gold/20 text-gold border border-gold/30',
              user.loyaltyTier === 'bronze' && 'bg-amber-600/20 text-amber-500 border border-amber-600/30',
            )}>
              {user.loyaltyTier}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-text-muted mb-1.5">
              <span>{user.loyaltyTier.charAt(0).toUpperCase() + user.loyaltyTier.slice(1)} → {user.loyaltyTier === 'bronze' ? 'Silver' : user.loyaltyTier === 'silver' ? 'Gold' : 'Platinum'}</span>
              <span>{user.loyaltyPoints.toLocaleString()} / {user.loyaltyTier === 'silver' ? '5,000' : '10,000'} pts</span>
            </div>
            <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, (user.loyaltyPoints / 5000) * 100)}%`,
                  background: 'linear-gradient(90deg, #C9A84C, #E8C97D)',
                }}
              />
            </div>
          </div>
          <Link href="/rewards" className="flex items-center gap-1 mt-3 text-xs text-gold hover:text-gold-light transition-colors">
            View rewards <ChevronRight size={13} />
          </Link>
        </div>

        {/* Quick categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-text-primary">Services</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {QUICK_CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.id}`}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl hover:border-gold/30 transition-all duration-150 border border-border">
                  {cat.emoji}
                </div>
                <span className="text-xs text-text-muted">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming appointment */}
        {upcoming.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-text-primary">Upcoming</h2>
              <Link href="/bookings" className="text-xs text-gold">See all</Link>
            </div>
            <div className="glass-card-gold rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <Scissors size={18} className="text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-text-primary truncate">{upcoming[0].serviceName}</div>
                  <div className="text-xs text-text-muted mt-0.5">{upcoming[0].businessName} · with {upcoming[0].staffName}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full border', getStatusColor(upcoming[0].status))}>
                      {getStatusLabel(upcoming[0].status)}
                    </span>
                    <span className="text-xs text-text-muted">{upcoming[0].date} · {upcoming[0].time}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-sm text-text-primary">KSh {upcoming[0].servicePrice.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Open Now section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-text-primary">Open Now</h2>
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-brand/20 text-emerald-light border border-emerald-brand/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-light animate-pulse" />
                Live
              </span>
            </div>
            <Link href="/search?filter=open" className="text-xs text-gold">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {openNow.map(business => (
              <Link key={business.id} href={`/salon/${business.id}`} className="shrink-0 w-56">
                <div className="glass-card rounded-2xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-200">
                  <div className="relative h-28 overflow-hidden">
                    <Image src={business.coverImage} alt={business.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {business.waitTime !== undefined && (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 text-white text-xs">
                        <Clock size={10} />
                        {business.waitTime === 0 ? 'No wait' : `${business.waitTime}min wait`}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="font-medium text-xs text-text-primary truncate">{business.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} className="text-gold fill-gold" />
                      <span className="text-xs text-text-secondary">{business.rating}</span>
                      <span className="text-xs text-text-muted">({business.reviewCount})</span>
                    </div>
                    <div className="text-xs text-text-muted mt-1">{business.neighborhood} · {business.distance}km</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured businesses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-text-primary">Top Rated</h2>
            <Link href="/search?sort=top_rated" className="text-xs text-gold">See all</Link>
          </div>
          <div className="space-y-3">
            {featured.map(business => (
              <Link key={business.id} href={`/salon/${business.id}`}>
                <div className="glass-card rounded-2xl p-3 border border-border hover:border-gold/30 transition-all duration-200 flex gap-3">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={business.coverImage} alt={business.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-sm text-text-primary truncate">{business.name}</div>
                      {business.badge === 'elite' && <span className="badge-elite shrink-0"><Crown size={9} />Elite</span>}
                      {business.badge === 'premium' && <span className="badge-premium shrink-0"><Shield size={9} />Premium</span>}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5 truncate">{business.shortDescription}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-gold fill-gold" />
                        <span className="text-xs font-semibold text-text-primary">{business.rating}</span>
                        <span className="text-xs text-text-muted">({business.reviewCount})</span>
                      </div>
                      <span className="text-text-muted text-xs">·</span>
                      <span className="text-xs text-text-muted">{business.neighborhood}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium text-gold">From KSh {Math.min(...business.services.map(s => s.price)).toLocaleString()}</span>
                      <span className="text-xs text-text-muted">{business.nextAvailable}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Style Match AI Teaser */}
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(88,28,135,0.3), rgba(17,17,17,0.8))', border: '1px solid rgba(168,85,247,0.2)' }}>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #A855F7, transparent)' }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-purple-400" />
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Style Match AI</span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">Beta</span>
            </div>
            <h3 className="font-playfair font-bold text-text-primary text-lg mb-1">Find Your Perfect Style</h3>
            <p className="text-xs text-text-muted leading-relaxed mb-4">
              Upload a selfie and our AI will recommend the perfect haircut, hairstyle, or beard style for your face shape.
            </p>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/30 transition-colors">
              Try Style Match
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      <CustomerNav />
    </div>
  )
}
