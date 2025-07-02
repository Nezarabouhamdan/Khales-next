// components/OfficeLocationsFinal.jsx
"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

//================================================================
// 1. DATA & KEYFRAME ANIMATIONS
//================================================================

const locationsData = [
  {
    city: "Dubai, UAE",
    address: "Silicon Oasis, SIT Tower 1311",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80",
  },
  {
    city: "New York, USA",
    address: "123 Tech Avenue, Suite 500",
    imageUrl:
      "https://www.workspace.co.uk/media/archive%20articles/0/banner-ban.png?width=1920&height=800&mode=crop&format=webp&quality=60",
  },
  {
    city: "London, UK",
    address: "789 Innovation Drive, Shoreditch",
    imageUrl:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
  },
];

const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;

//================================================================
// 2. STYLED COMPONENTS (WITH THE CORRECT CARD STYLE)
//================================================================
const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  @media (max-width: 992px) {
    padding: 4rem 1.5rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Header = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const LocationsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

// THE CORRECT CARD STYLE
const LocationCard = styled(motion.div)`
  background-color: #ffffff;
  color: #1a1a1a;
  padding: 2rem;
  border-radius: 16px;
  text-align: left;
  cursor: pointer;
  border: 2px solid #e9ecef;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &.active,
  &:hover {
    transform: translateY(-8px);
    border-color: #66a109;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  }
`;

const IconWrapper = styled.div`
  font-size: 1.75rem;
  color: #66a109;
  margin-bottom: 1.5rem;
`;

const CityTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const AddressText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
`;

const ImageShowcase = styled(motion.div)`
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

const ShowcaseImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.imageUrl});
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`;

const ImageCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  z-index: 2;
  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 3. MAIN COMPONENT
//================================================================
const OfficeLocationsFinal = () => {
  const [activeLocation, setActiveLocation] = useState(locationsData[1]); // Default to middle item

  return (
    <SectionContainer>
      <DecorativeShape
        className="shape"
        data-factor="30"
        style={{
          top: "10%",
          left: "5%",
          width: "50px",
          height: "50px",
          background: "rgba(102, 161, 9, 0.05)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          bottom: "10%",
          right: "5%",
          width: "80px",
          height: "80px",
          border: "1px solid rgba(102, 161, 9, 0.15)",
        }}
      />

      <ContentWrapper
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Header> Offices Locations</Header>
        </motion.div>

        <LocationsGrid>
          {locationsData.map((loc, index) => (
            <LocationCard
              key={index}
              className={activeLocation.city === loc.city ? "active" : ""}
              onMouseEnter={() => setActiveLocation(loc)}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <IconWrapper>
                <FaMapMarkerAlt />
              </IconWrapper>
              <CityTitle>{loc.city}</CityTitle>
              <AddressText>{loc.address}</AddressText>
            </LocationCard>
          ))}
        </LocationsGrid>

        <ImageShowcase>
          <AnimatePresence>
            <ShowcaseImage
              key={activeLocation.imageUrl}
              imageUrl={activeLocation.imageUrl}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </AnimatePresence>
          <AnimatePresence>
            <ImageCaption
              key={activeLocation.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3>{activeLocation.city}</h3>
              <p>{activeLocation.address}</p>
            </ImageCaption>
          </AnimatePresence>
        </ImageShowcase>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default OfficeLocationsFinal;
