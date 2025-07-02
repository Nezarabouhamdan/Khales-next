// components/ValuePropositionV2.jsx
"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView, animate } from "framer-motion";
import { FaBuilding, FaRegThumbsUp, FaRegCalendarCheck } from "react-icons/fa";

//================================================================
// 1. DATA FOR THE STATS
//================================================================
const statsData = [
  {
    icon: <FaBuilding />,
    value: 120,
    suffix: "+",
    title: "Successful Projects",
    description: "Delivering complex projects that exceed expectations.",
  },
  {
    icon: <FaRegThumbsUp />,
    value: 98,
    suffix: "%",
    title: "Client Satisfaction",
    description: "Our commitment to partnership and excellence.",
  },
  {
    icon: <FaRegCalendarCheck />,
    value: 15,
    suffix: "+",
    title: "Years of Experience",
    description: "Seasoned experts with invaluable industry knowledge.",
  },
];

//================================================================
// 2. STYLED COMPONENTS FOR THE "STICKY BANNER" DESIGN
//================================================================

const SectionContainer = styled.section`
  /* The total space this section will occupy */
  padding-bottom: 5rem;
  background-color: #ffffff; /* The background for the stats panel area */
  font-family: "Inter", sans-serif;
`;

const StickyWrapper = styled.div`
  /* This element will stick to the top */
  position: sticky;
  top: 0;
  height: 60vh; /* <-- The fixed height for the video banner */
  width: 100%;
  overflow: hidden;
  background-color: #121212; /* Fallback for video */
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18, 0.5);
  z-index: 2;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  color: white;
  height: 100%; /* Fill the sticky wrapper */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;

  h1 {
    font-size: 4rem;
    font-weight: 700;
    max-width: 800px;
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const StatsPanel = styled.div`
  /* This scrolls up over the sticky banner */
  background-color: #ffffff;
  padding: 5rem;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 4;
  margin-top: -10vh; /* Pulls the panel up to overlap the video */

  @media (max-width: 992px) {
    padding: 4rem 2rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const StatColumn = styled(motion.div)`
  text-align: center;
  .icon {
    font-size: 2.5rem;
    color: #66a109;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
  }
  .counter-container {
    margin-bottom: 0.5rem;
    transition: transform 0.3s ease;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
  &:hover {
    .icon,
    .counter-container {
      transform: scale(1.1);
    }
  }
`;

const CounterText = styled.span`
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
  color: #1a1a1a;
`;

const Suffix = styled(CounterText)`
  color: #66a109;
`;

//================================================================
// 3. ANIMATED NUMBER COMPONENT
//================================================================
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) ref.current.textContent = Math.round(latest);
        },
      });
    }
  }, [isInView, value]);

  return <CounterText ref={ref}>0</CounterText>;
};

//================================================================
// 4. MAIN COMPONENT
//================================================================
const ValuePropositionV2 = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <SectionContainer>
      <StickyWrapper>
        <VideoBackground
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
        >
          {/* FIX: New, 100% working video URL */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-living-room-with-a-round-table-and-a-sofa-4783-large.mp4"
            type="video/mp4"
          />
        </VideoBackground>
        <Overlay />
        <HeroContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1>Unlocking Your Potential</h1>
          <p>
            We combine deep industry expertise with proven strategies to deliver
            tangible value and drive sustainable growth.
          </p>
        </HeroContent>
      </StickyWrapper>

      <StatsPanel>
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatColumn
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="icon">{stat.icon}</div>
              <div className="counter-container">
                <AnimatedNumber value={stat.value} />
                <Suffix>{stat.suffix}</Suffix>
              </div>
              <h3>{stat.title}</h3>
              <p>{stat.description}</p>
            </StatColumn>
          ))}
        </StatsGrid>
      </StatsPanel>
    </SectionContainer>
  );
};

export default ValuePropositionV2;
