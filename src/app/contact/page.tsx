"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LOCATIONS } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", device: "", location: "", message: "", smsOptIn: false });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setSent(true);
    } finally { setSubmitting(false); }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-[#f9f9f9]">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-[#ffdad4] text-[#410000] text-[0.75rem] font-bold rounded-full tracking-widest uppercase mb-4">Get In Touch</span>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>Contact Us</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Locations */}
              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>Our Locations</h2>
                {LOCATIONS.map(loc => (
                  <div key={loc.id} className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm hover:border-red-700/20 transition-all">
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">{loc.city}</span>
                    <h3 className="font-bold text-zinc-900 text-base mt-0.5" style={{ fontFamily: "Plus Jakarta Sans" }}>{loc.address}</h3>
                    <p className="text-[#603e39] text-sm mb-2">{loc.cityStateZip}</p>
                    <a href={`tel:${loc.phone.replace(/-/g,"")}`} className="text-zinc-700 font-semibold text-sm hover:text-red-700 transition-colors">{loc.phone}</a>
                    <p className="text-zinc-400 text-xs mt-1">{loc.hours.weekday} · {loc.hours.weekend}</p>
                  </div>
                ))}

                {/* Immediate help card */}
                <div className="bg-zinc-900 text-white p-8 rounded-2xl relative overflow-hidden">
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Need Immediate Help?</h3>
                  <p className="text-zinc-400 text-sm mb-5 leading-relaxed">Speak directly with a technician for complex diagnostic questions.</p>
                  <div className="space-y-3">
                    <a href="tel:9737785900" className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-full bg-red-700/20 flex items-center justify-center text-red-500 group-hover:bg-red-700 group-hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Call Specialist</span>
                        <span className="text-sm font-bold">973-778-5900</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-card">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Message Sent!</h3>
                    <p className="text-[#603e39] text-sm">We&apos;ll get back to you shortly. Or just walk in — no appointment needed!</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>Send Us a Message</h2>
                    <form onSubmit={submit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold text-[#603e39] uppercase tracking-widest mb-2">Name *</label>
                          <input required type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name"
                            className="w-full bg-[#e8e8e8] border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0050d7]/20 transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#603e39] uppercase tracking-widest mb-2">Phone *</label>
                          <input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Your phone"
                            className="w-full bg-[#e8e8e8] border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0050d7]/20 transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#603e39] uppercase tracking-widest mb-2">Email</label>
                        <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com"
                          className="w-full bg-[#e8e8e8] border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0050d7]/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#603e39] uppercase tracking-widest mb-2">Primary Symptom</label>
                        <select value={form.device} onChange={e => set("device", e.target.value)}
                          className="w-full bg-[#e8e8e8] border-none rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0050d7]/20 transition-all">
                          <option value="">Select the main problem...</option>
                          <option>Cracked Screen / Glass</option>
                          <option>Battery Draining / Power Issues</option>
                          <option>Water Damage</option>
                          <option>Charging Port Malfunction</option>
                          <option>Camera Problems</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#603e39] uppercase tracking-widest mb-2">Preferred Location</label>
                        <select value={form.location} onChange={e => set("location", e.target.value)}
                          className="w-full bg-[#e8e8e8] border-none rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0050d7]/20 transition-all">
                          <option value="">Select a location</option>
                          {LOCATIONS.map(loc => <option key={loc.id}>{loc.address}, {loc.city}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-[#603e39] uppercase tracking-widest mb-2">Additional Context *</label>
                        <textarea required rows={4} value={form.message} onChange={e => set("message", e.target.value)}
                          placeholder="e.g. 'Phone fell in water yesterday', 'Screen is glitching but not cracked'"
                          className="w-full bg-[#e8e8e8] border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#0050d7]/20 transition-all resize-none" />
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" id="sms" checked={form.smsOptIn} onChange={e => set("smsOptIn", e.target.checked)} className="mt-1 accent-red-700" />
                        <label htmlFor="sms" className="text-xs text-[#603e39] leading-relaxed">
                          By checking, you allow Talk N Fix Wireless to send SMS communications about your repair. Reply STOP to opt-out.
                        </label>
                      </div>
                      <button type="submit" disabled={submitting}
                        className="w-full bg-primary-gradient py-4 rounded-xl text-white font-bold hover:brightness-110 transition-all shadow-primary disabled:opacity-50">
                        {submitting ? "Sending..." : "Get Instant Quote"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
