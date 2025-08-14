"use client";

import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Keyframes and most styled-components remain the same.
// Only the components that depend on `lang` for direction are shown for brevity.
// The full code is provided at the end.

const kenBurns = keyframes`
  0% { transform: scale(1.0); } 100% { transform: scale(1.1); }
`;

const PageWrapper = styled.div`
  background-color: #ffffff;
  font-family: ${({ lang }) =>
    lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"};
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  position: relative;
  overflow-x: hidden;
`;

// --- (Include all other styled components from your original code here) ---
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
      rgba(18, 18, 18, 0) 0%,
      rgba(18, 18, 18, 0) 50%,
      rgba(18, 18, 18, 0) 100%
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
  line-height: 1.4;
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
  text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
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
      margin: 0;
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
    text-align: ${({ lang }) => (lang === "ar" ? "right" : "left")};
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
      margin: ${({ lang }) => (lang === "ar" ? "0 auto 0 0" : "0 0 0 auto")};
      margin-left: ${({ lang }) => (lang === "ar" ? "auto" : "0")};
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

const ProjectTypePageClient = ({ lang, content }) => {
  // Destructure content from props, not a static object
  const { header, gallery, overview, challenges, labels } = content;

  const galleryRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Define arrows based on language direction
  const LeftArrowIcon = lang === "ar" ? FaArrowRight : FaArrowLeft;
  const RightArrowIcon = lang === "ar" ? FaArrowLeft : FaArrowRight;

  const checkScrollability = () => {
    const el = galleryRef.current;
    if (el) {
      // Consistent logic regardless of RTL
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
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
      // Invert scroll direction for RTL
      const scrollValue = direction === "left" ? -scrollAmount : scrollAmount;

      el.scrollBy({
        left: scrollValue,
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
    <PageWrapper lang={lang}>
      <HeaderSection>
        <img src={header.bgImage} alt={header.title} className="bg-image" />
        <HeaderContentContainer
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <HeaderTag variants={itemVariants}>{header.tag}</HeaderTag>
          <MainTitle variants={itemVariants}>{header.title}</MainTitle>
          <TitleUnderline variants={itemVariants} />
          <MetaGrid variants={itemVariants} lang={lang}>
            <div>
              <span>{labels.year}</span>
              <p>{header.year}</p>
            </div>
            <div>
              <span>{labels.location}</span>
              <p>{header.location}</p>
            </div>
            <div>
              <span>{labels.services}</span>
              <p>{header.services}</p>
            </div>
          </MetaGrid>
        </HeaderContentContainer>
      </HeaderSection>

      <MainContentSection>
        <MaxWidthContainer>
          <SectionHeader
            lang={lang}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <div className="title-container">
              <h2>{gallery.title}</h2>
              <div />
            </div>
            <NavArrows>
              <ArrowButton
                onClick={() => handleNavClick("left")}
                disabled={!canScrollLeft}
                aria-label={labels.scrollLeft}
              >
                <LeftArrowIcon />
              </ArrowButton>
              <ArrowButton
                onClick={() => handleNavClick("right")}
                disabled={!canScrollRight}
                aria-label={labels.scrollRight}
              >
                <RightArrowIcon />
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
            {gallery.images.map((src, i) => (
              <GalleryImage key={i} whileHover={{ y: -10 }}>
                <img src={src} alt={`${gallery.title} ${i + 1}`} />
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
              <img src={overview.image} alt={overview.title} />
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
              <img src={challenges.image} alt={challenges.title} />
            </ImageWrapper>
          </ContentBlock>
        </MaxWidthContainer>
      </MainContentSection>
    </PageWrapper>
  );
};

export default ProjectTypePageClient;
