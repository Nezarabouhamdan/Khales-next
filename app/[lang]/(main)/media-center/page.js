// /app/[lang]/(main)/media-center/page.js
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import ReelCard from "@/components/Media/ReelCard";
import FilterControls from "@/components/Media/FilterControls";

// --- IN A REAL APP: This data would come from your dictionary or a CMS ---
const reelsData = [
  {
    title: "Smart Material Tips for True Luxury",
    category: "Interior Design",
    thumbnailUrl: "https://i.ytimg.com/vi/cZPaZxKNpUk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/cZPaZxKNpUk",
  },
  {
    title: "Modern Villa Architecture",
    artitle: "بناء فيلا معمارية",
    category: "Architecture",
    thumbnailUrl: "https://i.ytimg.com/vi/cZPaZxKNpUk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/cZPaZxKNpUk",
  },
  {
    title: "Key Points In Any Successful Project",
    category: "Construction",
    thumbnailUrl: "https://i.ytimg.com/vi/c4k6aGyFPqk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/c4k6aGyFPqk",
  },
  {
    title: "Community Development Plan",
    category: "Development",
    thumbnailUrl: "https://i.ytimg.com/vi/cZPaZxKNpUk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/cZPaZxKNpUk",
  },
  {
    title: "Luxury Property Sales Event",
    category: "Sales",
    thumbnailUrl: "https://i.ytimg.com/vi/cZPaZxKNpUk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/cZPaZxKNpUk",
  },
  {
    title: "Concept to Reality: Design Process",
    category: "Design",
    thumbnailUrl: "https://i.ytimg.com/vi/cZPaZxKNpUk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/cZPaZxKNpUk",
  },
  {
    title: "Minimalist Bedroom Concepts",
    category: "Interior Design",
    thumbnailUrl: "https://i.ytimg.com/vi/cZPaZxKNpUk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/cZPaZxKNpUk",
  },
  {
    title: "Sustainable Building Materials",
    category: "Architecture",
    thumbnailUrl: "https://i.ytimg.com/vi/cZPaZxKNpUk/maxresdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/cZPaZxKNpUk",
  },
];
// --- END OF DATA ---

const PageWrapper = styled.main`
  padding: 100px 70px;
  background-color: #ffffff;
  min-height: 100vh;

  @media (max-width: 991px) {
    padding: 60px 20px;
  }
`;

const HeaderSection = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: #777;
  max-width: 600px;
  margin: 0 auto;
`;

const ReelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1450px;
  margin: 0 auto;
`;

export default function MediaCenterPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get a unique list of categories from your data, including 'All'
  const categories = [
    "All",
    ...new Set(reelsData.map((reel) => reel.category)),
  ];

  // Filter reels based on the active category
  const filteredReels =
    activeCategory === "All"
      ? reelsData
      : reelsData.filter((reel) => reel.category === activeCategory);

  return (
    <PageWrapper>
      <div style={{ paddingTop: "5vh" }}></div>

      <HeaderSection>
        <PageTitle>Media Center</PageTitle>
        <PageSubtitle>
          Explore our latest projects, design insights, and construction
          milestones through our curated collection of videos.
        </PageSubtitle>
      </HeaderSection>

      <FilterControls
        categories={categories}
        activeCategory={activeCategory}
        onFilterChange={setActiveCategory}
      />

      <ReelsGrid>
        {filteredReels.map((reel, index) => (
          <ReelCard
            key={index}
            title={reel.title}
            thumbnailUrl={reel.thumbnailUrl}
            embedUrl={reel.embedUrl}
          />
        ))}
      </ReelsGrid>
    </PageWrapper>
  );
}
