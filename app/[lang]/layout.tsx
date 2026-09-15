import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n-config";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title =
    lang === "ar"
      ? "مجموعة خالص | للاستشارات الهندسية وإدارة المشاريع في الإمارات"
      : "Khales Group | Architecture, Interiors & Project Management in UAE";
  const description =
    lang === "ar"
      ? "شركة رائدة في دبي متخصصة في التصميم المعماري، والتصميم الداخلي، وإدارة المشاريع للمباني السكنية والتجارية الفاخرة."
      : "A leading firm in Dubai specializing in architectural design, interior design, and project management for luxury residential and commercial properties.";

  return {
    title: { default: title, template: lang === "ar" ? "%s | مجموعة خالص" : "%s | Khales Group" },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: { "x-default": "/en", "en-US": "/en", "ar-AE": "/ar" },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}`,
      siteName: lang === "ar" ? "مجموعة خالص" : "Khales Group",
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
      images: [{ url: `${SITE_URL}/logo-mark.png`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = (await params) as { lang: Locale };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteSchema(lang)) }}
      />
      {children}
    </>
  );
}
