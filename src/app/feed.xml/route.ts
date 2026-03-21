import { db } from "@/db"
import { listings, users } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { formatCurrency } from "@/lib/slug"

const BASE_URL = "https://buysitesdirect.com"

const CATEGORY_LABELS: Record<string, string> = {
  "content-site": "Content Site",
  "saas": "SaaS",
  "ecommerce": "eCommerce",
  "tool-or-app": "Tool / App",
  "newsletter": "Newsletter",
  "community": "Community",
  "service-business": "Service Business",
  "other": "Other",
}

export const dynamic = "force-dynamic"

export async function GET() {
  const rows = await db
    .select({
      listing: listings,
      seller: { username: users.username },
    })
    .from(listings)
    .innerJoin(users, eq(listings.sellerId, users.id))
    .where(eq(listings.status, "active"))
    .orderBy(desc(listings.createdAt))
    .limit(25)

  const items = rows.map(({ listing }) => {
    const categoryLabel = CATEGORY_LABELS[listing.category] ?? "Website"
    const price = formatCurrency(listing.askingPrice)
    const pubDate = new Date(listing.createdAt).toUTCString()
    const descSnippet = listing.description.slice(0, 280).replace(/\s\S*$/, "")
    return `
    <item>
      <title><![CDATA[${listing.title} — ${price} | ${categoryLabel} for Sale]]></title>
      <link>${BASE_URL}/listings/${listing.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/listings/${listing.slug}</guid>
      <description><![CDATA[${categoryLabel} asking ${price}. ${descSnippet}…]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${categoryLabel}</category>
    </item>`
  }).join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Buy Sites Direct – Websites for Sale</title>
    <link>${BASE_URL}</link>
    <description>Latest websites, SaaS businesses, eCommerce stores, and online assets listed for sale on Buy Sites Direct. No broker fees, no commissions.</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
