'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft, Smartphone, CreditCard, Plus, Star, Trash2, Shield, CheckCircle
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { cn } from '@/lib/utils'

interface PaymentMethod {
  id:      string
  type:    'mpesa' | 'card' | 'airtel'
  label:   string
  detail:  string
  default: boolean
}

export default function PaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: 'pm1', type: 'mpesa',  label: 'M-Pesa',             detail: '+254 712 345 678', default: true  },
    { id: 'pm2', type: 'card',   label: 'Visa ending in 4242', detail: 'Expires 12/27',   default: false },
  ])
  const [showAdd, setShowAdd] = useState(false)
  const [newType, setNewType] = useState<'mpesa' | 'card' | 'airtel'>('mpesa')

  function setDefault(id: string) {
    setMethods(prev => prev.map(m => ({ ...m, default: m.id === id })))
  }

  function remove(id: string) {
    setMethods(prev => prev.filter(m => m.id !== id))
  }

  const typeIcon = { mpesa: Smartphone, card: CreditCard, airtel: Smartphone }
  const typeLabel = { mpesa: 'M-Pesa', card: 'Credit / Debit Card', airtel: 'Airtel Money' }

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--color-background)' }}>
      <header className="sticky top-0 z-30 border-b border-border backdrop-blur-xl px-4 py-4"
        style={{ background: 'rgba(18,13,8,0.95)' }}>
        <div className="flex items-center gap-3">
          <Link href="/profile" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center">
            <ArrowLeft size={17} className="text-text-secondary" />
          </Link>
          <div>
            <h1 className="font-playfair font-bold text-text-primary">Payment Methods</h1>
            <p className="text-xs text-text-muted">{methods.length} saved</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* Security banner */}
        <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-emerald-brand/25 bg-emerald-brand/5">
          <Shield size={16} className="text-emerald-light shrink-0" />
          <p className="text-xs text-text-secondary leading-relaxed">
            Your payment details are encrypted and never stored on our servers. Transactions are secured by Stripe.
          </p>
        </div>

        {/* Methods list */}
        <div className="space-y-3">
          {methods.map(method => {
            const Icon = typeIcon[method.type]
            return (
              <div
                key={method.id}
                className={cn(
                  'glass-card rounded-2xl p-4 border transition-all',
                  method.default ? 'border-gold/35 bg-gold/3' : 'border-border'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                    method.default ? 'bg-gold/15' : 'bg-surface-elevated'
                  )}>
                    <Icon size={20} className={method.default ? 'text-gold' : 'text-text-muted'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-text-primary">{method.label}</span>
                      {method.default && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/25 font-medium">Default</span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{method.detail}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {!method.default && (
                      <button
                        onClick={() => setDefault(method.id)}
                        className="text-xs px-2.5 py-1.5 rounded-lg border border-border text-text-muted hover:border-gold/30 hover:text-gold transition-all"
                      >
                        Set default
                      </button>
                    )}
                    <button
                      onClick={() => remove(method.id)}
                      className="w-8 h-8 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center justify-center hover:bg-red-500/15 transition-colors"
                      aria-label="Remove payment method"
                    >
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add new */}
        {!showAdd ? (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-border hover:border-gold/30 hover:text-gold text-text-muted transition-all glass-card"
          >
            <div className="w-11 h-11 rounded-xl border border-dashed border-current flex items-center justify-center shrink-0">
              <Plus size={20} />
            </div>
            <span className="text-sm font-medium">Add Payment Method</span>
          </button>
        ) : (
          <div className="glass-card rounded-2xl p-4 border border-gold/25 space-y-4">
            <p className="font-semibold text-sm text-text-primary">Select type</p>
            <div className="space-y-2">
              {(['mpesa', 'card', 'airtel'] as const).map(t => {
                const Icon = typeIcon[t]
                return (
                  <button
                    key={t}
                    onClick={() => setNewType(t)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
                      newType === t ? 'border-gold/40 bg-gold/5 text-gold' : 'border-border text-text-secondary hover:border-gold/25'
                    )}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{typeLabel[t]}</span>
                    {newType === t && <CheckCircle size={14} className="ml-auto" />}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-text-muted">
              {newType === 'mpesa' || newType === 'airtel'
                ? 'You\'ll be prompted to enter your mobile number and confirm via PIN at checkout.'
                : 'You\'ll be redirected to our secure card form powered by Stripe.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-xl border border-border text-sm text-text-muted hover:bg-surface-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 btn-gold rounded-xl py-2.5 text-sm font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Transaction history teaser */}
        <div className="glass-card rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Recent Transactions</p>
            <Link href="/bookings" className="text-xs text-gold hover:underline">See all</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Classic Fade — Crown Cuts',        amount: 800,  date: 'Jun 20', method: 'M-Pesa' },
              { name: 'Knotless Braids — Luxe Beauty',    amount: 4500, date: 'May 20', method: 'M-Pesa' },
              { name: 'Acrylic Nails — Glam Studio',      amount: 2500, date: 'May 10', method: 'Visa ••4242' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-text-primary text-xs font-medium">{t.name}</p>
                  <p className="text-text-muted text-xs mt-0.5">{t.date} · {t.method}</p>
                </div>
                <span className="font-semibold text-text-primary text-xs">KSh {t.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CustomerNav />
    </div>
  )
}
