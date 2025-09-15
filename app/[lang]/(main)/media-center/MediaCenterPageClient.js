// /app/[lang]/(main)/media-center/page.js
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import ReelCard from "@/components/Media/ReelCard";
import FilterControls from "@/components/Media/FilterControls";

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
export default function MediaCenterPageClient({ lang, content }) {
  const [activeCategory, setActiveCategory] = useState(content.categories[0]); // Default to "All" or "الكل"

  // The category KEY for filtering is still in English from the data
  // The category LABEL for display is translated from the dictionary
  const getCategoryKey = (translatedLabel) => {
    const categoryIndex = content.categories.indexOf(translatedLabel);
    const enCategories = [
      "All",
      "Interior Design",
      "Architecture",
      "Construction",
      "Development",
      "Sales",
    ];
    return enCategories[categoryIndex];
  };

  const activeCategoryKey = getCategoryKey(activeCategory);

  const filteredReels =
    activeCategoryKey === "All"
      ? content.reels
      : content.reels.filter((reel) => reel.category === activeCategoryKey);

  return (
    <PageWrapper>
      <div style={{ paddingTop: "5vh" }}></div>

      <HeaderSection>
        <PageTitle>{content.title}</PageTitle>
        <PageSubtitle>{content.subtitle}</PageSubtitle>
      </HeaderSection>

      <FilterControls
        categories={content.categories}
        activeCategory={activeCategory}
        onFilterChange={setActiveCategory}
      />

      <ReelsGrid>
        {filteredReels.map((reel, index) => (
          <ReelCard
            key={index}
            // Pass the correct title based on the language
            title={lang === "ar" && reel.artitle ? reel.artitle : reel.title}
            thumbnailUrl={reel.thumbnailUrl}
            embedUrl={reel.embedUrl}
          />
        ))}
      </ReelsGrid>
    </PageWrapper>
  );
}
