import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ComingSoon from "@/components/ComingSoon";

// Generate dynamic metadata for the page
export async function generateMetadata(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);
  const pageData = dictionary.comingSoonPage;

  return generatePageMetadata({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    lang: lang,
    alternatesUrl: "/terms-and-conditions", // Make sure this matches the route folder name
  });
}

// Main server component for the page
export default async function CareersPage(props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return <ComingSoon lang={lang} content={dictionary.comingSoonPage} />;
}
