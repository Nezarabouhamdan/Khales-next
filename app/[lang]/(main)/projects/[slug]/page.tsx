import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import ProjectDetailView from "@/app/components/projects/ProjectDetailView";
import { getAdjacentProjects, getProjectBySlug, localizeProject, projects } from "@/data/projects";
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n-config";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project | Khales" };

  const localized = localizeProject(project, lang);
  return {
    title: `${localized.title} | Khales`,
    description: localized.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { next } = getAdjacentProjects(slug);
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex-1">
      <SiteHeader lang={lang} navigation={dictionary.navigation} />
      <ProjectDetailView
        lang={lang}
        content={dictionary.projectsPage.detail}
        project={localizeProject(project, lang)}
        next={localizeProject(next!, lang)}
      />
      <SiteFooter lang={lang} content={dictionary.footer} />
    </main>
  );
}
