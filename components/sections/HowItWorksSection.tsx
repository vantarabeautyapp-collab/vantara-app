'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Search, Clock, Sparkles } from 'lucide-react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface Step {
  step:        string
  title:       string
  description: string
  icon:        LucideIcon
  accent:      string
  glow:        string
  photo:       string
  detail:      string[]
}

const STEPS: Step[] = [
  {
    step:        '01',
    title:       'Discover Your Artisan',
    description: 'Search by service, city, or professional. Filter by ratings, specialties, and real-time availability — then read verified reviews from real clients.',
    icon:        Search,
    accent:      '#D4A24C',
    glow:        'rgba(212,162,76,0.45)',
    photo:       '/images/stitch/step-discover.jpg',
    detail:      ['Smart search by city or style', 'AI-powered style matching', 'Verified reviews only'],
  },
  {
    step:        '02',
    title:       'Book in Seconds',
    description: 'See live slots, pick your preferred stylist, and confirm your appointment in under 60 seconds. M-Pesa, card, or cash — your choice.',
    icon:        Clock,
    accent:      '#C56A3D',
    glow:        'rgba(197,106,61,0.45)',
    photo:       '/images/stitch/step-book.jpg',
    detail:      ['Real-time slot availability', 'M-Pesa, card, or cash', 'Instant confirmation'],
  },
  {
    step:        '03',
    title:       'Arrive & Glow',
    description: 'Show up, experience the craft, pay securely. Every visit earns Beauty Points toward exclusive rewards and VIP access.',
    icon:        Sparkles,
    accent:      '#6E8A3A',
    glow:        'rgba(110,138,58,0.45)',
    photo:       '/images/stitch/step-glow.jpg',
    detail:      ['Secure in-app payment', 'Earn Beauty Passport points', 'Leave a verified review'],
  },
]

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const photoVariants = {
  enter:  { opacity: 0, scale: 1.04, filter: 'blur(8px)' },
  center: { opacity: 1, scale: 1,    filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, scale: 0.97, filter: 'blur(4px)', transition: { duration: 0.28, ease: 'easeIn' } },
}

export function HowItWorksSection() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const step = STEPS[active]

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 border-t border-border relative overflow-hidden"
      aria-labelledby="how-heading"
    >
      {/* Pattern bg */}
      <div className="absolute inset-0 pattern-maasai pointer-events-none opacity-40" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            How It Works
          </span>
          <h2
            id="how-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary"
          >
            From Discovery to Glow —{' '}
            <span className="gold-text">In Three Steps</span>
          </h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* LEFT: Steps */}
          <motion.ol
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            aria-label="How Vantara works"
          >
            {STEPS.map((s, i) => {
              const isActive = i === active
              return (
                <motion.li key={i} variants={itemVariants}>
                  <button
                    onClick={() => setActive(i)}
                    className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-2xl"
                    aria-pressed={isActive}
                    aria-label={`Step ${s.step}: ${s.title}`}
                  >
                    <motion.div
                      className="relative rounded-2xl p-5 transition-colors duration-300 overflow-hidden"
                      animate={{
                        background: isActive
                          ? `linear-gradient(135deg, ${s.accent}18 0%, rgba(18,13,8,0.9) 100%)`
                          : 'rgba(28,18,8,0.4)',
                        borderColor: isActive ? `${s.accent}55` : 'rgba(255,255,255,0.06)',
                      }}
                      style={{ border: '1px solid' }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Active left accent bar */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                        animate={{
                          background: isActive ? `linear-gradient(180deg, ${s.accent}, transparent)` : 'transparent',
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="flex items-start gap-4">
                        {/* Step number + icon */}
                        <div className="shrink-0">
                          <motion.div
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            animate={{
                              background: isActive ? s.accent : 'rgba(255,255,255,0.06)',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <s.icon
                              size={18}
                              style={{ color: isActive ? '#120D08' : s.accent }}
                              aria-hidden="true"
                            />
                          </motion.div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-playfair text-xs font-bold tracking-wider"
                              style={{ color: s.accent }}
                              aria-hidden="true"
                            >
                              {s.step}
                            </span>
                            <h3 className="font-semibold text-text-primary text-sm">{s.title}</h3>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed">{s.description}</p>

                          {/* Animated detail bullets */}
                          <AnimatePresence>
                            {isActive && !reduced && (
                              <motion.ul
                                className="mt-3 space-y-1"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              >
                                {s.detail.map((d, j) => (
                                  <motion.li
                                    key={j}
                                    className="flex items-center gap-2 text-xs"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: j * 0.06 }}
                                  >
                                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: s.accent }} aria-hidden="true" />
                                    <span style={{ color: s.accent }}>{d}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </button>
                </motion.li>
              )
            })}
          </motion.ol>

          {/* RIGHT: Photo panel */}
          <motion.div
            className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-[4/5] max-h-[580px] lg:max-h-none"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Crossfade photo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                variants={reduced ? {} : photoVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Image
                  src={step.photo}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(18,13,8,0.15) 0%, rgba(18,13,8,0.55) 60%, rgba(18,13,8,0.88) 100%)' }}
            />
            {/* Glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ background: `radial-gradient(circle at 50% 85%, ${step.glow} 0%, transparent 60%)` }}
              transition={{ duration: 0.5 }}
            />

            {/* Step indicator */}
            <div className="absolute top-4 left-4 flex gap-2">
              {STEPS.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full focus:outline-none"
                  animate={{
                    width: i === active ? 24 : 6,
                    background: i === active ? step.accent : 'rgba(255,255,255,0.35)',
                  }}
                  style={{ height: 6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Bottom overlay content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p
                    className="font-playfair text-4xl font-bold mb-1"
                    style={{ color: step.accent }}
                    aria-hidden="true"
                  >
                    {step.step}
                  </p>
                  <h3 className="font-semibold text-white text-xl">{step.title}</h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
