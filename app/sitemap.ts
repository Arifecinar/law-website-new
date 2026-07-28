import type { MetadataRoute } from "next"
import { getArticles } from "@/lib/db/queries"

// Canonical domain - www + https (SEO: Google Search Console ile tutarlı)
const CANONICAL_BASE = "https://www.taslawfirm.com.tr"

// EN Practice Areas - STATİK slug'lar (veritabanından DEĞİL!)
// Header'daki ve generateStaticParams'taki slug'larla birebir eşleşmeli
const EN_PRACTICE_AREA_SLUGS = [
  "corporate",
  "litigation",
  "employment",
  "real-estate",
  "intellectual-property",
  "estate-planning",
]

// TR Çalışma Alanları - statik slug'lar
const TR_CALISMA_ALANI_SLUGS = [
  "aile-hukuku",
  "ceza-hukuku",
  "miras-hukuku",
  "is-hukuku",
  "ticaret-hukuku",
  "gayrimenkul-hukuku",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  // Statik sayfalar için sabit tarih — build her çalıştığında tarih değişmesin
  const staticDate = new Date("2026-07-20T11:22:55.627Z")

  // ──────────────────────────────────────────────────────────────────────
  // TURKISH PAGES (/tr/...)
  // ──────────────────────────────────────────────────────────────────────
  const trStaticPages: MetadataRoute.Sitemap = [
      {
        url: `${CANONICAL_BASE}/tr`,
        lastModified: staticDate,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${CANONICAL_BASE}/tr/hakkimizda`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },

      {
        url: `${CANONICAL_BASE}/tr/calisma-alanlari`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${CANONICAL_BASE}/tr/makaleler`,
        lastModified: staticDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${CANONICAL_BASE}/tr/iletisim`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${CANONICAL_BASE}/tr/online-randevu`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
  ]

  // ──────────────────────────────────────────────────────────────────────
  // ENGLISH PAGES (/en/...)
  // ──────────────────────────────────────────────────────────────────────
  const enStaticPages: MetadataRoute.Sitemap = [
      {
        url: `${CANONICAL_BASE}/en`,
        lastModified: staticDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${CANONICAL_BASE}/en/about`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${CANONICAL_BASE}/en/practice-areas`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${CANONICAL_BASE}/en/articles`,
        lastModified: staticDate,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${CANONICAL_BASE}/en/contact`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${CANONICAL_BASE}/en/appointment`,
        lastModified: staticDate,
        changeFrequency: "monthly",
        priority: 0.6,
      },
  ]

  // ──────────────────────────────────────────────────────────────────────
  // DYNAMIC: Turkish Articles (/tr/makaleler/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const articles = (await getArticles()).filter((a: any) => a.published !== false)

  const trArticles = articles
    .filter((a: any) => !a.language || a.language === "tr")
    .map<MetadataRoute.Sitemap[number]>((a: any) => ({
      url: `${CANONICAL_BASE}/tr/makaleler/${a.slug}`,
      lastModified: a.updated_at || a.published_at || a.created_at || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  // ──────────────────────────────────────────────────────────────────────
  // DYNAMIC: English Articles (/en/articles/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const enArticles = articles
    .filter((a: any) => a.language === "en")
    .map<MetadataRoute.Sitemap[number]>((a: any) => ({
      url: `${CANONICAL_BASE}/en/articles/${a.slug}`,
      lastModified: a.updated_at || a.published_at || a.created_at || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  // ──────────────────────────────────────────────────────────────────────
  // STATIC: Turkish Practice Area Detail Pages (/tr/calisma-alanlari/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const trPracticeAreas = TR_CALISMA_ALANI_SLUGS.map<MetadataRoute.Sitemap[number]>((slug) => ({
    url: `${CANONICAL_BASE}/tr/calisma-alanlari/${slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // ──────────────────────────────────────────────────────────────────────
  // STATIC: English Practice Areas (/en/practice-areas/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const enPracticeAreas = EN_PRACTICE_AREA_SLUGS.map<MetadataRoute.Sitemap[number]>((slug) => ({
    url: `${CANONICAL_BASE}/en/practice-areas/${slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    ...trStaticPages,
    ...enStaticPages,
    ...trArticles,
    ...enArticles,
    ...trPracticeAreas,
    ...enPracticeAreas,
  ]
}
