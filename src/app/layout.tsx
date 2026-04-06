import type { Metadata } from "next";
import "./globals.css";
import SEOSchema from "@/components/SEOSchema";
import AIChat from "@/components/AIChat";

export const metadata: Metadata = {
  title: {
    default: "Talk N Fix Wireless | Same-Day Phone Repair Newark & Passaic NJ",
    template: "%s | Talk N Fix Wireless",
  },
  description:
    "Professional cell phone, tablet & device repair in Newark and Passaic NJ. Same-day service in 30–45 minutes. 1-year warranty. 5 locations. Walk-ins welcome.",
  keywords: [
    "phone repair Newark NJ",
    "phone repair Passaic NJ",
    "iPhone screen repair Newark",
    "Samsung screen repair Passaic",
    "cell phone repair New Jersey",
    "same day phone repair NJ",
    "Talk N Fix Wireless",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.talknfixwireless.com",
    siteName: "Talk N Fix Wireless",
    title: "Talk N Fix Wireless | Same-Day Phone Repair Newark & Passaic NJ",
    description:
      "Same-day phone repair in 30–45 minutes. 5 locations across Newark & Passaic NJ. 1-year warranty. Walk-ins welcome.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk N Fix Wireless | Same-Day Phone Repair",
    description: "Same-day phone repair in Newark & Passaic NJ. 30–45 min. 1-year warranty.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.talknfixwireless.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <SEOSchema />
      </head>
      <body>
        {children}
        <AIChat />
        {/* Floating call button — mobile only */}
        <a
          href="tel:9737785900"
          className="fixed bottom-24 right-6 z-40 md:hidden bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all text-white"
          aria-label="Call Now"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
