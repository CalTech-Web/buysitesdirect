import { MetadataRoute } from "next"
import { db } from "@/db"
import { listings, users } from "@/db/schema"
import { eq } from "drizzle-orm"

const BASE_URL = "https://buysitesdirect.com"

const CATEGORIES = [
  "content-site", "saas", "ecommerce", "tool-or-app",
  "newsletter", "community", "service-business", "other",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [activeListings, sellers] = await Promise.all([
    db
      .select({ slug: listings.slug, updatedAt: listings.updatedAt })
      .from(listings)
      .where(eq(listings.status, "active")),
    db
      .select({ username: users.username, updatedAt: users.updatedAt })
      .from(users),
  ])

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
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
      priority: 0.5,
    })),
  ]
}
