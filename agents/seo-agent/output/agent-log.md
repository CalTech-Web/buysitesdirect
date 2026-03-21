[2026-03-18 15:41:44] ==========================================
[2026-03-18 15:41:44] Agent: Seo Agent
[2026-03-18 15:41:44] Model: sonnet
[2026-03-18 15:41:44] Workspace: /Users/brandonhopkins/Projects/buysitesdirect/agents/seo-agent
[2026-03-18 15:41:44] Stop on complete: false
[2026-03-18 15:41:44] Max loops: 5 (0=infinite)
[2026-03-18 15:41:44] ==========================================
[2026-03-18 15:41:44] Run #1 starting (model: sonnet)
[2026-03-18 15:41:45] Claude command interrupted or failed

[2026-03-18] Run #1–3 completed (prior session, git commits d15590b, a0ea7f0, bbe477a, 23d69a2, 75e37e4, c4f099a):
  - Run 1: Meta titles ≤60 chars, meta descriptions ≤160 chars for listing and seller pages
  - Run 2: Dynamic sitemap.xml and robots.txt
  - Run 3: JSON-LD structured data (Product, FAQPage) on listing pages; generateMetadata on seller pages; WebSite + Organization JSON-LD in root layout; Open Graph tags

[2026-03-18] Run 4 completed (commit b39efc1):
  - Replaced structural <div> wrappers with semantic HTML elements across homepage, listing detail page, and seller profile page
  - Homepage: hero → <section>, "How it works" → <section> with <h2> label, "Sell Your Site" → <section>, broker comparison → <section> with <h2> label, "Browse by category" → <section> with <h2> label, listings grid → <section id="listings">
  - Listing detail page: outer wrapper → <article>, header banner → <header>, "About This Site" / "Reason for Selling" / "What's Included" / tags panels → <section>, FAQs → <section>, related listings → <section>, seller card → <aside>, contact form → <section id="contact">
  - Seller profile page: profile header card → <header>, listings area → <section aria-label="Listings">
[2026-03-18 16:07:33] ==========================================
[2026-03-18 16:07:33] Agent: Seo Agent
[2026-03-18 16:07:33] Model: sonnet
[2026-03-18 16:07:33] Workspace: /Users/brandonhopkins/Projects/buysitesdirect/agents/seo-agent
[2026-03-18 16:07:33] Stop on complete: false
[2026-03-18 16:07:33] Max loops: 5 (0=infinite)
[2026-03-18 16:07:33] ==========================================
[2026-03-18 16:07:33] Run #1 starting (model: sonnet)

[2026-03-18] Run 5 completed (commit 66a1d53):
  - ImageGallery: added listingTitle prop; all screenshot/thumbnail alt attributes now include the listing title (e.g. "My Blog screenshot 1"); fixed empty alt="" on lightbox thumbnail strip
  - Listing detail page: added breadcrumb nav (Websites for Sale > [Category] > [Title]); linked category badge in header to /buy/[category]; updated "View all" in related listings and sold/under-offer CTA from /?category=X to /buy/[category]
  - Category landing page: added "Browse other categories" nav section at bottom with 3 curated related category links + "All listings" for cross-site internal linking
[2026-03-18] Run 6 completed (commit 5ded92d):
  - Listing detail page: added BreadcrumbList JSON-LD schema matching the existing visual breadcrumb nav (Home > [Category]s for Sale > [Title])
  - Category landing pages: added BreadcrumbList JSON-LD (Home > [Category H1]) and ItemList JSON-LD listing all active listings with name + URL for each item

Run 5 complete. Here's what was done:

**Image alt text**
- `ImageGallery` now accepts a `listingTitle` prop and uses it in all `alt` attributes: `"[Title] screenshot 1"`, `"[Title] thumbnail 2"`, etc.
- Fixed the empty `alt=""` on the lightbox thumbnail strip

**Internal linking**
- **Listing detail**: Added breadcrumb nav (`Websites for Sale / [Category] / [Title]`) above the article; category badge in the header now links to `/buy/[category]`; "View all" related listings link and the sold/under-offer CTA both now point to `/buy/[category]` instead of the homepage filter
- **Category landing pages**: Added a "Browse other categories" nav section at the bottom with 3 curated related category links + "All listings", giving Googlebot more crawl paths between category pages
[2026-03-18 16:12:40] Run #1 finished
[2026-03-18 16:12:45] Run #2 starting (model: sonnet)
All 5 runs in the Run Order have been completed:

1. **Run 1** — Meta titles (≤60 chars), meta descriptions (≤160 chars), primary keywords in titles/H1s
2. **Run 2** — Dynamic sitemap.xml and robots.txt (canonical tags)
3. **Run 3** — JSON-LD structured data, Open Graph/Twitter tags, Organization + WebSite schema in root layout
4. **Run 4** — Semantic HTML (article, section, header, aside, nav, main across homepage, listing detail, seller profile)
5. **Run 5** — Image alt text with listing titles, breadcrumb nav, internal linking between listing detail and category pages, cross-category nav on landing pages

There is nothing left to do — the agent has completed all tasks in the Run Order.
[2026-03-18 16:13:05] Run #2 finished
[2026-03-18 16:13:10] Run #3 starting (model: sonnet)
All 5 defined runs were already complete. This run added the remaining structured data gaps:

**BreadcrumbList JSON-LD on listing pages** — the visual breadcrumb nav already existed but had no corresponding schema. Google can now show breadcrumbs in SERPs for listing pages.

**BreadcrumbList + ItemList JSON-LD on category pages** — category pages had zero JSON-LD. Now each has a breadcrumb schema and an `ItemList` schema enumerating every active listing in that category, giving Google a machine-readable index of the page's content.

Deployed and live. (commit `5ded92d`)
[2026-03-18 16:16:27] Run #3 finished
[2026-03-18 16:16:32] Run #4 starting (model: sonnet)

[2026-03-18] Run 7 completed (commit ce050f3):
  - Homepage category grid: changed all 8 category links from /?category=key to /buy/[category] — now passes PageRank to the canonical category landing pages that have dedicated titles, H1s, and JSON-LD
  - Footer buyer links: updated /?category=saas/content-site/ecommerce to /buy/ canonical URLs
  - New src/app/dashboard/layout.tsx: robots noindex/nofollow applied to all dashboard pages
  - Brand fix (Navbar, Footer, homepage comparison card, login, register, recover, reset pages): replaced all "WebsitesForSale" with "Buy Sites Direct" and "W" badge letters with "B"
Deployed. Here's what was done in this run (commit `ce050f3`):

**Internal linking fix (highest SEO impact)**
- Homepage "Browse by Category" grid now links to `/buy/[category]` instead of `/?category=key` — PageRank now flows to the canonical category landing pages that have dedicated meta titles, H1s, BreadcrumbList, and ItemList JSON-LD
- Footer buyer links (SaaS, Content Sites, eCommerce) updated to `/buy/` canonical URLs for the same reason

**Dashboard noindex**
- New `src/app/dashboard/layout.tsx` with `robots: { index: false, follow: false }` — prevents Googlebot from crawling and indexing all private dashboard pages

**Brand text cleanup**
- All remaining "WebsitesForSale" text replaced with "Buy Sites Direct" across Navbar, Footer, homepage comparison card, and all auth pages (login, register, recover, reset)
- Badge letter changed from "W" to "B" everywhere to match the brand identity in memory
[2026-03-18 16:22:07] Run #4 finished
[2026-03-18 16:22:12] Run #5 starting (model: sonnet)

[2026-03-18] Run 8 completed (commit e702836):
  - Seller profile page: generateMetadata now returns canonical URL, openGraph (type: "profile"), and Twitter card tags — previously these were missing entirely
  - Seller profile page: added ProfilePage JSON-LD schema with mainEntity (Person) and hasPart (Product with Offer) for each active listing, giving Google a machine-readable profile with linked inventory
Deployment succeeded.

**Change made:** Added `generateMetadata` to the homepage (`/src/app/page.tsx`) with three improvements:

- **`alternates.canonical: "/"`** — The homepage was the only public page without an explicit canonical URL. Without it, Google may index multiple versions (`www` vs non-www, `/?category=saas`, `/?q=keyword`) as separate pages and split link equity. Now the canonical resolves to `https://buysitesdirect.com` via `metadataBase`.
- **`openGraph.images`** — The homepage now shows a proper preview image when shared on social (LinkedIn, Facebook, etc.), matching what `/sell` and `/buy/[category]` already had.
- **`twitter.card: "summary_large_image"`** — Twitter/X shares of the homepage now show a large image card instead of a bare text link.
[2026-03-19 09:28:25] Run #1 finished
[2026-03-19 09:28:30] Run #2 starting (model: sonnet)

[2026-03-19] Run 9 completed (commit 119f3f7):
  - Seller profile page: added BreadcrumbList JSON-LD (Home > username) matching the existing visual breadcrumb — was the only public page with a visual breadcrumb but no corresponding schema
  - Seller profile page: added og:image and twitter:image (/og-image.png fallback) to generateMetadata — twitter:card was already set to summary_large_image but without an image URL it rendered as a bare link on social shares
The background task was just the node search I used to find the right binary — already resolved and the run is complete. No action needed.
[2026-03-19 09:34:59] Run #2 finished
[2026-03-19 09:35:04] Run #3 starting (model: sonnet)

[2026-03-19] Run 10 completed (commit e21122e):
  - next.config.ts: added remotePatterns for *.public.blob.vercel-storage.com so Next.js Image can optimize Vercel Blob-hosted listing screenshots
  - ListingCard: replaced plain <img loading="lazy"> with next/image <Image fill sizes="..."> — automatic WebP/AVIF serving, proper srcset generation, priority fetch on index=0 card (above-fold LCP)
  - FeaturedListingCard: replaced plain <img loading="lazy"> with next/image <Image fill priority> — spotlight card is the homepage LCP element; eager + high-priority fetch reduces LCP time
  - Impact: Core Web Vitals improvement (LCP is a Google ranking signal); format optimization reduces image payload on all listing grid pages
**Run 10 complete** (commit `e21122e`). Deployed and live.

**What was done:**

- **`next.config.ts`**: Added `remotePatterns` for `*.public.blob.vercel-storage.com` so Next.js can optimize Vercel Blob-hosted listing images
- **`ListingCard`**: Replaced `<img loading="lazy">` with Next.js `<Image fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw">` — automatic WebP/AVIF serving, correct srcset for 1/2/3-column grid layouts; `priority` set when `index === 0` so the first above-fold card loads eagerly
- **`FeaturedListingCard`**: Replaced `<img loading="lazy">` with `<Image fill priority>` — the spotlight card is the largest above-fold element on the homepage and the most likely LCP candidate; switching from lazy to priority fetch directly reduces LCP time

**Why it matters for SEO**: LCP (Largest Contentful Paint) is one of Google's Core Web Vitals metrics and a direct ranking factor. Every listing grid page (homepage, all 8 category pages, listing detail related section) now serves WebP/AVIF images with properly prioritized loading.
[2026-03-19 09:42:01] Run #3 finished
[2026-03-19 09:42:06] Run #4 starting (model: sonnet)

[2026-03-19] Run 11 completed (commit c0249fd):
  - Homepage: added explicit title "Websites for Sale | No Broker Fees | Buy Sites Direct" (53 chars) targeting the primary search keyword "websites for sale"; previous title fell back to the generic root layout title — added matching openGraph and Twitter card tags
  - Listing detail page: added rel="nofollow ugc" to the Live Site external link (was rel="noopener noreferrer") — prevents passing PageRank to user-submitted third-party URLs, standard practice for marketplace/directory sites
Run 11 complete (commit `c0249fd`). Deployed and live.

**What was done:**

- **Homepage title**: Changed from the generic root layout fallback to an explicit `"Websites for Sale | No Broker Fees | Buy Sites Direct"` (53 chars). The primary search keyword `"websites for sale"` is now in the `<title>` tag and matching OG/Twitter titles — previously none of these were explicitly set on the homepage.

- **`rel="nofollow ugc"` on listing Live Site links**: Every listing detail page has a "Live Site" link pointing to the seller's third-party URL. This now uses `rel="nofollow ugc noopener noreferrer"`. The `nofollow` prevents PageRank from leaking to user-submitted external sites; `ugc` (user-generated content) is the specific Google-recommended signal for marketplace/directory link types.
[2026-03-19 09:49:06] Run #4 finished
[2026-03-19 09:49:11] Run #5 starting (model: sonnet)

[2026-03-19] Run 12 completed (commit 1df5737):
  - Listing detail page generateMetadata: fixed meta title to enforce ≤60 chars by truncating the listing.title portion if needed, with "…" before the "– [Category] for Sale" suffix
  - Listing detail page generateMetadata: fixed meta description to enforce ≤160 chars by computing available space after the "[Category] asking [Price].[Revenue] " prefix and capping the description snippet accordingly
  - Previously descriptions were 170-220+ chars (descSnippet naively sliced to 155 then prefix added on top); titles could exceed 60 chars for long listing titles; both caused Google to ignore the crafted snippets and generate its own
Run 12 complete (commit `1df5737`). Deployed and live.

**What was done:**

**Fixed meta title length enforcement on listing detail pages** — The title format `"[Listing Title] – [Category] for Sale"` had no cap on the listing title portion. Long titles (e.g., "Profitable B2B SaaS Platform with 500 Customers and $15K MRR") pushed the full meta title well past 60 characters, causing Google to ignore the crafted title and auto-generate its own SERP snippet. Now the listing title is truncated with "…" if needed to keep the full string ≤60 chars.

**Fixed meta description length enforcement on listing detail pages** — This was a genuine bug: the description was built as `"[Category] asking [Price].[Revenue] [descSnippet]…"` where `descSnippet` was naively sliced to 155 chars. The prefix alone could add 40-70 chars, making the final description 170-220+ characters — well over Google's 160-char limit. The fix calculates available space dynamically: `maxSnippetLen = 158 - prefix.length`, ensuring the total stays under 160 chars regardless of category label, price, or revenue values.
[2026-03-19 10:04:28] Run #5 finished
[2026-03-19 10:04:28] Reached max loops (5). Stopping.
[2026-03-20 06:02:03] ==========================================
[2026-03-20 06:02:03] Agent: Seo Agent
[2026-03-20 06:02:03] Model: sonnet
[2026-03-20 06:02:03] Workspace: /Users/brandonhopkins/Projects/seo/buysitesdirect/agents/seo-agent
[2026-03-20 06:02:03] Stop on complete: false
[2026-03-20 06:02:03] Max loops: 5 (0=infinite)
[2026-03-20 06:02:03] ==========================================
[2026-03-20 06:02:03] Run #1 starting (model: sonnet)

[2026-03-20] Run 13 completed (commit 4d5664e):
  - Listing detail page generateMetadata: openGraph.images and twitter.images now always present — when a listing has no uploaded screenshots, falls back to /og-image.png (1200×630); previously the images property was omitted entirely for imageless listings, causing bare text links on social shares
  - Footer: added compact "Browse by Category" row with all 8 category links (Content Sites, SaaS, eCommerce, Newsletters, Tools & Apps, Communities, Service Businesses, Other); previously only 3 categories appeared in the footer, leaving the other 5 with no global sitewide inbound link
Run 13 complete (commit `4d5664e`). Deployed and live.

**What was done:**

- **Listing detail `og:image` fallback** — When a listing has no uploaded screenshots, `openGraph.images` and `twitter.images` were previously omitted entirely. Sharing an imageless listing on LinkedIn, Facebook, or Twitter/X showed a bare text link instead of a card. Now falls back to `/og-image.png` (1200×630), ensuring every listing page renders a social card regardless of whether images were uploaded.

- **Footer: all 8 category links** — The "Browse by Category" compact row now appears in the global footer with links to every category page. Previously only Content Sites, SaaS, and eCommerce had footer links; Newsletters, Tools & Apps, Communities, Service Businesses, and Other had no sitewide inbound link from the footer, leaving those category pages with weaker internal PageRank flow.
[2026-03-20 06:06:57] Run #1 finished
[2026-03-20 06:07:02] Run #2 starting (model: sonnet)

[2026-03-20] Run 14 completed (commit cce5460):
  - All 8 category pages (/buy/[category]): added a two-column buying guide + FAQ section below the listings grid
  - Each category has 3 paragraphs of tailored buying advice covering what to evaluate, valuation ranges, and key risks
  - Each category has 3 targeted FAQ items (Q+A) covering due diligence, valuation, and transfer/operational questions
  - FAQPage JSON-LD schema added to all 8 category pages — enables Google FAQ rich results in SERPs alongside the existing BreadcrumbList + ItemList schemas
  - Each FAQ section closes with internal links to /faq and /sell
  - Category pages were previously thin (H1 + listing grid only); this change adds substantial indexable content targeting long-tail queries per category
Run 14 complete (commit `cce5460`). Deployed and live.

**What was done:**

All 8 category pages (`/buy/content-site`, `/buy/saas`, `/buy/ecommerce`, `/buy/tool-or-app`, `/buy/newsletter`, `/buy/community`, `/buy/service-business`, `/buy/other`) now have:

- **Buying guide section** — 3 paragraphs of category-specific advice covering what to evaluate, typical valuation ranges, and key risks. Gives search engines substantially more indexable content per page.
- **FAQ section** — 3 targeted Q&As per category (e.g. "What metrics matter most when buying a SaaS?", "How are content sites valued?", "What documents should I request from a service business seller?") rendered with semantic `<dl>/<dt>/<dd>` and targeting long-tail search intent.
- **`FAQPage` JSON-LD schema** — enables Google FAQ rich results (expandable Q&A cards in SERPs) alongside the existing `BreadcrumbList` + `ItemList` schemas.
- **Internal links** to `/faq` and `/sell` from each category page's FAQ footer.

Previously the category pages were thin — just an H1, one-sentence intro, and a listing grid. This was the largest remaining content gap.
[2026-03-20 06:15:31] Run #2 finished
[2026-03-20 06:15:36] Run #3 starting (model: sonnet)

[2026-03-20] Run 15 completed (commit ebbfd15):
  - Listing detail page generateMetadata: added robots: { index: false, follow: true } for non-active listings (sold, under_offer, unpublished) — previously these pages were fully indexed despite being unavailable, causing Google to index thin/dead content
  - Seller profile generateMetadata: added robots: { index: false, follow: false } when seller has zero active listings — previously empty seller profiles were indexed despite being excluded from the sitemap
  - Homepage: added "About Buy Sites Direct" two-column text section at the bottom of the main content area with natural-language description of the marketplace targeting "buy websites for sale", "website marketplace", "buy a content site", "acquire a SaaS business", and "sell your website" queries — with contextual internal links to /buy/content-site, /buy/saas, /sell, and /faq
Run 15 complete (commit `ebbfd15`). Deployed.

**What was done:**

**noindex for non-active listing pages** — Sold, under-offer, and unpublished listings still render at their `/listings/[slug]` URLs but had no `robots` noindex directive. Google could crawl and index these pages (via external links or cached references), then serve unavailable listings in SERPs. Now `generateMetadata` adds `robots: { index: false, follow: true }` whenever `listing.status !== "active"`. The `follow: true` preserves link equity flow from any internal links on the page.

**noindex for empty seller profiles** — Seller profiles with zero active listings were excluded from the sitemap but not noindexed at the page level. Now `generateMetadata` on the seller profile page adds `robots: { index: false, follow: false }` when `count === 0`, preventing Google from indexing thin, content-free profile pages.

**Homepage "About Buy Sites Direct" section** — The homepage had no static paragraph text that Google could clearly associate with the page's purpose. The new two-column section below the listings grid provides natural-language coverage of keywords like "website marketplace", "buy websites for sale", "acquire a SaaS business", and "sell your website", with contextual internal links to `/buy/content-site`, `/buy/saas`, `/sell`, and `/faq`.
[2026-03-20 06:21:44] Run #3 finished
[2026-03-20 06:21:49] Run #4 starting (model: sonnet)

[2026-03-20] Run 16 completed (commit f882381):
  - Listing detail page Product JSON-LD: fixed price bug — was dividing askingPrice by 100, making a $1,000 listing appear as $10.00 in Google rich results; prices are stored in dollars, so removed the /100 division
  - Root layout: added og:locale "en_US" to openGraph metadata — affects all pages; Facebook, LinkedIn and other OG consumers use this for language/locale signals
  - FAQ page title: changed from "FAQ | Buy Sites Direct" (22 chars, no keyword) to "Buying & Selling Websites FAQ | Buy Sites Direct" (48 chars) targeting the primary keyword pair
  - /sell page: added HowTo JSON-LD schema for the "How selling works" 3-step section — makes the page eligible for Google HowTo rich results in SERPs; complements the existing Service schema
Run 16 complete (commit `f882381`). Deployed and live.

**What was done:**

- **Product JSON-LD price bug fixed** — Every listing detail page had `"price": (listing.askingPrice / 100).toFixed(2)` in its `Product` schema. Since prices are stored in dollars (not cents), this made a $1,000 listing appear as `$10.00` in Google rich results. Removed the `/100` division — Google now sees the correct price.

- **`og:locale: "en_US"` in root layout** — Added to the `openGraph` object in the root layout, propagating to all pages. Facebook, LinkedIn, and other Open Graph consumers use this to correctly identify language and locale, which affects how shared links render and how content is surfaced in geo-targeted feeds.

- **FAQ page title keyword** — Changed from `"FAQ | Buy Sites Direct"` (22 chars, zero keyword signal) to `"Buying & Selling Websites FAQ | Buy Sites Direct"` (48 chars). Adds the primary keyword pair to the `<title>`, `og:title`, and `twitter:title` for the FAQ page.

- **HowTo JSON-LD on `/sell` page** — Added a 3-step `HowTo` schema matching the existing "How selling works" UI section. Makes the page eligible for Google HowTo rich results (step cards in SERPs). The `totalTime: "PT1M"` reflects the "list in 30 seconds" copy. Complements the existing `Service` and `BreadcrumbList` schemas on that page.
[2026-03-20 06:28:28] Run #4 finished
[2026-03-20 06:28:33] Run #5 starting (model: sonnet)

[2026-03-20] Run 17 completed (commit e5df903):
  - Created /about page: AboutPage JSON-LD schema (linked to #website and #organization), BreadcrumbList JSON-LD, explicit metadata (title 51 chars, description 143 chars, canonical, OG, Twitter card); content covers what the marketplace does, why no broker fees, who it serves, and a 3-step how-it-works section with internal links to all 8 category pages, /sell, and /faq
  - Sitemap: added /about with priority 0.6 and monthly change frequency
  - Footer: added "About" link in the Sellers column alongside FAQ, Sell Your Website, etc.
  - FAQ page: added new "Valuation" section (id="valuation") with 3 Q&As targeting high-search-volume queries: "How much is my website worth?" (covers SDE multiples by category), "What multiple should I expect when selling a website?" (content 35-45x, SaaS 40-60x, eCommerce 24-36x), and "How long does it take to sell a website?" (small <$20k sites: weeks; mid-market: 1-3 months); all 3 added to FAQPage JSON-LD schema automatically via the flatMap
[2026-03-20 07:13:09] Claude command interrupted or failed
[2026-03-21 06:02:04] ==========================================
[2026-03-21 06:02:04] Agent: Seo Agent
[2026-03-21 06:02:04] Model: sonnet
[2026-03-21 06:02:05] Workspace: /Users/brandonhopkins/Projects/seo/buysitesdirect/agents/seo-agent
[2026-03-21 06:02:05] Stop on complete: false
[2026-03-21 06:02:05] Max loops: 5 (0=infinite)
[2026-03-21 06:02:05] ==========================================
[2026-03-21 06:02:05] Run #1 starting (model: sonnet)

[2026-03-21] Run 18 completed (commit 76d4483):
  - /sell page: added 4-item seller FAQ section (how to price a listing, what to include, time-to-sell, revenue verification) rendered as <dl>/<dt>/<dd> with FAQPage JSON-LD schema — /sell was previously ineligible for Google FAQ rich results; now eligible alongside existing HowTo + Service + BreadcrumbList schemas
  - /sell page: added contextual links to /faq#selling and /faq#valuation from within the new FAQ section
  - Homepage about section: added link to /faq#valuation alongside the existing /faq link — improves internal PageRank flow to the valuation FAQ section
The background Vercel check returned empty output (no `npx` in that shell path). The deployment is triggered automatically by the GitHub push — no action needed.
[2026-03-21 06:06:32] Run #1 finished
[2026-03-21 06:06:38] Run #2 starting (model: sonnet)

[2026-03-21] Run 19 completed (commit pending):
  - Created /feed.xml RSS route: returns latest 25 active listings as RSS 2.0; adds autodiscovery <link rel="alternate" type="application/rss+xml"> via root layout alternates — helps Googlebot discover and index new listings faster; opens syndication channel
  - Created /buy landing page: was previously a 404; new page targets "buy a website" / "buy websites" queries with H1, category index (8 entries with live listing counts), CollectionPage + BreadcrumbList JSON-LD, canonical URL, full OG/Twitter metadata
  - Added /buy to sitemap with priority 0.85 and weekly change frequency
  - Root layout robots: added googleBot directive with max-snippet:-1, max-image-preview:large, max-video-preview:-1 — allows Google to show full-length rich snippets and large preview images for all public pages, improving SERP CTR
Run 19 complete (commit `fd59be6`). Here's what was done:

**`/feed.xml` RSS feed** — New route serving an RSS 2.0 feed of the 25 most recent active listings, ordered by date. Each item includes the listing title, price, category, description snippet, and canonical URL. The root layout now has `alternates.types["application/rss+xml"]` pointing to `/feed.xml`, which injects `<link rel="alternate" type="application/rss+xml">` in every page's `<head>` — this lets Googlebot autodiscover the feed and index new listings faster.

**`/buy` landing page** — `/buy` was previously a 404. Now it's a proper landing page targeting "buy a website" and "buy websites" queries with:
- `<h1>Buy a Website</h1>` + keyword-rich intro paragraph
- Category index listing all 8 categories with live listing counts and descriptions
- `CollectionPage` + `BreadcrumbList` JSON-LD
- Full canonical URL, OG, and Twitter card metadata
- Added to sitemap at priority 0.85 (weekly)

**`googleBot` max-snippet in root layout** — Added `robots.googleBot` with `max-snippet: -1`, `max-image-preview: large`, and `max-video-preview: -1`. These directives tell Google it can display full-length SERP snippets and large preview images for all public pages, which typically improves click-through rates without any ranking downside.
[2026-03-21 06:12:04] Run #2 finished
[2026-03-21 06:12:10] Run #3 starting (model: sonnet)

[2026-03-21] Run 20 completed (commit 6b84d4a):
  - /buy landing page: added 4-item Buyer FAQ section ("What types of websites can I buy?", "How do I contact a seller?", "Is it free?", "How do I verify a listing?") rendered as <dl>/<dt>/<dd> with FAQPage JSON-LD schema — /buy was previously ineligible for Google FAQ rich results despite being the second-highest priority page in the sitemap
  - Root layout Organization schema: added logo property (ImageObject pointing to /og-image.png) — previously missing; Google uses this for the brand's Knowledge Panel logo
  - Footer Buyers column: added "Buy a Website" link to /buy at the top of the Buyers nav — /buy had no sitewide inbound link from the footer, limiting its PageRank flow
  - Homepage Browse by Category section: added "View all categories →" link to /buy below the 8-category grid — first internal link from the homepage hero area directly to the /buy hub page
