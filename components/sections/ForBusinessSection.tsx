import Link from 'next/link'
import { TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PERKS = [
  'Free listing — get discovered today at no cost',
  'Real-time booking calendar with instant notifications',
  'Analytics dashboard: revenue, bookings, and customer insights',
  'Staff management, scheduling, and service menus',
  'Built-in promotions, loyalty programs, and happy hour tools',
  'Verified badge — customers trust your business more',
]

const STATS = [
  { label: 'More Bookings',     value: '+127%',    sub: 'average increase after joining Vantara',  color: 'text-gold'          },
  { label: 'New Customers',     value: '68%',       sub: 'of each business\'s bookings are new clients', color: 'text-emerald-light' },
  { label: 'Revenue Growth',    value: '+KSh 48K', sub: 'average monthly increase per business',   color: 'text-terracotta-light' },
]

export function ForBusinessSection() {
  return (
    <section id="business" className="py-20 px-4 border-t border-border relative overflow-hidden" aria-labelledby="business-heading">
      <div className="absolute inset-0 pattern-ndebele pointer-events-none" aria-hidden="true" />
      <div className="max-w-5xl mx-auto relative">
        <div className="glass-card-emerald rounded-3xl p-8 sm:p-12">
          <div className="grid sm:grid-cols-2 gap-10 items-center">

            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-light mb-4 px-3 py-1 rounded-full border border-emerald-brand/30 bg-emerald-brand/10">
                <TrendingUp size={12} aria-hidden="true" />
                For Business Owners
              </div>
              <h2
                id="business-heading"
                className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4"
              >
                Lead Africa&apos;s Beauty Revolution
              </h2>
              <p className="text-text-secondary mb-3 leading-relaxed">
                Africa&apos;s beauty and grooming industry is transforming — and the businesses that build
                their digital presence now will be the ones that lead it.
              </p>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Vantara gives independent professionals and growing businesses the visibility, tools,
                and community to compete — and win — in their city and beyond.
              </p>

              <ul className="space-y-3 mb-8" aria-label="Business benefits">
                {PERKS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle size={15} className="text-emerald-light mt-0.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register?role=business"
                  className="btn-gold rounded-xl text-sm px-6 py-3 inline-flex items-center gap-2"
                >
                  List Your Business Free
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="#pricing" className="btn-ghost rounded-xl text-sm px-4 py-3">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Right — stats */}
            <div className="space-y-3" aria-label="Vantara business results">
              {STATS.map((stat, i) => (
                <div key={i} className="glass-card rounded-xl p-5 flex items-center gap-4">
                  <div className={cn('font-playfair text-3xl font-bold shrink-0', stat.color)} aria-label={stat.value}>
                    {stat.value}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{stat.label}</div>
                    <div className="text-xs text-text-muted mt-0.5">{stat.sub}</div>
                  </div>
                </div>
              ))}

              {/* Trust line */}
              <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(166,75,42,0.06)', border: '1px solid rgba(166,75,42,0.18)' }}>
                <p className="text-xs text-text-muted leading-relaxed">
                  &ldquo;Joining Vantara was the single best business decision I made this year.&rdquo;
                </p>
                <p className="text-xs text-gold mt-1 font-medium">— Fatima M., Salon Owner, Dar es Salaam</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
