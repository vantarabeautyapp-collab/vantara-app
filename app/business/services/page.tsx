'use client'

import { useState } from 'react'
import {
  Plus, Edit2, Trash2, Clock, DollarSign, Star, ToggleLeft, ToggleRight, X, CheckCircle
} from 'lucide-react'
import BusinessNav from '@/components/navigation/BusinessNav'
import { BUSINESSES } from '@/lib/mock-data'
import { cn, formatDuration } from '@/lib/utils'

interface ServiceForm {
  name:        string
  category:    string
  description: string
  price:       string
  duration:    string
  popular:     boolean
}

const EMPTY_FORM: ServiceForm = {
  name: '', category: 'haircut', description: '', price: '', duration: '30', popular: false,
}

const CATEGORIES = ['haircut', 'beard', 'braiding', 'nails', 'makeup', 'skincare', 'locs', 'other']

export default function ServicesPage() {
  const [services, setServices] = useState(BUSINESSES[0].services)
  const [showForm, setShowForm] = useState(false)
  const [editId,   setEditId]   = useState<string | null>(null)
  const [form,     setForm]     = useState<ServiceForm>(EMPTY_FORM)
  const [saving,   setSaving]   = useState(false)

  function openAdd() {
    setEditId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  function openEdit(id: string) {
    const svc = services.find(s => s.id === id)!
    setForm({ name: svc.name, category: svc.category, description: svc.description, price: String(svc.price), duration: String(svc.duration), popular: svc.popular ?? false })
    setEditId(id)
    setShowForm(true)
  }

  function remove(id: string) {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  async function save() {
    if (!form.name || !form.price) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    if (editId) {
      setServices(prev => prev.map(s => s.id === editId
        ? { ...s, name: form.name, category: form.category, description: form.description, price: Number(form.price), duration: Number(form.duration), popular: form.popular }
        : s
      ))
    } else {
      setServices(prev => [...prev, {
        id: `s${Date.now()}`, name: form.name, category: form.category,
        description: form.description, price: Number(form.price),
        duration: Number(form.duration), popular: form.popular,
      }])
    }
    setSaving(false)
    setShowForm(false)
  }

  const totalRevenue = services.reduce((sum, s) => sum + s.price, 0)

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-background)' }}>
      <BusinessNav />

      <main className="flex-1 ml-64 min-h-screen">
        <header className="sticky top-0 z-20 border-b border-border backdrop-blur-xl px-8 py-4 flex items-center justify-between"
          style={{ background: 'rgba(18,13,8,0.95)' }}>
          <div>
            <h1 className="font-playfair text-xl font-bold text-text-primary">Services</h1>
            <p className="text-xs text-text-muted mt-0.5">{services.length} active services</p>
          </div>
          <button onClick={openAdd} className="btn-gold rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2">
            <Plus size={15} /> Add Service
          </button>
        </header>

        <div className="px-8 py-6 space-y-6">
          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Services',  value: services.length,                            icon: Star,        color: 'text-gold',         bg: 'bg-gold/10'          },
              { label: 'Price Range',     value: `KSh ${Math.min(...services.map(s=>s.price)).toLocaleString()} – ${Math.max(...services.map(s=>s.price)).toLocaleString()}`, icon: DollarSign,  color: 'text-emerald-light', bg: 'bg-emerald-brand/10' },
              { label: 'Popular Services', value: services.filter(s => s.popular).length,    icon: Star,        color: 'text-purple-400',   bg: 'bg-purple-500/10'    },
            ].map((c, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 border border-border flex items-center gap-4">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', c.bg)}>
                  <c.icon size={18} className={c.color} />
                </div>
                <div>
                  <div className="font-playfair text-xl font-bold text-text-primary">{c.value}</div>
                  <div className="text-xs text-text-muted">{c.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Services table */}
          <div className="glass-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Service', 'Category', 'Duration', 'Price', 'Popular', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map(svc => (
                  <tr key={svc.id} className="hover:bg-surface-hover transition-colors group">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-sm text-text-primary">{svc.name}</div>
                      <div className="text-xs text-text-muted mt-0.5 max-w-xs truncate">{svc.description}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-surface-elevated text-text-secondary capitalize border border-border">
                        {svc.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Clock size={13} className="text-text-muted" />
                        {formatDuration(svc.duration)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-gold">KSh {svc.price.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setServices(prev => prev.map(s => s.id === svc.id ? { ...s, popular: !s.popular } : s))}
                        className="transition-colors"
                        title="Toggle popular"
                      >
                        {svc.popular
                          ? <ToggleRight size={22} className="text-gold" />
                          : <ToggleLeft  size={22} className="text-text-muted" />}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(svc.id)}
                          className="w-8 h-8 rounded-lg glass-card border border-border flex items-center justify-center hover:border-gold/30 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={13} className="text-text-muted" />
                        </button>
                        <button
                          onClick={() => remove(svc.id)}
                          className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={13} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-in form panel */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="w-[420px] border-l border-border flex flex-col overflow-y-auto"
            style={{ background: 'var(--color-surface)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-playfair font-bold text-text-primary">
                {editId ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-xl glass-card border border-border flex items-center justify-center">
                <X size={15} className="text-text-muted" />
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Service Name *</label>
                <input className="input-dark w-full" placeholder="e.g. Classic Fade" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Category</label>
                <select className="input-dark w-full capitalize" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Description</label>
                <textarea className="input-dark w-full resize-none h-20" placeholder="Brief description for clients…" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Price (KSh) *</label>
                  <input type="number" className="input-dark w-full" placeholder="800" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Duration (min)</label>
                  <input type="number" className="input-dark w-full" placeholder="45" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm(p => ({ ...p, popular: !p.popular }))}
                  className={cn('relative w-11 h-6 rounded-full transition-colors duration-200', form.popular ? 'bg-gold' : 'bg-surface-elevated border border-border')}
                >
                  <span className={cn('absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200', form.popular ? 'translate-x-5' : 'translate-x-0')} />
                </div>
                <span className="text-sm text-text-primary">Mark as popular</span>
              </label>
            </div>

            <div className="px-6 py-4 border-t border-border flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm text-text-muted hover:bg-surface-hover transition-colors">
                Cancel
              </button>
              <button onClick={save} disabled={saving || !form.name || !form.price}
                className="flex-1 btn-gold rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                {saving
                  ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving…</>
                  : <><CheckCircle size={15} />{editId ? 'Update' : 'Add Service'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
