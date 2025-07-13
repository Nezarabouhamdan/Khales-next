/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["framer-motion"],
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: [
      "imgpanda.com",
      "i.ibb.co",
      "upload.wikimedia.org",
      "gulfvisiongov.com",
      "www.tsilimited.com",
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "styled-components"],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  serverRuntimeConfig: {
    // Only available on server side
    odooSecret: process.env.ODOO_PASSWORD,
  },
  publicRuntimeConfig: {
    // Available on both server and client
    appEnv: process.env.NODE_ENV,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
