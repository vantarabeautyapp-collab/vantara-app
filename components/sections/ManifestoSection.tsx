'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Shield, Star, Lightbulb, TrendingUp, Users } from 'lucide-react'

/* ─── Animated counter ──────────────────────────────────────────────────── */
function Counter({ target, suffix = '', prefix = '' }: { target: number | string; suffix?: string; prefix?: string }) {
  const numericTarget = typeof target === 'string' ? parseFloat(target.replace(/[^0-9.]/g, '')) : target
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) { setCount(numericTarget); return }
    const duration = 2200
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setCount(Math.floor(eased * numericTarget))
      if (p < 1) requestAnimationFrame(tick)
      else setCount(numericTarget)
    }
    requestAnimationFrame(tick)
  }, [inView, numericTarget, reduced])

  return <span ref={ref}>{prefix}{Number.isInteger(numericTarget) ? count.toLocaleString() : count.toFixed(1)}{suffix}</span>
}

/* ─── Word-by-word animated quote ──────────────────────────────────────── */
function AnimatedQuote({ children, className = '' }: { children: string; className?: string }) {
  const words = children.split(' ')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  return (
    <span ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={reduced ? false : { opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Morphing blob ─────────────────────────────────────────────────────── */
function MorphBlob({ className, color, delay = 0 }: { className: string; color: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ background: color }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '40% 60% 50% 50% / 40% 70% 60% 30%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
        scale: [1, 1.08, 0.96, 1],
        rotate: [0, 15, -10, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ─── Values card ───────────────────────────────────────────────────────── */
const VALUES = [
  { icon: Shield,     name: 'Trust',        description: 'Every business manually reviewed. Verified badges are earned, not bought.',                                   color: '#C56A3D', bg: 'rgba(166,75,42,0.12)',  border: 'rgba(166,75,42,0.25)' },
  { icon: Star,       name: 'Excellence',   description: 'We surface only the highest-quality professionals — ranked by real outcomes, not paid placement.',             color: '#D4A24C', bg: 'rgba(212,162,76,0.10)', border: 'rgba(212,162,76,0.22)' },
  { icon: Lightbulb,  name: 'Innovation',   description: 'AI match, real-time slots, M-Pesa — technology designed from the ground up for Africa.',                      color: '#E07A2D', bg: 'rgba(224,122,45,0.10)', border: 'rgba(224,122,45,0.22)' },
  { icon: TrendingUp, name: 'Empowerment',  description: 'Independent professionals get the tools, visibility, and community to grow on their own terms.',               color: '#6E8A3A', bg: 'rgba(85,107,47,0.12)',  border: 'rgba(85,107,47,0.24)' },
  { icon: Users,      name: 'Community',    description: 'Every booking is a connection. Every review builds the next professional\'s legacy.',                          color: '#D4A24C', bg: 'rgba(212,162,76,0.08)', border: 'rgba(212,162,76,0.18)' },
]

const IMPACT = [
  { value: 1.4,   suffix: 'B', prefix: '',  label: 'People on the continent',       sub: 'Our entire addressable market' },
  { value: 57,    suffix: 'B', prefix: '$', label: 'African beauty market by 2030', sub: 'The industry we are digitising' },
  { value: 54,    suffix: '',  prefix: '',  label: 'Countries in Africa',            sub: 'One platform to serve them all' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden:   { opacity: 0, y: 48, scale: 0.95 },
  visible:  { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function ManifestoSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const reduced = useReducedMotion()

  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-4 border-t border-border overflow-hidden"
      aria-labelledby="manifesto-heading"
    >
      {/* ── Morphing blob atmosphere ── */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <MorphBlob
            className="w-[600px] h-[600px] left-[-200px] top-[-100px] opacity-[0.07]"
            color="radial-gradient(circle, #A64B2A, #E07A2D)"
            delay={0}
          />
          <MorphBlob
            className="w-[500px] h-[500px] right-[-150px] bottom-[10%] opacity-[0.06]"
            color="radial-gradient(circle, #D4A24C, #A64B2A)"
            delay={6}
          />
          <MorphBlob
            className="w-[350px] h-[350px] left-[40%] top-[30%] opacity-[0.04]"
            color="radial-gradient(circle, #556B2F, #D4A24C)"
            delay={3}
          />
        </div>
      )}

      {/* ── Top gradient line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(166,75,42,0.6), rgba(212,162,76,0.5), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative">

        {/* ── Chapter badge ── */}
        <motion.div
          className="flex justify-center mb-16"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
            <span className="w-1 h-1 rounded-full bg-gold" aria-hidden="true" />
            The Vantara Story
          </span>
        </motion.div>

        {/* ── Giant quote ── */}
        <div className="text-center mb-20">
          <div
            className="relative mx-auto max-w-4xl mb-8 px-8"
            style={{ borderLeft: '3px solid rgba(166,75,42,0.6)' }}
          >
            <motion.div
              style={reduced ? {} : { y: yParallax }}
              className="will-change-transform"
            >
              <blockquote>
                <p
                  id="manifesto-heading"
                  className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-5 text-left"
                >
                  <AnimatedQuote className="gold-text">&ldquo;Across Africa, there is no shortage of talent.</AnimatedQuote>
                  <br className="hidden sm:block" />
                  <AnimatedQuote className="text-text-primary">There was a shortage of the right platform.&rdquo;</AnimatedQuote>
                </p>
                <footer className="text-sm text-text-muted text-left mt-4">
                  <cite>— The founding belief behind Vantara</cite>
                </footer>
              </blockquote>
            </motion.div>
          </div>

          <motion.div
            className="space-y-4 max-w-2xl mx-auto"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              Africa is home to some of the most skilled barbers, braiders, makeup artists, and skincare
              specialists in the world. Their craft is passed down through generations, refined in vibrant
              cities from Lagos to Nairobi — yet most remained hidden from the clients who needed them.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Vantara exists to change that. We built the platform Africa&apos;s beauty industry deserves —
              one that honours the artisan, empowers the client, and puts African excellence
              at the centre of every experience.
            </p>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-gold border border-gold/30 px-5 py-2.5 rounded-xl hover:bg-gold/5 transition-all duration-200"
            >
              Read Our Full Story <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Impact stats ── */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 sm:gap-6 mb-24 rounded-3xl p-6 sm:p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(166,75,42,0.1), rgba(212,162,76,0.05), rgba(18,13,8,0.95))',
            border: '1px solid rgba(166,75,42,0.22)',
          }}
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background shimmer */}
          {!reduced && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(212,162,76,0.04) 50%, transparent 60%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
            />
          )}
          {IMPACT.map((item, i) => (
            <div key={i} className="text-center relative">
              <div className="font-playfair text-3xl sm:text-5xl font-bold gold-text mb-2">
                {statsInView
                  ? <Counter target={item.value} prefix={item.prefix} suffix={item.suffix} />
                  : <span>{item.prefix}0{item.suffix}</span>
                }
              </div>
              <div className="text-sm font-medium text-text-primary leading-snug">{item.label}</div>
              <div className="text-xs text-text-muted mt-1 hidden sm:block">{item.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Values ── */}
        <div ref={valuesRef}>
          <motion.div
            className="text-center mb-12"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              What We Stand For
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-text-primary">
              Five Values. One Platform.
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="rounded-2xl p-5 flex flex-col gap-3 cursor-default group"
                style={{ background: v.bg, border: `1px solid ${v.border}` }}
                whileHover={reduced ? {} : { y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(18,13,8,0.6)', border: `1px solid ${v.border}` }}
                  whileHover={reduced ? {} : { rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                >
                  <v.icon size={18} style={{ color: v.color }} aria-hidden="true" />
                </motion.div>
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: v.color }}>{v.name}</div>
                  <p className="text-xs text-text-muted leading-relaxed">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
