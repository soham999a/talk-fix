import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Repair Services — iPhone, Samsung, iPad, Laptop | Newark & Passaic NJ",
  description: "Professional device repair services in Newark & Passaic NJ. iPhone screen repair from $79, Samsung repair from $89, battery replacement from $49. Same-day service, 1-year warranty available. Walk-ins welcome.",
  alternates: { canonical: "https://www.talknfixwireless.com/services" },
  openGraph: {
    title: "Phone Repair Services in Newark & Passaic NJ | Talk N Fix Wireless",
    description: "iPhone, Samsung, iPad, laptop repair. Same-day service. 1-year warranty available. 4 locations in Newark & Passaic NJ.",
    url: "https://www.talknfixwireless.com/services",
    images: [{ url: "/secondpic.png", alt: "Phone repair services at Talk N Fix Wireless" }],
  },
};

const PRICING: Record<string, string> = {
  "iphone-screen-repair": "FROM $79",
  "samsung-screen-repair": "FROM $89",
  "ipad-screen-repair": "FROM $119",
  "battery-replacement": "FROM $49",
  "charging-port-repair": "FROM $59",
  "back-glass-repair": "FROM $79",
  "game-console-hdmi-repair": "FROM $89",
  "water-damage-repair": "ESTIMATE",
  "diagnostic-no-power": "FREE",
  "laptop-repair": "FROM $99",
  "computer-repair": "FROM $59",
};

const BENTO_SERVICES = [
  {
    id: "iphone-screen-repair",
    title: "Screen Replacement",
    desc: "OLED and Retina displays restored to original factory specifications. No ghost touches, no dead pixels. Just flawless clarity.",
    wide: true,
    accent: "primary",
  },
  {
    id: "battery-replacement",
    title: "Battery Swap",
    desc: "Certified cells that restore your device's all-day performance and peak capacity.",
    wide: false,
    accent: "secondary",
  },
  {
    id: "charging-port-repair",
    title: "Charging Port",
    desc: "Addressing connectivity issues with micro-soldering and high-grade port components.",
    wide: false,
    accent: "tertiary",
  },
  {
    id: "water-damage-repair",
    title: "Water Damage",
    desc: "Ultrasonic cleaning and chemical stabilization for liquid-exposed electronics.",
    wide: false,
    accent: "red",
  },
  {
    id: "ipad-screen-repair",
    title: "Camera Repair",
    desc: "Focus calibration and lens replacement for crystal clear captures.",
    wide: false,
    accent: "primary",
  },
];


export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-stone-50">

        {/* Hero */}
        <section className="relative px-4 sm:px-4 sm:px-6 py-12 sm:py-12 sm:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-6 sm:gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-950 text-[0.75rem] font-bold rounded-full tracking-widest uppercase mb-6">
                Professional Craftsmanship
              </span>
              <h1 className="text-4xl sm:text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.05]" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Precision <span className="text-red-700">Repair</span> for the Modern Era.
              </h1>
              <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-xl">
                Your device is an extension of yourself. We treat every screen, circuit, and battery with laboratory-grade precision and editorial attention to detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl hover:brightness-110 transition-all">
                  Book Your Repair
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <div className="flex items-center gap-3 px-4 sm:px-4 sm:px-6 py-4 rounded-xl bg-zinc-100 border border-red-200/20">
                  <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
                  <span className="font-bold text-zinc-900 text-sm">Warranty Guaranteed</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="/secondpic.png"
                  alt="Talk N Fix Wireless repair service"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl max-w-[220px] border border-zinc-100">
                <p className="font-bold text-xs text-red-700 uppercase tracking-wider mb-1">Live Status</p>
                <p className="text-2xl font-black text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>98% Success</p>
                <p className="text-stone-600 text-xs mt-1">On water damage recoveries this month.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bento services grid */}
        <section className="px-4 sm:px-6 py-12 sm:py-12 sm:py-20 bg-zinc-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Specialized Expertise</h2>
              <p className="text-stone-600">Every component has its own protocol. We master them all.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Wide card */}
              <div className="md:col-span-2 bg-white p-5 sm:p-8 rounded-[2rem] group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-red-700/10 text-red-700 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Screen Replacement</h3>
                  <p className="text-stone-600 max-w-md mb-6 leading-relaxed">OLED and Retina displays restored to original factory specifications. No ghost touches, no dead pixels. Just flawless clarity.</p>
                  <Link href="/services/iphone-screen-repair" className="text-red-700 font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all text-sm">
                    View Detail <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/></svg>
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 group-hover:opacity-10 transition-opacity flex items-center justify-center">
                  <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.3}><rect x="5" y="2" width="14" height="20" rx="2"/></svg>
                </div>
              </div>
              {/* Battery */}
              <div className="bg-white p-5 sm:p-8 rounded-[2rem] group hover:shadow-2xl transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-blue-700/10 text-blue-700 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><path d="M7 11h4M9 9v4"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Battery Swap</h3>
                <p className="text-stone-600 mb-6 leading-relaxed text-sm">Certified cells that restore your device&apos;s all-day performance and peak capacity.</p>
                <Link href="/services/battery-replacement" className="text-blue-700 font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all text-sm">
                  Check Price <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/></svg>
                </Link>
              </div>
              {/* Charging port */}
              <div className="bg-white p-5 sm:p-8 rounded-[2rem] group hover:shadow-2xl transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-stone-600 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 8V2M15 8V2M18 8H6a2 2 0 0 0-2 2v3a6 6 0 0 0 12 0v-3a2 2 0 0 0-2-2ZM12 22v-5"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Charging Port</h3>
                <p className="text-stone-600 mb-6 leading-relaxed text-sm">Addressing connectivity issues with micro-soldering and high-grade port components.</p>
              </div>
              {/* Camera + Water damage */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-5 sm:p-8 rounded-[2rem] group hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-red-700/10 text-red-700 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Camera Repair</h3>
                  <p className="text-stone-600 leading-relaxed text-sm">Focus calibration and lens replacement for crystal clear captures.</p>
                </div>
                <div className="bg-red-700 text-white p-5 sm:p-8 rounded-[2rem] group hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14Z"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Water Damage</h3>
                  <p className="text-white/80 leading-relaxed text-sm">Ultrasonic cleaning and chemical stabilization for liquid-exposed electronics.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All services grid */}
        <section className="px-4 sm:px-6 py-12 sm:py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-10" style={{ fontFamily: "Plus Jakarta Sans" }}>All Repair Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map(s => (
                <Link key={s.id} href={`/services/${s.id}`}
                  className="group bg-zinc-100 p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 block">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-zinc-700 group-hover:bg-red-700 group-hover:text-white transition-colors shadow-sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>
                    </div>
                    <span className="text-stone-600 text-xs tracking-widest font-bold">{PRICING[s.id] ?? "CALL"}</span>
                  </div>
                  <h3 className="font-bold text-zinc-900 mb-2 text-base" style={{ fontFamily: "Plus Jakarta Sans" }}>{s.title}</h3>
                  <p className="text-stone-600 text-xs leading-relaxed mb-4">{s.description}</p>
                  <span className="text-red-700 font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Details <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="px-4 sm:px-6 py-14 sm:py-24 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[0.75rem] font-bold tracking-[0.2em] text-stone-600 uppercase mb-4 block">Transparent Pricing</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>Major Model Estimates</h2>
            <p className="text-stone-600 max-w-xl mx-auto mb-8">Pricing varies by model and part. See our full pricing page or call your nearest location for an exact quote — always free, always honest.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="bg-primary-gradient text-white font-bold px-8 py-4 rounded-xl hover:brightness-110 transition-all shadow-lg">
                View Full Pricing →
              </Link>
              <a href="tel:9737785900" className="border-2 border-zinc-200 text-zinc-700 font-bold px-8 py-4 rounded-xl hover:bg-zinc-50 transition-all">
                Call for Exact Quote
              </a>
            </div>
          </div>
        </section>

        {/* Process steps â€” dark */}
        <section className="px-4 sm:px-6 py-14 sm:py-14 sm:py-24 bg-zinc-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-6 sm:gap-12 relative">
              <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-white/10" />
              {[
                { n: "1", title: "Book Online", desc: "Select your model and issue. Get an instant preliminary quote and reserve your time slot." },
                { n: "2", title: "Drop Off", desc: "Visit any of our 4 NJ locations. Our team will check your device in within 5 minutes." },
                { n: "3", title: "Expert Repair", desc: "Certified technicians perform the repair in our clean, professional workspace." },
                { n: "4", title: "Quality Check", desc: "Every device undergoes a 20-point functionality test before handoff with your new warranty." },
              ].map((step, i) => (
                <div key={i} className="relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-red-700 text-white flex items-center justify-center font-black text-xl mb-8 border-4 border-zinc-900 shadow-lg group-hover:scale-110 transition-transform" style={{ fontFamily: "Plus Jakarta Sans" }}>
                    {step.n}
                  </div>
                  <h4 className="text-xl font-bold mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>{step.title}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-12 sm:py-12 sm:py-20 bg-stone-50">
          <div className="max-w-4xl mx-auto text-center bg-white p-6 sm:p-6 sm:p-12 rounded-[3rem] shadow-card relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-700/5 rounded-full blur-3xl" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-5" style={{ fontFamily: "Plus Jakarta Sans" }}>Ready to fix your device?</h2>
            <p className="text-stone-600 text-lg mb-10 max-w-xl mx-auto">Join over 6,500 satisfied customers who trust Talk N Fix for their mobile repair needs.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/book" className="bg-primary-gradient text-white px-10 py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all">Start My Repair</Link>
              <Link href="/locations" className="bg-zinc-200 text-zinc-900 px-10 py-4 rounded-xl font-bold text-base hover:bg-zinc-200 transition-colors">Find a Store</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

