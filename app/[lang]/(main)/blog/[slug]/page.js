import { getDictionary } from "@/get-dictionary";
import { notFound } from "next/navigation";
import Script from "next/script"; // Use the standard Next.js Script component
import BlogSinglePage from "@/components/Blogspage/BlogSinglePage";

const safeParseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// --- NEW SCHEMA FUNCTION (For a single, powerful, interconnected schema) ---
const getBlogPageSchema = (lang, post) => {
  const baseUrl = "https://www.khales.ae";
  const pageUrl = `${baseUrl}/${lang}/blog/${post.slug}`;
  const publishedDate = safeParseDate(post.date);

  // Combine all paragraphs into a single string for articleBody
  const articleBody = post.fullContent.paragraphs.join("\n\n");
  const wordCount = articleBody.split(/\s+/).length;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: post.postMeta.title,
        description: post.postMeta.description,
        isPartOf: { "@id": `${baseUrl}/#website` },
        inLanguage: lang === "ar" ? "ar-AE" : "en-US",
        // This links the WebPage to the main content, the BlogPosting
        mainEntity: {
          "@id": `${pageUrl}/#article`,
        },
        breadcrumb: {
          "@id": `${pageUrl}/#breadcrumb`,
        },
      },
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}/#article`, // Give the article a unique ID
        mainEntityOfPage: pageUrl,
        headline: post.title,
        description: post.description,
        image: {
          "@type": "ImageObject",
          url: `${baseUrl}${post.coverImage}`,
        },
        author: {
          "@type": "Person",
          name: post.authorName,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`, // Link to your main organization schema
          name: "Khales Group",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/assets/Khales-Logo.png`,
          },
        },
        datePublished: publishedDate ? publishedDate.toISOString() : null,
        dateModified: publishedDate ? publishedDate.toISOString() : null,
        // --- ADDED: Provide the full article text and more context ---
        articleBody: articleBody,
        wordCount: wordCount,
        // Use the post's tags to classify the article
        articleSection: post.tags,
        // Use the meta keywords as keywords for the article
        keywords: post.postMeta.keywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: `${baseUrl}/${lang}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
        ],
      },
    ],
  };
};

export async function generateStaticParams() {
  const enDictionary = await getDictionary("en");
  if (!enDictionary?.blogsPage?.posts) return [];
  return enDictionary.blogsPage.posts.map((post) => ({
    slug: post.slug,
  }));
}

// --- METADATA (Refined with article tags for Open Graph) ---
export async function generateMetadata({ params: { lang, slug } }) {
  const dictionary = await getDictionary(lang);
  const post = dictionary.blogsPage?.posts.find((p) => p.slug === slug);

  if (!post) return { title: "Blog Post Not Found" };

  const baseUrl = "https://www.khales.ae";
  const publishedDate = safeParseDate(post.date);

  return {
    title: post.postMeta.title,
    description: post.postMeta.description,
    keywords: post.postMeta.keywords,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: post.postMeta.title,
      description: post.postMeta.description,
      url: `/${lang}/blog/${slug}`,
      type: "article",
      publishedTime: publishedDate ? publishedDate.toISOString() : undefined,
      authors: [post.authorName],
      // --- ADDED: Provide tags for more social context ---
      tags: post.tags,
      images: [
        {
          url: `${baseUrl}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.postMeta.title,
      description: post.postMeta.description,
      images: [`${baseUrl}${post.coverImage}`],
    },
    alternates: {
      canonical: `/blog/${slug}`, // Canonical should be language-agnostic if content is the same
      languages: { "en-US": `/en/blog/${slug}`, "ar-AE": `/ar/blog/${slug}` },
    },
  };
}

// --- PAGE COMPONENT (Updated to use the new single schema) ---
export default async function SingleBlogPage({ params: { lang, slug } }) {
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.blogsPage;
  const post = pageData?.posts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Generate the single, powerful, interconnected schema
  const blogSchema = getBlogPageSchema(lang, post);

  return (
    <>
      {/* Inject the entire schema graph in one script tag */}
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <BlogSinglePage
        blogData={post}
        lang={lang}
        followUsText={pageData.followUs}
      />
    </>
  );
}
