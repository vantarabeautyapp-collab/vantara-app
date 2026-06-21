'use client'

import { useRef, useCallback } from 'react'
import { Shield, Sparkles, Crown, Zap, TrendingUp, Star } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon:        LucideIcon
  title:       string
  description: string
  bg:          string
  border:      string
  iconColor:   string
  glowColor:   string
  tag:         string
}

const FEATURES: Feature[] = [
  {
    icon:        Shield,
    title:       'Vantara Verified',
    description: 'Every business is manually reviewed before earning a Verified badge. Customers always know exactly who they are booking with.',
    bg:          'linear-gradient(135deg, rgba(166,75,42,0.16) 0%, rgba(18,13,8,0.94) 100%)',
    border:      'rgba(166,75,42,0.32)',
    iconColor:   '#C56A3D',
    glowColor:   'rgba(166,75,42,0.22)',
    tag:         'Trust',
  },
  {
    icon:        Sparkles,
    title:       'Style Match AI',
    description: 'Upload your photo and get AI-powered style recommendations tailored to your face shape and hair texture.',
    bg:          'linear-gradient(135deg, rgba(85,107,47,0.16) 0%, rgba(18,13,8,0.94) 100%)',
    border:      'rgba(85,107,47,0.32)',
    iconColor:   '#6E8A3A',
    glowColor:   'rgba(85,107,47,0.22)',
    tag:         'Innovation',
  },
  {
    icon:        Crown,
    title:       'Beauty Passport',
    description: 'Earn points on every booking and referral. Level up from Bronze to Platinum and unlock discounts, free services, and VIP access.',
    bg:          'linear-gradient(135deg, rgba(212,162,76,0.16) 0%, rgba(18,13,8,0.94) 100%)',
    border:      'rgba(212,162,76,0.32)',
    iconColor:   '#D4A24C',
    glowColor:   'rgba(212,162,76,0.22)',
    tag:         'Community',
  },
  {
    icon:        Zap,
    title:       'Nearby Now',
    description: 'See which salons and barbers are open right now, real-time wait times, and who has slots available today.',
    bg:          'linear-gradient(135deg, rgba(85,107,47,0.13) 0%, rgba(18,13,8,0.94) 100%)',
    border:      'rgba(85,107,47,0.26)',
    iconColor:   '#556B2F',
    glowColor:   'rgba(85,107,47,0.18)',
    tag:         'Real-Time',
  },
  {
    icon:        TrendingUp,
    title:       'Business Growth Suite',
    description: 'Analytics, booking calendars, staff management, and promotion tools — everything an independent beauty business needs to win.',
    bg:          'linear-gradient(135deg, rgba(224,122,45,0.16) 0%, rgba(18,13,8,0.94) 100%)',
    border:      'rgba(224,122,45,0.32)',
    iconColor:   '#E07A2D',
    glowColor:   'rgba(224,122,45,0.22)',
    tag:         'Business',
  },
  {
    icon:        Star,
    title:       'Authentic Rankings',
    description: 'Rankings powered by verified reviews, repeat visits, service quality, and response times — never paid placements.',
    bg:          'linear-gradient(135deg, rgba(166,75,42,0.13) 0%, rgba(18,13,8,0.94) 100%)',
    border:      'rgba(166,75,42,0.24)',
    iconColor:   '#A64B2A',
    glowColor:   'rgba(166,75,42,0.18)',
    tag:         'Integrity',
  },
]

/* ─── Tilt card with mouse tracking ──────────────────────────────────── */
function TiltCard({ feature, index, inView }: { feature: Feature; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(8px)`
    cardRef.current.style.transition = 'transform 0.08s ease-out'
  }, [reduced])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
    cardRef.current.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }, [])

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 48, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="will-change-transform"
    >
      <div
        ref={cardRef}
        className="group rounded-2xl p-6 h-full relative overflow-hidden cursor-default"
        style={{ background: feature.bg, border: `1px solid ${feature.border}` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
          style={{ boxShadow: `inset 0 0 40px ${feature.glowColor}` }}
        />

        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: `linear-gradient(105deg, transparent 40%, ${feature.glowColor} 50%, transparent 60%)` }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
        </div>

        {/* Tag */}
        <div className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase opacity-40 text-text-muted">
          {feature.tag}
        </div>

        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative"
          style={{ background: 'rgba(18,13,8,0.7)', border: `1px solid ${feature.border}` }}
          whileHover={reduced ? {} : {
            boxShadow: `0 0 20px ${feature.glowColor}`,
            transition: { duration: 0.3 },
          }}
        >
          {/* Pulsing glow ring */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ border: `1px solid ${feature.iconColor}` }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.12, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
          />
          <feature.icon size={20} style={{ color: feature.iconColor }} aria-hidden="true" />
        </motion.div>

        {/* Content */}
        <h3 className="font-semibold text-text-primary mb-2 group-hover:text-white transition-colors duration-200">
          {feature.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${feature.iconColor}, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────── */
export function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  return (
    <section
      id="features"
      ref={ref}
      className="py-20 px-4 border-t border-border relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 pattern-adinkra pointer-events-none opacity-40" aria-hidden="true" />

      {/* Ambient glow orbs */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-96 h-96 left-[10%] top-[20%] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, #A64B2A, transparent)', filter: 'blur(60px)' }} />
          <div className="absolute w-80 h-80 right-[10%] bottom-[20%] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, #D4A24C, transparent)', filter: 'blur(60px)' }} />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-14"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-3">Platform Features</p>
          <h2
            id="features-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            Technology Built for Africa
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            Every feature was designed around Africa&apos;s beauty culture — from M-Pesa and mobile-first
            payments to AI trained on African hair types and skin tones.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((feature, i) => (
            <TiltCard key={i} feature={feature} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
