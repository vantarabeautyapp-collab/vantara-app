import Image from 'next/image'
import Link from 'next/link'

const GALLERY = [
  {
    src:     '/images/stitch/barber.jpg',
    alt:     'Master barber at work in a Lagos barbershop',
    label:   'The Cut',
    sub:     'Barbershops',
    href:    '/search?category=barbershop',
    accent:  '#A64B2A',
  },
  {
    src:     '/images/stitch/braiding.jpg',
    alt:     'Stylist braiding hair in an Accra salon',
    label:   'The Braid',
    sub:     'Hair & Braiding',
    href:    '/search?category=braiding',
    accent:  '#556B2F',
  },
  {
    src:     '/images/stitch/skincare.jpg',
    alt:     'Skincare treatment in a Nairobi luxury spa',
    label:   'The Ritual',
    sub:     'Skincare & Wellness',
    href:    '/search?category=skincare',
    accent:  '#D4A24C',
  },
]

export function GallerySection() {
  return (
    <section className="py-16 px-4 border-t border-border" aria-label="African beauty editorial">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-terracotta mb-3">Visual Stories</p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary">
            The Artistry Behind Every Booking
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            From Lagos to Nairobi, Africa&apos;s beauty professionals are world-class. These are their stories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {GALLERY.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={`Explore ${item.sub}`}
              className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden block"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(18,13,8,0.85) 100%)' }}
              />
              {/* Accent border on hover */}
              <div
                className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 transition-all duration-300"
                style={{ '--tw-ring-color': item.accent } as React.CSSProperties}
              />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: item.accent }}>
                  {item.sub}
                </p>
                <h3 className="font-playfair text-2xl font-bold text-white leading-tight">
                  {item.label}
                </h3>
                <p className="text-white/60 text-xs mt-2 group-hover:text-white/90 transition-colors duration-200 flex items-center gap-1">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
