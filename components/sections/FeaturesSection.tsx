import { Shield, Sparkles, Crown, Zap, TrendingUp, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon:        LucideIcon
  title:       string
  description: string
  gradient:    string
  iconColor:   string
  tag:         string
}

const FEATURES: Feature[] = [
  {
    icon:        Shield,
    title:       'Vantara Verified',
    description: 'Every business is manually reviewed before getting a Verified badge. Customers always know exactly who they are booking with.',
    gradient:    'from-blue-500/20 to-blue-800/10',
    iconColor:   'text-blue-400',
    tag:         'Trust',
  },
  {
    icon:        Sparkles,
    title:       'Style Match AI',
    description: 'Upload your photo and get AI-powered recommendations for haircuts, hairstyles, and beard styles tailored to your face shape.',
    gradient:    'from-purple-500/20 to-purple-800/10',
    iconColor:   'text-purple-400',
    tag:         'Innovation',
  },
  {
    icon:        Crown,
    title:       'Beauty Passport',
    description: 'Earn points on every booking, review, and referral. Level up from Bronze to Platinum and unlock discounts, free services, and VIP access.',
    gradient:    'from-gold/20 to-gold-dim/10',
    iconColor:   'text-gold',
    tag:         'Community',
  },
  {
    icon:        Zap,
    title:       'Nearby Now',
    description: 'See which salons and barbers are open right now, their real-time wait times, and who has availability today.',
    gradient:    'from-emerald-600/20 to-emerald-800/10',
    iconColor:   'text-emerald-light',
    tag:         'Excellence',
  },
  {
    icon:        TrendingUp,
    title:       'Business Growth Suite',
    description: 'Analytics, booking calendars, staff management, and promotion tools — everything an independent beauty business needs to compete and win.',
    gradient:    'from-orange-500/20 to-orange-800/10',
    iconColor:   'text-orange-400',
    tag:         'Empowerment',
  },
  {
    icon:        Star,
    title:       'Authentic Rankings',
    description: 'Rankings powered by verified reviews, repeat visits, service quality, and response times — not paid placements.',
    gradient:    'from-rose-500/20 to-rose-800/10',
    iconColor:   'text-rose-400',
    tag:         'Trust',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 border-t border-border" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            Platform Features
          </div>
          <h2
            id="features-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          >
            Technology Built for Africa
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Every feature was designed around Africa's beauty culture — from M-Pesa and mobile-first payments
            to AI trained on African hair types and skin tones.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className={cn(
                'group rounded-2xl p-6 border border-border hover:border-white/10 transition-all duration-300 relative overflow-hidden',
                `bg-gradient-to-br ${feature.gradient}`
              )}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4 text-xs font-semibold tracking-wider uppercase text-text-muted opacity-60">
                {feature.tag}
              </div>

              <div className="w-11 h-11 rounded-xl glass-card flex items-center justify-center mb-4">
                <feature.icon size={20} className={feature.iconColor} aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
