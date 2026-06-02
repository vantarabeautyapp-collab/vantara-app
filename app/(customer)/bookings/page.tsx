'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, Calendar, Clock, Star, RotateCcw, XCircle } from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { RECENT_APPOINTMENTS } from '@/lib/mock-data'
import { cn, getStatusColor, getStatusLabel, timeAgo } from '@/lib/utils'

export default function BookingsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  const upcoming = RECENT_APPOINTMENTS.filter(a => a.status === 'confirmed' || a.status === 'pending')
  const past = RECENT_APPOINTMENTS.filter(a => a.status === 'completed' || a.status === 'cancelled')
  const shown = tab === 'upcoming' ? upcoming : past

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/home" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center">
            <ArrowLeft size={17} className="text-text-secondary" />
          </Link>
          <h1 className="font-playfair font-bold text-text-primary">My Bookings</h1>
        </div>
      </header>

      <div className="px-4 pt-4">
        <div className="flex gap-1 p-1 rounded-xl border border-border glass-card mb-5">
          {(['upcoming', 'past'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn('flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all',
                tab === t ? 'bg-gold/15 text-gold border border-gold/25' : 'text-text-muted hover:text-text-secondary')}>
              {t} {tab === t && `(${(t === 'upcoming' ? upcoming : past).length})`}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={40} className="text-text-muted mx-auto mb-4" />
            <div className="text-text-secondary font-medium">No {tab} bookings</div>
            {tab === 'upcoming' && (
              <Link href="/search" className="btn-gold mt-6 px-6 py-2.5 text-sm rounded-xl inline-flex">Book an Appointment</Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {shown.map(apt => (
              <div key={apt.id} className="glass-card rounded-2xl p-4 border border-border">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="font-semibold text-sm text-text-primary">{apt.serviceName}</div>
                    <div className="text-xs text-text-muted mt-0.5">{apt.businessName} · with {apt.staffName}</div>
                  </div>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border shrink-0', getStatusColor(apt.status))}>
                    {getStatusLabel(apt.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                  <span className="flex items-center gap-1"><Calendar size={11} /> {apt.date}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {apt.time}</span>
                  <span className="font-semibold text-gold ml-auto">KSh {apt.servicePrice.toLocaleString()}</span>
                </div>
                {apt.loyaltyPointsEarned && (
                  <div className="text-xs text-gold mb-3">+{apt.loyaltyPointsEarned} Beauty Points earned</div>
                )}
                <div className="flex gap-2 pt-3 border-t border-border">
                  {apt.status === 'completed' && (
                    <>
                      <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass-card border border-border text-text-secondary hover:text-gold hover:border-gold/30 transition-all">
                        <Star size={11} /> Leave Review
                      </button>
                      <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass-card border border-border text-text-secondary hover:text-gold hover:border-gold/30 transition-all">
                        <RotateCcw size={11} /> Rebook
                      </button>
                    </>
                  )}
                  {(apt.status === 'confirmed' || apt.status === 'pending') && (
                    <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                      <XCircle size={11} /> Cancel
                    </button>
                  )}
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
