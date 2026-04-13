import Link from "next/link";
import { LOCATIONS, SERVICES } from "@/lib/data";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/Talknfixwireless/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TALKNFIXWIRELESS",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/talknfixw",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@talknfixwireless",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200/50 pt-12 sm:pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2.5" aria-label="Talk N Fix Wireless">
              <img src="/logo-icon.svg" alt="Talk N Fix Wireless" className="h-9 w-9 rounded-xl object-contain flex-shrink-0" />
              <span className="text-base font-black text-zinc-900 leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Talk N&apos; Fix<br /><span className="text-red-700">Wireless</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-2">
              Premium precision mobile repair. We treat every device like our own.
            </p>
            <a href="mailto:talknfixwireless@gmail.com" className="text-zinc-500 hover:text-red-700 text-xs block mb-1 transition-colors">
              talknfixwireless@gmail.com
            </a>
            <a href="tel:9737785900" className="text-red-700 font-bold text-sm block mb-4 hover:text-red-800 transition-colors">
              973-778-5900
            </a>
            {/* Social icons */}
            <div className="flex gap-2 sm:gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-600 hover:bg-red-700 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-zinc-900 font-bold text-xs uppercase tracking-widest mb-4">Popular Repairs</h5>
            <ul className="space-y-2 sm:space-y-3">
              {SERVICES.slice(0, 6).map(s => (
                <li key={s.id}>
                  <Link href={`/services/${s.id}`} className="text-zinc-500 hover:text-zinc-900 text-xs sm:text-sm transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h5 className="text-zinc-900 font-bold text-xs uppercase tracking-widest mb-4">Locations</h5>
            <ul className="space-y-2 sm:space-y-3">
              {LOCATIONS.map(loc => (
                <li key={loc.id}>
                  <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 text-xs sm:text-sm transition-colors">
                    {loc.address}, {loc.city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-zinc-900 font-bold text-xs uppercase tracking-widest mb-4">Company</h5>
            <ul className="space-y-2 sm:space-y-3 mb-5">
              {[
                ["About Us", "/about"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms-and-conditions"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-zinc-500 hover:text-zinc-900 text-xs sm:text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Support Line</p>
              <a href="tel:9737785900" className="text-base sm:text-lg font-bold text-red-700 hover:text-red-800 transition-colors">
                973-778-5900
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-500">
          <span className="text-center sm:text-left">© 2026 Talk N Fix Wireless. All rights reserved. Newark & Passaic, NJ.</span>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-zinc-500">Powered by <span className="text-red-700">NiceCare</span></span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">
              <svg className="w-3 h-3 text-red-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
              Certified Technicians
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
