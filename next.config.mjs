/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qgkgamlzeuobewvnbvct.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // Trailing slash tutarlılığı için (SEO)
  trailingSlash: false,

  // ──────────────────────────────────────────────────────────────────────
  // PERMANENT REDIRECTS — Legacy URLs → Language-prefixed URLs
  // These complement the middleware-level redirects.
  // Middleware handles the dynamic cases; these catch build-time patterns.
  // ──────────────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Legacy /articles/:slug → /en/articles/:slug
      {
        source: '/articles/:slug',
        destination: '/en/articles/:slug',
        permanent: true,
      },
      // Legacy /articles → /en/articles
      {
        source: '/articles',
        destination: '/en/articles',
        permanent: true,
      },
      // Legacy /practice-areas/:slug → /en/practice-areas/:slug
      {
        source: '/practice-areas/:slug',
        destination: '/en/practice-areas/:slug',
        permanent: true,
      },
      // Legacy /practice-areas → /en/practice-areas
      {
        source: '/practice-areas',
        destination: '/en/practice-areas',
        permanent: true,
      },
      // Legacy /about → /en/about
      {
        source: '/about',
        destination: '/en/about',
        permanent: true,
      },
      // Legacy /contact → /en/contact
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
      // Legacy /appointment → /en/appointment
      {
        source: '/appointment',
        destination: '/en/appointment',
        permanent: true,
      },
      // Legacy /makaleler → /tr/makaleler
      {
        source: '/makaleler',
        destination: '/tr/makaleler',
        permanent: true,
      },
      // Legacy /makaleler/:slug → /tr/makaleler/:slug
      {
        source: '/makaleler/:slug',
        destination: '/tr/makaleler/:slug',
        permanent: true,
      },
      // Legacy /hakkimizda → /tr/hakkimizda
      {
        source: '/hakkimizda',
        destination: '/tr/hakkimizda',
        permanent: true,
      },
      // Legacy /iletisim → /tr/iletisim
      {
        source: '/iletisim',
        destination: '/tr/iletisim',
        permanent: true,
      },
      // Legacy /calisma-alanlari → /tr/calisma-alanlari
      {
        source: '/calisma-alanlari',
        destination: '/tr/calisma-alanlari',
        permanent: true,
      },
      // Legacy /av-kadir-tas → /tr/av-kadir-tas
      {
        source: '/av-kadir-tas',
        destination: '/tr/av-kadir-tas',
        permanent: true,
      },
      // Legacy /online-randevu → /tr/online-randevu
      {
        source: '/online-randevu',
        destination: '/tr/online-randevu',
        permanent: true,
      },
      // ───────── DEAD URLS (404) ─────────
      // /en/legal-notice → /en (sayfa hiç oluşturulmamış)
      {
        source: '/en/legal-notice',
        destination: '/en',
        permanent: true,
      },
      // Trailing slash varyantları (Google'ın keşfettiği URL'ler)
      {
        source: '/en/legal-notice/',
        destination: '/en',
        permanent: true,
      },
      // Non-www legal-notice variants
      {
        source: '/legal-notice',
        destination: '/en',
        permanent: true,
      },
    ]
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEO HEADERS — Google'ın indexlemesini kolaylaştır
  // ──────────────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Tüm public sayfalar indexlenebilir
        source: '/(tr|en)/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Admin ve API sayfaları indexlenmemeli
        source: '/(admin|api)/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
}

export default nextConfig
