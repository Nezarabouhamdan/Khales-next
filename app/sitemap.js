export default async function sitemap() {
  const baseUrl = "https://www.khales.ae";

  const routes = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/contact",
    "/interior-design",
    "/architecture",
    "/project-management",
    "/engineering-consultancy",
    "/development-planning",
    "/landscape-design",
    "/blogs",
    "/booking",
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
