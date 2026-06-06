'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { CITIES } from '@/lib/mock-data'

const STATS = [
  { value: '12,400+', label: 'Verified Professionals' },
  { value: '8,200+',  label: 'Bookings This Month'   },
  { value: '3',       label: 'Cities Live'            },
  { value: '4.8★',   label: 'Average Rating'         },
]

const QUICK_TAGS = [
  'Fades & Cuts',
  'Braids & Weaves',
  'Bridal Makeup',
  'Gel Nails',
  'Locs & Dreadlocks',
]

export function HeroSection() {
  const [selectedCity, setSelectedCity] = useState('nairobi')
  const [searchQuery,  setSearchQuery]  = useState('')

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
      aria-label="Hero — search for beauty services"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(26,122,74,0.6) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="particle animate-float"
          style={{
            left:              `${10 + i * 8}%`,
            top:               `${20 + (i % 4) * 20}%`,
            animationDelay:    `${i * 0.5}s`,
            animationDuration: `${5 + (i % 3)}s`,
            opacity:           0.3 + (i % 3) * 0.1,
          }}
        />
      ))}

      {/* Launch badge */}
      <div className="animate-fade-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase glass-card-gold">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" aria-hidden="true" />
        <span className="text-gold">Now Live in Nairobi, Kampala &amp; Dar es Salaam</span>
      </div>

      {/* Headline */}
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
        <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2" role="search">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search size={18} className="text-gold shrink-0" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search barbers, salons, nail studios..."
              aria-label="Search beauty services"
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
            aria-label="Search beauty services"
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

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown size={20} className="text-text-muted" />
      </div>
    </section>
  )
}
