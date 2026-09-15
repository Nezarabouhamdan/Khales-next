import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import ContactSplitSection from "@/app/components/contact/ContactSplitSection";
import ContactTestimonialsSection from "@/app/components/contact/ContactTestimonialsSection";
import ContactBeforeAfterSection from "@/app/components/contact/ContactBeforeAfterSection";
import ContactLocationsSection from "@/app/components/contact/ContactLocationsSection";
import ContactOrbitSection from "@/app/components/contact/ContactOrbitSection";
import ContactFAQSection from "@/app/components/contact/ContactFAQSection";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "تواصل معنا | خالص" : "Contact | Khales",
    description:
      lang === "ar"
        ? "تواصل مع خالص لمناقشة مشروعك المعماري أو التصميم الداخلي القادم."
        : "Get in touch with Khales to discuss your next architecture or interior design project.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <ContactSplitSection lang={lang} content={dictionary.contactPage.split} />
      <ContactTestimonialsSection lang={lang} content={dictionary.contactPage.testimonials} />
      <ContactBeforeAfterSection lang={lang} content={dictionary.contactPage.beforeAfter} />
      <ContactLocationsSection lang={lang} content={dictionary.contactPage.locations} />
      <ContactOrbitSection lang={lang} content={dictionary.contactPage.orbit} />
      <ContactFAQSection lang={lang} content={dictionary.contactPage.faq} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
