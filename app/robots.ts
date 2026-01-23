import type { MetadataRoute } from "next"

// Canonical domain - www yok, https var
const CANONICAL_BASE = "https://taslawfirm.com.tr"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${CANONICAL_BASE}/sitemap.xml`,
    host: CANONICAL_BASE,
  }
}
