import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import MediaHeroSection from "@/app/components/media/MediaHeroSection";
import MediaGallerySection from "@/app/components/media/MediaGallerySection";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { reels } from "@/data/media";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { mediaCenterPage } = dictionary;

  return generatePageMetadata({
    title: mediaCenterPage.metaTitle,
    description: mediaCenterPage.metaDescription,
    keywords: mediaCenterPage.metaKeywords,
    lang,
    path: "/media-center",
  });
}

export default async function MediaCenterPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const categoryCount = new Set(reels.map((reel) => reel.category)).size;

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <MediaHeroSection
        lang={lang}
        content={dictionary.mediaCenterPage}
        reelCount={reels.length}
        categoryCount={categoryCount}
      />
      <MediaGallerySection lang={lang} content={dictionary.mediaCenterPage} reels={reels} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
