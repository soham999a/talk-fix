import Link from "next/link";
import { LOCATIONS, SERVICES } from "@/lib/data";
import { Icons } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4" style={{ fontFamily: "Space Grotesk" }}>
              <span className="text-blue-500"><Icons.Zap /></span>
              <span className="text-white">Talk<span className="text-gradient">N</span>Fix</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-5">
              Newark & Passaic&apos;s trusted device repair experts. Fast, reliable, backed by a 1-year warranty.
            </p>
            <div className="flex gap-3">
              {["F", "I", "Y", "X"].map((s, i) => (
                <a key={i} href="#" aria-label="Social" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600/30 transition-all text-xs text-zinc-400 hover:text-white font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Services</h5>
            <ul className="space-y-3">
              {SERVICES.slice(0, 8).map(s => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`} className="text-zinc-500 hover:text-blue-400 transition-colors text-sm">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Locations</h5>
            <ul className="space-y-3">
              {LOCATIONS.map(loc => (
                <li key={loc.id}>
                  <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors text-sm">
                    {loc.address}, {loc.city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Hours</h5>
            <div className="space-y-2 text-sm text-zinc-500 mb-6">
              <p>Mon–Sat: 9am – 7:45pm</p>
              <p>Sun: 10am – 5:45pm</p>
              <p className="text-emerald-400 font-medium mt-3 flex items-center gap-1">
                <Icons.Check /> Walk-ins Welcome
              </p>
            </div>
            <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-3">Company</h5>
            <ul className="space-y-2">
              {[["About Us", "/about"], ["Blog", "/blog"], ["Contact", "/contact"], ["Privacy Policy", "/privacy-policy"], ["Terms", "/terms-and-conditions"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-zinc-500 hover:text-blue-400 transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
          <span>© 2026 Talk N Fix Wireless. All rights reserved. Newark & Passaic, NJ.</span>
          <span>Founded 2014 by Rey · 6,500+ Google Reviews</span>
        </div>
      </div>
    </footer>
  );
}
