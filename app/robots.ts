import type { MetadataRoute } from "next"

// Canonical domain for robots.txt (www + https)
const CANONICAL_BASE = "https://www.taslawfirm.com.tr"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/tr/makaleler?*",
          "/en/articles?*",
        ],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/tr/makaleler?*",
          "/en/articles?*",
        ],
      },
    ],
    sitemap: `${CANONICAL_BASE}/sitemap.xml`,
    host: CANONICAL_BASE,
  }
}
