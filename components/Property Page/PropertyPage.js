"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBed,
  FaRulerCombined,
  FaCheck,
  FaBuilding,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import ImageWithSkeleton from "../ImageSkeleton";
import Link from "next/link";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- COLORS & VARS ---
const THEME = {
  primary: "#66a109",
  primaryHover: "#558b07",
  dark: "#1a1a1a",
  text: "#5e6d77",
  lightBg: "#f8f9fa",
  border: "#eaeaea",
  shadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
};

// --- ORIGINAL IMAGE SECTION STYLES ---

const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;

const HeroGrid = styled(motion.div)`
  margin-bottom: 3rem;
  margin-top: 2rem;

  @media (min-width: 993px) {
    display: grid;
    grid-template-columns: 550px 1fr;
    gap: 1rem;
    height: 550px;
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  background-color: #f0f0f0;

  img {
    animation: ${kenBurns} 20s ease-in-out infinite alternate;
    transition: transform 0.3s ease !important;
  }
  &:hover img {
    transform: scale(1.05) !important;
  }
`;

const DesktopMainImage = styled(ImageWrapper)`
  grid-row: span 2;
  cursor: default;
  height: 100%;
  position: relative;

  @media (max-width: 992px) {
    display: none;
  }
  &:hover img {
    transform: none !important;
  }
`;

const DesktopSubImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 270px; // Fixed height for rows
  gap: 1rem;
  overflow-y: auto;
  padding-right: 5px; // Space for scrollbar

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const MobileImageContainer = styled.div`
  width: 100%;
  height: 380px;
  position: relative;
`;

const MobileSwiperWrapper = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  .swiper {
    border-radius: 16px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: ${THEME.primary};
    background: rgba(255, 255, 255, 0.7);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    &:after {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .swiper-pagination-bullet-active {
    background-color: ${THEME.primary};
  }
`;

// --- NEW PROFESSIONAL LAYOUT STYLES ---

const SectionContainer = styled.section`
  margin-top: 10vh;
  width: 100%;
  padding-bottom: 6rem;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  color: ${THEME.dark};

  @media (max-width: 992px) {
    margin-top: 15vh;
    padding-bottom: 3rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 4rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 320px;
    gap: 2rem;
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column;
  }
`;

const LeftContent = styled(motion.div)``;

const SidebarWrapper = styled(motion.div)`
  position: relative;
  @media (min-width: 993px) {
    height: fit-content;
    position: sticky;
    top: 120px;
  }
`;

const Badge = styled.span`
  background-color: rgba(102, 161, 9, 0.1);
  color: ${THEME.primary};
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #888;
  margin-bottom: 0; // Removed margin to fit new layout better
  font-size: 1.05rem;
  svg {
    color: ${THEME.primary};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${THEME.border};
  margin: 2.5rem 0;
  width: 100%;
`;

const SubHeading = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: ${THEME.dark};
`;

const TextBlock = styled.div`
  line-height: 1.8;
  color: ${THEME.text};
  font-size: 1.05rem;
  white-space: pre-line;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FeatureChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background-color: ${THEME.lightBg};
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${THEME.dark};
  svg {
    color: ${THEME.primary};
    flex-shrink: 0;
  }
`;

const SidebarCard = styled.div`
  background: #ffffff;
  border: 1px solid ${THEME.border};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${THEME.shadow};
  @media (max-width: 992px) {
    margin-bottom: 3rem;
    box-shadow: none;
    background: ${THEME.lightBg};
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: ${THEME.lightBg};
  border-radius: 12px;
  text-align: center;
  border: 1px solid transparent;
  transition: 0.2s;
  &:hover {
    border-color: ${THEME.primary};
    background: #fff;
  }
  .icon {
    font-size: 1.5rem;
    color: ${THEME.text};
    margin-bottom: 0.5rem;
  }
  .value {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${THEME.dark};
  }
  .label {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
  }
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const HighlightRow = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px dashed ${THEME.border};
  font-size: 0.95rem;
  span:first-child {
    color: ${THEME.text};
  }
  span:last-child {
    font-weight: 600;
    color: ${THEME.dark};
  }
  &:last-child {
    border-bottom: none;
  }
`;

const ContactBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${THEME.primary};
  color: white;
  padding: 1.1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 161, 9, 0.3);

  &:hover {
    background-color: ${THEME.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 161, 9, 0.4);
  }

  svg {
    transition: transform 0.2s;
  }
  &:hover svg {
    transform: ${({ lang }) =>
      lang === "ar" ? "translateX(-4px)" : "translateX(4px)"};
  }
`;

// --- COMPONENT ---

export default function PropertyPage({ project, lang }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isAr = lang === "ar";

  if (!project) return <div>Loading...</div>;

  const projectData = project[lang] || project.en;
  const gallery = project.galleryImages || [];

  if (!projectData) return <div>Content not found.</div>;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer lang={lang}>
      <ContentWrapper>
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge>{isAr ? "مشروع مميز" : "Featured Project"}</Badge>
          <Title>{projectData.title}</Title>
          <AddressRow>
            <FaMapMarkerAlt />
            <span>{projectData.address}</span>
          </AddressRow>
        </motion.div>

        {/* --- RESTORED ORIGINAL GALLERY LAYOUT --- */}
        <HeroGrid>
          {/* Main Desktop Image */}
          {gallery.length > 0 && (
            <DesktopMainImage as={motion.div} variants={itemVariants}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                >
                  <ImageWithSkeleton
                    src={gallery[currentImageIndex]}
                    alt={`${projectData.title} view`}
                    fill
                    priority
                    quality={90}
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              </AnimatePresence>
            </DesktopMainImage>
          )}

          {/* Side Thumbnail Grid (Click to swap) */}
          {gallery.length > 1 && (
            <DesktopSubImageGrid>
              {gallery
                .filter((_, index) => index !== currentImageIndex)
                .map((imgSrc) => {
                  const originalIndex = gallery.indexOf(imgSrc);
                  return (
                    <ImageWrapper
                      as={motion.div}
                      variants={itemVariants}
                      key={imgSrc}
                      onClick={() => setCurrentImageIndex(originalIndex)}
                    >
                      <img
                        src={imgSrc}
                        alt="Thumbnail"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </ImageWrapper>
                  );
                })}
            </DesktopSubImageGrid>
          )}

          {/* Mobile Swiper */}
          {gallery.length > 0 && (
            <MobileSwiperWrapper>
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                spaceBetween={10}
                navigation
                pagination={{ clickable: true }}
                loop={gallery.length > 1}
              >
                {gallery.map((imgSrc, i) => (
                  <SwiperSlide key={i}>
                    <MobileImageContainer>
                      <ImageWithSkeleton
                        src={imgSrc}
                        alt="Gallery Image"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </MobileImageContainer>
                  </SwiperSlide>
                ))}
              </Swiper>
            </MobileSwiperWrapper>
          )}
        </HeroGrid>

        {/* --- MAIN LAYOUT (New Professional Style) --- */}
        <MainLayout>
          <LeftContent
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <SubHeading>
              {isAr ? "نبدة عن المشروع" : "About the Project"}
            </SubHeading>
            <TextBlock>{projectData.longDescription}</TextBlock>

            <Divider />

            {projectData.keyFeatures?.length > 0 && (
              <>
                <SubHeading>
                  {isAr ? "الميزات والخدمات" : "Amenities & Features"}
                </SubHeading>
                <FeatureGrid>
                  {projectData.keyFeatures.map((feat, i) => (
                    <FeatureChip key={i}>
                      <FaCheck /> {feat}
                    </FeatureChip>
                  ))}
                </FeatureGrid>
                <Divider />
              </>
            )}
          </LeftContent>

          {/* Sticky Sidebar */}
          <SidebarWrapper
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <SidebarCard>
              <StatGrid>
                {project.id !== 6 && project.id !== 8 && project.id !== 11 && (
                  <StatBox>
                    <FaBed className="icon" />
                    <span className="value">{projectData.beds}</span>
                    <span className="label">{isAr ? "غرف نوم" : "Beds"}</span>
                  </StatBox>
                )}

                {projectData.floor && (
                  <StatBox>
                    <FaBuilding className="icon" />
                    <span className="value">{projectData.floor}</span>
                    <span className="label">{isAr ? "طابق" : "Floor"}</span>
                  </StatBox>
                )}

                <StatBox style={{ gridColumn: "span 2" }}>
                  <FaRulerCombined className="icon" />
                  <span className="value">{projectData.sqft}</span>
                  <span className="label">
                    {isAr ? "المساحة (قدم مربع)" : "Square Feet"}
                  </span>
                </StatBox>
              </StatGrid>

              {projectData.highlights?.length > 0 && (
                <HighlightsList>
                  {projectData.highlights.map((h, i) => (
                    <HighlightRow key={i}>
                      <span>{h.label}</span>
                      <span>{h.value}</span>
                    </HighlightRow>
                  ))}
                </HighlightsList>
              )}

              <ContactBtn href={`/${lang}/Contact`} lang={lang}>
                {isAr ? "تواصل معنا للإستفسار" : "Enquire Now"}
                {isAr ? <FaArrowLeft /> : <FaArrowRight />}
              </ContactBtn>
            </SidebarCard>
          </SidebarWrapper>
        </MainLayout>
      </ContentWrapper>
    </SectionContainer>
  );
}
