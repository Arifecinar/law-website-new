import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Taş Hukuk ile iletişime geçin. Hukuki danışmanlık ve randevu talepleriniz için formu doldurun.",
  keywords: ["avukat iletişim", "hukuki danışmanlık", "randevu al", "izmir avukat iletişim"],
  alternates: {
    canonical: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/iletisim",
  },
  openGraph: {
    type: "website",
    title: "İletişim | Taş Hukuk",
    description:
      "Taş Hukuk ile iletişime geçin. Hukuki danışmanlık ve randevu talepleriniz için formu doldurun.",
    url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/iletisim",
  },
  twitter: {
    card: "summary",
    title: "İletişim | Taş Hukuk",
    description:
      "Taş Hukuk ile iletişime geçin. Hukuki danışmanlık ve randevu talepleriniz için formu doldurun.",
  },
}

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        id="ld-json-contactpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "İletişim",
            url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/iletisim",
            mainEntity: {
              "@type": "Organization",
              name: SITE_CONFIG.name,
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: SITE_CONFIG.phone,
                  contactType: "customer service",
                  areaServed: "TR",
                  availableLanguage: ["tr", "en"],
                },
              ],
            },
          }),
        }}
      />
    </>
  )
}


