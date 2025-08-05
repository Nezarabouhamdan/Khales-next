// lib/metadata.js

// This function generates the rich, full metadata object for any given page.
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  lang,
  alternatesUrl,
}) {
  const baseUrl = "https://www.khales.ae";
  const fullUrl = `${baseUrl}${alternatesUrl}`;

  return {
    title: title,
    description: description,
    keywords: [
      // Add default keywords that apply to all pages
      "Khales Dubai",
      "architecture Dubai",
      "interior design Dubai",
      "engineering consultancy UAE",
      // Add page-specific keywords
      ...keywords,
    ],
    authors: [{ name: "Khales Team", url: baseUrl }],
    creator: "Khales",
    metadataBase: new URL(baseUrl),

    openGraph: {
      title: title,
      description: description,
      url: fullUrl,
      siteName: "Khales",
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/assets/Khales-Logo.png`, // Use a full path
          width: 1200,
          height: 630,
          alt: "Khales - Architecture & Interior Design Dubai",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${baseUrl}/assets/Khales-Logo.png`], // Use a full path
    },

    alternates: {
      canonical: `/${lang}${alternatesUrl}`,
      languages: {
        en: `/en${alternatesUrl}`,
        ar: `/ar${alternatesUrl}`,
      },
    },
  };
}
