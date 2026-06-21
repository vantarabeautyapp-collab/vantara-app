'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft, Bell, Calendar, Crown, Star, Tag, CheckCheck
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { cn } from '@/lib/utils'

type NotifType = 'booking' | 'reward' | 'promo' | 'review'

interface Notif {
  id:     string
  type:   NotifType
  title:  string
  body:   string
  time:   string
  read:   boolean
  href?:  string
}

const NOTIFICATIONS: Notif[] = [
  { id: 'n1', type: 'booking',  title: 'Booking Confirmed',          body: 'Your Classic Fade at Crown Cuts is confirmed for Fri 21 Jun, 10:30 AM.',               time: '2 min ago',  read: false, href: '/bookings' },
  { id: 'n2', type: 'reward',   title: 'You earned 80 points!',      body: 'Your recent visit to Crown Cuts Barbershop earned you 80 Beauty Points.',              time: '1 day ago',  read: false, href: '/rewards'  },
  { id: 'n3', type: 'promo',    title: 'Flash deal — 20% off nails', body: 'Glam Studio is offering 20% off all nail services today only. Limited slots!',         time: '2 days ago', read: false, href: '/search?category=nails' },
  { id: 'n4', type: 'review',   title: 'How was your experience?',   body: 'You visited Luxe Beauty Lounge on May 20. Share your review to earn 50 points.',       time: '3 days ago', read: true,  href: '/bookings' },
  { id: 'n5', type: 'booking',  title: 'Reminder — tomorrow 2:00 PM',body: 'Don\'t forget your Knotless Braids appointment at Luxe Beauty Lounge tomorrow.',        time: '4 days ago', read: true,  href: '/bookings' },
  { id: 'n6', type: 'reward',   title: 'Silver tier unlocked!',      body: 'Congratulations — you\'ve reached Silver tier. Enjoy priority booking and 5% cashback.', time: '1 week ago', read: true,  href: '/rewards'  },
  { id: 'n7', type: 'promo',    title: 'New salon in your area',     body: 'Radiance Studio just launched in Kilimani. Check out their introductory pricing.',      time: '1 week ago', read: true,  href: '/search'   },
]

const iconMap: Record<NotifType, typeof Bell> = {
  booking: Calendar,
  reward:  Crown,
  promo:   Tag,
  review:  Star,
}

const colorMap: Record<NotifType, string> = {
  booking: 'text-gold bg-gold/10',
  reward:  'text-purple-400 bg-purple-500/10',
  promo:   'text-emerald-light bg-emerald-brand/10',
  review:  'text-blue-400 bg-blue-500/10',
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS)
  const unread = notifs.filter(n => !n.read).length

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--color-background)' }}>
      <header className="sticky top-0 z-30 border-b border-border backdrop-blur-xl px-4 py-4"
        style={{ background: 'rgba(18,13,8,0.95)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center">
              <ArrowLeft size={17} className="text-text-secondary" />
            </Link>
            <div>
              <h1 className="font-playfair font-bold text-text-primary">Notifications</h1>
              {unread > 0 && <p className="text-xs text-gold">{unread} unread</p>}
            </div>
          </div>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs text-gold border border-gold/25 px-3 py-1.5 rounded-xl hover:bg-gold/5 transition-colors"
            >
              <CheckCheck size={13} /> Mark all read
            </button>
          )}
        </div>
      </header>

      <div className="divide-y divide-border">
        {notifs.map(notif => {
          const Icon = iconMap[notif.type]
          const color = colorMap[notif.type]
          const Wrapper = notif.href ? Link : 'div'
          return (
            <Wrapper
              key={notif.id}
              href={notif.href as string}
              onClick={() => markRead(notif.id)}
              className={cn(
                'flex items-start gap-3 px-4 py-4 transition-colors cursor-pointer',
                !notif.read ? 'bg-gold/[0.03] hover:bg-gold/[0.06]' : 'hover:bg-surface-hover'
              )}
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5', color)}>
                <Icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('text-sm font-semibold leading-tight', notif.read ? 'text-text-secondary' : 'text-text-primary')}>
                    {notif.title}
                  </p>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1" />}
                </div>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">{notif.body}</p>
                <p className="text-xs text-text-muted mt-1.5">{notif.time}</p>
              </div>
            </Wrapper>
          )
        })}
      </div>

      {notifs.length === 0 && (
        <div className="text-center py-20">
          <Bell size={44} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary font-medium">All caught up!</p>
          <p className="text-sm text-text-muted mt-1">No new notifications.</p>
        </div>
      )}

      <CustomerNav />
    </div>
  )
}
