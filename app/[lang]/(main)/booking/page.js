import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata"; // Your metadata utility
import { redirect } from "next/navigation";

// 1. Generate dynamic, translated metadata for this page
export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = params || {};
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
  const { params } = props;
  const { lang } = params || {};
  redirect(`/${lang}/Contact`);
}
