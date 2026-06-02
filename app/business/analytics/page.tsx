'use client'

import BusinessNav from '@/components/navigation/BusinessNav'
import { DASHBOARD_STATS } from '@/lib/mock-data'
import {
  TrendingUp, TrendingDown, Users, DollarSign, Star, BarChart3,
  Calendar, Award, Download, Filter
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthlyRevenue = [42000, 55000, 48000, 72000, 68000, 91000, 85000, 110000, 98000, 125000, 118000, 142000]
const monthlyBookings = [38, 52, 45, 68, 64, 87, 80, 104, 93, 118, 112, 134]

const revenueData = MONTHS.map((m, i) => ({
  month: m,
  revenue: monthlyRevenue[i],
  bookings: monthlyBookings[i],
}))

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const weekData = DASHBOARD_STATS.weeklyRevenue.map((v, i) => ({
  day: weekDays[i],
  revenue: v,
  bookings: Math.round(v / 1800),
}))

const serviceBreakdown = [
  { name: 'Haircut', value: 38, color: '#C9A84C' },
  { name: 'Beard Trim', value: 22, color: '#1A7A4A' },
  { name: 'Hair Wash', value: 18, color: '#6366F1' },
  { name: 'Colour', value: 14, color: '#EC4899' },
  { name: 'Other', value: 8, color: '#6B7280' },
]

const topStaff = [
  { name: 'James Mwangi', bookings: 94, revenue: 141000, rating: 4.9, avatar: 'JM' },
  { name: 'Aisha Kamau', bookings: 87, revenue: 130500, rating: 4.8, avatar: 'AK' },
  { name: 'Kevin Odhiambo', bookings: 76, revenue: 114000, rating: 4.7, avatar: 'KO' },
  { name: 'Grace Wanjiku', bookings: 68, revenue: 102000, rating: 4.8, avatar: 'GW' },
]

const STAT_CARDS = [
  {
    label: 'Total Revenue (YTD)',
    value: 'KSh 1.05M',
    sub: '+23.4% vs last year',
    icon: DollarSign,
    color: 'text-gold',
    bg: 'bg-gold/10',
    trend: +23.4,
  },
  {
    label: 'Total Bookings (YTD)',
    value: '995',
    sub: '+18.2% vs last year',
    icon: Calendar,
    color: 'text-emerald-light',
    bg: 'bg-emerald-brand/10',
    trend: +18.2,
  },
  {
    label: 'Avg. Booking Value',
    value: 'KSh 1,055',
    sub: '+4.3% vs last month',
    icon: TrendingUp,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    trend: +4.3,
  },
  {
    label: 'Customer Retention',
    value: '72%',
    sub: '+6pts vs last quarter',
    icon: Users,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    trend: +6,
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 text-xs">
        <p className="text-text-muted mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name === 'revenue' ? `KSh ${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function BusinessAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <BusinessNav />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary font-display">Analytics</h1>
            <p className="text-text-muted text-sm mt-0.5">Performance insights for Crown Cuts</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 glass-card text-text-secondary text-sm hover:text-text-primary transition-colors rounded-xl border border-border">
              <Filter size={15} />
              This Year
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 btn-gold text-sm rounded-xl">
              <Download size={15} />
              Export
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon
            const isPositive = card.trend > 0
            return (
              <div key={card.label} className="glass-card p-5 rounded-2xl border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                    <Icon size={18} className={card.color} />
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-light' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(card.trend)}%
                  </span>
                </div>
                <div className="text-xl font-bold text-text-primary mb-0.5">{card.value}</div>
                <div className="text-xs text-text-muted">{card.label}</div>
                <div className="text-xs text-text-muted mt-0.5 opacity-70">{card.sub}</div>
              </div>
            )
          })}
        </div>

        {/* Revenue Chart */}
        <div className="glass-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-text-primary">Revenue & Bookings</h3>
              <p className="text-xs text-text-muted mt-0.5">12-month performance overview</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gold inline-block" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-brand inline-block" />Bookings</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" />
              <XAxis dataKey="month" tick={{ fill: '#9B956E', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9B956E', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#C9A84C" strokeWidth={2} fill="url(#goldGrad)" name="revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Weekly Breakdown */}
          <div className="glass-card rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-1">This Week's Revenue</h3>
            <p className="text-xs text-text-muted mb-5">Day-by-day breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#9B956E', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9B956E', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#C9A84C" radius={[6, 6, 0, 0]} name="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Service Breakdown */}
          <div className="glass-card rounded-2xl border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-1">Service Breakdown</h3>
            <p className="text-xs text-text-muted mb-5">Revenue share by service type</p>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                    dataKey="value" strokeWidth={0}>
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2.5">
                {serviceBreakdown.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-xs text-text-secondary">{s.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-text-primary">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Staff */}
        <div className="glass-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-text-primary">Top Performers</h3>
              <p className="text-xs text-text-muted mt-0.5">Staff ranked by revenue generated</p>
            </div>
            <Award size={18} className="text-gold" />
          </div>
          <div className="space-y-3">
            {topStaff.map((staff, idx) => (
              <div key={staff.name} className="flex items-center gap-4 p-3 rounded-xl bg-surface-hover/30">
                <span className="text-xs font-bold text-text-muted w-5 text-center">#{idx + 1}</span>
                <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs font-bold text-gold">
                  {staff.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{staff.name}</p>
                  <p className="text-xs text-text-muted">{staff.bookings} bookings</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gold">
                  <Star size={11} fill="currentColor" />
                  {staff.rating}
                </div>
                <div className="text-sm font-semibold text-emerald-light min-w-[90px] text-right">
                  KSh {staff.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
