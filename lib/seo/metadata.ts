import type { Metadata } from "next";
import type { Locale } from "@/i18n-config";

export const SITE_URL = "https://www.khales.ae";
export const SITE_NAME = "Khales";

type GeneratePageMetadataArgs = {
  title: string;
  description: string;
  keywords?: string[];
  lang: Locale;
  /** Path without the language segment, e.g. "/about" */
  path: string;
  /** Absolute image URL for OpenGraph/Twitter cards */
  imageUrl?: string;
};

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  lang,
  path,
  imageUrl = `${SITE_URL}/logo-mark.png`,
}: GeneratePageMetadataArgs): Metadata {
  const pageUrl = `${SITE_URL}/${lang}${path}`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      "Khales",
      "Khales Dubai",
      "architecture Dubai",
      "interior design Dubai",
      "engineering consultancy UAE",
      "project management UAE",
      ...keywords,
    ],
    authors: [{ name: "Khales Team", url: SITE_URL }],
    creator: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        "x-default": `/en${path}`,
        "en-US": `/en${path}`,
        "ar-AE": `/ar${path}`,
      },
    },
  };
}
