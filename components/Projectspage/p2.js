// components/ProjectDetail.jsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTwitter,
  FaLinkedinIn,
  FaRegBuilding,
  FaStar,
  FaMapMarkerAlt,
  FaExpandArrowsAlt,
  FaSun,
} from "react-icons/fa";

//================================================================
// 1. STYLED COMPONENTS
//================================================================
const PageWrapper = styled.section`
  width: 100%;
  padding: 5rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  @media (max-width: 992px) {
    padding: 3rem 1.5rem;
  }
`;

const HeroSection = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  min-height: 400px;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 3rem;
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TitleColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const MainTitle = styled.h1`
  font-size: 5.5rem; /* Adjusted for three lines */
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.1;
  text-transform: uppercase;
  @media (max-width: 1200px) {
    font-size: 4rem;
  }
  @media (max-width: 992px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #555;
  margin-top: 1rem;
  letter-spacing: 0.5px;
`;

const VerticalLine = styled(motion.div)`
  width: 1px;
  background-color: #e0e0e0;
  margin: 0 3rem;
  @media (max-width: 992px) {
    display: none;
  }
`;

const DetailsColumn = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  span:first-child {
    color: #555;
  }
  span:last-child {
    font-weight: 500;
    color: #1a1a1a;
  }
`;

const PrimaryButton = styled.a`
  display: block;
  text-align: center;
  background-color: #66a109;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.3);
    transform: translateY(-3px);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: #1a1a1a;
  border: 1px solid #ccc;
  margin-top: 1rem;
  &:hover {
    background-color: #1a1a1a;
    color: white;
    border-color: #1a1a1a;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  @media (max-width: 992px) {
    justify-content: center;
  }
  a {
    color: #555;
    transition: color 0.3s ease;
    &:hover {
      color: #66a109;
    }
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  margin-bottom: 2rem;
`;
const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => (props.active ? "#1a1a1a" : "#888")};
  position: relative;
`;
const Underline = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #66a109;
`;

const ImageGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ImageWrapper = styled(motion.div)`
  overflow: hidden;
  border-radius: 12px;
  height: 350px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-out;
  }
  &:hover img {
    transform: scale(1.05);
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const FeatureCard = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  .icon {
    font-size: 1.5rem;
    color: #66a109;
    margin-bottom: 0.75rem;
  }
  h4 {
    font-size: 1rem;
    font-weight: 600;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }
`;
const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #495057;
  margin-bottom: 1.5rem;
`;
const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const DecorativeShape = styled.div`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 2. MAIN COMPONENT
//================================================================
const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const handleMouseMove = (e) => {
    /* Parallax logic */
  };
  const handleMouseLeave = (e) => {
    /* Parallax logic */
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <PageWrapper onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <DecorativeShape
        className="shape"
        data-factor="30"
        style={{
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          border: "1px solid rgba(102, 161, 9, 0.1)",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          bottom: "20%",
          right: "5%",
          width: "80px",
          height: "80px",
          background: "rgba(102, 161, 9, 0.05)",
          borderRadius: "50%",
        }}
      />

      <HeroSection
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <TitleColumn>
          <MainTitle>
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              Room
            </motion.span>
            <br />
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
            >
              Master
            </motion.span>
            <br />
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            >
              Penthouse
            </motion.span>
          </MainTitle>
          <SubTitle variants={itemVariants}>
            MANHATTAN PENTHOUSE COLLECTION
          </SubTitle>
        </TitleColumn>

        <VerticalLine
          as={motion.div}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <DetailsColumn variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <DetailRow>
              <span>Project Type</span>
              <span>Luxury Penthouse</span>
            </DetailRow>
          </motion.div>
          <motion.div variants={itemVariants}>
            <DetailRow>
              <span>Architect</span>
              <span>Zaha's Partners</span>
            </DetailRow>
          </motion.div>
          <motion.div variants={itemVariants}>
            <DetailRow>
              <span>Year Built</span>
              <span>2024</span>
            </DetailRow>
          </motion.div>
          <motion.div variants={itemVariants}>
            <DetailRow>
              <span>Completion</span>
              <span>Q4 2024</span>
            </DetailRow>
          </motion.div>
          <motion.div variants={itemVariants}>
            <PrimaryButton>Schedule Private Tour</PrimaryButton>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SecondaryButton>Download Brochure</SecondaryButton>
          </motion.div>
          <motion.div variants={itemVariants}>
            <SocialIcons>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaRegBuilding />
              </a>
            </SocialIcons>
          </motion.div>
        </DetailsColumn>
      </HeroSection>

      <ContentSection>
        <Tabs>
          {["Overview", "Features", "Location"].map((tab) => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && <Underline layoutId="tab-underline" />}
            </TabButton>
          ))}
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "Overview" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <ImageGrid>
                  <ImageWrapper variants={itemVariants}>
                    <img
                      src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80"
                      alt="Living space"
                    />
                  </ImageWrapper>
                  <ImageWrapper variants={itemVariants}>
                    <img
                      src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80"
                      alt="Dining area"
                    />
                  </ImageWrapper>
                </ImageGrid>
                <TwoColumnGrid>
                  <motion.div variants={itemVariants}>
                    <SectionTitle>Project Overview</SectionTitle>
                    <Paragraph>
                      This is a landmark penthouse under development in the
                      pinnacle of luxury living on Billionaires' Row. Designed
                      by renowned Pritzker Prize-winners, this full-floor
                      residence offers unparalleled 360-degree views of Central
                      Park and the revolutionary skyline.
                    </Paragraph>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <SectionTitle>Design Philosophy</SectionTitle>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <FeatureCard>
                        <div className="icon">
                          <FaStar />
                        </div>
                        <h4>Acoustic Comfort</h4>
                      </FeatureCard>
                      <FeatureCard>
                        <div className="icon">
                          <FaSun />
                        </div>
                        <h4>Smart Technology</h4>
                      </FeatureCard>
                    </div>
                  </motion.div>
                </TwoColumnGrid>
              </motion.div>
            )}
            {activeTab === "Features" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <TwoColumnGrid>
                  <motion.div variants={itemVariants}>
                    <SectionTitle>Key Features</SectionTitle>
                    <Paragraph>
                      Residents will enjoy exclusive access to world-class
                      amenities including a private spa, fitness center, wine
                      cellar, and 24-hour concierge services, establishing a new
                      benchmark for luxury residential living in New York City.
                      The residence boasts a private elevator landing, ceilings
                      over 14 feet, and a custom-designed kitchen by a
                      celebrated Italian design house.
                    </Paragraph>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <SectionTitle>Amenities</SectionTitle>
                    <FeatureCard style={{ marginBottom: "1rem" }}>
                      <div className="icon">
                        <FaExpandArrowsAlt />
                      </div>
                      <h4>Expansive Terrace</h4>
                    </FeatureCard>
                    <FeatureCard>
                      <div className="icon">
                        <FaRegBuilding />
                      </div>
                      <h4>Private Sky Lounge</h4>
                    </FeatureCard>
                  </motion.div>
                </TwoColumnGrid>
              </motion.div>
            )}
            {activeTab === "Location" && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionTitle>Location: The Heart of Manhattan</SectionTitle>
                <Paragraph>
                  Perfectly situated on West 57th Street, the residence offers
                  immediate access to the city's finest cultural institutions,
                  Michelin-starred dining, and luxury retail flagships. Central
                  Park is just steps away, serving as your own front yard. This
                  is not just an address; it's a statement.
                </Paragraph>
                <div
                  style={{
                    height: "300px",
                    background: "#e0e0e0",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ fontSize: "3rem", color: "#66a109" }}
                  />
                  <p style={{ marginLeft: "1rem", fontWeight: "500" }}>
                    Map Placeholder
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </ContentSection>
    </PageWrapper>
  );
};

export default ProjectDetail;
