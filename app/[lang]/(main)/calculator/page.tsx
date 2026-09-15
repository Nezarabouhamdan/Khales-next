import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CalculatorClient from "@/app/components/calculator/CalculatorClient";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getWebApplicationSchema } from "@/lib/seo/schema";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { calcPage } = dictionary;

  return generatePageMetadata({
    title: calcPage.metaTitle,
    description: calcPage.metaDescription,
    keywords: calcPage.metaKeywords,
    lang,
    path: "/calculator",
  });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { calcPage } = dictionary;

  const schema = getWebApplicationSchema(calcPage.schemaName, calcPage.schemaDescription);

  return (
    <main className="flex-1 bg-[#f7f7f7] text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <SiteHeader lang={lang} navigation={dictionary.navigation} />

      <div className="px-6 md:px-16 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
            {calcPage.title}
          </p>
          <h1 className="font-semibold tracking-tight leading-[1.05] text-[clamp(2rem,4vw,3.25rem)]">
            {calcPage.title}
          </h1>
          <p className="mt-4 text-neutral-500 leading-relaxed">{calcPage.subtitle}</p>
        </div>

        <CalculatorClient lang={lang} dictionary={dictionary.calculator} />
      </div>

      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
