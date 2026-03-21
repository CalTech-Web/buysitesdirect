import type { Metadata } from "next"
import Link from "next/link"
import { Check, Sparkles, ArrowRight, ShieldCheck, DollarSign, Zap, MessageCircle, X } from "lucide-react"

const BASE_URL = "https://buysitesdirect.com"

export const metadata: Metadata = {
  title: "Sell Your Website | List Free on Buy Sites Direct",
  description: "List your website or online business for sale. Free listing, AI writes the description, no broker fees or commissions. Keep 100% of what you sell for.",
  alternates: { canonical: "/sell" },
  openGraph: {
    title: "Sell Your Website | List Free on Buy Sites Direct",
    description: "List your website or online business for sale. Free listing, AI writes the description, zero broker fees.",
    url: `${BASE_URL}/sell`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sell Your Website on Buy Sites Direct" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Website | List Free on Buy Sites Direct",
    description: "List your website or online business for sale. Free listing, AI writes the description, zero broker fees.",
    images: ["/og-image.png"],
  },
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Buy Sites Direct", "item": BASE_URL },
    { "@type": "ListItem", "position": 2, "name": "Sell Your Website", "item": `${BASE_URL}/sell` },
  ],
}

const sellFaqs = [
  {
    q: "How do I know what price to list my website for?",
    a: "Most websites are valued at a multiple of monthly net profit. Content sites and SaaS typically sell for 30–50x monthly profit; eCommerce stores range from 24–40x. A site earning $500/month might list for $15,000–$25,000. Browse active listings in your category to see how comparable sites are priced, or read our valuation guide for a full breakdown by business type.",
  },
  {
    q: "What information should I include in my listing?",
    a: "Include the asking price, monthly revenue, monthly traffic or pageviews, site age, what is included in the sale (domain, content, social accounts, email list), and your reason for selling. Detailed listings with verified screenshots attract more serious buyers and typically receive enquiries faster.",
  },
  {
    q: "How long does it take to sell a website on Buy Sites Direct?",
    a: "Sites under $20,000 typically receive enquiries within days and can close within a few weeks. Mid-market listings ($20,000–$100,000) generally take 1–3 months. The key factor is listing quality: sellers who provide detailed metrics, revenue screenshots, and a clear description close significantly faster than those with sparse listings.",
  },
  {
    q: "Do I need to verify my revenue before listing?",
    a: "No verification is required to publish a listing. However, sellers who include revenue and traffic screenshots attract more serious buyers and close deals faster. You can share additional documentation directly with interested buyers after initial contact through the platform.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": sellFaqs.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a,
    },
  })),
}

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Sell Your Website on Buy Sites Direct",
  "description": "List your website or online business for sale in three steps. Free, no broker fees, no commissions.",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Enter your URL and price",
      "text": "Create a free account, paste your site URL, and set your asking price.",
      "url": `${BASE_URL}/register`,
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "AI writes your listing",
      "text": "The AI reads your site and generates a title, description, tech stack, and revenue summary. Review it and adjust anything.",
      "url": `${BASE_URL}/register`,
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Buyers contact you directly",
      "text": "Interested buyers send you a message. No broker in the middle. You negotiate on your own terms.",
      "url": `${BASE_URL}/sell`,
    },
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sell Your Website on Buy Sites Direct",
  "description": "List your website or online business for sale with a free AI-generated listing. No broker fees, no commissions. Buyers contact you directly.",
  "provider": {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Buy Sites Direct",
    "url": BASE_URL,
  },
  "serviceType": "Website Marketplace",
  "areaServed": "Worldwide",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free listing, no commissions on sale",
  },
}

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema, howToSchema, faqSchema]) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Sell Your Website</span>
        </nav>

        {/* Hero */}
        <section className="mb-12">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-14 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.25)_0%,_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.15)_0%,_transparent_60%)]" />
            <div className="animate-orb-1 absolute -top-10 -right-10 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
            <div className="animate-orb-2 absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
            <div className="animate-sparkle absolute w-1 h-1 rounded-full bg-indigo-300/80 blur-[0.5px] pointer-events-none" style={{ top: '18%', left: '8%', animationDuration: '3.2s' }} />
            <div className="animate-sparkle absolute w-px h-px rounded-full bg-white/70 pointer-events-none" style={{ top: '68%', left: '6%', animationDuration: '2.5s', animationDelay: '1.1s' }} />
            <div className="animate-sparkle absolute w-1 h-1 rounded-full bg-emerald-300/70 blur-[0.5px] pointer-events-none" style={{ top: '20%', right: '11%', animationDuration: '3.8s', animationDelay: '0.4s' }} />
            <div className="animate-sparkle absolute w-px h-px rounded-full bg-indigo-200/80 pointer-events-none" style={{ top: '58%', right: '9%', animationDuration: '2.8s', animationDelay: '1.8s' }} />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-xs font-semibold text-indigo-300 mb-5">
                <Sparkles className="h-3 w-3" />
                Free listing. No commissions.
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                Sell your website.{" "}
                <span className="animate-hero-gradient">Keep everything.</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">
                List your site in 30 seconds. AI writes the listing. Buyers contact you directly. No broker takes a cut.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="relative inline-block">
                  <span className="animate-cta-ring absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 pointer-events-none" aria-hidden="true" />
                  <Link
                    href="/register"
                    className="relative overflow-hidden inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="animate-shimmer absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" aria-hidden="true" />
                    <Sparkles className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">List Your Site Free</span>
                  </Link>
                </div>
                <Link
                  href="/faq#selling"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  Read the FAQ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-2">How selling works</h2>
          <p className="text-muted-foreground mb-8">Three steps from idea to listed. No paperwork, no waiting, no broker calls.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                icon: <Sparkles className="w-5 h-5 text-white" />,
                title: "Enter your URL and price",
                desc: "Create a free account, paste your site URL, and set your asking price. That's it.",
                color: "from-indigo-500 to-indigo-400",
                shadow: "shadow-indigo-200/60 dark:shadow-indigo-900/60",
              },
              {
                step: "2",
                icon: <Zap className="w-5 h-5 text-white" />,
                title: "AI writes your listing",
                desc: "The AI reads your site and generates a title, description, tech stack, and revenue summary. Review it, adjust anything.",
                color: "from-indigo-500 to-emerald-500",
                shadow: "shadow-indigo-200/60 dark:shadow-indigo-900/60",
              },
              {
                step: "3",
                icon: <MessageCircle className="w-5 h-5 text-white" />,
                title: "Buyers contact you directly",
                desc: "Interested buyers send you a message. No broker in the middle. You negotiate on your own terms.",
                color: "from-emerald-500 to-emerald-400",
                shadow: "shadow-emerald-200/60 dark:shadow-emerald-900/60",
              },
            ].map(({ step, icon, title, desc, color, shadow }) => (
              <div key={step} className="relative flex flex-col p-6 rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-950 border border-slate-100 dark:border-slate-800 overflow-hidden">
                <span className="absolute -bottom-3 -right-1 text-[80px] font-black text-slate-100 dark:text-slate-800 leading-none select-none pointer-events-none">{step}</span>
                <div className={`relative w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-md ${shadow}`}>
                  {icon}
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why sell here vs broker */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Why sell here instead of a broker?</h2>
          <p className="text-muted-foreground mb-8">Traditional website brokers take 10 to 15% of your sale price. On a $50,000 site, that's $7,500 gone before you touch it.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Buy Sites Direct column */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-emerald-500" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.2)_0%,_transparent_60%)]" />
              <div className="flex items-center gap-2.5 mb-5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 text-white text-sm font-bold shrink-0">B</span>
                <span className="font-bold text-white text-base">Buy Sites Direct</span>
                <span className="ml-auto text-[10px] font-bold bg-emerald-400/15 text-emerald-400 border border-emerald-400/25 px-2.5 py-1 rounded-full tracking-wide">FREE</span>
              </div>
              <div className="space-y-3.5">
                {[
                  { label: "Listing fee", value: "Free" },
                  { label: "Commission on sale", value: "0%" },
                  { label: "Time to list", value: "30 seconds" },
                  { label: "AI listing generation", value: true },
                  { label: "Direct buyer contact", value: true },
                  { label: "Keep 100% of sale price", value: true },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-300">{label}</span>
                    {typeof value === "boolean" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-semibold shrink-0">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-400/15 shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-emerald-400 shrink-0">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional broker column */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/60 via-slate-900/50 to-slate-800/60 border border-slate-700/40 p-6">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-slate-500/60 via-slate-400/40 to-slate-500/60" />
              <div className="flex items-center gap-2.5 mb-5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-600/40 text-slate-400 text-sm font-bold shrink-0">B</span>
                <span className="font-bold text-slate-400 text-base">Traditional Broker</span>
              </div>
              <div className="space-y-3.5">
                {[
                  { label: "Listing fee", value: "$49–$299" },
                  { label: "Commission on sale", value: "10–15%" },
                  { label: "Time to list", value: "Days to weeks" },
                  { label: "AI listing generation", value: false },
                  { label: "Direct buyer contact", value: false },
                  { label: "Keep 100% of sale price", value: false },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">{label}</span>
                    {typeof value === "boolean" ? (
                      <span className="inline-flex items-center gap-1 text-slate-500/70 text-sm font-medium shrink-0">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-400/10 shrink-0">
                          <X className="w-3 h-3 text-red-400/70" />
                        </span>
                        No
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-slate-500/80 shrink-0 line-through decoration-slate-500/40">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits list */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">What you get</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
                title: "Zero fees, always",
                desc: "Creating a listing is free. When your site sells, you keep every dollar. No percentage, no surprise invoice.",
              },
              {
                icon: <Sparkles className="h-5 w-5 text-indigo-500" />,
                title: "AI writes the listing",
                desc: "Paste your URL and the AI generates a title, description, and key metrics. Takes 30 seconds, not 30 minutes.",
              },
              {
                icon: <MessageCircle className="h-5 w-5 text-indigo-500" />,
                title: "Buyers reach you directly",
                desc: "Interested buyers send a message that goes straight to your inbox. No gatekeeper, no waiting room.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
                title: "Your terms, your deal",
                desc: "You set the price, you run the negotiation, you choose the buyer. Nobody else makes that call.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl border border-border/60 bg-background/80">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What can you sell */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-2">What can you list?</h2>
          <p className="text-muted-foreground mb-6">Any online business with real metrics. Browse active listings in each category to see the market.</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Content Sites & Blogs", href: "/buy/content-site" },
              { label: "SaaS Businesses", href: "/buy/saas" },
              { label: "eCommerce Stores", href: "/buy/ecommerce" },
              { label: "Newsletters", href: "/buy/newsletter" },
              { label: "Online Tools & Apps", href: "/buy/tool-or-app" },
              { label: "Online Communities", href: "/buy/community" },
              { label: "Service Businesses", href: "/buy/service-business" },
              { label: "Other Online Businesses", href: "/buy/other" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/60 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {label}
                <ArrowRight className="h-3.5 w-3.5 opacity-40 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Looking to buy instead?{" "}
            <Link href="/buy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Browse all websites for sale
            </Link>.
          </p>
        </section>

        {/* Seller FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Common questions from sellers</h2>
          <p className="text-muted-foreground mb-8">
            Everything you need to know before listing.{" "}
            <Link href="/faq#selling" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Full FAQ
            </Link>{" "}
            has more detail on the buying and selling process.
          </p>
          <dl className="space-y-6">
            {sellFaqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border/60 bg-background/80 p-5">
                <dt className="font-semibold text-sm mb-2">{q}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-muted-foreground">
            Wondering what your site is worth?{" "}
            <Link href="/faq#valuation" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Read our valuation guide
            </Link>{" "}
            for multiples by business type.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-2xl border border-indigo-200 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-indigo-950/30 dark:via-slate-900 dark:to-emerald-950/20 p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to list your site?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create a free account, paste your URL, and have a live listing in under a minute. No broker, no waiting, no fees.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="relative inline-block">
              <span className="animate-cta-ring absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 pointer-events-none" aria-hidden="true" />
              <Link
                href="/register"
                className="relative overflow-hidden inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all"
              >
                <span className="animate-shimmer absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" aria-hidden="true" />
                <span className="relative z-10">Create Free Account</span>
                <ArrowRight className="h-4 w-4 relative z-10" />
              </Link>
            </div>
            <Link
              href="/faq#selling"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Selling FAQ
              <ArrowRight className="h-4 w-4 opacity-50" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
