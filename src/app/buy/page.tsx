import type { Metadata } from "next"
import Link from "next/link"
import { db } from "@/db"
import { listings } from "@/db/schema"
import { eq, count } from "drizzle-orm"
import { FileText, Code2, ShoppingCart, Wrench, Mail, Users, Briefcase, LayoutGrid, ArrowRight, type LucideIcon } from "lucide-react"

export const dynamic = "force-dynamic"

const BASE_URL = "https://buysitesdirect.com"

export const metadata: Metadata = {
  title: "Buy a Website | Browse All Categories | Buy Sites Direct",
  description: "Browse websites for sale by category: content sites, SaaS, eCommerce, newsletters, tools, and more. No broker fees. Contact sellers directly.",
  alternates: { canonical: "/buy" },
  openGraph: {
    title: "Buy a Website | Browse All Categories | Buy Sites Direct",
    description: "Browse websites for sale by category: content sites, SaaS, eCommerce, newsletters, tools, and more. No broker fees.",
    url: `${BASE_URL}/buy`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Buy a Website – Browse All Categories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy a Website | Browse All Categories | Buy Sites Direct",
    description: "Browse websites for sale by category: content sites, SaaS, eCommerce, newsletters, tools, and more. No broker fees.",
    images: ["/og-image.png"],
  },
}

type CategoryEntry = {
  key: string
  label: string
  Icon: LucideIcon
  description: string
}

const CATEGORIES: CategoryEntry[] = [
  { key: "content-site",     label: "Content Sites",      Icon: FileText,     description: "Blogs, niche sites, and informational portals earning via display ads and affiliates." },
  { key: "saas",             label: "SaaS Businesses",    Icon: Code2,        description: "Software products with recurring subscription revenue and predictable MRR." },
  { key: "ecommerce",        label: "eCommerce Stores",   Icon: ShoppingCart, description: "Online retail businesses selling physical or digital products." },
  { key: "newsletter",       label: "Newsletters",        Icon: Mail,         description: "Paid and sponsored email newsletters with engaged subscriber bases." },
  { key: "tool-or-app",      label: "Tools & Apps",       Icon: Wrench,       description: "Web tools, browser extensions, APIs, and software utilities." },
  { key: "community",        label: "Online Communities", Icon: Users,        description: "Forums, Discord servers, membership sites, and private groups." },
  { key: "service-business", label: "Service Businesses", Icon: Briefcase,    description: "Agency, freelance, and done-for-you service operations." },
  { key: "other",            label: "Other Businesses",   Icon: LayoutGrid,   description: "Marketplaces, directories, and other web-based assets." },
]

export default async function BuyPage() {
  const countRows = await db
    .select({ category: listings.category, total: count() })
    .from(listings)
    .where(eq(listings.status, "active"))
    .groupBy(listings.category)

  const countMap = Object.fromEntries(countRows.map(({ category, total }) => [category, total]))

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Buy Sites Direct", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Buy a Website", "item": `${BASE_URL}/buy` },
    ],
  }

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/buy`,
    "name": "Buy a Website – All Categories",
    "url": `${BASE_URL}/buy`,
    "description": "Browse websites for sale by category on Buy Sites Direct. Content sites, SaaS, eCommerce, newsletters, tools, and more. No broker fees.",
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "hasPart": CATEGORIES.map((cat) => ({
      "@type": "WebPage",
      "name": `${cat.label} for Sale`,
      "url": `${BASE_URL}/buy/${cat.key}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, collectionPageSchema]) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Buy a Website</span>
        </nav>

        <h1 className="text-3xl font-bold mb-3">Buy a Website</h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Browse active listings across every category of online business. Contact sellers directly with no broker fees or commissions. Every listing includes asking price, monthly revenue, traffic, and a full description.
        </p>

        <div className="space-y-3">
          {CATEGORIES.map(({ key, label, Icon, description }) => {
            const listingCount = countMap[key] ?? 0
            return (
              <Link
                key={key}
                href={`/buy/${key}`}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-background hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                  <Icon className="w-5 h-5 text-slate-500 group-hover:text-indigo-500 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{label}</span>
                    {listingCount > 0 && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                        {listingCount} listing{listingCount !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-indigo-500 transition-colors shrink-0" />
              </Link>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-50/60 to-emerald-50/40 dark:from-indigo-950/30 dark:to-emerald-950/20 p-8 text-center">
          <h2 className="font-bold text-lg mb-2">Not sure where to start?</h2>
          <p className="text-muted-foreground text-sm mb-5">
            Browse all active listings or read our buying guide before contacting a seller.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#listings"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Browse all listings
            </Link>
            <Link
              href="/faq#buying"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
            >
              Buying guide
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
