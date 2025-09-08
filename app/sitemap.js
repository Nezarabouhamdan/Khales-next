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

  // --- 3. Generate static route entries for each language ---
  const staticEntries = staticPaths.flatMap((path) => {
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      // 'alternates' tells Google about the other language versions of THIS page
      alternates: {
        languages: {
          en: `${baseUrl}/en${path === "/" ? "" : path}`,
          ar: `${baseUrl}/ar${path === "/" ? "" : path}`,
        },
      },
    }));
  });

  // --- 4. Generate dynamic route entries (IMPORTANT - YOU MUST DO THIS) ---

  // Example for projects:
  // const projects = await getAllProjects(); // Replace with your actual data fetching
  // const projectEntries = projects.flatMap((project) => {
  //   return locales.map((locale) => ({
  //     url: `${baseUrl}/${locale}/projects/${project.slug}`, // e.g., /en/projects/the-royal-villa
  //     lastModified: new Date(project.updatedAt),
  //     alternates: {
  //       languages: {
  //         en: `${baseUrl}/en/projects/${project.slug}`,
  //         ar: `${baseUrl}/ar/projects/${project.slug}`,
  //       },
  //     },
  //   }));
  // });

  // Example for blogs:
  // const blogs = await getAllBlogs(); // Replace with your actual data fetching
  // const blogEntries = blogs.flatMap((blog) => {
  //   return locales.map((locale) => ({
  //     url: `${baseUrl}/${locale}/blog/${blog.slug}`, // e.g., /en/blog/modern-trends
  //     lastModified: new Date(blog.updatedAt),
  //     alternates: {
  //       languages: {
  //         en: `${baseUrl}/en/blog/${blog.slug}`,
  //         ar: `${baseUrl}/ar/blog/${blog.slug}`,
  //       },
  //     },
  //   }));
  // });

  // --- 5. Combine and return all entries ---
  // return [...staticEntries, ...projectEntries, ...blogEntries];
  return staticEntries; // For now, returns only the static pages.
}
