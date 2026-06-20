import Link from 'next/link'
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react'
import Logo from '@/components/Logo'

const SOCIAL = [
  { Icon: Instagram, label: 'Instagram',  href: '#' },
  { Icon: Twitter,   label: 'Twitter / X', href: '#' },
  { Icon: Facebook,  label: 'Facebook',    href: '#' },
  { Icon: Linkedin,  label: 'LinkedIn',    href: '#' },
]

const CUSTOMER_LINKS = [
  { label: 'How it Works',    href: '#'       },
  { label: 'Find a Professional', href: '/search' },
  { label: 'Beauty Passport', href: '#'       },
  { label: 'Gift Cards',      href: '#'       },
  { label: 'Mobile App',      href: '#'       },
]

const BUSINESS_LINKS = [
  { label: 'List Your Business',   href: '/register?role=business' },
  { label: 'Business Dashboard',   href: '/business/dashboard'     },
  { label: 'Pricing',              href: '#pricing'                },
  { label: 'Partner Program',      href: '#'                       },
  { label: 'API Access',           href: '#'                       },
]

const COMPANY_LINKS = [
  { label: 'About Vantara',     href: '/about'                  },
  { label: 'Our Story',         href: '/about#story'            },
  { label: 'Careers',           href: '#'                       },
  { label: 'Press',             href: '#'                       },
  { label: 'Contact',           href: 'mailto:hello@vantara.com'},
  { label: 'Privacy Policy',    href: '/privacy-policy'         },
  { label: 'Terms of Service',  href: '/terms'                  },
]

const COUNTRIES = [
  { flag: '🇰🇪', name: 'Kenya'     },
  { flag: '🇺🇬', name: 'Uganda'    },
  { flag: '🇹🇿', name: 'Tanzania'  },
  { flag: '🇳🇬', name: 'Nigeria'   },
  { flag: '🇬🇭', name: 'Ghana'     },
]

export function FooterSection() {
  return (
    <footer className="py-14 px-4 relative overflow-hidden" style={{ borderTop: '1px solid rgba(166,75,42,0.25)', background: 'linear-gradient(180deg, var(--color-background) 0%, rgba(28,18,8,0.6) 100%)' }}>
      <div className="absolute inset-0 pattern-weave pointer-events-none" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div>
            <div className="flex items-center mb-4">
              <Logo size="sm" usePng />
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-2">
              Africa&apos;s Beauty &amp; Grooming Marketplace.
            </p>
            <p className="text-xs text-text-muted leading-relaxed mb-5">
              We connect talented professionals with the customers who need them —
              building community, trust, and confidence across the continent.
            </p>
            <p className="text-xs text-text-muted italic mb-5">
              &ldquo;To connect Africa with trusted beauty and grooming experiences through technology.&rdquo;
            </p>
            <nav aria-label="Social media links">
              <div className="flex gap-3">
                {SOCIAL.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-gold transition-colors"
                    rel="noopener noreferrer"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Customers */}
          <nav aria-labelledby="footer-customers">
            <div id="footer-customers" className="font-semibold text-text-primary text-sm mb-4">Customers</div>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {CUSTOMER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-text-secondary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Business */}
          <nav aria-labelledby="footer-business">
            <div id="footer-business" className="font-semibold text-text-primary text-sm mb-4">Business</div>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {BUSINESS_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-text-secondary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <div id="footer-company" className="font-semibold text-text-primary text-sm mb-4">Company</div>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-text-secondary transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2026 Vantara. All rights reserved. Built with purpose for Africa.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text-muted" aria-label="Countries where Vantara is available">
            {COUNTRIES.map(c => (
              <span key={c.name} className="flex items-center gap-1">
                <span aria-hidden="true">{c.flag}</span>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
