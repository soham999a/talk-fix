"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SERVICES, LOCATIONS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [repairsOpen, setRepairsOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav shadow-nav" : "bg-white/90 backdrop-blur-xl"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tight text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>
          Talk N&apos; Fix Wireless
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative" onMouseEnter={() => setRepairsOpen(true)} onMouseLeave={() => setRepairsOpen(false)}>
            <button className="text-red-700 font-bold border-b-2 border-red-700 pb-0.5 text-sm flex items-center gap-1">
              Repair Services
              <svg className={`w-3 h-3 transition-transform ${repairsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {repairsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white rounded-2xl shadow-card border border-zinc-100 p-6 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] font-bold text-red-700 tracking-widest uppercase mb-3">Popular</p>
                  {SERVICES.filter(s => s.popular).map(s => (
                    <Link key={s.id} href={`/services/${s.id}`} className="flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-50 text-sm text-zinc-600 hover:text-zinc-900 transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                      {s.title}
                    </Link>
                  ))}
                </div>
                <div className="border-l border-zinc-100 pl-6">
                  <p className="text-[10px] font-bold text-red-700 tracking-widest uppercase mb-3">All Services</p>
                  {SERVICES.filter(s => !s.popular).slice(0, 6).map(s => (
                    <Link key={s.id} href={`/services/${s.id}`} className="flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-50 text-sm text-zinc-600 hover:text-zinc-900 transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 flex-shrink-0" />
                      {s.title}
                    </Link>
                  ))}
                  <Link href="/services" className="mt-2 block text-xs text-red-700 font-bold hover:underline">View all →</Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setLocationsOpen(true)} onMouseLeave={() => setLocationsOpen(false)}>
            <button className="text-zinc-600 font-medium hover:text-red-600 transition-colors text-sm flex items-center gap-1">
              Store Locations
              <svg className={`w-3 h-3 transition-transform ${locationsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {locationsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-card border border-zinc-100 p-3">
                {LOCATIONS.map(loc => (
                  <Link key={loc.id} href={`/locations#${loc.id}`} className="block p-3 rounded-xl hover:bg-zinc-50 transition-all">
                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{loc.city}</p>
                    <p className="text-sm font-semibold text-zinc-900">{loc.address}</p>
                    <p className="text-xs text-zinc-500">{loc.phone}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="text-zinc-600 font-medium hover:text-red-600 transition-colors text-sm">About Us</Link>
          <Link href="/blog" className="text-zinc-600 font-medium hover:text-red-600 transition-colors text-sm">Blog</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Call Now with location dropdown */}
          <div className="relative" onMouseEnter={() => setCallOpen(true)} onMouseLeave={() => setCallOpen(false)}>
            <button
              onClick={() => setCallOpen(!callOpen)}
              className="text-zinc-600 font-semibold text-sm hover:text-red-600 transition-colors px-4 py-2 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
              </svg>
              Call Now
              <svg className={`w-3 h-3 transition-transform ${callOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>

            {/* Location dropdown */}
            {callOpen && (
              <div className="absolute top-full right-0 mt-1 w-72 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-100 overflow-hidden z-50">
                <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-100">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Choose a Location to Call</p>
                </div>
                {LOCATIONS.map(loc => (
                  <a
                    key={loc.id}
                    href={`tel:${loc.phone.replace(/-/g, "")}`}
                    className="flex items-center justify-between px-4 py-3.5 hover:bg-red-50 transition-colors group border-b border-zinc-50 last:border-0"
                  >
                    <div>
                      <p className="text-xs font-bold text-red-700 uppercase tracking-wider">{loc.city}</p>
                      <p className="text-sm font-semibold text-zinc-900">{loc.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-700 group-hover:text-red-700 transition-colors">{loc.phone}</span>
                      <div className="w-7 h-7 rounded-full bg-red-700/10 group-hover:bg-red-700 flex items-center justify-center transition-colors">
                        <svg className="w-3.5 h-3.5 text-red-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link href="/book" className="bg-primary-gradient text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg hover:brightness-110 transition-all active:scale-95">
            Get Quote
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className={`w-5 h-0.5 bg-zinc-900 mb-1.5 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-0.5 bg-zinc-900 mb-1.5 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-zinc-900 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 px-5 py-5 space-y-4 max-h-[85vh] overflow-y-auto">

          {/* Call Now — location list at top for mobile */}
          <div>
            <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-3">Call a Location</p>
            <div className="space-y-2">
              {LOCATIONS.map(loc => (
                <a
                  key={loc.id}
                  href={`tel:${loc.phone.replace(/-/g, "")}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-red-50 active:bg-red-100 transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{loc.city}</p>
                    <p className="text-sm font-semibold text-zinc-900 truncate">{loc.address}</p>
                    <p className="text-xs text-zinc-500">{loc.phone}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-red-700/10 group-hover:bg-red-700 flex items-center justify-center transition-colors flex-shrink-0 ml-3">
                    <svg className="w-4 h-4 text-red-700 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Repairs */}
          <div className="border-t border-zinc-100 pt-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Repairs</p>
            <div className="grid grid-cols-2 gap-1">
              {SERVICES.slice(0, 6).map(s => (
                <Link key={s.id} href={`/services/${s.id}`} onClick={() => setMobileOpen(false)}
                  className="text-zinc-600 hover:text-red-700 text-sm py-1.5 px-2 rounded-lg hover:bg-red-50 transition-all truncate">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="border-t border-zinc-100 pt-4 grid grid-cols-2 gap-2">
            {[["Store Locations", "/locations"], ["About Us", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className="text-zinc-600 text-sm py-2 px-3 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-all">
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t border-zinc-100 pt-4">
            <Link href="/book" onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-primary-gradient text-white font-bold px-5 py-3.5 rounded-xl text-sm">
              Book Repair — Get Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
