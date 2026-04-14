import type { Metadata } from "next";
import "./globals.css";
import SEOSchema from "@/components/SEOSchema";
import OfferBanner from "@/components/OfferBanner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.talknfixwireless.com"),
  title: {
    default: "Talk N Fix Wireless | Same-Day Phone Repair Newark & Passaic NJ",
    template: "%s | Talk N Fix Wireless",
  },
  icons: {
    icon: [
      { url: "/favicon.JPG?v=2", type: "image/jpeg" },
    ],
    apple: "/favicon.JPG?v=2",
    shortcut: "/favicon.JPG?v=2",
  },
  description:
    "Talk N Fix Wireless — professional cell phone repair in Newark & Passaic NJ. iPhone screen repair, Samsung repair, battery replacement. Same-day service in 30-45 Mins. 1-year warranty available. Walk-ins welcome. 4 locations.",
  keywords: [
    "phone repair Newark NJ",
    "phone repair Passaic NJ",
    "iPhone screen repair Newark NJ",
    "Samsung screen repair Passaic NJ",
    "cell phone repair near me",
    "same day phone repair NJ",
    "cracked screen repair Newark",
    "battery replacement Passaic NJ",
    "Talk N Fix Wireless",
    "phone repair New Jersey",
    "iPhone repair Newark",
    "Samsung repair Passaic",
  ],
  authors: [{ name: "Talk N Fix Wireless" }],
  creator: "Talk N Fix Wireless",
  publisher: "Talk N Fix Wireless",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.talknfixwireless.com",
    siteName: "Talk N Fix Wireless",
    title: "Talk N Fix Wireless | Same-Day Phone Repair Newark & Passaic NJ",
    description:
      "Professional phone repair in Newark & Passaic NJ. iPhone, Samsung, iPad repair. Same-day service in 30-45 Mins. 1-year warranty available. 4 locations. Walk-ins welcome.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Talk N Fix Wireless — Phone Repair in Newark & Passaic NJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@talknfixw",
    creator: "@talknfixw",
    title: "Talk N Fix Wireless | Same-Day Phone Repair Newark & Passaic NJ",
    description: "Same-day phone repair in Newark & Passaic NJ. 30-45 Mins. 1-year warranty available. Walk-ins welcome.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://www.talknfixwireless.com" },
  verification: {
    google: "add-your-google-search-console-verification-here",
  },
  category: "Electronics Repair",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <link rel="icon" href="/favicon.JPG?v=2" type="image/jpeg" />
        <link rel="shortcut icon" href="/favicon.JPG?v=2" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/favicon.JPG?v=2" />
        <meta name="color-scheme" content="light" />
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="Newark, Passaic, New Jersey" />
        <meta name="geo.position" content="40.8568;-74.1241" />
        <meta name="ICBM" content="40.8568, -74.1241" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <SEOSchema />
      </head>
      <body suppressHydrationWarning style={{ backgroundColor: "#f9f9f9", color: "#1a1c1c" }}>
        <OfferBanner />
        {children}
        {/* LeadConnector chatbot — tracks client questions */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6998b3996e6009dfae3af48a"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
