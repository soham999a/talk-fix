"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SERVICES, LOCATIONS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [repairsOpen, setRepairsOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

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
          <a href="tel:9737785900" className="text-zinc-600 font-semibold text-sm hover:text-red-600 transition-colors px-4 py-2">
            Call Now
          </a>
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
        <div className="md:hidden bg-white border-t border-zinc-100 px-6 py-6 space-y-4">
          <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Repairs</p>
          {SERVICES.slice(0, 6).map(s => (
            <Link key={s.id} href={`/services/${s.id}`} onClick={() => setMobileOpen(false)} className="block text-zinc-600 hover:text-zinc-900 text-sm py-1">
              {s.title}
            </Link>
          ))}
          <div className="border-t border-zinc-100 pt-4 space-y-3">
            <Link href="/locations" onClick={() => setMobileOpen(false)} className="block text-zinc-600 text-sm">Store Locations</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-zinc-600 text-sm">About Us</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block text-zinc-600 text-sm">Blog</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-zinc-600 text-sm">Contact</Link>
          </div>
          <Link href="/book" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-primary-gradient text-white font-bold px-5 py-3 rounded-xl">
            Get Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
