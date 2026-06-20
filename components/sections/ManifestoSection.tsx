import Link from 'next/link'
import { Shield, Star, Lightbulb, TrendingUp, Users } from 'lucide-react'

const VALUES = [
  {
    icon:        Shield,
    name:        'Trust',
    description: 'Every business is manually reviewed. Verified badges are earned, not bought.',
    color:       'text-terracotta-light',
    bg:          'bg-terracotta/10',
    border:      'border-terracotta/20',
  },
  {
    icon:        Star,
    name:        'Excellence',
    description: 'We promote only the highest quality professionals — ranked by real outcomes.',
    color:       'text-gold',
    bg:          'bg-gold/10',
    border:      'border-gold/20',
  },
  {
    icon:        Lightbulb,
    name:        'Innovation',
    description: 'AI recommendations, real-time availability, M-Pesa payments — technology that actually fits Africa.',
    color:       'text-sunset',
    bg:          'bg-sunset/10',
    border:      'border-sunset/20',
  },
  {
    icon:        TrendingUp,
    name:        'Empowerment',
    description: 'We give independent professionals the tools, visibility, and community to grow — on their own terms.',
    color:       'text-emerald-light',
    bg:          'bg-emerald-brand/10',
    border:      'border-emerald-brand/20',
  },
  {
    icon:        Users,
    name:        'Community',
    description: 'Every booking is a connection. Every review builds the next professional\'s reputation.',
    color:       'text-gold-light',
    bg:          'bg-gold/10',
    border:      'border-gold/20',
  },
]

const IMPACT = [
  { value: '1.4B',   label: 'People on the continent',         sub: 'Our entire addressable opportunity' },
  { value: '$57B',   label: 'African beauty market by 2030',   sub: 'The industry we are digitising'     },
  { value: '54',     label: 'Countries in Africa',             sub: 'One platform to serve them all'     },
]

export function ManifestoSection() {
  return (
    <section
      className="relative py-24 px-4 border-t border-border overflow-hidden"
      aria-labelledby="manifesto-heading"
    >
      {/* Background — kente geometric overlay + warm earth glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Kente pattern — section identity */}
        <div className="absolute inset-0 pattern-kente" />
        {/* Top divider line — warm gold */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(166,75,42,0.5), rgba(212,162,76,0.4), transparent)' }}
        />
        {/* Terracotta ambient glow — left */}
        <div
          className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, rgba(166,75,42,0.8), transparent)' }}
        />
        {/* Sunset accent — right */}
        <div
          className="absolute right-1/4 bottom-1/3 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(224,122,45,0.7), transparent)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">

        {/* ── Manifesto Quote ────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold mb-10 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            The Vantara Story
          </p>

          <div
            className="relative mx-auto max-w-3xl mb-8"
            style={{ borderLeft: '3px solid rgba(166,75,42,0.55)', paddingLeft: '2rem' }}
          >
            <blockquote>
              <p
                id="manifesto-heading"
                className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4"
              >
                &ldquo;Across Africa, there is no shortage of talent.
                <br />
                <span className="gold-text">There was a shortage of the right platform.</span>&rdquo;
              </p>
              <footer className="text-sm text-text-muted mt-4">
                <cite>— The founding belief behind Vantara</cite>
              </footer>
            </blockquote>
          </div>

          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            Africa is home to some of the most skilled barbers, braiders, makeup artists, and skincare
            specialists in the world. Their craft is passed down through generations, refined in vibrant
            cities from Lagos to Nairobi — yet most remained hidden from the clients who needed them.
          </p>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Vantara exists to change that. We built the platform Africa&apos;s beauty industry
            deserves — one that honours the artisan, empowers the client, and puts African excellence
            at the centre of every experience.
          </p>

          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-gold border border-gold/30 px-5 py-2.5 rounded-xl hover:bg-gold/5 transition-all duration-200"
            >
              Read Our Full Story
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* ── Continent Scale ────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-3 gap-6 mb-20 rounded-2xl p-6 sm:p-8"
          style={{ background: 'linear-gradient(135deg, rgba(166,75,42,0.08), rgba(212,162,76,0.04), rgba(18,13,8,0.9))', border: '1px solid rgba(166,75,42,0.2)' }}
        >
          {IMPACT.map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-playfair text-3xl sm:text-4xl font-bold gold-text mb-1">{item.value}</div>
              <div className="text-sm font-medium text-text-primary">{item.label}</div>
              <div className="text-xs text-text-muted mt-0.5 hidden sm:block">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Values ─────────────────────────────────────────────────────── */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-block text-xs font-semibold tracking-wider uppercase text-gold mb-3 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
              What We Stand For
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-text-primary">
              Five Values. One Platform.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border ${v.border} ${v.bg} flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200`}
              >
                <div className={`w-9 h-9 rounded-xl glass-card flex items-center justify-center shrink-0`}>
                  <v.icon size={18} className={v.color} aria-hidden="true" />
                </div>
                <div>
                  <div className={`text-sm font-bold mb-1 ${v.color}`}>{v.name}</div>
                  <p className="text-xs text-text-muted leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
