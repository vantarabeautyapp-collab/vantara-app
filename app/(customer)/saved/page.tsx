'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, Heart, Star, MapPin, Clock, Crown, Shield, Trash2 } from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { BUSINESSES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function SavedPage() {
  const [saved, setSaved] = useState(BUSINESSES.slice(0, 4).map(b => b.id))

  const savedBusinesses = BUSINESSES.filter(b => saved.includes(b.id))

  function remove(id: string) {
    setSaved(prev => prev.filter(s => s !== id))
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--color-background)' }}>
      <header className="sticky top-0 z-30 border-b border-border backdrop-blur-xl px-4 py-4"
        style={{ background: 'rgba(18,13,8,0.95)' }}>
        <div className="flex items-center gap-3">
          <Link href="/profile" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center">
            <ArrowLeft size={17} className="text-text-secondary" />
          </Link>
          <div>
            <h1 className="font-playfair font-bold text-text-primary">Saved Places</h1>
            <p className="text-xs text-text-muted">{savedBusinesses.length} saved</p>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4">
        {savedBusinesses.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={44} className="text-text-muted mx-auto mb-4" />
            <p className="font-semibold text-text-secondary mb-1">No saved places yet</p>
            <p className="text-sm text-text-muted mb-6">Tap the heart icon on any listing to save it.</p>
            <Link href="/search" className="btn-gold rounded-xl px-6 py-2.5 text-sm inline-flex">
              Explore Professionals
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {savedBusinesses.map(business => (
              <div key={business.id} className="glass-card rounded-2xl border border-border overflow-hidden flex">
                <Link href={`/salon/${business.id}`} className="flex flex-1 min-w-0">
                  <div className="relative w-24 h-24 shrink-0">
                    <Image src={business.coverImage} alt={business.name} fill className="object-cover" />
                  </div>
                  <div className="p-3 flex-1 min-w-0">
                    <div className="flex items-start gap-1 mb-0.5">
                      {business.badge === 'elite' && (
                        <span className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/25 shrink-0">
                          <Crown size={9} /> Elite
                        </span>
                      )}
                      {business.badge === 'premium' && (
                        <span className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25 shrink-0">
                          <Shield size={9} /> Premium
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-sm text-text-primary truncate">{business.name}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} className="text-gold fill-gold" />
                      <span className="text-xs font-semibold text-text-primary">{business.rating}</span>
                      <span className="text-xs text-text-muted">({business.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <MapPin size={10} /> {business.neighborhood}
                      </span>
                      {business.isOpen && (
                        <span className="flex items-center gap-1 text-xs text-emerald-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-light" /> Open
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs font-medium text-gold">
                      From KSh {Math.min(...business.services.map(s => s.price)).toLocaleString()}
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col justify-center pr-3 pl-1">
                  <button
                    onClick={() => remove(business.id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 transition-colors"
                    aria-label="Remove from saved"
                  >
                    <Trash2 size={13} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CustomerNav />
    </div>
  )
}
