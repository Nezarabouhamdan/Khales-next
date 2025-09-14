// app/sitemap.js

// app/sitemap.js

// 1. Import your data sources DIRECTLY
// ===================================
import { projectsData } from "@/components/Property Page/ProjectData";
import { getDictionary } from "@/get-dictionary";

// ===================================
// 2. MAIN SITEMAP FUNCTION
// ===================================
export default async function sitemap() {
  const baseUrl = "https://www.khales.ae";
  const locales = ["en", "ar"];

  // --- Static Pages (This part is correct) ---
  const staticPaths = [
    "/", // Homepage
    "/About-Us",
    "/services",
    "/projects",
    "/Contact",
    "/EngineeringConsultancy",
    "/blog", // The main blogs page
    "/booking",
    "/Luxury-Villas",
    "/Residential",
    "/Commercial",
    "/privacy-policy", // Added based on your screenshot
    "/terms-and-conditions", // Added based on your screenshot
    "/services/InteriorDesign",
    "/services/EngineeringDesign", // This was also likely a service
    "/services/ProjectManagement",
    "/services/EngineeringConsultancy",
    "/services/EngineeringSupervision",
    "/services/development-planning",
    "/services/LandscapingDesign",
    "/services/Projectfeasability",
    "/services/ProjectManager",
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
