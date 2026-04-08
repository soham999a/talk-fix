import type { Metadata } from "next";
import "./globals.css";
import SEOSchema from "@/components/SEOSchema";
import AIChat from "@/components/AIChat";
import AppointmentPopup from "@/components/AppointmentPopup";

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
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <SEOSchema />
      </head>
      <body suppressHydrationWarning style={{ backgroundColor: '#f9f9f9', color: '#1a1c1c' }}>
        {children}
        <AIChat />
        <AppointmentPopup />
      </body>
    </html>
  );
}
