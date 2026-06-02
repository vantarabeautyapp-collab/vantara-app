'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin, Navigation, Search, ChevronDown, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { AfricanCountry } from '@/lib/africa-locations'

export interface LocationValue {
  countryCode: string
  countryName: string
  flag: string
  city: string
  currency: { code: string; symbol: string; name: string }
  payments: { id: string; name: string; icon: string; type: string }[]
}

interface LocationPickerProps {
  value: LocationValue | null
  onChange: (location: LocationValue) => void
  label?: string
  required?: boolean
  className?: string
  showPayments?: boolean
}

export default function LocationPicker({
  value, onChange, label = 'Location', required, className = '', showPayments = false,
}: LocationPickerProps) {
  const [countries, setCountries] = useState<AfricanCountry[]>([])
  const [cities, setCities] = useState<{ name: string }[]>([])
  const [cityQuery, setCityQuery] = useState(value?.city ?? '')
  const [showCountryDrop, setShowCountryDrop] = useState(false)
  const [showCityDrop, setShowCityDrop] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [loadingCities, setLoadingCities] = useState(false)
  const [detectingGPS, setDetectingGPS] = useState(false)
  const [gpsError, setGpsError] = useState('')
  const [gpsSuccess, setGpsSuccess] = useState(false)
  const cityDebounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Load countries once
  useEffect(() => {
    fetch('/api/locations/countries')
      .then(r => r.json())
      .then(data => setCountries(data))
      .catch(() => {})
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowCountryDrop(false)
        setShowCityDrop(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Fetch cities when country changes or city query changes
  const fetchCities = useCallback((countryCode: string, q: string) => {
    if (!countryCode) return
    if (cityDebounce.current) clearTimeout(cityDebounce.current)
    cityDebounce.current = setTimeout(async () => {
      setLoadingCities(true)
      try {
        const params = new URLSearchParams({ country: countryCode })
        if (q.trim()) params.set('q', q.trim())
        const res = await fetch(`/api/locations/cities?${params}`)
        const data = await res.json()
        setCities(data.cities ?? [])
      } catch {
        setCities([])
      } finally {
        setLoadingCities(false)
      }
    }, 250)
  }, [])

  useEffect(() => {
    if (value?.countryCode) fetchCities(value.countryCode, cityQuery)
  }, [value?.countryCode, cityQuery, fetchCities])

  function selectCountry(country: AfricanCountry) {
    setCityQuery('')
    setCities([])
    setShowCountryDrop(false)
    setCountrySearch('')
    onChange({
      countryCode: country.code,
      countryName: country.name,
      flag: country.flag,
      city: '',
      currency: country.currency,
      payments: country.payments,
    })
  }

  function selectCity(cityName: string) {
    setCityQuery(cityName)
    setShowCityDrop(false)
    if (value) {
      onChange({ ...value, city: cityName })
    }
  }

  async function detectLocation() {
    setGpsError('')
    setGpsSuccess(false)
    setDetectingGPS(true)
    if (!navigator.geolocation) {
      setGpsError('Geolocation not supported on this device.')
      setDetectingGPS(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(`/api/locations/geocode?lat=${latitude}&lon=${longitude}`)
          const data = await res.json()
          if (!res.ok || !data.supported) {
            setGpsError(data.message ?? 'Location not in a supported African country.')
          } else {
            setCityQuery(data.city ?? '')
            onChange({
              countryCode: data.countryCode,
              countryName: data.countryName,
              flag: data.flag,
              city: data.city ?? '',
              currency: data.currency,
              payments: data.payments,
            })
            setGpsSuccess(true)
            setTimeout(() => setGpsSuccess(false), 3000)
          }
        } catch {
          setGpsError('Could not determine location. Please select manually.')
        } finally {
          setDetectingGPS(false)
        }
      },
      (err) => {
        setDetectingGPS(false)
        setGpsError(
          err.code === 1
            ? 'Location access denied. Please allow location or select manually.'
            : 'Could not get location. Please select manually.'
        )
      },
      { timeout: 10000, enableHighAccuracy: false }
    )
  }

  const filteredCountries = countrySearch
    ? countries.filter(c =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.code.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : countries

  // Group by region for display
  const regions: Record<string, AfricanCountry[]> = {}
  filteredCountries.forEach(c => {
    if (!regions[c.region]) regions[c.region] = []
    regions[c.region].push(c)
  })
  const regionLabels: Record<string, string> = {
    east: 'East Africa', west: 'West Africa', north: 'North Africa',
    central: 'Central Africa', southern: 'Southern Africa',
  }

  return (
    <div ref={containerRef} className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-text-secondary">
          <MapPin size={11} className="inline mr-1" />
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      {/* GPS detect button */}
      <button
        type="button"
        onClick={detectLocation}
        disabled={detectingGPS}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-gold/30 bg-gold/5 text-gold text-sm hover:bg-gold/10 transition-colors disabled:opacity-60"
      >
        {detectingGPS ? (
          <><Loader2 size={14} className="animate-spin" /> Detecting location...</>
        ) : gpsSuccess ? (
          <><CheckCircle2 size={14} className="text-emerald-light" /> Location detected!</>
        ) : (
          <><Navigation size={14} /> Use my current location</>
        )}
      </button>

      {gpsError && (
        <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          <AlertCircle size={13} className="shrink-0 mt-0.5" />
          {gpsError}
        </div>
      )}

      {/* Country selector */}
      <div className="relative">
        <label className="block text-xs text-text-muted mb-1.5">Country</label>
        <button
          type="button"
          onClick={() => { setShowCountryDrop(v => !v); setShowCityDrop(false) }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-surface border border-border text-sm text-left hover:border-gold/40 transition-colors"
        >
          {value ? (
            <>
              <span className="text-xl leading-none">{value.flag}</span>
              <span className="flex-1 text-text-primary">{value.countryName}</span>
              <span className="text-xs text-text-muted">{value.currency.code}</span>
            </>
          ) : (
            <span className="text-text-muted flex-1">Select a country…</span>
          )}
          <ChevronDown size={14} className={`text-text-muted transition-transform ${showCountryDrop ? 'rotate-180' : ''}`} />
        </button>

        {showCountryDrop && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search country…"
                  autoFocus
                  value={countrySearch}
                  onChange={e => setCountrySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-surface-hover rounded-lg border border-border focus:outline-none focus:border-gold/40 text-text-primary placeholder:text-text-muted"
                />
              </div>
            </div>
            {/* Country list */}
            <div className="max-h-64 overflow-y-auto">
              {Object.entries(regions).map(([region, ctrs]) => (
                <div key={region}>
                  <div className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-text-muted bg-surface sticky top-0">
                    {regionLabels[region] ?? region}
                  </div>
                  {ctrs.map(c => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => selectCountry(c)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-surface-hover transition-colors text-left ${value?.countryCode === c.code ? 'bg-gold/10 text-gold' : 'text-text-primary'}`}
                    >
                      <span className="text-lg">{c.flag}</span>
                      <span className="flex-1">{c.name}</span>
                      <span className="text-xs text-text-muted">{c.currency.symbol}</span>
                    </button>
                  ))}
                </div>
              ))}
              {filteredCountries.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-text-muted">No countries found</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* City / Town search */}
      {value?.countryCode && (
        <div className="relative">
          <label className="block text-xs text-text-muted mb-1.5">City / Town</label>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder={`Search cities in ${value.countryName}…`}
              value={cityQuery}
              onChange={e => {
                setCityQuery(e.target.value)
                setShowCityDrop(true)
                if (value) onChange({ ...value, city: e.target.value })
              }}
              onFocus={() => setShowCityDrop(true)}
              className="w-full pl-8 pr-10 py-2.5 rounded-xl bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
            />
            {loadingCities && (
              <Loader2 size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted animate-spin" />
            )}
          </div>

          {showCityDrop && cities.length > 0 && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden max-h-56 overflow-y-auto">
              {cities.map((city, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectCity(city.name)}
                  className={`w-full px-4 py-2.5 text-sm text-left hover:bg-surface-hover transition-colors flex items-center gap-2 ${value?.city === city.name ? 'bg-gold/10 text-gold' : 'text-text-primary'}`}
                >
                  <MapPin size={12} className="text-text-muted shrink-0" />
                  {city.name}
                </button>
              ))}
            </div>
          )}

          {showCityDrop && cityQuery && cities.length === 0 && !loadingCities && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-2xl border border-border bg-surface shadow-lg px-4 py-3 text-sm text-text-muted">
              No matches — your town will be saved as typed: <strong className="text-text-secondary">{cityQuery}</strong>
            </div>
          )}
        </div>
      )}

      {/* Payment methods for this country */}
      {showPayments && value?.payments && value.payments.length > 0 && (
        <div>
          <label className="block text-xs text-text-muted mb-1.5">Available payment methods</label>
          <div className="flex flex-wrap gap-1.5">
            {value.payments.map(p => (
              <span
                key={p.id}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border border-border bg-surface-hover text-text-secondary"
              >
                {p.icon} {p.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
