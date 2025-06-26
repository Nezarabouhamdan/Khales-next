"use client";
import React from "react";
import styled from "styled-components";

const ImageGallery = ({ images, marginTop = 40 }) => {
  return (
    <GalleryContainer $marginTop={marginTop}>
      {images.map((image, index) => (
        <ImageWrapper key={index} $hasBottomPadding={image.hasBottomPadding}>
          <GalleryImage
            src={image.src}
            alt={image.alt || `Gallery image ${index + 1}`}
            $aspectRatio={image.aspectRatio}
          />
        </ImageWrapper>
      ))}
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
  display: flex;
  margin-top: ${(props) => props.$marginTop}px;
  align-items: start;
  gap: 40px 44px;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
    ${(props) =>
      props.$marginTop === 75 &&
      `
      margin-right: 5px;
      margin-top: 40px;
    `}
  }
`;

const ImageWrapper = styled.div`
  min-width: 240px;
  overflow: hidden;
  width: 548px;
  background-color: #a6afb5;
  ${(props) =>
    props.$hasBottomPadding &&
    `
    padding-bottom: 21px;
    justify-content: center;
    align-items: stretch;
    display: flex;
    flex-direction: column;
  `}
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const GalleryImage = styled.img`
  aspect-ratio: ${(props) => props.$aspectRatio || 1.47};
  object-fit: contain;
  object-position: center;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default ImageGallery;
