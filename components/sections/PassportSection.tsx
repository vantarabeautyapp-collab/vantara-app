import Link from 'next/link'
import { Crown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoIcon } from '@/components/Logo'

const TIERS = [
  { name: 'Bronze',   symbol: '●', colorClass: 'border-amber-600 text-amber-600 bg-amber-600/10' },
  { name: 'Silver',   symbol: '◆', colorClass: 'border-slate-400 text-slate-400 bg-slate-400/10'  },
  { name: 'Gold',     symbol: '★', colorClass: 'border-gold text-gold bg-gold/10'                  },
  { name: 'Platinum', symbol: '♛', colorClass: 'border-purple-400 text-purple-400 bg-purple-400/10' },
]

export function PassportSection() {
  return (
    <section className="py-20 px-4 border-t border-border" aria-labelledby="passport-heading">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card-gold rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10">

            {/* Left — copy */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Crown size={20} className="text-gold" aria-hidden="true" />
                <span className="text-gold text-sm font-semibold uppercase tracking-wider">Beauty Passport</span>
              </div>
              <h2
                id="passport-heading"
                className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              >
                Your Beauty Journey, Rewarded
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                Every booking, review, and referral earns Beauty Points. Level up from Bronze to Platinum
                and unlock exclusive discounts, free services, and VIP access — because loyalty should mean something.
              </p>

              {/* Tier badges */}
              <div className="flex flex-wrap gap-3 mb-8" aria-label="Loyalty tiers">
                {TIERS.map(tier => (
                  <div key={tier.name} className="flex flex-col items-center gap-1">
                    <div className={cn('w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold', tier.colorClass)}>
                      {tier.symbol}
                    </div>
                    <span className="text-xs text-text-muted">{tier.name}</span>
                  </div>
                ))}
              </div>

              <Link href="/register" className="btn-gold inline-flex items-center gap-2 rounded-xl text-sm px-6 py-3">
                Start Earning Points
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Right — sample passport card */}
            <div className="w-full lg:w-72 shrink-0">
              <div
                className="rounded-2xl p-6 text-white relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1A1A0A 0%, #2A2210 40%, #1A1505 100%)',
                  border: '1px solid rgba(201,168,76,0.3)',
                }}
                aria-label="Sample Beauty Passport card — Silver tier, 2,450 points"
              >
                {/* Card glow */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, #C9A84C, transparent)', transform: 'translate(30%, -30%)' }}
                />

                <div className="relative">
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <LogoIcon size={20} />
                      <span className="text-xs font-bold tracking-widest uppercase text-gold">Vantara</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30 font-semibold">
                      Silver
                    </span>
                  </div>

                  {/* Points */}
                  <div className="mb-6">
                    <div className="text-3xl font-bold font-playfair gold-text">2,450</div>
                    <div className="text-xs text-text-muted mt-0.5">Beauty Points</div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-text-muted mb-1.5">
                      <span>Silver → Gold</span>
                      <span>2,450 / 5,000</span>
                    </div>
                    <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden" role="progressbar" aria-valuenow={49} aria-valuemin={0} aria-valuemax={100}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: '49%', background: 'linear-gradient(90deg, #C9A84C, #E8C97D)' }}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-text-muted">Your Name · Member since 2026</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
