"use client";
import * as React from "react";
import styled from "styled-components";
import Image from "next/image";

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

  const { fullContent } = blogData;

  return (
    <BlogContainer rtl={isRTL}>
      <HeroSection>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src={blogData.coverImage}
            alt={blogData.title}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            style={{
              filter: "blur(1px) brightness(0.7)",
              transform: "scale(1.1)",
            }}
          />
        </div>
        <HeroContent>
          <ContentWrapper>
            <TitleWrapper>
              <MainTitle rtl={isRTL}>{blogData.title}</MainTitle>
              <Subtitle rtl={isRTL}>{fullContent.subtitle}</Subtitle>
            </TitleWrapper>
          </ContentWrapper>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentLayout space={220}>
          <TwoColumnLayout rtl={isRTL}>
            <MainColumn>
              <ArticleContent>
                <TextContent>
                  {fullContent.paragraphs?.map((para, i) => (
                    <Paragraph key={i} rtl={isRTL}>
                      {para}
                    </Paragraph>
                  ))}
                  <QuoteBlock rtl={isRTL}>
                    <QuoteIcon
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5626f45df99f1434dc2edae72652a2e32e076fc2?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf"
                      alt="Quote icon"
                      width={41}
                      height={44}
                    />
                    <QuoteText rtl={isRTL}>{fullContent.quote}</QuoteText>
                  </QuoteBlock>
                  <SecondParagraph rtl={isRTL}>
                    {fullContent.paragraphAfterQuote}
                  </SecondParagraph>
                </TextContent>
              </ArticleContent>
            </MainColumn>
            <SidebarColumn>
              <SidebarContent>
                <div>
                  <SidebarHeading rtl={isRTL}>{followUsText}</SidebarHeading>
                  <SocialIconsWrapper>
                    {fullContent.socialCounts?.map((count, index) => (
                      <SocialIconContainer key={index}>
                        <SocialIcon
                          width={28}
                          height={28}
                          src={
                            [
                              "/assets/social/facebook.svg",
                              "/assets/social/twitter.svg",
                              "/assets/social/instagram.svg",
                              "/assets/social/linkedin.svg",
                            ][index]
                          }
                          alt="Social media icon"
                        />
                        <SocialCount>{count}</SocialCount>
                      </SocialIconContainer>
                    ))}
                  </SocialIconsWrapper>
                </div>
              </SidebarContent>
            </SidebarColumn>
          </TwoColumnLayout>
        </ContentLayout>
        <SectionTitle rtl={isRTL}>{fullContent.sectionTitle}</SectionTitle>
        <ThirdParagraph rtl={isRTL}>
          {fullContent.thirdParagraph}
        </ThirdParagraph>
        <ListSection as="ul" rtl={isRTL}>
          {fullContent.listItems?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ListSection>
        <FourthParagraph rtl={isRTL}>
          {fullContent.fourthParagraph}
        </FourthParagraph>
      </ContentSection>
    </BlogContainer>
  );
}

// Loading components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fafafa;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #0070f3;
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

// Styled components with RTL support
const BlogContainer = styled.article`
  background-color: rgba(250, 250, 250, 1);
  display: flex;
  padding-bottom: 55px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  direction: ${(props) => (props.rtl ? "rtl" : "ltr")};

  @media (max-width: 991px) {
    padding-bottom: 100px;
  }
`;

const HeroSection = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 800px;
  width: 100%;
  padding: 434px 80px 120px;

  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const HeroBackground = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContent = styled.div`
  position: relative;
  margin-bottom: -24px;
  width: 1084px;
  max-width: 100%;

  @media (max-width: 991px) {
    margin-bottom: 10px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const MainTitle = styled.h1`
  text-shadow: 4px 10px 48px rgba(0, 0, 0, 0.37);
  font-size: 44px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  line-height: 66px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: ${(props) => (props.rtl ? "right" : "left")};
  color: white;
  @media (max-width: 991px) {
    margin-top: 75%;
    font-size: 25px;
    line-height: 32px;
  }
`;

const Subtitle = styled.h2`
  font-size: 48px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  letter-spacing: -1.2px;
  margin-top: 16px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};
  color: white;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const ContentSection = styled.section`
  align-self: center;
  display: flex;
  margin-top: 80px;
  width: 100%;
  max-width: 1643px;
  flex-direction: column;
  align-items: start;
  padding: 0 58px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const ContentLayout = styled.div`
  align-self: stretch;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const TwoColumnLayout = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: ${(props) => (props.rtl ? "row-reverse" : "row")};

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const MainColumn = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 76%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ArticleContent = styled.div`
  flex-grow: 1;
  color: rgba(18, 20, 22, 1);

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const TextContent = styled.div`
  width: 100%;
  max-width: 1080px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Paragraph = styled.p`
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const QuoteBlock = styled.blockquote`
  display: flex;
  margin-top: 80px;
  width: 100%;
  padding-bottom: 31px;
  align-items: stretch;
  gap: 36px;
  font-family: "Inter", sans-serif;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.rtl ? "row-reverse" : "row")};

  @media (max-width: 991px) {
    margin-top: 40px;
    font-size: 40px;
  }
`;

const QuoteIcon = styled.img`
  aspect-ratio: 1.08;
  object-fit: contain;
  object-position: center;
  width: 41px;
  align-self: start;
  margin-top: 17px;
  flex-shrink: 0;
`;

const QuoteText = styled.p`
  flex-grow: 1;
  flex-shrink: 1;
  width: 990px;
  flex-basis: auto;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

const SecondParagraph = styled.p`
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 40px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SidebarColumn = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 24%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const SidebarContent = styled.div`
  color: rgba(18, 20, 22, 1);
  font-weight: 400;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const SidebarHeading = styled.h3`
  font-size: 25px;
  font-family: EuropaNuova-Bold, -apple-system, Roboto, Helvetica, sans-serif;
  line-height: 1;
  text-align: ${(props) => (props.rtl ? "right" : "left")};
`;

const SocialIconsWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: start;
  gap: 40px 49px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  white-space: nowrap;
  line-height: 1;
  justify-content: start;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const SocialIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 28px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const SocialIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 28px;
`;

const SocialCount = styled.span`
  margin-top: 16px;
`;

const SectionTitle = styled.h2`
  color: rgba(18, 20, 22, 1);
  font-size: 40px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 80px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ThirdParagraph = styled.p`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 20px;
  width: 100%;
  align-self: stretch;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ListSection = styled.div`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 42px;
  padding: 0 ${(props) => (props.rtl ? "64px 0 0" : "0 0 0 64px")};
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 ${(props) => (props.rtl ? "20px 0 0" : "0 0 0 20px")};
  }
`;

const FourthParagraph = styled.p`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 24px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FooterSection = styled.footer`
  margin-top: 303px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  margin-top: 27px;
  align-items: start;
  gap: 40px 54px;
  justify-content: start;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FooterDivider = styled.div`
  display: flex;
  margin-top: 57px;
  align-items: start;
  gap: 40px 54px;
  justify-content: start;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export default BlogSinglePage;
