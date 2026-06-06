'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

const NAV_LINKS = [
  { href: '/search',   label: 'Discover'     },
  { href: '#features', label: 'Features'     },
  { href: '#business', label: 'For Business' },
  { href: '#pricing',  label: 'Pricing'      },
  { href: '/about',    label: 'Our Story'    },
]

export function NavbarSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl transition-colors duration-300"
      style={{ background: 'var(--color-background)', opacity: 0.95 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        <Link href="/" className="flex items-center" aria-label="Vantara home">
          <Logo size="sm" usePng />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary" aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-text-primary transition-colors duration-150">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" />

          <Link href="/login" className="hidden sm:block text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-2">
            Sign In
          </Link>
          <Link href="/register" className="btn-gold text-sm px-4 py-2 font-semibold rounded-lg">
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="md:hidden border-t border-border px-4 py-4 flex flex-col gap-4 text-sm text-text-secondary transition-colors duration-300"
          style={{ background: 'var(--color-background)' }}
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(l => (
            <Link
              key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-text-primary transition-colors">
            Sign In
          </Link>
        </nav>
      )}
    </header>
  )
}
