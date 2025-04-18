"use client";
import * as React from "react";
import styled from "styled-components";
import { AboutContent } from "./AboutContent";
import { AboutImages } from "./AboutImages";

const AboutSection = () => {
  return (
    <section>
      <Container>
        <ContentColumn>
          <AboutContent />
        </ContentColumn>
        <ImageColumn>
          <AboutImages />
        </ImageColumn>
      </Container>
    </section>
  );
};

const Container = styled.div`

  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 45%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 94%;
  }
`;

export default AboutSection;
