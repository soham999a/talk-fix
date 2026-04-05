import { LOCATIONS } from "@/lib/data";
import { Icons } from "@/components/Icons";

export default function Locations() {
  return (
    <section id="locations" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            Find Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: "Space Grotesk" }}>
            5 Locations. <span className="text-gradient">Always Near You.</span>
          </h2>
          <p className="text-zinc-500">Walk-ins always welcome. No appointment needed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((loc) => (
            <div key={loc.id} id={loc.id} className="bg-[#1a1a1a] rounded-2xl p-7 border border-white/5 hover:border-blue-600/20 transition-all card-glow">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  {loc.city}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Open
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk" }}>{loc.address}</h3>
              <p className="text-zinc-500 text-sm mb-1">{loc.cityStateZip}</p>
              {loc.note && <p className="text-zinc-600 text-xs mb-5">{loc.note}</p>}

              <div className="flex items-start gap-3 mb-4">
                <span className="text-zinc-500 mt-0.5"><Icons.Clock /></span>
                <div className="text-sm text-zinc-400 space-y-0.5">
                  <p>{loc.hours.weekday}</p>
                  <p>{loc.hours.weekend}</p>
                </div>
              </div>

              <a href={`tel:${loc.phone.replace(/-/g, "")}`} className="flex items-center gap-2 text-white font-semibold text-sm mb-5 hover:text-blue-400 transition-colors">
                <span className="text-blue-400"><Icons.PhoneCall /></span> {loc.phone}
              </a>

              <div className="flex gap-3">
                <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-xl bg-gradient-primary text-white text-sm font-bold hover:brightness-110 transition-all">
                  Get Directions
                </a>
                <a href={`tel:${loc.phone.replace(/-/g, "")}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all">
                  Call Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
