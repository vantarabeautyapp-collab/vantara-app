'use client'

import { useState } from 'react'
import BusinessNav from '@/components/navigation/BusinessNav'
import {
  Building2, Clock, MapPin, Phone, Mail, Globe, Camera,
  Bell, Shield, CreditCard, ChevronRight, Check,
  Instagram, Facebook, Twitter
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoIcon } from '@/components/Logo'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const defaultHours = DAYS.map((day, i) => ({
  day,
  open: i < 6,
  from: '08:00',
  to: '19:00',
}))

export default function BusinessSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'hours' | 'notifications' | 'billing'>('profile')
  const [hours, setHours] = useState(defaultHours)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <BusinessNav />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary font-display">Settings</h1>
            <p className="text-text-muted text-sm mt-0.5">Manage your business profile and preferences</p>
          </div>
          <button
            onClick={handleSave}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
              saved ? 'bg-emerald-brand/20 text-emerald-light border border-emerald-brand/30' : 'btn-gold'
            )}
          >
            {saved ? <><Check size={15} /> Saved!</> : 'Save Changes'}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Tabs */}
          <div className="w-52 flex-shrink-0">
            <div className="glass-card rounded-2xl border border-border p-2 space-y-0.5">
              {[
                { key: 'profile', label: 'Business Profile', icon: Building2 },
                { key: 'hours', label: 'Opening Hours', icon: Clock },
                { key: 'notifications', label: 'Notifications', icon: Bell },
                { key: 'billing', label: 'Billing & Plan', icon: CreditCard },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                    activeTab === key
                      ? 'bg-gold/10 text-gold border border-gold/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  )}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Business Profile Tab */}
            {activeTab === 'profile' && (
              <div className="glass-card rounded-2xl border border-border p-6 space-y-6">
                {/* Logo */}
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl glass-card-gold border-2 border-gold/40 flex items-center justify-center">
                      <LogoIcon size={52} />
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-gold rounded-full flex items-center justify-center shadow-lg">
                      <Camera size={13} className="text-black" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">Crown Cuts Barbershop</h3>
                    <p className="text-sm text-text-muted">Upload a logo or profile photo</p>
                    <button className="mt-2 text-xs text-gold hover:underline">Change photo</button>
                  </div>
                </div>

                <div className="border-t border-border" />

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Business Name</label>
                    <input className="input-dark w-full" defaultValue="Crown Cuts Barbershop" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Category</label>
                    <select className="input-dark w-full">
                      <option>Barbershop</option>
                      <option>Hair Salon</option>
                      <option>Nail Salon</option>
                      <option>Makeup Artist</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-text-muted mb-1.5">Bio / Description</label>
                    <textarea className="input-dark w-full resize-none" rows={3}
                      defaultValue="Premium barbershop in Westlands, Nairobi. Specialising in fades, tapers, and beard grooming. Walk-ins welcome." />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input className="input-dark w-full pl-9" defaultValue="+254 712 345 678" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Email</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input className="input-dark w-full pl-9" defaultValue="hello@crowncuts.co.ke" type="email" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-text-muted mb-1.5">Address</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input className="input-dark w-full pl-9" defaultValue="Westgate Mall, Westlands, Nairobi, Kenya" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Website</label>
                    <div className="relative">
                      <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input className="input-dark w-full pl-9" placeholder="https://yoursite.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">City</label>
                    <select className="input-dark w-full">
                      <option>Nairobi</option>
                      <option>Mombasa</option>
                      <option>Kampala</option>
                      <option>Dar es Salaam</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-border pt-5">
                  <h4 className="text-sm font-semibold text-text-primary mb-4">Social Media</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
                        <Instagram size={12} /> Instagram
                      </label>
                      <input className="input-dark w-full text-sm" placeholder="@handle" />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
                        <Facebook size={12} /> Facebook
                      </label>
                      <input className="input-dark w-full text-sm" placeholder="Page name" />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
                        <Twitter size={12} /> Twitter
                      </label>
                      <input className="input-dark w-full text-sm" placeholder="@handle" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Opening Hours Tab */}
            {activeTab === 'hours' && (
              <div className="glass-card rounded-2xl border border-border p-6">
                <h3 className="text-base font-semibold text-text-primary mb-6">Opening Hours</h3>
                <div className="space-y-3">
                  {hours.map((h, i) => (
                    <div key={h.day} className="flex items-center gap-4 py-2.5 border-b border-border/50 last:border-0">
                      <div className="w-28 text-sm font-medium text-text-primary">{h.day}</div>
                      <button
                        onClick={() => setHours(prev => prev.map((x, j) => j === i ? { ...x, open: !x.open } : x))}
                        className={cn(
                          'relative w-10 h-5 rounded-full transition-colors flex-shrink-0',
                          h.open ? 'bg-emerald-brand' : 'bg-border'
                        )}
                      >
                        <span className={cn(
                          'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                          h.open ? 'translate-x-5' : 'translate-x-0.5'
                        )} />
                      </button>
                      {h.open ? (
                        <>
                          <input
                            type="time"
                            value={h.from}
                            onChange={e => setHours(prev => prev.map((x, j) => j === i ? { ...x, from: e.target.value } : x))}
                            className="input-dark text-sm w-28"
                          />
                          <span className="text-text-muted text-sm">to</span>
                          <input
                            type="time"
                            value={h.to}
                            onChange={e => setHours(prev => prev.map((x, j) => j === i ? { ...x, to: e.target.value } : x))}
                            className="input-dark text-sm w-28"
                          />
                        </>
                      ) : (
                        <span className="text-text-muted text-sm italic">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="glass-card rounded-2xl border border-border p-6 space-y-5">
                <h3 className="text-base font-semibold text-text-primary mb-2">Notification Preferences</h3>
                {[
                  { label: 'New Booking', desc: 'Alert when a customer books an appointment', on: true },
                  { label: 'Booking Cancellation', desc: 'Alert when a customer cancels', on: true },
                  { label: 'Customer Review', desc: 'Alert when you receive a new review', on: true },
                  { label: 'Daily Summary', desc: 'Receive a daily report at end of day', on: false },
                  { label: 'Promotion Performance', desc: 'Weekly report on promotion usage', on: false },
                  { label: 'Payment Received', desc: 'Alert when a payment is confirmed', on: true },
                  { label: 'Low Availability', desc: 'Alert when all slots are nearly full', on: false },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-start justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-text-primary">{item.label}</div>
                      <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
                    </div>
                    <button className={cn(
                      'relative w-10 h-5 rounded-full transition-colors flex-shrink-0 mt-0.5',
                      item.on ? 'bg-gold' : 'bg-border'
                    )}>
                      <span className={cn(
                        'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                        item.on ? 'translate-x-5' : 'translate-x-0.5'
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-5">
                {/* Current Plan */}
                <div className="glass-card-gold rounded-2xl border border-gold/30 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-gold/70 font-medium mb-1">Current Plan</div>
                      <h3 className="text-xl font-bold text-text-primary font-display">Premium</h3>
                      <p className="text-text-muted text-sm mt-1">KSh 4,999 / month · Renews Jul 1, 2026</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                      <Shield size={22} className="text-gold" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Unlimited Bookings', 'Analytics Dashboard', 'Promotional Tools', 'Priority Support', 'Premium Badge'].map(f => (
                      <span key={f} className="flex items-center gap-1.5 text-xs text-gold/80 bg-gold/10 px-2.5 py-1 rounded-full">
                        <Check size={10} /> {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button className="px-4 py-2 btn-gold text-sm rounded-xl">Upgrade to Elite</button>
                    <button className="px-4 py-2 text-sm text-text-muted hover:text-text-secondary transition-colors">Cancel Plan</button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="glass-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-semibold text-text-primary">Payment Method</h3>
                    <button className="text-sm text-gold hover:underline">+ Add method</button>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-hover border border-border">
                    <div className="w-10 h-7 rounded-md bg-green-600 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">M-PESA</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">M-Pesa</div>
                      <div className="text-xs text-text-muted">+254 712 *** ***</div>
                    </div>
                    <span className="text-xs text-emerald-light bg-emerald-brand/10 px-2 py-0.5 rounded-full">Default</span>
                  </div>
                </div>

                {/* Invoice History */}
                <div className="glass-card rounded-2xl border border-border p-6">
                  <h3 className="text-base font-semibold text-text-primary mb-5">Invoice History</h3>
                  <div className="space-y-3">
                    {[
                      { date: 'Jun 1, 2026', amount: 'KSh 4,999', plan: 'Premium', status: 'Paid' },
                      { date: 'May 1, 2026', amount: 'KSh 4,999', plan: 'Premium', status: 'Paid' },
                      { date: 'Apr 1, 2026', amount: 'KSh 4,999', plan: 'Premium', status: 'Paid' },
                    ].map((inv) => (
                      <div key={inv.date} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                        <div>
                          <div className="text-sm text-text-primary">{inv.plan} Plan</div>
                          <div className="text-xs text-text-muted">{inv.date}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-text-primary">{inv.amount}</span>
                          <span className="text-xs text-emerald-light bg-emerald-brand/10 px-2 py-0.5 rounded-full">{inv.status}</span>
                          <button className="text-xs text-gold hover:underline">PDF</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
