import type React from "react"
import type { Metadata } from "next"

// Canonical domain - www yok, https var
const CANONICAL_BASE = "https://taslawfirm.com.tr"

export const metadata: Metadata = {
  title: "Online Randevu",
  description: "İzmir'de hukuki danışmanlık için hızlıca online randevu talebi oluşturun. Taş Hukuk & Danışmanlık.",
  keywords: ["avukat randevu", "online randevu", "hukuki danışmanlık randevu", "izmir avukat randevu"],
  alternates: {
    canonical: `${CANONICAL_BASE}/online-randevu`,
  },
  openGraph: {
    type: "website",
    title: "Online Randevu | Taş Hukuk & Danışmanlık",
    description: "Hukuki danışmanlık için hızlıca online randevu talebi oluşturun.",
    url: `${CANONICAL_BASE}/online-randevu`,
    images: [`${CANONICAL_BASE}/online-randevu-hero.jpg`],
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
