"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES, LOCATIONS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [repairsOpen, setRepairsOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const pathname = usePathname();

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("nav")) {
        setRepairsOpen(false);
        setLocationsOpen(false);
        setCallOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-dropdown]")) {
        setRepairsOpen(false);
        setLocationsOpen(false);
        setCallOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  const linkCls = (path: string) =>
    `text-sm font-medium transition-colors whitespace-nowrap ${
      isActive(path)
        ? "text-red-700 border-b-2 border-red-700 pb-0.5"
        : "text-zinc-600 hover:text-red-600"
    }`;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : "bg-white/90"
      }`}
      style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* ── LOGO ── */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Talk N Fix Wireless">
          <img
            src="/logo-icon.svg"
            alt="Talk N Fix Wireless"
            className="h-9 w-9 rounded-xl object-contain flex-shrink-0"
          />
          <span className="font-black text-zinc-900 text-sm leading-tight hidden sm:block" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Talk N&apos; Fix<br />
            <span className="text-red-700">Wireless</span>
          </span>
        </Link>

        {/* ── DESKTOP NAV (lg+) ── */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">

          {/* Repairs dropdown */}
          <div className="relative" data-dropdown>
            <button
              onClick={() => { setRepairsOpen(o => !o); setLocationsOpen(false); setCallOpen(false); }}
              className={`${linkCls("/services")} flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-zinc-50`}
            >
              Repairs
              <svg className={`w-3 h-3 transition-transform ${repairsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {repairsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[500px] bg-white rounded-2xl shadow-xl border border-zinc-100 p-5 grid grid-cols-2 gap-2 z-[200]">
                <div>
                  <p className="text-[10px] font-bold text-red-700 tracking-widest uppercase mb-2">Popular</p>
                  {SERVICES.filter(s => s.popular).map(s => (
                    <Link key={s.id} href={`/services/${s.id}`} onClick={() => setRepairsOpen(false)} className="flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-50 text-sm text-zinc-600 hover:text-zinc-900 transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />{s.title}
                    </Link>
                  ))}
                </div>
                <div className="border-l border-zinc-100 pl-5">
                  <p className="text-[10px] font-bold text-red-700 tracking-widest uppercase mb-2">All Services</p>
                  {SERVICES.filter(s => !s.popular).slice(0, 6).map(s => (
                    <Link key={s.id} href={`/services/${s.id}`} onClick={() => setRepairsOpen(false)} className="flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-50 text-sm text-zinc-600 hover:text-zinc-900 transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 flex-shrink-0" />{s.title}
                    </Link>
                  ))}
                  <Link href="/services" className="mt-2 block text-xs text-red-700 font-bold hover:underline">View all →</Link>
                </div>
              </div>
            )}
          </div>

          {/* Locations dropdown */}
          <div className="relative" data-dropdown>
            <button
              onClick={() => { setLocationsOpen(o => !o); setRepairsOpen(false); setCallOpen(false); }}
              className={`${linkCls("/locations")} flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-zinc-50`}
            >
              Locations
              <svg className={`w-3 h-3 transition-transform ${locationsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {locationsOpen && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-xl border border-zinc-100 p-2 z-[200]">
                {LOCATIONS.map(loc => (
                  <Link key={loc.id} href={`/locations#${loc.id}`} onClick={() => setLocationsOpen(false)} className="block p-3 rounded-xl hover:bg-zinc-50 transition-all">
                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{loc.city}</p>
                    <p className="text-sm font-semibold text-zinc-900">{loc.address}</p>
                    <p className="text-xs text-zinc-500">{loc.phone}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className={`${linkCls("/about")} px-3 py-2 rounded-lg hover:bg-zinc-50`}>About</Link>
          <Link href="/blog" className={`${linkCls("/blog")} px-3 py-2 rounded-lg hover:bg-zinc-50`}>Blog</Link>
          <Link href="/pricing" className={`${linkCls("/pricing")} px-3 py-2 rounded-lg hover:bg-zinc-50`}>Pricing</Link>
          <Link href="/contact" className={`${linkCls("/contact")} px-3 py-2 rounded-lg hover:bg-zinc-50`}>Contact</Link>
        </div>

        {/* ── DESKTOP CTA (lg+) ── */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Call Now dropdown */}
          <div className="relative" data-dropdown>
            <button
              onClick={() => { setCallOpen(o => !o); setRepairsOpen(false); setLocationsOpen(false); }}
              className="flex items-center gap-1.5 text-sm text-zinc-600 font-semibold hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
              </svg>
              Call Now
              <svg className={`w-3 h-3 transition-transform ${callOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {callOpen && (
              <div className="absolute top-full right-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden z-[200]">
                <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-100">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Choose a Location</p>
                </div>
                {LOCATIONS.map(loc => (
                  <a key={loc.id} href={`tel:${loc.phone.replace(/-/g, "")}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-red-50 transition-colors group border-b border-zinc-50 last:border-0">
                    <div>
                      <p className="text-xs font-bold text-red-700 uppercase tracking-wider">{loc.city}</p>
                      <p className="text-sm font-semibold text-zinc-900">{loc.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-600 group-hover:text-red-700">{loc.phone}</span>
                      <div className="w-7 h-7 rounded-full bg-red-700/10 group-hover:bg-red-700 flex items-center justify-center transition-colors">
                        <svg className="w-3.5 h-3.5 text-red-700 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link href="/book" className="bg-primary-gradient text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg hover:brightness-110 transition-all active:scale-95 whitespace-nowrap">
            Get Quote
          </Link>
        </div>

        {/* ── HAMBURGER (below lg) ── */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className={`w-5 h-0.5 bg-zinc-900 mb-1.5 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-0.5 bg-zinc-900 mb-1.5 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-zinc-900 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100 px-4 py-5 space-y-5 max-h-[85vh] overflow-y-auto shadow-xl">

          {/* Call locations */}
          <div>
            <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-3">Call a Location</p>
            <div className="space-y-2">
              {LOCATIONS.map(loc => (
                <a key={loc.id} href={`tel:${loc.phone.replace(/-/g, "")}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-red-50 transition-colors group">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{loc.city}</p>
                    <p className="text-sm font-semibold text-zinc-900 truncate">{loc.address}</p>
                    <p className="text-xs text-zinc-500">{loc.phone}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-red-700/10 group-hover:bg-red-700 flex items-center justify-center transition-colors flex-shrink-0 ml-3">
                    <svg className="w-4 h-4 text-red-700 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Repairs grid */}
          <div className="border-t border-zinc-100 pt-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Repairs</p>
            <div className="grid grid-cols-2 gap-1">
              {SERVICES.slice(0, 6).map(s => (
                <Link key={s.id} href={`/services/${s.id}`} onClick={() => setMobileOpen(false)}
                  className="text-zinc-600 hover:text-red-700 text-sm py-2 px-2 rounded-lg hover:bg-red-50 transition-all truncate">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="border-t border-zinc-100 pt-4 grid grid-cols-2 gap-1">
            {[["Locations", "/locations"], ["Services", "/services"], ["Pricing", "/pricing"], ["About Us", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className={`text-sm py-2 px-3 rounded-lg transition-all ${isActive(href) ? "text-red-700 bg-red-50 font-semibold" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`}>
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
