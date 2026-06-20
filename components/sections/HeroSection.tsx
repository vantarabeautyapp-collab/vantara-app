'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, MapPin, ChevronDown, Scissors, Sparkles, Star, Palette, Crown, Flower2, Eye, Heart } from 'lucide-react'
import { CITIES } from '@/lib/mock-data'

const SERVICE_IMAGES = [
  { id: 'barbershop', label: 'Barbershops',    Icon: Scissors, bg: 'linear-gradient(135deg,#A64B2A 0%,#7A3520 100%)', pattern: 'pattern-kente',   glow: 'rgba(166,75,42,0.5)',  photo: '/images/stitch/barber.jpg'   },
  { id: 'salon',      label: 'Hair Salons',    Icon: Sparkles, bg: 'linear-gradient(135deg,#D4A24C 0%,#9A7030 100%)', pattern: 'pattern-adinkra', glow: 'rgba(212,162,76,0.5)', photo: null                          },
  { id: 'nails',      label: 'Nail Studios',   Icon: Star,     bg: 'linear-gradient(135deg,#E07A2D 0%,#B05820 100%)', pattern: 'pattern-maasai',  glow: 'rgba(224,122,45,0.5)', photo: null                          },
  { id: 'makeup',     label: 'Makeup Artists', Icon: Palette,  bg: 'linear-gradient(135deg,#C56A3D 0%,#A64B2A 100%)', pattern: 'pattern-ndebele', glow: 'rgba(197,106,61,0.5)', photo: null                          },
  { id: 'braiding',   label: 'Braiding',       Icon: Crown,    bg: 'linear-gradient(135deg,#556B2F 0%,#3A4A20 100%)', pattern: 'pattern-kente',   glow: 'rgba(85,107,47,0.5)',  photo: '/images/stitch/braiding.jpg' },
  { id: 'skincare',   label: 'Skincare',       Icon: Flower2,  bg: 'linear-gradient(135deg,#D4A24C 0%,#A64B2A 100%)', pattern: 'pattern-adinkra', glow: 'rgba(212,162,76,0.4)', photo: '/images/stitch/skincare.jpg' },
]

const STATS = [
  { value: '12,400+', label: 'Verified Professionals' },
  { value: '8,200+',  label: 'Bookings This Month'    },
  { value: '5',       label: 'Countries'               },
  { value: '4.8★',   label: 'Average Rating'          },
]

const QUICK_TAGS = [
  'Knotless Braids',
  'Clean Fades',
  'Bridal Makeup',
  'Gel Nails',
  'Natural Locs',
  'Skin Facials',
]

export function HeroSection() {
  const [selectedCity, setSelectedCity] = useState('nairobi')
  const [searchQuery,  setSearchQuery]  = useState('')

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden bg-page transition-colors duration-300"
      aria-label="Hero — discover Africa's finest beauty professionals"
    >
      {/* Background glows — sunset / earth atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Adinkra pattern overlay */}
        <div className="absolute inset-0 pattern-adinkra" />
        {/* Primary warm glow — terracotta sunrise */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(166,75,42,0.6) 0%, rgba(224,122,45,0.2) 50%, transparent 70%)' }}
        />
        {/* Left warm accent — savannah horizon */}
        <div
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(224,122,45,0.4) 0%, transparent 70%)' }}
        />
        {/* Right gold flare */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(212,162,76,0.5) 0%, transparent 70%)' }}
        />
        {/* Horizon line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(0deg, rgba(166,75,42,0.06) 0%, transparent 100%)' }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="particle animate-float"
          style={{
            left:              `${8 + i * 7}%`,
            top:               `${15 + (i % 5) * 18}%`,
            animationDelay:    `${i * 0.4}s`,
            animationDuration: `${4 + (i % 4)}s`,
            opacity:           0.2 + (i % 4) * 0.1,
          }}
        />
      ))}

      {/* Live badge */}
      <div className="animate-fade-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase glass-card-gold">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" aria-hidden="true" />
        <span className="text-gold">Live in Nairobi · Kampala · Dar es Salaam · Lagos · Accra</span>
      </div>

      {/* Headline */}
      <div className="text-center max-w-4xl mx-auto animate-fade-up delay-100">
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-text-primary">Africa&apos;s Beauty.</span>
          <br />
          <span className="gold-text">Elevated.</span>
        </h1>
        <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-balance">
          The continent&apos;s premier platform for discovering and booking Africa&apos;s
          finest barbers, stylists, and beauty artisans — all in one place.
        </p>
        <p className="text-text-muted text-sm max-w-xl mx-auto mt-3 leading-relaxed">
          Verified professionals. Real-time availability. Loyalty rewards that actually mean something.
        </p>
      </div>

      {/* Search bar */}
      <div className="w-full max-w-2xl mx-auto mt-10 animate-fade-up delay-200">
        <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2" role="search">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search size={18} className="text-gold shrink-0" aria-hidden="true" />
            <input
              type="search"
              placeholder="Barbers, salons, makeup artists, nail studios…"
              aria-label="Search beauty professionals and services"
              className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-sm outline-none"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 sm:border-l border-border px-4 py-3 sm:min-w-[160px]">
            <MapPin size={16} className="text-text-muted shrink-0" aria-hidden="true" />
            <label htmlFor="city-select" className="sr-only">Select city</label>
            <select
              id="city-select"
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
            href={`/search?q=${encodeURIComponent(searchQuery)}&city=${selectedCity}`}
            className="btn-gold rounded-xl px-6 py-3 text-sm font-semibold shrink-0"
            aria-label="Search beauty professionals"
          >
            Search
          </Link>
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4" aria-label="Popular searches">
          {QUICK_TAGS.map(tag => (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}&city=${selectedCity}`}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-text-muted hover:text-text-primary hover:border-border-gold transition-all duration-150"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Service image gallery */}
      <div className="w-full max-w-3xl mx-auto mt-10 animate-fade-up delay-300">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-6">
          {SERVICE_IMAGES.map(svc => (
            <Link
              key={svc.id}
              href={`/search?category=${svc.id}&city=${selectedCity}`}
              aria-label={`Browse ${svc.label}`}
              className="group relative shrink-0 w-[110px] sm:w-auto h-[110px] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: svc.bg }}
            >
              {/* Real photo background where available */}
              {svc.photo && (
                <Image
                  src={svc.photo}
                  alt={svc.label}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-300"
                  sizes="110px"
                />
              )}
              {/* Pattern overlay */}
              {!svc.photo && <div className={`absolute inset-0 ${svc.pattern} opacity-30`} aria-hidden="true" />}
              {/* Dark gradient for text legibility */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)' }}
              />
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 50% 50%, ${svc.glow} 0%, transparent 70%)` }}
              />
              {/* Icon + Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <svc.Icon size={26} className="text-white opacity-90" aria-hidden="true" />
                <span className="text-white text-[10px] font-semibold tracking-wide text-center px-1 leading-tight opacity-90">
                  {svc.label}
                </span>
              </div>
              {/* Bottom shimmer line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-2xl mx-auto mt-12 animate-fade-up delay-300">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <dt className="font-playfair font-bold text-2xl sm:text-3xl gold-text">{stat.value}</dt>
              <dd className="text-xs text-text-muted mt-1">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Dual CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 animate-fade-up delay-400">
        <Link href="/register" className="btn-gold rounded-xl px-6 py-3 text-sm font-semibold">
          Get Started Free
        </Link>
        <Link href="/register?role=business" className="btn-ghost rounded-xl px-6 py-3 text-sm font-medium text-text-secondary hover:text-gold transition-colors">
          List Your Business →
        </Link>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown size={20} className="text-text-muted" />
      </div>
    </section>
  )
}
