import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const SERVICE_CATEGORIES = [
  { id: 'barbershop', label: 'Barbershops',    icon: '✂️', count: '2,400+', color: 'from-amber-600/20 to-amber-800/10'   },
  { id: 'salon',      label: 'Hair Salons',    icon: '💇', count: '3,800+', color: 'from-rose-600/20 to-rose-800/10'     },
  { id: 'nails',      label: 'Nail Studios',   icon: '💅', count: '1,200+', color: 'from-pink-600/20 to-pink-800/10'     },
  { id: 'makeup',     label: 'Makeup Artists', icon: '💄', count: '890+',   color: 'from-purple-600/20 to-purple-800/10' },
  { id: 'braiding',   label: 'Braiding',       icon: '🪢', count: '1,600+', color: 'from-emerald-600/20 to-emerald-800/10' },
  { id: 'skincare',   label: 'Skincare',       icon: '✨', count: '740+',   color: 'from-sky-600/20 to-sky-800/10'       },
]

export function CategoriesSection() {
  return (
    <section className="py-20 px-4" aria-labelledby="categories-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="categories-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          >
            Every Beauty Service, One Platform
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            From quick fades to bridal transformations — discover professionals across every category.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SERVICE_CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              href={`/search?category=${cat.id}`}
              className={cn(
                'group relative overflow-hidden rounded-2xl p-6 border border-border',
                'hover:border-gold/30 transition-all duration-300',
                `bg-gradient-to-br ${cat.color}`
              )}
              aria-label={`Browse ${cat.label} — ${cat.count} professionals`}
            >
              <div className="text-3xl mb-3" aria-hidden="true">{cat.icon}</div>
              <div className="font-semibold text-text-primary group-hover:text-gold transition-colors">
                {cat.label}
              </div>
              <div className="text-xs text-text-muted mt-1">{cat.count} professionals</div>
              <ArrowRight
                size={16}
                className="absolute bottom-4 right-4 text-text-muted opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
