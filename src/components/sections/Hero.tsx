"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const STATS = [
  { value: 6500, suffix: "+", label: "Google Reviews" },
  { value: 4, suffix: "", label: "Locations" },
  { value: 30, suffix: "min", label: "Screen Repair" },
  { value: 1000, suffix: "+", label: "Repairs / Month" },
];

function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const tick = () => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start).toLocaleString();
        if (start < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return ref;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value);
  return (
    <div className="text-center sm:text-left">
      <div className="flex items-baseline gap-0.5 justify-center sm:justify-start">
        <span ref={ref} className="text-xl sm:text-2xl font-black text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>0</span>
        <span className="text-base sm:text-lg font-bold text-red-700">{suffix}</span>
      </div>
      <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-0.5">{label}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden px-4 sm:px-6 pt-20 bg-stone-50 pb-24 sm:pb-28">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10 sm:py-16">
        {/* Left */}
        <div className="z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-950 text-xs font-bold tracking-widest mb-5 uppercase">
            Premium Mobile Care
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.05] mb-5" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Expert Mobile<br />Repairs in{" "}
            <span className="text-red-700">30–45 Min</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-xl mb-8 leading-relaxed">
            Precision engineering meets rapid service. Our certified technicians restore your device to factory perfection while you wait.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/book" className="bg-primary-gradient text-white font-bold px-6 py-4 rounded-xl text-base shadow-xl hover:brightness-110 transition-all active:scale-95 text-center">
              Get Instant Quote
            </Link>
            <Link href="/locations" className="bg-white text-zinc-900 font-semibold px-6 py-4 rounded-xl text-base border border-red-200/30 flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              Find a Store
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["bg-zinc-300", "bg-zinc-400", "bg-zinc-500"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${c}`} />
              ))}
            </div>
            <div>
              <div className="flex text-red-600 text-sm">{"★★★★★"}</div>
              <p className="text-zinc-500 text-xs sm:text-sm">6,500+ repairs completed</p>
            </div>
          </div>
        </div>

        {/* Right — only on large screens */}
        <div className="relative hidden lg:block">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-600/5 rounded-full blur-3xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl float-anim">
            <img
              src="https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80"
              alt="Phone repair technician fixing a cracked smartphone screen"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/85 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg">
              <p className="text-zinc-900 font-bold text-sm mb-0.5" style={{ fontFamily: "Plus Jakarta Sans" }}>Precision Guaranteed</p>
              <p className="text-zinc-600 text-xs">Genuine parts and advanced micro-soldering for all flagship models.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar — fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-2 sm:gap-6">
          {STATS.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}
