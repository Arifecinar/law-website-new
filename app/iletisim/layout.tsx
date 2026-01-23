import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { SITE_CONFIG } from "@/lib/constants"

// Canonical domain - www yok, https var
const CANONICAL_BASE = "https://taslawfirm.com.tr"

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Taş Hukuk ile iletişime geçin. Hukuki danışmanlık ve randevu talepleriniz için formu doldurun.",
  keywords: ["avukat iletişim", "hukuki danışmanlık", "randevu al", "izmir avukat iletişim"],
  alternates: {
    canonical: `${CANONICAL_BASE}/iletisim`,
  },
  openGraph: {
    type: "website",
    title: "İletişim | Taş Hukuk",
    description:
      "Taş Hukuk ile iletişime geçin. Hukuki danışmanlık ve randevu talepleriniz için formu doldurun.",
    url: `${CANONICAL_BASE}/iletisim`,
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
            url: `${CANONICAL_BASE}/iletisim`,
            mainEntity: {
              "@type": "Organization",
              name: SITE_CONFIG.name,
              url: CANONICAL_BASE,
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
