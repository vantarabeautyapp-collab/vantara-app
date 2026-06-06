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
  { label: 'Find a Salon',    href: '/search' },
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
  { label: 'About Us',          href: '#'                   },
  { label: 'Careers',           href: '#'                   },
  { label: 'Press',             href: '#'                   },
  { label: 'Contact',           href: 'mailto:hello@vantara.com' },
  { label: 'Privacy Policy',    href: '/privacy-policy'     },
  { label: 'Terms of Service',  href: '/terms'              },
]

export function FooterSection() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div>
            <div className="flex items-center mb-4">
              <Logo size="sm" usePng />
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Africa&apos;s Beauty &amp; Grooming Marketplace. Discover, book, and glow with verified professionals
              near you.
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
            © 2026 Vantara. All rights reserved. Built with love for Africa.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-muted" aria-label="Countries supported">
            <span>🇰🇪 Kenya</span>
            <span>🇺🇬 Uganda</span>
            <span>🇹🇿 Tanzania</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
