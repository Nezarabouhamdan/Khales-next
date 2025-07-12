// components/AboutKhalesGroupInteractive.jsx
"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

//================================================================
// DATA
//================================================================
const timelineData = [
  {
    year: "2018",
    title: "Our Beginnings",
    description:
      "Khales Group was founded with a vision to redefine luxury construction in the region.",
    imageUrl: "https://i.ibb.co/v4S8JftQ/aboutus4.jpg",
  },
  {
    year: "2020",
    title: "First Major Project",
    description:
      "Successfully delivered our flagship commercial tower, setting a new benchmark for quality.",
    imageUrl: "https://i.ibb.co/jPgtTSzr/aboutus3.jpg",
  },
  {
    year: "2022",
    title: "Expanding the Team",
    description:
      "Our family grew, bringing in top-tier architects and project managers.",
    imageUrl: "https://i.ibb.co/XftcdnrY/aboutus2.jpg",
  },
  {
    year: "2024",
    title: "A Vision for the Future",
    description:
      "Continuing our commitment to excellence, innovation, and sustainable design.",
    imageUrl: "https://i.ibb.co/7tKV3xP1/aboutus5.jpg",
  },
];

//================================================================
// STYLED COMPONENTS
//================================================================
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
`;
const ContentContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;
const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
`;
const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;
const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
`;
const TimelineContainer = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: #e0e0e0;
    z-index: 1;
  }
`;
const TimelineProgress = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  background-color: #66a109;
  z-index: 2;
`;
const Milestone = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;
  &:nth-child(even) {
    .content {
      order: 3;
    }
    .image {
      order: 1;
    }
  }
`;
const MilestoneContent = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
`;
const YearBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #66a109;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-weight: 600;
  z-index: 3;
`;

const MilestoneTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const MilestoneDescription = styled.p`
  color: #555;
  line-height: 1.7;
`;
const ImageWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
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
const DecorativeShape = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #66a109, #8bc34a);
  border-radius: 50%;
  opacity: 0.1;
  top: 10%;
  right: -100px;
  z-index: 1;
`;
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;
const LightboxImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90%;
  border-radius: 16px;
  cursor: default;
`;

//================================================================
// MAIN COMPONENT
//================================================================
const AboutKhalesGroupInteractive = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <SectionWrapper>
        <DecorativeShape />
        <ContentContainer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Header variants={itemVariants}>
            <Title>Our Journey</Title>
            <Paragraph>
              From humble beginnings to industry leaders, discover the
              milestones that have shaped Khales Group into the trusted name it
              is today.
            </Paragraph>
          </Header>
          <TimelineContainer ref={timelineRef}>
            <TimelineProgress style={{ height: progressHeight }} />
            {timelineData.map((item, index) => (
              <Milestone
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="content">
                  <MilestoneContent>
                    <MilestoneTitle>{item.title}</MilestoneTitle>
                    <MilestoneDescription>
                      {item.description}
                    </MilestoneDescription>
                  </MilestoneContent>
                </div>
                <YearBadge>{item.year}</YearBadge>
                <div className="image">
                  <ImageWrapper onClick={() => setSelectedImg(item.imageUrl)}>
                    <img
                      src={item.imageUrl}
                      alt={`${item.title} - Khales Group milestone from ${item.year}`}
                    />
                  </ImageWrapper>
                </div>
              </Milestone>
            ))}
          </TimelineContainer>
        </ContentContainer>
      </SectionWrapper>
      <AnimatePresence>
        {selectedImg && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <LightboxImage
              src={selectedImg}
              alt="Enlarged view of Khales Group milestone"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutKhalesGroupInteractive;
