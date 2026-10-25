import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CalculatorClient from "@/app/components/calculator/CalculatorClient";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { getWebApplicationSchema } from "@/lib/seo/schema";
import type { Locale } from "@/i18n-config";
import type { CalculatorDict } from "@/dictionaries/types";
import { COUNTRY_ORDER, type CityId } from "@/data/calculatorMarkets";
import { CALCULATOR_RATES } from "@/lib/calculator/rates";
import { getMarket } from "@/lib/calculator/engine";
import { fillTemplate, formatNumber, formatPeriod } from "@/lib/calculator/format";
import { KHALES_EMAIL, KHALES_WHATSAPP_NUMBER } from "@/lib/calculator/request";
import { FINISH_TIERS } from "@/lib/calculator/types";

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

      <SiteHeader lang={lang} navigation={dictionary.navigation} tone="light" />

      <div className="px-4 sm:px-6 md:px-16 pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Not shown - the calculator's own screens carry the visible
            headings - but kept for search engines and screen readers. */}
        <h1 className="sr-only">{calcPage.title}</h1>

        <CalculatorClient lang={lang} dictionary={dictionary.calculator} />
        <RatesFallback lang={lang} dictionary={dictionary.calculator} />
      </div>

      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}

// Without JavaScript the calculator can't run, so the page still shows the
// published building-only ranges per m² from the same rates file (no number
// for partner-review markets), the disclaimer and how to reach the team.
function RatesFallback({ lang, dictionary }: { lang: Locale; dictionary: CalculatorDict }) {
  const { noscript } = dictionary;
  const cell = "border-t border-neutral-200 px-3 py-3 align-top";
  return (
    <noscript>
      <section className="max-w-4xl mx-auto mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <h2 className="font-semibold tracking-tight text-2xl mb-2">{noscript.title}</h2>
        <p className="text-neutral-500 leading-relaxed mb-6">{noscript.body}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-start">
            <caption className="caption-top text-start text-xs text-neutral-500 pb-3">
              {fillTemplate(noscript.tableCaption, { date: formatPeriod(CALCULATOR_RATES.meta.as_of, lang) })}
            </caption>
            <thead>
              <tr className="text-neutral-500">
                <th scope="col" className="px-3 py-2 text-start font-medium">
                  {noscript.market}
                </th>
                {FINISH_TIERS.map((tier) => (
                  <th key={tier} scope="col" className="px-3 py-2 text-start font-medium">
                    {dictionary.tiers[tier].name} ({noscript.perSqm})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COUNTRY_ORDER.map((country) => {
                const market = getMarket(CALCULATOR_RATES, country);
                const { rates } = market;
                const currency = dictionary.currencies[market.currency];
                const referenceCity = market.reference_city as CityId | null;
                return (
                  <tr key={country}>
                    <th scope="row" className={`${cell} text-start font-semibold`}>
                      {dictionary.countries[country]}
                      {referenceCity && ` (${dictionary.cities[referenceCity]})`}
                      {market.anchor_date && (
                        <span className="block text-xs font-normal text-neutral-400">
                          {formatPeriod(market.anchor_date, lang)}
                        </span>
                      )}
                    </th>
                    {rates ? (
                      FINISH_TIERS.map((tier) => {
                        const band = rates[tier];
                        const tierAnchor = market.tier_anchor_date?.[tier];
                        return (
                          <td key={tier} className={cell}>
                            {formatNumber(band.low)} – {formatNumber(band.high)} {currency}
                            {tierAnchor && (
                              <span className="block text-xs text-neutral-400">{formatPeriod(tierAnchor, lang)}</span>
                            )}
                          </td>
                        );
                      })
                    ) : (
                      <td colSpan={FINISH_TIERS.length} className={`${cell} text-neutral-500`}>
                        {noscript.partnerReview}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-neutral-600">{dictionary.disclaimer}</p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          {noscript.contact}{" "}
          <a className="font-semibold text-[#66a109]" href={`https://wa.me/${KHALES_WHATSAPP_NUMBER}`} dir="ltr">
            +971 55 129 9880
          </a>{" "}
          ·{" "}
          <a className="font-semibold text-[#66a109]" href={`mailto:${KHALES_EMAIL}`}>
            {KHALES_EMAIL}
          </a>
        </p>
      </section>
    </noscript>
  );
}
