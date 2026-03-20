import type { Metadata } from "next"
import React from "react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Buying & Selling Websites FAQ | Buy Sites Direct",
  description: "Answers to common questions about buying and selling websites on Buy Sites Direct. No broker fees, no commissions — just direct deals.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Buying & Selling Websites FAQ | Buy Sites Direct",
    description: "Answers to common questions about buying and selling websites on Buy Sites Direct. No broker fees, no commissions.",
    url: "https://buysitesdirect.com/faq",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Buy Sites Direct FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buying & Selling Websites FAQ | Buy Sites Direct",
    description: "Answers to common questions about buying and selling websites on Buy Sites Direct.",
    images: ["/og-image.png"],
  },
}

type FaqItem = {
  q: string
  a: string
  content?: React.ReactNode
}

const faqs: { section: string; id: string; items: FaqItem[] }[] = [
  {
    section: "General",
    id: "general",
    items: [
      {
        q: "What is Buy Sites Direct?",
        a: "Buy Sites Direct is a marketplace where website owners list their sites for sale and buyers contact them directly. There are no brokers, no middlemen, and no commissions taken when a deal closes.",
      },
      {
        q: "What types of websites are listed for sale?",
        a: "You'll find content sites, blogs, SaaS products, eCommerce stores, newsletters, online communities, service businesses, and other web-based assets. Browse by category to narrow your search.",
        content: <>You&apos;ll find <Link href="/buy/content-site" className="text-indigo-600 dark:text-indigo-400 hover:underline">content sites</Link>, blogs, <Link href="/buy/saas" className="text-indigo-600 dark:text-indigo-400 hover:underline">SaaS products</Link>, <Link href="/buy/ecommerce" className="text-indigo-600 dark:text-indigo-400 hover:underline">eCommerce stores</Link>, <Link href="/buy/newsletter" className="text-indigo-600 dark:text-indigo-400 hover:underline">newsletters</Link>, <Link href="/buy/community" className="text-indigo-600 dark:text-indigo-400 hover:underline">online communities</Link>, <Link href="/buy/service-business" className="text-indigo-600 dark:text-indigo-400 hover:underline">service businesses</Link>, and other web-based assets. Browse by category to narrow your search.</>,
      },
      {
        q: "Is Buy Sites Direct free to use?",
        a: "Yes. Listing a site is free. Contacting a seller is free. Buy Sites Direct charges no listing fee and takes no cut when the deal closes — the full sale price stays between buyer and seller.",
      },
    ],
  },
  {
    section: "Buying a Website",
    id: "buying",
    items: [
      {
        q: "How do I find websites for sale?",
        a: "Browse all active listings on the homepage or filter by category — content sites, SaaS, eCommerce, newsletters, and more. Each listing shows the asking price, monthly revenue, and a full description.",
        content: <>Browse all active listings on the homepage or filter by category: <Link href="/buy/content-site" className="text-indigo-600 dark:text-indigo-400 hover:underline">content sites</Link>, <Link href="/buy/saas" className="text-indigo-600 dark:text-indigo-400 hover:underline">SaaS</Link>, <Link href="/buy/ecommerce" className="text-indigo-600 dark:text-indigo-400 hover:underline">eCommerce</Link>, <Link href="/buy/newsletter" className="text-indigo-600 dark:text-indigo-400 hover:underline">newsletters</Link>, and more. Each listing shows the asking price, monthly revenue, and a full description.</>,
      },
      {
        q: "How do I contact a seller?",
        a: "Create a free account, open any listing, and send a message through the contact form at the bottom of the listing page. Your message goes directly to the seller — no middlemen involved.",
      },
      {
        q: "Is the asking price negotiable?",
        a: "That is entirely between you and the seller. Buy Sites Direct facilitates the introduction; the price, terms, and deal structure are agreed upon directly by buyer and seller.",
      },
      {
        q: "How do I verify a listing is legitimate?",
        a: "Request traffic and revenue screenshots, access to Google Analytics, and any other documentation directly from the seller before committing to anything. Treat it like any private business transaction and do your own due diligence.",
      },
      {
        q: "Does Buy Sites Direct use escrow or handle payments?",
        a: "No. Payments are handled directly between buyer and seller. Many transactions use a third-party escrow service — we recommend discussing this with the seller before finalising terms.",
      },
    ],
  },
  {
    section: "Selling a Website",
    id: "selling",
    items: [
      {
        q: "How do I list my website for sale?",
        a: "Create a free account, go to your dashboard, and start a new listing. Fill in the details — or let the AI listing tool draft a description for you based on your site's metrics. Review, adjust if needed, and publish.",
        content: <>Create a free account, go to your dashboard, and start a new listing. Fill in the details — or let the AI listing tool draft a description for you based on your site&apos;s metrics. Review, adjust if needed, and publish. <Link href="/sell" className="text-indigo-600 dark:text-indigo-400 hover:underline">Learn more about selling on Buy Sites Direct.</Link></>,
      },
      {
        q: "How much does it cost to list?",
        a: "Nothing. Listing is completely free. There is no listing fee, no monthly charge, and no commission deducted from the sale price when your site sells.",
      },
      {
        q: "What information should I include in my listing?",
        a: "Include the asking price, monthly revenue, traffic figures, age of the site, what is included in the sale (domain, content, social accounts, etc.), and your reason for selling. Detailed listings attract more serious buyers.",
      },
      {
        q: "How long will my listing stay active?",
        a: "Listings remain active until you mark them sold, place them under offer, or remove them from your dashboard. You are in full control.",
      },
      {
        q: "Can I list multiple websites?",
        a: "Yes. There is no limit on the number of listings per seller account. Each listing gets its own dedicated page and is discoverable in search.",
      },
    ],
  },
  {
    section: "Valuation",
    id: "valuation",
    items: [
      {
        q: "How much is my website worth?",
        a: "Most websites are valued at a multiple of monthly net profit (often called SDE — Seller's Discretionary Earnings). Content sites and SaaS products typically sell for 30–50x monthly profit. eCommerce stores range from 24–40x. Age, traffic stability, revenue diversification, and owner involvement all affect the multiple. A site earning $500/month might sell for $15,000–$25,000; one earning $5,000/month could command $150,000–$250,000.",
      },
      {
        q: "What multiple should I expect when selling a website?",
        a: "Multiples vary by business type, age, and risk profile. Content sites with stable organic traffic sell for 35–45x monthly profit. SaaS with recurring revenue and low churn can reach 40–60x. eCommerce is typically 24–36x due to inventory risk. Newer sites with less than 12 months of data or concentrated traffic sources command lower multiples. Set a realistic asking price based on your last 6–12 months of average monthly earnings.",
      },
      {
        q: "How long does it take to sell a website?",
        a: "Time-to-sale depends on asking price, listing quality, and market demand. Smaller sites under $20,000 often find buyers within a few weeks. Mid-market sites ($20,000–$100,000) typically take 1–3 months. Larger acquisitions can take longer as buyers conduct more thorough due diligence. Detailed listings with verified revenue, traffic screenshots, and clear seller notes sell significantly faster than sparse ones.",
      },
    ],
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    }))
  ),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Buy Sites Direct", "item": "https://buysitesdirect.com" },
    { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://buysitesdirect.com/faq" },
  ],
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, breadcrumbSchema]) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">FAQ</span>
        </nav>

        <h1 className="text-3xl font-bold mb-3">Frequently asked questions</h1>
        <p className="text-muted-foreground mb-12">
          Everything you need to know about buying and selling websites on{" "}
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Buy Sites Direct</Link>.
          Still have a question?{" "}
          <Link href="/#listings" className="text-indigo-600 dark:text-indigo-400 hover:underline">Browse listings</Link>{" "}
          or start a conversation with any seller directly.
        </p>

        <div className="space-y-14">
          {faqs.map((section) => (
            <section key={section.section} id={section.id}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 pb-2 border-b border-border">
                {section.section}
              </h2>
              <dl className="space-y-8">
                {section.items.map((item) => (
                  <div key={item.q}>
                    <dt className="font-semibold text-base mb-2">{item.q}</dt>
                    <dd className="text-muted-foreground leading-relaxed">{item.content ?? item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border/60 bg-gradient-to-br from-indigo-50/60 to-emerald-50/40 dark:from-indigo-950/30 dark:to-emerald-950/20 p-8 text-center">
          <h2 className="font-bold text-lg mb-2">Ready to find your next site?</h2>
          <p className="text-muted-foreground text-sm mb-5">
            Browse active listings across content sites, SaaS, eCommerce, newsletters, and more.
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
        </div>
      </div>
    </>
  )
}
