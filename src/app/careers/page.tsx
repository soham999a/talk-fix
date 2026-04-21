"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ROLES = [
  "Phone Repair Technician",
  "Sales Associate",
  "Store Manager",
  "Customer Service",
  "Other",
];

const STEPS = [
  { num: "1", title: "Introduce Yourself", desc: "Tell us your name, where you're from, and a little about your background." },
  { num: "2", title: "Your Expertise", desc: "What are you good at? Sales, phone repair, customer service, management? Be specific." },
  { num: "3", title: "Your Weaknesses", desc: "Be honest — what areas are you working to improve? We value self-awareness." },
];

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", videoLink: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("done");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-stone-50">

        {/* Hero */}
        <section className="bg-zinc-900 text-white px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-red-700/20 text-red-400 text-xs font-bold rounded-full tracking-widest uppercase mb-6">
              We&apos;re Hiring
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-5 leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Join the Talk N&apos; Fix Team
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We&apos;re growing fast across Newark &amp; Passaic NJ. If you&apos;re hungry, reliable, and ready to work — we want to hear from you.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 sm:px-6 py-14 max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-2 text-center" style={{ fontFamily: "Plus Jakarta Sans" }}>How to Apply</h2>
          <p className="text-stone-500 text-center mb-10">Record a short video (under 1 minute) answering these 3 questions, upload it to Google Drive, and paste the link below.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map(s => (
              <div key={s.num} className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-black text-lg mb-4" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  {s.num}
                </div>
                <h3 className="font-bold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Google Drive instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="font-bold text-blue-900 mb-2 text-sm">📱 How to upload your video to Google Drive:</p>
            <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
              <li>Record your video on your phone</li>
              <li>Open Google Drive → tap &quot;+&quot; → Upload → select your video</li>
              <li>Once uploaded, tap the file → tap the 3 dots → &quot;Share&quot;</li>
              <li>Change access to &quot;Anyone with the link can view&quot;</li>
              <li>Copy the link and paste it in the form below</li>
            </ol>
          </div>
        </section>

        {/* Application Form */}
        <section className="px-4 sm:px-6 pb-20 max-w-2xl mx-auto">
          {status === "done" ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-zinc-100">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h2 className="text-2xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Application Sent!</h2>
              <p className="text-stone-500 mb-6">We&apos;ve received your video application. Check your email for a confirmation. We&apos;ll be in touch within 3-5 business days.</p>
              <Link href="/" className="bg-primary-gradient text-white font-bold px-8 py-3 rounded-xl hover:brightness-110 transition-all inline-block">
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-100 space-y-4">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-2" style={{ fontFamily: "Plus Jakarta Sans" }}>Submit Your Application</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(973) 000-0000"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Role Applying For *</label>
                <select required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all">
                  <option value="">Select a role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Google Drive Video Link *</label>
                <input required type="url" value={form.videoLink} onChange={e => setForm(f => ({ ...f, videoLink: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10 transition-all" />
                <p className="text-xs text-stone-400 mt-1">Make sure the link is set to &quot;Anyone with the link can view&quot;</p>
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
              )}

              <button type="submit" disabled={status === "sending"}
                className="w-full bg-primary-gradient text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {status === "sending" ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : "Submit Application →"}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
