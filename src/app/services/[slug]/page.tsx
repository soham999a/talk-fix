import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES, FAQS, LOCATIONS } from "@/lib/data";

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find(s => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.title} in Newark & Passaic NJ`,
    description: `Professional ${service.title.toLowerCase()} in Newark and Passaic NJ. Same-day service. 1-year warranty. Walk-ins welcome. 5 locations.`,
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
      <main className="pt-20 bg-[#f9f9f9]">

        {/* Hero */}
        <section className="relative px-6 py-20 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
            <Link href="/" className="hover:text-red-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-red-700 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-zinc-900 font-medium">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffdad4] text-[#410000] text-[0.75rem] font-bold rounded-full tracking-widest uppercase mb-6">
                Professional Service
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-5 leading-[1.05]" style={{ fontFamily: "Plus Jakarta Sans" }}>
                {service.title}<br />
                <span className="text-red-700">Newark & Passaic NJ</span>
              </h1>
              <div className="flex flex-wrap gap-3 mb-6">
                {[`${service.time}`, "Same-Day Service", "1-Year Warranty", "Walk-ins Welcome"].map(b => (
                  <span key={b} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm text-zinc-700 font-medium shadow-sm">{b}</span>
                ))}
              </div>
              <p className="text-[#603e39] text-lg leading-relaxed mb-8">{service.description}</p>
              <div className="flex gap-4">
                <Link href="/book" className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-primary">
                  Book This Repair
                </Link>
                <Link href="/locations" className="px-8 py-4 rounded-xl border border-zinc-200 text-zinc-700 font-bold hover:bg-zinc-50 transition-all">
                  Find a Location
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
                <div className="text-center text-zinc-500">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>
                  <p className="text-sm opacity-40">Add service photo here</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white p-5 rounded-2xl shadow-card max-w-[200px] border border-zinc-100">
                <p className="font-bold text-xs text-red-700 uppercase tracking-wider mb-1">Est. Time</p>
                <p className="text-xl font-black text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>{service.time}</p>
                <p className="text-[#603e39] text-xs mt-1">While you wait in-store</p>
              </div>
            </div>
          </div>
        </section>

        {/* What we fix + Why us */}
        <section className="py-16 bg-[#f3f3f3] px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>What We Repair</h2>
              <ul className="space-y-4">
                {["Cracked or shattered screens", "Battery draining quickly or overheating", "Charging port issues", "Water damage diagnostics", "Camera, speaker, and button issues", "Software and performance issues"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[#603e39] text-sm">
                    <span className="w-5 h-5 rounded-full bg-red-700/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>Why Choose Us</h2>
              <ul className="space-y-4">
                {["Same-day service on most repairs (30–60 minutes)", "Certified technicians with years of experience", "OEM-grade & premium aftermarket parts", "1-year warranty on all repairs", "Free diagnostic — no charge to assess your device", "Data privacy respected throughout every repair"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[#603e39] text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#0050d7]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#0050d7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-16 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 text-center" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Get {service.title} Near You
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOCATIONS.map(loc => (
                <div key={loc.id} className="bg-[#f3f3f3] rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-zinc-200">
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{loc.city}</span>
                  <h3 className="text-lg font-bold text-zinc-900 mt-1 mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>{loc.address}</h3>
                  <p className="text-[#603e39] text-xs mb-4">{loc.cityStateZip}</p>
                  <a href={`tel:${loc.phone.replace(/-/g,"")}`} className="text-zinc-700 font-semibold text-sm hover:text-red-700 transition-colors block mb-4">{loc.phone}</a>
                  <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="block text-center py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-bold hover:brightness-110 transition-all">
                    Get Directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#f3f3f3] px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8 text-center" style={{ fontFamily: "Plus Jakarta Sans" }}>Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.slice(0, 6).map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <p className="text-zinc-900 font-bold text-sm mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>{faq.q}</p>
                  <p className="text-[#603e39] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-8" style={{ fontFamily: "Plus Jakarta Sans" }}>Related Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(s => (
                <Link key={s.id} href={`/services/${s.id}`} className="bg-[#f3f3f3] rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all group block border border-transparent hover:border-zinc-200">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-zinc-600 group-hover:bg-red-700 group-hover:text-white transition-colors mb-4 shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>
                  </div>
                  <h3 className="font-bold text-zinc-900 group-hover:text-red-700 transition-colors text-sm" style={{ fontFamily: "Plus Jakarta Sans" }}>{s.title}</h3>
                  <p className="text-[#603e39] text-xs mt-1">{s.time} · Same Day</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
