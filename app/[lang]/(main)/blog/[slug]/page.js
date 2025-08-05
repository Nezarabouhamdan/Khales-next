import { getDictionary } from "@/get-dictionary";
import { notFound } from "next/navigation";
import BlogSinglePage from "@/components/Blogspage/BlogSinglePage";

// Helper function to safely parse dates.
// It will return a valid Date object or null if the format is invalid.
const safeParseDate = (dateString) => {
  const date = new Date(dateString);
  // Check if the date is valid. `new Date('invalid string')` returns an invalid date.
  // `getTime()` on an invalid date returns NaN.
  return isNaN(date.getTime()) ? null : date;
};

const JsonLdSchema = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export async function generateStaticParams() {
  const enDictionary = await getDictionary("en");
  if (!enDictionary?.blogsPage?.posts) return [];
  return enDictionary.blogsPage.posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: { lang, slug } }) {
  const dictionary = await getDictionary(lang);
  const post = dictionary.blogsPage?.posts.find((p) => p.slug === slug);

  if (!post) return { title: "Blog Post Not Found" };

  const baseUrl = "https://www.khales.ae";

  // THE FIX: Safely parse the date.
  const publishedDate = safeParseDate(post.date);

  const openGraph = {
    title: post.postMeta.title,
    description: post.postMeta.description,
    url: `/${lang}/blog/${slug}`,
    type: "article",
    images: [
      {
        url: `${baseUrl}${post.coverImage}`,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
    authors: [post.authorName],
  };

  // Only add the publishedTime if the date was valid
  if (publishedDate) {
    openGraph.publishedTime = publishedDate.toISOString();
  }

  return {
    title: post.postMeta.title,
    description: post.postMeta.description,
    keywords: post.postMeta.keywords,
    metadataBase: new URL(baseUrl),
    openGraph: openGraph, // Use the dynamically created openGraph object
    twitter: {
      card: "summary_large_image",
      title: post.postMeta.title,
      description: post.postMeta.description,
      images: [`${baseUrl}${post.coverImage}`],
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: { "en-US": `/en/blog/${slug}`, "ar-AE": `/ar/blog/${slug}` },
    },
  };
}

export default async function SingleBlogPage({ params: { lang, slug } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.blogsPage;
  const post = pageData?.posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/blog/${slug}`;

  // THE FIX: Safely parse the date here as well.
  const publishedDate = safeParseDate(post.date);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${baseUrl}${post.coverImage}`,
    author: { "@type": "Person", name: post.authorName },
    publisher: {
      "@type": "Organization",
      name: "Khales Group",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/Khales-Logo.png`,
      },
    },
    url: pageUrl,
    mainEntityOfPage: pageUrl,
  };

  // Only add datePublished and dateModified to the schema if the date was valid
  if (publishedDate) {
    blogSchema.datePublished = publishedDate.toISOString();
    blogSchema.dateModified = publishedDate.toISOString();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: pageData.breadcrumbHome,
        item: `${baseUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageData.breadcrumbBlogs,
        item: `${baseUrl}/${lang}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLdSchema data={blogSchema} />
      <JsonLdSchema data={breadcrumbSchema} />
      <BlogSinglePage
        blogData={post}
        lang={lang}
        followUsText={pageData.followUs}
      />
    </>
  );
}
