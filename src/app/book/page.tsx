"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES, LOCATIONS } from "@/lib/data";
import { Icons } from "@/components/Icons";
import Link from "next/link";

const DEVICES = [
  { id: "iphone", label: "iPhone", icon: "📱" },
  { id: "samsung", label: "Samsung", icon: "🤖" },
  { id: "ipad", label: "iPad", icon: "📟" },
  { id: "laptop", label: "Laptop", icon: "💻" },
  { id: "computer", label: "Computer", icon: "🖥️" },
  { id: "console", label: "Console", icon: "🎮" },
  { id: "watch", label: "Apple Watch", icon: "⌚" },
  { id: "other", label: "Other", icon: "📦" },
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredServices = SERVICES.filter(s =>
    !device || s.device === device || s.device === "all"
  );

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#0a0a0a]">
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: "Space Grotesk" }}>
                Book Your <span className="text-gradient">Repair</span>
              </h1>
              <p className="text-zinc-500">Takes 2 minutes. Walk in same day.</p>
            </div>

            {/* Progress */}
            {!done && (
              <div className="flex items-center gap-2 mb-10">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${step >= s ? "bg-gradient-primary text-white" : "bg-[#1a1a1a] text-zinc-500 border border-white/10"}`}>
                      {s}
                    </div>
                    {s < 4 && <div className={`flex-1 h-px transition-all ${step > s ? "bg-blue-500" : "bg-white/10"}`} />}
                  </div>
                ))}
              </div>
            )}

            {done ? (
              <div className="bg-[#1a1a1a] rounded-3xl p-10 border border-white/5 text-center">
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "Space Grotesk" }}>You&apos;re All Set!</h2>
                <p className="text-zinc-400 mb-2">We&apos;ve received your repair request.</p>
                <p className="text-zinc-500 text-sm mb-8">Just walk in to your selected location and mention your booking. We&apos;ll take care of the rest.</p>
                <div className="bg-[#111] rounded-2xl p-6 text-left mb-8 space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-zinc-500">Device</span><span className="text-white font-semibold capitalize">{device}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-zinc-500">Service</span><span className="text-white font-semibold">{service}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-zinc-500">Location</span><span className="text-white font-semibold">{location}</span></div>
                </div>
                <Link href="/locations" className="bg-gradient-primary px-8 py-3 rounded-xl text-white font-bold hover:brightness-110 transition-all inline-block">
                  Get Directions →
                </Link>
              </div>
            ) : (
              <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
                {/* Step 1 — Device */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>What device do you have?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {DEVICES.map(d => (
                        <button key={d.id} onClick={() => { setDevice(d.id); setStep(2); }}
                          className={`p-4 rounded-2xl border text-center transition-all hover:border-blue-500/50 ${device === d.id ? "border-blue-500 bg-blue-600/10" : "border-white/10 bg-[#111]"}`}>
                          <div className="text-3xl mb-2">{d.icon}</div>
                          <div className="text-xs font-semibold text-zinc-300">{d.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Service */}
                {step === 2 && (
                  <div>
                    <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors">← Back</button>
                    <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>What needs to be fixed?</h2>
                    <div className="space-y-3">
                      {filteredServices.map(s => (
                        <button key={s.id} onClick={() => { setService(s.title); setStep(3); }}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all hover:border-blue-500/50 ${service === s.title ? "border-blue-500 bg-blue-600/10" : "border-white/10 bg-[#111]"}`}>
                          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                            <Icons.Wrench />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{s.title}</div>
                            <div className="text-zinc-500 text-xs">{s.time} · Same Day</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 — Location */}
                {step === 3 && (
                  <div>
                    <button onClick={() => setStep(2)} className="text-zinc-500 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors">← Back</button>
                    <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>Choose a location</h2>
                    <div className="space-y-3">
                      {LOCATIONS.map(loc => (
                        <button key={loc.id} onClick={() => { setLocation(`${loc.address}, ${loc.city}`); setStep(4); }}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all hover:border-blue-500/50 ${location.includes(loc.address) ? "border-blue-500 bg-blue-600/10" : "border-white/10 bg-[#111]"}`}>
                          <span className="text-2xl">📍</span>
                          <div>
                            <div className="text-white font-semibold text-sm">{loc.address}</div>
                            <div className="text-zinc-500 text-xs">{loc.cityStateZip} · {loc.phone}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4 — Info */}
                {step === 4 && (
                  <div>
                    <button onClick={() => setStep(3)} className="text-zinc-500 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors">← Back</button>
                    <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>Your Info</h2>
                    <div className="space-y-4">
                      <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
                      <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
                      <input type="email" placeholder="Email (optional)" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
                      <textarea rows={3} placeholder="Describe your issue (optional)" value={issue} onChange={e => setIssue(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
                      <button
                        disabled={submitting || !name || !phone}
                        onClick={async () => {
                          setSubmitting(true);
                          try {
                            await fetch("/api/bookings", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ name, phone, email, device, service, location, issue }),
                            });
                          } finally {
                            setSubmitting(false);
                            setDone(true);
                          }
                        }}
                        className="w-full bg-gradient-primary py-4 rounded-xl text-white font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50">
                        {submitting ? "Saving..." : "Confirm Booking →"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
