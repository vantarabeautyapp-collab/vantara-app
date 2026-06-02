import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Vantara",
  description: "Vantara Privacy Policy. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  const termlyId = process.env.NEXT_PUBLIC_TERMLY_POLICY_ID;

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gold text-sm hover:text-gold-light transition-colors">
            ← Back to Vantara
          </Link>
        </div>
        <h1 className="font-playfair text-4xl font-bold text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-text-muted text-sm mb-8">Last updated: June 2026</p>

        {termlyId ? (
          // Termly embed — shows once you create your policy at termly.io
          <div
            className="termly-embed"
            data-id={termlyId}
            data-type="iframe"
          />
        ) : (
          // Placeholder content until Termly is configured
          <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
            <div className="p-4 rounded-xl border border-gold/20 bg-gold/5 text-sm text-gold mb-8">
              This privacy policy is a placeholder. To publish your official policy, create a free account at{" "}
              <a href="https://termly.io" target="_blank" rel="noopener" className="underline">termly.io</a>
              , generate your policy, and add <code>NEXT_PUBLIC_TERMLY_POLICY_ID</code> to your environment variables.
            </div>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">1. Information We Collect</h2>
              <p>Vantara collects information you provide when you register, book appointments, or contact us, including:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Name, email address, phone number</li>
                <li>Location (country and city)</li>
                <li>Payment information (processed securely by Stripe — we never store card details)</li>
                <li>Booking history and preferences</li>
                <li>Profile photos you upload</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Process and manage your bookings</li>
                <li>Send booking confirmations and reminders</li>
                <li>Manage your Beauty Passport loyalty account</li>
                <li>Personalise your experience and service recommendations</li>
                <li>Improve the platform using anonymised analytics</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">3. Data Sharing</h2>
              <p>We share your data only with:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Service providers</strong> you book with (name, contact info, booking details)</li>
                <li><strong>Stripe</strong> — payment processing (PCI-DSS compliant)</li>
                <li><strong>Convex</strong> — secure cloud database infrastructure</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="mt-2">We never sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-2">To exercise these rights, email <a href="mailto:privacy@vantara.com" className="text-gold underline">privacy@vantara.com</a></p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">5. Data Retention</h2>
              <p>We retain your data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where retention is required by law.</p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">6. Cookies & Analytics</h2>
              <p>We use PostHog analytics (with IP anonymisation) to understand how the app is used. We do not use advertising cookies. You can opt out of analytics in your profile settings.</p>
            </section>

            <section>
              <h2 className="font-playfair text-2xl font-bold text-text-primary mb-3">7. Contact Us</h2>
              <p>Vantara<br />Email: <a href="mailto:privacy@vantara.com" className="text-gold underline">privacy@vantara.com</a></p>
            </section>
          </div>
        )}
      </div>

      {termlyId && (
        <script
          type="text/javascript"
          src="https://app.termly.io/embed-policy.min.js"
          async
        />
      )}
    </div>
  );
}
