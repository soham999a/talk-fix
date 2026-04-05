import { REVIEWS } from "@/lib/data";
import { Icons } from "@/components/Icons";

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full font-bold text-sm mb-6 border border-yellow-500/20">
            <Icons.Star /> 4.9 · 6,500+ Google Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "Space Grotesk" }}>
            Real People. <span className="text-gradient">Real Results.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-2xl p-7 border border-white/5 hover:border-yellow-500/20 transition-all card-glow">
              <div className="flex gap-1 text-yellow-400 mb-5">
                {Array.from({ length: 5 }).map((_, j) => <Icons.Star key={j} />)}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {r.initial}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-zinc-500 text-xs">{r.service} · {r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
