import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import ServiceDetailView from "@/app/components/services/ServiceDetailView";
import { getAdjacentServices, getServiceBySlug, localizeService, services } from "@/data/services";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service | Khales" };

  const localized = localizeService(service, lang);
  return {
    title: localized.metaTitle,
    description: localized.metaDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const { next } = getAdjacentServices(slug);
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <ServiceDetailView
        lang={lang}
        content={dictionary.servicesPage.detail}
        service={localizeService(service, lang)}
        next={localizeService(next!, lang)}
      />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
