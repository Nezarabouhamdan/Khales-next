"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// --- STYLED COMPONENTS ---

const ServicesWrappr = styled.section`
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 600px;
  overflow: hidden;
  padding: 4rem;
  background-color: #111;
  color: #fff;
  font-family: var(
    --font-inter
  ); // This will be overridden by the parent's font style

  @media (max-width: 992px) {
    height: auto;
    min-height: auto;
    padding: 3rem 2rem;
  }
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transform-origin: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TitleColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-right: 2rem; // LTR padding
  padding-inline-start: 0; // RTL support
  padding-inline-end: 2rem; // RTL support
`;

const SectionTitle = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const AllServicesLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &::before {
    content: "✦";
    color: #66a109;
    font-size: 0.8rem;
  }

  &:hover {
    opacity: 1;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const ServiceItem = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  z-index: 5;
  transition: color 0.3s ease-in-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);

  &:nth-child(odd) {
    border-inline-end: 1px solid rgba(255, 255, 255, 0.15);
  }

  &:nth-last-child(1),
  &:nth-last-child(2) {
    border-bottom: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #66a109;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.active {
    color: #000000;
  }

  &.active::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    border-inline-end: none !important;
    &:last-child {
      border-bottom: none;
    }
  }
`;

// --- COMPONENT LOGIC (UPDATED) ---

const ServicesSection = ({ services, content, lang }) => {
  // Set the first service as the default hovered item
  const [hoveredService, setHoveredService] = useState(services?.[0]);

  // Safety check: Don't render if essential props are missing
  if (!services || services.length === 0 || !content) {
    return null;
  }

  return (
    <ServicesWrappr>
      <AnimatePresence>
        {hoveredService && (
          <BackgroundImage
            key={hoveredService.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ backgroundImage: `url(${hoveredService.src})` }}
          />
        )}
      </AnimatePresence>
      <Overlay />

      <ContentContainer>
        <TitleColumn>
          {/* UPDATED: Using text from props */}
          <SectionTitle>{content.title}</SectionTitle>
          <AllServicesLink href="#">{content.linkText}</AllServicesLink>
        </TitleColumn>

        <ServicesGrid>
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              className={hoveredService?.id === service.id ? "active" : ""}
              onMouseEnter={() => setHoveredService(service)}
            >
              {service.title}
            </ServiceItem>
          ))}
        </ServicesGrid>
      </ContentContainer>
    </ServicesWrappr>
  );
};

export default ServicesSection;
