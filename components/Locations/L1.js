// components/OfficeLocations.jsx
"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

//================================================================
// 1. REAL, VARIED DATA FOR LOCATIONS
//================================================================

const locationsData = [
  {
    city: "Dubai",
    address: "Silicon Oasis, SIT Tower 1311",
    phone: "+971 4 557 1184",
    mapLink: "https://www.google.com/maps/place/Dubai+Silicon+Oasis",
    highlight: false,
  },
  {
    city: "New York",
    address: "123 Tech Avenue, Suite 500",
    phone: "+1 212 555 0184",
    mapLink: "https://www.google.com/maps/place/New+York,+NY",
    highlight: true,
  },
  {
    city: "London",
    address: "789 Innovation Drive, Shoreditch",
    phone: "+44 20 7946 0958",
    mapLink: "https://www.google.com/maps/place/London",
    highlight: false,
  },
  {
    city: "Singapore",
    address: "456 Orchard Road, Vision Tower",
    phone: "+65 6555 0123",
    mapLink: "https://www.google.com/maps/place/Singapore",
    highlight: true,
  },
  {
    city: "Tokyo",
    address: "Shibuya Crossing, Tech Hub 8F",
    phone: "+81 3 4567 8901",
    mapLink: "https://www.google.com/maps/place/Tokyo",
    highlight: false,
  },
  {
    city: "Sydney",
    address: "101 Circular Quay, Suite 2200",
    phone: "+61 2 9876 5432",
    mapLink: "https://www.google.com/maps/place/Sydney+NSW",
    highlight: true,
  },
];

//================================================================
// 2. STYLED COMPONENTS
//================================================================
const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #ffffff;
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
`;

const Header = styled(motion.h1)`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const LocationsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const LocationCard = styled(motion.div)`
  background-color: ${(props) => (props.highlight ? "#66a109" : "#121212")};
  color: white;
  padding: 2.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${(props) =>
      props.highlight
        ? "0 15px 30px rgba(102, 161, 9, 0.3)"
        : "0 15px 30px rgba(0,0,0,0.25)"};
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin: 0 auto;
`;

const AddressLink = styled.a`
  font-size: 1rem;
  line-height: 1.6;
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const PhoneLink = styled.a`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: white;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
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
const OfficeLocations = () => {
  const handleMouseMove = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      const factor = parseInt(shape.getAttribute("data-factor")) || 20;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / factor;
      const y = (e.clientY - rect.top - rect.height / 2) / factor;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  const handleMouseLeave = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      shape.style.transform = `translate(0px, 0px)`;
    });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <DecorativeShape
        className="shape"
        data-factor="30"
        style={{
          top: "10%",
          left: "5%",
          width: "50px",
          height: "50px",
          background: "rgba(102, 161, 9, 0.05)",
          borderRadius: "10px",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          top: "60%",
          right: "5%",
          width: "100px",
          height: "100px",
          border: "1px solid rgba(102, 161, 9, 0.1)",
          borderRadius: "50%",
        }}
      />

      <ContentWrapper>
        <Header
          as={motion.h1}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Offices Locations
        </Header>

        <LocationsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {locationsData.map((loc, index) => (
            <LocationCard
              key={index}
              highlight={loc.highlight}
              variants={itemVariants}
            >
              <IconWrapper>
                <FaMapMarkerAlt />
              </IconWrapper>
              <AddressLink
                href={loc.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{loc.city}</strong>
                <br />
                {loc.address}
              </AddressLink>
              <PhoneLink href={`tel:${loc.phone.replace(/\s/g, "")}`}>
                {loc.phone}
              </PhoneLink>
            </LocationCard>
          ))}
        </LocationsGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default OfficeLocations;
