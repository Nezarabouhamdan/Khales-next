import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server accept requests when it's reached from another
  // device on the LAN instead of localhost (e.g. testing on a phone/tablet).
  allowedDevOrigins: ["10.255.254.12"],
  // Three.js's WebGLRenderer isn't idempotent across the dev-only
  // mount->cleanup->remount cycle Strict Mode does (see WorldwideSection's
  // canvas globe) - the immediate remount can grab a still-lost WebGL
  // context and crash. Disabling it avoids that render-only correctness
  // issue; it doesn't change anything about production behavior.
  reactStrictMode: false,
  // The legacy (booking/checkout/customize-package/ready-designs/tender/
  // privacy-policy/terms/thankyou) routes carried over from Khales-next
  // still use styled-components - the SSR compiler transform needs to
  // stay on for them. (ESLint is no longer configurable from
  // next.config.ts in this Next.js version; `next build` doesn't run it.)
  compiler: {
    styledComponents: true,
  },
  images: {
    // Most of the site's photography is hosted on i.ibb.co, a free image
    // host rather than a real CDN - the *first* optimized fetch of any
    // given image+size combination routinely takes 2-4s (measured), since
    // Next has to pull the original from there before it can cache the
    // resized/re-encoded result. A long TTL means that slow fetch happens
    // once per size variant instead of repeatedly.
    minimumCacheTTL: 2678400, // 31 days
    domains: [
      "imgpanda.com",
      "upload.wikimedia.org",
      "gulfvisiongov.com",
      "www.tsilimited.com",
      "images.pexels.com",
      "cdn.builder.io",
      "s3.us-west-2.amazonaws.com",
      "placehold.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.ab-sl.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
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
