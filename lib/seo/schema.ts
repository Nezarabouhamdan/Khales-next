import type { Locale } from "@/i18n-config";
import { SITE_URL } from "./metadata";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Khales Group",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-mark.png`,
    description: "Premier architecture, interior design, and project management company in Dubai, UAE",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AE",
      addressRegion: "Dubai",
      addressLocality: "Dubai",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971551299880",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
  };
}

export function getWebsiteSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: lang === "ar" ? "مجموعة خالص" : "Khales Group",
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang === "ar" ? "ar-AE" : "en-US",
  };
}

export function getBreadcrumbSchema(
  lang: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${lang}${item.path}`,
    })),
  };
}

export function getAboutPageSchema(lang: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name,
    description,
    url: `${SITE_URL}/${lang}/about`,
    mainEntity: getOrganizationSchema(),
  };
}

export function getWebPageSchema(lang: Locale, path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE_URL}/${lang}${path}`,
    inLanguage: lang === "ar" ? "ar-AE" : "en-US",
  };
}

export function getWebApplicationSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
  };
}
