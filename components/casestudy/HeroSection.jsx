"use client";
import React from "react";
import styled from "styled-components";
import TitleSection from "./TitleSection";
import ProjectOverview from "./ProjectOverview";
import ImageGallery from "./ImageGallery";
import ChallengesSection from "./ChallengesSection";

const HeroSection = () => {
  const firstImageSet = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/534d9f735706f93aad1710e42ec0765f7a42b96e?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Luxury home exterior view",
      aspectRatio: 1.47,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ef22a76740a6248814cdac532b0e6f044d7afb2?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Mountain view from property",
      aspectRatio: 1.45,
    },
  ];

  const secondImageSet = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/04ecfc166361dc97face373a6f640987b6eebf96?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Interior design showcase",
      aspectRatio: 1.47,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd8334a476fe1e582e05ce3f99a6999c3e2d4933?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Architectural details",
      aspectRatio: 1.55,
      hasBottomPadding: true,
    },
  ];

  return (
    <HeroContainer role="main">
      <ContentWrapper>
        <MainContent>
          <TitleSection
            subheading="Case study"
            heading="Luxury Home Mountain View Estate"
            year="2023"
          />

          <ProjectOverview
            title="Project Overview"
            description="Lectus et nullam ipsum donec at id ac. Egestas lectus fusce purus in tincidunt. Ante pharetra viverra ante tincidunt. Interdum vel et pellentesque iaculis lectus quisque tempor. Nunc iaculis neque sed laoreet eu sollicitudin magnis. Volutpat nunc lectus nascetur dignissim. Iaculis interdum pellentesque blandit neque ac sagittis. Porttitor sed pretium ultricies imperdiet sodales dictumst ipsum amet. Tincidunt et scelerisque diam adipiscing. Cras ultricies suspendisse congue erat aliquam cursus enim."
          />

          <ImageGallery images={firstImageSet} marginTop={40} />

          <AdditionalText>
            Mi mauris leo urna id magnis fringilla sed. Leo vitae dictum tempor
            ac. Non lectus facilisis consequat hendrerit nec mattis. Ultricies
            viverra consectetur tincidunt aliquet. Posuere euismod turpis nisi
            fermentum quis elementum id diam dictum. Turpis enim fames eu
            elementum porttitor pharetra diam elit tellus semper euismod.
          </AdditionalText>
        </MainContent>

        <ImageGallery images={secondImageSet} marginTop={75} />

        <ChallengesSection
          title="Challenges & Solutions"
          description="Lectus et nullam ipsum donec at id ac. Egestas lectus fusce purus in tincidunt. Ante pharetra viverra ante tincidunt. Interdum vel et pellentesque iaculis lectus quisque tempor. Nunc iaculis neque sed laoreet eu sollicitudin magnis. Volutpat nunc lectus nascetur dignissim. Iaculis interdum pellentesque blandit neque ac sagittis. Porttitor sed pretium ultricies imperdiet sodales dictumst ipsum amet. Tincidunt et scelerisque diam adipiscing. Cras ultricies suspendisse congue erat aliquam cursus enim."
        />
      </ContentWrapper>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  background-color: #fff;
  display: flex;
  padding: 139px 80px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1145px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const MainContent = styled.div`
  width: 100%;
  padding-left: 5px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AdditionalText = styled.p`
  color: #a6afb5;
  margin: 40px 0 0 0;
  font-family:
    Be Vietnam,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default HeroSection;
