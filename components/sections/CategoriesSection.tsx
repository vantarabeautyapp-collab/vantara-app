'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Scissors, Sparkles, Star, Palette, Flower2, Eye, Crown, Heart } from 'lucide-react'

const SERVICE_CATEGORIES = [
  {
    id:      'barbershop',
    label:   'Barbershops',
    Icon:    Scissors,
    count:   '2,400+',
    photo:   '/images/stitch/cat-barbershop.jpg',
    accent:  '#A64B2A',
    glow:    'rgba(166,75,42,0.6)',
  },
  {
    id:      'salon',
    label:   'Hair Salons',
    Icon:    Sparkles,
    count:   '3,800+',
    photo:   '/images/stitch/cat-salon.jpg',
    accent:  '#D4A24C',
    glow:    'rgba(212,162,76,0.55)',
  },
  {
    id:      'nails',
    label:   'Nail Studios',
    Icon:    Star,
    count:   '1,200+',
    photo:   '/images/stitch/nails.jpg',
    accent:  '#E07A2D',
    glow:    'rgba(224,122,45,0.55)',
  },
  {
    id:      'makeup',
    label:   'Makeup Artists',
    Icon:    Palette,
    count:   '890+',
    photo:   '/images/stitch/makeup.jpg',
    accent:  '#C56A3D',
    glow:    'rgba(197,106,61,0.55)',
  },
  {
    id:      'braiding',
    label:   'Braiding',
    Icon:    Crown,
    count:   '1,600+',
    photo:   '/images/stitch/braiding.jpg',
    accent:  '#6E8A3A',
    glow:    'rgba(110,138,58,0.5)',
  },
  {
    id:      'skincare',
    label:   'Skincare',
    Icon:    Flower2,
    count:   '740+',
    photo:   '/images/stitch/cat-skincare.jpg',
    accent:  '#D4A24C',
    glow:    'rgba(212,162,76,0.5)',
  },
  {
    id:      'locs',
    label:   'Locs & Dreads',
    Icon:    Eye,
    count:   '620+',
    photo:   '/images/stitch/locs.jpg',
    accent:  '#C56A3D',
    glow:    'rgba(197,106,61,0.5)',
  },
  {
    id:      'bridal',
    label:   'Bridal Makeup',
    Icon:    Heart,
    count:   '310+',
    photo:   '/images/stitch/cat-bridal.jpg',
    accent:  '#E07A2D',
    glow:    'rgba(224,122,45,0.5)',
  },
]

const containerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden:   { opacity: 0, y: 44, scale: 0.94 },
  visible:  { opacity: 1, y: 0,  scale: 1,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export function CategoriesSection() {
  const reduced = useReducedMotion()

  return (
    <section className="py-20 px-4 relative overflow-hidden border-t border-border" aria-labelledby="categories-heading">
      {/* Subtle kente pattern still present in bg */}
      <div className="absolute inset-0 pattern-kente pointer-events-none opacity-40" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-14"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-3">Curated Services</p>
          <h2
            id="categories-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4"
          >
            Every Art Form, One Platform
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto leading-relaxed">
            From razor-sharp fades to luminous bridal looks — every discipline of African beauty, curated and at your fingertips.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SERVICE_CATEGORIES.map(cat => (
            <motion.div key={cat.id} variants={cardVariants}>
              <Link
                href={`/search?category=${cat.id}`}
                aria-label={`Browse ${cat.label} — ${cat.count} professionals`}
                className="group relative overflow-hidden rounded-2xl block aspect-[4/5]"
              >
                {/* Photo background */}
                <Image
                  src={cat.photo}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />

                {/* Permanent gradient overlay for legibility */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(18,13,8,0.1) 0%, rgba(18,13,8,0.75) 70%, rgba(18,13,8,0.92) 100%)' }}
                />

                {/* Hover glow burst */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle at 50% 80%, ${cat.glow} 0%, transparent 65%)` }}
                />

                {/* Top-right icon badge */}
                <div
                  className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(18,13,8,0.65)', border: `1px solid ${cat.accent}55`, backdropFilter: 'blur(8px)' }}
                >
                  <cat.Icon size={14} style={{ color: cat.accent }} aria-hidden="true" />
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div
                    className="font-semibold text-sm text-white leading-tight mb-1 group-hover:translate-y-0 translate-y-0.5 transition-transform duration-300"
                  >
                    {cat.label}
                  </div>
                  <div
                    className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                    style={{ color: cat.accent }}
                  >
                    {cat.count} professionals →
                  </div>
                </div>

                {/* Bottom accent bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${cat.accent}, transparent)` }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
