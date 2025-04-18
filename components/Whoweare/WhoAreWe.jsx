"use client";
import React from "react";
import styled from "styled-components";
import TextContent from "./TextContent";
import ImageGallery from "./ImageGallery";
import { useLanguage } from "../../Context/Languagecontext";

const WhoAreWe = () => {
  const { language } = useLanguage(); // Use the context

  return (
    <StyledSection>
      <ContentContainer>
        <FlexWrapper rtl={language === "ar"}>
          <TextContent />
          <ImageGallery />
        </FlexWrapper>
      </ContentContainer>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 100px 20px;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
`;

const ContentContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 80px;
  align-items: center;
  flex-direction: ${({ rtl }) => (rtl ? "row-reverse" : "row")};

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export default WhoAreWe;
