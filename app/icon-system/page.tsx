/**
 * Vantara Icon System Showcase
 * Route: /icon-system
 *
 * Visual reference for all 34 proprietary Vantara icons.
 * Export-ready: copy SVG paths from VantaraIcons.tsx for Flutter / React Native.
 */

import { ICONS, type IconName } from '@/components/icons/VantaraIcons'

const CATEGORIES: { title: string; icons: IconName[] }[] = [
  {
    title: 'Navigation',
    icons: ['Home', 'Discover', 'Bookings', 'Rewards', 'Profile'],
  },
  {
    title: 'Discovery',
    icons: ['Nearby', 'Verified', 'TopRated', 'Trending', 'Premium', 'Elite'],
  },
  {
    title: 'Services',
    icons: ['Haircut', 'Barber', 'Makeup', 'Nails', 'Braids', 'Spa', 'Grooming', 'Skincare'],
  },
  {
    title: 'Booking Status',
    icons: ['Available', 'Pending', 'Confirmed', 'Completed', 'Cancelled'],
  },
  {
    title: 'Rewards Tiers',
    icons: ['Points', 'Bronze', 'Silver', 'Gold', 'Diamond'],
  },
  {
    title: 'Premium Features',
    icons: ['StyleMatchAI', 'BeautyPassport', 'StyleScore', 'GlowWallet', 'BeautyRadar'],
  },
]

const VARIANT_ROWS = [
  { label: 'Default (currentColor)', color: 'currentColor', bg: 'bg-surface',         text: 'text-text-primary' },
  { label: 'Royal Gold #D4AF37',     color: '#D4AF37',       bg: 'bg-surface',         text: 'text-text-primary' },
  { label: 'Deep Violet #5B2A86',    color: '#5B2A86',       bg: 'bg-surface',         text: 'text-text-primary' },
  { label: 'White on dark',          color: '#FFFFFF',       bg: 'bg-[#0B0B0B]',       text: 'text-text-primary' },
  { label: 'Gold on deep dark',      color: '#D4AF37',       bg: 'bg-[#0B0B0B]',       text: 'text-text-primary' },
]

export const metadata = {
  title: 'Vantara Icon System',
  description: 'Complete icon system for the Vantara beauty marketplace — 34 proprietary SVG icons.',
  robots: { index: false, follow: false },
}

export default function IconSystemPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-text-primary py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gold mb-4 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            Design System
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4">
            <span className="gold-text">Vantara</span> Icon System
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-base">
            34 proprietary icons across 6 categories. 24×24 grid · 1.5px stroke · rounded caps ·
            Royal Gold <code className="text-gold">#D4AF37</code> · Deep Violet <code className="text-purple-400">#5B2A86</code>
          </p>

          {/* Colour swatches */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { hex: '#D4AF37', name: 'Royal Gold' },
              { hex: '#5B2A86', name: 'Deep Violet' },
              { hex: '#0B0B0B', name: 'Black' },
              { hex: '#FFFFFF', name: 'White' },
            ].map(c => (
              <div key={c.hex} className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs">
                <span className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ background: c.hex }} />
                <span className="text-text-secondary">{c.name}</span>
                <code className="text-text-muted font-mono">{c.hex}</code>
              </div>
            ))}
          </div>
        </header>

        {/* Variant matrix — first category only, as a reference row */}
        <section className="mb-16">
          <h2 className="font-playfair text-2xl font-bold mb-6">Colour Variants</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-text-muted font-medium w-48">Variant</th>
                  {CATEGORIES[0].icons.map(name => (
                    <th key={name} className="py-3 px-3 text-text-muted font-medium">{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VARIANT_ROWS.map(row => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="py-4 pr-4 text-xs text-text-secondary">{row.label}</td>
                    {CATEGORIES[0].icons.map(name => {
                      const Icon = ICONS[name]
                      return (
                        <td key={name} className="py-4 px-3 text-center">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${row.bg}`}>
                            <Icon size={24} color={row.color} />
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* All categories */}
        {CATEGORIES.map(cat => (
          <section key={cat.title} className="mb-14">
            <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center gap-3">
              {cat.title}
              <span className="text-xs font-sans font-normal text-text-muted bg-surface px-2 py-0.5 rounded-full">
                {cat.icons.length} icons
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {cat.icons.map(name => {
                const Icon = ICONS[name]
                return (
                  <div
                    key={name}
                    className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 group hover:border-gold/30 transition-colors border border-border"
                  >
                    {/* Size 24 — default */}
                    <div className="flex items-center gap-2">
                      <Icon size={24} color="currentColor" className="text-text-primary" />
                      <Icon size={24} color="#D4AF37" />
                      <Icon size={24} color="#5B2A86" />
                    </div>
                    {/* Size 32 — gold */}
                    <Icon size={32} color="#D4AF37" />
                    <span className="text-xs text-text-muted text-center font-mono leading-tight">{name}</span>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {/* App icon treatment — 4 variations */}
        <section className="mb-14">
          <h2 className="font-playfair text-2xl font-bold mb-6">App Icon Variations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { bg: '#0B0B0B', iconColor: '#D4AF37', label: 'Dark · Gold (primary)' },
              { bg: '#D4AF37', iconColor: '#0B0B0B', label: 'Gold · Black' },
              { bg: '#5B2A86', iconColor: '#D4AF37', label: 'Violet · Gold' },
              { bg: '#FFFFFF', iconColor: '#0B0B0B', label: 'White · Black' },
            ].map(v => {
              const Icon = ICONS['Home']
              return (
                <div key={v.label} className="flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 rounded-[22px] flex items-center justify-center shadow-lg"
                    style={{ background: v.bg }}
                  >
                    <Icon size={40} color={v.iconColor} />
                  </div>
                  <span className="text-xs text-text-muted text-center">{v.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Usage snippet */}
        <section className="mb-14">
          <h2 className="font-playfair text-2xl font-bold mb-6">Usage — React / Next.js</h2>
          <pre className="glass-card rounded-2xl p-6 overflow-x-auto text-sm text-text-secondary font-mono leading-relaxed">
{`// Named import
import { HomeIcon, DiscoverIcon, StyleMatchAIIcon } from '@/components/icons/VantaraIcons'

// Default size 24, currentColor
<HomeIcon />

// Custom size and colour
<HomeIcon size={32} color="#D4AF37" />

// Using preset variant
<RewardsIcon size={28} variant="gold" />
<VerifiedIcon size={24} variant="violet" />

// Dynamic render via ICONS map
import { ICONS, type IconName } from '@/components/icons/VantaraIcons'
const Icon = ICONS['StyleMatchAI']
<Icon size={24} color="#D4AF37" />`}
          </pre>
        </section>

        {/* Flutter export note */}
        <section className="mb-14">
          <h2 className="font-playfair text-2xl font-bold mb-6">Export — Flutter</h2>
          <div className="glass-card rounded-2xl p-6 text-sm text-text-secondary leading-relaxed">
            <p className="mb-3">
              Each icon in <code className="text-gold font-mono">components/icons/VantaraIcons.tsx</code> is a pure SVG.
              To export for Flutter:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-text-muted">
              <li>Open the icon component in this file and copy the SVG <code className="text-text-secondary">&lt;path&gt;</code> / <code className="text-text-secondary">&lt;circle&gt;</code> elements.</li>
              <li>Wrap in a Flutter <code className="text-text-secondary">SvgPicture.string()</code> widget via <code className="text-gold">flutter_svg</code>.</li>
              <li>Or use <strong>SVG to Flutter path converter</strong> (svg2flutter.com) to generate <code className="text-text-secondary">CustomPainter</code> classes.</li>
              <li>Stroke width 1.5, linecap round, linejoin round — use <code className="text-text-secondary">Paint()..style = PaintingStyle.stroke..strokeWidth = 1.5..strokeCap = StrokeCap.round</code>.</li>
            </ol>
          </div>
        </section>

        <footer className="text-center text-xs text-text-muted pb-8">
          Vantara Icon System v1.0 · {new Date().getFullYear()} · Royal Gold #D4AF37 · Deep Violet #5B2A86
        </footer>
      </div>
    </div>
  )
}
