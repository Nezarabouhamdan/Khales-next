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
const Title = styled.h1`
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
  transform-origin: top;
`;

const Milestone = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4rem;
  position: relative;
  width: 100%;

  .content-block {
    width: calc(50% - 2rem);
    text-align: left;
  }
  .image-block {
    width: calc(50% - 2rem);
  }

  &:nth-child(odd) {
    flex-direction: row-reverse;
    .content-block {
      text-align: right;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    align-items: center;
    .content-block,
    .image-block {
      width: 100%;
      max-width: 400px;
    }
    .content-block {
      order: 2;
      text-align: center !important;
    }
    .image-block {
      order: 1;
      margin-bottom: 1.5rem;
    }
  }
`;

const MilestoneYear = styled.div`
  position: absolute;
  top: 0;
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
const DecorativeShape = styled.div`...`;
const LightboxOverlay = styled(motion.div)`...`;
const LightboxImage = styled(motion.img)`...`;

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
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <>
      <SectionWrapper>
        <ContentContainer>
          <Header>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Khales Group
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Khales Project Management, we turn ideas into reality with
              expert architecture, construction, and fit-out solutions. No
              delays, no compromises—just results that exceed expectations.
            </motion.p>
          </Header>
          <TimelineContainer ref={timelineRef}>
            <TimelineProgress style={{ scaleY: scrollYProgress }} />
            {timelineData.map((item, index) => (
              <Milestone
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <MilestoneYear>{item.year}</MilestoneYear>
                <div className="content-block">
                  <MilestoneTitle>{item.title}</MilestoneTitle>
                  <MilestoneDescription>
                    {item.description}
                  </MilestoneDescription>
                </div>
                <div className="image-block">
                  <ImageWrapper onClick={() => setSelectedImg(item.imageUrl)}>
                    <img src={item.imageUrl} alt={item.title} />
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
              alt="Enlarged view"
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
