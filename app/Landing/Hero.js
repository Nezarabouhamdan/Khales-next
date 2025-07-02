// components/SeloraHero.jsx
"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

//================================================================
// DATA & KEYFRAME ANIMATIONS (IN ARABIC)
//================================================================
const navLinksArabic = [
  "حول المشروع",
  "وسائل الراحة",
  "نقاط الاهتمام",
  "تسجيل",
];

const kenBurns = keyframes`
  0% { transform: scale(1.0) translate(0, 0); }
  100% { transform: scale(1.05) translate(-1%, 1%); }
`;

//================================================================
// STYLED COMPONENTS (REBUILT FOR RESPONSIVENESS & RTL)
//================================================================
const HeroWrapper = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Almarai", sans-serif; /* Recommended Arabic Font */
  color: white;
  direction: rtl; /* Set text direction to RTL */
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-image: url("https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80");
  background-size: cover;
  background-position: center;
  animation: ${kenBurns} 25s ease-in-out infinite alternate;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(10, 20, 30, 0.4) 100%
  );
  z-index: 2;
`;

const Header = styled(motion.header)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavLinksDesktop = styled.nav`
  display: flex;
  gap: 2rem;
  a {
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    text-decoration: none;
    position: relative;
    padding: 0.5rem 0;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 50%;
      width: 100%;
      height: 1px;
      background: white;
      transform: scaleX(0) translateX(50%);
      transform-origin: center;
      transition: transform 0.3s ease-out;
    }
    &:hover::after {
      transform: scaleX(1) translateX(50%);
    }
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

const Logo = styled.div`
  text-align: center;
  h2 {
    font-size: 1.8rem;
    font-weight: 400;
    letter-spacing: 2px;
  }
  p {
    font-size: 0.7rem;
    letter-spacing: 1px;
    opacity: 0.8;
  }
`;

const HamburgerIcon = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  @media (max-width: 992px) {
    display: block;
  }
`;

const MobileNavOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 20, 30, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  a {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
  }
`;

const CloseIcon = styled(HamburgerIcon)`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
`;

const MainContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
`;

const Headline = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.4;
  max-width: 800px;
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const CTAButton = styled(motion.a)`
  background: white;
  color: #1a1a1a;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const OfferBlock = styled(motion.div)`
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  gap: 3rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  .price {
    font-size: 1.75rem;
    font-weight: 600;
  }
`;

//================================================================
// MAIN COMPONENT
//================================================================
const SeloraHero = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const wrapperRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
  };
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const textRevealContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const textRevealVariants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const mobileNavContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Import the Google Font for Arabic */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap");
      `}</style>
      <HeroWrapper ref={wrapperRef}>
        <BackgroundImage style={{ y }} />
        <Overlay />

        <Header initial="hidden" animate="visible" variants={headerVariants}>
          <NavLinksDesktop>
            {["نقاط الاهتمام", "تسجيل"].map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
          </NavLinksDesktop>
          <Logo>
            <h2>SELŌRA</h2>
            <p>الطبيعة المصممة ببراعة</p>
          </Logo>
          <NavLinksDesktop>
            {["حول المشروع", "وسائل الراحة"].map((link) => (
              <a key={link} href="#">
                {link}
              </a>
            ))}
          </NavLinksDesktop>
          <HamburgerIcon onClick={() => setMenuOpen(true)}>
            <FaBars />
          </HamburgerIcon>
        </Header>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileNavOverlay
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileNavContainer}
            >
              <CloseIcon onClick={() => setMenuOpen(false)}>
                <FaTimes />
              </CloseIcon>
              {navLinksArabic.map((link) => (
                <motion.a key={link} href="#" variants={mobileLinkVariants}>
                  {link}
                </motion.a>
              ))}
            </MobileNavOverlay>
          )}
        </AnimatePresence>

        <MainContent
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={textRevealContainer}>
            <Headline>
              <div style={{ overflow: "hidden" }}>
                <motion.div variants={textRevealVariants}>
                  مجتمع مسور حصري
                </motion.div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.div variants={textRevealVariants}>
                  يضم 30 فيلا فاخرة
                </motion.div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.div variants={textRevealVariants}>
                  في ميدان، دبي
                </motion.div>
              </div>
            </Headline>
          </motion.div>

          <CTAButton variants={itemFadeIn} href="#">
            سجل اهتمامك
          </CTAButton>

          <OfferBlock variants={itemFadeIn}>
            <div>
              <h4>عرض صيفي حصري</h4>
              <span className="price">12.5 مليون درهم</span>
              <p>السعر المبدئي</p>
            </div>
            <div>
              <h4 style={{ visibility: "hidden" }}>الدفع</h4>
              <span className="price">70/30</span>
              <p>خطة السداد</p>
            </div>
          </OfferBlock>
        </MainContent>
      </HeroWrapper>
    </>
  );
};

export default SeloraHero;
