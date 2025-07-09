// components/PropertyPage.jsx
"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { useLanguage } from "../../Context/Languagecontext";

// Import Swiper for the mobile gallery
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// This is just for the "Similar Projects" example.
// In a real app, you would fetch this data or filter it from your main data source.
const similarListingsData = [
  {
    price: "12,750,000",
    address: "2024 West Coast, London, CA 90420",
    beds: 4,
    baths: 5,
    sqft: "5,210",
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80",
  },
  {
    price: "11,790,000",
    address: "26724 Villa Court, London, CA 90410",
    beds: 4,
    baths: 5,
    sqft: "5,210",
    imageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80",
  },
  {
    price: "12,758,000",
    address: "26500 Alan Crest, London, CA 90410",
    beds: 4,
    baths: 5,
    sqft: "5,170",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80",
  },
];

const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;

const PropertyPage = ({ project }) => {
  const { language } = useLanguage();

  if (!project) {
    return <div>Loading project...</div>;
  }

  const projectData = project[language];
  const gallery = project.galleryImages || [];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer lang={language}>
      <ContentWrapper>
        <HeroGrid>
          {/* --- Desktop Grid View (Hidden on mobile) --- */}
          <DesktopMainImage as={motion.div} variants={itemVariants}>
            <img src={gallery[0]} alt={projectData.title} />
          </DesktopMainImage>
          <DesktopSubImageGrid>
            {gallery.slice(1, 5).map((imgSrc, i) => (
              <ImageWrapper as={motion.div} variants={itemVariants} key={i}>
                <img src={imgSrc} alt={`${projectData.title} view ${i + 1}`} />
              </ImageWrapper>
            ))}
          </DesktopSubImageGrid>

          {/* --- Mobile Swiper Gallery (Hidden on desktop) --- */}
          <MobileSwiperWrapper>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={10}
              navigation
              pagination={{ clickable: true }}
            >
              {gallery.map((imgSrc, i) => (
                <SwiperSlide key={i}>
                  <MobileImageContainer>
                    <img
                      src={imgSrc}
                      alt={`${projectData.title} gallery image ${i + 1}`}
                    />
                  </MobileImageContainer>
                </SwiperSlide>
              ))}
            </Swiper>
          </MobileSwiperWrapper>
        </HeroGrid>

        <DetailsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <LeftColumn as={motion.div} variants={itemVariants}>
            <PropertyTitle>{projectData.title}</PropertyTitle>
            <Address>{projectData.address}</Address>
            <Price>
              <p>{language === "ar" ? "يبدأ من" : "Starting from"}</p>
              <h2>${projectData.price}</h2>
            </Price>
            <Subheading>
              {language === "ar" ? "وصف المشروع" : "House Description"}
            </Subheading>
            <Description>{projectData.longDescription}</Description>
          </LeftColumn>
          <RightColumn as={motion.div} variants={itemVariants}>
            <Stats>
              <StatItem>
                <span className="icon">
                  <FaBed />
                </span>
                <div>
                  <strong>{projectData.beds}</strong>
                  <br />
                  {language === "ar" ? "غرف" : "Bed"}
                </div>
              </StatItem>
              <StatItem>
                <span className="icon">
                  <FaBath />
                </span>
                <div>
                  <strong>{projectData.baths}</strong>
                  <br />
                  {language === "ar" ? "حمامات" : "Bath"}
                </div>
              </StatItem>
              <StatItem>
                <span className="icon">
                  <FaRulerCombined />
                </span>
                <div>
                  <strong>{projectData.sqft}</strong>
                  <br />
                  {language === "ar" ? "قدم مربع" : "SqFt"}
                </div>
              </StatItem>
            </Stats>
            <Subheading>
              {language === "ar" ? "أبرز الميزات" : "Highlights"}
            </Subheading>
            <HighlightsTable>
              {projectData.highlights.map((item, i) => (
                <HighlightRow
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  transition={{ delay: i * 0.1 }}
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </HighlightRow>
              ))}
            </HighlightsTable>
            <ContactButton href="#">
              {language === "ar" ? "تواصل معنا" : "Contact us"}{" "}
              <span className="arrow">→</span>
            </ContactButton>
          </RightColumn>
        </DetailsGrid>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SimilarListings>
            <motion.h2 variants={itemVariants}>
              {language === "ar" ? "مشاريع مشابهة" : "Similar Projects"}
            </motion.h2>
            <ListingsGrid>
              {similarListingsData.map((item, i) => (
                <PropertyCard key={i} variants={itemVariants}>
                  <div className="card-image">
                    <img src={item.imageUrl} alt={item.address} />
                  </div>
                  <div className="card-content">
                    <p className="price">${item.price}</p>
                    <p className="address">{item.address}</p>
                    <div className="stats">
                      <span>{item.beds} BEDS</span> •{" "}
                      <span>{item.baths} BATHS</span> •{" "}
                      <span>{item.sqft} SQFT</span>
                    </div>
                  </div>
                </PropertyCard>
              ))}
            </ListingsGrid>
            <motion.div variants={itemVariants}>
              <ViewAllButton href="#">
                {language === "ar" ? "عرض كل المشاريع" : "View All Properties"}
              </ViewAllButton>
            </motion.div>
          </SimilarListings>
        </motion.div>
      </ContentWrapper>
    </SectionContainer>
  );
};

// --- STYLED COMPONENTS ---
const SectionContainer = styled.section`
  margin-top: 10vh;
  width: 100%;
  padding: 4rem 2rem;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  @media (max-width: 992px) {
    padding: 2rem 1rem;
    margin-top: 8vh;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroGrid = styled(motion.div)`
  margin-bottom: 3rem;
  @media (min-width: 993px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    height: 550px;
  }
`;

const MobileSwiperWrapper = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
  .swiper {
    border-radius: 16px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #66a109;
    --swiper-navigation-size: 30px;
  }
  .swiper-pagination-bullet-active {
    background-color: #66a109;
  }
`;

const MobileImageContainer = styled.div`
  width: 100%;
  height: 350px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 16px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${kenBurns} 20s ease-in-out infinite alternate;
  }
`;

const DesktopMainImage = styled(ImageWrapper)`
  grid-row: span 2;
  @media (max-width: 992px) {
    display: none;
  }
`;

const DesktopSubImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  grid-row: span 2;
  @media (max-width: 992px) {
    display: none;
  }
`;

const DetailsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const LeftColumn = styled.div``;

const RightColumn = styled.div``;

const PropertyTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Address = styled.p`
  color: #555;
  margin-bottom: 2rem;
`;

const Price = styled.div`
  margin-bottom: 2rem;
  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1a1a1a;
  }
  p {
    color: #66a109;
    font-weight: 500;
  }
`;

const Subheading = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  line-height: 1.8;
  color: #495057;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  .icon {
    font-size: 1.5rem;
    color: #555;
  }
  div {
    line-height: 1.2;
  }
  strong {
    font-size: 1.25rem;
    color: #1a1a1a;
  }
`;

const HighlightsTable = styled.div`
  margin-bottom: 2rem;
`;

const HighlightRow = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
  span:first-child {
    color: #555;
  }
  span:last-child {
    font-weight: 500;
    color: #1a1a1a;
  }
`;

const ContactButton = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #66a109;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.3);
    transform: translateY(-3px);
  }
`;

const SimilarListings = styled.div`
  text-align: center;
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  text-align: left;
  margin-bottom: 2.5rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PropertyCard = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  .card-image {
    height: 250px;
  }
  .card-content {
    padding: 1.5rem;
  }
  .price {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .address {
    color: #555;
    margin-bottom: 1rem;
  }
  .stats {
    display: flex;
    gap: 1rem;
    color: #555;
    font-size: 0.9rem;
  }
`;

const ViewAllButton = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background-color: #1a1a1a;
    color: white;
  }
`;

export default PropertyPage;
