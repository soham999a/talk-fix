"use client";
import { useState, useEffect } from "react";
import { LOCATIONS } from "@/lib/data";

export default function AppointmentPopup() {
  const [show, setShow] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");
  const [step, setStep] = useState<"form" | "done">("form");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", device: "", issue: "", location: "" });

  useEffect(() => {
    // Show only ONCE ever — localStorage persists across sessions
    if (localStorage.getItem("tnf_popup_seen")) return;
    localStorage.setItem("tnf_popup_seen", "1");
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setShow(false);
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
          issue: form.issue || "General Repair",
          location: form.location,
          service: form.issue || "General Repair",
          status: "pending",
        }),
      });
      setStep("done");
    } finally {
      setSubmitting(false);
    }
  }

  if (!show) return null;

  const es = lang === "es";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
    >
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={() => dismiss()}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Lang toggle */}
        <button
          onClick={() => setLang(l => l === "en" ? "es" : "en")}
          className="absolute top-4 left-4 z-10 text-xs font-bold bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-lg hover:bg-zinc-200 transition-colors"
        >
          {es ? "English" : "Espanol"}
        </button>

        {step === "done" ? (
          /* SUCCESS STATE */
          <div className="p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>
              {es ? "Cita Confirmada!" : "Appointment Confirmed!"}
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              {es
                ? "Llega a tu ubicacion y menciona tu nombre. Todo estara listo para ti — sin esperar en fila."
                : "Walk in to your selected location and mention your name. Everything will be ready — no waiting in line."}
            </p>
            <button onClick={() => dismiss()}
              className="bg-primary-gradient text-white font-bold px-8 py-3 rounded-xl hover:brightness-110 transition-all text-sm">
              {es ? "Perfecto, gracias!" : "Got it, thanks!"}
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <>
            {/* Header */}
            <div className="bg-primary-gradient px-6 pt-10 pb-6 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  {es ? "Sin Espera" : "Skip the Wait"}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "Plus Jakarta Sans" }}>
                {es ? "Reserva Tu Cita" : "Book Your Appointment"}
              </h2>
              <p className="text-red-100 text-sm">
                {es
                  ? "Entra directo — tu turno estara listo"
                  : "Walk straight in — your slot will be ready"}
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center gap-4 px-6 py-3 bg-zinc-50 border-b border-zinc-100">
              {[
                { icon: "M5 13l4 4L19 7", label: es ? "1 Ano Garantia Disponible" : "1-Yr Warranty Available" },
                { icon: "M12 6v6l4 2M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z", label: es ? "30-45 Mins" : "30-45 Mins" },
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", label: es ? "Partes OEM" : "OEM Parts" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-1.5 text-xs text-zinc-600 font-medium">
                  <svg className="w-3.5 h-3.5 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={b.icon}/>
                  </svg>
                  {b.label}
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={submit} className="p-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                    {es ? "Nombre *" : "Name *"}
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder={es ? "Tu nombre" : "Your name"}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                    {es ? "Telefono *" : "Phone *"}
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(973) 000-0000"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  {es ? "Dispositivo" : "Device"}
                </label>
                <input
                  type="text"
                  value={form.device}
                  onChange={e => setForm(f => ({ ...f, device: e.target.value }))}
                  placeholder={es ? "ej. iPhone 14, Samsung S23" : "e.g. iPhone 14, Samsung S23"}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  {es ? "Problema" : "Issue"}
                </label>
                <input
                  type="text"
                  value={form.issue}
                  onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
                  placeholder={es ? "ej. Pantalla rota, bateria" : "e.g. Cracked screen, battery"}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  {es ? "Ubicacion" : "Location"}
                </label>
                <select
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-zinc-900 text-sm focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all"
                >
                  <option value="">{es ? "Selecciona ubicacion" : "Select location"}</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc.id} value={`${loc.address}, ${loc.city}`}>
                      {loc.address}, {loc.city}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting || !form.name || !form.phone}
                className="w-full bg-primary-gradient text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-primary disabled:opacity-50 text-base flex items-center justify-center gap-2 mt-1"
              >
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {es ? "Enviando..." : "Sending..."}</>
                ) : (
                  <>{es ? "Confirmar Cita" : "Confirm Appointment"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                  </svg></>
                )}
              </button>

              <button
                type="button"
                onClick={() => dismiss()}
                className="text-xs text-zinc-400 text-center w-full hover:text-zinc-600 transition-colors mt-1"
              >
                {es ? "No gracias, entro despues." : "No thanks, I'll walk in later"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
