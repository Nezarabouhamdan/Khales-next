// In: lib/metadata.js

// This function generates the rich, full metadata object for any given page.
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  lang,
  alternatesUrl, // This should be the path without language, e.g., '/Commercial'
}) {
  const baseUrl = "https://www.khales.ae";

  // FIX: The Open Graph URL should also be language-specific.
  const pageUrl = `${baseUrl}/${lang}${alternatesUrl}`;

  return {
    title: title,
    description: description,
    keywords: [
      "project management",
      "project management company",
      "top 10 project management companies",
      "top project management companies",
      "Khales Dubai",
      "architecture Dubai",
      "interior design Dubai",
      "engineering consultancy UAE",
      ...keywords,
    ],
    authors: [{ name: "Khales Team", url: baseUrl }],
    creator: "Khales",
    metadataBase: new URL(baseUrl),

    openGraph: {
      title: title,
      description: description,
      url: pageUrl, // Use the full, language-specific URL
      siteName: "Khales",
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/assets/Khales Logo K - favicon.png`,
          width: 1200,
          height: 630,
          alt: "Khales - Project Management",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${baseUrl}/assets/Khales Logo K - favicon.png`],
    },

    // =================================================================
    // THE FULLY REFINED AND CORRECTED ALTERNATES OBJECT
    // =================================================================
    alternates: {
      // This is correct: The canonical URL is the full, language-specific URL.
      canonical: `/${lang}${alternatesUrl}`,

      // REFINEMENT: Use specific language-region codes and add 'x-default'.
      languages: {
        "x-default": `/en${alternatesUrl}`, // Set English as the default fallback
        "en-US": `/en${alternatesUrl}`, // Specific code for English
        "ar-AE": `/ar${alternatesUrl}`, // Specific code for Arabic (UAE)
      },
    },
  };
}
