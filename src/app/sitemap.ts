import { MetadataRoute } from "next"
import { db } from "@/db"
import { listings, users } from "@/db/schema"
import { eq, inArray } from "drizzle-orm"

const BASE_URL = "https://buysitesdirect.com"

const CATEGORIES = [
  "content-site", "saas", "ecommerce", "tool-or-app",
  "newsletter", "community", "service-business", "other",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activeListings = await db
    .select({ slug: listings.slug, updatedAt: listings.updatedAt, sellerId: listings.sellerId })
    .from(listings)
    .where(eq(listings.status, "active"))

  // Only include sellers who have at least one active listing
  const sellerIdsWithListings = [...new Set(activeListings.map((l) => l.sellerId))]
  const sellers = sellerIdsWithListings.length > 0
    ? await db
        .select({ username: users.username, updatedAt: users.updatedAt })
        .from(users)
        .where(inArray(users.id, sellerIdsWithListings))
    : []

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sell`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/buy`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...CATEGORIES.map((cat) => ({
      url: `${BASE_URL}/buy/${cat}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...activeListings.map((listing) => ({
      url: `${BASE_URL}/listings/${listing.slug}`,
      lastModified: listing.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...sellers.map((seller) => ({
      url: `${BASE_URL}/seller/${seller.username}`,
      lastModified: seller.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]
}
