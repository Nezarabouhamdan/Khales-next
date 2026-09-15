import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import CTAHeroSection from "@/app/components/CTAHeroSection";
import BlogHeroSection from "@/app/components/blog/BlogHeroSection";
import BlogGridSection from "@/app/components/blog/BlogGridSection";
import { getDictionary } from "@/lib/get-dictionary";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { blogPosts } from "@/data/blogs";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const { blogsPage } = dictionary;

  return generatePageMetadata({
    title: blogsPage.metaTitle,
    description: blogsPage.metaDescription,
    keywords: blogsPage.metaKeywords,
    lang,
    path: "/blog",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const featured = blogPosts.slice(0, 3);

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <BlogHeroSection lang={lang} content={dictionary.blogsPage} featured={featured} />
      <BlogGridSection lang={lang} content={dictionary.blogsPage} posts={blogPosts} />
      <CTAHeroSection lang={lang} content={dictionary.shared.cta} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
