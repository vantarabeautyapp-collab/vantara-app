import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Plan {
  name:        string
  price:       string
  period:      string
  description: string
  features:    string[]
  cta:         string
  highlight:   boolean
}

const PLANS: Plan[] = [
  {
    name:        'Free',
    price:       'KSh 0',
    period:      '/month',
    description: 'Perfect for getting started',
    features:    [
      'Basic profile listing',
      'Up to 20 bookings/month',
      'Customer reviews',
      'M-Pesa payments',
    ],
    cta:       'Get Started Free',
    highlight: false,
  },
  {
    name:        'Premium',
    price:       'KSh 4,999',
    period:      '/month',
    description: 'For growing businesses',
    features:    [
      'Everything in Free',
      'Featured placement',
      'Unlimited bookings',
      'Analytics dashboard',
      'Staff management',
      'Promotions tool',
      'Premium badge',
    ],
    cta:       'Go Premium',
    highlight: true,
  },
  {
    name:        'Elite',
    price:       'KSh 9,999',
    period:      '/month',
    description: 'For established brands',
    features:    [
      'Everything in Premium',
      'Priority ranking #1',
      'Elite verification badge',
      'Dedicated account manager',
      'Custom promotions',
      'API access',
      'Multi-branch support',
    ],
    cta:       'Go Elite',
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 border-t border-border relative overflow-hidden" aria-labelledby="pricing-heading">
      <div className="absolute inset-0 pattern-kente pointer-events-none" aria-hidden="true" />
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <h2
            id="pricing-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-secondary">Start free, scale as you grow</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={cn(
                'rounded-2xl p-6 flex flex-col relative',
                plan.highlight
                  ? 'glass-card-gold border border-gold/30'
                  : 'glass-card border border-border'
              )}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-black"
                  style={{ background: 'linear-gradient(135deg, #A64B2A, #E07A2D)' }}
                  aria-label="Most Popular plan"
                >
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className={cn('text-sm font-semibold mb-1', plan.highlight ? 'text-gold' : 'text-text-secondary')}>
                  {plan.name}
                </div>
                <div className="flex items-end gap-1">
                  <span className="font-playfair text-3xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-muted text-sm mb-1">{plan.period}</span>
                </div>
                <div className="text-xs text-text-muted mt-1">{plan.description}</div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6" aria-label={`${plan.name} plan features`}>
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                    <CheckCircle
                      size={14}
                      className={cn('mt-0.5 shrink-0', plan.highlight ? 'text-gold' : 'text-emerald-light')}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/register?role=business"
                className={cn(
                  'text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                  plan.highlight ? 'btn-gold' : 'btn-outline-gold'
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
