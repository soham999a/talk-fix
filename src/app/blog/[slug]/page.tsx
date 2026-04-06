import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const POSTS: Record<string, { title: string; date: string; category: string; readTime: string; content: string }> = {
  "avoid-overpaying-phone-repair-newark-nj": {
    title: "How to Avoid Overpaying for Cell Phone Repair in Newark NJ",
    date: "Aug 11, 2025", category: "Tips", readTime: "4 min read",
    content: `Not all repair shops are equal. When your phone breaks, it's tempting to walk into the nearest shop — but that can cost you more than you think.\n\nHere's what to look for when choosing a repair shop in Newark NJ:\n\n**1. Ask about parts quality upfront.** OEM-grade parts cost more but last longer. Cheap aftermarket screens often fail within months.\n\n**2. Check for a warranty.** Any reputable shop should offer at least a 30-day warranty. Talk N Fix Wireless offers a full 1-year warranty on all repairs.\n\n**3. Get a quote before they start.** Never let a shop start work without giving you a written estimate first.\n\n**4. Read Google reviews.** Look for shops with hundreds of reviews, not just a handful. Talk N Fix Wireless has 6,500+ verified Google reviews.\n\n**5. Ask about turnaround time.** Most screen repairs should take 30–45 minutes. If a shop says "come back tomorrow" for a screen repair, that's a red flag.\n\nAt Talk N Fix Wireless, we're transparent about pricing, use premium parts, and back every repair with a 1-year warranty. Walk in today — no appointment needed.`,
  },
  "guide-to-iphone-repair-in-new-jersey": {
    title: "The Complete Guide to iPhone Repair Options in New Jersey",
    date: "Aug 11, 2025", category: "Guide", readTime: "6 min read",
    content: `Cracked your iPhone screen? Battery dying by noon? You have options — and not all of them are equal.\n\n**Apple Store vs. Independent Repair Shop**\n\nApple Stores offer genuine parts but often have long wait times and higher prices. Independent shops like Talk N Fix Wireless offer faster service, competitive pricing, and OEM-grade parts that meet or exceed Apple's specifications.\n\n**What repairs can be done same-day?**\n\n- Screen replacement (30–45 min)\n- Battery replacement (30 min)\n- Charging port repair (30–45 min)\n- Back glass repair (45–60 min)\n- Camera repair (varies)\n\n**How much should iPhone repair cost in NJ?**\n\n- iPhone 15 Pro Max screen: $279–$329\n- iPhone 14 screen: $179–$229\n- Battery replacement: $49–$99\n- Charging port: $59–$89\n\n**Is my data safe?**\n\nYes. Standard repairs like screen and battery replacements do not require accessing your data. Your phone stays locked throughout the repair.\n\nTalk N Fix Wireless has 5 locations across Newark and Passaic NJ. Walk in today for a free diagnostic.`,
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return { title: post.title, description: post.content.slice(0, 160) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug] ?? {
    title: "Blog Post",
    date: "2025",
    category: "Tips",
    readTime: "3 min read",
    content: "This article is coming soon. Check back later for expert repair tips from our certified technicians.",
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-[#f9f9f9]">
        <article className="max-w-3xl mx-auto px-6 py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
            <Link href="/" className="hover:text-red-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-red-700 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-900 font-medium truncate max-w-[200px]">{post.title}</span>
          </div>

          <span className="inline-block px-3 py-1 bg-[#ffdad4] text-[#410000] text-xs font-bold rounded-full mb-5">{post.category}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-5 leading-tight" style={{ fontFamily: "Plus Jakarta Sans" }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-400 mb-10 pb-8 border-b border-zinc-200">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>Talk N Fix Wireless</span>
          </div>

          {/* Featured image placeholder */}
          <div className="w-full h-64 bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-2xl mb-10 flex items-center justify-center">
            <div className="text-center text-zinc-500">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1}/></svg>
              <p className="text-xs opacity-40">Add featured image here</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-zinc max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#603e39] leading-relaxed mb-5 text-base">
                {para.startsWith("**") ? (
                  <strong className="text-zinc-900 font-bold">{para.replace(/\*\*/g, "")}</strong>
                ) : para.startsWith("- ") ? (
                  <span className="block pl-4 border-l-2 border-red-700/20">{para.slice(2)}</span>
                ) : para}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary-gradient rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "Plus Jakarta Sans" }}>Ready to fix your device?</h3>
            <p className="text-white/80 text-sm mb-6">Walk in today — no appointment needed. 5 locations across Newark & Passaic NJ.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/book" className="bg-white text-red-700 font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform text-sm">Get a Quote</Link>
              <Link href="/locations" className="border-2 border-white/40 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-all text-sm">Find a Store</Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
