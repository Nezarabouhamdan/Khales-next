"use client";
import React from "react";
import styled from "styled-components";

const ImageGallery = () => {
  return (
    <GalleryContainer>
      <SmallImagesGrid>
        <ImageColumn style={{ flex: "1 1 25%" }}>
          {" "}
          <MainImageWrapper>
            <StyledImage
              src={"https://i.ibb.co/7tKV3xP1/aboutus5.jpg"}
              alt="Luxury building entrance"
            />
          </MainImageWrapper>
        </ImageColumn>{" "}
        <ImageColumn>
          <ImageWrapper>
            <StyledImage
              src={"https://i.ibb.co/XftcdnrY/aboutus2.jpg"}
              alt="Luxury building entrance"
            />
          </ImageWrapper>
          <ImageWrapper>
            <StyledImage
              src={"https://i.ibb.co/twzWnMfh/aboutus1.jpg"}
              alt="Modern apartment building"
            />
          </ImageWrapper>
        </ImageColumn>{" "}
        <ImageColumn>
          <ImageWrapper>
            <StyledImage
              src={"https://i.ibb.co/v4S8JftQ/aboutus4.jpg"}
              alt="Luxury building entrance"
            />
          </ImageWrapper>
          <ImageWrapper>
            <StyledImage
              src={"https://i.ibb.co/jPgtTSzr/aboutus3.jpg"}
              alt="Modern apartment building"
            />
          </ImageWrapper>
        </ImageColumn>
      </SmallImagesGrid>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
  flex: 0 0 60%;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const MainImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 30px;
`;

const SmallImagesGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 45vh;
  @media (max-width: 640px) {
    flex-direction: column;
    height: auto; /* Allow height to adjust in mobile view */

    gap: 10px;
  }
`;
const ImageColumn = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  flex-direction: column;
  flex: 1; /* Allow equal distribution of space */

  @media (max-width: 640px) {
    flex-direction: column;
    height: auto;
    gap: 10px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  border-radius: 15px;
  overflow: hidden;
  height: 100%;

  @media (max-width: 640px) {
    height: 200px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 35% 80%;

  display: block;
`;

export default ImageGallery;
