import Link from "next/link";
import { Icons } from "@/components/Icons";

const FEATURES = [
  { Icon: Icons.Shield, title: "1-Year Warranty", desc: "Every repair is backed by a full year warranty for complete peace of mind." },
  { Icon: Icons.Diamond, title: "High-Quality Parts", desc: "OEM-grade and premium aftermarket parts selected for performance and durability." },
  { Icon: Icons.Wrench, title: "Trained Technicians", desc: "All repairs performed in-store by certified, experienced technicians." },
  { Icon: Icons.Lock, title: "Data Privacy", desc: "Your personal data stays private and secure throughout every repair." },
  { Icon: Icons.Zap, title: "Same-Day Service", desc: "Most repairs completed in 30–45 minutes while you wait in-store." },
  { Icon: Icons.Globe, title: "Bilingual Support", desc: "We proudly serve our Spanish-speaking community with bilingual staff." },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight" style={{ fontFamily: "Space Grotesk" }}>
              We Don&apos;t Just Fix Phones.<br />
              <span className="text-gradient">We Fix Your Day.</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-4">
              Every repair is handled with care, precision, and transparency. No hidden fees. No runaround. Just results.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-8">
              Founded in 2014 by Rey — who built this business from nothing — Talk N Fix Wireless has repaired over 1,000 devices every month and earned 6,500+ Google reviews.
            </p>
            <div className="flex gap-4">
              <Link href="/locations" className="bg-gradient-primary px-6 py-3 rounded-xl text-white font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm inline-flex items-center gap-2">
                Find a Location <Icons.ArrowRight />
              </Link>
              <Link href="/about" className="px-6 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-sm">
                Our Story
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 hover:border-blue-600/20 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-3">
                  <f.Icon />
                </div>
                <h4 className="text-white font-bold mb-2 text-sm" style={{ fontFamily: "Space Grotesk" }}>{f.title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
