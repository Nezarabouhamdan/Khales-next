export default async function sitemap() {
  const baseUrl = "https://www.khales.ae";

  const routes = [
    "/",
    "/ABOUTUS",
    "/services",
    "/projects",
    "/Contact",
    "/InteriorDesign",
    "/architecture",
    "/ProjectManagement",
    "/EngineeringConsultancy",
    "/Developmentplanning",
    "/LandscapingDesign",
    "/Blogs",
    "/booking",
    "/Investing",
    "/Projectfeasability",
    "/Landing",
    "/Thank-you",
  ];

  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }));

  // You might want to fetch dynamic routes here if you have them, e.g., for blogs
  // const posts = await getPosts(); // Assuming you have a function to fetch posts
  // const postEntries = posts.map((post) => ({
  //   url: `${baseUrl}/blogs/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return sitemapEntries; // .concat(postEntries) if you have dynamic routes
}
