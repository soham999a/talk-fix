import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us — Founded 2014 | Talk N Fix Wireless Newark NJ",
  description: "Talk N Fix Wireless was founded in 2014 by Rey in Newark NJ. From one store to 4 locations across Newark and Passaic NJ, repairing 1,000+ devices monthly with 6,500+ Google reviews. Certified technicians, OEM parts.",
  alternates: { canonical: "https://www.talknfixwireless.com/about" },
  openGraph: {
    title: "About Talk N Fix Wireless — Founded 2014 in Newark NJ",
    description: "Founded 2014 by Rey. 4 locations in Newark & Passaic NJ. 6,500+ Google reviews. 1,000+ repairs per month.",
    url: "https://www.talknfixwireless.com/about",
    images: [{ url: "/team.png", alt: "Talk N Fix Wireless team" }],
  },
};

const STATS = [
  { value: "2014", label: "Founded" },
  { value: "1,000+", label: "Repairs / Month" },
  { value: "4", label: "Locations" },
  { value: "6,500+", label: "Google Reviews" },
];

const STANDARDS = [
  "Structured repair systems, not guesswork",
  "Corporate-level standards across all locations",
  "Highly trained, certified technicians",
  "Fast 30-45 Minute turnaround",
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
      <main className="pt-20 bg-stone-50">

        {/* Hero */}
        <section className="relative px-4 sm:px-6 py-12 sm:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full tracking-widest uppercase mb-6">
                Our Story
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Built on Risk.<br />
                <span className="text-red-700">Driven by Trust.</span>
              </h1>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                Founded in 2014, Talk N Fix Wireless provides professional, same-day phone and device repair from convenient locations in Newark and Passaic, trusted by customers across nearby New Jersey communities. Built on speed, quality, and trust.
              </p>
              <Link href="/book" className="bg-primary-gradient text-white font-bold px-8 py-4 rounded-xl hover:brightness-110 transition-all shadow-primary inline-flex items-center gap-2">
                Get Your Device Fixed
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/team.png"
                  alt="Talk N Fix Wireless team and founder Rey"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-y border-zinc-100 py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black text-zinc-900 mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>{s.value}</div>
                <div className="text-xs text-stone-600 uppercase tracking-widest font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder story */}
        <section className="py-14 sm:py-24 bg-stone-50 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
            <div>
              <p className="text-red-700 font-bold tracking-widest text-sm mb-4 uppercase">Meet the Founder</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Meet Rey
              </h2>
              <div className="space-y-5 text-stone-600 leading-relaxed text-sm">
                <p>Talk N Fix Wireless did not start with funding or a big team. <strong className="text-zinc-900">It started with risk.</strong></p>
                <p>In 2014, after years of buying, selling, unlocking, and wholesaling phones, Rey opened his first location. At the time, he was working at Wells Fargo until he lost that job for focusing more on building the business.</p>
                <p>No customers. No guaranteed income. Bills stacking up. There were moments he sat alone in the shop thinking he made the wrong decision.</p>
                <p><strong className="text-zinc-900">Instead of quitting, he doubled down.</strong></p>
                <p>He reached out to people directly, built relationships, and focused on one thing: delivering fast, high-quality service people could trust. That mindset became the foundation of Talk N Fix Wireless.</p>
              </div>
            </div>
            <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-card border border-zinc-100">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>
                This Is Not Your Typical Repair Shop
              </h3>
              <ul className="space-y-4">
                {STANDARDS.map(s => (
                  <li key={s} className="flex items-start gap-3 text-stone-600 text-sm">
                    <span className="w-5 h-5 rounded-full bg-red-700/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-stone-600 text-xs italic border-t border-zinc-100 pt-4">
                Most shops fix phones. We built a system that delivers results every time.
              </p>
            </div>
          </div>
        </section>

        {/* Areas served */}
        <section className="py-16 bg-zinc-100 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Serving Newark, Passaic &amp; Surrounding Areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {["Newark NJ","Passaic NJ","Clifton NJ","Paterson NJ","East Orange NJ","Bloomfield NJ","Irvington NJ","Belleville NJ","East Rutherford NJ","Hasbrouck Heights NJ","Wallington NJ","Lodi NJ","Kearny NJ","Montclair NJ","Harrison NJ","Hackensack NJ","Paramus NJ","Elizabeth NJ"].map(area => (
                <span key={area} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-stone-600 text-sm shadow-sm">{area}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Why customers + Future */}
        <section className="py-16 bg-white px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>Why Customers Choose Us</h2>
              <ul className="space-y-4">
                {REASONS.map(r => (
                  <li key={r} className="flex items-start gap-3 text-stone-600 text-sm">
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
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Talk N Fix Wireless is not just another repair shop. We are building one of the most trusted phone repair brands in New Jersey with plans to expand across new cities and eventually nationwide.
              </p>
              <ul className="space-y-4">
                {FUTURE.map(f => (
                  <li key={f} className="flex items-start gap-3 text-stone-600 text-sm">
                    <span className="w-5 h-5 rounded-full bg-blue-700/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-zinc-100 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-primary-gradient rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 relative z-10" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Get Your Phone Fixed Today
            </h2>
            <p className="text-white/80 mb-8 relative z-10 max-w-xl mx-auto">
              Do not risk your device with low-quality repair shops. Trust a team that repairs over 1,000 devices every month.
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
