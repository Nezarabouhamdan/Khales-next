"use client";
import React from "react";
import styled from "styled-components";
// Step 1: Import motion from Framer Motion
import { motion } from "framer-motion";

// Step 2: Define the animation variants for the gallery
// This variant controls the container and the staggering of its children
const galleryContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // A shorter stagger for images often feels better
      staggerChildren: 0.2,
    },
  },
};

// This variant defines how each individual image will animate
const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 }, // Start invisible and slightly scaled down
  visible: {
    opacity: 1,
    scale: 1, // Animate to full opacity and original scale
    transition: {
      duration: 0.6,
      ease: "easeOut", // A smooth and gentle easing
    },
  },
};

const ImageGallery = () => {
  return (
    // Step 3: Apply the container variants and in-view trigger
    <GalleryContainer
      as={motion.div} // Render this styled-component as a motion.div
      variants={galleryContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
    >
      <SmallImagesGrid>
        <ImageColumn style={{ flex: "1 1 25%" }}>
          {/* Step 4: Apply the item variant to each image wrapper */}
          <MainImageWrapper as={motion.div} variants={imageVariants}>
            <StyledImage
              src={"https://i.ibb.co/7tKV3xP1/aboutus5.jpg"}
              alt="Luxury building entrance"
            />
          </MainImageWrapper>
        </ImageColumn>
        <ImageColumn>
          <ImageWrapper as={motion.div} variants={imageVariants}>
            <StyledImage
              src={"https://i.ibb.co/XftcdnrY/aboutus2.jpg"}
              alt="Luxury building entrance"
            />
          </ImageWrapper>
          <ImageWrapper as={motion.div} variants={imageVariants}>
            <StyledImage
              src={"https://i.ibb.co/twzWnMfh/aboutus1.jpg"}
              alt="Modern apartment building"
            />
          </ImageWrapper>
        </ImageColumn>
        <ImageColumn>
          <ImageWrapper as={motion.div} variants={imageVariants}>
            <StyledImage
              src={"https://i.ibb.co/v4S8JftQ/aboutus4.jpg"}
              alt="Luxury building entrance"
            />
          </ImageWrapper>
          <ImageWrapper as={motion.div} variants={imageVariants}>
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

// No changes are needed for the styled-components definitions below.
// The 'as={motion.div}' prop handles making them animatable.

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
    height: auto;
    gap: 10px;
  }
`;
const ImageColumn = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  flex-direction: column;
  flex: 1;

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
