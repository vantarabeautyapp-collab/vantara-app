import { Shield, Sparkles, Crown, Zap, TrendingUp, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon:      LucideIcon
  title:     string
  description: string
  gradient:  string
  iconColor: string
}

const FEATURES: Feature[] = [
  {
    icon:        Shield,
    title:       'Vantara Verified',
    description: 'Every business is manually verified. Look for Verified, Premium, and Elite badges.',
    gradient:    'from-blue-500/20 to-blue-800/10',
    iconColor:   'text-blue-400',
  },
  {
    icon:        Sparkles,
    title:       'Style Match AI',
    description: 'Upload your photo, get personalized haircut, hairstyle, and beard recommendations powered by AI.',
    gradient:    'from-purple-500/20 to-purple-800/10',
    iconColor:   'text-purple-400',
  },
  {
    icon:        Crown,
    title:       'Beauty Passport',
    description: 'Earn points on every booking. Unlock discounts, free services, and VIP status as you level up.',
    gradient:    'from-gold/20 to-gold-dim/10',
    iconColor:   'text-gold',
  },
  {
    icon:        Zap,
    title:       'Nearby Now',
    description: "See exactly which salons are open right now, their current wait times, and who's available.",
    gradient:    'from-emerald-600/20 to-emerald-800/10',
    iconColor:   'text-emerald-light',
  },
  {
    icon:        TrendingUp,
    title:       'Dynamic Deals',
    description: 'Happy hour discounts, last-minute slots, loyalty rewards — score great deals automatically.',
    gradient:    'from-orange-500/20 to-orange-800/10',
    iconColor:   'text-orange-400',
  },
  {
    icon:        Star,
    title:       'Beauty Rankings',
    description: 'Real rankings powered by reviews, repeat visits, service quality and response times.',
    gradient:    'from-rose-500/20 to-rose-800/10',
    iconColor:   'text-rose-400',
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
            Built Different
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Features designed for Africa — from M-Pesa payments to Swahili support, we built this for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className={cn(
                'group rounded-2xl p-6 border border-border hover:border-white/10 transition-all duration-300',
                `bg-gradient-to-br ${feature.gradient}`
              )}
            >
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
