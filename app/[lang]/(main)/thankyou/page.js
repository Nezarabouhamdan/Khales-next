import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ThankYouClientPage from "@/components/ThankYouClientPage";

// Generate dynamic metadata for the thank you page
export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.thankYouPage;

  const metadata = generatePageMetadata({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    lang: lang,
    alternatesUrl: "/thankyou",
  });

  // IMPORTANT FOR SEO: Add this to prevent search engines from indexing your thank you page
  metadata.robots = {
    index: false,
    follow: false,
    nocache: true,
  };

  return metadata;
}

// Main server component for the page
export default async function ThankYouPage(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return <ThankYouClientPage lang={lang} content={dictionary.thankYouPage} />;
}
