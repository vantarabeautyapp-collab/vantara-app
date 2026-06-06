'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'

export function NavbarSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-[#0A0A0A]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center" aria-label="Vantara home">
          <Logo size="sm" usePng />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary" aria-label="Main navigation">
          <Link href="/search" className="hover:text-text-primary transition-colors">Discover</Link>
          <Link href="#features" className="hover:text-text-primary transition-colors">Features</Link>
          <Link href="#business" className="hover:text-text-primary transition-colors">For Business</Link>
          <Link href="#pricing" className="hover:text-text-primary transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:block text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-2">
            Sign In
          </Link>
          <Link href="/register" className="btn-gold text-sm px-4 py-2 font-semibold rounded-lg">
            Get Started
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
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
          className="md:hidden border-t border-border bg-[#0A0A0A] px-4 py-4 flex flex-col gap-4 text-sm text-text-secondary"
          aria-label="Mobile navigation"
        >
          <Link href="/search" onClick={() => setMenuOpen(false)} className="hover:text-text-primary transition-colors">Discover</Link>
          <Link href="#features" onClick={() => setMenuOpen(false)} className="hover:text-text-primary transition-colors">Features</Link>
          <Link href="#business" onClick={() => setMenuOpen(false)} className="hover:text-text-primary transition-colors">For Business</Link>
          <Link href="#pricing" onClick={() => setMenuOpen(false)} className="hover:text-text-primary transition-colors">Pricing</Link>
          <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-text-primary transition-colors">Sign In</Link>
        </nav>
      )}
    </header>
  )
}
