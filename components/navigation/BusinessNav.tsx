'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Calendar, Users, BarChart3,
  Tag, Settings, LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'

const navItems = [
  { href: '/business/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/business/bookings', label: 'Bookings', icon: Calendar },
  { href: '/business/staff', label: 'Staff', icon: Users },
  { href: '/business/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/business/promotions', label: 'Promotions', icon: Tag },
  { href: '/business/settings', label: 'Settings', icon: Settings },
]

export default function BusinessNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-64 border-r border-border bg-surface flex flex-col">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <Logo size="sm" variant="full" usePng />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              )}
            >
              <Icon size={17} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut size={17} />
          Sign Out
        </Link>
      </div>
    </aside>
  )
}
