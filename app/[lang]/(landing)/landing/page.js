import { getDictionary } from "@/get-dictionary";
import FullPageLanding from "@/components/landing/FullPageLanding";
import { notFound } from "next/navigation";

// This function is REQUIRED for Next.js to know that 'en' and 'ar' are valid languages for this page.
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

// This function generates the metadata for the page based on the language
export async function generateMetadata({ params: { lang } }) {
  if (lang !== "en" && lang !== "ar") {
    return { title: "Page Not Found" };
  }
  const dictionary = await getDictionary(lang);
  const content = dictionary.landingPage;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.metaKeywords,
    metadataBase: new URL("https://www.khales.ae"),
    alternates: {
      canonical: `/${lang}/landing`,
      languages: {
        "en-US": "/en/landing",
        "ar-AE": "/ar/landing",
      },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `/${lang}/landing`,
      siteName: "Khales Group",
      images: [
        {
          url: "https://i.ibb.co/wFXfpSSW/khales-ae-mansion-in-dubai-ar-21-sref-httpss-mj-runvjvid-32337233-c72f-48c9-9d90-f673870717dd-3.png",
          width: 1200,
          height: 630,
          alt: content.metaTitle,
        },
      ],
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

// This is the main server component for the landing page route
export default async function LandingPage(props) {
  const { params } = props;
  const { lang } = params || {};

  if (lang !== "en" && lang !== "ar") {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  // The page now renders inside the main layout, just like all your other pages.
  return <FullPageLanding lang={lang} content={dictionary.landingPage} />;
}
