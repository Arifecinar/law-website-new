import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { ADMIN_COOKIE_NAME, DEFAULT_SESSION_MAX_AGE, verifyAdminSessionToken } from "@/lib/auth"

// ─── CANONICAL DOMAIN ─────────────────────────────────────────────────────────
const CANONICAL_HOST = "taslawfirm.com.tr"
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`

// ─── PATHS THAT SHOULD NEVER BE REDIRECTED / REWRITTEN ────────────────────────
function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.png" ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".ttf") ||
    pathname.endsWith(".eot") ||
    pathname.endsWith(".mp4") ||
    pathname.endsWith(".webm")
  )
}

function isSystemPath(pathname: string): boolean {
  return (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin")
  )
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const host = request.headers.get("host") || ""

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 1 — DOMAIN CANONICALIZATION (production only)
  // Force https://taslawfirm.com.tr (no www, no http)
  // ──────────────────────────────────────────────────────────────────────────
  if (process.env.NODE_ENV === "production") {
    const proto = request.headers.get("x-forwarded-proto") || "https"
    const needsRedirect = proto === "http" || host.startsWith("www.")

    if (needsRedirect) {
      const canonicalUrl = `${CANONICAL_ORIGIN}${pathname}${search}`
      return NextResponse.redirect(canonicalUrl, { status: 301 })
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 2 — SKIP static assets (let Next.js handle them normally)
  // ──────────────────────────────────────────────────────────────────────────
  if (isStaticAsset(pathname)) {
    return NextResponse.next()
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 3 — ADMIN AUTH (preserve existing logic)
  // ──────────────────────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return handleAdminAuth(request, pathname)
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 4 — SKIP system paths (API, sitemap, robots)
  // ──────────────────────────────────────────────────────────────────────────
  if (isSystemPath(pathname)) {
    return NextResponse.next()
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 5 — ROOT REDIRECT: / → /tr  (bot-safe)
  // Googlebot receives 200 OK at "/" to avoid canonical confusion.
  // Human visitors are redirected to /tr.
  // ──────────────────────────────────────────────────────────────────────────
  if (pathname === "/") {
    const userAgent = request.headers.get("user-agent") || ""
    const isBot =
      userAgent.includes("Googlebot") ||
      userAgent.includes("bingbot") ||
      userAgent.includes("Slurp") ||
      userAgent.includes("DuckDuckBot") ||
      userAgent.includes("YandexBot") ||
      userAgent.includes("Baiduspider") ||
      userAgent.includes("facebookexternalhit") ||
      userAgent.includes("Twitterbot") ||
      userAgent.includes("LinkedInBot")

    if (isBot) {
      // Let bots see "/" as-is → Next.js will serve /tr content via rewrite
      const url = request.nextUrl.clone()
      url.pathname = "/tr"
      const response = NextResponse.rewrite(url)
      response.headers.set("x-locale", "tr")
      return response
    }

    // Human users → 301 redirect to /tr
    const url = request.nextUrl.clone()
    url.pathname = "/tr"
    const response = NextResponse.redirect(url, { status: 301 })
    response.headers.set("x-locale", "tr")
    return response
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 6 — REAL LOCALE ROUTING (filesystem-based)
  // Pages physically exist under /app/tr/ and /app/en/ — let Next.js handle.
  // ──────────────────────────────────────────────────────────────────────────
  if (pathname.startsWith("/tr") || pathname.startsWith("/en")) {
    const locale = pathname.startsWith("/en") ? "en" : "tr"
    const response = NextResponse.next()
    response.headers.set("x-locale", locale)
    return response
  }

  // ──────────────────────────────────────────────────────────────────────────
  // STEP 7 — CATCH-ALL: Legacy URL patterns → redirect to /tr/ or /en/
  // (These are fallbacks for patterns not caught by next.config.mjs redirects)
  // ──────────────────────────────────────────────────────────────────────────

  // /makaleler-7, /makaleler-12 etc → /tr/makaleler
  if (/^\/makaleler-\d+$/.test(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/tr/makaleler"
    return NextResponse.redirect(url, { status: 301 })
  }

  // Any other unrecognized public page without language prefix →
  // redirect to /tr/[current-path] as fallback
  // (only if it looks like a page, not a static asset or API)
  const firstSegment = pathname.split("/")[1]
  const knownTrSlugs = ["hakkimizda", "iletisim", "makaleler", "calisma-alanlari", "av-kadir-tas", "online-randevu"]
  const knownEnSlugs = ["about", "contact", "articles", "practice-areas", "appointment"]

  if (knownTrSlugs.includes(firstSegment)) {
    const url = request.nextUrl.clone()
    url.pathname = `/tr${pathname}`
    return NextResponse.redirect(url, { status: 301 })
  }

  if (knownEnSlugs.includes(firstSegment)) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

// ─── ADMIN AUTH HELPER ────────────────────────────────────────────────────────
async function handleAdminAuth(request: NextRequest, pathname: string) {
  // Allow admin login page, login API, and logout API
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next()
  }

  const needsAuth =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")

  if (needsAuth) {
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value || ""
    const secret = process.env.ADMIN_SESSION_SECRET || ""
    const isValid = secret
      ? await verifyAdminSessionToken(secret, token, DEFAULT_SESSION_MAX_AGE)
      : false

    if (!isValid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("next", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next.js internal statics.
     * This lets middleware handle:
     * - Domain canonicalization (HTTP→HTTPS, www→non-www)
     * - Language prefix routing (/tr/*, /en/*)
     * - Legacy URL redirects
     * - Admin authentication
     */
    "/((?!_next/static|_next/image).*)",
  ],
}
