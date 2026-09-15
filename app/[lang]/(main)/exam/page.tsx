import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import ExamSection from "@/app/components/applications/ExamSection";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.examPage.metaTitle,
    description: dictionary.examPage.metaDescription,
  };
}

// Not linked from nav/footer, same as Khales-next - a standalone assessment
// URL shared directly with candidates alongside the /applications survey.
export default async function ExamPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex-1 bg-[#f7f7f7]">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <div className="pt-32 pb-10 px-6 md:px-16 text-center">
        <h1 className="font-semibold tracking-tight text-2xl md:text-4xl mb-3">
          {dictionary.examPage.title}
        </h1>
        <p className="text-neutral-500 max-w-xl mx-auto">{dictionary.examPage.subtitle}</p>
      </div>
      <ExamSection lang={lang} content={dictionary.examPage} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
