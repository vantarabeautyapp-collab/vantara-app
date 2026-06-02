'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  Search, MapPin, Star, SlidersHorizontal, X,
  Clock, Crown, Shield, CheckCircle, ArrowLeft, Navigation
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { BUSINESSES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import type { Business } from '@/lib/types'
import type { LocationValue } from '@/components/LocationPicker'

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'barbershop', label: 'Barbers' },
  { id: 'hair_salon', label: 'Salons' },
  { id: 'nail_studio', label: 'Nails' },
  { id: 'makeup_studio', label: 'Makeup' },
]

const SORT_OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'distance', label: 'Nearest' },
  { id: 'price_low', label: 'Price: Low' },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('recommended')
  const [openOnly, setOpenOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [searchLocation, setSearchLocation] = useState<LocationValue | null>(null)
  const [countrySearch, setCountrySearch] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [countries, setCountries] = useState<{code:string;name:string;flag:string;currency:{symbol:string}}[]>([])
  const [cities, setCities] = useState<{name:string}[]>([])

  // Load saved location from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vt_user')
      if (saved) {
        const user = JSON.parse(saved)
        if (user.countryCode) {
          // Fetch country info to populate the location
          fetch('/api/locations/countries')
            .then(r => r.json())
            .then((all: typeof countries) => {
              const c = all.find(x => x.code === user.countryCode)
              if (c) {
                setSearchLocation({ countryCode: c.code, countryName: c.name, flag: c.flag, city: user.city || '', currency: c.currency as LocationValue['currency'], payments: [] })
              }
            })
            .catch(() => {})
        }
      }
    } catch {}
  }, [])

  // Load countries for picker
  useEffect(() => {
    if (showLocationPicker && countries.length === 0) {
      fetch('/api/locations/countries').then(r => r.json()).then(setCountries).catch(() => {})
    }
  }, [showLocationPicker, countries.length])

  // Load cities when country selected in picker
  useEffect(() => {
    if (!searchLocation?.countryCode) return
    const params = new URLSearchParams({ country: searchLocation.countryCode })
    if (cityQuery.trim()) params.set('q', cityQuery.trim())
    fetch(`/api/locations/cities?${params}`)
      .then(r => r.json())
      .then(d => setCities(d.cities ?? []))
      .catch(() => {})
  }, [searchLocation?.countryCode, cityQuery])

  let results: Business[] = BUSINESSES

  if (query) {
    results = results.filter(b =>
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      b.neighborhood.toLowerCase().includes(query.toLowerCase())
    )
  }

  if (category !== 'all') {
    results = results.filter(b => b.type === category || b.type.includes(category.replace('_studio', '').replace('_salon', '')))
  }

  if (openOnly) results = results.filter(b => b.isOpen)
  if (verifiedOnly) results = results.filter(b => b.badge !== 'none')

  if (sort === 'rating') results = [...results].sort((a, b) => b.rating - a.rating)
  if (sort === 'distance') results = [...results].sort((a, b) => (a.distance || 99) - (b.distance || 99))
  if (sort === 'price_low') results = [...results].sort((a, b) =>
    Math.min(...a.services.map(s => s.price)) - Math.min(...b.services.map(s => s.price))
  )

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Link href="/home" className="w-9 h-9 rounded-xl glass-card flex items-center justify-center shrink-0">
            <ArrowLeft size={17} className="text-text-secondary" />
          </Link>
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass-card">
            <Search size={15} className="text-gold shrink-0" />
            <input
              type="text"
              placeholder="Barber, salon, or area..."
              className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-sm outline-none"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-text-muted hover:text-text-secondary">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors',
              showFilters ? 'bg-gold/15 border border-gold/30' : 'glass-card'
            )}
          >
            <SlidersHorizontal size={16} className={showFilters ? 'text-gold' : 'text-text-secondary'} />
          </button>
        </div>

        {/* Location indicator / picker toggle */}
        <div className="mb-2">
          <button
            type="button"
            onClick={() => setShowLocationPicker(v => !v)}
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-gold transition-colors"
          >
            <MapPin size={11} className="text-gold" />
            {searchLocation
              ? <><span className="text-text-secondary">{searchLocation.flag} {searchLocation.city ? `${searchLocation.city}, ` : ''}{searchLocation.countryName}</span></>
              : <span>All of Africa</span>
            }
            <span className="ml-0.5 text-gold text-[10px] border border-gold/30 rounded px-1">Change</span>
          </button>

          {showLocationPicker && (
            <div className="mt-2 p-3 rounded-2xl border border-border bg-surface/80 backdrop-blur animate-fade-up">
              {/* Country list */}
              <div className="relative mb-2">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Country…"
                  value={countrySearch}
                  onChange={e => setCountrySearch(e.target.value)}
                  className="w-full pl-7 pr-3 py-1.5 text-xs rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/40"
                />
              </div>
              <div className="max-h-40 overflow-y-auto flex flex-wrap gap-1.5 mb-2">
                <button
                  type="button"
                  onClick={() => { setSearchLocation(null); setShowLocationPicker(false) }}
                  className={cn('px-2.5 py-1 rounded-full text-xs border transition-colors',
                    !searchLocation ? 'border-gold/40 bg-gold/10 text-gold' : 'border-border text-text-muted hover:text-text-secondary')}
                >
                  🌍 All Africa
                </button>
                {countries
                  .filter(c => !countrySearch || c.name.toLowerCase().includes(countrySearch.toLowerCase()))
                  .map(c => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setCityQuery('')
                        setSearchLocation({ countryCode: c.code, countryName: c.name, flag: c.flag, city: '', currency: c.currency as LocationValue['currency'], payments: [] })
                      }}
                      className={cn('px-2.5 py-1 rounded-full text-xs border transition-colors',
                        searchLocation?.countryCode === c.code ? 'border-gold/40 bg-gold/10 text-gold' : 'border-border text-text-muted hover:text-text-secondary')}
                    >
                      {c.flag} {c.name}
                    </button>
                  ))}
              </div>
              {/* City search within selected country */}
              {searchLocation?.countryCode && (
                <div className="relative">
                  <MapPin size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder={`Town in ${searchLocation.countryName}…`}
                    value={cityQuery}
                    onChange={e => {
                      setCityQuery(e.target.value)
                      setSearchLocation(prev => prev ? { ...prev, city: e.target.value } : prev)
                    }}
                    className="w-full pl-7 pr-3 py-1.5 text-xs rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/40"
                  />
                  {cities.length > 0 && cityQuery && (
                    <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-xl border border-border bg-surface shadow-lg max-h-36 overflow-y-auto">
                      {cities.slice(0, 20).map((city, i) => (
                        <button key={i} type="button"
                          onClick={() => {
                            setCityQuery(city.name)
                            setSearchLocation(prev => prev ? { ...prev, city: city.name } : prev)
                            setShowLocationPicker(false)
                          }}
                          className="w-full px-3 py-2 text-xs text-left hover:bg-surface-hover text-text-primary flex items-center gap-1.5"
                        >
                          <MapPin size={10} className="text-text-muted" /> {city.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <button type="button" onClick={() => setShowLocationPicker(false)}
                className="mt-2 w-full py-1.5 rounded-lg text-xs text-gold border border-gold/20 hover:bg-gold/10 transition-colors">
                Done
              </button>
            </div>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
          {CATEGORY_FILTERS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150',
                category === cat.id
                  ? 'bg-gold text-black'
                  : 'glass-card text-text-muted border border-border hover:border-gold/30 hover:text-text-secondary'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-border animate-fade-up">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-text-muted">Sort:</span>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSort(opt.id)}
                  className={cn(
                    'text-xs px-3 py-1.5 rounded-full border transition-all',
                    sort === opt.id
                      ? 'border-gold/40 bg-gold/10 text-gold'
                      : 'border-border text-text-muted hover:text-text-secondary'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setOpenOnly(!openOnly)}
                className={cn(
                  'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all',
                  openOnly ? 'border-emerald-brand/40 bg-emerald-brand/10 text-emerald-light' : 'border-border text-text-muted'
                )}
              >
                <span className={cn('w-1.5 h-1.5 rounded-full', openOnly ? 'bg-emerald-light' : 'bg-text-muted')} />
                Open Now
              </button>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={cn(
                  'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all',
                  verifiedOnly ? 'border-gold/40 bg-gold/10 text-gold' : 'border-border text-text-muted'
                )}
              >
                <CheckCircle size={11} />
                Verified Only
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-muted">
            {results.length} result{results.length !== 1 ? 's' : ''}
            {query && <span> for &quot;{query}&quot;</span>}
          </span>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <MapPin size={12} className="text-gold" />
            Nairobi
          </div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-semibold text-text-primary mb-2">No results found</h3>
            <p className="text-sm text-text-muted">Try a different search or remove some filters</p>
            <button
              onClick={() => { setQuery(''); setCategory('all'); setOpenOnly(false); setVerifiedOnly(false) }}
              className="btn-outline-gold mt-6 px-5 py-2 text-sm rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map(business => (
              <Link key={business.id} href={`/salon/${business.id}`}>
                <div className="glass-card rounded-2xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-200">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={business.coverImage} alt={business.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {business.badge === 'elite' && <span className="badge-elite"><Crown size={9} />Elite</span>}
                      {business.badge === 'premium' && <span className="badge-premium"><Shield size={9} />Premium</span>}
                      {business.badge === 'verified' && <span className="badge-verified"><CheckCircle size={9} />Verified</span>}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {business.isOpen && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-brand/80 text-white text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Open
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-semibold text-white text-base leading-tight">{business.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1">
                          <Star size={11} className="text-gold fill-gold" />
                          <span className="text-xs text-white font-semibold">{business.rating}</span>
                          <span className="text-xs text-white/70">({business.reviewCount})</span>
                        </div>
                        <span className="text-white/50 text-xs">·</span>
                        <span className="text-xs text-white/70">{business.neighborhood}</span>
                        {business.distance && (
                          <>
                            <span className="text-white/50 text-xs">·</span>
                            <span className="text-xs text-white/70">{business.distance}km</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-muted mb-3">{business.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {business.waitTime !== undefined && (
                          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg glass-card text-text-secondary border border-border">
                            <Clock size={10} />
                            {business.waitTime === 0 ? 'No wait' : `${business.waitTime}min`}
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded-lg glass-card text-text-secondary border border-border">
                          {business.priceRange}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-gold">From KSh {Math.min(...business.services.map(s => s.price)).toLocaleString()}</div>
                        <div className="text-xs text-text-muted mt-0.5">{business.nextAvailable}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <CustomerNav />
    </div>
  )
}
