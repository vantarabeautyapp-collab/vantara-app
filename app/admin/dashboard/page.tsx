'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Users, Store, Shield, AlertTriangle, CheckCircle,
  TrendingUp, DollarSign, Clock, Eye, Ban, BarChart3,
  Crown, Bell, Search, ChevronRight, XCircle
} from 'lucide-react'
import { BUSINESSES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const ADMIN_STATS = [
  { label: 'Total Users', value: '24,180', sub: '+312 this week', icon: Users, color: 'text-gold', bg: 'bg-gold/10', trend: '+6.2%' },
  { label: 'Businesses', value: '1,847', sub: '+28 pending approval', icon: Store, color: 'text-emerald-light', bg: 'bg-emerald-brand/10', trend: '+3.1%' },
  { label: 'Monthly Revenue', value: 'KSh 2.4M', sub: 'Platform commissions', icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10', trend: '+18%' },
  { label: 'Bookings (MTD)', value: '8,240', sub: 'This month to date', icon: CheckCircle, color: 'text-purple-400', bg: 'bg-purple-500/10', trend: '+22%' },
]

const CITY_DATA = [
  { city: 'Nairobi', businesses: 1102, users: 14200, bookings: 4800 },
  { city: 'Kampala', businesses: 445, users: 5600, bookings: 1800 },
  { city: 'Dar es Salaam', businesses: 300, users: 4380, bookings: 1640 },
]

const PENDING_VERIFICATIONS = [
  { id: 'pv1', name: 'Elite Gents Barbershop', type: 'Barbershop', city: 'Nairobi', submittedAt: '2 hours ago', owner: 'Paul Njoroge', avatar: '/placeholder-avatar.svg' },
  { id: 'pv2', name: 'Afro Glam Hair Studio', type: 'Hair Salon', city: 'Kampala', submittedAt: '5 hours ago', owner: 'Grace Namukasa', avatar: '/placeholder-avatar.svg' },
  { id: 'pv3', name: 'Nailicious Studio', type: 'Nail Studio', city: 'Nairobi', submittedAt: '1 day ago', owner: 'Sandra Odhiambo', avatar: '/placeholder-avatar.svg' },
]

const RECENT_SIGNUPS = [
  { name: 'Brian Wekesa', email: 'brian@gmail.com', role: 'Customer', city: 'Nairobi', joinedAt: '5 min ago', avatar: '/placeholder-avatar.svg' },
  { name: 'Zara Mwangi', email: 'zara@gmail.com', role: 'Business', city: 'Kampala', joinedAt: '18 min ago', avatar: '/placeholder-avatar.svg' },
  { name: 'Daniel Otieno', email: 'daniel@gmail.com', role: 'Customer', city: 'Nairobi', joinedAt: '32 min ago', avatar: '/placeholder-avatar.svg' },
  { name: 'Amina Hassan', email: 'amina@gmail.com', role: 'Customer', city: 'Dar es Salaam', joinedAt: '1 hour ago', avatar: '/placeholder-avatar.svg' },
]

const PIE_DATA = [
  { name: 'Barbershops', value: 35, color: '#C9A84C' },
  { name: 'Hair Salons', value: 28, color: '#1A7A4A' },
  { name: 'Nail Studios', value: 16, color: '#A855F7' },
  { name: 'Makeup', value: 12, color: '#3B82F6' },
  { name: 'Other', value: 9, color: '#6B7280' },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 z-40 w-60 border-r border-border bg-surface flex flex-col">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97D)' }}>
            <Shield size={14} className="text-black" />
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary font-playfair gold-text">Vantara</div>
            <div className="text-xs text-text-muted">Admin Panel</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {[
            { href: '/admin/dashboard', label: 'Overview', icon: BarChart3, active: true },
            { href: '/admin/users', label: 'Users', icon: Users },
            { href: '/admin/businesses', label: 'Businesses', icon: Store },
            { href: '/admin/verifications', label: 'Verifications', icon: Shield },
            { href: '/admin/disputes', label: 'Disputes', icon: AlertTriangle },
            { href: '/admin/revenue', label: 'Revenue', icon: DollarSign },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                item.active
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              )}
            >
              <item.icon size={16} />
              {item.label}
              {item.label === 'Verifications' && (
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-gold/20 text-gold">28</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="ml-60 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-border bg-[#0A0A0A]/95 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-xl font-bold text-text-primary">Platform Overview</h1>
            <div className="text-xs text-text-muted">Sunday, 1 June 2026</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card border border-border">
              <Search size={14} className="text-text-muted" />
              <input placeholder="Search users, businesses..." className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none w-48" />
            </div>
            <button className="relative w-9 h-9 rounded-xl glass-card flex items-center justify-center">
              <Bell size={16} className="text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        <div className="px-8 py-6 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ADMIN_STATS.map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', stat.bg)}>
                    <stat.icon size={18} className={stat.color} />
                  </div>
                  <span className="text-xs font-semibold text-emerald-light bg-emerald-brand/10 px-2 py-0.5 rounded-full border border-emerald-brand/20">
                    {stat.trend}
                  </span>
                </div>
                <div className="font-playfair text-2xl font-bold text-text-primary">{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                <div className="text-xs text-text-secondary mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* City breakdown */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-border">
              <div className="font-semibold text-text-primary mb-5">Bookings by City</div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CITY_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" />
                    <XAxis dataKey="city" tick={{ fill: '#666055', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#666055', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, color: '#F0EDE8' }} />
                    <Bar dataKey="bookings" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="businesses" fill="#1A7A4A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-3">
                {[{ label: 'Bookings', color: '#C9A84C' }, { label: 'Businesses', color: '#1A7A4A' }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5 text-xs text-text-muted">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Business categories */}
            <div className="glass-card rounded-2xl p-5 border border-border">
              <div className="font-semibold text-text-primary mb-5">Business Types</div>
              <div className="flex justify-center mb-4">
                <PieChart width={180} height={180}>
                  <Pie data={PIE_DATA} cx={90} cy={90} innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value">
                    {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </div>
              <div className="space-y-2">
                {PIE_DATA.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                      <span className="text-text-secondary">{item.name}</span>
                    </div>
                    <span className="font-medium text-text-primary">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Pending Verifications */}
            <div className="glass-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-text-primary">Pending Verifications</div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/25 font-bold">28</span>
                </div>
                <Link href="/admin/verifications" className="text-xs text-gold hover:text-gold-light font-medium flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="divide-y divide-border">
                {PENDING_VERIFICATIONS.map(biz => (
                  <div key={biz.id} className="flex items-center gap-3 px-5 py-4 hover:bg-surface-hover transition-colors">
                    <Image src={biz.avatar} alt={biz.owner} width={36} height={36} className="rounded-full shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary truncate">{biz.name}</div>
                      <div className="text-xs text-text-muted">{biz.type} · {biz.city} · {biz.submittedAt}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg bg-emerald-brand/15 border border-emerald-brand/30 flex items-center justify-center hover:bg-emerald-brand/25 transition-colors" aria-label="Approve">
                        <CheckCircle size={15} className="text-emerald-light" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center hover:bg-red-500/20 transition-colors" aria-label="Reject">
                        <XCircle size={15} className="text-red-400" />
                      </button>
                      <button className="w-8 h-8 rounded-lg glass-card border border-border flex items-center justify-center hover:border-white/15 transition-colors" aria-label="View details">
                        <Eye size={15} className="text-text-muted" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Signups */}
            <div className="glass-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="font-semibold text-text-primary">Recent Signups</div>
                <Link href="/admin/users" className="text-xs text-gold hover:text-gold-light font-medium flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="divide-y divide-border">
                {RECENT_SIGNUPS.map((user, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-4 hover:bg-surface-hover transition-colors">
                    <Image src={user.avatar} alt={user.name} width={36} height={36} className="rounded-full shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary">{user.name}</div>
                      <div className="text-xs text-text-muted">{user.email} · {user.city}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full border font-medium',
                        user.role === 'Business'
                          ? 'bg-gold/15 text-gold border-gold/25'
                          : 'bg-surface-elevated text-text-secondary border-border'
                      )}>
                        {user.role}
                      </span>
                      <span className="text-xs text-text-muted">{user.joinedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform health */}
          <div className="glass-card rounded-2xl p-5 border border-border">
            <div className="font-semibold text-text-primary mb-4">Platform Health</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'API Uptime', value: '99.98%', status: 'healthy', sub: 'Last 30 days' },
                { label: 'Avg Response Time', value: '124ms', status: 'healthy', sub: 'P95 latency' },
                { label: 'Payment Success Rate', value: '99.2%', status: 'healthy', sub: 'M-Pesa + Card' },
                { label: 'Support Tickets (Open)', value: '14', status: 'warning', sub: '3 urgent' },
              ].map((metric, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn(
                    'w-2.5 h-2.5 rounded-full mt-1.5 shrink-0',
                    metric.status === 'healthy' ? 'bg-emerald-light' : 'bg-yellow-400 animate-pulse'
                  )} />
                  <div>
                    <div className="font-bold text-text-primary">{metric.value}</div>
                    <div className="text-xs text-text-secondary">{metric.label}</div>
                    <div className="text-xs text-text-muted">{metric.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
