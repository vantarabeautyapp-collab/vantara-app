import { Search, Clock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Step {
  step:        string
  title:       string
  description: string
  icon:        LucideIcon
  color:       string
  bg:          string
}

const HOW_IT_WORKS: Step[] = [
  {
    step:        '01',
    title:       'Discover Your Artisan',
    description: 'Search by service, city, or professional. Filter by ratings, specialties, and real-time availability — then read verified reviews from real clients.',
    icon:        Search,
    color:       'text-gold',
    bg:          'bg-gold/10',
  },
  {
    step:        '02',
    title:       'Book in Seconds',
    description: 'See live slots, pick your preferred stylist, and confirm your appointment in under 60 seconds. M-Pesa, card, or cash — your choice.',
    icon:        Clock,
    color:       'text-terracotta-light',
    bg:          'bg-terracotta/10',
  },
  {
    step:        '03',
    title:       'Arrive & Glow',
    description: 'Show up, experience the craft, pay securely. Every visit earns Beauty Points toward exclusive rewards and VIP access.',
    icon:        Sparkles,
    color:       'text-emerald-light',
    bg:          'bg-emerald-brand/10',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 border-t border-border relative overflow-hidden" aria-labelledby="how-heading">
      <div className="absolute inset-0 pattern-maasai pointer-events-none" aria-hidden="true" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-14">
          <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            How It Works
          </div>
          <h2
            id="how-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary"
          >
            From Discovery to Glow —
            <br />
            <span className="gold-text">In Three Steps</span>
          </h2>
        </div>

        <ol className="grid sm:grid-cols-3 gap-6" aria-label="How Vantara works">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={i} className="relative">
              {/* Connector line */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute top-8 left-full w-full h-px z-10"
                  style={{ background: 'linear-gradient(90deg, rgba(166,75,42,0.35), transparent)' }}
                />
              )}
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', step.bg)}>
                    <step.icon size={22} className={step.color} aria-hidden="true" />
                  </div>
                  <span className="font-playfair text-4xl font-bold text-border" aria-hidden="true">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-text-primary text-lg mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
