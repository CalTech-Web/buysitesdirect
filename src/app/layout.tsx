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
  openGraph: {
    siteName: "Buy Sites Direct",
    type: "website",
    url: BASE_URL,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Buy Sites Direct",
  "url": BASE_URL,
  "description": "Marketplace to buy and sell websites directly. No broker fees, no commissions.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
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
