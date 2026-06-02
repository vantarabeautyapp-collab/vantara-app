'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, Calendar, Clock, CheckCircle, X, ChevronDown } from 'lucide-react'
import BusinessNav from '@/components/navigation/BusinessNav'
import { TODAYS_APPOINTMENTS, RECENT_APPOINTMENTS } from '@/lib/mock-data'
import { cn, getStatusColor, getStatusLabel, formatDuration } from '@/lib/utils'
import type { Appointment } from '@/lib/types'

const ALL_APPOINTMENTS: Appointment[] = [
  ...TODAYS_APPOINTMENTS,
  ...RECENT_APPOINTMENTS.map(a => ({ ...a, businessId: 'b1', businessName: 'Crown Cuts' })),
]

export default function BusinessBookingsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeApt, setActiveApt] = useState<string | null>(null)

  let filtered = ALL_APPOINTMENTS
  if (search) filtered = filtered.filter(a =>
    a.customerName.toLowerCase().includes(search.toLowerCase()) ||
    a.serviceName.toLowerCase().includes(search.toLowerCase())
  )
  if (statusFilter !== 'all') filtered = filtered.filter(a => a.status === statusFilter)

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <BusinessNav />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-20 border-b border-border bg-[#0A0A0A]/95 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-xl font-bold text-text-primary">Bookings</h1>
            <div className="text-xs text-text-muted mt-0.5">Manage all appointments</div>
          </div>
          <Link href="#" className="btn-gold rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2">
            <Calendar size={15} /> Add Manual Booking
          </Link>
        </header>

        <div className="px-8 py-6">
          {/* Filters */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card border border-border flex-1 max-w-xs">
              <Search size={15} className="text-text-muted shrink-0" />
              <input
                placeholder="Search customer or service..."
                className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none flex-1"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    'text-xs px-3 py-2 rounded-xl border font-medium capitalize transition-all',
                    statusFilter === status
                      ? 'bg-gold/15 text-gold border-gold/30'
                      : 'glass-card border-border text-text-muted hover:text-text-secondary'
                  )}
                >
                  {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="glass-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Customer', 'Service', 'Date & Time', 'Duration', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(apt => (
                  <tr key={apt.id} className="hover:bg-surface-hover transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Image src={apt.customerAvatar} alt={apt.customerName} width={32} height={32} className="rounded-full shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-text-primary">{apt.customerName}</div>
                          <div className="text-xs text-text-muted">with {apt.staffName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{apt.serviceName}</td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-text-secondary">{apt.date}</div>
                      <div className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {apt.time}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">{formatDuration(apt.serviceDuration)}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-gold">KSh {apt.servicePrice.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', getStatusColor(apt.status))}>
                        {getStatusLabel(apt.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {apt.status === 'pending' && (
                          <button className="w-7 h-7 rounded-lg bg-emerald-brand/15 border border-emerald-brand/30 flex items-center justify-center hover:bg-emerald-brand/25 transition-colors" title="Confirm">
                            <CheckCircle size={13} className="text-emerald-light" />
                          </button>
                        )}
                        {(apt.status === 'pending' || apt.status === 'confirmed') && (
                          <button className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center hover:bg-red-500/20 transition-colors" title="Cancel">
                            <X size={13} className="text-red-400" />
                          </button>
                        )}
                        <button className="w-7 h-7 rounded-lg glass-card border border-border flex items-center justify-center" title="Details">
                          <ChevronDown size={13} className="text-text-muted" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-text-muted text-sm">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
