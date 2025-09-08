// app/sitemap.js

// You will need your functions to get dynamic data
// For example: import { getAllProjects, getAllBlogs } from "@/lib/data";

export default async function sitemap() {
  const baseUrl = "https://www.khales.ae";

  // --- 1. Define your languages ---
  const locales = ["en", "ar"];

  // --- 2. Define your static paths (with exact casing) ---
  const staticPaths = [
    "/", // Homepage
    "/About-Us",
    "/services",
    "/projects",
    "/Contact",
    "/InteriorDesign", // Note: 'services' subpages are often dynamic, but included here as static per your structure
    "/ProjectManagement",
    "/EngineeringConsultancy",
    "/EngineeringSupervision", // Added based on your screenshot
    "/development-planning", // Corrected case from screenshot
    "/LandscapingDesign",
    "/Projectfeasability", // Corrected case from screenshot
    "/Blogs", // The main blogs page
    "/booking",
    "/Luxury-Villas",
    "/Residential",
    "/Commercial",
    "/EngineeringDesign",
    "/Investing", // Custom pages
    "/Projectfeasability",
    "/privacy-policy", // Added based on your screenshot
    "/terms-and-conditions", // Added based on your screenshot
  ];

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

  // --- Dynamic Projects (from your local ProjectData.js file) ---
  const projectEntries = projectsData.flatMap((project) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      // Since your data doesn't have an 'updatedAt', we'll use the current date
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects/${project.slug}`,
          ar: `${baseUrl}/ar/projects/${project.slug}`,
        },
      },
    }))
  );

  // --- Dynamic Blogs (from your dictionary files) ---
  const enDictionary = await getDictionary("en"); // We only need one language to get the slugs
  const blogPosts = enDictionary?.blogsPage?.posts || [];

  const blogEntries = blogPosts.flatMap((blog) =>
    locales.map((locale) => ({
      // Your blog URLs use `/blog/` (singular) based on your folder structure
      url: `${baseUrl}/${locale}/blog/${blog.slug}`,
      lastModified: new Date(blog.date), // Use the date from your blog data
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog/${blog.slug}`,
          ar: `${baseUrl}/ar/blog/${blog.slug}`,
        },
      },
    }))
  );

  // --- Combine everything into one complete sitemap ---
  return [...staticEntries, ...projectEntries, ...blogEntries];
}
