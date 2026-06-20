import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CITIES = [
  { flag: '🇰🇪', name: 'Nairobi'       },
  { flag: '🇺🇬', name: 'Kampala'       },
  { flag: '🇹🇿', name: 'Dar es Salaam' },
  { flag: '🇳🇬', name: 'Lagos'         },
  { flag: '🇬🇭', name: 'Accra'         },
]

export function CTASection() {
  return (
    <section className="py-24 px-4 border-t border-border relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Background treatment */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 pattern-adinkra" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(166,75,42,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(166,75,42,0.5), rgba(212,162,76,0.35), transparent)' }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative">

        {/* Manifesto-style eyebrow */}
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold mb-8 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
          Africa&apos;s Beauty Movement
        </p>

        <h2
          id="cta-heading"
          className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
        >
          The Future of African Beauty{' '}
          <span className="gold-text">Is Being Written Now.</span>
        </h2>

        <p className="text-text-secondary text-lg mb-4 max-w-xl mx-auto leading-relaxed">
          Across five countries, thousands of beauty professionals and customers are building
          Africa&apos;s most trusted beauty marketplace together.
        </p>
        <p className="text-text-muted text-base mb-10 max-w-lg mx-auto">
          Through technology, transparency, and community — we are making quality beauty
          accessible, trusted, and rewarding for everyone.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/register"
            className="btn-gold rounded-xl px-8 py-4 text-base font-semibold inline-flex items-center justify-center gap-2"
          >
            Join the Movement
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/register?role=business"
            className="btn-outline-gold rounded-xl px-8 py-4 text-base font-semibold inline-flex items-center justify-center"
          >
            List Your Business Free
          </Link>
        </div>

        {/* Cities */}
        <div className="flex flex-wrap justify-center gap-3 mb-6" aria-label="Cities where Vantara is live">
          {CITIES.map(city => (
            <span
              key={city.name}
              className="inline-flex items-center gap-1.5 text-xs text-text-muted px-3 py-1.5 rounded-full border border-border"
            >
              <span aria-hidden="true">{city.flag}</span>
              {city.name}
            </span>
          ))}
        </div>

        <p className="text-xs text-text-muted">
          Free to join · No credit card required · Cancel or remove your listing anytime
        </p>
      </div>
    </section>
  )
}
