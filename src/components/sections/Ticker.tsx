const items = [
  "iPhone Screen Repair", "Samsung Screen Repair", "Battery Replacement",
  "Charging Port Repair", "Back Glass Repair", "iPad Screen Repair",
  "Game Console HDMI", "Water Damage Repair", "Same-Day Service",
  "1-Year Warranty", "Free Diagnostics", "Walk-ins Welcome",
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/5 bg-[#111] py-4">
      <div className="ticker-track flex gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-zinc-400">
            {item}
            <span className="w-1 h-1 rounded-full bg-blue-500 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
