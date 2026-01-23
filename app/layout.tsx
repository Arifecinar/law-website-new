import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Playfair_Display, Lora } from "next/font/google"
import "./globals.css"
import { FloatingContact } from "@/components/floating-contact"
import { SITE_CONFIG } from "@/lib/constants"

// Canonical domain - www yok, https var (SEO için kritik)
const CANONICAL_BASE = "https://taslawfirm.com.tr"
const siteUrl = CANONICAL_BASE

const verificationMeta: Metadata["verification"] = {
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION
    ? { yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION }
    : {}),
  ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION as string } }
    : {}),
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: {
    default: "Taş Hukuk & Danışmanlık | İzmir Avukatlık ve Hukuki Danışmanlık",
    template: "%s | İzmir Avukatlık ve Hukuki Danışmanlık",
  },
  icons: {
    icon: "/favicon.png",
  },
  description:
    "Taş Hukuk & Danışmanlık; iş, ceza, gayrimenkul, miras ve ticaret hukuku alanlarında İzmir'de profesyonel avukatlık ve hukuki danışmanlık hizmetleri sunar.",
  keywords: [
    "avukat",
    "hukuk",
    "iş hukuku",
    "aile hukuku",
    "ceza hukuku",
    "gayrimenkul hukuku",
    "ticaret hukuku",
    "miras hukuku",
    "İzmir avukat",
    "hukuk bürosu",
    "Kadir Taş",
  ],
  // Canonical URL - SEO için kritik
  alternates: {
    canonical: CANONICAL_BASE,
  },
  openGraph: {
    title: "Taş Hukuk & Danışmanlık",
    description:
      "İş, ceza, gayrimenkul, miras ve ticaret hukuku alanlarında uzman avukatlık ve danışmanlık hizmetleri.",
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US", "tr_TR"],
    images: [
      siteUrl + "/law-firm-hero-image.jpg",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taş Hukuk & Danışmanlık",
    description:
      "İş, ceza, gayrimenkul, miras ve ticaret hukuku alanlarında uzman avukatlık ve danışmanlık hizmetleri.",
    images: [
      siteUrl + "/law-firm-hero-image.jpg",
    ],
  },
  verification: verificationMeta,
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#7A2420",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`${lora.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <FloatingContact />
        <Script
          id="ld-json-legalservice"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: SITE_CONFIG.name,
              url: CANONICAL_BASE,
              telephone: SITE_CONFIG.phone,
              email: SITE_CONFIG.email,
              image: `${CANONICAL_BASE}/law-firm-hero-image.jpg`,
              logo: `${CANONICAL_BASE}/tas_hukuk_logo.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: SITE_CONFIG.address,
                addressLocality: "İzmir",
                addressRegion: "İzmir",
                addressCountry: "TR",
              },
              sameAs: Object.values(SITE_CONFIG.socialMedia || {}),
              areaServed: "TR",
            }),
          }}
        />
        <Script
          id="ld-json-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_CONFIG.title,
              url: CANONICAL_BASE,
              potentialAction: {
                "@type": "SearchAction",
                target: `${CANONICAL_BASE}/makaleler?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
