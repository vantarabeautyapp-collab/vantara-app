'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowLeft, Star, MapPin, Clock, Phone, Globe, Share2,
  Heart, CheckCircle, Shield, Crown, ChevronRight, Wifi,
  CreditCard, Car, Coffee, type LucideIcon
} from 'lucide-react'
import CustomerNav from '@/components/navigation/CustomerNav'
import { BUSINESSES } from '@/lib/mock-data'
import { cn, formatDuration, timeAgo } from '@/lib/utils'

const AMENITY_ICONS: Record<string, LucideIcon> = {
  'Free WiFi': Wifi,
  'Card Payment': CreditCard,
  'Parking': Car,
  'Complimentary Drinks': Coffee,
}

export default function SalonProfilePage({ params }: { params: { id: string } }) {
  const business = BUSINESSES.find(b => b.id === params.id) || BUSINESSES[0]
  const [activeTab, setActiveTab] = useState<'services' | 'gallery' | 'team' | 'reviews'>('services')
  const [saved, setSaved] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'team', label: 'Team' },
    { id: 'reviews', label: `Reviews (${business.reviewCount})` },
  ]

  return (
    <div className="min-h-screen pb-32" style={{ background: 'var(--color-background)' }}>
      {/* Hero Image */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <Image src={business.coverImage} alt={business.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-safe-top">
          <Link href="/search" className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center"
              aria-label={saved ? 'Unsave' : 'Save'}
            >
              <Heart size={18} className={saved ? 'text-red-400 fill-red-400' : 'text-white'} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Share2 size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            {business.badge === 'elite' && <span className="badge-elite"><Crown size={9} />Elite</span>}
            {business.badge === 'premium' && <span className="badge-premium"><Shield size={9} />Premium</span>}
            {business.badge === 'verified' && <span className="badge-verified"><CheckCircle size={9} />Verified</span>}
            {business.isOpen && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-brand/80 text-white text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Open Now
              </span>
            )}
          </div>
          <h1 className="font-playfair text-2xl font-bold text-white">{business.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star size={13} className="text-gold fill-gold" />
              <span className="text-sm font-bold text-white">{business.rating}</span>
              <span className="text-xs text-white/70">({business.reviewCount} reviews)</span>
            </div>
            <span className="text-white/40">·</span>
            <span className="text-xs text-white/70">{business.priceRange}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4">
        {/* Quick info */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass-card rounded-xl p-3 text-center">
            <MapPin size={16} className="text-gold mx-auto mb-1" />
            <div className="text-xs text-text-muted">{business.neighborhood}</div>
            {business.distance && <div className="text-xs font-medium text-text-primary">{business.distance}km away</div>}
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <Clock size={16} className="text-emerald-light mx-auto mb-1" />
            <div className="text-xs text-text-muted">Next slot</div>
            <div className="text-xs font-medium text-text-primary">{business.nextAvailable}</div>
          </div>
          <div className="glass-card rounded-xl p-3 text-center">
            <div className="text-xs font-bold text-gold text-lg leading-none mb-1">{business.responseTime}</div>
            <div className="text-xs text-text-muted">Response</div>
          </div>
        </div>

        {/* About */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{business.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-5">
          {business.amenities.map(amenity => {
            const Icon = AMENITY_ICONS[amenity]
            return (
              <span key={amenity} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full glass-card border border-border text-text-secondary">
                {Icon && <Icon size={11} className="text-text-muted" />}
                {amenity}
              </span>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl border border-border glass-card mb-5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-150',
                activeTab === tab.id
                  ? 'bg-gold/15 text-gold border border-gold/25'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'services' && (
          <div className="space-y-3 animate-fade-up">
            {business.services.map(service => (
              <button
                key={service.id}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                className={cn(
                  'w-full text-left glass-card rounded-2xl p-4 border transition-all duration-200',
                  selectedService === service.id
                    ? 'border-gold/40 bg-gold/5'
                    : 'border-border hover:border-gold/25'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-text-primary">{service.name}</span>
                      {service.popular && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/20">Popular</span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-text-secondary">
                        <Clock size={10} className="inline mr-1" />
                        {formatDuration(service.duration)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold text-gold">KSh {service.price.toLocaleString()}</div>
                    {selectedService === service.id && (
                      <Link
                        href={`/booking?business=${business.id}&service=${service.id}`}
                        className="mt-2 block btn-gold text-xs px-3 py-1.5 rounded-lg"
                      >
                        Book
                      </Link>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="animate-fade-up">
            {business.galleryImages.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl border border-border">
                <p className="text-text-muted text-sm">No gallery photos yet.</p>
                <p className="text-text-muted text-xs mt-1">The business hasn&apos;t uploaded photos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {business.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                  >
                    <Image
                      src={img}
                      alt={`${business.name} — photo ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes={i === 0 ? '100vw' : '50vw'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-3 animate-fade-up">
            {business.staff.map(member => (
              <div key={member.id} className="glass-card rounded-2xl p-4 border border-border flex items-center gap-4">
                <div className="relative">
                  <Image src={member.avatar} alt={member.name} width={52} height={52} className="rounded-full" />
                  <span className={cn(
                    'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface',
                    member.available ? 'bg-emerald-light' : 'bg-text-muted'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-text-primary">{member.name}</div>
                  <div className="text-xs text-text-muted">{member.role}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={11} className="text-gold fill-gold" />
                    <span className="text-xs font-medium text-text-primary">{member.rating}</span>
                    <span className="text-xs text-text-muted">({member.reviewCount} reviews)</span>
                  </div>
                </div>
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full border',
                  member.available
                    ? 'text-emerald-light bg-emerald-brand/10 border-emerald-brand/30'
                    : 'text-text-muted bg-surface-elevated border-border'
                )}>
                  {member.available ? 'Available' : 'Busy'}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fade-up">
            {/* Rating summary */}
            <div className="glass-card rounded-2xl p-4 border border-border flex items-center gap-6">
              <div className="text-center">
                <div className="font-playfair text-4xl font-bold text-text-primary">{business.rating}</div>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < Math.floor(business.rating) ? 'text-gold fill-gold' : 'text-text-muted'} />
                  ))}
                </div>
                <div className="text-xs text-text-muted mt-1">{business.reviewCount} reviews</div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map(star => {
                  const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : 2
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-text-muted w-2">{star}</span>
                      <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-text-muted w-6">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {business.reviews.map(review => (
              <div key={review.id} className="glass-card rounded-2xl p-4 border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <Image src={review.userAvatar} alt={review.userName} width={36} height={36} className="rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-text-primary">{review.userName}</span>
                      <span className="text-xs text-text-muted">{timeAgo(review.date)}</span>
                    </div>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className={i < review.rating ? 'text-gold fill-gold' : 'text-text-muted'} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                  <span>{review.serviceReceived}</span>
                  <span>·</span>
                  <span>with {review.staffName}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Book Button */}
      <div className="fixed bottom-16 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(to top, var(--color-background) 60%, transparent)' }}>
        <Link
          href={`/booking?business=${business.id}`}
          className="w-full btn-gold rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2"
        >
          Book Appointment
          <ChevronRight size={18} />
        </Link>
      </div>

      <CustomerNav />
    </div>
  )
}
