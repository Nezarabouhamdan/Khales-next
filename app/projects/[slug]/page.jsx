// Corrected app/projects/[slug]/page.jsx
// THIS IS A SERVER COMPONENT. NO "use client".

import React from "react";
import { notFound } from "next/navigation";

// Import from the new, neutral data file in the /lib folder
import { findProjectBySlug } from "@/components/Property Page/ProjectData";

// Import layout and UI components
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer New/Footer";
import PropertyPage from "@/components/Property Page/PropertyPage";

export async function generateMetadata({ params: rawParams }) {
  // Await the params object to resolve it before accessing its properties.
  const params = await rawParams;
  const project = findProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project Not Found" };
  }
  const projectData = project.eng;
  return {
    title: `${projectData.title} | Khales Group`,
    description: projectData.description,
  };
}

// Default export is the Page component itself
export default async function Page({ params: rawParams }) {
  // --- FIX ---
  // Await the params object here as well, with the correct spelling.
  const params = await rawParams; // Corrected typo from 'rawPams' to 'rawParams'
  const { slug } = params;
  const project = findProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <PropertyPage project={project} />
      </main>
      <Footer />
    </>
  );
}
