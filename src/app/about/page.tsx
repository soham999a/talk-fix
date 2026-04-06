import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us — Our Story",
  description: "Learn about Talk N Fix Wireless, founded in 2014 by Rey. From a single store to 5 locations across Newark & Passaic NJ, repairing 1,000+ devices monthly.",
};

const STATS = [
  { value: "2014", label: "Founded" },
  { value: "1,000+", label: "Repairs / Month" },
  { value: "5", label: "Locations" },
  { value: "6,500+", label: "Google Reviews" },
];

const STANDARDS = [
  "Structured repair systems — not guesswork",
  "Corporate-level standards across all locations",
  "Highly trained, certified technicians",
  "Fast 30–45 minute turnaround",
  "Clean, professional stores",
  "Consistent customer experience every time",
];

const REASONS = [
  "Strong online reviews and reputation",
  "Thousands of repeat customers",
  "Word-of-mouth referrals",
  "Efficient repair systems",
  "Continuous service improvements",
  "Bilingual support for our community",
];

const FUTURE = [
  "Expansion into more NJ markets",
  "Direct sourcing of parts (cutting out middlemen)",
  "District managers leading multiple locations",
  "Franchise-ready systems",
  "National brand growth",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-[#f9f9f9]">

        {/* Hero */}
        <section className="relative px-6 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#ffdad4] text-[#410000] text-[0.75rem] font-bold rounded-full tracking-widest uppercase mb-6">
                Our Story
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.05]" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Built on Risk.<br />
                <span className="text-red-700">Driven by Trust.</span>
              </h1>
              <p className="text-[#603e39] text-lg leading-relaxed mb-8">
                Newark & Passaic&apos;s Most Trusted Same-Day Phone Repair. 30–45 Minute Repairs · 1,000+ Devices Fixed Monthly · Trusted by Thousands Across New Jersey.
              </p>
              <Link href="/book" className="bg-primary-gradient text-white font-bold px-8 py-4 rounded-xl hover:brightness-110 transition-all shadow-primary inline-flex items-center gap-2">
                Get Your Device Fixed
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
                <div className="text-center text-zinc-500">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"/></svg>
                  <p className="text-sm opacity-40">Add founder photo here</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-y border-zinc-100 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black text-zinc-900 mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>{s.value}</div>
                <div className="text-xs text-[#603e39] uppercase tracking-widest font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder story */}
        <section className="py-24 bg-[#f9f9f9] px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-red-700 font-bold tracking-[0.2em] text-sm mb-4 uppercase">Meet the Founder</p>
              <h2 className="text-4xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Meet Rey
              </h2>
              <div className="space-y-5 text-[#603e39] leading-relaxed text-sm">
                <p>Talk N Fix Wireless didn&apos;t start with funding or a big team. <strong className="text-zinc-900">It started with risk.</strong></p>
                <p>In 2014, after years of buying, selling, unlocking, and wholesaling phones, Rey opened his first location. At the time, he was working at Wells Fargo — until he lost that job for focusing more on building the business.</p>
                <p>No customers. No guaranteed income. Bills stacking up. There were moments he sat alone in the shop thinking he made the wrong decision.</p>
                <p><strong className="text-zinc-900">Instead of quitting, he doubled down.</strong></p>
                <p>He reached out to people directly, built relationships, and focused on one thing: delivering fast, high-quality service people could trust. That mindset became the foundation of Talk N Fix Wireless.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-card border border-zinc-100">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>
                This Is Not Your Typical Repair Shop
              </h3>
              <ul className="space-y-4">
                {STANDARDS.map(s => (
                  <li key={s} className="flex items-start gap-3 text-[#603e39] text-sm">
                    <span className="w-5 h-5 rounded-full bg-red-700/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[#603e39] text-xs italic border-t border-zinc-100 pt-4">
                Most shops fix phones. We built a system that delivers results every time.
              </p>
            </div>
          </div>
        </section>

        {/* Areas served */}
        <section className="py-16 bg-[#f3f3f3] px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Serving Newark, Passaic & Surrounding Areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {["Newark NJ","Passaic NJ","Clifton NJ","Paterson NJ","East Orange NJ","Bloomfield NJ","Irvington NJ","Belleville NJ","East Rutherford NJ","Hasbrouck Heights NJ","Wallington NJ","Lodi NJ","Kearny NJ","Montclair NJ","Harrison NJ","Hackensack NJ","Paramus NJ","Elizabeth NJ"].map(area => (
                <span key={area} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-[#603e39] text-sm shadow-sm">{area}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Why customers + Future */}
        <section className="py-16 bg-white px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>Why Customers Choose Us</h2>
              <ul className="space-y-4">
                {REASONS.map(r => (
                  <li key={r} className="flex items-start gap-3 text-[#603e39] text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Built for Growth. <span className="text-red-700">Built to Lead.</span>
              </h2>
              <p className="text-[#603e39] text-sm leading-relaxed mb-6">
                Talk N Fix Wireless is not just another repair shop. We are building one of the most trusted phone repair brands in New Jersey — with plans to expand across new cities and eventually nationwide.
              </p>
              <ul className="space-y-4">
                {FUTURE.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[#603e39] text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#0050d7]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#0050d7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#f3f3f3] px-6">
          <div className="max-w-4xl mx-auto bg-primary-gradient rounded-[2.5rem] p-12 text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 relative z-10" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Get Your Phone Fixed Today
            </h2>
            <p className="text-white/80 mb-8 relative z-10 max-w-xl mx-auto">
              Don&apos;t risk your device with low-quality repair shops. Trust a team that repairs over 1,000 devices every month.
            </p>
            <Link href="/locations" className="bg-white text-red-700 font-bold px-10 py-4 rounded-xl hover:scale-105 transition-transform inline-block relative z-10">
              Find Your Nearest Location
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
