"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isBookingForm?: boolean;
  isBookingConfirm?: boolean;
}

type Lang = "en" | "es";

const LOCATIONS_LIST = [
  "354 Passaic St, Passaic NJ",
  "315 Monroe St, Passaic NJ",
  "165 Market St, Passaic NJ",
  "207 Ferry St, Newark NJ",
  "674 Mt. Prospect Ave, Newark NJ",
];

const TEXT = {
  en: {
    title: "Talk N Fix Assistant",
    subtitle: "Online · Instant replies",
    welcome: "Hi! I'm Alex from Talk N Fix Wireless. I can give you instant repair estimates, answer questions, or book your appointment. What can I help you with?",
    placeholder: "Ask about repairs, pricing, booking...",
    quickReplies: ["iPhone screen repair price?", "How long does it take?", "Book an appointment", "Store locations"],
    poweredBy: "Powered by",
    bookTitle: "Book Your Appointment",
    bookSub: "Skip the wait — we'll have your slot ready",
    namePlaceholder: "Your full name",
    phonePlaceholder: "Your phone number",
    devicePlaceholder: "Device (e.g. iPhone 14)",
    issuePlaceholder: "What needs fixing?",
    locationLabel: "Preferred location",
    bookBtn: "Confirm Appointment",
    bookingBtn: "Book Appointment",
    cancelBtn: "Cancel",
    confirmMsg: "Your appointment is confirmed! Walk in to your selected location and mention your name — we'll have everything ready. No waiting!",
    popupTitle: "Skip the Wait!",
    popupMsg: "Book your repair slot now and walk straight in. No waiting in line.",
    popupBtn: "Book My Slot",
    popupDismiss: "Maybe later",
    sending: "Sending...",
    langSwitch: "Espanol",
    quickLabel: "Quick questions:",
    bookCta: "Book Appointment",
  },
  es: {
    title: "Asistente Talk N Fix",
    subtitle: "En linea · Respuestas instantaneas",
    welcome: "Hola! Soy Alex de Talk N Fix Wireless. Puedo darte estimados de reparacion, responder preguntas o reservar tu cita. En que te puedo ayudar?",
    placeholder: "Pregunta sobre reparaciones, precios...",
    quickReplies: ["Precio de pantalla iPhone?", "Cuanto tiempo tarda?", "Reservar una cita", "Ubicaciones"],
    poweredBy: "Desarrollado por",
    bookTitle: "Reserva Tu Cita",
    bookSub: "Sin espera — tendremos tu turno listo",
    namePlaceholder: "Tu nombre completo",
    phonePlaceholder: "Tu numero de telefono",
    devicePlaceholder: "Dispositivo (ej. iPhone 14)",
    issuePlaceholder: "Que necesita reparacion?",
    locationLabel: "Ubicacion preferida",
    bookBtn: "Confirmar Cita",
    bookingBtn: "Reservar Cita",
    cancelBtn: "Cancelar",
    confirmMsg: "Tu cita esta confirmada! Llega a tu ubicacion y menciona tu nombre — todo estara listo para ti!",
    popupTitle: "Sin Espera!",
    popupMsg: "Reserva tu turno ahora y entra directo. Sin hacer fila.",
    popupBtn: "Reservar Mi Turno",
    popupDismiss: "Quizas despues",
    sending: "Enviando...",
    langSwitch: "English",
    quickLabel: "Preguntas rapidas:",
    bookCta: "Reservar Cita",
  },
};

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", device: "", issue: "", location: "" });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = TEXT[lang];

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([{ role: "assistant", content: t.welcome }]);
    setShowQuickReplies(true);
  }, [lang, t.welcome]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setShowPopup(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const triggerBookingForm = useCallback(() => {
    setShowPopup(false);
    setOpen(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: lang === "en"
          ? "Let me get your appointment set up! Fill in the details below and you can walk straight in — no waiting."
          : "Vamos a programar tu cita! Completa los detalles abajo y puedes entrar directo — sin esperar.",
        isBookingForm: true,
      }]);
      setShowQuickReplies(false);
    }, 400);
  }, [lang]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setShowQuickReplies(false);

    const isBookingRequest = /book|appointment|reservar|cita/i.test(msg);
    if (isBookingRequest) {
      setMessages(prev => [
        ...prev,
        { role: "user", content: msg },
        {
          role: "assistant",
          content: lang === "en"
            ? "I'd love to book your appointment! Fill in the quick form below and you can walk straight in — no waiting in line."
            : "Con gusto reservo tu cita! Completa el formulario rapido abajo y puedes entrar directo — sin hacer fila.",
          isBookingForm: true,
        },
      ]);
      return;
    }

    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages
        .filter(m => !m.isBookingForm && !m.isBookingConfirm)
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/ai-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, lang }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: lang === "en"
          ? "Call us at 973-778-5900 for a quick quote. Walk-ins welcome at all 5 locations!"
          : "Llamanos al 973-778-5900. Visitas sin cita en las 5 ubicaciones!",
      }]);
    } finally {
      setLoading(false);
    }
  }

  async function submitBooking() {
    if (!bookingForm.name || !bookingForm.phone) return;
    setBookingSubmitting(true);
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingForm.name,
          phone: bookingForm.phone,
          device: bookingForm.device,
          issue: bookingForm.issue,
          location: bookingForm.location,
          service: bookingForm.issue || "General Repair",
          status: "pending",
        }),
      });
      setMessages(prev => prev.map(m =>
        m.isBookingForm ? { ...m, isBookingForm: false, isBookingConfirm: true } : m
      ));
      setMessages(prev => [...prev, { role: "assistant", content: t.confirmMsg }]);
      setBookingForm({ name: "", phone: "", device: "", issue: "", location: "" });
    } finally {
      setBookingSubmitting(false);
    }
  }

  const showBookingCta = messages.length >= 4 && !messages.some(m => m.isBookingForm || m.isBookingConfirm) && !loading;

  return (
    <>
      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary-gradient flex items-center justify-center text-white shadow-[0_8px_30px_rgba(188,1,0,0.45)] hover:brightness-110 transition-all active:scale-95"
        aria-label="Open chat"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-5 h-5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* CHAT WINDOW */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-[calc(100vw-40px)] sm:w-[340px] md:w-[390px] bg-white rounded-2xl shadow-2xl border border-zinc-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
        style={{ maxHeight: "75vh" }}
      >
        {/* HEADER */}
        <div className="bg-primary-gradient px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans" }}>
              A
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>{t.title}</p>
            <p className="text-red-100 text-xs">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setLang(l => l === "en" ? "es" : "en")}
              className="text-white/80 hover:text-white text-xs font-bold bg-white/15 px-2 py-1 rounded-lg transition-colors"
            >
              {t.langSwitch}
            </button>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-stone-50" style={{ minHeight: 0 }}>
          {messages.map((m, i) => (
            <div key={i}>
              {/* Booking form */}
              {m.isBookingForm && (
                <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                  <div className="bg-red-50 px-4 py-3 border-b border-zinc-100">
                    <p className="font-bold text-zinc-900 text-sm" style={{ fontFamily: "Plus Jakarta Sans" }}>{t.bookTitle}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{t.bookSub}</p>
                  </div>
                  <div className="p-4 space-y-2.5">
                    <input value={bookingForm.name} onChange={e => setBookingForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={t.namePlaceholder}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-xs placeholder-zinc-400 focus:outline-none focus:border-red-700 transition-all" />
                    <input value={bookingForm.phone} onChange={e => setBookingForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder={t.phonePlaceholder} type="tel"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-xs placeholder-zinc-400 focus:outline-none focus:border-red-700 transition-all" />
                    <input value={bookingForm.device} onChange={e => setBookingForm(f => ({ ...f, device: e.target.value }))}
                      placeholder={t.devicePlaceholder}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-xs placeholder-zinc-400 focus:outline-none focus:border-red-700 transition-all" />
                    <input value={bookingForm.issue} onChange={e => setBookingForm(f => ({ ...f, issue: e.target.value }))}
                      placeholder={t.issuePlaceholder}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-xs placeholder-zinc-400 focus:outline-none focus:border-red-700 transition-all" />
                    <select value={bookingForm.location} onChange={e => setBookingForm(f => ({ ...f, location: e.target.value }))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-xs focus:outline-none focus:border-red-700 transition-all">
                      <option value="">{t.locationLabel}</option>
                      {LOCATIONS_LIST.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <button onClick={submitBooking} disabled={bookingSubmitting || !bookingForm.name || !bookingForm.phone}
                      className="w-full bg-primary-gradient text-white font-bold py-3 rounded-xl text-xs hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                      {bookingSubmitting ? (
                        <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t.sending}</>
                      ) : t.bookBtn}
                    </button>
                  </div>
                </div>
              )}

              {/* Booking confirmed */}
              {m.isBookingConfirm && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                  <p className="text-2xl mb-1">&#x1F389;</p>
                  <p className="text-emerald-800 font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans" }}>
                    {lang === "en" ? "Appointment Confirmed!" : "Cita Confirmada!"}
                  </p>
                </div>
              )}

              {/* Regular message */}
              {!m.isBookingForm && !m.isBookingConfirm && (
                <div className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-red-700">
                      A
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-red-700 text-white rounded-br-sm"
                      : "bg-white text-zinc-800 rounded-bl-sm shadow-sm border border-zinc-100"
                  }`}>
                    {m.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-red-700">A</div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-zinc-100 flex items-center gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          {/* Quick replies */}
          {showQuickReplies && !loading && messages.length === 1 && (
            <div className="pt-1">
              <p className="text-xs text-zinc-400 mb-2 font-medium">{t.quickLabel}</p>
              <div className="flex flex-wrap gap-2">
                {t.quickReplies.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:border-red-700 hover:text-red-700 transition-all font-medium shadow-sm">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Book appointment CTA after a few messages */}
          {showBookingCta && (
            <div className="flex justify-center pt-1">
              <button
                onClick={() => send(lang === "en" ? "Book an appointment" : "Reservar una cita")}
                className="text-xs px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 transition-all font-bold flex items-center gap-1.5"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"/>
                </svg>
                {t.bookCta}
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-3 border-t border-zinc-100 bg-white flex-shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder={t.placeholder}
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 text-sm placeholder-zinc-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all"
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className="bg-primary-gradient w-10 h-10 rounded-xl flex items-center justify-center text-white hover:brightness-110 transition-all disabled:opacity-40 flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-zinc-300"><circle cx="12" cy="12" r="10"/></svg>
            <span className="text-xs text-zinc-300 font-medium">{t.poweredBy} <span className="text-zinc-400 font-bold">Nicecare</span></span>
          </div>
        </div>
      </div>
    </>
  );
}
