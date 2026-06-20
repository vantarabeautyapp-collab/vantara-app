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
    title:       'Discover',
    description: 'Search by service, location, or professional name. Filter by rating, price, and availability.',
    icon:        Search,
    color:       'text-gold',
    bg:          'bg-gold/10',
  },
  {
    step:        '02',
    title:       'Book in Seconds',
    description: 'View real-time availability, choose your stylist, and confirm your booking in under 60 seconds.',
    icon:        Clock,
    color:       'text-emerald-light',
    bg:          'bg-emerald-brand/10',
  },
  {
    step:        '03',
    title:       'Glow Up',
    description: "Arrive, get served, pay securely, and earn loyalty points. Leave a review to help the community.",
    icon:        Sparkles,
    color:       'text-emerald-light',
    bg:          'bg-emerald-brand/10',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 border-t border-border" aria-labelledby="how-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            Simple as 1-2-3
          </div>
          <h2
            id="how-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary"
          >
            Book in Under 60 Seconds
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
