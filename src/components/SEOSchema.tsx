import { LOCATIONS, BUSINESS } from "@/lib/data";

export default function SEOSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness for each location
      ...LOCATIONS.map(loc => ({
        "@type": "LocalBusiness",
        "@id": `https://www.talknfixwireless.com/locations#${loc.id}`,
        "name": BUSINESS.name,
        "description": "Professional cell phone, tablet and device repair. Same-day service, 1-year warranty.",
        "url": "https://www.talknfixwireless.com",
        "telephone": loc.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": loc.address,
          "addressLocality": loc.city,
          "addressRegion": "NJ",
          "postalCode": loc.cityStateZip.split(" ").pop(),
          "addressCountry": "US",
        },
        "openingHoursSpecification": [
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "19:45" },
          { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "10:00", "closes": "17:45" },
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "6500",
        },
        "priceRange": "$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Cash, Credit Card",
      })),
      // FAQPage schema
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How much does phone repair cost?", "acceptedAnswer": { "@type": "Answer", "text": "Pricing depends on the device model and part option. Call your nearest location for an exact quote." } },
          { "@type": "Question", "name": "How long does a repair take?", "acceptedAnswer": { "@type": "Answer", "text": "Most repairs are completed within 30–45 minutes while you wait." } },
          { "@type": "Question", "name": "Do you offer a warranty?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — every repair includes a 1-year warranty against defects." } },
          { "@type": "Question", "name": "Do I need an appointment?", "acceptedAnswer": { "@type": "Answer", "text": "No appointment needed. Walk-ins are always welcome at all 4 Locations." } },
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
