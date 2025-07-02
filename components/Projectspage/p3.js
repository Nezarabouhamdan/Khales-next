// components/PropertyListingMinimal.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useInView, animate } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTwitter,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";

//================================================================
// DYNAMIC DATA
//================================================================
const imageUrls = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1617104679222-35635a939a9c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80",
];

const similarListingsData = [
  {
    title: "Luxury Estate",
    price: "$12,750,000",
    address: "2024 Vista Court, London, CA 95476",
    featured: true,
  },
  {
    title: "Modern Villa",
    price: "$18,500,000",
    address: "1128 Harbor View, Malibu, CA 90265",
    featured: false,
  },
  {
    title: "Oceanfront Home",
    price: "$21,200,000",
    address: "850 Bayfront Ave, Newport Beach, CA 92662",
    featured: false,
  },
];

//================================================================
// 1. HORIZONTAL IMAGE CAROUSEL COMPONENT
//================================================================
const CarouselWrapper = styled(motion.div)`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: 3rem;
  margin-bottom: 5rem;
  cursor: grab;
  overflow: hidden;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
`;

const ImageItem = styled(motion.div)`
  flex: 0 0 30%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* FIX: This allows the parent track to capture drag events */
    pointer-events: none;
  }

  @media (max-width: 992px) {
    flex: 0 0 50%;
  }
  @media (max-width: 768px) {
    flex: 0 0 75%;
  }
`;

const ImageCarousel = ({ images }) => {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    if (trackRef.current && wrapperRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const wrapperWidth = wrapperRef.current.offsetWidth;
      setDragConstraint(wrapperWidth - trackWidth - 32);
    }
  }, [images]);

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <CarouselWrapper ref={wrapperRef} whileTap={{ cursor: "grabbing" }}>
      <CarouselTrack
        ref={trackRef}
        drag="x"
        dragConstraints={{ right: 0, left: dragConstraint }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {images.map((url, index) => (
          <ImageItem
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <img src={url} alt={`Property view ${index + 1}`} />
          </ImageItem>
        ))}
      </CarouselTrack>
    </CarouselWrapper>
  );
};

//================================================================
// 2. MAIN PAGE STYLED COMPONENTS
//================================================================
const PageWrapper = styled.section`
  padding: 5rem 2rem 0;
  background-color: #ffffff;
  position: relative;
  overflow-x: hidden;
  font-family: "Inter", sans-serif;
  @media (max-width: 992px) {
    padding: 3rem 1.5rem 0;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Header = styled.div`
  margin-bottom: 2rem;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
const Address = styled.p`
  color: #555;
  margin-top: 0.5rem;
`;
const Status = styled.p`
  color: #555;
  margin-top: 1.5rem;
  span {
    font-weight: 500;
    color: #1a1a1a;
  }
`;
const Price = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 0.5rem;
`;
const StatsBar = styled.div`
  display: flex;
  gap: 2.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e9ecef;
  width: 100%;
  justify-content: center;
`;
const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  .icon {
    font-size: 1.25rem;
    color: #555;
  }
  span {
    font-size: 1rem;
    font-weight: 500;
  }
`;
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  width: 100%;
  text-align: left;
  margin-bottom: 4rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;
const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #495057;
`;
const HighlightsCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
`;
const HighlightRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
  &:last-child {
    border: none;
  }
  span:first-child {
    color: #555;
  }
  span:last-child {
    font-weight: 500;
    color: #1a1a1a;
  }
`;
const ContactButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  background-color: #66a109;
  color: white;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.3);
    transform: translateY(-3px);
  }
`;
const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: center;
  a {
    color: #555;
    transition: color 0.3s ease;
    &:hover {
      color: #66a109;
    }
  }
`;
const SimilarListings = styled.div`
  width: 100%;
  padding-bottom: 5rem;
`;
const SimilarTitle = styled(SectionTitle)`
  text-align: center;
  position: relative;
  &::after {
    content: "";
    height: 2px;
    width: 40px;
    background: #66a109;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const ListingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 3rem 0;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const ListingCard = styled(motion.div)`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  h3 {
    transition: color 0.3s ease;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    h3 {
      color: #66a109;
    }
  }
`;
const FeaturedTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #e8f5e9;
  color: #66a109;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-weight: 500;
  font-size: 0.8rem;
`;
const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`;
const CardPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #1a1a1a;
  margin-top: 1rem;
`;
const CardAddress = styled.p`
  color: #555;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;
const ViewAllButton = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #1a1a1a;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #1a1a1a;
    color: white;
    border-color: #1a1a1a;
  }
`;
const DecorativeShape = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;

//================================================================
// 3. ANIMATED NUMBER COMPONENT
//================================================================
const AnimatedPrice = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = "$" + Math.round(latest).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <Price ref={ref}>$0</Price>;
};

//================================================================
// 4. MAIN COMPONENT
//================================================================
const PropertyListingMinimal = () => {
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

  const handleMouseMove = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      const factor = parseInt(shape.getAttribute("data-factor")) || 20;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / factor;
      const y = (e.clientY - rect.top - rect.height / 2) / factor;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  const handleMouseLeave = (e) => {
    const shapes = e.currentTarget.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      shape.style.transform = `translate(0px, 0px)`;
    });
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
          background: "rgba(102, 161, 9, 0.03)",
          borderRadius: "50%",
        }}
      />
      <DecorativeShape
        className="shape"
        data-factor="-20"
        style={{
          top: "60%",
          right: "5%",
          width: "80px",
          height: "80px",
          border: "1px solid rgba(102, 161, 9, 0.08)",
        }}
      />

      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Header>
          <motion.div variants={itemVariants}>
            <Title>Iconic Meadow Lane Oceanfront</Title>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Address>
              3040 Meadow Lane, Southampton Village, Southampton, NY 11968
            </Address>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Status>
              Status: <span>Active</span>
            </Status>
          </motion.div>
          <motion.div variants={itemVariants}>
            <AnimatedPrice value={22500000} />
          </motion.div>
        </Header>

        <motion.div variants={itemVariants} style={{ width: "100%" }}>
          <StatsBar>
            <StatItem>
              <span className="icon">
                <FaBed />
              </span>
              <span>4</span>
            </StatItem>
            <StatItem>
              <span className="icon">
                <FaBath />
              </span>
              <span>5</span>
            </StatItem>
            <StatItem>
              <span className="icon">
                <FaRulerCombined />
              </span>
              <span>4,532</span>
            </StatItem>
          </StatsBar>
        </motion.div>
      </ContentWrapper>

      {imageUrls && imageUrls.length > 0 && (
        <ImageCarousel images={imageUrls} />
      )}

      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <MainGrid>
          <motion.div variants={itemVariants}>
            <SectionTitle>House Description</SectionTitle>
            <Paragraph>
              A pristine sanctuary of modern design, this oceanfront estate
              offers an unparalleled living experience. The architecture
              maximizes light and space, with floor-to-ceiling windows that
              frame the breathtaking Atlantic views. Every detail is curated for
              a life of comfort and elegance.
            </Paragraph>
            <SectionTitle style={{ marginTop: "2rem" }}>
              Challenges & Solutions
            </SectionTitle>
            <Paragraph>
              The primary challenge was integrating extensive smart-home
              automation while maintaining the property’s clean, minimalist
              aesthetic. Our solution involved designing custom, unobtrusive
              enclosures and utilizing a centralized control system, preserving
              the integrity of the design while providing effortless
              technological control.
            </Paragraph>
          </motion.div>
          <motion.div variants={itemVariants}>
            <HighlightsCard>
              <SectionTitle>Highlights</SectionTitle>
              <HighlightRow>
                <span>Property Type</span>
                <span>Residential</span>
              </HighlightRow>
              <HighlightRow>
                <span>Year Built</span>
                <span>2022</span>
              </HighlightRow>
              <HighlightRow>
                <span>Country</span>
                <span>United States</span>
              </HighlightRow>
              <HighlightRow>
                <span>Area</span>
                <span>Southampton</span>
              </HighlightRow>
              <ContactButton>
                Contact us <FaArrowRight />
              </ContactButton>
              <SocialIcons>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
              </SocialIcons>
            </HighlightsCard>
          </motion.div>
        </MainGrid>

        <SimilarListings>
          <motion.div variants={itemVariants}>
            <SimilarTitle>Similar Listings</SimilarTitle>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ListingGrid>
              {similarListingsData.map((listing, index) => (
                <ListingCard key={index} variants={itemVariants}>
                  {listing.featured && <FeaturedTag>Featured</FeaturedTag>}
                  <CardTitle>{listing.title}</CardTitle>
                  <CardPrice>{listing.price}</CardPrice>
                  <CardAddress>{listing.address}</CardAddress>
                </ListingCard>
              ))}
            </ListingGrid>
          </motion.div>
          <motion.div variants={itemVariants}>
            <ViewAllButton>View All Properties</ViewAllButton>
          </motion.div>
        </SimilarListings>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default PropertyListingMinimal;
