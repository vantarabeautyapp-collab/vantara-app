import { Shield, Sparkles, Crown, Zap, TrendingUp, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon:      LucideIcon
  title:     string
  description: string
  bg:        string
  border:    string
  iconColor: string
  tag:       string
}

const FEATURES: Feature[] = [
  {
    icon:        Shield,
    title:       'Vantara Verified',
    description: 'Every business is manually reviewed before getting a Verified badge. Customers always know exactly who they are booking with.',
    bg:          'linear-gradient(135deg, rgba(166,75,42,0.14) 0%, rgba(28,18,8,0.85) 100%)',
    border:      'rgba(166,75,42,0.3)',
    iconColor:   '#C56A3D',
    tag:         'Trust',
  },
  {
    icon:        Sparkles,
    title:       'Style Match AI',
    description: 'Upload your photo and get AI-powered recommendations for haircuts, hairstyles, and beard styles tailored to your face shape.',
    bg:          'linear-gradient(135deg, rgba(85,107,47,0.14) 0%, rgba(28,18,8,0.85) 100%)',
    border:      'rgba(85,107,47,0.3)',
    iconColor:   '#6E8A3A',
    tag:         'Innovation',
  },
  {
    icon:        Crown,
    title:       'Beauty Passport',
    description: 'Earn points on every booking, review, and referral. Level up from Bronze to Platinum and unlock discounts, free services, and VIP access.',
    bg:          'linear-gradient(135deg, rgba(212,162,76,0.14) 0%, rgba(28,18,8,0.85) 100%)',
    border:      'rgba(212,162,76,0.3)',
    iconColor:   '#D4A24C',
    tag:         'Community',
  },
  {
    icon:        Zap,
    title:       'Nearby Now',
    description: 'See which salons and barbers are open right now, their real-time wait times, and who has availability today.',
    bg:          'linear-gradient(135deg, rgba(85,107,47,0.12) 0%, rgba(28,18,8,0.85) 100%)',
    border:      'rgba(85,107,47,0.25)',
    iconColor:   '#556B2F',
    tag:         'Excellence',
  },
  {
    icon:        TrendingUp,
    title:       'Business Growth Suite',
    description: 'Analytics, booking calendars, staff management, and promotion tools — everything an independent beauty business needs to compete and win.',
    bg:          'linear-gradient(135deg, rgba(224,122,45,0.14) 0%, rgba(28,18,8,0.85) 100%)',
    border:      'rgba(224,122,45,0.3)',
    iconColor:   '#E07A2D',
    tag:         'Empowerment',
  },
  {
    icon:        Star,
    title:       'Authentic Rankings',
    description: 'Rankings powered by verified reviews, repeat visits, service quality, and response times — not paid placements.',
    bg:          'linear-gradient(135deg, rgba(166,75,42,0.11) 0%, rgba(28,18,8,0.85) 100%)',
    border:      'rgba(166,75,42,0.22)',
    iconColor:   '#A64B2A',
    tag:         'Trust',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 border-t border-border" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-3">Platform Features</p>
          <h2
            id="features-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          >
            Technology Built for Africa
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Every feature was designed around Africa&apos;s beauty culture — from M-Pesa and mobile-first payments
            to AI trained on African hair types and skin tones.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="group rounded-2xl p-6 transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5"
              style={{
                background: feature.bg,
                border: `1px solid ${feature.border}`,
              }}
            >
              <div className="absolute top-4 right-4 text-xs font-semibold tracking-wider uppercase text-text-muted opacity-50">
                {feature.tag}
              </div>

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(28,18,8,0.6)', border: `1px solid ${feature.border}` }}
              >
                <feature.icon size={20} style={{ color: feature.iconColor }} aria-hidden="true" />
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
