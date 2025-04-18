"use client";
import * as React from "react";
import styled from "styled-components";

const ImageGallery = () => {
  return (
    <ImageSection>
      <LeftImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/41e97c93d704d1b29029aac814307c3780894e43"
        alt="Professional workspace environment"
        loading="lazy"
      />
      <RightImage
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a08e986dc9ea0a90382743466d442f29e2856e4"
        alt="Team collaboration space"
        loading="lazy"
      />
    </ImageSection>
  );
};

const ImageSection = styled.section`
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
  margin-right: -4px;
  margin-left: 2px;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftImage = styled.img`
  width: 320px;
  height: 430px;
  object-fit: cover;  border-radius:10px;


  margin-left: -1px;
  margin-top: 1px;

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
`;

const RightImage = styled.img`
  width: 320px;
  height: 320px;
  object-fit: cover;  border-radius:10px;


  @media (max-width: 640px) {
    width: 100%;
    height: auto;
  }
`;

export default ImageGallery;
