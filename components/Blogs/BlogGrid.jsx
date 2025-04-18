import React from "react";
import styled from "styled-components";
import BlogCard from "./BlogCard";
import { useLanguage } from "../../Context/Languagecontext";

const BlogGrid = ({ cardsData }) => {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <GridContainer dir={isRTL ? "rtl" : "ltr"}>
      {cardsData.map((cardData, index) => (
        <BlogCard key={index} data={cardData} />
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.section`
  display: grid;
  margin: 15vh auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 80%;
  place-items: center;
  gap: 2rem;
  gap: 30px;
  padding: 0 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 8vh auto;
  }
`;

export default BlogGrid;
