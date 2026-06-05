import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd, { webPageSchema, breadcrumbSchema } from '@/components/JsonLd'

const BASE = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Vantara Privacy Policy — how we collect, use, and protect your personal data in compliance with the Kenya Data Protection Act 2019, GDPR, and applicable African data protection laws.',
  alternates: { canonical: `${BASE}/privacy-policy` },
  robots: { index: true, follow: true },
  openGraph: {
    title:       'Privacy Policy — Vantara',
    description: 'Learn how Vantara collects, uses, and protects your personal data.',
    url:         `${BASE}/privacy-policy`,
  },
}

const SECTIONS = [
  {
    id: '1',
    title: '1. Who We Are',
    content: (
      <>
        <p>
          Vantara (&ldquo;Vantara&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an online marketplace that connects customers with beauty and grooming professionals across Africa. Our platform is accessible at{' '}
          <a href="https://vantarafrique.com" className="text-gold hover:underline">vantarafrique.com</a>{' '}
          and via our mobile applications.
        </p>
        <p className="mt-3">
          Vantara operates from Nairobi, Kenya and serves users in Kenya, Uganda, Tanzania, Nigeria, Ghana, and other African countries. We are the data controller for personal data collected through our platform.
        </p>
        <p className="mt-3">
          <strong className="text-text-primary">Data Protection contact:</strong>{' '}
          <a href="mailto:privacy@vantara.com" className="text-gold hover:underline">privacy@vantara.com</a>
        </p>
      </>
    ),
  },
  {
    id: '2',
    title: '2. Data We Collect',
    content: (
      <>
        <p>We collect the following categories of personal data:</p>
        <div className="mt-4 space-y-4">
          <div>
            <strong className="text-text-primary text-sm">Account & Identity</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Full name and email address</li>
              <li>Phone number (for booking confirmations and M-Pesa notifications)</li>
              <li>Profile photo (optional — you may use a Google profile photo)</li>
              <li>Country and city</li>
              <li>Password (stored as a bcrypt hash — we never store your actual password)</li>
            </ul>
          </div>
          <div>
            <strong className="text-text-primary text-sm">Booking & Transaction Data</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Appointment history, service preferences, and favourite professionals</li>
              <li>Payment method used (card type, last 4 digits — stored by Stripe/Flutterwave, not us)</li>
              <li>M-Pesa transaction reference numbers</li>
              <li>Loyalty points balance and tier history</li>
            </ul>
          </div>
          <div>
            <strong className="text-text-primary text-sm">Business Owners (Additional)</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Business name, type, address, and contact details</li>
              <li>Business registration documents (for verified badge verification)</li>
              <li>Bank account or M-Pesa paybill/till number for payouts</li>
              <li>Staff profiles you create under your account</li>
            </ul>
          </div>
          <div>
            <strong className="text-text-primary text-sm">Usage & Technical Data</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Pages visited, features used, and search queries (via PostHog analytics with IP anonymisation)</li>
              <li>Device type, operating system, and browser</li>
              <li>Approximate location (country/city — we do not use GPS tracking)</li>
              <li>Error logs and crash reports</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: '3',
    title: '3. How We Use Your Data',
    content: (
      <>
        <p>We use your data for the following purposes:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
          <li><strong className="text-text-primary">Service delivery:</strong> Processing bookings, sending confirmations, and connecting you with service providers.</li>
          <li><strong className="text-text-primary">Payments:</strong> Facilitating secure payments via Stripe and Flutterwave. We never store full payment card details.</li>
          <li><strong className="text-text-primary">Loyalty programme:</strong> Managing your Beauty Passport points and tier status.</li>
          <li><strong className="text-text-primary">Communications:</strong> Sending booking reminders, receipts, and platform updates (you can opt out anytime).</li>
          <li><strong className="text-text-primary">Platform improvement:</strong> Analysing usage patterns (anonymised) to improve search, recommendations, and UX.</li>
          <li><strong className="text-text-primary">Safety & security:</strong> Detecting fraud, preventing abuse, and enforcing our Terms of Service.</li>
          <li><strong className="text-text-primary">Legal compliance:</strong> Meeting obligations under the Kenya Data Protection Act 2019, GDPR (for EU/UK users), and other applicable laws.</li>
          <li><strong className="text-text-primary">Business verification:</strong> Verifying business legitimacy before awarding Verified/Premium/Elite badges.</li>
        </ul>
      </>
    ),
  },
  {
    id: '4',
    title: '4. Legal Bases for Processing',
    content: (
      <>
        <p>We process your personal data under the following legal bases:</p>
        <div className="mt-3 space-y-3 text-sm">
          <div className="glass-card rounded-xl p-4 border border-border">
            <div className="font-semibold text-text-primary mb-1">Contract performance</div>
            <p className="text-text-muted">To provide you with the booking service, process payments, and manage your account.</p>
          </div>
          <div className="glass-card rounded-xl p-4 border border-border">
            <div className="font-semibold text-text-primary mb-1">Legitimate interests</div>
            <p className="text-text-muted">Platform analytics (anonymised), fraud prevention, and improving our services.</p>
          </div>
          <div className="glass-card rounded-xl p-4 border border-border">
            <div className="font-semibold text-text-primary mb-1">Consent</div>
            <p className="text-text-muted">Marketing emails and non-essential analytics. You can withdraw consent at any time.</p>
          </div>
          <div className="glass-card rounded-xl p-4 border border-border">
            <div className="font-semibold text-text-primary mb-1">Legal obligation</div>
            <p className="text-text-muted">Retaining transaction records as required by tax and financial regulations.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: '5',
    title: '5. Data Sharing',
    content: (
      <>
        <p>We share your data only in these circumstances:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
          <li>
            <strong className="text-text-primary">Service providers you book:</strong> Your name, phone number, and booking details are shared with the salon, barber, or professional you book with.
          </li>
          <li>
            <strong className="text-text-primary">Stripe</strong> (stripe.com) — Payment processing for card and subscription payments. PCI-DSS Level 1 certified. Stripe may process your data in the US and EU under Standard Contractual Clauses.
          </li>
          <li>
            <strong className="text-text-primary">Flutterwave</strong> (flutterwave.com) — Payment processing for African payment methods (M-Pesa, MTN MoMo, etc.). Flutterwave processes data in accordance with their privacy policy.
          </li>
          <li>
            <strong className="text-text-primary">Convex</strong> (convex.dev) — Cloud database infrastructure. Data is encrypted at rest and in transit.
          </li>
          <li>
            <strong className="text-text-primary">PostHog</strong> — Privacy-first analytics with IP anonymisation and no third-party ad tracking.
          </li>
          <li>
            <strong className="text-text-primary">Google</strong> — If you sign in with Google, we receive your name, email, and profile photo from Google under Google&apos;s OAuth terms.
          </li>
          <li>
            <strong className="text-text-primary">Legal authorities:</strong> When required by law, court order, or to protect our rights and the safety of users.
          </li>
        </ul>
        <p className="mt-4 font-medium text-text-primary">We never sell your personal data to third parties for advertising or marketing purposes.</p>
      </>
    ),
  },
  {
    id: '6',
    title: '6. Data Retention',
    content: (
      <>
        <p>We retain your personal data for the following periods:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
          <li><strong className="text-text-primary">Active accounts:</strong> For as long as your account is active.</li>
          <li><strong className="text-text-primary">Booking history:</strong> 3 years after your last booking (required for tax compliance in Kenya).</li>
          <li><strong className="text-text-primary">Payment records:</strong> 7 years (Kenya Companies Act / tax obligation).</li>
          <li><strong className="text-text-primary">Deleted accounts:</strong> Personal data is removed within 30 days. Anonymised transaction data may be retained for analytics.</li>
          <li><strong className="text-text-primary">Error logs:</strong> 90 days.</li>
        </ul>
      </>
    ),
  },
  {
    id: '7',
    title: '7. Your Rights',
    content: (
      <>
        <p>Under the Kenya Data Protection Act 2019, GDPR, and applicable laws, you have the right to:</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { right: 'Access',      desc: 'Request a copy of the personal data we hold about you.' },
            { right: 'Correction',  desc: 'Correct inaccurate or incomplete data in your profile.' },
            { right: 'Erasure',     desc: 'Request deletion of your account and associated data (subject to legal retention obligations).' },
            { right: 'Portability', desc: 'Receive your data in a structured, machine-readable format.' },
            { right: 'Object',      desc: 'Object to processing based on legitimate interests (e.g. analytics).' },
            { right: 'Withdraw consent', desc: 'Opt out of marketing communications or non-essential analytics at any time.' },
          ].map(({ right, desc }) => (
            <div key={right} className="glass-card rounded-xl p-3 border border-border">
              <div className="font-semibold text-text-primary text-xs mb-1">{right}</div>
              <p className="text-text-muted text-xs">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          To exercise any of these rights, email{' '}
          <a href="mailto:privacy@vantara.com" className="text-gold hover:underline">privacy@vantara.com</a>. We will respond within 30 days.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          If you are in the EU/EEA, you also have the right to lodge a complaint with your supervisory authority. For Kenya, contact the Office of the Data Protection Commissioner (ODPC).
        </p>
      </>
    ),
  },
  {
    id: '8',
    title: '8. Security',
    content: (
      <>
        <p>We implement industry-standard security measures including:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
          <li>TLS 1.3 encryption for all data in transit (HTTPS enforced)</li>
          <li>Passwords hashed with bcrypt (cost factor 12) — we never store plaintext passwords</li>
          <li>JWT authentication with short expiry tokens</li>
          <li>Rate limiting and brute-force protection on all authentication endpoints</li>
          <li>Content Security Policy (CSP) headers on all pages</li>
          <li>Database encryption at rest via Convex</li>
          <li>Regular security audits and penetration testing</li>
        </ul>
        <p className="mt-3 text-sm text-text-muted">
          Despite these measures, no system is 100% secure. If you discover a security vulnerability, please responsibly disclose it to{' '}
          <a href="mailto:security@vantara.com" className="text-gold hover:underline">security@vantara.com</a>.
        </p>
      </>
    ),
  },
  {
    id: '9',
    title: '9. Cookies & Analytics',
    content: (
      <>
        <p>We use minimal, privacy-respecting tracking:</p>
        <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
          <li><strong className="text-text-primary">Essential cookies:</strong> Authentication tokens (session management). Cannot be disabled.</li>
          <li><strong className="text-text-primary">PostHog analytics:</strong> Anonymous product analytics to understand feature usage. IP addresses are anonymised. No cross-site tracking. You can opt out in your Profile Settings.</li>
          <li><strong className="text-text-primary">Google Analytics 4</strong> (optional): Aggregate traffic data with anonymised IPs. Controlled by your cookie preference.</li>
        </ul>
        <p className="mt-3 text-sm">We do not use advertising cookies, Facebook Pixel, or any third-party ad networks.</p>
      </>
    ),
  },
  {
    id: '10',
    title: '10. Children\'s Privacy',
    content: (
      <p>
        Vantara is not directed at children under 16 years of age. We do not knowingly collect personal data from anyone under 16. If you believe a child has provided us with their data, please contact{' '}
        <a href="mailto:privacy@vantara.com" className="text-gold hover:underline">privacy@vantara.com</a>{' '}
        and we will delete it promptly.
      </p>
    ),
  },
  {
    id: '11',
    title: '11. International Transfers',
    content: (
      <>
        <p>
          Vantara operates primarily from Kenya. When your data is processed by our service providers outside Kenya (e.g. Stripe in the US, Convex in the US/EU), we ensure appropriate safeguards are in place — including Standard Contractual Clauses (EU/UK), and data processing agreements compliant with the Kenya DPA 2019.
        </p>
      </>
    ),
  },
  {
    id: '12',
    title: '12. Changes to This Policy',
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material changes by email or in-app notification at least 14 days before the change takes effect. The &ldquo;Last updated&rdquo; date at the top of this page will always reflect the most recent version.
        </p>
      </>
    ),
  },
  {
    id: '13',
    title: '13. Contact Us',
    content: (
      <>
        <div className="glass-card-gold rounded-xl p-5 text-sm space-y-1">
          <div className="font-semibold text-text-primary mb-2">Vantara — Data Controller</div>
          <div>📧 Privacy: <a href="mailto:privacy@vantara.com"   className="text-gold hover:underline">privacy@vantara.com</a></div>
          <div>🔒 Security: <a href="mailto:security@vantara.com" className="text-gold hover:underline">security@vantara.com</a></div>
          <div>📍 Nairobi, Kenya</div>
          <div className="pt-2 text-text-muted text-xs">
            Kenya Office of the Data Protection Commissioner (ODPC):{' '}
            <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">odpc.go.ke</a>
          </div>
        </div>
      </>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <JsonLd schema={[
        webPageSchema('Privacy Policy — Vantara', 'How Vantara collects, uses, and protects your personal data.', '/privacy-policy'),
        breadcrumbSchema([
          { name: 'Home',           url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' },
        ]),
      ]} />

      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-text-muted">
            <li><Link href="/" className="text-gold hover:text-gold-light transition-colors">Vantara</Link></li>
            <li aria-hidden>/</li>
            <li className="text-text-secondary">Privacy Policy</li>
          </ol>
        </nav>

        <header className="mb-10">
          <h1 className="font-playfair text-4xl font-bold text-text-primary mb-2">Privacy Policy</h1>
          <p className="text-text-muted text-sm">Last updated: June 2026 · Effective: 1 June 2026</p>
          <div className="mt-4 p-4 rounded-xl border border-emerald-brand/20 bg-emerald-brand/5 text-sm text-emerald-light">
            This policy covers how Vantara handles your personal data in compliance with the{' '}
            <strong>Kenya Data Protection Act 2019</strong>,{' '}
            <strong>EU/UK GDPR</strong>,{' '}
            <strong>Nigeria NDPR</strong>, and{' '}
            <strong>South Africa POPIA</strong>.
          </div>
        </header>

        {/* Table of contents */}
        <nav aria-label="Table of contents" className="glass-card rounded-2xl border border-border p-5 mb-10">
          <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Contents</div>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {SECTIONS.map(s => (
              <li key={s.id}>
                <a href={`#section-${s.id}`} className="text-sm text-text-secondary hover:text-gold transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <article className="space-y-10 text-text-secondary">
          {SECTIONS.map(s => (
            <section key={s.id} id={`section-${s.id}`} aria-labelledby={`heading-${s.id}`}>
              <h2 id={`heading-${s.id}`} className="font-playfair text-2xl font-bold text-text-primary mb-4">
                {s.title}
              </h2>
              {s.content}
            </section>
          ))}
        </article>

        <footer className="mt-12 pt-6 border-t border-border text-xs text-text-muted text-center">
          <p>© 2026 Vantara. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>
            <Link href="/" className="hover:text-text-secondary transition-colors">Back to Vantara</Link>
          </div>
        </footer>

      </div>
    </div>
  )
}
