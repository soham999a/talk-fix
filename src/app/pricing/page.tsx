import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Repair Prices — iPhone & Samsung | Talk N Fix Wireless Newark NJ",
  description: "Transparent repair pricing for iPhone and Samsung. Screen repair, back glass, battery, charging port. Walk-ins welcome at 4 locations in Newark & Passaic NJ.",
  alternates: { canonical: "https://www.talknfixwireless.com/pricing" },
};

const IPHONE_PRICES = [
  { model: "iPhone 11", screen: "$79", glass: "$69", battery: "$55", port: "$55" },
  { model: "iPhone 11 Pro", screen: "$79", glass: "$69", battery: "$55", port: "$55" },
  { model: "iPhone 11 Pro Max", screen: "$99", glass: "$69", battery: "$60", port: "$60" },
  { model: "iPhone 12 Mini", screen: "$99", glass: "$79", battery: "$60", port: "$60" },
  { model: "iPhone 12", screen: "$89", glass: "$79", battery: "$60", port: "$60" },
  { model: "iPhone 12 Pro", screen: "$89", glass: "$79", battery: "$60", port: "$60" },
  { model: "iPhone 12 Pro Max", screen: "$119", glass: "$79", battery: "$65", port: "$65" },
  { model: "iPhone 13 Mini", screen: "$119", glass: "$99", battery: "$65", port: "$65" },
  { model: "iPhone 13", screen: "$99", glass: "$99", battery: "$65", port: "$65" },
  { model: "iPhone 13 Pro", screen: "$119", glass: "$99", battery: "$65", port: "$65" },
  { model: "iPhone 13 Pro Max", screen: "$129", glass: "$99", battery: "$70", port: "$70" },
  { model: "iPhone 14", screen: "$109", glass: "$119", battery: "$70", port: "$70" },
  { model: "iPhone 14 Plus", screen: "$119", glass: "$119", battery: "$70", port: "$70" },
  { model: "iPhone 14 Pro", screen: "$139", glass: "$119", battery: "$70", port: "$70" },
  { model: "iPhone 14 Pro Max", screen: "$149", glass: "$119", battery: "$75", port: "$75" },
  { model: "iPhone 15", screen: "$149", glass: "$129", battery: "$85", port: "$85" },
  { model: "iPhone 15 Plus", screen: "$149", glass: "$129", battery: "$85", port: "$85" },
  { model: "iPhone 15 Pro", screen: "$149", glass: "$129", battery: "$85", port: "$85" },
  { model: "iPhone 15 Pro Max", screen: "$179", glass: "$129", battery: "$95", port: "$95" },
  { model: "iPhone 16 SE4", screen: "$149", glass: "$129", battery: "$95", port: "$95" },
  { model: "iPhone 16", screen: "$149", glass: "$149", battery: "$100", port: "$100" },
  { model: "iPhone 16 Plus", screen: "$159", glass: "$149", battery: "$120", port: "$120" },
  { model: "iPhone 16 Pro", screen: "$169", glass: "$149", battery: "$120", port: "$120" },
  { model: "iPhone 16 Pro Max", screen: "$199", glass: "$149", battery: "$130", port: "$130" },
  { model: "iPhone 17", screen: "$199", glass: "$199", battery: "$149", port: "$149" },
  { model: "iPhone 17 Pro", screen: "$229", glass: "$199", battery: "$149", port: "$149" },
  { model: "iPhone 17 Pro Max", screen: "$249", glass: "$199", battery: "$149", port: "$149" },
];

const SAMSUNG_PRICES = [
  { model: "Galaxy S21", screen: "$179", glass: "$40", battery: "$55", port: "$55" },
  { model: "Galaxy S21 Plus", screen: "$199", glass: "$40", battery: "$55", port: "$55" },
  { model: "Galaxy S21 Ultra", screen: "$219", glass: "$40", battery: "$55", port: "$55" },
  { model: "Galaxy S22", screen: "$199", glass: "$40", battery: "$60", port: "$60" },
  { model: "Galaxy S22 Plus", screen: "$199", glass: "$40", battery: "$60", port: "$60" },
  { model: "Galaxy S22 Ultra", screen: "$279", glass: "$40", battery: "$60", port: "$60" },
  { model: "Galaxy S23", screen: "$199", glass: "$40", battery: "$65", port: "$65" },
  { model: "Galaxy S23 Plus", screen: "$199", glass: "$40", battery: "$65", port: "$65" },
  { model: "Galaxy S23 Ultra", screen: "$299", glass: "$40", battery: "$65", port: "$65" },
  { model: "Galaxy S24", screen: "$199", glass: "$40", battery: "$75", port: "$75" },
  { model: "Galaxy S24 Plus", screen: "$229", glass: "$40", battery: "$75", port: "$75" },
  { model: "Galaxy S24 Ultra", screen: "$299", glass: "$40", battery: "$75", port: "$75" },
  { model: "Galaxy S25", screen: "$199", glass: "$40", battery: "$90", port: "$90" },
  { model: "Galaxy S25 Plus", screen: "$229", glass: "$40", battery: "$90", port: "$90" },
  { model: "Galaxy S25 Ultra", screen: "$299", glass: "$40", battery: "$90", port: "$90" },
];

function PriceTable({ title, rows, color }: { title: string; rows: typeof IPHONE_PRICES; color: string }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>
        <span style={{ color }}>{title}</span> Repair Prices
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-zinc-900 text-white">
              <th className="py-3.5 px-4 font-bold" style={{ fontFamily: "Plus Jakarta Sans" }}>Model</th>
              <th className="py-3.5 px-4 font-bold">Screen</th>
              <th className="py-3.5 px-4 font-bold">Back Glass</th>
              <th className="py-3.5 px-4 font-bold">Battery</th>
              <th className="py-3.5 px-4 font-bold">Charging Port</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.model} className={`${i % 2 === 0 ? "bg-white" : "bg-zinc-50"} hover:bg-red-50/40 transition-colors`}>
                <td className="py-3 px-4 font-semibold text-zinc-900">{row.model}</td>
                <td className="py-3 px-4 text-zinc-700 font-medium">{row.screen}</td>
                <td className="py-3 px-4 text-zinc-700">{row.glass}</td>
                <td className="py-3 px-4 text-zinc-700">{row.battery}</td>
                <td className="py-3 px-4 text-zinc-700">{row.port}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-stone-50 min-h-screen">
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                Transparent Pricing
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Repair Price List
              </h1>
              <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
                All prices are estimates. Final price confirmed after free diagnostic. Walk-ins welcome — no appointment needed.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: "M5 13l4 4L19 7", text: "1-Year Warranty Available" },
                { icon: "M12 6v6l4 2M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z", text: "30-45 Mins Same Day" },
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", text: "Free Diagnostic" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm text-sm font-medium text-zinc-700">
                  <svg className="w-4 h-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={b.icon}/></svg>
                  {b.text}
                </div>
              ))}
            </div>

            <PriceTable title="iPhone" rows={IPHONE_PRICES} color="#bc0100" />
            <PriceTable title="Samsung" rows={SAMSUNG_PRICES} color="#1a73e8" />

            {/* Note */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 text-center mb-10">
              <p className="text-stone-500 text-sm leading-relaxed">
                * Prices are estimates and may vary based on parts availability and device condition.<br />
                Final quote provided after free in-store diagnostic. Call for pricing on other devices.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-primary-gradient rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Ready to get your device fixed?</h3>
              <p className="text-white/80 text-sm mb-6">Walk in today — no appointment needed. 4 locations in Newark & Passaic NJ.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/book" className="bg-white text-red-700 font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform text-sm">Book Now</Link>
                <Link href="/locations" className="border-2 border-white/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-all text-sm">Find a Store</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
