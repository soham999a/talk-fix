import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LOCATIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locations — 5 Stores in Newark & Passaic NJ",
  description: "Find your nearest Talk N Fix Wireless location. 5 stores across Newark and Passaic NJ. Walk-ins welcome, no appointment needed.",
};

export default function LocationsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
              Find Us
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={{ fontFamily: "Space Grotesk" }}>
              5 Locations.<br /><span className="text-gradient">Always Near You.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              Walk-ins always welcome. No appointment needed. Open 7 days a week.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LOCATIONS.map(loc => (
                <div key={loc.id} id={loc.id} className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 card-glow">
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider">{loc.city}</span>
                    <span className="text-xs text-emerald-400 font-semibold">● Open Now</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "Space Grotesk" }}>{loc.address}</h2>
                  <p className="text-zinc-400 text-sm mb-1">{loc.cityStateZip}</p>
                  {loc.note && <p className="text-zinc-600 text-xs mb-6">{loc.note}</p>}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <span>🕐</span>
                      <div>
                        <p>{loc.hours.weekday}</p>
                        <p>{loc.hours.weekend}</p>
                      </div>
                    </div>
                    <a href={`tel:${loc.phone.replace(/-/g,"")}`} className="flex items-center gap-3 text-white font-semibold hover:text-blue-400 transition-colors text-sm">
                      <span>📞</span> {loc.phone}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-emerald-400 font-medium">
                      <span>✓</span> Walk-ins Welcome
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-3 rounded-xl bg-gradient-primary text-white text-sm font-bold hover:brightness-110 transition-all">
                      Get Directions
                    </a>
                    <a href={`tel:${loc.phone.replace(/-/g,"")}`}
                      className="flex-1 text-center py-3 rounded-xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all">
                      Call Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
