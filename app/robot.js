export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"],
    },
    sitemap: "https://www.khales.ae/sitemap.xml",
    host: "https://www.khales.ae",
  };
}
