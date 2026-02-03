import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import PrivacyPolicyClientPage from "@/pages/PrivacyPolicyClientPage";

// Generate dynamic metadata for the privacy policy page
export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);
  const pageData = dictionary.privacyPolicyPage;

  return generatePageMetadata({
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    keywords: pageData.metaKeywords,
    lang: lang,
    alternatesUrl: "/privacy-policy",
  });
}

// Main server component for the page
export default async function PrivacyPolicyPage(props) {
  const { params } = props;
  const { lang } = params || {};
  const dictionary = await getDictionary(lang);

  return (
    <PrivacyPolicyClientPage
      lang={lang}
      content={dictionary.privacyPolicyPage}
    />
  );
}
