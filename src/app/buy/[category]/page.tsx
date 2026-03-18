import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { db } from "@/db"
import { listings, listingImages, users } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { ListingCard } from "@/components/listings/ListingCard"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

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

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema ? [breadcrumbSchema, itemListSchema] : [breadcrumbSchema]) }}
    />
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-3.5 w-3.5" />
          All listings
        </Link>
        <h1 className="text-3xl font-bold">{seo.h1}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{seo.intro}</p>
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
