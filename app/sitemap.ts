import type { MetadataRoute } from "next"
import { getArticles, getPracticeAreas } from "@/lib/db/queries"

// Canonical domain - www yok, https var
const CANONICAL_BASE = "https://taslawfirm.com.tr"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ──────────────────────────────────────────────────────────────────────
  // TURKISH PAGES (/tr/...)
  // ──────────────────────────────────────────────────────────────────────
  const trStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${CANONICAL_BASE}/tr`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${CANONICAL_BASE}/tr/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/tr/av-kadir-tas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/tr/calisma-alanlari`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_BASE}/tr/makaleler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_BASE}/tr/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_BASE}/tr/online-randevu`,
      lastModified: now,
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
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_BASE}/en/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_BASE}/en/practice-areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/en/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/en/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${CANONICAL_BASE}/en/appointment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  // ──────────────────────────────────────────────────────────────────────
  // DYNAMIC: Turkish Articles (/tr/makaleler/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const trArticles = (await getArticles())
    .filter((a: any) => a.published !== false)
    .map<MetadataRoute.Sitemap[number]>((a: any) => ({
      url: `${CANONICAL_BASE}/tr/makaleler/${a.slug}`,
      lastModified: a.updated_at || a.published_at || a.created_at || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  // ──────────────────────────────────────────────────────────────────────
  // DYNAMIC: English Articles (/en/articles/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const enArticles = (await getArticles())
    .filter((a: any) => a.published !== false)
    .map<MetadataRoute.Sitemap[number]>((a: any) => ({
      url: `${CANONICAL_BASE}/en/articles/${a.slug}`,
      lastModified: a.updated_at || a.published_at || a.created_at || now,
      changeFrequency: "monthly",
      priority: 0.6,
    }))

  // ──────────────────────────────────────────────────────────────────────
  // STATIC: Turkish Practice Area Detail Pages (/tr/calisma-alanlari/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const trPracticeAreaSlugs = [
    "aile-hukuku",
    "ceza-hukuku",
    "miras-hukuku",
    "is-hukuku",
    "ticaret-hukuku",
    "gayrimenkul-hukuku",
  ]
  const trPracticeAreas = trPracticeAreaSlugs.map<MetadataRoute.Sitemap[number]>((slug) => ({
    url: `${CANONICAL_BASE}/tr/calisma-alanlari/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // ──────────────────────────────────────────────────────────────────────
  // DYNAMIC: English Practice Areas (/en/practice-areas/[slug])
  // ──────────────────────────────────────────────────────────────────────
  const enPracticeAreas = (await getPracticeAreas()).map<MetadataRoute.Sitemap[number]>((p: any) => ({
    url: `${CANONICAL_BASE}/en/practice-areas/${p.slug}`,
    lastModified: p.updated_at || p.created_at || now,
    changeFrequency: "yearly",
    priority: 0.6,
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
