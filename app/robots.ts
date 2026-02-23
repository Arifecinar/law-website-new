import type { MetadataRoute } from "next"

// Canonical domain for robots.txt
const CANONICAL_BASE = "https://taslawfirm.com.tr"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/admin/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${CANONICAL_BASE}/sitemap.xml`,
    host: CANONICAL_BASE,
  }
}
