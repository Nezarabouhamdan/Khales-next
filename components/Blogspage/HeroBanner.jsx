import React from "react";
import styled from "styled-components";

const HeroBanner = () => {
  return (
    <HeroSection>
      <HeroImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd94eb914b63d96bc967359e0fb8c94f9480e488?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf"
        alt="Blog post featured image"
      />
      <HeroContent>
        <ContentWrapper>
          <TitleWrapper>
            <MainTitle>
              <span>5 Efficient Rules How to Organize Your Working Plac</span>
              <span>e</span>
            </MainTitle>
            <Subtitle>
              Relationship tips couples therapists are giving all the time
            </Subtitle>
          </TitleWrapper>
        </ContentWrapper>
      </HeroContent>
    </HeroSection>
  );
};

const HeroSection = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 800px;
  width: 100%;
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 434px;
  padding-bottom: 120px;
  align-items: start;
  color: rgba(255, 255, 255, 1);
  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const HeroImage = styled.img`
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
  font-size: 64px;
  font-family:
    Sansita,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 700;
  line-height: 66px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 46px;
  }
`;

const Subtitle = styled.h2`
  font-size: 48px;
  font-family:
    Europa-Regular,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  letter-spacing: -1.2px;
  margin-top: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

export default HeroBanner;
