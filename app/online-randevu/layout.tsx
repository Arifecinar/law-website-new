import type React from "react"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Online Randevu",
  description: "İzmir'de hukuki danışmanlık için hızlıca online randevu talebi oluşturun. Taş Hukuk & Danışmanlık.",
  keywords: ["avukat randevu", "online randevu", "hukuki danışmanlık randevu", "izmir avukat randevu"],
  alternates: {
    canonical: siteUrl + "/online-randevu",
  },
  openGraph: {
    type: "website",
    title: "Online Randevu | Taş Hukuk & Danışmanlık",
    description: "Hukuki danışmanlık için hızlıca online randevu talebi oluşturun.",
    url: siteUrl + "/online-randevu",
    images: [siteUrl + "/online-randevu-hero.jpg"],
    locale: "tr_TR",
  },
  twitter: {
    card: "summary",
    title: "Online Randevu | Taş Hukuk & Danışmanlık",
    description: "Hukuki danışmanlık için hızlıca online randevu talebi oluşturun.",
  },
}

export default function OnlineRandevuLayout({ children }: { children: React.ReactNode }) {
  return children
}


