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

  // Trailing slash tutarlılığı için
  trailingSlash: false,

  async redirects() {
    return [
      // www → non-www (301 kalıcı yönlendirme)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.taslawfirm.com.tr',
          },
        ],
        destination: 'https://taslawfirm.com.tr/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        // Tüm sayfalara güvenlik ve SEO headerları
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
