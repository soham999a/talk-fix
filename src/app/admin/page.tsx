"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getBookings, getContactMessages, updateBookingStatus, type Booking, type ContactMessage, type BookingStatus } from "@/lib/firestore";

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  in_progress: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/15 text-red-400 border-red-500/20",
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"bookings" | "messages">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    Promise.all([getBookings(), getContactMessages()])
      .then(([b, m]) => { setBookings(b); setMessages(m); })
      .finally(() => setDataLoading(false));
  }, [user]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setLoginError("Invalid email or password.");
    }
  }

  async function handleStatusChange(id: string, status: BookingStatus) {
    await updateBookingStatus(id, status);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-zinc-500">Loading...</div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-[#1a1a1a] rounded-3xl p-8 border border-white/5">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚡</div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Space Grotesk" }}>Admin Login</h1>
          <p className="text-zinc-500 text-sm mt-1">Talk N Fix Wireless</p>
        </div>
        <form onSubmit={login} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors" />
          {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
          <button type="submit" className="w-full bg-gradient-primary py-3 rounded-xl text-white font-bold hover:brightness-110 transition-all">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Admin Nav */}
      <nav className="bg-[#131313] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <span className="text-white font-bold" style={{ fontFamily: "Space Grotesk" }}>TalkNFix Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm">{user.email}</span>
          <button onClick={() => signOut(auth)} className="text-xs text-zinc-500 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-lg">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Bookings", value: bookings.length },
            { label: "Pending", value: bookings.filter(b => b.status === "pending").length },
            { label: "Completed", value: bookings.filter(b => b.status === "completed").length },
            { label: "Messages", value: messages.length },
          ].map(s => (
            <div key={s.label} className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5">
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "Space Grotesk" }}>{s.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["bookings", "messages"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${tab === t ? "bg-gradient-primary text-white" : "bg-[#1a1a1a] text-zinc-400 border border-white/10 hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="text-zinc-500 text-sm">Loading data...</div>
        ) : tab === "bookings" ? (
          <div className="space-y-3">
            {bookings.length === 0 && <p className="text-zinc-500 text-sm">No bookings yet.</p>}
            {bookings.map(b => (
              <div key={b.id} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Customer</p><p className="text-white font-semibold">{b.name}</p><p className="text-zinc-500 text-xs">{b.phone}</p></div>
                  <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Device</p><p className="text-white">{b.device}</p></div>
                  <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Service</p><p className="text-white">{b.service}</p></div>
                  <div><p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Location</p><p className="text-white text-xs">{b.location}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                  <select
                    value={b.status}
                    onChange={e => b.id && handleStatusChange(b.id, e.target.value as BookingStatus)}
                    className="bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    {(["pending","confirmed","in_progress","completed","cancelled"] as BookingStatus[]).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {messages.length === 0 && <p className="text-zinc-500 text-sm">No messages yet.</p>}
            {messages.map(m => (
              <div key={m.id} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-white font-semibold">{m.name}</p>
                    <p className="text-zinc-500 text-xs">{m.phone} {m.email && `· ${m.email}`}</p>
                  </div>
                  {m.device && <span className="px-3 py-1 rounded-full bg-blue-600/15 text-blue-400 border border-blue-600/20 text-xs font-bold">{m.device}</span>}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{m.message}</p>
                {m.smsOptIn && <p className="text-emerald-400 text-xs mt-2">✓ SMS opt-in</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
