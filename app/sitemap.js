// app/sitemap.js

import { projectsData } from "@/components/Property Page/ProjectData";
import { getDictionary } from "@/get-dictionary";

export default async function sitemap() {
  const baseUrl = "https://www.khales.ae";
  const locales = ["en", "ar"];

  // --- Static Pages (Only essential corrections made) ---
  const staticPaths = [
    "/",
    "/About-Us",
    "/projects",
    "/Contact",
    "/services/EngineeringConsultancy",
    "/blog", // CORRECTED: Was "/Blogs", now matches your dynamic post URLs.
    "/booking",
    "/Luxury-Villas",
    "/Residential",
    "/media-center",
    "/Calc", // Your new calculator page

    "/Commercial",
    "/privacy-policy",
    "/terms-and-conditions",
    "/services/InteriorDesign",
    "/services/EngineeringDesign",
    "/services/ProjectManagement",
    "/services/EngineeringConsultancy",
    "/services/EngineeringSupervision",
    "/services/development-planning",
    "/services/LandscapingDesign",
    "/services/Projectfeasability",
    "/services/ProjectManager",
  ];

  // The rest of your file remains exactly the same as it was correct.
  const staticEntries = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en${path === "/" ? "" : path}`,
          ar: `${baseUrl}/ar${path === "/" ? "" : path}`,
        },
      },
    }))
  );

  const projectEntries = projectsData.flatMap((project) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects/${project.slug}`,
          ar: `${baseUrl}/ar/projects/${project.slug}`,
        },
      },
    }))
  );

  const enDictionary = await getDictionary("en");
  const blogPosts = enDictionary?.blogsPage?.posts || [];

  const blogEntries = blogPosts.flatMap((blog) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${blog.slug}`,
      lastModified: new Date(blog.date),
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${blog.slug}`,
          ar: `${baseUrl}/ar/blog/${blog.slug}`,
        },
      },
    }))
  );

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
