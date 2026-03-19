import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const geist = Geist({ subsets: ["latin"] });

const BASE_URL = "https://buysitesdirect.com"

export const metadata: Metadata = {
  title: "Buy Sites Direct | Buy and Sell Websites Directly",
  description: "Browse content sites, SaaS, ecommerce stores, newsletters, and more for sale. No broker fees, no commissions. Contact sellers directly on buysitesdirect.com.",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Buy Sites Direct",
    type: "website",
    url: BASE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Buy Sites Direct | Buy and Sell Websites Directly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Sites Direct | Buy and Sell Websites Directly",
    description: "Browse content sites, SaaS, ecommerce stores, newsletters, and more for sale. No broker fees, no commissions.",
    images: ["/og-image.png"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": "Buy Sites Direct",
  "url": BASE_URL,
  "description": "Marketplace to buy and sell websites directly. No broker fees, no commissions.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "Buy Sites Direct",
  "url": BASE_URL,
  "description": "Buy and sell websites directly with no broker fees or commissions.",
  "sameAs": [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, organizationSchema]),
          }}
        />
      </head>
      <body className={`${geist.className} antialiased bg-background text-foreground min-h-screen`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
