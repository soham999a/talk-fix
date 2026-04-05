import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES } from "@/lib/data";
import { SERVICE_ICONS, Icons } from "@/components/Icons";

export const metadata: Metadata = {
  title: "All Repair Services",
  description: "Complete device repair services in Newark & Passaic NJ. iPhone, Samsung, iPad, laptop, computer, game console and more. Same-day service, 1-year warranty.",
};

const DEVICES = ["All", "iPhone", "Samsung", "iPad", "Laptop", "Computer", "Console", "Other"];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              All Services
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={{ fontFamily: "Space Grotesk" }}>
              Every Device. <span className="text-gradient">Every Repair.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              We specialize in fast, high-quality repairs for all major devices. Select your device below to find the right service.
            </p>
          </div>
        </section>

        {/* Device filter tabs */}
        <div className="sticky top-[72px] z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 py-4 min-w-max">
              {DEVICES.map((d, i) => (
                <button key={d} className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${i === 0 ? "bg-blue-600 text-white border-blue-600" : "border-white/10 text-zinc-400 hover:text-white hover:border-blue-500/50"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services grid */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map(service => {
                const Icon = SERVICE_ICONS[service.id] ?? Icons.Wrench;
                return (
                  <Link key={service.id} href={`/services/${service.id}`}
                    className="group bg-[#1a1a1a] rounded-2xl p-7 border border-white/5 card-glow block">
                    {service.popular && (
                      <span className="inline-block mb-4 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 text-xs font-bold">Popular</span>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-4">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors" style={{ fontFamily: "Space Grotesk" }}>
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-5">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="text-xs text-zinc-500 uppercase tracking-widest">Est. Time</div>
                      <div className="text-sm font-bold text-cyan-400">{service.time}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
