// components/Locations/L2.js
"use client";

import React, { useState, useMemo, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link"; // Import the Next.js Link component

// Static data that doesn't need translation
const officeImageUrls = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920",
  "https://www.workspace.co.uk/media/archive%20articles/0/banner-ban.png?width=1920&height=800&mode=crop&format=webp&quality=60",
  "https://images.unsplash.com/photo-1596496181848-3013d44113e2?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920",
];

const kenBurns = keyframes`
  0% { transform: scale(1.0); }
  100% { transform: scale(1.1); }
`;

// --- STYLED COMPONENTS ---
const rtlStyle = css`
  direction: rtl;
  unicode-bidi: plaintext;
  text-align: right;
  font-family: "Cairo", sans-serif;
  font-feature-settings: "tnum";
`;

const SectionContainer = styled.section`
  width: 100%;
  padding: 6rem 2rem;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;
  ${({ isArabic }) => isArabic && rtlStyle}
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
  gap: 3rem;
`;

const Header = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  span {
    color: #66a109;
  }
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const LocationsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const InternalLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const LocationCard = styled(motion.div)`
  background-color: #fff;
  color: #1a1a1a;
  padding: 2rem;
  border-radius: 16px;
  text-align: left;
  cursor: pointer;
  border: 2px solid #e9ecef;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  height: 100%;
  position: relative;
  overflow: hidden;

  ${({ isArabic }) => isArabic && rtlStyle}

  &.active,
  &:hover {
    transform: translateY(-8px);
    border-color: #66a109;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  }
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 32px;
  ${({ isArabic }) => (isArabic ? "left: -45px;" : "right: -45px;")}
  background-color: #66a109;
  color: white;
  padding: 6px 40px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  transform: rotate(45deg);
  transform-origin: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const IconWrapper = styled.div`
  font-size: 1.75rem;
  color: #66a109;
  margin-bottom: 1.5rem;
`;

const CityTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const AddressText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  white-space: pre-wrap;
  ${({ isArabic }) => isArabic && rtlStyle}
`;

const ImageShowcase = styled(motion.div)`
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`;

const ShowcaseImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.imageUrl});
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`;

const ImageCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: #fff;
  z-index: 2;
  ${({ isArabic }) => isArabic && rtlStyle}
  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    white-space: pre-wrap;
  }
`;

// --- MAIN COMPONENT ---
export default function OfficeLocationsFinal({ lang, content }) {
  const isArabic = lang === "ar";
  const locationsData = content?.offices || [];

  const processedLocations = useMemo(() => {
    return locationsData.map((loc, index) => ({
      city: `${loc.titlePart1} ${loc.titlePart2}`,
      address: loc.description,
      link: loc.link,
      imageUrl: officeImageUrls[index % officeImageUrls.length],
      isComingSoon: loc.isComingSoon || false,
    }));
  }, [locationsData]);

  const [activeLocation, setActiveLocation] = useState(
    processedLocations.find((loc) => !loc.isComingSoon) || processedLocations[0]
  );

  useEffect(() => {
    const firstAvailable = processedLocations.find((loc) => !loc.isComingSoon);
    if (firstAvailable) {
      setActiveLocation(firstAvailable);
    }
  }, [processedLocations]);

  if (!content || !activeLocation) {
    return null;
  }

  return (
    <SectionContainer isArabic={isArabic} dir={isArabic ? "rtl" : "ltr"}>
      <ContentWrapper
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Header>
            {content.titlePart1}
            <span>{content.titlePart2}</span>
          </Header>
        </motion.div>
        <LocationsGrid>
          {processedLocations.map((loc, index) => {
            const CardContent = (
              <LocationCard
                className={activeLocation.city === loc.city ? "active" : ""}
                onMouseEnter={() => !loc.isComingSoon && setActiveLocation(loc)}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                isArabic={isArabic}
              >
                {loc.isComingSoon && (
                  <ComingSoonBadge isArabic={isArabic}>
                    {content.comingSoonText}
                  </ComingSoonBadge>
                )}
                <IconWrapper>
                  <FaMapMarkerAlt />
                </IconWrapper>
                <CityTitle>{loc.city}</CityTitle>
                <AddressText isArabic={isArabic}>{loc.address}</AddressText>
              </LocationCard>
            );

            return loc.isComingSoon ? (
              <InternalLink href={`/${lang}${loc.link}`} key={index} passHref>
                {CardContent}
              </InternalLink>
            ) : (
              <ExternalLink
                key={index}
                href={loc.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CardContent}
              </ExternalLink>
            );
          })}
        </LocationsGrid>
        <ImageShowcase>
          <AnimatePresence mode="wait">
            <ShowcaseImage
              key={activeLocation.imageUrl}
              imageUrl={activeLocation.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <ImageCaption
              key={activeLocation.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              isArabic={isArabic}
            >
              <h3>{activeLocation.city}</h3>
            </ImageCaption>
          </AnimatePresence>
        </ImageShowcase>
      </ContentWrapper>
    </SectionContainer>
  );
}
