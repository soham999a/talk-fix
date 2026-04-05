import Link from "next/link";
import { Icons } from "@/components/Icons";

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0f0f0f]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: "Space Grotesk" }}>
          Ready to Fix Your Device?
        </h2>
        <p className="text-zinc-400 text-lg mb-10">
          Walk in today. No appointment needed. Out in 30 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/locations" className="bg-gradient-primary px-10 py-4 rounded-xl text-white font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_30px_rgba(37,99,235,0.35)] inline-flex items-center justify-center gap-2">
            Find Nearest Location <Icons.ArrowRight />
          </Link>
          <Link href="/services" className="px-10 py-4 rounded-xl border border-white/15 text-white font-bold text-lg hover:bg-white/5 transition-all">
            View All Services
          </Link>
        </div>
        <p className="mt-8 text-zinc-600 text-sm">
          5 locations · Newark & Passaic NJ · Mon–Sat 9am–7:45pm · Sun 10am–5:45pm
        </p>
      </div>
    </section>
  );
}
