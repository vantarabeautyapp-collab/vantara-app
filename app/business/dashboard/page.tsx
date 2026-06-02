'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  TrendingUp, TrendingDown, Calendar, Users, DollarSign,
  Clock, CheckCircle, AlertCircle, BarChart3, Bell, Crown, Star,
  ArrowRight, ChevronRight, Scissors
} from 'lucide-react'
import BusinessNav from '@/components/navigation/BusinessNav'
import { DASHBOARD_STATS, TODAYS_APPOINTMENTS } from '@/lib/mock-data'
import { cn, getStatusColor, getStatusLabel } from '@/lib/utils'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const revenueData = DASHBOARD_STATS.weeklyRevenue.map((v, i) => ({
  day: weekDays[i],
  revenue: v,
}))

export default function BusinessDashboardPage() {
  const stats = DASHBOARD_STATS
  const appointments = TODAYS_APPOINTMENTS

  const STAT_CARDS = [
    {
      label: "Today's Bookings",
      value: stats.todayBookings,
      sub: `${stats.pendingBookings} pending`,
      icon: Calendar,
      color: 'text-gold',
      bg: 'bg-gold/10',
      trend: +15,
    },
    {
      label: "Today's Revenue",
      value: `KSh ${stats.todayRevenue.toLocaleString()}`,
      sub: 'vs KSh 16,200 yesterday',
      icon: DollarSign,
      color: 'text-emerald-light',
      bg: 'bg-emerald-brand/10',
      trend: +14.8,
    },
    {
      label: 'New Customers',
      value: stats.newCustomers,
      sub: 'first-time visitors',
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      trend: +0,
    },
    {
      label: 'Satisfaction',
      value: `${stats.customerSatisfaction}★`,
      sub: `${stats.completionRate}% completion rate`,
      icon: Star,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      trend: +2,
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <BusinessNav />

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-border bg-[#0A0A0A]/95 backdrop-blur-xl px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-xl font-bold text-text-primary">Dashboard</h1>
            <div className="text-xs text-text-muted mt-0.5">Sunday, 1 June 2026</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card-gold border border-gold/20">
              <Crown size={13} className="text-gold" />
              <span className="text-xs font-semibold text-gold">Elite Plan</span>
            </div>
            <button className="relative w-9 h-9 rounded-xl glass-card flex items-center justify-center" aria-label="Notifications">
              <Bell size={17} className="text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold" />
            </button>
          </div>
        </header>

        <div className="px-8 py-6 space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((card, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 border border-border hover:border-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', card.bg)}>
                    <card.icon size={18} className={card.color} />
                  </div>
                  {card.trend !== 0 && (
                    <span className={cn(
                      'flex items-center gap-0.5 text-xs font-medium',
                      card.trend > 0 ? 'text-emerald-light' : 'text-red-400'
                    )}>
                      {card.trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(card.trend)}%
                    </span>
                  )}
                </div>
                <div className="font-playfair text-2xl font-bold text-text-primary">{card.value}</div>
                <div className="text-xs text-text-muted mt-1">{card.label}</div>
                <div className="text-xs text-text-secondary mt-0.5">{card.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue chart */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-border">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-semibold text-text-primary">Weekly Revenue</div>
                  <div className="text-xs text-text-muted">This week vs last week</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-lg bg-gold/10 text-gold border border-gold/20">This week</span>
                </div>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" />
                    <XAxis dataKey="day" tick={{ fill: '#666055', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#666055', fontSize: 11 }} axisLine={false} tickLine={false}
                      tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip
                      contentStyle={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 12, color: '#F0EDE8' }}
                      formatter={(value: number) => [`KSh ${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#C9A84C" strokeWidth={2} fill="url(#goldGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Services */}
            <div className="glass-card rounded-2xl p-5 border border-border">
              <div className="font-semibold text-text-primary mb-4">Top Services</div>
              <div className="space-y-4">
                {stats.topServices.map((service, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-text-primary truncate flex-1">{service.name}</span>
                      <span className="text-xs font-semibold text-gold ml-2">{service.count}x</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(service.count / stats.topServices[0].count) * 100}%`,
                            background: i === 0 ? 'linear-gradient(90deg, #C9A84C, #E8C97D)' : 'rgba(201,168,76,0.4)',
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-muted w-16 text-right">KSh {(service.revenue / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="glass-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <div className="font-semibold text-text-primary">Today&apos;s Appointments</div>
                <div className="text-xs text-text-muted mt-0.5">{appointments.length} scheduled</div>
              </div>
              <Link href="/business/bookings" className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors font-medium">
                View all <ChevronRight size={13} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {['Customer', 'Service', 'Staff', 'Time', 'Amount', 'Status', ''].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {appointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-surface-hover transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Image src={apt.customerAvatar} alt={apt.customerName} width={32} height={32} className="rounded-full shrink-0" />
                          <span className="text-sm font-medium text-text-primary">{apt.customerName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-text-secondary">{apt.serviceName}</td>
                      <td className="px-5 py-4 text-sm text-text-secondary">{apt.staffName}</td>
                      <td className="px-5 py-4 text-sm text-text-secondary">{apt.time}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-gold">KSh {apt.servicePrice.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', getStatusColor(apt.status))}>
                          {getStatusLabel(apt.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-xs text-text-muted hover:text-text-secondary transition-colors px-2 py-1 rounded-lg hover:bg-surface-hover">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Add New Service', href: '/business/services/new', icon: Scissors, color: 'text-gold', bg: 'bg-gold/10' },
              { label: 'Manage Staff', href: '/business/staff', icon: Users, color: 'text-emerald-light', bg: 'bg-emerald-brand/10' },
              { label: 'View Analytics', href: '/business/analytics', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { label: 'Create Promotion', href: '/business/promotions/new', icon: Crown, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="glass-card rounded-2xl p-4 border border-border hover:border-white/10 transition-all duration-150 flex items-center gap-3 group"
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', action.bg)}>
                  <action.icon size={17} className={action.color} />
                </div>
                <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">{action.label}</span>
                <ArrowRight size={14} className="ml-auto text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
