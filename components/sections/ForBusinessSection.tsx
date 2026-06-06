import Link from 'next/link'
import { TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PERKS = [
  'Free listing with premium upgrade options',
  'Real-time booking calendar & notifications',
  'Analytics dashboard with revenue insights',
  'Staff management & scheduling tools',
  'Promotional tools & loyalty programs',
]

const STATS = [
  { label: 'Monthly Bookings', value: '+127%',      sub: 'after joining Vantara',         color: 'text-gold'          },
  { label: 'New Customers',    value: '68%',         sub: 'of bookings are new clients',   color: 'text-emerald-light' },
  { label: 'Revenue Growth',   value: '+KSh 48K',   sub: 'average monthly increase',      color: 'text-purple-400'   },
]

export function ForBusinessSection() {
  return (
    <section id="business" className="py-20 px-4 border-t border-border" aria-labelledby="business-heading">
      <div className="max-w-5xl mx-auto">
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
                Grow Your Beauty Business
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                List your salon or barbershop and reach thousands of new customers in your area. Get verified,
                build your brand, and manage everything from one dashboard.
              </p>

              <ul className="space-y-3 mb-8" aria-label="Business benefits">
                {PERKS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle size={16} className="text-emerald-light mt-0.5 shrink-0" aria-hidden="true" />
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
                <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <div className={cn('font-playfair text-2xl font-bold', stat.color)} aria-label={stat.value}>
                    {stat.value}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary">{stat.label}</div>
                    <div className="text-xs text-text-muted">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
