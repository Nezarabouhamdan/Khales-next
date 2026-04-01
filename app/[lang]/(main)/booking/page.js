import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata"; // Your metadata utility
import BookingPageClient from "@/pages/BookingPage";

// Helper component to render JSON-LD schema
const JsonLdSchema = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

// 1. Generate dynamic, translated metadata for this page
export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.bookingPage;

  return generatePageMetadata({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords,
    lang: lang,
    alternatesUrl: "/booking",
  });
}

// 2. This is the main server component for the booking route
export default async function BookingPage(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.bookingPage;
  const baseUrl = "https://www.khales.ae";
  const fullUrl = `${baseUrl}/${lang}/booking`;

  // Define comprehensive Schema.org markup
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageData.schemaName,
    description: pageData.metaDescription,
    url: fullUrl,
    inLanguage: lang === "ar" ? "ar-AE" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      url: baseUrl,
      name: "Khales Group",
    },
  };

  const bookActionSchema = {
    "@context": "https://schema.org",
    "@type": "BookAction",
    name: pageData.title,
    target: {
      "@type": "EntryPoint",
      urlTemplate: fullUrl,
      inLanguage: lang === "ar" ? "ar-AE" : "en-US",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/IOSPlatform",
        "http://schema.org/AndroidPlatform",
      ],
    },
    agent: {
      "@type": "Organization",
      name: "Khales Group",
      url: baseUrl,
    },
  };

  return (
    <>
      {/* Inject schema into the head of the page */}
      <JsonLdSchema data={webPageSchema} />
      <JsonLdSchema data={bookActionSchema} />

      {/* Render the client component, passing down the necessary data */}
      <BookingPageClient lang={lang} content={pageData} />
    </>
  );
}
