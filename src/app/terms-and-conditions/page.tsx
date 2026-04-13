import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Talk N Fix Wireless communications and services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-stone-50 min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Legal</span>
            <h1 className="text-4xl font-extrabold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Terms and Conditions</h1>
            <p className="text-stone-500 text-sm">Talk N&apos; Fix Wireless · Last updated: 2026</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-100 shadow-sm space-y-7 text-sm text-stone-600 leading-relaxed">

            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="font-bold text-zinc-900 text-sm mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>Template for Ad Opt-In Terms of Acceptance for Calls and Texts</p>
              <p className="text-stone-500 text-xs">By opting into our communications, you agree to the following terms:</p>
            </div>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Consent to Communications</h2>
              <p>You hereby consent to receive communication from our company through emails, autodialed and/or pre-recorded telemarketing calls, AI calls, and text messages (including SMS and MMS) from or on behalf of Talk N Fix Wireless and our affiliated partners at the telephone number provided, including your wireless number, if applicable. You understand that consent is not a condition of purchase.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Frequency of Messages</h2>
              <p>You acknowledge that the frequency of messages from Talk N Fix Wireless may vary. Standard message and data rates may apply to text messages.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Third-Party Communication</h2>
              <p>You agree that Talk N Fix Wireless and its trusted partners may contact you for marketing, promotional, and other purposes related to the services or products you have expressed interest in or that we believe may be of interest to you.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Opt-Out Option</h2>
              <p>You understand that you can withdraw your consent at any time by replying <strong>STOP</strong> to any text message or by contacting us at <a href="mailto:talknfixwireless@gmail.com" className="text-red-700 hover:underline font-medium">talknfixwireless@gmail.com</a>. For assistance, you can reply <strong>HELP</strong>.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Privacy Policy</h2>
              <p>Your information will be used in accordance with our <a href="/privacy-policy" className="text-red-700 hover:underline font-medium">Privacy Policy</a>, which explains how we collect, use, and protect your data, as well as how we share it with trusted third parties.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Changes to Terms</h2>
              <p>We reserve the right to amend these terms at any time. Your continued participation in our communications program following any changes signifies your acceptance of those changes.</p>
            </section>

            <div className="border-t border-zinc-100 pt-6">
              <p className="text-xs text-stone-400">For questions, contact us at <a href="mailto:talknfixwireless@gmail.com" className="text-red-700 hover:underline">talknfixwireless@gmail.com</a></p>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
