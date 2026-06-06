import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 px-4 border-t border-border" aria-labelledby="cta-heading">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="cta-heading"
          className="font-playfair text-4xl sm:text-5xl font-bold text-text-primary mb-4"
        >
          Ready to Find Your <span className="gold-text">Glow?</span>
        </h2>
        <p className="text-text-secondary text-lg mb-10">
          Join thousands of Africans already booking premium beauty services through Vantara.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="btn-gold rounded-xl px-8 py-4 text-base font-semibold inline-flex items-center justify-center gap-2"
          >
            Create Free Account
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/search"
            className="btn-outline-gold rounded-xl px-8 py-4 text-base font-semibold inline-flex items-center justify-center"
          >
            Browse Services
          </Link>
        </div>

        <p className="text-xs text-text-muted mt-6">
          No credit card required · Free to book · Cancel anytime
        </p>
      </div>
    </section>
  )
}
