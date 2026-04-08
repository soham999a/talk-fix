"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SERVICES, LOCATIONS } from "@/lib/data";
import Link from "next/link";

// Device options with SVG icons
const DEVICES = [
  {
    id: "iphone", label: "iPhone", sub: "All models",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2}/>
      </svg>
    ),
  },
  {
    id: "samsung", label: "Samsung", sub: "Galaxy series",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
      </svg>
    ),
  },
  {
    id: "ipad", label: "iPad / Tablet", sub: "All sizes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2}/>
      </svg>
    ),
  },
  {
    id: "laptop", label: "Laptop", sub: "Mac / PC",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>
      </svg>
    ),
  },
  {
    id: "console", label: "Game Console", sub: "PS5 / Xbox",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="17" cy="13" r="1" fill="currentColor"/>
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
      </svg>
    ),
  },
  {
    id: "watch", label: "Apple Watch", sub: "All series",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M9 17v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2"/>
      </svg>
    ),
  },
  {
    id: "computer", label: "Computer", sub: "Desktop / iMac",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    id: "other", label: "Other Device", sub: "Anything else",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2}/>
      </svg>
    ),
  },
];

const PRICE_ESTIMATES: Record<string, string> = {
  "iphone-screen-repair": "$79 – $329",
  "samsung-screen-repair": "$89 – $349",
  "ipad-screen-repair": "$119 – $199",
  "battery-replacement": "$49 – $109",
  "charging-port-repair": "$59 – $99",
  "back-glass-repair": "$79 – $149",
  "game-console-hdmi-repair": "$89 – $129",
  "water-damage-repair": "Diagnostic first",
  "diagnostic-no-power": "FREE",
  "laptop-repair": "$99 – $249",
  "computer-repair": "$59 – $149",
};

const STEP_LABELS = ["Device", "Service", "Location", "Your Info"];

function generateTicket() {
  return "TNF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState("");
  const [service, setService] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [location, setLocation] = useState("");
  const [locationPhone, setLocationPhone] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [ticket] = useState(generateTicket);

  const filteredServices = SERVICES.filter(s => !device || s.device === device || s.device === "all");
  const progressPct = ((step - 1) / (STEP_LABELS.length - 1)) * 100;
  const selectedDevice = DEVICES.find(d => d.id === device);
  const selectedService = SERVICES.find(s => s.id === serviceId);
  const selectedLocation = LOCATIONS.find(l => l.address === location.split(",")[0]?.trim());

  async function confirm() {
    if (!name || !phone) return;
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
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-50" style={{ paddingTop: "72px" }}>

        {/* Hero header */}
        <div className="bg-white border-b border-zinc-100">
          <div className="max-w-4xl mx-auto px-6 py-10 text-center">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-950 text-xs font-bold rounded-full tracking-widest uppercase mb-4">
              Service Portal
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Book Your Repair
            </h1>
            <p className="text-stone-500 max-w-md mx-auto text-sm leading-relaxed">
              Get a transparent price estimate and confirm your visit in under 2 minutes.
            </p>
          </div>

          {/* Progress bar */}
          {!done && (
            <div className="max-w-4xl mx-auto px-6 pb-8">
              <div className="flex justify-between items-center mb-3">
                {STEP_LABELS.map((label, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step > i + 1 ? "bg-red-700 text-white shadow-md" :
                      step === i + 1 ? "bg-red-700 text-white shadow-lg ring-4 ring-red-100" :
                      "bg-zinc-100 text-stone-400"
                    }`}>
                      {step > i + 1 ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      ) : i + 1}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${step === i + 1 ? "text-red-700" : "text-stone-400"}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="relative h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-red-700 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10">
          {done ? (
            /* ── CONFIRMATION ── */
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-3xl p-10 text-center border border-zinc-100 shadow-card">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 className="text-3xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Booking Confirmed!</h2>
                <p className="text-stone-500 text-sm mb-8">Your repair request has been received. Just walk in — no waiting.</p>

                {/* Ticket */}
                <div className="bg-stone-50 rounded-2xl p-6 mb-8 text-left border border-zinc-100">
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Repair Ticket</span>
                    <span className="font-black text-red-700 text-lg tracking-wider" style={{ fontFamily: "Plus Jakarta Sans" }}>{ticket}</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Customer", name],
                      ["Phone", phone],
                      ["Device", selectedDevice?.label ?? device],
                      ["Service", service],
                      ["Location", location],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span className="text-stone-400 font-medium">{k}</span>
                        <span className="text-zinc-900 font-semibold text-right max-w-[60%]">{v}</span>
                      </div>
                    ))}
                    {PRICE_ESTIMATES[serviceId] && (
                      <div className="flex justify-between text-sm pt-3 border-t border-zinc-100">
                        <span className="text-stone-400 font-medium">Est. Price</span>
                        <span className="text-red-700 font-bold">{PRICE_ESTIMATES[serviceId]}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {selectedLocation && (
                    <a href={selectedLocation.mapsUrl} target="_blank" rel="noopener noreferrer"
                      className="w-full bg-primary-gradient text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      Get Directions
                    </a>
                  )}
                  {locationPhone && (
                    <a href={`tel:${locationPhone.replace(/-/g,"")}`}
                      className="w-full bg-zinc-100 text-zinc-900 font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all text-sm flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                      Call {locationPhone}
                    </a>
                  )}
                </div>
                <p className="text-xs text-stone-400 mt-6">Save your ticket number: <strong className="text-zinc-700">{ticket}</strong></p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ── MAIN FORM ── */}
              <div className="lg:col-span-2">

                {/* STEP 1 — Device */}
                {step === 1 && (
                  <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-card">
                    <h2 className="text-2xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>What device do you have?</h2>
                    <p className="text-stone-500 text-sm mb-8">Select your device type to get started.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {DEVICES.map(d => (
                        <button key={d.id} onClick={() => { setDevice(d.id); setStep(2); }}
                          className={`group flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 hover:border-red-700/40 hover:bg-red-50/50 ${device === d.id ? "border-red-700 bg-red-50" : "border-zinc-100 bg-stone-50"}`}>
                          <div className={`mb-3 transition-colors ${device === d.id ? "text-red-700" : "text-zinc-500 group-hover:text-red-700"}`}>
                            {d.icon}
                          </div>
                          <span className="font-bold text-xs text-zinc-900 text-center leading-tight">{d.label}</span>
                          <span className="text-[10px] text-stone-400 mt-0.5 text-center">{d.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 — Service */}
                {step === 2 && (
                  <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-card">
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-stone-400 hover:text-zinc-900 text-sm mb-6 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      Back
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-extrabold text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>What needs fixing?</h2>
                      {selectedDevice && <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">{selectedDevice.label}</span>}
                    </div>
                    <p className="text-stone-500 text-sm mb-8">Select the repair service you need.</p>
                    <div className="space-y-3">
                      {filteredServices.map(s => (
                        <button key={s.id} onClick={() => { setService(s.title); setServiceId(s.id); setStep(3); }}
                          className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:border-red-700/40 hover:bg-red-50/30 ${serviceId === s.id ? "border-red-700 bg-red-50" : "border-zinc-100"}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${serviceId === s.id ? "bg-red-700 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>
                            </div>
                            <div>
                              <p className="font-bold text-zinc-900 text-sm">{s.title}</p>
                              <p className="text-stone-400 text-xs mt-0.5">{s.time} · Same Day</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <p className="font-bold text-red-700 text-sm">{PRICE_ESTIMATES[s.id] ?? "Call"}</p>
                            {s.popular && <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Popular</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3 — Location */}
                {step === 3 && (
                  <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-card">
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 text-stone-400 hover:text-zinc-900 text-sm mb-6 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      Back
                    </button>
                    <h2 className="text-2xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Choose a location</h2>
                    <p className="text-stone-500 text-sm mb-8">All locations are walk-in friendly. No appointment needed.</p>
                    <div className="space-y-3">
                      {LOCATIONS.map(loc => (
                        <button key={loc.id} onClick={() => { setLocation(`${loc.address}, ${loc.city}`); setLocationPhone(loc.phone); setStep(4); }}
                          className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:border-red-700/40 hover:bg-red-50/30 ${location.includes(loc.address) ? "border-red-700 bg-red-50" : "border-zinc-100"}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${location.includes(loc.address) ? "bg-red-700 text-white" : "bg-zinc-100 text-red-700"}`}>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div>
                              <p className="font-bold text-zinc-900 text-sm">{loc.address}</p>
                              <p className="text-stone-400 text-xs mt-0.5">{loc.cityStateZip}{loc.note ? ` · ${loc.note}` : ""}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-xs font-semibold text-zinc-700">{loc.phone}</p>
                            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">● Open Now</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 4 — Info */}
                {step === 4 && (
                  <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-card">
                    <button onClick={() => setStep(3)} className="flex items-center gap-2 text-stone-400 hover:text-zinc-900 text-sm mb-6 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
                      Back
                    </button>
                    <h2 className="text-2xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Your Details</h2>
                    <p className="text-stone-500 text-sm mb-8">Almost done — just a few details so we can prepare for your visit.</p>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Full Name *</label>
                          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 text-sm placeholder-stone-300 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Phone Number *</label>
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(973) 000-0000"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 text-sm placeholder-stone-300 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Email (optional)</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 text-sm placeholder-stone-300 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Describe the Issue (optional)</label>
                        <textarea rows={3} value={issue} onChange={e => setIssue(e.target.value)}
                          placeholder="e.g. 'Cracked screen, touch still works' or 'Phone won't turn on after water damage'"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-900 text-sm placeholder-stone-300 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all resize-none" />
                      </div>
                      <button onClick={confirm} disabled={submitting || !name || !phone}
                        className="w-full bg-primary-gradient text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-primary disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2">
                        {submitting ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                        ) : (
                          <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Confirm Booking</>
                        )}
                      </button>
                      <p className="text-xs text-stone-400 text-center">No payment required. Walk in at your selected location.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* ── SIDEBAR ── */}
              <div className="space-y-5">

                {/* Summary card */}
                {(device || service || location) && (
                  <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-card">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Your Selection</h4>
                    <div className="space-y-3">
                      {device && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-700 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="5" y="2" width="14" height="20" rx="2"/></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Device</p>
                            <p className="text-sm font-bold text-zinc-900">{selectedDevice?.label ?? device}</p>
                          </div>
                        </div>
                      )}
                      {service && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-700 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Service</p>
                            <p className="text-sm font-bold text-zinc-900">{service}</p>
                          </div>
                        </div>
                      )}
                      {serviceId && PRICE_ESTIMATES[serviceId] && (
                        <div className="pt-3 border-t border-zinc-100">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-stone-400 font-medium">Est. Price Range</span>
                            <span className="font-black text-red-700 text-base" style={{ fontFamily: "Plus Jakarta Sans" }}>{PRICE_ESTIMATES[serviceId]}</span>
                          </div>
                          <p className="text-[10px] text-stone-400 mt-1">Final price after free diagnostic</p>
                        </div>
                      )}
                      {selectedService && (
                        <div className="flex items-center gap-2 pt-2">
                          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                          <span className="text-xs text-emerald-600 font-semibold">{selectedService.time} · Same Day</span>
                        </div>
                      )}
                      {location && (
                        <div className="flex items-center gap-3 pt-2 border-t border-zinc-100">
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-700 flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          </div>
                          <div>
                            <p className="text-[10px] text-stone-400 uppercase tracking-wider">Location</p>
                            <p className="text-sm font-bold text-zinc-900">{location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Call card */}
                <div className="bg-zinc-900 text-white p-6 rounded-2xl">
                  <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Need Help?</h3>
                  <p className="text-zinc-400 text-xs mb-5 leading-relaxed">Speak with a technician directly for complex issues.</p>
                  <a href="tel:9737785900" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-full bg-red-700/20 flex items-center justify-center text-red-400 group-hover:bg-red-700 group-hover:text-white transition-all flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Call Now</p>
                      <p className="font-bold text-sm">973-778-5900</p>
                    </div>
                  </a>
                </div>

                {/* Trust badges */}
                <div className="bg-white rounded-2xl p-6 border border-zinc-100 space-y-4">
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Why Talk N Fix?</h4>
                  {[
                    { icon: "M5 13l4 4L19 7", label: "1-Year Warranty", sub: "On every repair" },
                    { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", label: "OEM-Grade Parts", sub: "Premium quality" },
                    { icon: "M12 6v6l4 2M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z", label: "30–45 Min Repairs", sub: "While you wait" },
                  ].map(t => (
                    <div key={t.label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-700 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={t.icon}/></svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{t.label}</p>
                        <p className="text-xs text-stone-400">{t.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
