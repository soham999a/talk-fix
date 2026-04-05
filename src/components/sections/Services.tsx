import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { SERVICE_ICONS, Icons } from "@/components/Icons";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            What We Fix
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: "Space Grotesk" }}>
            Most Common <span className="text-gradient">Repairs</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Fast, reliable repairs with same-day service & warranty. Serving Newark, Passaic & nearby cities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id] ?? Icons.Wrench;
            return (
              <Link key={service.id} href={`/services/${service.id}`}
                className="group relative bg-[#1a1a1a] rounded-2xl p-7 border border-white/5 card-glow block">
                {service.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 text-xs font-bold">
                    Popular
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-5">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors" style={{ fontFamily: "Space Grotesk" }}>
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-5">{service.description}</p>
                {service.sameDay && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {service.time} · Same Day
                  </div>
                )}
                <div className="mt-4 text-xs text-blue-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Book Now <Icons.ArrowRight />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all text-sm">
            View All Services <Icons.ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
