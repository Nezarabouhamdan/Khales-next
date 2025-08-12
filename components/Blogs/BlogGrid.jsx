"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const BlogGrid = ({ cardsData, lang }) => {
  const isRTL = lang === "ar";

  // If cardsData is not available, return null to prevent errors
  if (!cardsData) {
    return null;
  }

  return (
    <GridContainer dir={isRTL ? "rtl" : "ltr"}>
      {cardsData.map((cardData) => (
        <StyledLink
          key={cardData.id}
          href={`/${lang}/blog/${cardData.slug}`}
          legacyBehavior={false}
        >
          <CardContainer>
            <ImageWrapper>
              <Image
                src={cardData.coverImage}
                alt={cardData.title}
                layout="fill"
                objectFit="cover"
              />
            </ImageWrapper>
            <Content>
              <Title>{cardData.title}</Title>
              <Description>{cardData.description}</Description>
              <CardFooter>
                <Author>
                  <AuthorImage
                    src={cardData.authorImage}
                    // This alt text now correctly uses the department name
                    alt={cardData.authorName}
                    width={32}
                    height={32}
                  />
                  {/* This line now correctly displays the department name */}
                  <AuthorName>{cardData.authorName}</AuthorName>
                </Author>
                <PostDate>{cardData.date}</PostDate>
              </CardFooter>
            </Content>
          </CardContainer>
        </StyledLink>
      ))}
    </GridContainer>
  );
};

// --- Styled Components (No changes needed) ---
const GridContainer = styled.section`
  margin: 15vh auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 80%;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;

  ${StyledLink}:hover & {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${StyledLink}:hover & {
    text-decoration: underline;
    color: #66a109;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;

const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled(Image)`
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const AuthorName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`;

const PostDate = styled.span`
  font-size: 0.9rem;
  color: #777;
`;

export default BlogGrid;
