// /app/[lang]/(main)/media-center/page.js

import { getDictionary } from "@/get-dictionary";
import MediaCenterPageClient from "./MediaCenterPageClient"; // Import the client component

// This is the main server component for the page
export default async function MediaCenterPage({ params: { lang } }) {
  // 1. Fetch the dictionary based on the language
  const dict = await getDictionary(lang);
  const content = dict.mediaCenterPage;

  // Safety check in case content isn't found
  if (!content) {
    return null;
  }

  // 2. Render the client component and pass the content and lang as props
  return <MediaCenterPageClient lang={lang} content={content} />;
}
