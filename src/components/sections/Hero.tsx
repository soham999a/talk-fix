"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";

const STATS = [
  { value: 10000, suffix: "+", label: "Devices Fixed" },
  { value: 5, suffix: "", label: "Locations" },
  { value: 30, suffix: "min", label: "Avg Repair" },
  { value: 1, suffix: "yr", label: "Warranty" },
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
    <div className="text-center md:text-left">
      <div className="flex items-baseline gap-0.5 justify-center md:justify-start">
        <span ref={ref} className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk" }}>0</span>
        <span className="text-xl font-bold text-blue-400">{suffix}</span>
      </div>
      <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mt-1">{label}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
        {/* Left */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
            Open Now · Walk-ins Welcome · 5 Locations
          </div>

          <h1 className="text-6xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter" style={{ fontFamily: "Space Grotesk" }}>
            Your Device.<br />
            Fixed Fast.<br />
            <span className="text-gradient">Guaranteed.</span>
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
            Same-day repairs in 30–45 minutes. Premium OEM-grade parts. 1-year warranty.
            5 locations across Newark & Passaic, NJ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="bg-gradient-primary px-8 py-4 rounded-xl text-white font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_30px_rgba(37,99,235,0.35)] text-center flex items-center justify-center gap-2">
              Get a Free Quote <Icons.ArrowRight />
            </Link>
            <Link href="/locations" className="px-8 py-4 rounded-xl border border-white/15 text-white font-bold text-lg hover:bg-white/5 transition-all text-center">
              Find a Location
            </Link>
          </div>

          <div className="pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(s => <StatItem key={s.label} {...s} />)}
          </div>
        </div>

        {/* Right — Phone mockup */}
        <div className="relative flex justify-center items-center z-10">
          <div className="absolute w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]" />
          <div className="float-anim relative">
            <div className="relative w-64 h-[520px] rounded-[3rem] border-[10px] border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                  <Icons.Wrench />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "Space Grotesk" }}>Repair Complete</p>
                  <p className="text-zinc-400 text-sm mt-1">30 minutes · 1-yr warranty</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Icons.Check />
                </div>
                <div className="w-full mt-4 space-y-2">
                  {["Screen Restored", "Touch Calibrated", "Data Safe"].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-emerald-400"><Icons.Check /></span> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-full" />
            </div>
            <div className="absolute inset-0 rounded-[3rem] shadow-[0_0_60px_rgba(37,99,235,0.3)] pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-zinc-600" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
