import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LOCATIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Store Locations — 5 Stores in Newark & Passaic NJ",
  description: "Find your nearest Talk N Fix Wireless location. 5 stores across Newark and Passaic NJ. Walk-ins welcome, no appointment needed.",
};

const REVIEWS = [
  { text: "Thought my iPhone was a total loss after it fell in the pool. Talk N Fix revived it in two days. Truly professional and honest service.", name: "Jessica M.", loc: "Google Local Guide · 2 weeks ago" },
  { text: "Best price for screen replacement in Jersey. Called 5 different places and they were the most reasonable and the fastest. 30 mins flat.", name: "Anthony G.", loc: "Verified Customer · 1 month ago" },
  { text: "Great service for my Samsung S22. They had the part in stock. The shop is super clean and the techs are very knowledgeable.", name: "Roberto S.", loc: "Local Business Owner · 3 months ago" },
];

export default function LocationsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-[#f9f9f9]">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left — store list */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-red-700 font-bold tracking-widest text-xs uppercase bg-red-700/5 px-3 py-1 rounded-full">New Jersey Premier Centers</span>
                <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 mt-3 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  Find Your Store
                </h1>
                <p className="text-[#603e39] text-lg">5 locations across Newark & Passaic NJ. Walk-ins always welcome — no appointment needed.</p>
              </div>

              <div className="space-y-3">
                {LOCATIONS.map(loc => (
                  <div key={loc.id} id={loc.id} className="p-5 rounded-2xl bg-white border border-zinc-100 hover:border-red-700/30 transition-all cursor-pointer shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{loc.city}</span>
                        <h3 className="font-bold text-zinc-900 text-lg" style={{ fontFamily: "Plus Jakarta Sans" }}>{loc.address}</h3>
                        <p className="text-[#603e39] text-sm">{loc.cityStateZip}{loc.note ? ` · ${loc.note}` : ""}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold flex-shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Open
                      </span>
                    </div>
                    <div className="flex items-start gap-3 mb-3 text-sm text-[#603e39]">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      <div>
                        <p>{loc.hours.weekday}</p>
                        <p>{loc.hours.weekend}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <a href={`tel:${loc.phone.replace(/-/g,"")}`} className="text-zinc-700 font-semibold text-sm hover:text-red-700 transition-colors">{loc.phone}</a>
                      <div className="flex gap-2">
                        <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"
                          className="bg-primary-gradient text-white text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-all">
                          Directions
                        </a>
                        <a href={`tel:${loc.phone.replace(/-/g,"")}`}
                          className="bg-[#0050d7] text-white text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-all">
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — map */}
            <div className="lg:col-span-7 h-[600px] rounded-3xl overflow-hidden shadow-xl bg-zinc-200 relative">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300">
                <div className="text-center text-zinc-500">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" strokeWidth={1}/></svg>
                  <p className="text-sm font-medium opacity-40">Google Maps embed</p>
                  <p className="text-xs opacity-30 mt-1">Newark & Passaic, NJ</p>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-5 py-4 rounded-2xl shadow-lg border border-white/50 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-600 text-sm">★★★★★</span>
                  <span className="font-bold text-sm text-zinc-900">4.9 Star Rating</span>
                </div>
                <p className="text-xs text-zinc-500 italic">&ldquo;Best screen repair in Passaic! Done in 20 minutes.&rdquo; — Maria R.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold text-zinc-900 text-center mb-12" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Trusted by the Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-8 bg-[#f3f3f3] rounded-3xl border border-white/40">
                <div className="flex text-amber-400 mb-4 text-sm">{"★★★★★"}</div>
                <p className="text-zinc-700 italic leading-relaxed text-sm mb-6">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-300" />
                  <div>
                    <p className="font-bold text-sm text-zinc-900">{r.name}</p>
                    <p className="text-xs text-[#603e39]">{r.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="https://www.google.com/search?q=Talk+N+Fix+Wireless" target="_blank" rel="noopener noreferrer"
              className="text-[#0050d7] font-bold underline underline-offset-4 text-sm hover:text-[#003da9] transition-colors">
              Read all 6,500+ reviews on Google
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 bg-[#f3f3f3]">
          <div className="max-w-4xl mx-auto bg-primary-gradient rounded-[2.5rem] p-12 text-center relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 relative z-10" style={{ fontFamily: "Plus Jakarta Sans" }}>Walk In Today</h2>
            <p className="text-white/80 mb-8 relative z-10">No appointment needed. Out in 30 minutes.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link href="/book" className="bg-white text-red-700 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform">Get a Quote First</Link>
              <Link href="/services" className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">View All Services</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
