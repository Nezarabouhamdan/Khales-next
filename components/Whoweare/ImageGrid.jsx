"use client";
import * as React from "react";
import styled from "styled-components";

const ImageGrid = () => {
  return (
    <ImageWrapper>
      <ImageContainer>
        <ImageColumn>
          <StyledImage
src='https://www.euphoriainteriors.com/wp-content/uploads/2024/10/Gemini_Generated_Image_322o3p322o3p322o.jpg'            alt="About us image 1"
          />
        </ImageColumn>
        <ImageColumn>
          <StyledImage
src="https://radyinterior.ae/wp-content/uploads/2024/05/Traditional-Arabic-Gardens-1024x1024.jpeg"            alt="About us image 2"
          />
        </ImageColumn>
      </ImageContainer>
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  margin-top: 70px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ImageContainer = styled.div`
  gap: 20px;
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;

  &:nth-child(2) {
    margin-left: 20px;
  }

  @media (max-width: 991px) {
    width: 100%;

    &:nth-child(2) {
      margin-left: 0;
    }
  }
`;

const StyledImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 100%;
  border-radius: 14px;
  box-shadow: -1px 31px 48px rgba(0, 0, 0, 0.09);
  margin-top: ${(props) =>
    props.src ===
    "https://cdn.builder.io/api/v1/image/assets/TEMP/c769ada7180d178ed589a67c8cc84de7f8c4dd9ce87ca720502d18cb2f858754?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
      ? "14px"
      : "0"};

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export default ImageGrid;
