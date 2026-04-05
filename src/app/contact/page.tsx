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
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                Get In Touch
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "Space Grotesk" }}>
                Contact <span className="text-gradient">Us</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Locations */}
              <div className="space-y-4">
                <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>Our Locations</h2>
                {LOCATIONS.map(loc => (
                  <div key={loc.id} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{loc.city}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{loc.address}</h3>
                    <p className="text-zinc-500 text-sm mb-3">{loc.cityStateZip}</p>
                    <a href={`tel:${loc.phone.replace(/-/g,"")}`} className="text-white font-semibold text-sm hover:text-blue-400 transition-colors">📞 {loc.phone}</a>
                    <p className="text-zinc-600 text-xs mt-1">{loc.hours.weekday} · {loc.hours.weekend}</p>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "Space Grotesk" }}>Message Sent!</h3>
                    <p className="text-zinc-400 text-sm">We&apos;ll get back to you shortly. Or just walk in — no appointment needed!</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black mb-6" style={{ fontFamily: "Space Grotesk" }}>Send Us a Message</h2>
                    <form onSubmit={submit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Name *</label>
                          <input required type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Phone *</label>
                          <input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Your phone" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email</label>
                        <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Device Type</label>
                        <select value={form.device} onChange={e => set("device", e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
                          <option value="">Select device</option>
                          {["iPhone","Samsung","iPad","Laptop","Computer","Game Console","Other"].map(d => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Preferred Location</label>
                        <select value={form.location} onChange={e => set("location", e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors">
                          <option value="">Select location</option>
                          {LOCATIONS.map(loc => <option key={loc.id}>{loc.address}, {loc.city}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Message *</label>
                        <textarea required rows={4} value={form.message} onChange={e => set("message", e.target.value)} placeholder="Describe your issue..." className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
                      </div>
                      <div className="flex items-start gap-3">
                        <input type="checkbox" id="sms" checked={form.smsOptIn} onChange={e => set("smsOptIn", e.target.checked)} className="mt-1 accent-blue-500" />
                        <label htmlFor="sms" className="text-xs text-zinc-500 leading-relaxed">
                          By checking, you allow Talk N Fix Wireless to send SMS communications about your repair. Reply STOP to opt-out.
                        </label>
                      </div>
                      <button type="submit" disabled={submitting} className="w-full bg-gradient-primary py-4 rounded-xl text-white font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50">
                        {submitting ? "Sending..." : "Send Message"}
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
