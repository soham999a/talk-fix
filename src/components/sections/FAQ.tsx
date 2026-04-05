"use client";
import { useState } from "react";
import { FAQS } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: "Space Grotesk" }}>
            Got <span className="text-gradient">Questions?</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-white/3 transition-colors"
              >
                <span className="text-white font-semibold text-sm" style={{ fontFamily: "Space Grotesk" }}>{faq.q}</span>
                <span className={`text-blue-400 text-xl flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
