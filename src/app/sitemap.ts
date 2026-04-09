import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data";

const BASE = "https://www.talknfixwireless.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = SERVICES.map(s => ({
    url: `${BASE}/services/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogSlugs = [
    "avoid-overpaying-phone-repair-newark-nj",
    "guide-to-iphone-repair-in-new-jersey",
    "fix-samsung-broken-screen-passaic",
    "iphone-battery-replacement-new-jersey",
    "computer-repair-passaic-nj",
    "trusted-wireless-repair-passaic-nj",
  ];

  const blogPages = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/locations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/book`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...servicePages,
    ...blogPages,
  ];
}
