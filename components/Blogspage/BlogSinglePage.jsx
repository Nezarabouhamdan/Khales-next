"use client";

import React from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import Link from "next/link";

// --- HELPER ICONS & FUNCTIONS ---

const SocialIcon = ({ name, ...props }) => {
  const icons = {
    facebook: (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.67 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
      </svg>
    ),
    twitter: (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
      </svg>
    ),
    linkedin: (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-3.06v8.37h3.06v-4.93c0-.83.06-1.66.57-2.12.51-.46 1.28-.48 1.76 0 .5.48.47 1.3.47 2.12v4.93h3.06zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  };
  return icons[name.toLowerCase()] || null;
};

const QuoteIcon = () => (
  <svg
    width="48"
    height="34"
    viewBox="0 0 48 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.864 34H0L9.432 0H23.58L18.864 34ZM43.432 34H24.568L34 0H48L43.432 34Z"
      fill="#EAF7E0"
    />
  </svg>
);
const formatSocialCount = (num) =>
  num >= 1000 ? (num / 1000).toFixed(1).replace(".0", "") + "k" : num;

// --- MAIN COMPONENT ---
function BlogSinglePage({ blogData, lang, followUsText }) {
  const isRTL = lang === "ar";

  if (!blogData || !blogData.fullContent) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading blog content...</LoadingText>
      </LoadingContainer>
    );
  }

  const { fullContent, title, coverImage, authorName, date } = blogData;
  const socialLinks = {
    facebook: "https://facebook.com/Khales.ae",
    twitter: "https://x.com/Khales_ae",
    instagram: "https://instagram.com/khales.ae",
    linkedin: "https://linkedin.com/company/khales-ae",
  };

  // UPDATED: Added translation for "Followers"
  const followersText = isRTL ? "متابع" : "Followers";

  const socialData = [
    {
      name: "Facebook",
      count: fullContent.socialCounts?.[0] || 0,
      url: socialLinks.facebook,
    },
    {
      name: "Twitter",
      count: fullContent.socialCounts?.[1] || 0,
      url: socialLinks.twitter,
    },
    {
      name: "Instagram",
      count: fullContent.socialCounts?.[2] || 0,
      url: socialLinks.instagram,
    },
    {
      name: "LinkedIn",
      count: fullContent.socialCounts?.[3] || 0,
      url: socialLinks.linkedin,
    },
  ];

  return (
    <BlogContainer dir={isRTL ? "rtl" : "ltr"}>
      <HeroSection>
        <HeroBackground>
          <Image
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <Overlay />
        </HeroBackground>
        <HeroContent>
          <MainTitle>{title}</MainTitle>
          <Subtitle>{fullContent.subtitle}</Subtitle>
        </HeroContent>
      </HeroSection>
      <ContentGrid>
        <MainContent>
          <ArticleHeader>
            <AuthorInfo>
              <AuthorImageWrapper>
                <Image
                  src={blogData.authorImage}
                  alt={authorName}
                  layout="fill"
                  objectFit="cover"
                />
              </AuthorImageWrapper>
              <AuthorDetails>
                <AuthorName>{authorName}</AuthorName>
                <PostDate>{date}</PostDate>
              </AuthorDetails>
            </AuthorInfo>
          </ArticleHeader>
          {fullContent.paragraphs?.map((para, i) => (
            <Paragraph key={i}>{para}</Paragraph>
          ))}
          <QuoteBlock>
            <QuoteIconWrapper>
              <QuoteIcon />
            </QuoteIconWrapper>
            <QuoteText>{fullContent.quote}</QuoteText>
          </QuoteBlock>
          <Paragraph>{fullContent.paragraphAfterQuote}</Paragraph>
          <SectionTitle>{fullContent.sectionTitle}</SectionTitle>
          <Paragraph>{fullContent.thirdParagraph}</Paragraph>
          <List>
            {fullContent.listItems?.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
          <Paragraph>{fullContent.fourthParagraph}</Paragraph>
        </MainContent>
        <Sidebar>
          <SidebarSticky>
            <SocialLinksGrid>
              {socialData.map((social) => (
                // UPDATED: Passed the `isRTL` prop for styling
                <SocialLink
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.name}
                  isRTL={isRTL}
                >
                  {/* UPDATED: The info and icon now swap places based on language */}
                  <SocialInfo isRTL={isRTL}>
                    <SocialName>{social.name}</SocialName>
                    <SocialCount>
                      {formatSocialCount(social.count)} {followersText}
                    </SocialCount>
                  </SocialInfo>
                  <SocialIconWrapper>
                    <SocialIcon name={social.name} width="22" height="22" />
                  </SocialIconWrapper>
                </SocialLink>
              ))}
            </SocialLinksGrid>
          </SidebarSticky>
        </Sidebar>
      </ContentGrid>
    </BlogContainer>
  );
}

// --- STYLED COMPONENTS (with RTL enhancements) ---

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fff;
`;
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #66a109;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;
const BlogContainer = styled.article`
  background-color: #ffffff;
  color: #1a1a1a;
`;
const HeroSection = styled.header`
  position: relative;
  height: 60vh;
  min-height: 400px;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 2rem;
`;
const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  img {
    transform: scale(1.05);
  }
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
`;
const HeroContent = styled.div`
  position: relative;
  max-width: 900px;
  z-index: 2;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
`;
const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;
const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  opacity: 0.9;
  margin-top: 1rem;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 80px;
  max-width: 1200px;
  margin: -80px auto 80px;
  padding: 0 2rem;
  align-items: flex-start;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
  }
`;
const MainContent = styled.main`
  background: #ffffff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 24px;
  }
`;
const ArticleHeader = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
`;
const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;
const AuthorImageWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
`;
const AuthorDetails = styled.div`
  line-height: 1.4;
`;
const AuthorName = styled.p`
  font-weight: 600;
  color: #1a1a1a;
`;
const PostDate = styled.p`
  font-size: 0.9rem;
  color: #777;
`;
const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1.5em;
`;
const QuoteBlock = styled.blockquote`
  margin: 40px 0;
  padding-left: 30px;
  border-left: 4px solid #66a109;
  position: relative;
`;
const QuoteIconWrapper = styled.div`
  position: absolute;
  left: -24px;
  top: -16px;
  opacity: 0.3;
  transform: translateX(-100%) rotate(-5deg);
`;
const QuoteText = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.5;
`;
const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
  line-height: 1.3;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;
const ListItem = styled.li`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  padding-left: 25px;
  position: relative;
  margin-bottom: 10px;
  &:before {
    content: "✔";
    color: #66a109;
    position: absolute;
    left: 0;
    top: 2px;
  }
`;
const Sidebar = styled.aside`
  @media (max-width: 992px) {
    order: -1;
    background: #f9f9f9;
    border-radius: 12px;
    padding: 24px;
  }
`;
const SidebarSticky = styled.div`
  position: sticky;
  top: 100px;
`;
const SidebarHeading = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 20px;
`;
const SocialLinksGrid = styled.div`
  display: grid;
  gap: 10px;
`; // Reduced gap for a tighter look

// UPDATED: SocialLink now handles the RTL layout change
const SocialLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between; // This helps push items to the ends
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.03);
  }

  @media (max-width: 992px) {
    background-color: #fff;
  }
`;

// UPDATED: SocialIconWrapper is now simpler
const SocialIconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  color: #66a109; // Use accent color for icons
  transition: transform 0.3s;

  ${SocialLink}:hover & {
    transform: rotate(10deg) scale(1.1);
  }
`;

// UPDATED: SocialInfo handles text alignment for RTL
const SocialInfo = styled.div`
  line-height: 1.3;
  text-align: ${({ isRTL }) => (isRTL ? "right" : "left")};
`;

const SocialName = styled.p`
  font-weight: 500;
  color: #1a1a1a;
  font-size: 1rem;
`;

const SocialCount = styled.p`
  font-size: 0.85rem;
  color: #777;
`;

export default BlogSinglePage;
