import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import BlogArticleView from "@/app/components/blog/BlogArticleView";
import { getDictionary } from "@/lib/get-dictionary";
import { SITE_URL } from "@/lib/seo/metadata";
import { blogPosts, getBlogPostBySlug, getAdjacentBlogPost } from "@/data/blogs";
import type { Locale } from "@/i18n-config";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article | Khales" };

  const title = `${post.title[lang]} | Khales`;
  const description = post.excerpt[lang];

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog/${slug}`,
      images: [{ url: post.cover, width: 1200, height: 630 }],
      type: "article",
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const next = getAdjacentBlogPost(slug)!;
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <BlogArticleView lang={lang} content={dictionary.blogsPage} post={post} next={next} />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
