import Link from 'next/link'
import { Scissors, Sparkles, Star, Palette, Flower2, Eye, Crown, Heart } from 'lucide-react'

const SERVICE_CATEGORIES = [
  {
    id: 'barbershop',
    label: 'Barbershops',
    Icon: Scissors,
    count: '2,400+',
    accent: 'rgba(166,75,42,0.15)',
    border: 'rgba(166,75,42,0.3)',
    iconColor: '#C56A3D',
  },
  {
    id: 'salon',
    label: 'Hair Salons',
    Icon: Sparkles,
    count: '3,800+',
    accent: 'rgba(212,162,76,0.12)',
    border: 'rgba(212,162,76,0.25)',
    iconColor: '#D4A24C',
  },
  {
    id: 'nails',
    label: 'Nail Studios',
    Icon: Star,
    count: '1,200+',
    accent: 'rgba(224,122,45,0.12)',
    border: 'rgba(224,122,45,0.25)',
    iconColor: '#E07A2D',
  },
  {
    id: 'makeup',
    label: 'Makeup Artists',
    Icon: Palette,
    count: '890+',
    accent: 'rgba(166,75,42,0.12)',
    border: 'rgba(166,75,42,0.25)',
    iconColor: '#A64B2A',
  },
  {
    id: 'braiding',
    label: 'Braiding',
    Icon: Crown,
    count: '1,600+',
    accent: 'rgba(85,107,47,0.15)',
    border: 'rgba(85,107,47,0.3)',
    iconColor: '#6E8A3A',
  },
  {
    id: 'skincare',
    label: 'Skincare',
    Icon: Flower2,
    count: '740+',
    accent: 'rgba(212,162,76,0.1)',
    border: 'rgba(212,162,76,0.2)',
    iconColor: '#D4A24C',
  },
  {
    id: 'locs',
    label: 'Locs & Dreads',
    Icon: Eye,
    count: '620+',
    accent: 'rgba(166,75,42,0.1)',
    border: 'rgba(166,75,42,0.2)',
    iconColor: '#C56A3D',
  },
  {
    id: 'bridal',
    label: 'Bridal Makeup',
    Icon: Heart,
    count: '310+',
    accent: 'rgba(224,122,45,0.1)',
    border: 'rgba(224,122,45,0.2)',
    iconColor: '#E07A2D',
  },
]

export function CategoriesSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" aria-labelledby="categories-heading">
      <div className="absolute inset-0 pattern-kente opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative">

        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-3">Services</p>
          <h2
            id="categories-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            Every Beauty Service, One Platform
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            From quick fades to bridal transformations — discover professionals across every category.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {SERVICE_CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/search?category=${cat.id}`}
              aria-label={`Browse ${cat.label} — ${cat.count} professionals`}
              className="group relative overflow-hidden rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, ${cat.accent} 0%, rgba(28,18,8,0.8) 100%)`,
                borderColor: cat.border,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${cat.accent}`, border: `1px solid ${cat.border}` }}
              >
                <cat.Icon size={18} style={{ color: cat.iconColor }} aria-hidden="true" />
              </div>

              <div className="font-semibold text-sm text-text-primary group-hover:text-gold transition-colors leading-tight mb-1">
                {cat.label}
              </div>
              <div className="text-xs text-text-muted">{cat.count}</div>

              {/* Bottom glow on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.iconColor}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
