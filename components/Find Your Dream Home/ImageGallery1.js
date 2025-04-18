"use client";
import * as React from "react";
import styled from "styled-components";

const ImageGallery1 = () => {
  return (
    <GalleryWrapper>
      <MainImageContainer>
        <MainImage
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8762d6e29ee769a24cd81cc30ac42ab72689dec8cd34c6e9d12f99a4b5ff5504"
          alt="Modern home exterior"
        />
      </MainImageContainer>
      <SecondaryImage
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8056030be0fbdf49d2e5e9ab0b9406fc0625fc67fa5abef08d4b2a316de7534d"
        alt="Interior living space"
      />
      <SecondaryImage
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/86ab520994c41f77635e1df04658c094406612d4d0d02b5c94f9871ecf0a6209"
        alt="Modern kitchen design"
      />
    </GalleryWrapper>
  );
};

const GalleryWrapper = styled.section`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  margin-top: auto;
  margin-bottom: auto;
  align-items: flex-end;
  gap: 19px 20px;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 794px;
   @media (max-width: 1025px) {
     width: 504px;

  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const MainImageContainer = styled.div`
  min-width: 240px;
  padding-top: 114px;
  flex-grow: 1;
  flex-shrink: 1;
  width: 807px;
   @media (max-width: 1025px) {
     width: 504px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    padding-top: 100px;
  }
`;

const MainImage = styled.img`
  aspect-ratio: 2.81;
  object-fit: contain;
  object-position: center;
  width: 100%;
  border-radius: 40px;
  @media (max-width: 991px) {
       width: 504px;

    max-width: 100%;
  }
`;

const SecondaryImage = styled.img`
  aspect-ratio: 1.28;
  object-fit: contain;
  object-position: center;
  width: 348px;
  border-radius: 40px;
  min-width: 240px;
  flex-grow: 1;
  flex-shrink: 1;
   @media (max-width: 1025px) {  min-width: 20px;

     width: 202px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default ImageGallery1;
