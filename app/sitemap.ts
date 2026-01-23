import type { MetadataRoute } from "next"
import { getArticles, getPracticeAreas } from "@/lib/db/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const now = new Date()

  const staticPaths = [
    "",
    "/hakkimizda",
    "/calisma-alanlari",
    "/av-kadir-tas",
    "/makaleler",
    "/iletisim",
    "/online-randevu",
  ].map<MetadataRoute.Sitemap[number]>((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }))

  // Articles (Turkish route)
  const articles = (await getArticles())
    .filter((a: any) => a.published !== false)
    .map<MetadataRoute.Sitemap[number]>((a: any) => ({
      url: `${base}/makaleler/${a.slug}`,
      lastModified: a.updated_at || a.published_at || a.created_at || now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  // Articles (English route)
  const articlesEn = (await getArticles())
    .filter((a: any) => a.published !== false)
    .map<MetadataRoute.Sitemap[number]>((a: any) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.updated_at || a.published_at || a.created_at || now,
      changeFrequency: "monthly",
      priority: 0.4,
    }))

  // Practice areas (English route, detail pages)
  const practiceAreas = (await getPracticeAreas()).map<MetadataRoute.Sitemap[number]>((p: any) => ({
    url: `${base}/practice-areas/${p.slug}`,
    lastModified: p.updated_at || p.created_at || now,
    changeFrequency: "yearly",
    priority: 0.5,
  }))

  return [...staticPaths, ...articles, ...articlesEn, ...practiceAreas]
}
