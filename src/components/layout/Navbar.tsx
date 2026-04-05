"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SERVICES, LOCATIONS } from "@/lib/data";
import { Icons } from "@/components/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [repairsOpen, setRepairsOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass border-b border-white/10 shadow-[0_0_60px_rgba(37,99,235,0.08)]" : "bg-transparent"}`} style={{ height: 72 }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl" style={{ fontFamily: "Space Grotesk" }}>
          <span className="text-blue-500"><Icons.Zap /></span>
          <span className="text-white">Talk<span className="text-gradient">N</span>Fix</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Repairs Dropdown */}
          <div className="relative" onMouseEnter={() => setRepairsOpen(true)} onMouseLeave={() => setRepairsOpen(false)}>
            <button className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors py-6 text-sm font-medium">
              Repairs <Icons.ChevronDown />
            </button>
            {repairsOpen && (
              <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[560px] glass border border-white/10 rounded-2xl p-6 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-3">Popular Repairs</p>
                  {SERVICES.filter(s => s.popular).map(s => (
                    <Link key={s.id} href={`/services/${s.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-sm text-zinc-300 hover:text-white">
                      <span className="text-blue-400"><Icons.Phone /></span> {s.title}
                    </Link>
                  ))}
                </div>
                <div className="border-l border-white/5 pl-6">
                  <p className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-3">All Services</p>
                  {SERVICES.filter(s => !s.popular).slice(0, 6).map(s => (
                    <Link key={s.id} href={`/services/${s.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-sm text-zinc-300 hover:text-white">
                      <span className="text-blue-400"><Icons.Wrench /></span> {s.title}
                    </Link>
                  ))}
                  <Link href="/services" className="mt-3 block text-xs text-blue-400 hover:text-blue-300 font-semibold">View all services →</Link>
                </div>
              </div>
            )}
          </div>

          {/* Locations Dropdown */}
          <div className="relative" onMouseEnter={() => setLocationsOpen(true)} onMouseLeave={() => setLocationsOpen(false)}>
            <button className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors py-6 text-sm font-medium">
              Locations <Icons.ChevronDown />
            </button>
            {locationsOpen && (
              <div className="absolute top-[72px] left-0 w-72 glass border border-white/10 rounded-2xl p-4 space-y-1">
                {LOCATIONS.map(loc => (
                  <Link key={loc.id} href={`/locations#${loc.id}`} className="block p-3 rounded-lg hover:bg-white/5 transition-all">
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{loc.city}</div>
                    <div className="text-sm text-white font-medium">{loc.address}</div>
                    <div className="text-xs text-zinc-500">{loc.phone}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">About</Link>
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Blog</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:9737785900" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors font-medium">
            <span className="text-blue-400"><Icons.PhoneCall /></span> 973-778-5900
          </a>
          <Link href="/book" className="bg-gradient-primary px-5 py-2.5 rounded-lg text-white text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Book Repair
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10 px-6 py-6 space-y-4">
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Repairs</p>
          {SERVICES.slice(0, 6).map(s => (
            <Link key={s.id} href={`/services/${s.id}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 text-zinc-300 hover:text-white text-sm py-1">
              <span className="text-blue-400"><Icons.Wrench /></span> {s.title}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-4 space-y-3">
            <Link href="/locations" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm"><span className="text-blue-400"><Icons.MapPin /></span> Locations</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-zinc-300 hover:text-white text-sm">About Us</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block text-zinc-300 hover:text-white text-sm">Blog</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-zinc-300 hover:text-white text-sm">Contact</Link>
          </div>
          <Link href="/book" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-gradient-primary px-5 py-3 rounded-lg text-white font-bold">
            Book Repair
          </Link>
        </div>
      )}
    </nav>
  );
}
