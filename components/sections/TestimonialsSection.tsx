import Image from 'next/image'
import { Star } from 'lucide-react'

interface Testimonial {
  name:   string
  role:   string
  city:   string
  avatar: string
  text:   string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    name:   'Amara Okonkwo',
    role:   'Regular Customer',
    city:   'Nairobi',
    avatar: '/placeholder-avatar.svg',
    text:   'Vantara changed how I find beauty services. I found my go-to braider in Karen after 3 years of searching. The verified badge actually means something.',
    rating: 5,
  },
  {
    name:   'Daniel Ssali',
    role:   'Customer',
    city:   'Kampala',
    avatar: '/placeholder-avatar.svg',
    text:   'Booked a premium fade in 30 seconds, paid with M-Pesa, walked in and walked out looking sharp. This is how it should be done.',
    rating: 5,
  },
  {
    name:   'Fatima Mwakio',
    role:   'Salon Owner',
    city:   'Dar es Salaam',
    avatar: '/placeholder-avatar.svg',
    text:   'My bookings doubled in the first two months after listing on Vantara. The dashboard gives me full control. Worth every shilling.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 border-t border-border" aria-labelledby="testimonials-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          >
            Loved Across Africa
          </h2>
          <p className="text-text-secondary">From Nairobi to Kampala, real people, real results</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="glass-card rounded-2xl p-6">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-text-secondary text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div>
                  <div className="text-sm font-medium text-text-primary">{t.name}</div>
                  <div className="text-xs text-text-muted">{t.role} · {t.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
