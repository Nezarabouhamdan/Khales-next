"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { projects as allProjects, localizeProject, ProjectCategory } from "@/data/projects";
import type { Locale } from "@/i18n-config";
import type { ProjectsIndexDict } from "@/dictionaries/types";

const tabs: Array<ProjectCategory | "ALL"> = [
  "ALL",
  "Luxury_Villas",
  "Residential",
  "Commercial",
  "Interior_Design",
];

type ProjectsIndexSectionProps = {
  lang: Locale;
  content: ProjectsIndexDict;
};

export default function ProjectsIndexSection({ lang, content }: ProjectsIndexSectionProps) {
  const [activeTab, setActiveTab] = useState<ProjectCategory | "ALL">("ALL");
  const dir = lang === "ar" ? "rtl" : "ltr";

  const projects = useMemo(
    () => allProjects.map((p) => localizeProject(p, lang)),
    [lang],
  );

  const filtered = useMemo(
    () =>
      activeTab === "ALL"
        ? projects
        : projects.filter((p) => p.category === activeTab),
    [activeTab, projects],
  );

  const [hovered, setHovered] = useState<string | undefined>(undefined);

  const active =
    filtered.find((p) => p.slug === hovered) ?? filtered[0] ?? projects[0];

  return (
    <section
      dir={dir}
      className="relative w-full bg-[#f7f7f7] text-neutral-900 px-6 md:px-16 pt-32 pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
              {content.eyebrow}
            </p>
            <h1 className="font-semibold tracking-tight text-3xl md:text-4xl">
              {content.title}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs uppercase tracking-widest font-medium px-4 py-2 rounded-full border transition-colors ${
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "border-neutral-300 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900"
                  }`}
                >
                  {content.tabLabels[tab]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {/* Desktop: hover-to-preview index */}
          <div className="hidden md:block">
            {filtered.map((project, i) => (
              <Link
                key={project.slug}
                href={`/${lang}/projects/${project.slug}`}
                onMouseEnter={() => setHovered(project.slug)}
                className="group flex items-baseline justify-between gap-6 py-6 border-b border-neutral-200"
              >
                <div className="flex items-baseline gap-6 min-w-0">
                  <span className="text-xs font-mono text-neutral-400 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-2xl lg:text-3xl font-medium tracking-tight truncate transition-colors ${
                      active.slug === project.slug
                        ? "text-neutral-900"
                        : "text-neutral-300 group-hover:text-neutral-500"
                    }`}
                  >
                    {project.title}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 shrink-0">
                  {project.location} [{project.status}]
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop: sticky crossfading preview */}
          <div className="hidden md:block sticky top-32 self-start h-[520px] relative overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.cover}
                  alt={active.title}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 bg-gradient-to-t from-black/60 to-transparent text-white pointer-events-none">
              <p className="text-xs uppercase tracking-widest">
                {active.categoryLabel} &mdash; {active.size}
              </p>
            </div>
          </div>

          {/* Mobile: stacked cards (no hover available) */}
          <div className="md:hidden flex flex-col gap-12">
            {filtered.map((project) => (
              <Link
                key={project.slug}
                href={`/${lang}/projects/${project.slug}`}
                className="group flex flex-col"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="calc(100vw - 48px)"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="pt-4 flex justify-between items-start">
                  <div>
                    <p className="text-sm text-neutral-400">
                      {project.location}{" "}
                      <span className="opacity-70">[{project.status}]</span>
                    </p>
                    <h3 className="text-lg font-medium tracking-tight underline decoration-1 underline-offset-4 mt-0.5">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-sm text-neutral-400 whitespace-nowrap pl-4">
                    {project.size}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
