'use client'

import { useState } from 'react'
import BusinessNav from '@/components/navigation/BusinessNav'
import { Tag, Plus, Clock, Users, Percent, Zap, Gift, Star, ToggleLeft, ToggleRight, Edit2, Trash2, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

type PromoType = 'discount' | 'flash' | 'loyalty' | 'referral'
type PromoStatus = 'active' | 'scheduled' | 'expired'

interface Promo {
  id: string
  name: string
  type: PromoType
  discount: number
  code: string
  uses: number
  maxUses: number
  revenue: number
  status: PromoStatus
  startDate: string
  endDate: string
  description: string
}

const PROMOS: Promo[] = [
  {
    id: '1',
    name: 'New Customer Welcome',
    type: 'discount',
    discount: 20,
    code: 'WELCOME20',
    uses: 47,
    maxUses: 100,
    revenue: 94000,
    status: 'active',
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    description: '20% off first visit for new customers',
  },
  {
    id: '2',
    name: 'Friday Flash Deal',
    type: 'flash',
    discount: 30,
    code: 'FLASH30',
    uses: 23,
    maxUses: 30,
    revenue: 41400,
    status: 'active',
    startDate: '2026-05-30',
    endDate: '2026-06-07',
    description: '30% off all services every Friday',
  },
  {
    id: '3',
    name: 'Loyalty Bonus',
    type: 'loyalty',
    discount: 15,
    code: 'LOYAL15',
    uses: 89,
    maxUses: 200,
    revenue: 178000,
    status: 'active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    description: '15% off for Silver+ Beauty Passport holders',
  },
  {
    id: '4',
    name: 'Refer a Friend',
    type: 'referral',
    discount: 10,
    code: 'REFER10',
    uses: 34,
    maxUses: 500,
    revenue: 51000,
    status: 'active',
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    description: 'Both you and your friend get 10% off',
  },
  {
    id: '5',
    name: 'Holiday Special',
    type: 'discount',
    discount: 25,
    code: 'HOLIDAY25',
    uses: 112,
    maxUses: 120,
    revenue: 224000,
    status: 'expired',
    startDate: '2025-12-15',
    endDate: '2026-01-05',
    description: '25% off during the holiday season',
  },
]

const TYPE_CONFIG: Record<PromoType, { icon: React.ElementType; label: string; color: string; bg: string }> = {
  discount: { icon: Percent, label: 'Discount', color: 'text-gold', bg: 'bg-gold/10' },
  flash: { icon: Zap, label: 'Flash Deal', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  loyalty: { icon: Star, label: 'Loyalty', color: 'text-emerald-light', bg: 'bg-emerald-brand/10' },
  referral: { icon: Gift, label: 'Referral', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
}

const STATUS_CONFIG: Record<PromoStatus, { label: string; dot: string; text: string }> = {
  active: { label: 'Active', dot: 'bg-emerald-light', text: 'text-emerald-light' },
  scheduled: { label: 'Scheduled', dot: 'bg-gold', text: 'text-gold' },
  expired: { label: 'Expired', dot: 'bg-text-muted', text: 'text-text-muted' },
}

export default function BusinessPromotionsPage() {
  const [filter, setFilter] = useState<'all' | PromoStatus>('all')
  const [showModal, setShowModal] = useState(false)

  const filtered = filter === 'all' ? PROMOS : PROMOS.filter(p => p.status === filter)
  const activeCount = PROMOS.filter(p => p.status === 'active').length
  const totalRevenue = PROMOS.reduce((s, p) => s + p.revenue, 0)
  const totalUses = PROMOS.reduce((s, p) => s + p.uses, 0)

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <BusinessNav />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary font-display">Promotions</h1>
            <p className="text-text-muted text-sm mt-0.5">Manage discount codes and special offers</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 btn-gold text-sm rounded-xl"
          >
            <Plus size={16} />
            Create Promotion
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-5 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-brand/10 flex items-center justify-center">
                <Tag size={18} className="text-emerald-light" />
              </div>
              <span className="text-text-muted text-sm">Active Promos</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{activeCount}</div>
            <div className="text-xs text-text-muted mt-1">Running right now</div>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <TrendingUp size={18} className="text-gold" />
              </div>
              <span className="text-text-muted text-sm">Revenue Generated</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">KSh {(totalRevenue / 1000).toFixed(0)}K</div>
            <div className="text-xs text-text-muted mt-1">Across all promotions</div>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Users size={18} className="text-indigo-400" />
              </div>
              <span className="text-text-muted text-sm">Total Redemptions</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{totalUses}</div>
            <div className="text-xs text-text-muted mt-1">Codes used total</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {(['all', 'active', 'scheduled', 'expired'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                filter === f
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-hover border border-transparent'
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && <span className="ml-1.5 text-xs text-text-muted">({PROMOS.length})</span>}
            </button>
          ))}
        </div>

        {/* Promo Cards */}
        <div className="space-y-4">
          {filtered.map((promo) => {
            const typeConf = TYPE_CONFIG[promo.type]
            const statusConf = STATUS_CONFIG[promo.status]
            const Icon = typeConf.icon
            const usePct = Math.round((promo.uses / promo.maxUses) * 100)

            return (
              <div key={promo.id} className="glass-card rounded-2xl border border-border p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${typeConf.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={typeConf.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-semibold text-text-primary">{promo.name}</h3>
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${statusConf.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConf.dot}`} />
                        {statusConf.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeConf.bg} ${typeConf.color} font-medium`}>
                        {typeConf.label}
                      </span>
                    </div>

                    <p className="text-sm text-text-muted mb-3">{promo.description}</p>

                    <div className="flex items-center gap-6 text-sm flex-wrap">
                      <div>
                        <span className="text-text-muted text-xs">Code</span>
                        <div className="font-mono font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-lg mt-0.5 text-xs tracking-wider">
                          {promo.code}
                        </div>
                      </div>
                      <div>
                        <span className="text-text-muted text-xs">Discount</span>
                        <div className="font-bold text-text-primary text-lg">{promo.discount}% off</div>
                      </div>
                      <div>
                        <span className="text-text-muted text-xs">Revenue</span>
                        <div className="font-semibold text-emerald-light">KSh {promo.revenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-text-muted text-xs">Valid</span>
                        <div className="text-xs text-text-secondary mt-0.5">
                          {promo.startDate} → {promo.endDate}
                        </div>
                      </div>
                    </div>

                    {/* Usage Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
                        <span>Usage: {promo.uses} / {promo.maxUses}</span>
                        <span>{usePct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-hover rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${usePct >= 80 ? 'bg-red-400' : usePct >= 50 ? 'bg-gold' : 'bg-emerald-brand'}`}
                          style={{ width: `${usePct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 rounded-xl text-text-muted hover:text-gold hover:bg-gold/10 transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button className="p-2 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="glass-card rounded-2xl border border-border p-6 w-full max-w-md">
              <h2 className="text-lg font-bold text-text-primary mb-6 font-display">Create Promotion</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Promotion Name</label>
                  <input className="input-dark w-full" placeholder="e.g. Summer Special" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Discount %</label>
                    <input className="input-dark w-full" type="number" placeholder="20" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Promo Code</label>
                    <input className="input-dark w-full" placeholder="SUMMER20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Start Date</label>
                    <input className="input-dark w-full" type="date" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">End Date</label>
                    <input className="input-dark w-full" type="date" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Max Uses</label>
                  <input className="input-dark w-full" type="number" placeholder="100" />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1.5">Description</label>
                  <textarea className="input-dark w-full resize-none" rows={2} placeholder="Describe this promotion..." />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 btn-outline-gold text-sm rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 btn-gold text-sm rounded-xl"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
