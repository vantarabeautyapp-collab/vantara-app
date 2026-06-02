'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowLeft, Crown, Star, Gift, Users, Zap,
  ChevronRight, CheckCircle, Copy, Lock
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { CURRENT_USER, LOYALTY_REWARDS, RECENT_APPOINTMENTS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TIERS = [
  { id: 'bronze', label: 'Bronze', min: 0, max: 999, color: 'text-amber-600', border: 'border-amber-600/40', bg: 'bg-amber-600/10', icon: '●' },
  { id: 'silver', label: 'Silver', min: 1000, max: 4999, color: 'text-slate-400', border: 'border-slate-400/40', bg: 'bg-slate-400/10', icon: '◆' },
  { id: 'gold', label: 'Gold', min: 5000, max: 9999, color: 'text-gold', border: 'border-gold/40', bg: 'bg-gold/10', icon: '★' },
  { id: 'platinum', label: 'Platinum', min: 10000, max: Infinity, color: 'text-purple-400', border: 'border-purple-400/40', bg: 'bg-purple-400/10', icon: '♛' },
]

const POINT_HISTORY = [
  { label: 'Knotless Braids @ Luxe Beauty', points: 550, type: 'earned', date: 'May 20' },
  { label: 'Acrylic Nails @ Glam Studio', points: 250, type: 'earned', date: 'May 10' },
  { label: 'Referral bonus — Kevin O.', points: 200, type: 'earned', date: 'May 5' },
  { label: 'Review reward', points: 50, type: 'earned', date: 'May 1' },
  { label: '20% Discount Redeemed', points: -500, type: 'redeemed', date: 'Apr 28' },
  { label: 'Classic Fade @ Crown Cuts', points: 80, type: 'earned', date: 'Apr 22' },
]

export default function RewardsPage() {
  const user = CURRENT_USER
  const [activeTab, setActiveTab] = useState<'rewards' | 'history' | 'referral'>('rewards')
  const [copiedCode, setCopiedCode] = useState(false)

  const currentTier = TIERS.find(t => user.loyaltyPoints >= t.min && user.loyaltyPoints <= t.max) || TIERS[0]
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1]
  const pct = nextTier
    ? Math.min(100, ((user.loyaltyPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100)
    : 100

  function copyReferral() {
    navigator.clipboard.writeText('AMARA2026')
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/home" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center">
            <ArrowLeft size={17} className="text-text-secondary" />
          </Link>
          <div>
            <h1 className="font-playfair font-bold text-text-primary">Beauty Passport</h1>
            <div className="text-xs text-text-muted">Loyalty Rewards</div>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-5">
        {/* Passport Card */}
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1A1A0A 0%, #252213 40%, #1A1505 100%)', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Crown size={18} className="text-gold" />
                <span className="text-xs font-bold tracking-widest uppercase text-gold">Vantara</span>
              </div>
              <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full border uppercase', currentTier.color, currentTier.border, currentTier.bg)}>
                {currentTier.icon} {currentTier.label}
              </span>
            </div>
            <div className="mb-1 font-playfair text-4xl font-bold text-text-primary">
              <span className="gold-text">{user.loyaltyPoints.toLocaleString()}</span>
            </div>
            <div className="text-xs text-text-muted mb-5">Beauty Points</div>
            {nextTier && (
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-2">
                  <span>{currentTier.label}</span>
                  <span>{user.loyaltyPoints.toLocaleString()} / {nextTier.min.toLocaleString()} → {nextTier.label}</span>
                </div>
                <div className="h-2 bg-[#0A0A0A]/60 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #C9A84C, #E8C97D)' }}
                  />
                </div>
                <div className="text-xs text-text-muted mt-1.5">
                  {(nextTier.min - user.loyaltyPoints).toLocaleString()} points to {nextTier.label}
                </div>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-gold/15 flex items-center justify-between">
              <div className="text-xs text-text-muted">{user.name}</div>
              <div className="text-xs text-text-muted">{user.totalBookings} bookings</div>
            </div>
          </div>
        </div>

        {/* Tier ladder */}
        <div className="grid grid-cols-4 gap-2">
          {TIERS.map((tier, i) => {
            const isActive = tier.id === currentTier.id
            const isPast = i < TIERS.indexOf(currentTier)
            return (
              <div
                key={tier.id}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center',
                  isActive ? `${tier.bg} ${tier.border}` : isPast ? 'border-emerald-brand/30 bg-emerald-brand/10' : 'border-border bg-surface-elevated'
                )}
              >
                {isPast ? (
                  <CheckCircle size={18} className="text-emerald-light" />
                ) : (
                  <span className={cn('text-xl', isActive ? tier.color : 'text-text-muted')}>{tier.icon}</span>
                )}
                <span className={cn('text-xs font-semibold', isActive ? tier.color : isPast ? 'text-emerald-light' : 'text-text-muted')}>
                  {tier.label}
                </span>
                <span className="text-xs text-text-muted leading-none">
                  {tier.min === 0 ? '0' : `${(tier.min / 1000).toFixed(0)}K`}+ pts
                </span>
              </div>
            )
          })}
        </div>

        {/* How to earn */}
        <div className="glass-card rounded-2xl p-4 border border-border">
          <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">How to Earn Points</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Star, label: 'Leave a review', pts: '+50 pts', color: 'text-gold' },
              { icon: Gift, label: 'Book a service', pts: '+1 per KSh 10', color: 'text-emerald-light' },
              { icon: Users, label: 'Refer a friend', pts: '+200 pts', color: 'text-purple-400' },
              { icon: Zap, label: 'Consecutive visits', pts: '+100 bonus', color: 'text-blue-400' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2.5">
                <div className={cn('w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0')}>
                  <item.icon size={15} className={item.color} />
                </div>
                <div>
                  <div className="text-xs text-text-primary leading-tight">{item.label}</div>
                  <div className={cn('text-xs font-bold', item.color)}>{item.pts}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl border border-border glass-card">
          {(['rewards', 'history', 'referral'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all duration-150',
                activeTab === tab
                  ? 'bg-gold/15 text-gold border border-gold/25'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Rewards tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-3 animate-fade-up">
            {LOYALTY_REWARDS.map(reward => {
              const canRedeem = user.loyaltyPoints >= reward.pointsCost && reward.available
              return (
                <div
                  key={reward.id}
                  className={cn(
                    'glass-card rounded-2xl p-4 border transition-all duration-200 flex gap-3',
                    canRedeem ? 'border-border hover:border-gold/30' : 'border-border opacity-70'
                  )}
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={reward.image} alt={reward.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-sm text-text-primary">{reward.name}</div>
                      {!reward.available && <Lock size={13} className="text-text-muted shrink-0 mt-0.5" />}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{reward.description}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className={cn(
                        'flex items-center gap-1 text-xs font-bold',
                        canRedeem ? 'text-gold' : 'text-text-muted'
                      )}>
                        <Crown size={11} />
                        {reward.pointsCost.toLocaleString()} pts
                      </span>
                      <button
                        className={cn(
                          'text-xs px-3 py-1.5 rounded-lg font-semibold transition-all',
                          canRedeem
                            ? 'bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25'
                            : 'bg-surface-elevated text-text-muted cursor-not-allowed'
                        )}
                        disabled={!canRedeem}
                      >
                        {canRedeem ? 'Redeem' : 'Need more points'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* History tab */}
        {activeTab === 'history' && (
          <div className="animate-fade-up">
            <div className="space-y-1">
              {POINT_HISTORY.map((entry, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm text-text-primary">{entry.label}</div>
                    <div className="text-xs text-text-muted mt-0.5">{entry.date}</div>
                  </div>
                  <span className={cn(
                    'text-sm font-bold',
                    entry.type === 'earned' ? 'text-emerald-light' : 'text-red-400'
                  )}>
                    {entry.type === 'earned' ? '+' : ''}{entry.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Referral tab */}
        {activeTab === 'referral' && (
          <div className="animate-fade-up space-y-4">
            <div className="glass-card-gold rounded-2xl p-5 border border-gold/20 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="font-playfair font-bold text-xl text-text-primary mb-1">Share the Love</h3>
              <p className="text-sm text-text-muted mb-5">Refer friends and earn 200 points for every person who books their first appointment.</p>
              <div className="flex items-center gap-2 bg-surface-elevated rounded-xl border border-border p-3 mb-4">
                <span className="flex-1 text-center font-bold text-gold tracking-widest text-lg">AMARA2026</span>
                <button
                  onClick={copyReferral}
                  className={cn(
                    'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all',
                    copiedCode
                      ? 'border-emerald-brand/40 bg-emerald-brand/10 text-emerald-light'
                      : 'border-border text-text-secondary hover:border-gold/30 hover:text-gold'
                  )}
                >
                  {copiedCode ? <><CheckCircle size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                </button>
              </div>
              <button className="w-full btn-gold rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
                Share Referral Link
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-border">
              <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Your Referrals</div>
              <div className="text-center py-6">
                <div className="text-text-muted text-sm">No referrals yet</div>
                <div className="text-xs text-text-muted mt-1">Share your code to start earning!</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CustomerNav />
    </div>
  )
}
