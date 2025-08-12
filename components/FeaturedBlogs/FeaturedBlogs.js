"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

// NEW: A decorative SVG icon for the header.
const HeaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

// UPDATED: Main section container now holds the background shapes.
const BlogsSection = styled.section`
  padding: 100px 0;
  background-color: #ffffff;
  position: relative; // Needed for positioning the shapes
  overflow: hidden; // Prevents shapes from spilling out
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

// NEW: Soft, amorphous shapes for the background.
const BackgroundShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: #eaf7e0; // A light green color from your site
  filter: blur(80px);
  opacity: 0.6;
  z-index: 0;
`;

const Shape1 = styled(BackgroundShape)`
  width: 300px;
  height: 300px;
  top: 5%;
  left: -100px;
`;

const Shape2 = styled(BackgroundShape)`
  width: 250px;
  height: 250px;
  bottom: 10%;
  right: -80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative; // Ensure content stays above the shapes
  z-index: 1;
`;

// UPDATED: Section header now includes the icon.
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

// NEW: Wrapper for the header icon
const HeaderIconWrapper = styled.div`
  color: #66a109; // Your primary accent color
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 12px; // Apply radius here for the border hover effect
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const PostCard = styled.article`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const PostImage = styled(Image)`
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${PostCardLink}:hover & {
    color: #66a109;
  }
`;

const PostDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled(Image)`
  border-radius: 50%;
  margin-right: 0.75rem;
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

const ViewAllButtonContainer = styled.div`
  text-align: center;
  margin-top: 60px;
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #1a1a1a;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #66a109;
    transform: translateY(-3px);
  }
`;

const FeaturedBlogs = ({ content, lang }) => {
  const featuredPosts = content?.posts?.slice(0, 3) || [];

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <BlogsSection lang={lang}>
      {/* NEW: Background shapes added here */}
      <Shape1 />
      <Shape2 />
      <Container>
        <SectionHeader>
          {/* NEW: Icon added to the header */}
          <HeaderIconWrapper>
            <HeaderIcon />
          </HeaderIconWrapper>
          <SectionTitle>
            {lang === "ar" ? "من مدونتنا" : "From Our Blog"}
          </SectionTitle>
          <SectionSubtitle>
            {lang === "ar"
              ? "استكشف أحدث الأفكار والاتجاهات في الهندسة المعمارية والتصميم."
              : "Explore the latest insights and trends in architecture and design."}
          </SectionSubtitle>
        </SectionHeader>
        <BlogsGrid>
          {featuredPosts.map((post) => (
            <PostCardLink
              key={post.id}
              href={`/${lang}/blog/${post.slug}`}
              legacyBehavior={false}
            >
              <PostCard>
                <ImageWrapper>
                  <PostImage
                    src={post.coverImage}
                    alt={post.title}
                    layout="fill"
                  />
                </ImageWrapper>
                <ContentWrapper>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDescription>{post.description}</PostDescription>
                  <PostFooter>
                    <AuthorInfo>
                      <AuthorImage
                        src={post.authorImage}
                        alt={post.authorName}
                        width={40}
                        height={40}
                      />
                      <AuthorName>{post.authorName}</AuthorName>
                    </AuthorInfo>
                    <PostDate>{post.date}</PostDate>
                  </PostFooter>
                </ContentWrapper>
              </PostCard>
            </PostCardLink>
          ))}
        </BlogsGrid>
        <ViewAllButtonContainer>
          <ViewAllButton href={`/${lang}/blog`}>
            {lang === "ar" ? "عرض جميع المقالات" : "View All Articles"}
          </ViewAllButton>
        </ViewAllButtonContainer>
      </Container>
    </BlogsSection>
  );
};

export default FeaturedBlogs;
