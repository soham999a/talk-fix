import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Talk N Fix Wireless — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-stone-50 min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Legal</span>
            <h1 className="text-4xl font-extrabold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Privacy Policy</h1>
            <p className="text-stone-500 text-sm">Talk N&apos; Fix Wireless · Last updated: 2026</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-100 shadow-sm space-y-8 text-sm text-stone-600 leading-relaxed">

            <p>At Talk N Fix Wireless, along with our affiliates, we prioritize your privacy and are dedicated to protecting the information you share with us. This document outlines how we handle the Personal Information collected through our website, applications, and services (referred to collectively as &ldquo;Services&rdquo;).</p>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>1. Collection of Personal Information</h2>
              <p className="mb-3">We gather Personal Information about you in the following ways:</p>
              <p className="font-semibold text-zinc-700 mb-2">Directly from You:</p>
              <ul className="list-disc pl-5 space-y-1.5 mb-4">
                <li><strong>Account Information:</strong> Your name, contact details, account credentials, payment information, and transaction history.</li>
                <li><strong>Content:</strong> Personal Information in your inputs, uploads, or feedback to our Services.</li>
                <li><strong>Communication Information:</strong> If you contact us, we collect your name, contact details, and message contents.</li>
                <li><strong>Social Media Information:</strong> Interacting with our social media accounts may result in us collecting your contact details.</li>
              </ul>
              <p className="font-semibold text-zinc-700 mb-2">Automatically Collected Information:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Technical Information:</strong> Browser/device data, IP addresses, usage patterns, and cookies to enhance your experience and improve our Services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>2. Use of Personal Information</h2>
              <p className="mb-2">We use your Personal Information to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Deliver and improve our Services.</li>
                <li>Communicate with you about updates and offerings.</li>
                <li>Conduct research and prevent fraud.</li>
                <li>Comply with legal obligations and protect our rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>3. Disclosure of Personal Information</h2>
              <p className="mb-2">We may share your Personal Information with:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Service Providers:</strong> To support our business operations and service delivery.</li>
                <li><strong>During Business Transfers:</strong> As part of mergers, acquisitions, or other business transitions.</li>
                <li><strong>For Legal Reasons:</strong> When necessary to comply with laws or protect our interests and safety.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>4. Your Rights</h2>
              <p className="mb-2">Depending on location, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Access your Personal Information and information relating to how it is processed.</li>
                <li>Delete your Personal Information from our records.</li>
                <li>Rectify or update your Personal Information.</li>
                <li>Transfer your Personal Information to a third party (right to data portability).</li>
                <li>Restrict how we process your Personal Information.</li>
                <li>Withdraw your consent at any time.</li>
                <li>Object to how we process your Personal Information.</li>
              </ul>
              <p className="mt-3">You can exercise these rights by contacting us at <a href="mailto:talknfixwireless@gmail.com" className="text-red-700 hover:underline font-medium">talknfixwireless@gmail.com</a></p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>5. Children&apos;s Privacy</h2>
              <p>Our Services do not target children under 13. We do not knowingly collect information from children under this age. If you are 13 or older, but under 18, you must have permission from your parent or guardian to use our Services.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>6. Third-Party Websites</h2>
              <p>Our Service may link to external sites not governed by this Privacy Policy. We recommend reviewing their privacy policies independently.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>7. Security and Retention</h2>
              <p>We employ measures to protect your Personal Information but cannot guarantee absolute security. We retain your data as necessary for service provision and compliance with legal obligations.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>8. International Users</h2>
              <p>Your Personal Information may be processed and stored in the United States and other jurisdictions, under the legal bases outlined for our international operations.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>9. Policy Updates</h2>
              <p>We may periodically update this Privacy Policy. Changes will be posted on our website, along with the effective date.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>10. Contact Us</h2>
              <p>For any questions or concerns regarding this policy, please reach out to our support team at <a href="mailto:talknfixwireless@gmail.com" className="text-red-700 hover:underline font-medium">talknfixwireless@gmail.com</a></p>
            </section>

            <section className="border-t border-zinc-100 pt-6">
              <h2 className="text-lg font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Consent to Communication</h2>
              <p className="mb-3"><strong>Scope of Consent:</strong> By submitting your personal information on our website, you agree that Talk N Fix Wireless, its subsidiaries, affiliates, and our trusted third-party partners may contact you by various communication methods, including emails, phone calls, text messages, and postal mail.</p>
              <p className="mb-3"><strong>Automated Calls and Messages:</strong> You acknowledge that consent includes receiving autodialed and prerecorded messages or calls delivered via automated technology, to the phone number you provided.</p>
              <p className="mb-3"><strong>Third-Party Communication:</strong> You agree that we may share your personal information with trusted third parties for them to contact you with relevant offers and services, in accordance with our Privacy Policy.</p>
              <p><strong>Voluntary Nature of Consent:</strong> Providing your consent is completely voluntary, and you may withdraw your consent at any time by following the opt-out instructions in our communications or contacting our customer service.</p>
            </section>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
