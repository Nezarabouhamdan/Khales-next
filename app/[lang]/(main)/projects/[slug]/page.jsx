// app/[lang]/projects/[slug]/page.js

import React from "react";
import { notFound } from "next/navigation";

// Ensure this path is correct
import {
  projectsData,
  findProjectBySlug,
} from "@/components/Property Page/ProjectData";

// Import the UI component
import PropertyPage from "@/components/Property Page/PropertyPage";

// This function tells Next.js which pages to generate at build time
export async function generateStaticParams() {
  try {
    if (!Array.isArray(projectsData)) {
      console.error(
        "generateStaticParams Error: projectsData is not an array."
      );
      return [];
    }

    const allPaths = projectsData.flatMap((project) => {
      // Ensure project and slug exist before creating paths
      if (project && project.slug) {
        return [
          { lang: "en", slug: project.slug },
          { lang: "ar", slug: project.slug },
        ];
      }
      return [];
    });

    return allPaths;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// This function generates the metadata for the page <head>
export async function generateMetadata({ params }) {
  try {
    // --- DEBUGGING ---
    console.log("[generateMetadata] Received params:", params);

    if (!params || !params.slug || !params.lang) {
      console.error(
        "[generateMetadata] Error: Params object is incomplete.",
        params
      );
      return { title: "Invalid Project" };
    }

    const { slug, lang } = params;
    const project = findProjectBySlug(slug);

    // --- DEBUGGING ---
    console.log(
      `[generateMetadata] Found project for slug "${slug}":`,
      project ? "Yes" : "No"
    );

    // ===================== THE MOST IMPORTANT FIX IS HERE =====================
    // If no project is found, return a default title immediately to prevent any crash.
    if (!project) {
      return {
        title: "Project Not Found",
        description: "The project you are looking for does not exist.",
      };
    }
    // ========================================================================

    // Gracefully select the language data, falling back to English, then to an empty object
    const projectData = project[lang] || project.en || {};

    // --- DEBUGGING ---
    console.log(
      `[generateMetadata] Using language data for "${lang}". Title:`,
      projectData.title
    );

    // Final check to prevent crash if title is still missing for some reason
    if (!projectData.title) {
      console.error(
        `[generateMetadata] Error: Title is missing for lang "${lang}" in project:`,
        project.slug
      );
      return { title: "Project Details | Khales Group" };
    }

    return {
      title: `${projectData.title} | Khales Group`,
      description:
        projectData.description || "Details for our exclusive project.",
    };
  } catch (error) {
    console.error("[generateMetadata] A critical error occurred:", error);
    return {
      title: "Server Error",
      description: "Could not load page details due to a server error.",
    };
  }
}

// This is the main server component for the page
export default async function Page({ params }) {
  const { slug, lang } = params;
  const project = findProjectBySlug(slug);

  // If the project is not found, Next.js will render the 404 page
  if (!project) {
    notFound();
  }

  return (
    <main>
      <PropertyPage project={project} lang={lang} />
    </main>
  );
}
