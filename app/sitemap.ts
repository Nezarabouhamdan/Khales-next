import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blogs";
import { SITE_URL } from "@/lib/seo/metadata";

const staticPaths = [
  "",
  "/about",
  "/projects",
  "/contact",
  "/calculator",
  "/blog",
  "/media-center",
  "/applications",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = i18n.locales;

  const staticEntries: MetadataRoute.Sitemap = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/projects/${project.slug}`]),
        ),
      },
    })),
  );

  const blogEntries: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/blog/${post.slug}`])),
      },
    })),
  );

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
