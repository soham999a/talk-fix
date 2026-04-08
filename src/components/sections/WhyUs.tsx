import Link from "next/link";

const FEATURES = [
  { title: "OEM Quality Parts", desc: "We only use certified original or high-spec equivalent components for every repair." },
  { title: "Same-Day Service", desc: "90% of screen repairs are completed within 45 minutes while you wait in-store." },
  { title: "1-Year Warranty", desc: "Every repair is backed by our comprehensive 1-year hardware guarantee." },
  { title: "Data Privacy", desc: "Your personal data stays private and secure throughout every repair." },
  { title: "Free Diagnostic", desc: "We inspect your device and give you an honest quote — no charge, no obligation." },
  { title: "Bilingual Support", desc: "We proudly serve our Spanish-speaking community with bilingual staff." },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-red-700 font-bold tracking-[0.2em] text-xs sm:text-sm mb-4 uppercase">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 mb-5 leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
              We Don&apos;t Just Fix Phones.<br />We Fix Your Day.
            </h2>
            <p className="text-stone-600 leading-relaxed mb-3 text-sm sm:text-base">
              Every repair is handled with care, precision, and transparency. No hidden fees. No runaround. Just results.
            </p>
            <p className="text-stone-600 leading-relaxed mb-7 text-sm sm:text-base">
              Founded in 2014 by Rey — who built this business from nothing — Talk N Fix Wireless repairs over 1,000 devices every month and has earned 6,500+ Google reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/locations" className="bg-primary-gradient text-white font-bold px-6 py-3 rounded-xl text-sm hover:brightness-110 transition-all shadow-primary text-center">
                Find a Location
              </Link>
              <Link href="/about" className="px-6 py-3 rounded-xl border border-zinc-200 text-zinc-700 font-bold text-sm hover:bg-zinc-50 transition-all text-center">
                Our Story
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-zinc-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-red-100/30 transition-colors">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-700/10 flex items-center justify-center mb-2 sm:mb-3">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h4 className="text-zinc-900 font-bold mb-1 text-xs sm:text-sm" style={{ fontFamily: "Plus Jakarta Sans" }}>{f.title}</h4>
                <p className="text-stone-600 text-xs leading-relaxed hidden sm:block">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
