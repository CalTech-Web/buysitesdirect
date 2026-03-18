import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { db } from "@/db"
import { listings, listingImages, users } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { ListingCard } from "@/components/listings/ListingCard"
import Link from "next/link"
import { ArrowLeft, ArrowRight, FileText, Code2, ShoppingCart, Wrench, Mail, Users, Briefcase, LayoutGrid, type LucideIcon } from "lucide-react"

export const dynamic = "force-dynamic"

const CATEGORY_SEO: Record<string, { slug: string; label: string; title: string; description: string; h1: string; intro: string }> = {
  "content-site": {
    slug: "content-site",
    label: "Content Sites",
    title: "Content Sites for Sale | Buy a Blog or Niche Site",
    description: "Browse content sites, blogs, and niche websites for sale. Buy directly from owners with no broker fees. Verified traffic and revenue metrics on every listing.",
    h1: "Content Sites for Sale",
    intro: "Browse blogs, niche sites, and content websites with verified traffic and revenue. Buy directly from the owner with zero broker fees.",
  },
  "saas": {
    slug: "saas",
    label: "SaaS",
    title: "SaaS Businesses for Sale | Buy a Software Company",
    description: "Find SaaS businesses and software companies for sale. Recurring revenue, verified metrics, and direct seller contact. No commissions on buysitesdirect.com.",
    h1: "SaaS Businesses for Sale",
    intro: "Find software companies with recurring revenue for sale. Every listing includes verified metrics so you can make an informed decision.",
  },
  "ecommerce": {
    slug: "ecommerce",
    label: "eCommerce",
    title: "eCommerce Stores for Sale | Buy an Online Store",
    description: "Shop ecommerce stores and online businesses for sale. Verified revenue and traffic. Contact sellers directly with no broker fees on buysitesdirect.com.",
    h1: "eCommerce Stores for Sale",
    intro: "Explore online stores and ecommerce businesses with real revenue. Contact sellers directly and skip the broker fees.",
  },
  "tool-or-app": {
    slug: "tool-or-app",
    label: "Tools & Apps",
    title: "Online Tools & Apps for Sale | Buy a Web App",
    description: "Discover web apps, online tools, and micro-SaaS products for sale. Verified metrics, direct seller contact, no commissions on buysitesdirect.com.",
    h1: "Online Tools & Apps for Sale",
    intro: "Discover web apps, browser extensions, and online tools with real user bases. Buy directly from builders and developers.",
  },
  "newsletter": {
    slug: "newsletter",
    label: "Newsletters",
    title: "Newsletters for Sale | Buy an Email Newsletter",
    description: "Browse email newsletters for sale with verified subscriber counts and open rates. Buy directly from owners, no broker fees on buysitesdirect.com.",
    h1: "Newsletters for Sale",
    intro: "Find email newsletters with engaged subscriber bases. Verified subscriber counts and open rates on every listing.",
  },
  "community": {
    slug: "community",
    label: "Communities",
    title: "Online Communities for Sale | Buy a Forum or Community",
    description: "Find online communities, forums, and membership sites for sale. Verified member counts, direct seller contact, no fees on buysitesdirect.com.",
    h1: "Online Communities for Sale",
    intro: "Browse forums, membership sites, and online communities. Verified member counts and engagement metrics included.",
  },
  "service-business": {
    slug: "service-business",
    label: "Service Businesses",
    title: "Online Service Businesses for Sale | Buy a Digital Agency",
    description: "Browse online service businesses, agencies, and consulting firms for sale. Real client lists and revenue. No broker fees on buysitesdirect.com.",
    h1: "Service Businesses for Sale",
    intro: "Explore service businesses, agencies, and consulting firms with real clients and revenue. Contact sellers directly.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const seo = CATEGORY_SEO[category]
  if (!seo) return {}

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/buy/${category}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://buysitesdirect.com/buy/${category}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  }
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "content-site":     FileText,
  "saas":             Code2,
  "ecommerce":        ShoppingCart,
  "tool-or-app":      Wrench,
  "newsletter":       Mail,
  "community":        Users,
  "service-business": Briefcase,
  "other":            LayoutGrid,
}

const CATEGORY_HEADER_RADIAL: Record<string, { top: string; bottom: string }> = {
  "content-site":     { top: "rgba(14,165,233,0.28)",  bottom: "rgba(2,132,199,0.14)" },
  "saas":             { top: "rgba(139,92,246,0.28)",  bottom: "rgba(109,40,217,0.14)" },
  "ecommerce":        { top: "rgba(249,115,22,0.28)",  bottom: "rgba(234,88,12,0.14)" },
  "tool-or-app":      { top: "rgba(20,184,166,0.28)",  bottom: "rgba(15,118,110,0.14)" },
  "newsletter":       { top: "rgba(244,63,94,0.28)",   bottom: "rgba(225,29,72,0.14)" },
  "community":        { top: "rgba(16,185,129,0.28)",  bottom: "rgba(5,150,105,0.14)" },
  "service-business": { top: "rgba(245,158,11,0.28)",  bottom: "rgba(217,119,6,0.14)" },
  "other":            { top: "rgba(99,102,241,0.22)",  bottom: "rgba(16,185,129,0.13)" },
}

const CATEGORY_ACCENT_BAR: Record<string, string> = {
  "content-site":     "from-sky-400 to-sky-500",
  "saas":             "from-violet-400 to-violet-500",
  "ecommerce":        "from-orange-400 to-orange-500",
  "tool-or-app":      "from-teal-400 to-teal-500",
  "newsletter":       "from-rose-400 to-rose-500",
  "community":        "from-emerald-400 to-emerald-500",
  "service-business": "from-amber-400 to-amber-500",
  "other":            "from-slate-400 to-slate-500",
}

const CATEGORY_SPARKLE_COLORS: Record<string, [string, string, string]> = {
  "content-site":     ["rgba(56,189,248,0.85)",  "rgba(255,255,255,0.70)", "rgba(14,165,233,0.75)"],
  "saas":             ["rgba(167,139,250,0.85)",  "rgba(255,255,255,0.70)", "rgba(139,92,246,0.75)"],
  "ecommerce":        ["rgba(251,146,60,0.85)",   "rgba(255,255,255,0.70)", "rgba(249,115,22,0.75)"],
  "tool-or-app":      ["rgba(45,212,191,0.85)",   "rgba(255,255,255,0.70)", "rgba(20,184,166,0.75)"],
  "newsletter":       ["rgba(251,113,133,0.85)",  "rgba(255,255,255,0.70)", "rgba(244,63,94,0.75)"],
  "community":        ["rgba(52,211,153,0.85)",   "rgba(255,255,255,0.70)", "rgba(16,185,129,0.75)"],
  "service-business": ["rgba(251,191,36,0.85)",   "rgba(255,255,255,0.70)", "rgba(245,158,11,0.75)"],
  "other":            ["rgba(129,140,248,0.85)",  "rgba(255,255,255,0.70)", "rgba(52,211,153,0.75)"],
}

const RELATED_CATEGORIES: Record<string, string[]> = {
  "content-site":     ["newsletter", "community", "saas"],
  "saas":             ["tool-or-app", "ecommerce", "service-business"],
  "ecommerce":        ["saas", "service-business", "tool-or-app"],
  "tool-or-app":      ["saas", "content-site", "ecommerce"],
  "newsletter":       ["content-site", "community", "service-business"],
  "community":        ["newsletter", "content-site", "saas"],
  "service-business": ["saas", "ecommerce", "community"],
  "other":            ["content-site", "saas", "ecommerce"],
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const seo = CATEGORY_SEO[category]
  if (!seo) notFound()

  const rows = await db
    .select({
      listing: listings,
      sellerUsername: users.username,
    })
    .from(listings)
    .innerJoin(users, eq(listings.sellerId, users.id))
    .where(and(eq(listings.status, "active"), eq(listings.category, seo.slug)))

  const images = rows.length
    ? await db.select().from(listingImages).where(eq(listingImages.displayOrder, 0))
    : []
  const imageMap = Object.fromEntries(images.map((img) => [img.listingId, img.url]))

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Websites for Sale", "item": "https://buysitesdirect.com" },
      { "@type": "ListItem", "position": 2, "name": seo.h1, "item": `https://buysitesdirect.com/buy/${category}` },
    ],
  }

  const itemListSchema = rows.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": seo.h1,
    "description": seo.description,
    "url": `https://buysitesdirect.com/buy/${category}`,
    "numberOfItems": rows.length,
    "itemListElement": rows.map((row, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": row.listing.title,
      "url": `https://buysitesdirect.com/listings/${row.listing.slug}`,
    })),
  } : null

  const headerRadial = CATEGORY_HEADER_RADIAL[category] ?? CATEGORY_HEADER_RADIAL["other"]
  const accentBar = CATEGORY_ACCENT_BAR[category] ?? CATEGORY_ACCENT_BAR["other"]
  const sparkleColors = CATEGORY_SPARKLE_COLORS[category] ?? CATEGORY_SPARKLE_COLORS["other"]
  const CategoryIcon = CATEGORY_ICONS[category] ?? LayoutGrid

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema ? [breadcrumbSchema, itemListSchema] : [breadcrumbSchema]) }}
    />
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Category Hero Banner */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" />
          All listings
        </Link>
        <header className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-10">
          {/* Category accent top bar */}
          <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${accentBar}`} />
          {/* Category-tinted radial gradients */}
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${headerRadial.top} 0%, transparent 60%)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom left, ${headerRadial.bottom} 0%, transparent 60%)` }} />
          {/* Animated floating orbs */}
          <div className="animate-orb-1 absolute -top-10 -right-10 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="animate-orb-2 absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          {/* Sparkle particles */}
          <div className="animate-sparkle absolute w-1 h-1 rounded-full blur-[0.5px] pointer-events-none" style={{ top: '16%', left: '7%', animationDuration: '3.1s', animationDelay: '0s', backgroundColor: sparkleColors[0] }} />
          <div className="animate-sparkle absolute w-px h-px rounded-full pointer-events-none" style={{ top: '65%', left: '5%', animationDuration: '2.4s', animationDelay: '1.0s', backgroundColor: sparkleColors[1] }} />
          <div className="animate-sparkle absolute w-1 h-1 rounded-full blur-[0.5px] pointer-events-none" style={{ top: '22%', right: '10%', animationDuration: '3.7s', animationDelay: '0.5s', backgroundColor: sparkleColors[2] }} />
          <div className="animate-sparkle absolute w-px h-px rounded-full pointer-events-none" style={{ top: '55%', right: '8%', animationDuration: '2.7s', animationDelay: '1.7s', backgroundColor: sparkleColors[1] }} />
          <div className="animate-sparkle absolute w-1.5 h-1.5 rounded-full blur-sm pointer-events-none" style={{ top: '78%', left: '72%', animationDuration: '4.0s', animationDelay: '0.8s', backgroundColor: sparkleColors[0], opacity: 0.4 }} />
          <div className="animate-sparkle absolute w-px h-px rounded-full pointer-events-none" style={{ top: '40%', left: '52%', animationDuration: '2.9s', animationDelay: '2.1s', backgroundColor: sparkleColors[2] }} />
          <div className="animate-sparkle absolute w-1 h-1 rounded-full blur-[0.5px] pointer-events-none" style={{ top: '10%', left: '40%', animationDuration: '3.4s', animationDelay: '1.4s', backgroundColor: sparkleColors[0] }} />
          <div className="animate-sparkle absolute w-px h-px rounded-full pointer-events-none" style={{ top: '28%', left: '86%', animationDuration: '2.5s', animationDelay: '2.7s', backgroundColor: sparkleColors[1] }} />
          <div className="relative flex items-center gap-5">
            {/* Category icon badge */}
            <div className="shrink-0 h-14 w-14 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <CategoryIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="animate-fade-in-up text-2xl sm:text-3xl font-bold text-white leading-snug">{seo.h1}</h1>
              <p className="animate-fade-in-up text-slate-400 text-sm mt-1.5 max-w-2xl leading-relaxed" style={{ animationDelay: '0.1s' }}>{seo.intro}</p>
            </div>
          </div>
          {rows.length > 0 && (
            <div className="animate-fade-in-up relative mt-5 flex items-center gap-2" style={{ animationDelay: '0.2s' }}>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-slate-200 backdrop-blur-sm">
                {rows.length} listing{rows.length !== 1 ? "s" : ""} available
              </span>
            </div>
          )}
        </header>
      </div>

      {rows.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((row, i) => (
            <ListingCard
              key={row.listing.id}
              listing={row.listing}
              sellerUsername={row.sellerUsername}
              imageUrl={imageMap[row.listing.id]}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No {seo.label.toLowerCase()} listed yet.</p>
          <Link href="/" className="text-sm text-indigo-600 hover:underline mt-2 inline-block">
            Browse all listings
          </Link>
        </div>
      )}

      {/* Related categories */}
      <nav aria-label="Related categories" className="mt-16 pt-8 border-t border-border/50">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Browse other categories</h2>
        <div className="flex flex-wrap gap-3">
          {(RELATED_CATEGORIES[category] ?? []).map((rel) => {
            const relSeo = CATEGORY_SEO[rel]
            if (!relSeo) return null
            return (
              <Link
                key={rel}
                href={`/buy/${rel}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/60 text-sm font-medium hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {relSeo.label}
                <ArrowRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            )
          })}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/60 text-sm font-medium hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            All listings
            <ArrowRight className="h-3.5 w-3.5 opacity-50" />
          </Link>
        </div>
      </nav>
    </div>
    </>
  )
}
