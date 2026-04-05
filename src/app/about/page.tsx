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
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-3xl" style={{ fontFamily: "Space Grotesk" }}>
              Built on Risk.<br /><span className="text-gradient">Driven by Trust.</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
              Newark & Passaic&apos;s Most Trusted Same-Day Phone Repair. 30–45 Minute Repairs · 1,000+ Devices Fixed Monthly · Trusted by Thousands Across New Jersey.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-[#0f0f0f] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: "Space Grotesk" }}>{s.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder story */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>
                Meet Rey — <span className="text-gradient">Founder</span>
              </h2>
              <div className="space-y-5 text-zinc-400 leading-relaxed">
                <p>Talk N Fix Wireless didn&apos;t start with funding or a big team. <strong className="text-white">It started with risk.</strong></p>
                <p>In 2014, after years of buying, selling, unlocking, and wholesaling phones, Rey opened his first location. At the time, he was working at Wells Fargo — until he lost that job for focusing more on building the business.</p>
                <p>No customers. No guaranteed income. Bills stacking up. There were moments he sat alone in the shop thinking he made the wrong decision.</p>
                <p><strong className="text-white">Instead of quitting, he doubled down.</strong></p>
                <p>He reached out to people directly, built relationships, and focused on one thing: delivering fast, high-quality service people could trust. That mindset became the foundation of Talk N Fix Wireless.</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-3xl p-10 border border-white/5">
              <h3 className="text-2xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>
                This Is Not Your Typical Repair Shop
              </h3>
              <ul className="space-y-4">
                {STANDARDS.map(s => (
                  <li key={s} className="flex items-start gap-3 text-zinc-400 text-sm">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span> {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-zinc-500 text-sm italic">
                Most shops fix phones. We built a system that delivers results every time.
              </p>
            </div>
          </div>
        </section>

        {/* Areas served */}
        <section className="py-16 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-8" style={{ fontFamily: "Space Grotesk" }}>
              Serving Newark, Passaic & Surrounding Areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {["Newark NJ","Passaic NJ","Clifton NJ","Paterson NJ","East Orange NJ","Bloomfield NJ","Irvington NJ","Belleville NJ","East Rutherford NJ","Hasbrouck Heights NJ","Wallington NJ","Lodi NJ","Kearny NJ","Montclair NJ","Harrison NJ","Hackensack NJ","Paramus NJ","Elizabeth NJ"].map(area => (
                <span key={area} className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/5 text-zinc-400 text-sm">{area}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Why customers choose us */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>Why Customers Choose Us</h2>
              <ul className="space-y-4">
                {REASONS.map(r => (
                  <li key={r} className="flex items-start gap-3 text-zinc-400 text-sm">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span> {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>
                Built for Growth. <span className="text-gradient">Built to Lead.</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Talk N Fix Wireless is not just another repair shop. We are building one of the most trusted phone repair brands in New Jersey — with plans to expand across new cities and eventually nationwide.
              </p>
              <ul className="space-y-4">
                {FUTURE.map(f => (
                  <li key={f} className="flex items-start gap-3 text-zinc-400 text-sm">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0f0f0f] text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "Space Grotesk" }}>Get Your Phone Fixed Today</h2>
            <p className="text-zinc-500 mb-8">Don&apos;t risk your device with low-quality repair shops. Trust a team that repairs over 1,000 devices every month.</p>
            <Link href="/locations" className="bg-gradient-primary px-10 py-4 rounded-xl text-white font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] inline-block">
              Find Your Nearest Location →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
