import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { db } from "@/db"
import { listings, listingImages, users } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { ListingCard } from "@/components/listings/ListingCard"
import Link from "next/link"
import { ArrowRight, FileText, Code2, ShoppingCart, Wrench, Mail, Users, Briefcase, LayoutGrid, type LucideIcon } from "lucide-react"

export const dynamic = "force-dynamic"

type CategorySeo = {
  slug: string
  label: string
  title: string
  description: string
  h1: string
  intro: string
  guide: string[]
  faqs: { q: string; a: string }[]
}

const CATEGORY_SEO: Record<string, CategorySeo> = {
  "content-site": {
    slug: "content-site",
    label: "Content Sites",
    title: "Content Sites for Sale | Buy a Blog or Niche Site",
    description: "Browse content sites, blogs, and niche websites for sale. Buy directly from owners with no broker fees. Verified traffic and revenue metrics on every listing.",
    h1: "Content Sites for Sale",
    intro: "Browse blogs, niche sites, and content websites with verified traffic and revenue. Buy directly from the owner with zero broker fees.",
    guide: [
      "Content sites include blogs, niche websites, and informational portals that earn primarily through display advertising, affiliate commissions, or sponsored content. The traffic source breakdown is one of the most important factors to evaluate: a site with 80%+ organic search traffic is more resilient than one dependent on a single social platform or paid channel.",
      "When reviewing a content site, check the backlink profile for any manual or algorithmic Google penalties, examine the revenue sources (some affiliate programs change commission rates with little notice), and assess how much of the content needs ongoing updates versus evergreen pieces that hold value indefinitely.",
      "Valuations for content sites typically fall in the range of 20 to 40x monthly net profit. Sites with stable organic traffic, diversified monetisation, and aged domains command the higher end of that range.",
    ],
    faqs: [
      {
        q: "What should I check before buying a content site?",
        a: "Review the organic traffic trend in Google Search Console or an analytics tool, verify the revenue with screenshots of ad network or affiliate dashboards, check the backlink profile for spammy links, and confirm the domain has no Google penalties. Also ask whether the content was AI-generated, as search engines are increasingly able to identify and devalue low-quality machine-written content.",
      },
      {
        q: "How are content sites valued?",
        a: "Content sites are typically valued at 20 to 40 times monthly net profit. A site earning $1,000/month net would be listed anywhere from $20,000 to $40,000 depending on traffic stability, revenue diversification, and domain age. Sites with a single revenue source or declining traffic are valued at the lower end.",
      },
      {
        q: "How long does it take to transfer a content site?",
        a: "Domain transfer usually takes 3 to 7 days. Full handover of hosting, content, and monetisation accounts (ad networks, affiliate programs) can take 1 to 2 weeks with an organised seller. Agree on a handover checklist before closing the deal.",
      },
    ],
  },
  "saas": {
    slug: "saas",
    label: "SaaS",
    title: "SaaS Businesses for Sale | Buy a Software Company",
    description: "Find SaaS businesses and software companies for sale. Recurring revenue, verified metrics, and direct seller contact. No commissions on buysitesdirect.com.",
    h1: "SaaS Businesses for Sale",
    intro: "Find software companies with recurring revenue for sale. Every listing includes verified metrics so you can make an informed decision.",
    guide: [
      "SaaS businesses are valued for their predictable recurring revenue. The core metrics to evaluate are Monthly Recurring Revenue (MRR), monthly churn rate, customer acquisition cost (CAC), and average revenue per user (ARPU). A low churn rate is often more important than headline revenue: a SaaS losing 5% of customers per month will shrink to half its size within 14 months regardless of new sales.",
      "Software infrastructure matters more for SaaS than for content-based businesses. Before closing, have an independent developer review the codebase for technical debt, security vulnerabilities, and third-party API dependencies that could be deprecated or repriced. Understand the hosting costs and whether they scale linearly with customer growth.",
      "Most SaaS acquisitions are priced at 2 to 5x Annual Recurring Revenue (ARR). Bootstrapped micro-SaaS products with under 50 customers often trade at the lower end; software with strong retention, documented processes, and a clean codebase commands the higher end.",
    ],
    faqs: [
      {
        q: "What metrics matter most when buying a SaaS business?",
        a: "MRR, monthly churn rate, LTV:CAC ratio, and the number of paying customers. A monthly churn rate under 2% is generally strong. Also check net revenue retention: if customers expand their plans over time, NRR above 100% means the business grows even without acquiring new customers.",
      },
      {
        q: "How are SaaS businesses valued?",
        a: "Most SaaS deals price at 2 to 5x Annual Recurring Revenue (ARR). Micro-SaaS products and early-stage tools often trade between 2 and 3x ARR. Established businesses with low churn, documented processes, and no key-person dependency command multiples toward the higher end.",
      },
      {
        q: "Should I review the code before buying a SaaS?",
        a: "Yes. Even if you are not technical, hire a developer to review the codebase before closing. They should check for critical security issues, assess the quality of the architecture, identify any hardcoded secrets or deprecated dependencies, and estimate the ongoing maintenance burden.",
      },
    ],
  },
  "ecommerce": {
    slug: "ecommerce",
    label: "eCommerce",
    title: "eCommerce Stores for Sale | Buy an Online Store",
    description: "Shop ecommerce stores and online businesses for sale. Verified revenue and traffic. Contact sellers directly with no broker fees on buysitesdirect.com.",
    h1: "eCommerce Stores for Sale",
    intro: "Explore online stores and ecommerce businesses with real revenue. Contact sellers directly and skip the broker fees.",
    guide: [
      "eCommerce stores generate revenue by selling physical or digital products, often through Shopify, WooCommerce, or custom platforms. Key factors to assess include supplier relationships and lead times, inventory turnover, return rates, and the degree of dependence on paid advertising. Stores with strong organic search rankings or a large email list are generally more resilient acquisitions than those running on Meta or Google Ads alone.",
      "Review the last 12 months of sales data and look for seasonality. Some eCommerce categories have strong Q4 spikes; others are relatively flat year-round. If the business relies heavily on a single supplier, assess what happens if that supplier raises prices or goes out of stock.",
      "eCommerce valuations typically use 2 to 4x annual net profit. Stores with strong brand recognition, a loyal customer base, and repeat purchase rates command higher multiples. Dropshipping businesses with no proprietary branding usually trade at the lower end.",
    ],
    faqs: [
      {
        q: "What is included in an eCommerce store acquisition?",
        a: "Typically the domain, website, customer email list, supplier contacts, social media accounts, and any remaining inventory where applicable. Clarify with the seller exactly what is included before signing any agreement, particularly around inventory ownership and supplier transfer.",
      },
      {
        q: "How are eCommerce stores valued?",
        a: "Revenue-based multiples of 2 to 4x annual net profit are most common. Stores with strong brand recognition, repeat customers, and proprietary products command higher multiples. Dropshipping stores or those heavily dependent on a single supplier or paid traffic channel are typically valued at the lower end.",
      },
      {
        q: "How do I verify eCommerce revenue?",
        a: "Request Shopify or WooCommerce analytics exports, bank statements, and payment processor reports (Stripe, PayPal) covering at least 6 to 12 months. Cross-reference the order count in the platform dashboard against the payment processor deposits to confirm figures match.",
      },
    ],
  },
  "tool-or-app": {
    slug: "tool-or-app",
    label: "Tools & Apps",
    title: "Online Tools & Apps for Sale | Buy a Web App",
    description: "Discover web apps, online tools, and micro-SaaS products for sale. Verified metrics, direct seller contact, no commissions on buysitesdirect.com.",
    h1: "Online Tools & Apps for Sale",
    intro: "Discover web apps, browser extensions, and online tools with real user bases. Buy directly from builders and developers.",
    guide: [
      "Online tools, web apps, and browser extensions monetise through subscriptions, one-time purchases, or freemium upgrade funnels. The most important signal when evaluating a tool is whether it solves a narrow, well-defined problem with a defensible moat: integrations with popular platforms, a unique data asset, or a workflow that is painful to replicate from scratch.",
      "Tools with strong organic discovery — through SEO, product directories like Product Hunt, or category-specific marketplaces — are more valuable than those relying solely on paid acquisition. Check the tool's listing in the Chrome Web Store, app directories, or integration marketplaces for user reviews and install counts.",
      "Valuations are similar to SaaS: profitable tools typically trade at 2 to 4x ARR. Free tools with large active user bases may be valued on traffic or acquisition potential rather than revenue alone.",
    ],
    faqs: [
      {
        q: "What is a micro-SaaS tool?",
        a: "A micro-SaaS is a small, often single-founder software product with a narrow use case, low overhead, and predictable recurring revenue. Many tools listed here fall into this category. They are attractive acquisitions because the scope is limited, the customer base is targeted, and the technical complexity is usually manageable.",
      },
      {
        q: "How are online tools and apps valued?",
        a: "Similar to SaaS: 2 to 4x ARR for profitable tools is the typical range. Free tools with large user bases may be valued on traffic or strategic acquisition potential. Browser extensions with significant install counts may command a premium if they have a strong monetisation path.",
      },
      {
        q: "Do I need coding skills to run an online tool?",
        a: "Not necessarily. Many tools are maintained by outsourcing ongoing development. Ask the seller about the current hosting setup, monthly maintenance costs, and any active bug reports or feature requests. If you are non-technical, budget for a part-time developer to handle maintenance.",
      },
    ],
  },
  "newsletter": {
    slug: "newsletter",
    label: "Newsletters",
    title: "Newsletters for Sale | Buy an Email Newsletter",
    description: "Browse email newsletters for sale with verified subscriber counts and open rates. Buy directly from owners, no broker fees on buysitesdirect.com.",
    h1: "Newsletters for Sale",
    intro: "Find email newsletters with engaged subscriber bases. Verified subscriber counts and open rates on every listing.",
    guide: [
      "Email newsletters earn revenue through paid subscriptions, sponsorships, and affiliate deals. The subscriber count headline can be misleading: what matters more is engagement. A list of 5,000 subscribers with a 45% open rate is more valuable than 50,000 subscribers with a 4% open rate, because sponsors and affiliate partners pay for actual attention, not raw list size.",
      "Before buying, examine the subscriber growth trend over the past 12 months, the source of new subscribers (organic word-of-mouth, referral programs, paid acquisition), and the churn rate. Organically grown lists tend to be more engaged and more resilient to a change in ownership than lists built through paid promotion.",
      "Paid newsletters typically trade at 2 to 4x Annual Recurring Revenue (ARR). Sponsorship-based newsletters are valued on a multiple of monthly net revenue, often 20 to 36x monthly net profit.",
    ],
    faqs: [
      {
        q: "What metrics matter most when buying a newsletter?",
        a: "Total active subscribers, open rate, click-through rate (CTR), monthly revenue, and monthly subscriber churn. Open rates above 30% are generally strong for B2C newsletters; B2B newsletters often achieve 40 to 50%. Also check whether the list has been validated recently to remove inactive addresses.",
      },
      {
        q: "Can I transfer a newsletter to a different email platform?",
        a: "Yes. Most email platforms (Beehiiv, Substack, ConvertKit, Mailchimp) allow full subscriber list exports as a CSV. Negotiate the platform migration plan with the seller before closing. Be aware that some platforms (notably Substack) tie the publication identity to the original account, which may require notifying subscribers of the platform change.",
      },
      {
        q: "How are newsletters valued?",
        a: "Paid subscription newsletters typically trade at 2 to 4x ARR. Sponsorship-driven newsletters are usually priced at 20 to 36x monthly net profit, depending on niche, open rates, and revenue consistency. Newsletters with a single dominant sponsor are valued lower due to concentration risk.",
      },
    ],
  },
  "community": {
    slug: "community",
    label: "Communities",
    title: "Online Communities for Sale | Buy a Forum or Community",
    description: "Find online communities, forums, and membership sites for sale. Verified member counts, direct seller contact, no fees on buysitesdirect.com.",
    h1: "Online Communities for Sale",
    intro: "Browse forums, membership sites, and online communities. Verified member counts and engagement metrics included.",
    guide: [
      "Online communities — forums, Slack groups, Discord servers, and membership sites — derive value from their engaged member base, niche authority, and recurring subscription revenue. Evaluate the level of owner involvement carefully: a community that only functions because the founder is its most active member represents significant key-person risk for a new owner.",
      "Look at daily and weekly active users relative to the total member count. A forum with 10,000 registered users but only 50 weekly active posters has a very different value profile than one with 2,000 members and 800 weekly active contributors. Also check whether the community has moderators and documented rules.",
      "Recurring subscription communities trade at 2 to 4x ARR. Free communities supported by sponsorships are valued on audience quality and sponsorship revenue, typically 20 to 36x monthly net profit.",
    ],
    faqs: [
      {
        q: "How do I verify a community's engagement?",
        a: "Request screenshots of member activity dashboards, daily active user counts, and the moderation log. For forum-based communities, check post frequency over the past 30 and 90 days and the ratio of new versus returning members. Be cautious of communities where the majority of activity comes from a small number of power users.",
      },
      {
        q: "Can a community be transferred to a new owner smoothly?",
        a: "Yes, but success depends on how the transition is communicated. Discord servers, Slack workspaces, and forum platforms (Discourse, phpBB) all support ownership transfers technically. The bigger risk is member churn if the community was closely associated with the previous owner's personal brand. A warm handover period — where the seller introduces the new owner — is strongly recommended.",
      },
      {
        q: "How are online communities valued?",
        a: "Recurring subscription communities typically trade at 2 to 4x ARR. Free or sponsorship-based communities are valued on audience quality and monthly revenue, typically 20 to 36x monthly net. Niche communities with defensible expertise and strong engagement in a high-value vertical (finance, B2B SaaS, professional skills) command the highest multiples.",
      },
    ],
  },
  "service-business": {
    slug: "service-business",
    label: "Service Businesses",
    title: "Online Service Businesses for Sale | Buy a Digital Agency",
    description: "Browse online service businesses, agencies, and consulting firms for sale. Real client lists and revenue. No broker fees on buysitesdirect.com.",
    h1: "Service Businesses for Sale",
    intro: "Explore service businesses, agencies, and consulting firms with real clients and revenue. Contact sellers directly.",
    guide: [
      "Online service businesses — agencies, consulting firms, and managed service operations — are valued on revenue, client contract length, and most importantly, the owner's replaceability. The central question for any service business acquisition is: will the revenue survive a change in ownership? If clients are paying for the founder's personal expertise or relationships, expect some churn during the transition.",
      "The most resilient service businesses have documented processes, retainer-based clients on recurring contracts, and at least one team member capable of delivering the core service independently. Ask the seller for an operational playbook, a list of recurring versus project-based clients, and details about any staff or contractors.",
      "Service business valuations typically run 1 to 3x annual net profit, lower than SaaS or content sites due to the labour-intensive nature of the business. Businesses with long-term contracts, a strong team, and documented operations command multiples toward the higher end.",
    ],
    faqs: [
      {
        q: "What is the biggest risk when buying a service business?",
        a: "Owner dependency. If the business revenue depends on the founder's reputation, relationships, or personal delivery of the service, clients may leave after an ownership transition. Mitigate this by negotiating a handover period where the seller helps introduce you to key clients and documents all active workflows.",
      },
      {
        q: "How are online service businesses valued?",
        a: "Typically 1 to 3x annual net profit. Businesses with long-term client contracts, a documented operations playbook, and an existing team of employees or contractors command higher multiples. Pure freelance businesses that depend entirely on one person are usually valued at 1 to 1.5x annual profit.",
      },
      {
        q: "What documents should I request from a service business seller?",
        a: "Client contracts and their remaining term, profit and loss statements for the past 2 years, a full client list showing recurring versus one-off revenue, any staff or contractor agreements, and the operational playbook. If the business uses proprietary tools or IP, confirm ownership is included in the sale.",
      },
    ],
  },
  "other": {
    slug: "other",
    label: "Other",
    title: "Other Websites & Online Businesses for Sale | Buy Sites Direct",
    description: "Browse unique websites and online businesses for sale that don't fit a single category. Verified metrics, direct seller contact, no broker fees on buysitesdirect.com.",
    h1: "Other Websites for Sale",
    intro: "Explore unique online businesses and websites with verified metrics. Contact sellers directly with zero broker fees.",
    guide: [
      "This category includes online businesses that do not fit neatly into standard classifications: affiliate portals, domain portfolios, lead generation sites, directory sites, job boards, marketplace platforms, and hybrid content-service models. Each business in this category needs to be evaluated on the strength of its individual revenue model rather than category benchmarks.",
      "For businesses with unusual or complex revenue models, focus on verifying the primary revenue driver independently, not just the total reported revenue. Understand what would cause that revenue to decline: algorithm changes, a key partnership, seasonal demand, or regulatory risk.",
      "Valuations vary widely. Apply the same logic as the closest comparable category: content-like businesses trade at 20 to 40x monthly profit; recurring-revenue platforms trade closer to 2 to 4x ARR; lead generation or directory businesses are typically valued at 20 to 36x monthly net profit.",
    ],
    faqs: [
      {
        q: "What types of sites are listed in this category?",
        a: "Businesses that do not fit a single standard category: affiliate portals, domain portfolios, lead generation sites, directory sites, job boards, marketplaces, and hybrid models. If a site has elements of multiple categories, it is often listed here.",
      },
      {
        q: "How do I evaluate a non-standard online business?",
        a: "Focus on the primary revenue driver, its defensibility, and the technical and operational complexity of the transfer. Verify revenue with bank statements and payment processor reports. If the business model is unfamiliar to you, research comparable businesses or consult someone with direct experience in that model before committing.",
      },
      {
        q: "Is buying in the Other category riskier?",
        a: "Not inherently, but due diligence is especially important for non-standard models because there are fewer public benchmarks to compare against. Request full documentation, speak with the seller in detail, and if the business model is complex, consider bringing in a domain expert to advise before closing.",
      },
    ],
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
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
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

const CATEGORY_LINK_COLORS: Record<string, { border: string; icon: string; hover: string }> = {
  "content-site":     { border: "border-sky-200 dark:border-sky-800/60",       icon: "text-sky-600 dark:text-sky-400",       hover: "hover:border-sky-400 dark:hover:border-sky-600 hover:bg-sky-50/60 dark:hover:bg-sky-900/20 hover:shadow-sky-100/70 dark:hover:shadow-sky-950/40" },
  "saas":             { border: "border-violet-200 dark:border-violet-800/60", icon: "text-violet-600 dark:text-violet-400", hover: "hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50/60 dark:hover:bg-violet-900/20 hover:shadow-violet-100/70 dark:hover:shadow-violet-950/40" },
  "ecommerce":        { border: "border-orange-200 dark:border-orange-800/60", icon: "text-orange-600 dark:text-orange-400", hover: "hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50/60 dark:hover:bg-orange-900/20 hover:shadow-orange-100/70 dark:hover:shadow-orange-950/40" },
  "tool-or-app":      { border: "border-teal-200 dark:border-teal-800/60",     icon: "text-teal-600 dark:text-teal-400",     hover: "hover:border-teal-400 dark:hover:border-teal-600 hover:bg-teal-50/60 dark:hover:bg-teal-900/20 hover:shadow-teal-100/70 dark:hover:shadow-teal-950/40" },
  "newsletter":       { border: "border-rose-200 dark:border-rose-800/60",     icon: "text-rose-600 dark:text-rose-400",     hover: "hover:border-rose-400 dark:hover:border-rose-600 hover:bg-rose-50/60 dark:hover:bg-rose-900/20 hover:shadow-rose-100/70 dark:hover:shadow-rose-950/40" },
  "community":        { border: "border-emerald-200 dark:border-emerald-800/60", icon: "text-emerald-600 dark:text-emerald-400", hover: "hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/60 dark:hover:bg-emerald-900/20 hover:shadow-emerald-100/70 dark:hover:shadow-emerald-950/40" },
  "service-business": { border: "border-amber-200 dark:border-amber-800/60",   icon: "text-amber-600 dark:text-amber-400",   hover: "hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50/60 dark:hover:bg-amber-900/20 hover:shadow-amber-100/70 dark:hover:shadow-amber-950/40" },
  "other":            { border: "border-slate-200 dark:border-slate-700",       icon: "text-slate-500 dark:text-slate-400",   hover: "hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50/60 dark:hover:bg-slate-800/20 hover:shadow-slate-100/70 dark:hover:shadow-slate-800/40" },
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
      { "@type": "ListItem", "position": 1, "name": "Buy Sites Direct", "item": "https://buysitesdirect.com" },
      { "@type": "ListItem", "position": 2, "name": "Buy a Website", "item": "https://buysitesdirect.com/buy" },
      { "@type": "ListItem", "position": 3, "name": seo.h1, "item": `https://buysitesdirect.com/buy/${category}` },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seo.faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  }

  const prices = rows.map((r) => r.listing.askingPrice).filter((p) => p > 0)
  const aggregateOfferSchema = prices.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    "@id": `https://buysitesdirect.com/buy/${category}#offer`,
    "priceCurrency": "USD",
    "lowPrice": Math.min(...prices).toFixed(2),
    "highPrice": Math.max(...prices).toFixed(2),
    "offerCount": prices.length,
    "itemOffered": {
      "@type": "Product",
      "name": seo.h1,
      "description": seo.description,
    },
  } : null

  const headerRadial = CATEGORY_HEADER_RADIAL[category] ?? CATEGORY_HEADER_RADIAL["other"]
  const accentBar = CATEGORY_ACCENT_BAR[category] ?? CATEGORY_ACCENT_BAR["other"]
  const sparkleColors = CATEGORY_SPARKLE_COLORS[category] ?? CATEGORY_SPARKLE_COLORS["other"]
  const CategoryIcon = CATEGORY_ICONS[category] ?? LayoutGrid

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, ...(itemListSchema ? [itemListSchema] : []), ...(aggregateOfferSchema ? [aggregateOfferSchema] : []), faqSchema]) }}
    />
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Category Hero Banner */}
      <div className="mb-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/buy" className="hover:text-foreground transition-colors">Buy a Website</Link>
          <span>/</span>
          <span className="text-foreground">{seo.h1}</span>
        </nav>
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

      {/* Buying guide + FAQ */}
      <section className="mt-16 pt-8 border-t border-border/50 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-base font-bold mb-4">Buying guide: {seo.label}</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            {seo.guide.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
        <div>
          <h2 className="text-base font-bold mb-4">Frequently asked questions</h2>
          <dl className="space-y-5">
            {seo.faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-sm mb-1">{item.q}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">
            More questions?{" "}
            <Link href="/faq" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read the full FAQ</Link>
            {" "}or{" "}
            <Link href="/sell" className="text-indigo-600 dark:text-indigo-400 hover:underline">list your own site for sale</Link>.
          </p>
        </div>
      </section>

      {/* Related categories */}
      <nav aria-label="Related categories" className="mt-16 pt-8 border-t border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Browse other categories</h2>
          <Link href="/faq#buying" className="text-xs text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            New to buying? Read our FAQ
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {(RELATED_CATEGORIES[category] ?? []).map((rel) => {
            const relSeo = CATEGORY_SEO[rel]
            if (!relSeo) return null
            const RelIcon = CATEGORY_ICONS[rel] ?? LayoutGrid
            const colors = CATEGORY_LINK_COLORS[rel] ?? CATEGORY_LINK_COLORS["other"]
            return (
              <Link
                key={rel}
                href={`/buy/${rel}`}
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${colors.border} ${colors.hover}`}
              >
                <RelIcon className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${colors.icon}`} />
                {relSeo.label}
                <ArrowRight className="h-3.5 w-3.5 opacity-40 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            )
          })}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20"
          >
            <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-indigo-500 dark:text-indigo-400 transition-transform duration-200 group-hover:scale-110" />
            All listings
            <ArrowRight className="h-3.5 w-3.5 opacity-40 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>
    </div>
    </>
  )
}
