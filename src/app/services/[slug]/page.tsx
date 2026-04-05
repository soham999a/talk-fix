import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES, FAQS, LOCATIONS } from "@/lib/data";
import { SERVICE_ICONS, Icons } from "@/components/Icons";

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find(s => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Newark & Passaic NJ`,
    description: `Professional ${service.title.toLowerCase()} in Newark and Passaic NJ. Same-day service in ${service.time}. 1-year warranty. Walk-ins welcome. 5 locations.`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find(s => s.id === slug);
  if (!service) notFound();

  const related = SERVICES.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-[#0a0a0a] overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-zinc-300">{service.title}</span>
            </div>
            <div className="max-w-3xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-6">
                {(() => { const Icon = SERVICE_ICONS[service.id] ?? Icons.Wrench; return <Icon />; })()}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: "Space Grotesk" }}>
                {service.title}<br />
                <span className="text-gradient">Newark & Passaic NJ</span>
              </h1>
              <div className="flex flex-wrap gap-3 mb-8">
                {[`⚡ ${service.time}`, "✓ Same-Day Service", "🛡️ 1-Year Warranty", "🚶 Walk-ins Welcome"].map(b => (
                  <span key={b} className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/10 text-sm text-zinc-300 font-medium">{b}</span>
                ))}
              </div>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">{service.description}</p>
              <div className="flex gap-4">
                <Link href="/book" className="bg-gradient-primary px-8 py-4 rounded-xl text-white font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  Book This Repair
                </Link>
                <Link href="/locations" className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                  Find a Location
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What we fix */}
        <section className="py-16 bg-[#0f0f0f]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>What We Repair</h2>
              <ul className="space-y-3">
                {["Cracked or shattered screens", "Battery draining quickly or overheating", "Charging port issues", "Water damage diagnostics", "Camera, speaker, and button issues", "Software and performance issues"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-zinc-400 text-sm">
                    <span className="text-emerald-400 flex-shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>Why Choose Us</h2>
              <ul className="space-y-3">
                {["Same-day service on most repairs (30–60 minutes)", "Certified technicians with years of experience", "OEM-grade & premium aftermarket parts", "1-year warranty on all repairs", "Free diagnostic — no charge to assess your device", "Data privacy respected throughout every repair"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-zinc-400 text-sm">
                    <span className="text-blue-400 flex-shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Locations for this service */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-8 text-center" style={{ fontFamily: "Space Grotesk" }}>
              Get {service.title} Near You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOCATIONS.map(loc => (
                <div key={loc.id} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{loc.city}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-1">{loc.address}</h3>
                  <p className="text-zinc-500 text-xs mb-4">{loc.cityStateZip}</p>
                  <a href={`tel:${loc.phone.replace(/-/g,"")}`} className="text-white font-semibold text-sm hover:text-blue-400 transition-colors block mb-4">📞 {loc.phone}</a>
                  <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" className="block text-center py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-bold hover:brightness-110 transition-all">
                    Get Directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#0f0f0f]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-8 text-center" style={{ fontFamily: "Space Grotesk" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5">
                  <p className="text-white font-semibold text-sm mb-2">{faq.q}</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-8" style={{ fontFamily: "Space Grotesk" }}>Related Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(s => {
                const Icon = SERVICE_ICONS[s.id] ?? Icons.Wrench;
                return (
                  <Link key={s.id} href={`/services/${s.id}`} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 card-glow group block">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-3">
                      <Icon />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{s.title}</h3>
                    <p className="text-zinc-500 text-xs mt-2">{s.time} · Same Day</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
