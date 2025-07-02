// components/FullCaseStudyPage.jsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView } from "framer-motion";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

//================================================================
// 1. DATA FOR THE COMPONENT
//================================================================
const caseStudyData = {
  header: {
    tag: "CASE STUDY",
    title: "Luxury Home Mountain View Estate",
    year: "2023",
    location: "Mountain View, CA",
    services: "Architecture & Design",
    bgImage:
      "https://images.unsplash.com/photo-1600585152225-3582437e8967?auto=format&fit=crop&q=80",
  },
  gallery: [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80",
  ],
  overview: {
    title: "Project Overview",
    text: [
      "This project involved the ground-up design and construction of a 7,000 sq. ft. luxury estate in Mountain View. The primary goal was to create a residence that harmonized with its natural surroundings while offering state-of-the-art amenities and uncompromising comfort.",
      "Our team oversaw every phase, from initial concept and architectural blueprints to interior design and landscape integration, ensuring a seamless and holistic final product.",
    ],
    tag: "LUXURY REDEFINED",
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80",
  },
  challenges: {
    title: "Challenges & Solutions",
    text: "The project's hillside location presented unique structural and logistical challenges. Our primary objective was to maximize panoramic views while ensuring structural integrity and minimizing environmental impact.",
    solutions: [
      "Innovative structural engineering for the cantilevered viewing decks.",
      "Sustainable, locally-sourced materials and energy-efficient systems.",
      "Seamless integration with the natural landscape through extensive terrain analysis.",
    ],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
  },
};

const kenBurns = keyframes`
  0% { transform: scale(1.0); } 100% { transform: scale(1.1); }
`;

//================================================================
// 2. STYLED COMPONENTS (MERGED AND REFINED)
//================================================================

const PageWrapper = styled.div`
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  position: relative;
  overflow-x: hidden;
`;

// --- Hero Banner Styles ---
const HeaderSection = styled.header`
  background-color: #121212;
  color: #fff;
  padding: 8rem 2rem 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
    animation: ${kenBurns} 20s ease-in-out infinite alternate;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(
      to top,
      rgba(18, 18, 18, 1) 0%,
      rgba(18, 18, 18, 0.7) 50%,
      rgba(18, 18, 18, 0.9) 100%
    );
  }
`;

const HeaderContentContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const HeaderTag = styled(motion.p)`
  color: #66a109;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MainTitle = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 80px;
  font-weight: 700;
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TitleUnderline = styled(motion.div)`
  width: 80px;
  height: 3px;
  background-color: #66a109;
  margin: 0 auto 2.5rem;
`;

const MetaGrid = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3rem;
  text-align: left;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  div {
    span {
      display: block;
      font-size: 0.8rem;
      text-transform: uppercase;
      opacity: 0.7;
    }
    p {
      font-size: 1rem;
      font-weight: 500;
    }
  }
`;

// --- Main Content Styles ---
const MainContentSection = styled.section`
  padding-bottom: 5rem;
`;

const MaxWidthContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-top: 5rem;

  .title-container {
    text-align: left;
    h2 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #1a1a1a;
    }
    div {
      width: 80px;
      height: 3px;
      background-color: #66a109;
    }
  }
`;

const NavArrows = styled.div`
  display: flex;
  gap: 1rem;
`;

const ArrowButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: scale(1);
  }
  &:not(:disabled):hover {
    background-color: #66a109;
    border-color: #66a109;
    color: #fff;
    transform: scale(1.05);
  }
`;

const GalleryWrapper = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  margin: 0 -2rem 10rem -2rem; /* Allow gallery to bleed out */
`;

const GalleryScrollContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  width: max-content;
`;

const GalleryImage = styled(motion.div)`
  flex-shrink: 0;
  width: 400px;
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
  @media (max-width: 768px) {
    width: 300px;
    height: 200px;
  }
`;

const ContentBlock = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5rem;
  margin-bottom: 10rem;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  @media (max-width: 992px) {
    flex-direction: column-reverse;
    gap: 3rem;
  }
`;

const TextWrapper = styled(motion.div)`
  flex: 1.2;
  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }
  p {
    font-size: 1.05rem;
    line-height: 1.9;
    color: #555;
  }
  .tag {
    color: #1a1a1a;
    font-weight: 600;
    letter-spacing: 1px;
    margin-top: 1.5rem;
    display: inline-block;
  }
`;

const ImageWrapper = styled(motion.div)`
  flex: 1;
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StyledList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-size: 1.05rem;
    line-height: 1.8;
    color: #333;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    .icon {
      color: #66a109;
      margin-top: 6px;
      flex-shrink: 0;
    }
  }
`;

const FloatingActions = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 50;
`;

const ActionButton = styled(motion.a)`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #66a109;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(102, 161, 9, 0.4);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(102, 161, 9, 0.5);
  }
`;

//================================================================
// 3. MAIN COMPONENT
//================================================================
const FullCaseStudyPage = () => {
  const { header, gallery, overview, challenges } = caseStudyData;

  const galleryRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = galleryRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10); // Use a small buffer
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = galleryRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
      return () => {
        el.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, []);

  const handleNavClick = (direction) => {
    const el = galleryRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
    <PageWrapper>
      <HeaderSection>
        <img
          src={header.bgImage}
          alt="Architectural background"
          className="bg-image"
        />
        <HeaderContentContainer
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <HeaderTag variants={itemVariants}>{header.tag}</HeaderTag>
          <MainTitle variants={itemVariants}>{header.title}</MainTitle>
          <TitleUnderline variants={itemVariants} />
          <MetaGrid variants={itemVariants}>
            <div>
              <span>Year</span>
              <p>{header.year}</p>
            </div>
            <div>
              <span>Location</span>
              <p>{header.location}</p>
            </div>
            <div>
              <span>Services</span>
              <p>{header.services}</p>
            </div>
          </MetaGrid>
        </HeaderContentContainer>
      </HeaderSection>

      <MainContentSection>
        <MaxWidthContainer>
          <SectionHeader
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <div className="title-container">
              <h2>Project Gallery</h2>
              <div />
            </div>
            <NavArrows>
              <ArrowButton
                onClick={() => handleNavClick("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <FaArrowLeft />
              </ArrowButton>
              <ArrowButton
                onClick={() => handleNavClick("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <FaArrowRight />
              </ArrowButton>
            </NavArrows>
          </SectionHeader>
        </MaxWidthContainer>

        <GalleryWrapper
          ref={galleryRef}
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <GalleryScrollContainer>
            {gallery.map((src, i) => (
              <GalleryImage key={i} whileHover={{ y: -10 }}>
                <img src={src} alt={`Project gallery image ${i + 1}`} />
              </GalleryImage>
            ))}
          </GalleryScrollContainer>
        </GalleryWrapper>

        <MaxWidthContainer>
          <ContentBlock
            as={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <TextWrapper variants={itemVariants}>
              <h3>{overview.title}</h3>
              {overview.text.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="tag">{overview.tag}</p>
            </TextWrapper>
            <ImageWrapper variants={itemVariants}>
              <img src={overview.image} alt="Luxury interior design" />
            </ImageWrapper>
          </ContentBlock>

          <ContentBlock
            reverse
            as={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <TextWrapper variants={itemVariants}>
              <h3>{challenges.title}</h3>
              <p>{challenges.text}</p>
              <StyledList>
                {challenges.solutions.map((s, i) => (
                  <li key={i}>
                    <FaCheckCircle className="icon" /> {s}
                  </li>
                ))}
              </StyledList>
            </TextWrapper>
            <ImageWrapper variants={itemVariants}>
              <img src={challenges.image} alt="Architectural solutions" />
            </ImageWrapper>
          </ContentBlock>
        </MaxWidthContainer>
      </MainContentSection>
    </PageWrapper>
  );
};

export default FullCaseStudyPage;
