import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd, { webPageSchema, breadcrumbSchema } from '@/components/JsonLd'

const BASE = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Vantara Terms of Service — the rules, rights, and responsibilities for using Africa\'s Beauty & Grooming Marketplace.',
  alternates: { canonical: `${BASE}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    title:       'Terms of Service — Vantara',
    description: 'Read the terms and conditions for using Vantara, Africa\'s Beauty & Grooming Marketplace.',
    url:         `${BASE}/terms`,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <JsonLd schema={[
        webPageSchema('Terms of Service — Vantara', 'Terms and conditions for using Vantara.', '/terms'),
        breadcrumbSchema([
          { name: 'Home',             url: '/' },
          { name: 'Terms of Service', url: '/terms' },
        ]),
      ]} />

      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-text-muted">
            <li><Link href="/" className="text-gold hover:text-gold-light transition-colors">Vantara</Link></li>
            <li aria-hidden>/</li>
            <li className="text-text-secondary">Terms of Service</li>
          </ol>
        </nav>

        <header className="mb-10">
          <h1 className="font-playfair text-4xl font-bold text-text-primary mb-2">Terms of Service</h1>
          <p className="text-text-muted text-sm">Last updated: June 2026 · Effective: 1 June 2026</p>
          <div className="mt-4 p-4 rounded-xl border border-gold/20 bg-gold/5 text-sm text-gold">
            Please read these terms carefully before using Vantara. By creating an account or making a booking, you agree to be bound by these terms.
          </div>
        </header>

        <article className="space-y-10 text-text-secondary">

          <section id="acceptance" aria-labelledby="heading-acceptance">
            <h2 id="heading-acceptance" className="font-playfair text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Vantara platform (website, mobile app, or API), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not use the platform.</p>
            <p className="mt-3">These terms apply to all users including customers, business owners, staff members, and visitors. We may update these terms from time to time and will notify you by email or in-app notice at least 14 days before material changes take effect.</p>
          </section>

          <section id="platform" aria-labelledby="heading-platform">
            <h2 id="heading-platform" className="font-playfair text-2xl font-bold text-text-primary mb-4">2. Platform Description</h2>
            <p>Vantara is a digital marketplace that connects customers seeking beauty and grooming services with independent professionals and businesses across Africa. Vantara facilitates discovery, booking, payment, and review — but is not itself a beauty service provider.</p>
            <p className="mt-3">Service transactions are between the customer and the listed business. Vantara is not a party to those service agreements.</p>
          </section>

          <section id="eligibility" aria-labelledby="heading-eligibility">
            <h2 id="heading-eligibility" className="font-playfair text-2xl font-bold text-text-primary mb-4">3. Eligibility & Accounts</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>You must be at least <strong className="text-text-primary">16 years old</strong> to use Vantara.</li>
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>You must notify us immediately at <a href="mailto:support@vantara.com" className="text-gold hover:underline">support@vantara.com</a> if you suspect unauthorised access to your account.</li>
              <li>Each person may only have one account. Duplicate accounts may be suspended.</li>
              <li>Business accounts must represent a real, operating business. Fraudulent listings will result in permanent removal and potential legal action.</li>
            </ul>
          </section>

          <section id="bookings" aria-labelledby="heading-bookings">
            <h2 id="heading-bookings" className="font-playfair text-2xl font-bold text-text-primary mb-4">4. Bookings & Cancellations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">4.1 Making a Booking</h3>
                <p className="text-sm">A booking is confirmed when you receive a booking confirmation notification. Bookings are subject to the business&apos;s availability at the time of confirmation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">4.2 Cancellation Policy</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong className="text-text-primary">More than 24 hours before appointment:</strong> Full refund to original payment method within 5–7 business days.</li>
                  <li><strong className="text-text-primary">2–24 hours before appointment:</strong> 50% refund, subject to the individual business&apos;s policy.</li>
                  <li><strong className="text-text-primary">Less than 2 hours or no-show:</strong> No refund. The full amount may be charged.</li>
                </ul>
                <p className="mt-2 text-sm text-text-muted">Individual businesses may set stricter cancellation policies, which will be displayed on their profile before you book.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">4.3 Business Cancellations</h3>
                <p className="text-sm">If a business cancels your booking with less than 4 hours&apos; notice, you will receive a full refund and loyalty point compensation. Repeat cancellations by a business may result in their removal from the platform.</p>
              </div>
            </div>
          </section>

          <section id="payments" aria-labelledby="heading-payments">
            <h2 id="heading-payments" className="font-playfair text-2xl font-bold text-text-primary mb-4">5. Payments & Fees</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">5.1 Payment Methods</h3>
                <p className="text-sm">We accept the following payment methods depending on your country:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li><strong className="text-text-primary">Kenya:</strong> M-Pesa (Lipa Na M-Pesa), Airtel Money, Visa/Mastercard</li>
                  <li><strong className="text-text-primary">Nigeria:</strong> Card, bank transfer (USSD), MTN MoMo</li>
                  <li><strong className="text-text-primary">Ghana:</strong> MTN Mobile Money, Vodafone Cash, card</li>
                  <li><strong className="text-text-primary">Uganda:</strong> MTN Mobile Money, Airtel Money, card</li>
                  <li><strong className="text-text-primary">Tanzania:</strong> M-Pesa TZ, Tigo Pesa, Airtel Money, card</li>
                  <li><strong className="text-text-primary">International:</strong> Visa, Mastercard, Amex</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">5.2 Service Fees</h3>
                <p className="text-sm">Vantara charges a platform service fee of <strong className="text-text-primary">10–15%</strong> on each booking, deducted from the business&apos;s payout. Customers pay the full listed price with no hidden surcharges.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">5.3 Subscription Plans</h3>
                <p className="text-sm">Business subscription plans (Premium: KSh 4,999/month; Elite: KSh 9,999/month) are billed monthly and include a 14-day free trial for new subscribers. You may cancel your subscription at any time; access continues until the end of the current billing period.</p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">5.4 Payouts</h3>
                <p className="text-sm">Businesses receive payouts within 3–5 business days of completed appointments. Payouts are made to registered M-Pesa, bank, or mobile money accounts.</p>
              </div>
            </div>
          </section>

          <section id="listings" aria-labelledby="heading-listings">
            <h2 id="heading-listings" className="font-playfair text-2xl font-bold text-text-primary mb-4">6. Business Listings & Verification</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Businesses are responsible for the accuracy of their listing information, including prices, availability, and service descriptions.</li>
              <li>Vantara&apos;s <strong className="text-text-primary">Verified</strong>, <strong className="text-text-primary">Premium</strong>, and <strong className="text-text-primary">Elite</strong> badges indicate identity and business legitimacy verification only — they are not quality guarantees.</li>
              <li>Businesses must maintain accurate availability calendars. Repeated false availability may result in suspension.</li>
              <li>Businesses may not engage in price discrimination based on customer characteristics protected by applicable law.</li>
            </ul>
          </section>

          <section id="reviews" aria-labelledby="heading-reviews">
            <h2 id="heading-reviews" className="font-playfair text-2xl font-bold text-text-primary mb-4">7. Reviews & Ratings</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Only users who have completed a booking may leave a review for that business.</li>
              <li>Reviews must be honest, fair, and based on your actual experience.</li>
              <li>Businesses may respond publicly to reviews but may not harass or threaten reviewers.</li>
              <li>Vantara reserves the right to remove reviews that are fake, abusive, or in violation of these terms.</li>
              <li>Incentivising positive reviews (e.g. offering discounts in exchange for 5 stars) is prohibited.</li>
            </ul>
          </section>

          <section id="loyalty" aria-labelledby="heading-loyalty">
            <h2 id="heading-loyalty" className="font-playfair text-2xl font-bold text-text-primary mb-4">8. Beauty Passport (Loyalty Programme)</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Loyalty points are earned on completed bookings and certain platform actions.</li>
              <li>Points have no monetary value and cannot be transferred, sold, or exchanged for cash.</li>
              <li>Vantara reserves the right to modify the loyalty programme structure with 30 days&apos; notice.</li>
              <li>Points expire after 12 months of account inactivity.</li>
            </ul>
          </section>

          <section id="prohibited" aria-labelledby="heading-prohibited">
            <h2 id="heading-prohibited" className="font-playfair text-2xl font-bold text-text-primary mb-4">9. Prohibited Conduct</h2>
            <p className="mb-3">The following are strictly prohibited on Vantara:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Posting false, misleading, or fraudulent information about yourself or your business</li>
              <li>Impersonating another user, business, or Vantara staff</li>
              <li>Harassment, threats, or discriminatory conduct towards other users</li>
              <li>Attempting to circumvent our booking system by arranging direct off-platform payments for bookings sourced through Vantara (first 12 months of relationship)</li>
              <li>Scraping, crawling, or automated access to the platform without express permission</li>
              <li>Posting fake reviews or arranging review manipulation</li>
              <li>Using the platform for any illegal activity</li>
              <li>Attempting to compromise our security systems</li>
            </ul>
          </section>

          <section id="intellectual-property" aria-labelledby="heading-ip">
            <h2 id="heading-ip" className="font-playfair text-2xl font-bold text-text-primary mb-4">10. Intellectual Property</h2>
            <p className="text-sm">The Vantara name, logo, and platform are our intellectual property. You grant Vantara a non-exclusive licence to use content you upload to the platform (photos, business descriptions) solely to operate and promote the service. You retain ownership of your content.</p>
          </section>

          <section id="liability" aria-labelledby="heading-liability">
            <h2 id="heading-liability" className="font-playfair text-2xl font-bold text-text-primary mb-4">11. Limitation of Liability</h2>
            <p className="text-sm">To the maximum extent permitted by applicable law:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
              <li>Vantara is not liable for the quality, safety, or legality of services provided by listed businesses.</li>
              <li>Vantara is not liable for losses arising from booking disputes between customers and businesses.</li>
              <li>Our total liability to you in connection with any claim shall not exceed the total fees paid by you to Vantara in the 3 months preceding the claim.</li>
              <li>We are not liable for indirect, incidental, or consequential losses.</li>
            </ul>
            <p className="mt-3 text-sm text-text-muted">
              Nothing in these terms limits liability for death or personal injury caused by negligence, or for fraud.
            </p>
          </section>

          <section id="disputes" aria-labelledby="heading-disputes">
            <h2 id="heading-disputes" className="font-playfair text-2xl font-bold text-text-primary mb-4">12. Disputes</h2>
            <p className="text-sm">We encourage you to first contact us at <a href="mailto:support@vantara.com" className="text-gold hover:underline">support@vantara.com</a> to resolve any issues informally.</p>
            <p className="mt-3 text-sm">If a dispute cannot be resolved informally, it shall be resolved by binding arbitration under the Nairobi Centre for International Arbitration (NCIA) rules, seated in Nairobi, Kenya. Class action waiver: you agree to resolve disputes individually, not as part of a class action.</p>
          </section>

          <section id="governing-law" aria-labelledby="heading-law">
            <h2 id="heading-law" className="font-playfair text-2xl font-bold text-text-primary mb-4">13. Governing Law</h2>
            <p className="text-sm">These terms are governed by the laws of the Republic of Kenya. For users in other jurisdictions, mandatory consumer protection laws of your country of residence may also apply.</p>
          </section>

          <section id="termination" aria-labelledby="heading-termination">
            <h2 id="heading-termination" className="font-playfair text-2xl font-bold text-text-primary mb-4">14. Termination</h2>
            <p className="text-sm">You may delete your account at any time from your Profile Settings. We reserve the right to suspend or terminate accounts that violate these terms, with or without prior notice depending on severity. Upon termination, your right to use the platform ends immediately.</p>
          </section>

          <section id="contact" aria-labelledby="heading-contact">
            <h2 id="heading-contact" className="font-playfair text-2xl font-bold text-text-primary mb-4">15. Contact</h2>
            <div className="glass-card-gold rounded-xl p-5 text-sm space-y-1">
              <div className="font-semibold text-text-primary mb-2">Vantara Legal</div>
              <div>📧 Legal enquiries: <a href="mailto:legal@vantara.com" className="text-gold hover:underline">legal@vantara.com</a></div>
              <div>💬 General support: <a href="mailto:support@vantara.com" className="text-gold hover:underline">support@vantara.com</a></div>
              <div>📍 Nairobi, Kenya</div>
            </div>
          </section>

        </article>

        <footer className="mt-12 pt-6 border-t border-border text-xs text-text-muted text-center">
          <p>© 2026 Vantara. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link>
            <Link href="/" className="hover:text-text-secondary transition-colors">Back to Vantara</Link>
          </div>
        </footer>

      </div>
    </div>
  )
}
