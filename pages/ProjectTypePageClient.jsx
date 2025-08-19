"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ImageWithSkeleton from "@/components/ImageSkeleton";
// 1. IMPORT THE CTA SECTION COMPONENT
import CTASection from "@/components/Homecontact/CTASection";

// ... All styled-components and variants remain the same ...
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.5 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
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
const HeaderSection = styled.header`
  background-color: #121212;
  color: #fff;
  padding: 8rem 2rem 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  .bg-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    opacity: 0.85;
    will-change: transform, opacity;
    animation: ${kenBurns} 25s ease-in-out infinite alternate;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
      to top,
      rgba(18, 18, 18, 0.8) 0%,
      rgba(18, 18, 18, 0.4) 50%,
      rgba(18, 18, 18, 0.8) 100%
    );
  }
`;
const HeaderContentContainer = styled(motion.div)`
  position: relative;
  z-index: 3;
  max-width: 800px;
  margin: 0 auto;
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
  margin: 0 -2rem 10rem -2rem;
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
  will-change: transform;
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
const ImageWrapper = styled(motion.div)`
  flex: 1;
  position: relative;
  height: auto;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  @media (max-width: 992px) {
    width: 100%;
    aspect-ratio: 16 / 10;
  }
`;
const HeaderTag = styled(motion.p)`
  color: #66a109;
  font-weight: 600;
  margin-bottom: 1rem;
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

// 2. ACCEPT THE ctaContent PROP
const ProjectTypePageClient = ({ lang, content, ctaContent }) => {
  if (!content || !ctaContent) {
    return null;
  }

  const { header, gallery, overview, challenges, labels } = content;

  const galleryRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const LeftArrowIcon = lang === "ar" ? FaArrowRight : FaArrowLeft;
  const RightArrowIcon = lang === "ar" ? FaArrowLeft : FaArrowRight;

  const checkScrollability = useCallback(() => {
    const el = galleryRef.current;
    if (el) {
      const scrollLeft = Math.ceil(el.scrollLeft);
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;

      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const debounceTimeout = useRef(null);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const debouncedCheck = () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        checkScrollability();
      }, 150);
    };

    checkScrollability();
    el.addEventListener("scroll", debouncedCheck, { passive: true });
    window.addEventListener("resize", debouncedCheck, { passive: true });

    return () => {
      el.removeEventListener("scroll", debouncedCheck);
      window.removeEventListener("resize", debouncedCheck);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [checkScrollability]);

  const handleNavClick = (direction) => {
    const el = galleryRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      const scrollValue = direction === "left" ? -scrollAmount : scrollAmount;
      el.scrollBy({ left: scrollValue, behavior: "smooth" });
    }
  };

  return (
    <PageWrapper lang={lang}>
      <HeaderSection>
        <div className="bg-image-wrapper">
          <ImageWithSkeleton
            src={header.bgImage}
            alt={header.title}
            priority={true}
            sizes="100vw"
          />
        </div>
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
              <GalleryImage
                key={i}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <ImageWithSkeleton
                  src={src}
                  alt={`${gallery.title} ${i + 1}`}
                  sizes="(max-width: 768px) 300px, 400px"
                />
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
              <ImageWithSkeleton
                src={overview.image}
                alt={overview.title}
                sizes="(max-width: 992px) 100vw, 50vw"
              />
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
              <ImageWithSkeleton
                src={challenges.image}
                alt={challenges.title}
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </ImageWrapper>
          </ContentBlock>
        </MaxWidthContainer>
      </MainContentSection>

      {/* 3. RENDER THE CTA SECTION AT THE END OF THE PAGE */}
      <CTASection lang={lang} content={ctaContent} />
    </PageWrapper>
  );
};

export default ProjectTypePageClient;
