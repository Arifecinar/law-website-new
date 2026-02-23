import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { ADMIN_COOKIE_NAME, DEFAULT_SESSION_MAX_AGE, verifyAdminSessionToken } from "@/lib/auth"

/* -------------------------------------------------------------------------- */
/* STATIC & SYSTEM PATH CONTROLS                                              */
/* -------------------------------------------------------------------------- */

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname === "/favicon.ico" ||
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
    pathname.startsWith("/api")
  )
}

/* -------------------------------------------------------------------------- */
/* MIDDLEWARE                                                                 */
/* -------------------------------------------------------------------------- */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  /* 1️⃣ STATIC FILES VE API'YE DOKUNMA */
  if (isStaticAsset(pathname) || isSystemPath(pathname)) {
    return NextResponse.next()
  }

  /* 2️⃣ ADMIN AUTH (DEĞİŞMEDİ) */
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    return handleAdminAuth(request, pathname)
  }

  /* 3️⃣ ROOT → /tr (REWRITE, REDIRECT DEĞİL!) */
  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/tr"

    const response = NextResponse.rewrite(url)
    response.headers.set("x-locale", "tr")
    return response
  }

  /* 4️⃣ LOCALE PATHS NORMAL DEVAM ETSİN */
  if (pathname.startsWith("/tr") || pathname.startsWith("/en")) {
    const locale = pathname.startsWith("/en") ? "en" : "tr"
    const response = NextResponse.next()
    response.headers.set("x-locale", locale)
    return response
  }

  /* 5️⃣ LEGACY URL → DOĞRU DİL PREFIX */

  const firstSegment = pathname.split("/")[1]

  const knownTrSlugs = [
    "hakkimizda",
    "iletisim",
    "makaleler",
    "calisma-alanlari",
    "av-kadir-tas",
    "online-randevu"
  ]

  const knownEnSlugs = [
    "about",
    "contact",
    "articles",
    "practice-areas",
    "appointment"
  ]

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

/* -------------------------------------------------------------------------- */
/* ADMIN AUTH                                                                 */
/* -------------------------------------------------------------------------- */

async function handleAdminAuth(request: NextRequest, pathname: string) {

  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next()
  }

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

  return NextResponse.next()
}

/* -------------------------------------------------------------------------- */

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}