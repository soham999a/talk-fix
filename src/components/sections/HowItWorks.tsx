import { Icons } from "@/components/Icons";

const STEPS = [
  { num: "01", Icon: Icons.MapPin, title: "Walk In", desc: "No appointment needed. Just show up at any of our 5 locations. We're open 7 days a week." },
  { num: "02", Icon: Icons.Search, title: "Free Diagnostic", desc: "Our certified technicians inspect your device and give you an honest quote in minutes — no charge." },
  { num: "03", Icon: Icons.Check, title: "Pick It Up Fixed", desc: "Most repairs done in 30–45 minutes while you wait. Protected by our 1-year warranty." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "Space Grotesk" }}>
            Fixed in <span className="text-gradient">3 Simple Steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {STEPS.map((step, i) => (
            <div key={i} className="bg-[#131313] p-12 text-center relative group hover:bg-[#1a1a1a] transition-colors">
              <div className="text-7xl font-black text-blue-600/10 mb-6 leading-none" style={{ fontFamily: "Space Grotesk" }}>
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 mx-auto mb-5">
                <step.Icon />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Space Grotesk" }}>{step.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{step.desc}</p>
              {i < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 text-blue-500 z-10 items-center justify-center">
                  <Icons.ArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
