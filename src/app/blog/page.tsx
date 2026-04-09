import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog â€” Phone Repair Tips & News",
  description: "Expert tips, guides and news about phone repair in Newark & Passaic NJ from Talk N Fix Wireless.",
};

const POSTS = [
  { slug: "avoid-overpaying-phone-repair-newark-nj", title: "How to Avoid Overpaying for Cell Phone Repair in Newark NJ", excerpt: "Not all repair shops are equal. Here's what to look for to make sure you're getting fair pricing and quality parts.", date: "Aug 11, 2025", category: "Tips", readTime: "4 min read" },
  { slug: "guide-to-iphone-repair-in-new-jersey", title: "The Complete Guide to iPhone Repair Options in New Jersey", excerpt: "From screen replacements to battery swaps â€” everything you need to know about getting your iPhone fixed in NJ.", date: "Aug 11, 2025", category: "Guide", readTime: "6 min read" },
  { slug: "fix-samsung-broken-screen-passaic", title: "Samsung Broken Screen? Here's How We Fix It in Passaic NJ", excerpt: "A cracked Samsung screen doesn't have to ruin your day. Our Passaic team can have it fixed in under an hour.", date: "Sep 15, 2025", category: "Samsung", readTime: "3 min read" },
  { slug: "iphone-battery-replacement-new-jersey", title: "How Battery Replacement Services Can Revive Your iPhone in NJ", excerpt: "Is your iPhone dying by noon? A battery replacement might be all you need to get back to full performance.", date: "Jan 8, 2026", category: "iPhone", readTime: "4 min read" },
  { slug: "computer-repair-passaic-nj", title: "Why Computer Repair Services in Passaic NJ Offer Great Value", excerpt: "Before you buy a new laptop, consider a repair. Our Passaic team can diagnose and fix most issues same day.", date: "Sep 23, 2025", category: "Computer", readTime: "3 min read" },
  { slug: "trusted-wireless-repair-passaic-nj", title: "Why Choosing a Trusted Wireless Repair Service in Passaic NJ Matters", excerpt: "Your phone holds your life. Here's why you should only trust certified technicians with your device.", date: "Aug 11, 2025", category: "Tips", readTime: "5 min read" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Tips: "bg-blue-100 text-blue-950",
  Guide: "bg-red-100 text-red-950",
  Samsung: "bg-zinc-100 text-zinc-700",
  iPhone: "bg-zinc-100 text-zinc-700",
  Computer: "bg-zinc-100 text-zinc-700",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-stone-50">
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-red-700 font-bold tracking-[0.2em] text-sm mb-3 uppercase">Blog</p>
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  Repair Tips & Guides
                </h1>
                <p className="text-stone-600 max-w-sm text-sm">Expert advice from our certified technicians to help you get the most from your devices.</p>
              </div>
            </div>

            {/* Featured post */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-card mb-8 group hover:shadow-xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
                    alt={POSTS[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-10 flex flex-col justify-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${CATEGORY_COLORS[POSTS[0].category]}`}>{POSTS[0].category}</span>
                  <h2 className="text-2xl font-extrabold text-zinc-900 mb-3 group-hover:text-red-700 transition-colors" style={{ fontFamily: "Plus Jakarta Sans" }}>
                    {POSTS[0].title}
                  </h2>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">{POSTS[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span>{POSTS[0].date}</span>
                      <span>Â·</span>
                      <span>{POSTS[0].readTime}</span>
                    </div>
                    <Link href={`/blog/${POSTS[0].slug}`} className="text-red-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {POSTS.slice(1).map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${["1601972599720-36938d4ecd31","1556742049-0cfed4f6a45d","1512941937669-90a1b58e7e9c","1574944985070-8f3ebc6b79d2","1558618666-fcd25c85cd64","1611532736597-de2d4265fba3"][POSTS.slice(1).indexOf(post) % 6]}?w=600&q=80`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[post.category] ?? "bg-zinc-100 text-zinc-700"}`}>{post.category}</span>
                      <span className="text-stone-500 text-xs">{post.readTime}</span>
                    </div>
                    <h2 className="text-base font-bold text-zinc-900 mb-2 group-hover:text-red-700 transition-colors leading-snug" style={{ fontFamily: "Plus Jakarta Sans" }}>
                      {post.title}
                    </h2>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 text-xs">{post.date}</span>
                      <span className="text-red-700 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
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

