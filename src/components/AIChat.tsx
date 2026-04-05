"use client";
import { useState, useRef, useEffect } from "react";
import { Icons } from "@/components/Icons";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the Talk N Fix assistant. Tell me what's wrong with your device and I'll give you an instant repair estimate!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/ai-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Call us at 973-778-5900 for a quick quote!" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:brightness-110 transition-all"
        aria-label="AI Repair Assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <Icons.Bot />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: "480px" }}>
          {/* Header */}
          <div className="bg-gradient-primary px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Icons.Bot />
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "Space Grotesk" }}>AI Repair Assistant</p>
              <p className="text-blue-100 text-xs">Instant quotes · Talk N Fix Wireless</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar" style={{ minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-[#2a2a2a] text-zinc-300 rounded-bl-sm"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#2a2a2a] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/5 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Describe your issue..."
              className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button onClick={send} disabled={loading || !input.trim()}
              className="bg-gradient-primary px-4 py-2.5 rounded-xl text-white font-bold text-sm hover:brightness-110 transition-all disabled:opacity-40 flex items-center">
              <Icons.ArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
