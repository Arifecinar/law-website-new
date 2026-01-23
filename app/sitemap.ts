import type { MetadataRoute } from "next"
import { getArticles, getPracticeAreas } from "@/lib/db/queries"

// Canonical domain - www yok, https var
const CANONICAL_BASE = "https://taslawfirm.com.tr"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Ana sayfalar (Türkçe - öncelikli)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: CANONICAL_BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${CANONICAL_BASE}/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/av-kadir-tas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${CANONICAL_BASE}/calisma-alanlari`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_BASE}/makaleler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${CANONICAL_BASE}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${CANONICAL_BASE}/online-randevu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // Makaleler (Türkçe route - ana içerik)
  const articles = (await getArticles())
    .filter((a: any) => a.published !== false)
    .map<MetadataRoute.Sitemap[number]>((a: any) => ({
      url: `${CANONICAL_BASE}/makaleler/${a.slug}`,
      lastModified: a.updated_at || a.published_at || a.created_at || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  // Çalışma Alanları (detay sayfaları)
  const practiceAreas = (await getPracticeAreas()).map<MetadataRoute.Sitemap[number]>((p: any) => ({
    url: `${CANONICAL_BASE}/practice-areas/${p.slug}`,
    lastModified: p.updated_at || p.created_at || now,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticPages, ...articles, ...practiceAreas]
}
