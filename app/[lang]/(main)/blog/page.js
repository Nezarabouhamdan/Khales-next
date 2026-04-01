import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import BlogsPageClient from "@/pages/BlogsPage";

// THE FIX IS HERE: Define the helper component before using it.
const JsonLdSchema = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.blogsPage;
  return generatePageMetadata({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords,
    lang: lang,
    alternatesUrl: "/blog", // Corrected to singular
  });
}

export default async function BlogsListPage(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.blogsPage;
  const ctaData = dictionary.cta;
  const baseUrl = "https://www.khales.ae";

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
      }, // Corrected to singular
    ],
  };

  return (
    <>
      <JsonLdSchema data={breadcrumbSchema} />
      <BlogsPageClient
        lang={lang}
        posts={pageData.posts}
        ctaSectionContent={ctaData}
      />
    </>
  );
}
