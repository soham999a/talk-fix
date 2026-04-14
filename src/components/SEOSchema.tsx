import { LOCATIONS, BUSINESS } from "@/lib/data";

export default function SEOSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": "https://www.talknfixwireless.com/#organization",
        "name": BUSINESS.name,
        "url": "https://www.talknfixwireless.com",
        "logo": "https://www.talknfixwireless.com/hero.png",
        "foundingDate": "2014",
        "founder": { "@type": "Person", "name": "Rey" },
        "sameAs": [
          "https://www.instagram.com/Talknfixwireless/",
          "https://www.youtube.com/@TALKNFIXWIRELESS",
          "https://x.com/talknfixw",
          "https://www.tiktok.com/@talknfixwireless",
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-973-778-5900",
          "contactType": "customer service",
          "areaServed": "NJ",
          "availableLanguage": ["English", "Spanish"],
        },
      },
      // LocalBusiness for each location
      ...LOCATIONS.map(loc => ({
        "@type": ["LocalBusiness", "ElectronicsRepair"],
        "@id": `https://www.talknfixwireless.com/locations#${loc.id}`,
        "name": BUSINESS.name,
        "description": "Professional cell phone, tablet and device repair in Newark and Passaic NJ. Same-day service, 1-year warranty available.",
        "url": "https://www.talknfixwireless.com",
        "telephone": loc.phone,
        "image": "https://www.talknfixwireless.com/hero.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": loc.address,
          "addressLocality": loc.city,
          "addressRegion": "NJ",
          "postalCode": loc.cityStateZip.split(" ").pop(),
          "addressCountry": "US",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": loc.city === "Newark" ? "40.7357" : "40.8568",
          "longitude": loc.city === "Newark" ? "-74.1724" : "-74.1241",
        },
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "19:45" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "10:00", "closes": "17:45" },
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "6500",
          "bestRating": "5",
          "worstRating": "1",
        },
        "priceRange": "$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Cash, Credit Card, Debit Card",
        "hasMap": loc.mapsUrl,
        "servesCuisine": undefined,
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "40.8568", "longitude": "-74.1241" },
          "geoRadius": "30000",
        },
      })),
      // WebSite schema for sitelinks searchbox
      {
        "@type": "WebSite",
        "@id": "https://www.talknfixwireless.com/#website",
        "url": "https://www.talknfixwireless.com",
        "name": BUSINESS.name,
        "description": "Same-day phone repair in Newark & Passaic NJ",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.talknfixwireless.com/services?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      // FAQPage schema
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How much does iPhone screen repair cost in Newark NJ?", "acceptedAnswer": { "@type": "Answer", "text": "iPhone screen repair at Talk N Fix Wireless ranges from $79 to $329 depending on your model. Call 973-778-5900 for an exact quote." } },
          { "@type": "Question", "name": "How long does phone repair take?", "acceptedAnswer": { "@type": "Answer", "text": "Most phone screen repairs are completed within 30-45 Minutes while you wait in-store." } },
          { "@type": "Question", "name": "Do you offer a warranty on repairs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, a 1-year warranty is available on repairs at Talk N Fix Wireless." } },
          { "@type": "Question", "name": "Do I need an appointment for phone repair?", "acceptedAnswer": { "@type": "Answer", "text": "No appointment needed. Walk-ins are always welcome at all 4 locations in Newark and Passaic NJ." } },
          { "@type": "Question", "name": "Where is Talk N Fix Wireless located?", "acceptedAnswer": { "@type": "Answer", "text": "Talk N Fix Wireless has 4 locations: 354 Passaic St Passaic NJ, 315 Monroe St Passaic NJ, 207 Ferry St Newark NJ, and 674 Mt. Prospect Ave Newark NJ." } },
          { "@type": "Question", "name": "What devices do you repair?", "acceptedAnswer": { "@type": "Answer", "text": "We repair iPhones, Samsung Galaxy phones, iPads, laptops, computers, game consoles, and more. All major brands and models." } },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
