'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Plus, Star, Edit2, Trash2, Phone } from 'lucide-react'
import BusinessNav from '@/components/navigation/BusinessNav'
import { BUSINESSES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function StaffPage() {
  const staff = BUSINESSES[0].staff
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <BusinessNav />
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-20 border-b border-border bg-[#0A0A0A]/95 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-xl font-bold text-text-primary">Staff Management</h1>
            <p className="text-xs text-text-muted mt-0.5">{staff.length} team members</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-gold rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2">
            <Plus size={15} /> Add Staff Member
          </button>
        </header>

        <div className="px-8 py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {staff.map(member => (
              <div key={member.id} className="glass-card rounded-2xl p-5 border border-border hover:border-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image src={member.avatar} alt={member.name} width={52} height={52} className="rounded-xl" />
                      <span className={cn('absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface-card',
                        member.available ? 'bg-emerald-light' : 'bg-text-muted')} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary">{member.name}</div>
                      <div className="text-xs text-text-muted">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="w-7 h-7 rounded-lg glass-card border border-border flex items-center justify-center hover:border-gold/30 transition-colors">
                      <Edit2 size={12} className="text-text-muted" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-gold fill-gold" />
                      <span className="text-xs font-semibold text-text-primary">{member.rating}</span>
                      <span className="text-xs text-text-muted">({member.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Status</span>
                    <span className={cn('text-xs font-medium', member.available ? 'text-emerald-light' : 'text-text-muted')}>
                      {member.available ? '● Available' : '○ Busy'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-xs">Specialties</span>
                    <div className="flex flex-wrap gap-1 justify-end max-w-[160px]">
                      {member.specialties.slice(0, 2).map(s => (
                        <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-surface-elevated text-text-muted capitalize">{s.replace('_', ' ')}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add new staff card */}
            <button onClick={() => setShowModal(true)}
              className="glass-card rounded-2xl p-5 border border-dashed border-border hover:border-gold/30 transition-all flex flex-col items-center justify-center gap-3 min-h-[200px] text-text-muted hover:text-gold">
              <div className="w-12 h-12 rounded-xl border border-dashed border-current flex items-center justify-center">
                <Plus size={22} />
              </div>
              <span className="text-sm font-medium">Add Team Member</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
