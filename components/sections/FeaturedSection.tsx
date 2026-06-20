'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Crown, Shield, CheckCircle, MapPin, ArrowRight } from 'lucide-react'
import { BUSINESSES } from '@/lib/mock-data'

export function FeaturedSection() {
  const featuredBusinesses = BUSINESSES.filter(b => b.featured).slice(0, 3)

  return (
    <section className="py-20 px-4 border-t border-border" aria-labelledby="featured-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2
              id="featured-heading"
              className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary"
            >
              Top Rated Near You
            </h2>
            <p className="text-text-secondary mt-1">Nairobi&apos;s most loved beauty destinations</p>
          </div>
          <Link
            href="/search"
            className="btn-outline-gold text-sm px-4 py-2 hidden sm:flex rounded-xl items-center gap-1"
          >
            View All
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map(business => (
            <Link
              key={business.id}
              href={`/salon/${business.id}`}
              className="group"
              aria-label={`${business.name} — rated ${business.rating} stars`}
            >
              <article
                className="rounded-2xl overflow-hidden border transition-all duration-300 h-full group-hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(160deg, #1F1410 0%, #1C1208 100%)',
                  borderColor: 'rgba(58,42,30,1)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(166,75,42,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(166,75,42,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(58,42,30,1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)' }}
              >
                {/* Cover image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={business.coverImage}
                    alt={`${business.name} cover`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    {business.badge === 'elite' && (
                      <span className="badge-elite flex items-center gap-1">
                        <Crown size={10} aria-hidden="true" />
                        Elite
                      </span>
                    )}
                    {business.badge === 'premium' && (
                      <span className="badge-premium flex items-center gap-1">
                        <Shield size={10} aria-hidden="true" />
                        Premium
                      </span>
                    )}
                    {business.badge === 'verified' && (
                      <span className="badge-verified flex items-center gap-1">
                        <CheckCircle size={10} aria-hidden="true" />
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Open indicator */}
                  {business.isOpen && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-brand/80 text-white text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
                      Open
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-text-primary group-hover:text-terracotta-light transition-colors leading-tight">
                      {business.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={13} className="text-gold fill-gold" aria-hidden="true" />
                      <span className="text-sm font-semibold text-text-primary">{business.rating}</span>
                      <span className="text-xs text-text-muted">({business.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mb-3">{business.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <MapPin size={11} aria-hidden="true" />
                      {business.neighborhood} · {business.distance}km
                    </div>
                    <div className="text-xs font-medium text-gold">
                      From KSh {Math.min(...business.services.map(s => s.price)).toLocaleString()}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
