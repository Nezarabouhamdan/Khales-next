"use client";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image"; // Import the Next.js Image component

const SuccessStory1 = ({ lang, content }) => {
  const {
    department,
    date,
    firstParagraph,
    quoteText,
    thirdParagraph,
    authorName,
    authorTitle,
  } = content;

  const logoUrl = "https://i.ibb.co/jZxqpqmM/Khales-Logo-K-favicon.png";
  const authorImageUrl =
    "https://i.ibb.co/xqCzZv4c/Screenshot-2025-09-07-105436-removebg-preview.png";

  return (
    <MainContainer>
      <ContentWrapper>
        {/* --- LEFT SIDE: Now a perfect match of the screenshot and new structure --- */}
        <TestimonialColumn>
          <ArticleHeader>
            <LogoWrapper>
              {/* Using the real logo image */}
              <Image
                src={logoUrl}
                alt="Khales K Logo"
                layout="fill"
                objectFit="contain"
              />
            </LogoWrapper>
            <AuthorDetails>
              <DepartmentName>{department}</DepartmentName>
              <PostDate>{date}</PostDate>
            </AuthorDetails>
          </ArticleHeader>

          <Divider />

          {/* New text structure is implemented here */}
          <Paragraph>{firstParagraph}</Paragraph>
          <Blockquote>"{quoteText}"</Blockquote>
          <Paragraph>{thirdParagraph}</Paragraph>
        </TestimonialColumn>

        {/* --- RIGHT SIDE: The approved dynamic image/card combo --- */}
        <AuthorColumn>
          <AuthorImage
            src={authorImageUrl}
            alt={`${authorName} - ${authorTitle}`}
          />
          <AuthorCard>
            <AuthorName>{authorName}</AuthorName>
            <AuthorJobTitle>{authorTitle}</AuthorJobTitle>
          </AuthorCard>
        </AuthorColumn>
      </ContentWrapper>
    </MainContainer>
  );
};

// --- STYLED COMPONENTS (Final Version) ---

const MainContainer = styled.section`
  background-color: #ffffff;
  display: flex;
  padding: 100px 70px;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 991px) {
    padding: 60px 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1450px;
  gap: 80px;
  align-items: center;

  @media (max-width: 991px) {
    flex-direction: column-reverse;
    gap: 60px;
  }
`;

// --- LEFT SIDE STYLES ---

const TestimonialColumn = styled.div`
  width: 55%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  align-items: center;
`;

// UPDATED: Now styles an Image component container
const LogoWrapper = styled.div`
  position: relative;
  width: 44px;
  height: 44px;
  margin-right: 16px;
  flex-shrink: 0;
`;

const AuthorDetails = styled.div`
  line-height: 1.4;
`;

const DepartmentName = styled.p`
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
`;

const PostDate = styled.p`
  font-size: 0.9rem;
  color: #777;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #f0f0f0;
  margin: 2rem 0;
`;

const Blockquote = styled.blockquote`
  margin: 2em 0;
  padding-left: 25px;
  border-left: 4px solid #66a109;
  font-size: 1.25rem;
  font-style: italic;
  color: #1a1a1a;
  line-height: 1.7;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  font-weight: 400;

  &:not(:last-child) {
    margin-bottom: 1.5em; /* Add space only if it's not the very last paragraph */
  }
`;

// --- RIGHT SIDE STYLES (Unchanged) ---

const AuthorColumn = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const AuthorImage = styled.img`
  width: 350px;
  height: 350px;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  box-shadow: 0 15px 50px -10px rgba(0, 0, 0, 0.15);
  border: 6px solid #fff;

  @media (max-width: 991px) {
    width: 250px;
    height: 250px;
  }
`;

const AuthorCard = styled.div`
  border-radius: 10px;
  background-color: #66a109;
  color: #fff;
  text-align: center;
  padding: 25px 40px;
  margin-top: -80px;
  z-index: 10;
  position: relative;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(102, 161, 9, 0.35);

  @media (max-width: 991px) {
    margin-top: -60px;
    width: 85%;
    padding: 20px;
  }
`;

const AuthorName = styled.h2`
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  @media (max-width: 991px) {
    font-size: 32px;
  }
`;

const AuthorJobTitle = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.95;
  @media (max-width: 991px) {
    font-size: 16px;
  }
`;

export default SuccessStory1;
