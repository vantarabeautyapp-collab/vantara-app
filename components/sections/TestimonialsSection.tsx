import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

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
    name:   'Kezia Wambua',
    role:   'Regular Customer',
    city:   'Nairobi',
    avatar: '/placeholder-avatar.svg',
    text:   'I spent three years searching for a braider who truly understood natural Kenyan hair. Vantara matched me in ten minutes. That is not just an app — that is someone understanding what African women actually need.',
    rating: 5,
  },
  {
    name:   'Daniel Ssali',
    role:   'Customer',
    city:   'Kampala',
    avatar: '/placeholder-avatar.svg',
    text:   'Booked a premium fade in 30 seconds, paid with M-Pesa, walked in and walked out looking sharp. No calls, no guessing if they are open. This is exactly how it should work.',
    rating: 5,
  },
  {
    name:   'Fatima Mwakio',
    role:   'Salon Owner',
    city:   'Dar es Salaam',
    avatar: '/placeholder-avatar.svg',
    text:   'My bookings doubled in the first two months after listing on Vantara. The dashboard puts everything I need in one place. I finally feel like my business has the tools to compete properly.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 border-t border-border relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 pattern-maasai pointer-events-none" aria-hidden="true" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            Real Stories
          </div>
          <h2
            id="testimonials-heading"
            className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-3"
          >
            Loved Across Africa
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            From Nairobi to Kampala to Dar es Salaam — the platform is working for real people.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="glass-card rounded-2xl p-6 flex flex-col">
              {/* Quote icon */}
              <Quote size={20} className="text-gold/40 mb-4 shrink-0" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={13} className="text-gold fill-gold" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-gold bg-gold/10 border border-gold/20 shrink-0"
                  aria-label={`${t.name}'s avatar`}
                >
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{t.name}</div>
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
