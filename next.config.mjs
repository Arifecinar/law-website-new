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
}

export default nextConfig
