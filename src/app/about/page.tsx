import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Buy Sites Direct | Fee-Free Website Marketplace",
  description: "Buy Sites Direct is a fee-free marketplace connecting website buyers and sellers directly. No broker fees, no commissions. Just direct deals between real people.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Buy Sites Direct | Fee-Free Website Marketplace",
    description: "Buy Sites Direct is a fee-free marketplace connecting website buyers and sellers directly. No broker fees, no commissions.",
    url: "https://buysitesdirect.com/about",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Buy Sites Direct" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Buy Sites Direct | Fee-Free Website Marketplace",
    description: "Buy Sites Direct is a fee-free marketplace connecting website buyers and sellers directly. No broker fees, no commissions.",
    images: ["/og-image.png"],
  },
}

const BASE_URL = "https://buysitesdirect.com"

const aboutFaqs = [
  {
    q: "How is Buy Sites Direct different from a traditional website broker?",
    a: "Traditional website brokers charge 10–15% commission on the final sale price. On a $50,000 deal, that is $5,000–$7,500 paid to a broker who facilitated the introduction. Buy Sites Direct removes the broker entirely. Sellers list for free, buyers contact sellers directly, and when a deal closes, 100% of the sale price stays between the two parties.",
  },
  {
    q: "Is it free to use Buy Sites Direct?",
    a: "Yes. Creating an account is free, browsing listings is free, contacting sellers is free, and listing a website for sale is free. There are no listing fees, no subscription fees, and no commission taken when a deal closes.",
  },
  {
    q: "What types of online businesses can I find on Buy Sites Direct?",
    a: "The marketplace covers eight categories: content sites and blogs, SaaS businesses, eCommerce stores, newsletters, tools and apps, online communities, service businesses, and other web-based assets. Each listing includes asking price, monthly revenue, traffic, and a full description.",
  },
  {
    q: "How do I get started as a buyer or seller?",
    a: "Buyers can browse all active listings on the homepage or filter by category — no account required to view listings. To contact a seller, create a free account and use the contact form on any listing page. Sellers create a free account, go to the dashboard, and start a new listing. The AI tool drafts a description from your site URL and metrics, which you can edit before publishing.",
  },
]

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE_URL}/about`,
  "name": "About Buy Sites Direct",
  "url": `${BASE_URL}/about`,
  "description": "Buy Sites Direct is a fee-free marketplace connecting website buyers and sellers directly. No broker fees, no commissions.",
  "isPartOf": { "@id": `${BASE_URL}/#website` },
  "about": { "@id": `${BASE_URL}/#organization` },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": aboutFaqs.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Buy Sites Direct", "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "About", "item": `${BASE_URL}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([aboutPageSchema, breadcrumbSchema, faqSchema]) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">About</span>
        </nav>

        <h1 className="text-3xl font-bold mb-4">About Buy Sites Direct</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Buy Sites Direct is a website marketplace built on one principle: buyers and sellers should deal directly with each other, without brokers taking a cut.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-4">What we do</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We run a marketplace where website owners list their sites for sale and qualified buyers contact them directly. Every listing includes asking price, monthly revenue, traffic figures, and a full description — everything a buyer needs to assess a deal before reaching out.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browse <Link href="/buy/content-site" className="text-indigo-600 dark:text-indigo-400 hover:underline">content sites</Link>, <Link href="/buy/saas" className="text-indigo-600 dark:text-indigo-400 hover:underline">SaaS businesses</Link>, <Link href="/buy/ecommerce" className="text-indigo-600 dark:text-indigo-400 hover:underline">eCommerce stores</Link>, <Link href="/buy/newsletter" className="text-indigo-600 dark:text-indigo-400 hover:underline">newsletters</Link>, <Link href="/buy/tool-or-app" className="text-indigo-600 dark:text-indigo-400 hover:underline">tools and apps</Link>, <Link href="/buy/community" className="text-indigo-600 dark:text-indigo-400 hover:underline">online communities</Link>, <Link href="/buy/service-business" className="text-indigo-600 dark:text-indigo-400 hover:underline">service businesses</Link>, and more — all in one place.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Why no broker fees</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Traditional website brokers charge 10–15% of the final sale price. On a $100,000 deal, that is $10,000–$15,000 leaving the table — paid to someone whose main role was to make an introduction and manage paperwork.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Buy Sites Direct removes that middleman entirely. Listing is free. Messaging a seller is free. When a deal closes, 100% of the sale price stays between buyer and seller. We believe the people doing the actual work — building the business, evaluating the acquisition — should keep the value they create.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Who uses Buy Sites Direct</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-2">Buyers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Independent investors, entrepreneurs looking for their next project, operators seeking an acquisition, and portfolio builders acquiring multiple web assets. Browse active listings, contact sellers directly, and negotiate terms without a broker in the middle.
                </p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-2">Sellers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Founders exiting a side project, developers monetising a tool, content creators selling a blog or newsletter, and business owners ready to move on. List for free, set your own price, and keep everything when the deal closes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">How it works</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center justify-center">1</span>
                <div>
                  <p className="font-medium">Sellers create a free listing</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Add asking price, revenue, traffic, what is included, and a description. Our AI tool can draft the listing for you based on your metrics.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center justify-center">2</span>
                <div>
                  <p className="font-medium">Buyers browse and contact sellers</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Free accounts allow buyers to message any seller directly through the listing page. No approval queue, no broker coordinating the conversation.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center justify-center">3</span>
                <div>
                  <p className="font-medium">Buyer and seller close the deal</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Price, terms, and transfer are agreed between the two parties. Many use a third-party escrow service for security. Buy Sites Direct takes nothing when the deal closes.</p>
                </div>
              </li>
            </ol>
          </section>
        </div>

        <section className="mt-12 pt-8 border-t border-border/50">
          <h2 className="text-xl font-bold mb-6">Common questions</h2>
          <dl className="space-y-6">
            {aboutFaqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold mb-2">{item.q}</dt>
                <dd className="text-muted-foreground leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            More questions?{" "}
            <Link href="/faq" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Read the full FAQ
            </Link>{" "}
            covering buying, selling, and valuation.
          </p>
        </section>

        <div className="mt-16 rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-50/60 to-emerald-50/40 dark:from-indigo-950/30 dark:to-emerald-950/20 p-8 text-center">
          <h2 className="font-bold text-lg mb-2">Ready to get started?</h2>
          <p className="text-muted-foreground text-sm mb-5">
            Browse active listings or list your site for free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#listings"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Browse listings
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
            >
              Sell your site
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-5">
            Have a question first? <Link href="/faq" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read the FAQ.</Link>
          </p>
        </div>
      </div>
    </>
  )
}
