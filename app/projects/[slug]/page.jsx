// app/projects/[slug]/page.jsx
"use client";

import React from "react";
import PropertyPage from "@/components/Property Page/PropertyPage"; // Your detail page component
import { findProjectBySlug } from "@/components/Property Page/FeaturedProjects";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer New/Footer";

const ProjectDetailPage = async ({ params }) => {
  const { slug } = params;

  // Find the complete project data (including both languages) using the slug
  const project = findProjectBySlug(slug);

  if (!project) {
    return <div>Project not found. Please go back to the homepage.</div>;
  }

  // Render your detail page and pass the found project data to it
  return (
    <>
      <Navbar />
      <PropertyPage project={project} />
      <Footer />
    </>
  );
};

export default ProjectDetailPage;
