// components/FullPageLayout.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  animate,
} from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaArrowRight,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTwitter,
  FaLinkedinIn,
  FaDraftingCompass,
  FaRegBuilding,
  FaCubes,
  FaMicrochip,
  FaArrowDown,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWallet,
  FaCalendarAlt,
  FaHammer,
  FaStar,
  FaWater,
} from "react-icons/fa";

//================================================================
// 1. DATA FOR THE ENTIRE PAGE
//================================================================
const heroNavLinks = {
  "إدارة المشاريع": "pm",
  "الاستشارات الهندسية": "eng",
  "الإشراف على الموقع": "supervision",
  "التصميم الداخلي": "interior",
  "تصميم المناظر الطبيعية": "landscape",
};
const engineeringServicesData = [
  {
    imageUrl:
      "https://i.ibb.co/LXThd4n4/Whats-App-Image-2025-07-02-at-18-33-19-1907bd25.jpg",
    title: "التصميم المبدئي",
  },
  {
    imageUrl:
      "https://i.ibb.co/JFzxMbPc/Whats-App-Image-2025-07-02-at-18-31-13-bfc6017c.jpg",

    title: "الهندسة المعمارية",
  },
  {
    imageUrl:
      "https://i.ibb.co/XfcMCS36/Whats-App-Image-2025-07-02-at-18-31-13-a18478d0.jpg",
    title: "الهيكل الإنشائي",
  },
  {
    imageUrl:
      "https://i.ibb.co/6R6N16gw/Whats-App-Image-2025-07-02-at-18-31-13-7d552635.jpg",
    title: "الكهروميكانيكية",
  },
];
const interiorGalleryUrls = [
  "https://i.ibb.co/9m7CdfC6/008.jpg",
  "https://i.ibb.co/ZR7FJfKN/007.jpg",
  "https://i.ibb.co/ZpK5Rh7b/006.jpg",
  "https://i.ibb.co/kgmmWTr9/001.jpg",
  "https://i.ibb.co/gM2K4Vm4/002.jpg",
  "https://i.ibb.co/5xvVM856/003.jpg",
];
const emirates = [
  "أبوظبي",
  "دبي",
  "الشارقة",
  "عجمان",
  "أم القيوين",
  "رأس الخيمة",
  "الفجيرة",
];
const budgets = [
  "800 ألف - 1.5 مليون درهم",
  "1.5 مليون - 2.5 مليون درهم",
  "أكثر من 2.5 مليون درهم",
];
const kenBurns = keyframes`
  0% { transform: scale(1.0) translate(0, 0); }
  100% { transform: scale(1.05) translate(1%, -1%); }
`;

//================================================================
// 2. STYLED-COMPONENTS FOR THE ENTIRE PAGE
//================================================================
const HeroWrapper = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Almarai", sans-serif;
  color: white;
  direction: rtl;
`;
const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  background-image: url("https://i.ibb.co/jkKRKBnQ/Luxury-Mixed-Use-Building-Design-Build-2.png");
  background-size: cover;
  background-position: center;
  animation: ${kenBurns} 10s ease-in-out infinite alternate;
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
    cursor: pointer;
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
    cursor: pointer;
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
const ServicesSectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  font-family: "Almarai", sans-serif;
  direction: rtl;
`;
const ServicesContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;
const ServiceBlock = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-items: center;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;
const TextColumn = styled.div`
  @media (max-width: 992px) {
    order: 1;
  }
`;
const CardsColumn = styled.div``;
const ServicesTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;
const ServicesSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: #555;
  margin-bottom: 1.5rem;
`;
const ServicesParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.9;
  color: #555;
  max-width: 450px;
  margin-bottom: 1.5rem;
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`;
const ServicesConsultButton = styled.a`
  display: inline-block;
  padding: 0.75rem 2rem;
  border: 1px solid #66a109;
  border-radius: 30px;
  color: #66a109;
  font-weight: 700;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.3s ease;
  &:hover {
    background-color: #66a109;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.2);
  }
`;
const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;
const ServiceCard = styled(motion.div)`
  border-radius: 16px;
  text-align: center;
  overflow: hidden;
  position: relative;
  height: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  h4 {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    z-index: 3;
    transition: transform 0.3s ease;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    z-index: 2;
  }
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    img {
      transform: scale(1.05);
    }
    h4 {
      transform: translate(-50%, -5px);
    }
  }
`;
const DetailedImageColumn = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  height: 400px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
  @media (max-width: 992px) {
    order: 2;
    height: 300px;
  }
`;
const InteriorDesignSection = styled(motion.div)``;
const InteriorGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
  margin-top: 2rem;
  .main-img {
    grid-column: span 3;
    height: 500px;
  }
  .sub-img {
    height: 250px;
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    .main-img {
      grid-column: span 2;
      height: 400px;
    }
    .sub-img {
      height: 200px;
    }
    .sub-img:last-child:nth-child(odd) {
      grid-column: span 2;
    }
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .main-img,
    .sub-img:last-child:nth-child(odd) {
      grid-column: span 1;
    }
  }
`;
const FormSectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  font-family: "Almarai", sans-serif;
  direction: rtl;
`;
const FormContentContainer = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;
const FormInfoColumn = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #1a1a1a;
  }
  p {
    margin-top: 1rem;
    color: #555;
    line-height: 1.8;
  }
  a {
    color: #66a109;
    font-weight: 600;
    text-decoration: underline;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const FormGroup = styled.div`
  position: relative;
`;
const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 0;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  font-size: 1rem;
  font-family: "Almarai", sans-serif;
  outline: none;
  transition: border-color 0.3s ease;
  text-align: right;
  &::placeholder {
    color: #888;
  }
  &:focus {
    border-bottom-color: #66a109;
  }
`;
const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
  &::after {
    content: "▼";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) scale(0.6);
    color: #888;
    pointer-events: none;
  }
`;
const DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
`;
const DropdownItem = styled.li`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #ccc;
  transition: border-color 0.3s ease;
  &:focus-within {
    border-bottom-color: #66a109;
  }
  input {
    border: none;
    flex-grow: 1;
  }
`;
const FormSubmitButton = styled.button`
  background-color: transparent;
  color: #66a109;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  border: 1px solid #66a109;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
  transition: all 0.3s ease;
  align-self: flex-start;
  cursor: pointer;
  &:hover {
    background-color: #66a109;
    color: white;
    transform: translateY(-3px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const ErrorText = styled(motion.p)`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  text-align: right;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background: white;
  color: #333;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
`;

//================================================================
// 3. Child Component Definitions
//================================================================

const SeloraHero = ({ scrollToSection }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const wrapperRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

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

  const handleNavClick = (refKey) => {
    setMenuOpen(false);
    scrollToSection(refKey);
  };

  return (
    <HeroWrapper ref={wrapperRef}>
      <BackgroundImage style={{ y }} />
      <Overlay />
      <Header initial="hidden" animate="visible" variants={headerVariants}>
        <NavLinksDesktop>
          <a onClick={() => scrollToSection("eng")}>
            {"تصميم المناظر الطبيعية"}
          </a>
          <a onClick={() => scrollToSection("eng")}>{"التصميم الداخلي"}</a>
        </NavLinksDesktop>
        <Logo>
          <img
            width={"100px"}
            src={"https://i.ibb.co/m5xG5N9J/Khales-White-Logo.png"}
            alt="Khales Logo" // FIX: Added alt text for accessibility
          />
          {/* FIX: Wrapped text in curly braces to treat as a string */}
          <p>{"الطبيعة المصممة ببراعة"}</p>
        </Logo>
        <NavLinksDesktop>
          <a onClick={() => scrollToSection("eng")}>{"الإشراف على الموقع"}</a>
          <a onClick={() => scrollToSection("pm")}>{"الاستشارات الهندسية"}</a>
          <a onClick={() => scrollToSection("pm")}>{"إدارة المشاريع"}</a>
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
            {Object.entries(heroNavLinks).map(([link, refKey]) => (
              <motion.a
                key={link}
                variants={mobileLinkVariants}
                onClick={() => handleNavClick(refKey)}
              >
                {link}
              </motion.a>
            ))}
          </MobileNavOverlay>
        )}
      </AnimatePresence>
      <MainContent
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3, delayChildren: 0.5 } },
        }}
      >
        <motion.div variants={textRevealContainer}>
          <Headline>
            <div style={{ overflow: "hidden" }}>
              <motion.div variants={textRevealVariants}>
                {"مجتمع مسور حصري"}
              </motion.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.div variants={textRevealVariants}>
                {"يضم 30 فيلا فاخرة"}
              </motion.div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <motion.div variants={textRevealVariants}>
                {"في ميدان، دبي"}
              </motion.div>
            </div>
          </Headline>
        </motion.div>
        <CTAButton
          variants={itemFadeIn}
          onClick={() => scrollToSection("register")}
        >
          {"سجل اهتمامك"}
        </CTAButton>
      </MainContent>
    </HeroWrapper>
  );
};

const ServicesOverview = ({ scrollToRegister }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  return (
    <ServicesSectionWrapper>
      <ServicesContentContainer>
        <ServiceBlock
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TextColumn>
            <motion.div variants={itemVariants}>
              <ServicesTitle>{"إدارة المشاريع:"}</ServicesTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServicesSubtitle>{"دع خالص يتولى مشروعك"}</ServicesSubtitle>
            </motion.div>
          </TextColumn>
          <TextColumn>
            <motion.div variants={itemVariants}>
              {/* FIX: Wrapped paragraph text in curly braces to treat as a string */}
              <ServicesParagraph>
                {
                  "نحن نعتني بكل شيء، من الموافقات الأولية إلى التسليم النهائي. يشرف مديرو المشاريع لدينا على كل التفاصيل والجداول الزمنية والميزانيات لضمان التنفيذ السلس."
                }
              </ServicesParagraph>
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServicesConsultButton onClick={scrollToRegister}>
                {"استشر الآن"}
              </ServicesConsultButton>
            </motion.div>
          </TextColumn>
        </ServiceBlock>
        <ServiceBlock
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TextColumn>
            <motion.div variants={itemVariants}>
              <ServicesTitle>{"الاستشارات الهندسية"}</ServicesTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              {/* FIX: Wrapped paragraph text in curly braces to treat as a string */}
              <ServicesParagraph>
                {
                  "يقوم مهندسونا بإنشاء خطط واضحة ومتوافقة تلبي جميع اللوائح المحلية وظروف الموقع. تتم مراجعة كل التفاصيل من أجل السلامة والكفاءة والأداء طويل الأمد."
                }
              </ServicesParagraph>
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServicesConsultButton onClick={scrollToRegister}>
                {"استشر الآن"}
              </ServicesConsultButton>
            </motion.div>
          </TextColumn>
          <CardsColumn>
            <CardsGrid variants={containerVariants}>
              {engineeringServicesData.map((service) => (
                <ServiceCard key={service.title} variants={itemVariants}>
                  <img src={service.imageUrl} alt={service.title} />
                  <h4>{service.title}</h4>
                </ServiceCard>
              ))}
            </CardsGrid>
          </CardsColumn>
        </ServiceBlock>
      </ServicesContentContainer>
    </ServicesSectionWrapper>
  );
};

const DetailedServices = ({ scrollToRegister }) => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return (
    <ServicesSectionWrapper style={{ paddingTop: 0 }}>
      <ServicesContentContainer>
        <ServiceBlock
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <DetailedImageColumn variants={itemVariants}>
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
              alt="الإشراف على الموقع"
            />
          </DetailedImageColumn>
          <TextColumn>
            <motion.div variants={itemVariants}>
              <ServicesTitle>{"الإشراف على الموقع"}</ServicesTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              {/* FIX: Wrapped paragraph text in curly braces to treat as a string */}
              <ServicesParagraph>
                {
                  "قوة تصميمك تكمن في تنفيذه. يضمن مشرفونا في الموقع أن كل مهمة تلبي أعلى معايير الجودة وفي الوقت المحدد. نحن نمثل مصالحك، ونراقب الجودة، ونمنع الأخطاء المكلفة."
                }
              </ServicesParagraph>
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServicesConsultButton onClick={scrollToRegister}>
                {"استشر الآن"}
              </ServicesConsultButton>
            </motion.div>
          </TextColumn>
        </ServiceBlock>
        <InteriorDesignSection
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants}>
            <ServicesTitle>{"التصميم الداخلي"}</ServicesTitle>
            {/* FIX: Wrapped paragraph text in curly braces to treat as a string */}
            <ServicesParagraph>
              {
                "نصمم بيئات داخلية مدروسة وعملية ومصممة خصيصًا لتناسب طابع كل عقار. سواء كانت حديقة خاصة أو مساحة معيشة خارجية متكاملة، فإن حلولنا مبنية حول نمط حياتك والبيئة المحلية، مع مراعاة الراحة والجمال والمناخ على المدى الطويل."
              }
            </ServicesParagraph>
            <ServicesConsultButton onClick={scrollToRegister}>
              {"استشر الآن"}
            </ServicesConsultButton>
          </motion.div>
          <InteriorGallery>
            {interiorGalleryUrls.map((url, i) => (
              <DetailedImageColumn
                key={i}
                variants={itemVariants}
                className={i === 0 ? "main-img" : "sub-img"}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <img src={url} alt={`Interior ${i + 1}`} />
              </DetailedImageColumn>
            ))}
          </InteriorGallery>
        </InteriorDesignSection>
        <ServiceBlock
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <DetailedImageColumn variants={itemVariants}>
            <img
              src="https://i.ibb.co/zVgMq5QD/Whats-App-Image-2025-07-02-at-18-44-22-a78d9d06.jpg"
              alt="تصميم المناظر الطبيعية"
            />
          </DetailedImageColumn>
          <TextColumn>
            <motion.div variants={itemVariants}>
              <ServicesTitle>{"تصميم المناظر الطبيعية"}</ServicesTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              {/* FIX: Wrapped paragraph text in curly braces to treat as a string */}
              <ServicesParagraph>
                {
                  "نصمم بيئات خارجية مدروسة وعملية ومصممة خصيصًا لتناسب طابع كل عقار. حلولنا مبنية حول نمط حياتك والبيئة المحلية، مع مراعاة الراحة والجمال والمناخ."
                }
              </ServicesParagraph>
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServicesConsultButton onClick={scrollToRegister}>
                {"استشر الآن"}
              </ServicesConsultButton>
            </motion.div>
          </TextColumn>
        </ServiceBlock>
      </ServicesContentContainer>
    </ServicesSectionWrapper>
  );
};

// PASTE THIS CORRECTED COMPONENT INTO YOUR FILE
const RegisterInterestForm = () => {
  const [emirateOpen, setEmirateOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emirate: "",
    budget: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validatePhone = (phone) => /^05[024568]\d{7}$/.test(phone);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone" && validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  };
  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "emirate") setEmirateOpen(false);
    if (field === "budget") setBudgetOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setErrors({
        phone: "الرجاء إدخال رقم هاتف إماراتي صحيح (مثال: 05XXXXXXXX)",
      });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});
    const description = `الإمارة: ${formData.emirate}\nالميزانية المتوقعة: ${formData.budget}`;
    try {
      const response = await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description,
          branch: "Website",
          inquiry: "Register Interest",
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          emirate: "",
          budget: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormSectionWrapper>
      <FormContentContainer
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FormInfoColumn>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            {"سجل اهتمامك"}
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <a href="mailto:info@khales.ae">info@khales.ae</a>
          </motion.p>
        </FormInfoColumn>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          <Form onSubmit={handleSubmit} noValidate>
            <FormGroup>
              <FormInput
                name="name"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <PhoneInputWrapper
                style={{ borderColor: errors.phone ? "#e74c3c" : "#ccc" }}
              >
                <span>{"🇦🇪"}</span>
                <FormInput
                  name="phone"
                  type="tel"
                  placeholder="رقم الهاتف المتحرك (05XXXXXXXX)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </PhoneInputWrapper>
              <AnimatePresence>
                {errors.phone && (
                  <ErrorText
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.phone}
                  </ErrorText>
                )}
              </AnimatePresence>
            </FormGroup>
            <FormGroup>
              <DropdownContainer onClick={() => setEmirateOpen((p) => !p)}>
                <FormInput
                  as="div"
                  style={{ textAlign: "right", paddingRight: 0 }}
                >
                  {/*
                    HERE IS THE FIX: I've wrapped the placeholder string
                    in `{''}` to ensure it's treated as a safe JS string.
                  */}
                  {formData.emirate ||
                    "في أي إمارة تخطط للحصول على قطعة الأرض؟"}
                </FormInput>
                <AnimatePresence>
                  {emirateOpen && (
                    <DropdownMenu
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {emirates.map((e) => (
                        <DropdownItem
                          key={e}
                          onClick={() => handleDropdownSelect("emirate", e)}
                        >
                          {e}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </DropdownContainer>
            </FormGroup>
            <FormGroup>
              <DropdownContainer onClick={() => setBudgetOpen((p) => !p)}>
                <FormInput
                  as="div"
                  style={{ textAlign: "right", paddingRight: 0 }}
                >
                  {/*
                    AND HERE IS THE SECOND FIX: Same solution for the budget placeholder.
                  */}
                  {formData.budget || "ميزانية البناء المتوقعة"}
                </FormInput>
                <AnimatePresence>
                  {budgetOpen && (
                    <DropdownMenu
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {budgets.map((b) => (
                        <DropdownItem
                          key={b}
                          onClick={() => handleDropdownSelect("budget", b)}
                        >
                          {b}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </DropdownContainer>
            </FormGroup>
            <FormSubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جار الإرسال..." : "إرسال"}
            </FormSubmitButton>
          </Form>
        </motion.div>
      </FormContentContainer>
      {submitStatus && (
        <ModalOverlay onClick={() => setSubmitStatus(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {submitStatus === "success"
              ? "تم الإرسال بنجاح!"
              : "حدث خطأ. يرجى المحاولة مرة أخرى."}
          </ModalContent>
        </ModalOverlay>
      )}
    </FormSectionWrapper>
  );
};

//================================================================
// 4. FINAL PAGE ASSEMBLY
//================================================================
const FullPageLayout = () => {
  const pmRef = useRef(null);
  const engRef = useRef(null);
  const supervisionRef = useRef(null);
  const interiorRef = useRef(null);
  const landscapeRef = useRef(null);
  const registerRef = useRef(null);

  const sectionRefs = {
    pm: pmRef,
    eng: engRef,
    supervision: supervisionRef,
    interior: interiorRef,
    landscape: landscapeRef,
    register: registerRef,
  };

  const scrollToSection = (refKey) => {
    if (sectionRefs[refKey] && sectionRefs[refKey].current) {
      sectionRefs[refKey].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap");
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <SeloraHero scrollToSection={scrollToSection} />

      <div ref={pmRef}>
        <ServicesOverview
          scrollToRegister={() => scrollToSection("register")}
        />
      </div>

      <div ref={engRef}>
        <DetailedServices
          supervisionRef={supervisionRef}
          interiorRef={interiorRef}
          landscapeRef={landscapeRef}
          scrollToRegister={() => scrollToSection("register")}
        />
      </div>

      <div ref={registerRef}>
        <RegisterInterestForm />
      </div>
    </>
  );
};

export default FullPageLayout;
