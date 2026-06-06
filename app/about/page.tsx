/**
 * /about — The Vantara Brand Story
 * Full brand origin, mission, vision, and values page.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Shield, Star, Lightbulb, TrendingUp, Users,
  Eye, Sparkles, Zap, ArrowRight
} from 'lucide-react'
import { NavbarSection } from '@/components/sections/NavbarSection'
import { FooterSection } from '@/components/sections/FooterSection'

export const metadata: Metadata = {
  title:       'About Vantara — Africa\'s Beauty & Grooming Marketplace',
  description: 'The story behind Vantara — our mission to connect Africa\'s finest beauty professionals with the people who need them most.',
  openGraph: {
    title:       'About Vantara',
    description: 'The story behind Africa\'s leading beauty and grooming marketplace.',
    type:        'website',
  },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAME_PILLARS = [
  {
    icon:       Eye,
    keyword:    'Vision',
    color:      'text-blue-400',
    bg:         'bg-blue-500/10',
    border:     'border-blue-500/20',
    headline:   'Seeing what others don\'t.',
    body:       'Vantara helps customers discover trusted beauty professionals who were always there — just invisible. And it helps those professionals finally get seen.',
  },
  {
    icon:       Sparkles,
    keyword:    'Vanity',
    color:      'text-gold',
    bg:         'bg-gold/10',
    border:     'border-gold/20',
    headline:   'Pride in yourself.',
    body:       'Not vanity as a flaw — vanity as confidence, self-expression, and the belief that everyone deserves to look good and feel great. That belief is core to everything we build.',
  },
  {
    icon:       Zap,
    keyword:    'Vanguard',
    color:      'text-purple-400',
    bg:         'bg-purple-500/10',
    border:     'border-purple-500/20',
    headline:   'Leading the frontier.',
    body:       'Vantara is not a salon directory. It is the platform leading Africa\'s beauty and grooming industry into the digital age — with AI, real-time data, and tools no local market has seen before.',
  },
]

const VALUES = [
  {
    icon:       Shield,
    name:       'Trust',
    color:      'text-blue-400',
    bg:         'bg-blue-500/10',
    border:     'border-blue-500/20',
    body:       'Verified businesses and authentic reviews. Every badge is earned through a manual review process. Customers can book with confidence because we never let a business fake their way in.',
  },
  {
    icon:       Star,
    name:       'Excellence',
    color:      'text-gold',
    bg:         'bg-gold/10',
    border:     'border-gold/20',
    body:       'We exist to promote the highest quality professionals. Our ranking system rewards skill, consistency, and genuine customer satisfaction — not paid placement.',
  },
  {
    icon:       Lightbulb,
    name:       'Innovation',
    color:      'text-purple-400',
    bg:         'bg-purple-500/10',
    border:     'border-purple-500/20',
    body:       'Using technology to simplify beauty and grooming for Africa. Style Match AI trained on African features. M-Pesa-native payments. Real-time availability. Built for this continent, not adapted from somewhere else.',
  },
  {
    icon:       TrendingUp,
    name:       'Empowerment',
    color:      'text-emerald-400',
    bg:         'bg-emerald-500/10',
    border:     'border-emerald-500/20',
    body:       'Helping businesses grow and customers thrive. An independent barber in Kampala should have access to the same tools as a chain salon in Nairobi. Vantara closes that gap.',
  },
  {
    icon:       Users,
    name:       'Community',
    color:      'text-rose-400',
    bg:         'bg-rose-500/10',
    border:     'border-rose-500/20',
    body:       'Connecting people through confidence and self-expression. Every review is a gift to the next customer. Every referral builds someone\'s livelihood. Beauty has always been communal in Africa — Vantara honours that.',
  },
]

const MILESTONES = [
  { year: '2024', event: 'Vantara is founded in Nairobi, Kenya' },
  { year: '2025', event: 'First 1,000 businesses listed across East Africa' },
  { year: '2025', event: 'Beauty Passport loyalty programme launched' },
  { year: '2026', event: 'Expanded to Nigeria and Ghana. 12,000+ professionals on platform' },
  { year: '2026', event: 'Style Match AI Beta launched — AI trained on African features' },
  { year: '→ 2030', event: 'Vision: Africa\'s leading beauty and grooming ecosystem' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden text-text-primary">
      <NavbarSection />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" aria-label="About Vantara hero">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 70%)' }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold mb-6 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            Our Story
          </p>
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold leading-tight mb-6">
            The Meaning Behind{' '}
            <span className="gold-text">Vantara</span>
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed">
            A name built from three ideas that define everything we do —
            and everything we are building for this continent.
          </p>
        </div>
      </section>

      {/* ── Name Etymology ────────────────────────────────────────────────── */}
      <section id="name" className="py-16 px-4 border-t border-border" aria-labelledby="name-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="name-heading" className="sr-only">The meaning of Vantara</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {NAME_PILLARS.map((p, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${p.border} ${p.bg}`}
              >
                <div className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center mb-4`}>
                  <p.icon size={20} className={p.color} aria-hidden="true" />
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${p.color}`}>
                  {p.keyword}
                </div>
                <h3 className="font-playfair text-xl font-bold text-text-primary mb-3">
                  {p.headline}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <blockquote
            className="mt-10 text-center"
            style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: '2.5rem' }}
          >
            <p className="font-playfair text-2xl sm:text-3xl text-text-primary italic leading-relaxed max-w-2xl mx-auto">
              &ldquo;Vantara represents a future where confidence, beauty,
              and technology come together.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Brand Story ───────────────────────────────────────────────────── */}
      <section id="story" className="py-16 px-4 border-t border-border" aria-labelledby="story-heading">
        <div className="max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold mb-6 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            The Brand Story
          </p>
          <h2
            id="story-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-8"
          >
            Why We Built This
          </h2>

          <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
            <p>
              Across Africa, millions of talented barbers, stylists, makeup artists, nail technicians,
              and beauty professionals transform lives every day.
            </p>
            <p className="font-semibold text-text-primary">
              Yet many remain undiscovered — while customers struggle to find trusted professionals nearby.
            </p>
            <p>
              Vantara was created to bridge that gap. We are building Africa&apos;s beauty and grooming
              marketplace — a platform where customers can discover, book, review, and experience
              exceptional beauty services, while businesses gain the tools and visibility they need to grow.
            </p>
            <p>Our mission is simple:</p>
            <blockquote
              className="border-l-4 pl-6 py-2"
              style={{ borderColor: 'rgba(201,168,76,0.5)' }}
            >
              <p className="font-playfair text-xl sm:text-2xl font-bold text-text-primary">
                To make quality beauty and grooming services accessible, trusted,
                and rewarding for everyone.
              </p>
            </blockquote>
            <p>
              Through technology, transparency, and community, Vantara empowers beauty professionals
              and helps customers look their best, feel their best, and live with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-border" aria-labelledby="mission-heading">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <div
              className="rounded-2xl p-8"
              style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(17,17,17,0.9))', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">Mission Statement</div>
              <h2
                id="mission-heading"
                className="font-playfair text-2xl font-bold text-text-primary mb-4"
              >
                What We Do
              </h2>
              <p className="text-text-secondary leading-relaxed">
                To connect Africa with trusted beauty and grooming experiences through technology.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ background: 'linear-gradient(135deg, rgba(91,42,134,0.1), rgba(17,17,17,0.9))', border: '1px solid rgba(91,42,134,0.2)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">Vision Statement</div>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-4">
                Where We Are Going
              </h2>
              <p className="text-text-secondary leading-relaxed">
                To become Africa&apos;s leading beauty and grooming ecosystem, empowering millions of
                professionals and customers through innovation, trust, and opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-border" aria-labelledby="values-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              What We Stand For
            </div>
            <h2
              id="values-heading"
              className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary"
            >
              Core Values
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${v.border} ${v.bg}`}
              >
                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center mb-4">
                  <v.icon size={20} className={v.color} aria-hidden="true" />
                </div>
                <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${v.color}`}>{v.name}</div>
                <p className="text-sm text-text-secondary leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-border" aria-labelledby="timeline-heading">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2
              id="timeline-heading"
              className="font-playfair text-3xl font-bold text-text-primary"
            >
              Our Journey
            </h2>
          </div>
          <ol className="relative space-y-6" aria-label="Vantara timeline">
            {MILESTONES.map((m, i) => (
              <li key={i} className="flex gap-5 items-start group">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${i === MILESTONES.length - 1 ? 'bg-purple-400 animate-pulse' : 'bg-gold'}`}
                  />
                  {i < MILESTONES.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ background: 'rgba(201,168,76,0.2)', minHeight: '2rem' }} />
                  )}
                </div>
                <div className="pb-4">
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${i === MILESTONES.length - 1 ? 'text-purple-400' : 'text-gold'}`}>
                    {m.year}
                  </div>
                  <p className={`text-sm leading-relaxed ${i === MILESTONES.length - 1 ? 'text-text-muted italic' : 'text-text-secondary'}`}>
                    {m.event}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 border-t border-border text-center" aria-label="About page call to action">
        <div className="max-w-xl mx-auto">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Be Part of the Story
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Whether you are a customer looking for your next great experience or a professional ready
            to be discovered — your chapter in Africa&apos;s beauty story starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-gold rounded-xl px-6 py-3 text-sm font-semibold inline-flex items-center gap-2 justify-center">
              Create Free Account
              <ArrowRight size={16} />
            </Link>
            <Link href="/register?role=business" className="btn-outline-gold rounded-xl px-6 py-3 text-sm font-semibold inline-flex items-center justify-center">
              List Your Business
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  )
}
