'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  Search, MapPin, Star, Shield, Zap, Crown, Sparkles,
  ArrowRight, CheckCircle, TrendingUp, Clock, Users, ChevronDown,
  Play, Instagram, Twitter, Facebook, Linkedin
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BUSINESSES, CITIES } from '@/lib/mock-data'
import Logo, { LogoIcon } from '@/components/Logo'

const SERVICE_CATEGORIES = [
  { id: 'barbershop', label: 'Barbershops', icon: '✂️', count: '2,400+', color: 'from-amber-600/20 to-amber-800/10' },
  { id: 'salon', label: 'Hair Salons', icon: '💇', count: '3,800+', color: 'from-rose-600/20 to-rose-800/10' },
  { id: 'nails', label: 'Nail Studios', icon: '💅', count: '1,200+', color: 'from-pink-600/20 to-pink-800/10' },
  { id: 'makeup', label: 'Makeup Artists', icon: '💄', count: '890+', color: 'from-purple-600/20 to-purple-800/10' },
  { id: 'braiding', label: 'Braiding', icon: '🪢', count: '1,600+', color: 'from-emerald-600/20 to-emerald-800/10' },
  { id: 'skincare', label: 'Skincare', icon: '✨', count: '740+', color: 'from-sky-600/20 to-sky-800/10' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Discover',
    description: 'Search by service, location, or professional name. Filter by rating, price, and availability.',
    icon: Search,
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    step: '02',
    title: 'Book in Seconds',
    description: 'View real-time availability, choose your stylist, and confirm your booking in under 60 seconds.',
    icon: Clock,
    color: 'text-emerald-light',
    bg: 'bg-emerald-brand/10',
  },
  {
    step: '03',
    title: 'Glow Up',
    description: 'Arrive, get served, pay securely, and earn loyalty points. Leave a review to help the community.',
    icon: Sparkles,
    color: 'text-purple-400',
    bg: 'bg-purple-600/10',
  },
]

const FEATURES = [
  {
    icon: Shield,
    title: 'Vantara Verified',
    description: 'Every business is manually verified. Look for Verified, Premium, and Elite badges.',
    gradient: 'from-blue-500/20 to-blue-800/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Sparkles,
    title: 'Style Match AI',
    description: 'Upload your photo, get personalized haircut, hairstyle, and beard recommendations powered by AI.',
    gradient: 'from-purple-500/20 to-purple-800/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: Crown,
    title: 'Beauty Passport',
    description: 'Earn points on every booking. Unlock discounts, free services, and VIP status as you level up.',
    gradient: 'from-gold/20 to-gold-dim/10',
    iconColor: 'text-gold',
  },
  {
    icon: Zap,
    title: 'Nearby Now',
    description: 'See exactly which salons are open right now, their current wait times, and who\'s available.',
    gradient: 'from-emerald-600/20 to-emerald-800/10',
    iconColor: 'text-emerald-light',
  },
  {
    icon: TrendingUp,
    title: 'Dynamic Deals',
    description: 'Happy hour discounts, last-minute slots, loyalty rewards — score great deals automatically.',
    gradient: 'from-orange-500/20 to-orange-800/10',
    iconColor: 'text-orange-400',
  },
  {
    icon: Star,
    title: 'Beauty Rankings',
    description: 'Real rankings powered by reviews, repeat visits, service quality and response times.',
    gradient: 'from-rose-500/20 to-rose-800/10',
    iconColor: 'text-rose-400',
  },
]

const TESTIMONIALS = [
  {
    name: 'Amara Okonkwo',
    role: 'Regular Customer',
    city: 'Nairobi',
    avatar: '/placeholder-avatar.svg',
    text: 'Vantara changed how I find beauty services. I found my go-to braider in Karen after 3 years of searching. The verified badge actually means something.',
    rating: 5,
  },
  {
    name: 'Daniel Ssali',
    role: 'Customer',
    city: 'Kampala',
    avatar: '/placeholder-avatar.svg',
    text: 'Booked a premium fade in 30 seconds, paid with M-Pesa, walked in and walked out looking sharp. This is how it should be done.',
    rating: 5,
  },
  {
    name: 'Fatima Mwakio',
    role: 'Salon Owner',
    city: 'Dar es Salaam',
    avatar: '/placeholder-avatar.svg',
    text: 'My bookings doubled in the first two months after listing on Vantara. The dashboard gives me full control. Worth every shilling.',
    rating: 5,
  },
]

const STATS = [
  { value: '12,400+', label: 'Verified Professionals' },
  { value: '8,200+', label: 'Bookings This Month' },
  { value: '3', label: 'Cities Live' },
  { value: '4.8★', label: 'Average Rating' },
]

export default function LandingPage() {
  const [selectedCity, setSelectedCity] = useState('nairobi')
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const featuredBusinesses = BUSINESSES.filter(b => b.featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">

      {/* ───── NAVBAR ───── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo size="sm" usePng />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
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
          </div>
        </div>
      </header>

      {/* ───── HERO ───── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.4) 0%, transparent 70%)' }} />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(26,122,74,0.6) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 70%)' }} />
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + (i % 3)}s`,
              opacity: 0.3 + (i % 3) * 0.1,
            }}
          />
        ))}

        {/* Launch badge */}
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase glass-card-gold">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
          <span className="text-gold">Now Live in Nairobi, Kampala & Dar es Salaam</span>
        </div>

        {/* Main headline */}
        <div className="text-center max-w-4xl mx-auto animate-fade-up delay-100">
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="gold-text">Discover. Book.</span>
            <br />
            <span className="text-text-primary">Glow.</span>
          </h1>
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-balance">
            Find and instantly book verified barbers, salons, makeup artists, and beauty professionals near you.
            Earn rewards with every appointment.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl mx-auto mt-10 animate-fade-up delay-200">
          <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3">
              <Search size={18} className="text-gold shrink-0" />
              <input
                type="text"
                placeholder="Search barbers, salons, nail studios..."
                className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-sm outline-none"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1 sm:border-l border-border px-4 py-3 sm:min-w-[160px]">
              <MapPin size={16} className="text-text-muted shrink-0" />
              <select
                className="flex-1 bg-transparent text-text-secondary text-sm outline-none cursor-pointer"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
              >
                {CITIES.map(city => (
                  <option key={city.id} value={city.id} className="bg-surface text-text-primary">
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <Link
              href={`/search?q=${searchQuery}&city=${selectedCity}`}
              className="btn-gold rounded-xl px-6 py-3 text-sm font-semibold shrink-0"
            >
              Search
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Fades & Cuts', 'Braids & Weaves', 'Bridal Makeup', 'Gel Nails', 'Locs & Dreadlocks'].map(tag => (
              <Link
                key={tag}
                href={`/search?q=${tag}&city=${selectedCity}`}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-text-muted hover:text-text-primary hover:border-border-gold transition-all duration-150"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="w-full max-w-2xl mx-auto mt-12 animate-fade-up delay-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-playfair font-bold text-2xl sm:text-3xl gold-text">{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={20} className="text-text-muted" />
        </div>
      </section>

      {/* ───── CATEGORIES ───── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Every Beauty Service, One Platform
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">From quick fades to bridal transformations — discover professionals across every category.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SERVICE_CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.id}`}
                className={cn(
                  'group relative overflow-hidden rounded-2xl p-6 border border-border hover:border-gold/30 transition-all duration-300',
                  `bg-gradient-to-br ${cat.color}`
                )}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-semibold text-text-primary group-hover:text-gold transition-colors">{cat.label}</div>
                <div className="text-xs text-text-muted mt-1">{cat.count} professionals</div>
                <ArrowRight size={16} className="absolute bottom-4 right-4 text-text-muted opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Simple as 1-2-3
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary">
              Book in Under 60 Seconds
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-full w-full h-px z-10"
                    style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)' }} />
                )}
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', step.bg)}>
                      <step.icon size={22} className={step.color} />
                    </div>
                    <span className="font-playfair text-4xl font-bold text-border">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-text-primary text-lg mb-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED BUSINESSES ───── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary">
                Top Rated Near You
              </h2>
              <p className="text-text-secondary mt-1">Nairobi&apos;s most loved beauty destinations</p>
            </div>
            <Link href="/search" className="btn-outline-gold text-sm px-4 py-2 hidden sm:flex rounded-xl">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map(business => (
              <Link key={business.id} href={`/salon/${business.id}`} className="group">
                <div className="glass-card rounded-2xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-gold-sm">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={business.coverImage}
                      alt={business.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      {business.badge === 'elite' && (
                        <span className="badge-elite">
                          <Crown size={10} />
                          Elite
                        </span>
                      )}
                      {business.badge === 'premium' && (
                        <span className="badge-premium">
                          <Shield size={10} />
                          Premium
                        </span>
                      )}
                      {business.badge === 'verified' && (
                        <span className="badge-verified">
                          <CheckCircle size={10} />
                          Verified
                        </span>
                      )}
                    </div>
                    {business.isOpen && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-brand/80 text-white text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Open
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-text-primary group-hover:text-gold transition-colors leading-tight">
                        {business.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={13} className="text-gold fill-gold" />
                        <span className="text-sm font-semibold text-text-primary">{business.rating}</span>
                        <span className="text-xs text-text-muted">({business.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-xs text-text-muted mb-3">{business.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-text-muted">
                        <MapPin size={11} />
                        {business.neighborhood} · {business.distance}km
                      </div>
                      <div className="text-xs font-medium text-gold">
                        From KSh {Math.min(...business.services.map(s => s.price)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section id="features" className="py-20 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              Platform Features
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Built Different
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">Features designed for Africa — from M-Pesa payments to Swahili support, we built this for you.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className={cn('group rounded-2xl p-6 border border-border hover:border-white/10 transition-all duration-300', `bg-gradient-to-br ${feature.gradient}`)}
              >
                <div className={cn('w-11 h-11 rounded-xl glass-card flex items-center justify-center mb-4')}>
                  <feature.icon size={20} className={feature.iconColor} />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── BEAUTY PASSPORT HIGHLIGHT ───── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card-gold rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }} />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Crown size={20} className="text-gold" />
                  <span className="text-gold text-sm font-semibold uppercase tracking-wider">Beauty Passport</span>
                </div>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                  Every Visit Earns You More
                </h2>
                <p className="text-text-secondary text-base leading-relaxed mb-6">
                  Earn loyalty points on every booking, review, and referral. Unlock discounts, free services, and exclusive VIP access as you level up from Bronze to Platinum.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier, i) => (
                    <div key={tier} className="flex flex-col items-center gap-1">
                      <div className={cn(
                        'w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold',
                        i === 0 && 'border-amber-600 text-amber-600 bg-amber-600/10',
                        i === 1 && 'border-slate-400 text-slate-400 bg-slate-400/10',
                        i === 2 && 'border-gold text-gold bg-gold/10',
                        i === 3 && 'border-purple-400 text-purple-400 bg-purple-400/10',
                      )}>
                        {i === 3 ? '♛' : i === 2 ? '★' : i === 1 ? '◆' : '●'}
                      </div>
                      <span className="text-xs text-text-muted">{tier}</span>
                    </div>
                  ))}
                </div>
                <Link href="/register" className="btn-gold inline-flex rounded-xl text-sm px-6 py-3">
                  Start Earning Points
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="w-full lg:w-72 shrink-0">
                <div className="rounded-2xl p-6 text-white relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #1A1A0A 0%, #2A2210 40%, #1A1505 100%)', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #C9A84C, transparent)', transform: 'translate(30%, -30%)' }} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <LogoIcon size={20} />
                        <span className="text-xs font-bold tracking-widest uppercase text-gold">Vantara</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30 font-semibold">Silver</span>
                    </div>
                    <div className="mb-6">
                      <div className="text-3xl font-bold font-playfair gold-text">2,450</div>
                      <div className="text-xs text-text-muted mt-0.5">Beauty Points</div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-text-muted mb-1.5">
                        <span>Silver → Gold</span>
                        <span>2,450 / 5,000</span>
                      </div>
                      <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '49%', background: 'linear-gradient(90deg, #C9A84C, #E8C97D)' }} />
                      </div>
                    </div>
                    <div className="text-xs text-text-muted">Amara Okonkwo • Member since 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Loved Across Africa
            </h2>
            <p className="text-text-secondary">From Nairobi to Kampala, real people, real results</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={36} height={36} className="rounded-full" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FOR BUSINESS ───── */}
      <section id="business" className="py-20 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card-emerald rounded-3xl p-8 sm:p-12">
            <div className="grid sm:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-light mb-4 px-3 py-1 rounded-full border border-emerald-brand/30 bg-emerald-brand/10">
                  <TrendingUp size={12} />
                  For Business Owners
                </div>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                  Grow Your Beauty Business
                </h2>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  List your salon or barbershop and reach thousands of new customers in your area. Get verified, build your brand, and manage everything from one dashboard.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Free listing with premium upgrade options',
                    'Real-time booking calendar & notifications',
                    'Analytics dashboard with revenue insights',
                    'Staff management & scheduling tools',
                    'Promotional tools & loyalty programs',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle size={16} className="text-emerald-light mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link href="/register?role=business" className="btn-gold rounded-xl text-sm px-6 py-3 inline-flex">
                    List Your Business Free
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="#pricing" className="btn-ghost rounded-xl text-sm px-4 py-3">
                    View Pricing
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Monthly Bookings', value: '+127%', sub: 'after joining Vantara', color: 'text-gold' },
                  { label: 'New Customers', value: '68%', sub: 'of bookings are new clients', color: 'text-emerald-light' },
                  { label: 'Revenue Growth', value: '+KSh 48K', sub: 'average monthly increase', color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
                    <div className={cn('font-playfair text-2xl font-bold', stat.color)}>{stat.value}</div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{stat.label}</div>
                      <div className="text-xs text-text-muted">{stat.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── PRICING ───── */}
      <section id="pricing" className="py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-text-secondary">Start free, scale as you grow</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Free',
                price: 'KSh 0',
                period: '/month',
                description: 'Perfect for getting started',
                features: ['Basic profile listing', 'Up to 20 bookings/month', 'Customer reviews', 'M-Pesa payments'],
                cta: 'Get Started Free',
                highlight: false,
              },
              {
                name: 'Premium',
                price: 'KSh 4,999',
                period: '/month',
                description: 'For growing businesses',
                features: ['Everything in Free', 'Featured placement', 'Unlimited bookings', 'Analytics dashboard', 'Staff management', 'Promotions tool', 'Premium badge'],
                cta: 'Go Premium',
                highlight: true,
              },
              {
                name: 'Elite',
                price: 'KSh 9,999',
                period: '/month',
                description: 'For established brands',
                features: ['Everything in Premium', 'Priority ranking #1', 'Elite verification badge', 'Dedicated account manager', 'Custom promotions', 'API access', 'Multi-branch support'],
                cta: 'Go Elite',
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-2xl p-6 flex flex-col relative',
                  plan.highlight
                    ? 'glass-card-gold border border-gold/30'
                    : 'glass-card border border-border'
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97D)' }}>
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className={cn('text-sm font-semibold mb-1', plan.highlight ? 'text-gold' : 'text-text-secondary')}>{plan.name}</div>
                  <div className="flex items-end gap-1">
                    <span className="font-playfair text-3xl font-bold text-text-primary">{plan.price}</span>
                    <span className="text-text-muted text-sm mb-1">{plan.period}</span>
                  </div>
                  <div className="text-xs text-text-muted mt-1">{plan.description}</div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle size={14} className={cn('mt-0.5 shrink-0', plan.highlight ? 'text-gold' : 'text-emerald-light')} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register?role=business"
                  className={cn(
                    'text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                    plan.highlight ? 'btn-gold' : 'btn-outline-gold'
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="py-20 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Ready to Find Your <span className="gold-text">Glow?</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Join thousands of Africans already booking premium beauty services through Vantara.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-gold rounded-xl px-8 py-4 text-base font-semibold">
              Create Free Account
              <ArrowRight size={18} />
            </Link>
            <Link href="/search" className="btn-outline-gold rounded-xl px-8 py-4 text-base font-semibold">
              Browse Services
            </Link>
          </div>
          <p className="text-xs text-text-muted mt-6">No credit card required · Free to book · Cancel anytime</p>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-border py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center mb-4">
                <Logo size="sm" usePng />
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Africa's Beauty & Grooming Marketplace. Discover, book, and glow with verified professionals near you.
              </p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-gold transition-colors">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-text-primary text-sm mb-4">Customers</div>
              <ul className="space-y-2.5 text-sm text-text-muted">
                {['How it Works', 'Find a Salon', 'Beauty Passport', 'Gift Cards', 'Mobile App'].map(item => (
                  <li key={item}><a href="#" className="hover:text-text-secondary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-text-primary text-sm mb-4">Business</div>
              <ul className="space-y-2.5 text-sm text-text-muted">
                {['List Your Business', 'Business Dashboard', 'Pricing', 'Partner Program', 'API Access'].map(item => (
                  <li key={item}><a href="#" className="hover:text-text-secondary transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-text-primary text-sm mb-4">Company</div>
              <ul className="space-y-2.5 text-sm text-text-muted">
                {[
                  { label: 'About Us',         href: '#' },
                  { label: 'Careers',          href: '#' },
                  { label: 'Press',            href: '#' },
                  { label: 'Contact',          href: 'mailto:hello@vantara.com' },
                  { label: 'Privacy Policy',   href: '/privacy-policy' },
                  { label: 'Terms of Service', href: '/terms' },
                ].map(item => (
                  <li key={item.label}><Link href={item.href} className="hover:text-text-secondary transition-colors">{item.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-text-muted">
              © 2026 Vantara. All rights reserved. Built with love for Africa.
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span>🇰🇪 Kenya</span>
              <span>🇺🇬 Uganda</span>
              <span>🇹🇿 Tanzania</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
