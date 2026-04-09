const items = [
  "Phone Screen Repair in 30-45 Min", "Samsung Screen Repair", "Battery Replacement",
  "Charging Port Repair", "Back Glass Repair", "iPad Screen Repair",
  "Game Console HDMI", "Water Damage Repair", "Same-Day Service",
  "1-Year Warranty Available", "Free Diagnostics", "Walk-ins Welcome",
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-zinc-200 bg-white py-3">
      <div className="ticker-track flex gap-8 sm:gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-10 text-xs font-bold uppercase tracking-widest text-zinc-400">
            {item}
            <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
