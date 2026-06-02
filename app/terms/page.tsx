import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Vantara",
  description: "Vantara Terms of Service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gold text-sm hover:text-gold-light transition-colors">← Back to Vantara</Link>
        </div>
        <h1 className="font-playfair text-4xl font-bold text-text-primary mb-2">Terms of Service</h1>
        <p className="text-text-muted text-sm mb-8">Last updated: June 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Vantara, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.</p>
          </section>
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">2. Platform Description</h2>
            <p>Vantara is a marketplace connecting customers with beauty service professionals across Africa. We facilitate bookings but are not a party to the service transactions between customers and businesses.</p>
          </section>
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">3. User Accounts</h2>
            <p>You must be at least 16 years old to use Vantara. You are responsible for maintaining the security of your account and for all activities under your account.</p>
          </section>
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">4. Bookings & Payments</h2>
            <p>Bookings are confirmed when payment is successful. Cancellation policies are set by individual businesses. Refunds are processed within 5-7 business days where applicable.</p>
          </section>
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">5. Business Listings</h2>
            <p>Businesses are responsible for the accuracy of their listings. Vantara verifies businesses but does not guarantee service quality. Verified badges indicate identity verification, not quality assurance.</p>
          </section>
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">6. Prohibited Conduct</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Posting false reviews or ratings</li>
              <li>Impersonating other users or businesses</li>
              <li>Using the platform for illegal activities</li>
              <li>Attempting to circumvent our security systems</li>
            </ul>
          </section>
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">7. Limitation of Liability</h2>
            <p>Vantara is not liable for the quality of services provided by listed businesses, or for losses arising from bookings. Our liability is limited to the amount paid to us in the preceding 3 months.</p>
          </section>
          <section>
            <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">8. Contact</h2>
            <p>Email: <a href="mailto:legal@vantara.com" className="text-gold underline">legal@vantara.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
