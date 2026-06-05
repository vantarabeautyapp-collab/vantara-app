import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, ArrowLeft, Home, Scissors, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found — Vantara',
  description: 'The page you are looking for does not exist. Discover beauty services across Africa on Vantara.',
  robots: { index: false, follow: true },
}

const QUICK_LINKS = [
  { href: '/search', icon: Search, label: 'Find Services', desc: 'Browse salons, barbers & more' },
  { href: '/register', icon: Sparkles, label: 'Create Account', desc: 'Join thousands of users' },
  { href: '/search?category=barbershop', icon: Scissors, label: 'Find Barbers', desc: 'Fades, tapers & more' },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-16">

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 70%)' }} />

      <div className="relative z-10 text-center max-w-xl w-full">

        {/* 404 display */}
        <div className="font-playfair text-8xl sm:text-9xl font-bold gold-text mb-2 select-none leading-none">
          404
        </div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          This page has left the building
        </h1>
        <p className="text-text-muted text-base mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {QUICK_LINKS.map(({ href, icon: Icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="glass-card rounded-2xl p-4 border border-border hover:border-gold/30 transition-all duration-200 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                <Icon size={17} className="text-gold" />
              </div>
              <div className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors">{label}</div>
              <div className="text-xs text-text-muted mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>

        {/* Back home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Vantara Home
        </Link>

        {/* Help note */}
        <p className="text-xs text-text-muted mt-8">
          Need help?{' '}
          <a href="mailto:support@vantara.com" className="text-gold hover:underline">
            support@vantara.com
          </a>
        </p>
      </div>
    </div>
  )
}
