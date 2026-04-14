"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS } from "@/lib/data";

// Module-level counter — resets on every page refresh (unlike sessionStorage)
// This means: 2 popups per page load, resets when user refreshes
let pageLoadShowCount = 0;

export default function OfferBanner() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"offer" | "form" | "done">("offer");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", device: "", location: "" });
  const router = useRouter();

  useEffect(() => {
    // Show max 2 times per page load, 10s delay first time, 30s delay second time
    if (pageLoadShowCount >= 2) return;

    const delay = pageLoadShowCount === 0 ? 10000 : 30000;

    const timer = setTimeout(() => {
      pageLoadShowCount += 1;
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    setShow(false);
    setStep("offer");
    // If this was the first popup, schedule the second one after 30s
    if (pageLoadShowCount < 2) {
      setTimeout(() => {
        pageLoadShowCount += 1;
        setShow(true);
        setStep("offer");
      }, 30000);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          device: form.device,
          location: form.location,
          service: "General Repair",
          issue: form.device,
          status: "pending",
        }),
      });
      setStep("done");
    } finally {
      setSubmitting(false);
    }
  }

  function goHome() {
    setShow(false);
    setStep("offer");
    router.push("/");
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">

        {/* Close */}
        <button onClick={dismiss}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-white transition-all shadow-sm"
          aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {step === "done" ? (
          /* ── SUCCESS ── */
          <div className="p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>
              You&apos;re All Set!
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-2">
              Your appointment request has been received.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Just walk in to your selected location and mention your name — we&apos;ll have everything ready. <strong className="text-zinc-900">No waiting in line.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={goHome}
                className="bg-primary-gradient text-white font-bold px-8 py-3.5 rounded-xl hover:brightness-110 transition-all text-sm">
                Back to Homepage
              </button>
              <button onClick={dismiss}
                className="bg-zinc-100 text-zinc-700 font-bold px-8 py-3.5 rounded-xl hover:bg-zinc-200 transition-all text-sm">
                Stay on Page
              </button>
            </div>
          </div>

        ) : step === "form" ? (
          /* ── BOOKING FORM ── */
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — image */}
            <div className="relative hidden md:block">
              <img
                src="/hero.png"
                alt="Phone repair technician"
                className="w-full h-full object-cover"
                style={{ minHeight: "400px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur rounded-2xl p-4">
                  <p className="font-bold text-zinc-900 text-sm mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>Walk straight in</p>
                  <p className="text-zinc-600 text-xs">No waiting. Your slot will be ready when you arrive.</p>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="p-7">
              <button onClick={() => setStep("offer")} className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-zinc-700 transition-colors mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-3.5 h-3.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                Book Your Slot
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>
                Reserve Your Appointment
              </h3>
              <p className="text-stone-500 text-sm mb-6">Walk straight in — no waiting in line.</p>

              <form onSubmit={submit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Name *</label>
                    <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Phone *</label>
                    <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="(973) 000-0000"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Device</label>
                  <input type="text" value={form.device} onChange={e => setForm(f => ({ ...f, device: e.target.value }))}
                    placeholder="e.g. iPhone 14, Samsung S23"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Location</label>
                  <select value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all">
                    <option value="">Select a location</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc.id} value={`${loc.address}, ${loc.city}`}>
                        {loc.address}, {loc.city}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={submitting || !form.name || !form.phone}
                  className="w-full bg-primary-gradient text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-primary disabled:opacity-50 flex items-center justify-center gap-2 text-sm mt-1">
                  {submitting ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Confirming...</>
                  ) : (
                    <>Confirm Appointment <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg></>
                  )}
                </button>
                <p className="text-xs text-zinc-400 text-center">No payment required. Walk straight in.</p>
              </form>
            </div>
          </div>

        ) : (
          /* ── OFFER CARD ── */
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — image with overlay */}
            <div className="relative">
              <img
                src="/hero.png"
                alt="Professional phone repair"
                className="w-full object-cover"
                style={{ height: "100%", minHeight: "320px", maxHeight: "520px" }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/30 to-transparent" />
              {/* Badge */}
              <div className="absolute top-5 left-5">
                <span className="bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Limited Time
                </span>
              </div>
              {/* Bottom text on image */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-black text-2xl leading-tight mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  Skip the Wait.
                </p>
                <p className="text-white/80 text-sm">Book your slot now and walk straight in.</p>
              </div>
            </div>

            {/* Right — offer details */}
            <div className="p-7 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                  Special Offer
                </span>
                <h2 className="text-2xl font-extrabold text-zinc-900 mb-3 leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  Phone Screen Repair<br />
                  <span className="text-red-700">in 30-45 Minutes</span>
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  Walk in today at any of our 4 NJ locations. Certified technicians, OEM-grade parts, and a 1-year warranty available on every repair.
                </p>

                {/* Trust badges */}
                <div className="space-y-3 mb-7">
                  {[
                    { icon: "M5 13l4 4L19 7", text: "1-Year Warranty Available on all repairs" },
                    { icon: "M12 6v6l4 2M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z", text: "30-45 Mins screen repairs while you wait" },
                    { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", text: "OEM-grade parts, free diagnostic" },
                    { icon: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", text: "4 locations in Newark & Passaic NJ" },
                  ].map(b => (
                    <div key={b.text} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={b.icon}/>
                        </svg>
                      </div>
                      <span className="text-sm text-zinc-700">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={() => setStep("form")}
                  className="w-full bg-primary-gradient text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-primary text-sm flex items-center justify-center gap-2">
                  Book My Appointment
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button onClick={dismiss}
                  className="w-full text-zinc-400 text-xs py-2 hover:text-zinc-600 transition-colors">
                  No thanks, I&apos;ll walk in later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
