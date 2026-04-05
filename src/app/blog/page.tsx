import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog — Phone Repair Tips & News",
  description: "Expert tips, guides and news about phone repair in Newark & Passaic NJ from Talk N Fix Wireless.",
};

const POSTS = [
  { slug: "avoid-overpaying-phone-repair-newark-nj", title: "How to Avoid Overpaying for Cell Phone Repair in Newark NJ", excerpt: "Not all repair shops are equal. Here's what to look for to make sure you're getting fair pricing and quality parts.", date: "Aug 11, 2025", category: "Tips" },
  { slug: "guide-to-iphone-repair-in-new-jersey", title: "The Complete Guide to iPhone Repair Options in New Jersey", excerpt: "From screen replacements to battery swaps — everything you need to know about getting your iPhone fixed in NJ.", date: "Aug 11, 2025", category: "Guide" },
  { slug: "fix-samsung-broken-screen-passaic", title: "Samsung Broken Screen? Here's How We Fix It in Passaic NJ", excerpt: "A cracked Samsung screen doesn't have to ruin your day. Our Passaic team can have it fixed in under an hour.", date: "Sep 15, 2025", category: "Samsung" },
  { slug: "iphone-battery-replacement-new-jersey", title: "How Battery Replacement Services Can Revive Your iPhone in NJ", excerpt: "Is your iPhone dying by noon? A battery replacement might be all you need to get back to full performance.", date: "Jan 8, 2026", category: "iPhone" },
  { slug: "computer-repair-passaic-nj", title: "Why Computer Repair Services in Passaic NJ Offer Great Value", excerpt: "Before you buy a new laptop, consider a repair. Our Passaic team can diagnose and fix most issues same day.", date: "Sep 23, 2025", category: "Computer" },
  { slug: "trusted-wireless-repair-passaic-nj", title: "Why Choosing a Trusted Wireless Repair Service in Passaic NJ Matters", excerpt: "Your phone holds your life. Here's why you should only trust certified technicians with your device.", date: "Aug 11, 2025", category: "Tips" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Tips: "bg-blue-600/15 text-blue-400 border-blue-600/20",
  Guide: "bg-purple-600/15 text-purple-400 border-purple-600/20",
  Samsung: "bg-cyan-600/15 text-cyan-400 border-cyan-600/20",
  iPhone: "bg-zinc-600/15 text-zinc-300 border-zinc-600/20",
  Computer: "bg-orange-600/15 text-orange-400 border-orange-600/20",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                Blog
              </span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight" style={{ fontFamily: "Space Grotesk" }}>
                Repair Tips & <span className="text-gradient">Guides</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {POSTS.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-[#1a1a1a] rounded-2xl p-7 border border-white/5 card-glow block">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`px-3 py-1 rounded-full border text-xs font-bold ${CATEGORY_COLORS[post.category] || "bg-zinc-600/15 text-zinc-400 border-zinc-600/20"}`}>
                      {post.category}
                    </span>
                    <span className="text-zinc-600 text-xs">{post.date}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug" style={{ fontFamily: "Space Grotesk" }}>
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <span className="text-blue-400 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read More →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
