"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LOCATIONS } from "@/lib/data";

// Note: metadata must be in a separate server component for client pages
// SEO is handled by root layout metadata

function useCaptcha() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setA(Math.floor(Math.random() * 9) + 1);
    setB(Math.floor(Math.random() * 9) + 1);
  }, []);

  function refresh() {
    setA(Math.floor(Math.random() * 9) + 1);
    setB(Math.floor(Math.random() * 9) + 1);
    setAnswer("");
    setError(false);
  }

  function verify() {
    const correct = parseInt(answer) === a + b;
    setError(!correct);
    return correct;
  }

  return { a, b, answer, setAnswer, error, refresh, verify };
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", device: "", location: "", message: "",
    smsTransactional: false, smsMarketing: false, termsAccepted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const captcha = useCaptcha();

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.termsAccepted) {
      alert("Please accept the Terms of Service & Privacy Policy to continue.");
      return;
    }
    if (!captcha.verify()) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, smsOptIn: form.smsTransactional || form.smsMarketing }),
      });
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-stone-50 min-h-screen">
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Get In Touch</span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Contact Us
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Locations */}
              <div className="space-y-4">
                <h2 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>Our Locations</h2>
                {LOCATIONS.map(loc => (
                  <div key={loc.id} className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm hover:border-red-700/20 transition-all">
                    <span className="text-xs font-bold text-red-700 uppercase tracking-wider">{loc.city}</span>
                    <h3 className="font-bold text-zinc-900 text-base mt-0.5" style={{ fontFamily: "Plus Jakarta Sans" }}>{loc.address}</h3>
                    <p className="text-stone-600 text-sm mb-2">{loc.cityStateZip}</p>
                    <a href={`tel:${loc.phone.replace(/-/g,"")}`} className="text-zinc-700 font-semibold text-sm hover:text-red-700 transition-colors">{loc.phone}</a>
                    <p className="text-zinc-400 text-xs mt-1">{loc.hours.weekday} &middot; {loc.hours.weekend}</p>
                  </div>
                ))}
                <div className="bg-zinc-900 text-white p-6 rounded-2xl">
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Need Immediate Help?</h3>
                  <p className="text-zinc-400 text-sm mb-4">Speak directly with a technician.</p>
                  <a href="tel:9737785900" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-red-700/20 flex items-center justify-center text-red-400 group-hover:bg-red-700 group-hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                    </div>
                    <div>
                      <span className="block text-xs text-zinc-500 uppercase tracking-widest font-bold">Call Specialist</span>
                      <span className="text-sm font-bold">973-778-5900</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-zinc-100 shadow-card">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="text-2xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Message Sent!</h3>
                    <p className="text-stone-600 text-sm">We will get back to you shortly. Or just walk in — no appointment needed!</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-extrabold text-zinc-900 mb-6" style={{ fontFamily: "Plus Jakarta Sans" }}>Send Us a Message</h2>
                    <form onSubmit={submit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Name *</label>
                          <input required type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name"
                            className="w-full bg-zinc-200 border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Phone *</label>
                          <input required type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Your phone"
                            className="w-full bg-zinc-200 border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Email</label>
                        <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com"
                          className="w-full bg-zinc-200 border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Primary Symptom</label>
                        <select value={form.device} onChange={e => set("device", e.target.value)}
                          className="w-full bg-zinc-200 border-none rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/20 transition-all">
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
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Preferred Location</label>
                        <select value={form.location} onChange={e => set("location", e.target.value)}
                          className="w-full bg-zinc-200 border-none rounded-xl px-4 py-3 text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700/20 transition-all">
                          <option value="">Select a location</option>
                          {LOCATIONS.map(loc => <option key={loc.id}>{loc.address}, {loc.city}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Additional Context *</label>
                        <textarea required rows={3} value={form.message} onChange={e => set("message", e.target.value)}
                          placeholder="e.g. 'Phone fell in water yesterday', 'Screen is glitching but not cracked'"
                          className="w-full bg-zinc-200 border-none rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-700/20 transition-all resize-none" />
                      </div>

                      {/* SMS Opt-in 1 — Transactional */}
                      <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                        <input type="checkbox" id="smsT" checked={form.smsTransactional} onChange={e => set("smsTransactional", e.target.checked)} className="mt-1 accent-red-700 flex-shrink-0" />
                        <label htmlFor="smsT" className="text-xs text-stone-600 leading-relaxed">
                          By checking, you are allowing to receive transactional/informational SMS communications regarding account notifications, customer care, etc, from Talk N Fix Wireless. Messages frequency may vary. Data rates may apply, reply STOP to opt-out.
                        </label>
                      </div>

                      {/* SMS Opt-in 2 — Marketing */}
                      <div className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                        <input type="checkbox" id="smsM" checked={form.smsMarketing} onChange={e => set("smsMarketing", e.target.checked)} className="mt-1 accent-red-700 flex-shrink-0" />
                        <label htmlFor="smsM" className="text-xs text-stone-600 leading-relaxed">
                          By checking, you are allowing to receive promotional/marketing SMS communications from Talk N Fix Wireless. Frequency may vary. Data rates may apply, reply HELP for help or STOP to opt-out.
                        </label>
                      </div>

                      {/* Terms acceptance */}
                      <div className="flex items-start gap-3">
                        <input type="checkbox" id="terms" checked={form.termsAccepted} onChange={e => set("termsAccepted", e.target.checked)} className="mt-1 accent-red-700 flex-shrink-0" />
                        <label htmlFor="terms" className="text-xs text-stone-600 leading-relaxed">
                          By checking, I accept the{" "}
                          <a href="/terms-and-conditions" className="text-red-700 hover:underline font-semibold">Terms of Service</a>
                          {" "}&amp;{" "}
                          <a href="/privacy-policy" className="text-red-700 hover:underline font-semibold">Privacy Policy</a>
                        </label>
                      </div>

                      {/* CAPTCHA */}
                      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Security Check</label>
                        <div className="flex items-center gap-3">
                          <div className="bg-zinc-900 text-white font-black text-lg px-5 py-3 rounded-xl tracking-widest select-none" style={{ fontFamily: "monospace", letterSpacing: "0.3em" }}>
                            {captcha.a} + {captcha.b} = ?
                          </div>
                          <input
                            type="number"
                            value={captcha.answer}
                            onChange={e => captcha.setAnswer(e.target.value)}
                            placeholder="Answer"
                            className={`w-24 bg-white border-2 rounded-xl px-3 py-3 text-zinc-900 text-sm text-center font-bold focus:outline-none transition-all ${captcha.error ? "border-red-500 bg-red-50" : "border-zinc-200 focus:border-red-700"}`}
                          />
                          <button type="button" onClick={captcha.refresh}
                            className="w-10 h-10 rounded-xl bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center transition-colors" title="Refresh">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4 text-zinc-600">
                              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                              <path d="M21 3v5h-5"/>
                              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                              <path d="M8 16H3v5"/>
                            </svg>
                          </button>
                        </div>
                        {captcha.error && <p className="text-red-600 text-xs mt-2 font-medium">Incorrect answer. Please try again.</p>}
                      </div>

                      <button type="submit" disabled={submitting || !form.termsAccepted}
                        className="w-full bg-primary-gradient py-4 rounded-xl text-white font-bold hover:brightness-110 transition-all shadow-primary disabled:opacity-50 text-base">
                        {submitting ? "Sending..." : "Contact Us"}
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
