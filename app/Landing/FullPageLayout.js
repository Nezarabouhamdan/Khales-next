// components/KhalesFullPage.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

// --- PERFORMANCE OPTIMIZATION IMPORTS ---
import Image from "next/image";
import { Almarai } from "next/font/google";

// --- FONT CONFIGURATION ---
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

//================================================================
// 1. DATA FOR THE ENTIRE PAGE
//================================================================
const heroNavLinks = {
  pm: "إدارة المشاريع",
  eng: "الاستشارات الهندسية",
  interior: "التصميم الداخلي",
  landscape: "تصميم  الحدائق",
};

const heroImages = [
  {
    desktop:
      "https://i.ibb.co/wFXfpSSW/khales-ae-mansion-in-dubai-ar-21-sref-httpss-mj-runvjvid-32337233-c72f-48c9-9d90-f673870717dd-3.png",
  },
  {
    desktop:
      "https://i.ibb.co/LdPcyrfq/enhanced-khales-ae-real-photograph-of-a-super-luxury-villa-front-view-a11ecba1-05c6-4f9b-9d86-41228b.png",
  },
  {
    desktop:
      "https://i.ibb.co/jkKRKBnQ/Luxury-Mixed-Use-Building-Design-Build-2.png",
  },
];

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
      "https://i.ibb.co/674FJfsK/khales-ae-Electrical-plumbing-overlays-HVAC-layout-and-coor-d18c301c-e0f1-48b6-84ef-7e8ecead01b2-0.png",
    title: "الكهروميكانيكية",
  },
];
const interiorGalleryUrls = [
  "https://i.ibb.co/ZR7FJfKN/007.jpg",
  "https://i.ibb.co/9m7CdfC6/008.jpg",
  "https://i.ibb.co/ZpK5Rh7b/006.jpg",
  "https://i.ibb.co/kgmmWTr9/001.jpg",
  "https://i.ibb.co/gM2K4Vm4/002.jpg",
  "https://i.ibb.co/5xvVM856/003.jpg",
  "https://i.ibb.co/nNnRHRqQ/004.jpg",
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
  "أقل من 1.5 مليون درهم",
  "1.5 مليون - 2.5 مليون درهم",
  "أكثر من 2.5 مليون درهم",
];
const kenBurns = keyframes`
  0% { transform: scale(1.0) translate(0, 0); }
  100% { transform: scale(1.05) translate(1%, -1%); }
`;

//================================================================
// 2. STYLED-COMPONENTS
//================================================================
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  direction: rtl;
`;
const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;
const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;
const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  color: #555;
  margin-bottom: 1.5rem;
`;
const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.9;
  color: #555;
  max-width: 450px;
  margin-bottom: 1.5rem;
  @media (max-width: 992px) {
    margin: 0 auto 1.5rem auto;
  }
`;
const ConsultButton = styled.a`
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
const DecorativeShape = styled.div`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.4s ease-out;
`;
const Divider = styled(motion.div)`
  height: 1px;
  background-color: #e9ecef;
  margin: 4rem auto;
`;
const HeroWrapper = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  direction: rtl;
`;

const BackgroundImageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const KenBurnsImage = styled(Image)`
  animation: ${kenBurns} 10s ease-in-out infinite alternate;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const NavLinksDesktop = styled.nav`
  display: flex;
  align-items: center;
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
  @media (max-width: 1200px) {
    display: none;
  }
`;
const Logo = styled.div``;
const HamburgerIcon = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  @media (max-width: 1200px) {
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
const HeroMainContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 0 1rem;
  @media (max-width: 992px) {
    gap: 50vh;
  }
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
const HeroCTAButton = styled(motion.a)`
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
const ServiceBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-items: center;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;
const TextColumn = styled(motion.div)``;
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
  cursor: pointer;

  img {
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
  height: 500px;
  cursor: pointer;
  position: relative;

  img {
    transition: transform 0.2s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
  @media (max-width: 992px) {
    order: 2;
    height: 350px;
  }
`;
const InteriorGalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  .gallery-item-0 {
    grid-column: 1 / -1;
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    .gallery-item-0 {
      grid-column: 1 / -1;
    }
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .gallery-item-0 {
      grid-column: 1 / 1;
    }
  }
`;
const GalleryImageWrapper = styled(motion.div)`
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &.gallery-item-0 {
    height: 550px;
    @media (max-width: 768px) {
      height: 400px;
    }
  }

  img {
    transition: transform 0.3s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
`;
const InteriorSectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  cursor: pointer;
`;
const LightboxImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  cursor: default;
`;
const FormSectionWrapper = styled(SectionWrapper)``;
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
  font-family: inherit;
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
  border-bottom: 1px solid ${(props) => (props.$hasError ? "#e74c3c" : "#ccc")};
  transition: border-color 0.3s ease;

  &:focus-within {
    border-bottom-color: #66a109;
  }

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
  border-bottom: 1px solid ${(props) => (props.$hasError ? "#e74c3c" : "#ccc")};
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
  @media (max-width: 992px) {
    align-self: center;
  }
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
// MAIN PAGE COMPONENT
//================================================================
const FullPageLayout = () => {
  // State and refs are unchanged
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedImg, setSelectedImg] = useState(null);
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

  const pmRef = useRef(null);
  const engRef = useRef(null);
  const interiorRef = useRef(null);
  const landscapeRef = useRef(null);
  const registerRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  // Unchanged handlers and effects
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setEmirateOpen(false);
        setBudgetOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentHeroIndex]);

  const sectionRefs = {
    pm: pmRef,
    eng: engRef,
    interior: interiorRef,
    landscape: landscapeRef,
    register: registerRef,
  };

  const scrollToSection = (refKey) => {
    setMenuOpen(false);
    if (sectionRefs[refKey] && sectionRefs[refKey].current) {
      sectionRefs[refKey].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleMouseMove = (e) => {
    const section = e.currentTarget;
    const shapes = section.querySelectorAll(".shape");
    shapes.forEach((shape) => {
      const factor = parseInt(shape.getAttribute("data-factor")) || 20;
      const rect = section.getBoundingClientRect();
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

  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const validatePhone = (phone) => /^05[024568]\d{7}$/.test(phone);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "emirate") setEmirateOpen(false);
    if (field === "budget") setBudgetOpen(false);
    // Clear error for this field on selection
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // =================================================================
  // UPDATED: handleSubmit with comprehensive validation for all fields
  // =================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = {};

    // 1. Validate all required fields
    if (!formData.name.trim()) {
      tempErrors.name = "الاسم الكامل مطلوب";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }
    if (!validatePhone(formData.phone)) {
      tempErrors.phone =
        "الرجاء إدخال رقم هاتف إماراتي صحيح (مثال: 05XXXXXXXX)";
    }
    if (!formData.emirate) {
      tempErrors.emirate = "يرجى اختيار الإمارة";
    }
    if (!formData.budget) {
      tempErrors.budget = "يرجى اختيار الميزانية";
    }

    // 2. If there are errors, update state and stop submission
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // 3. If validation passes, proceed with submission
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    const description = `Emirate: ${formData.emirate}\nBudget: ${formData.budget}`;

    try {
      const response = await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          description: description,
          branch: "Website",
          inquiry: "Website Lead Form",
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
        setSubmitStatus(data.error || "error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1, ease: "easeInOut" } },
  };

  return (
    <div className={almarai.className}>
      <HeroWrapper ref={heroWrapperRef}>
        <AnimatePresence>
          <BackgroundImageContainer
            key={currentHeroIndex}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1.5, ease: "easeIn" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1.5, ease: "easeOut" },
            }}
            style={{ y: heroY }}
          >
            <KenBurnsImage
              alt="Luxury villa background"
              src={heroImages[currentHeroIndex].desktop}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
          </BackgroundImageContainer>
        </AnimatePresence>
        <Overlay />
        <Header
          as={motion.header}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Logo>
            <Image
              src={"https://i.ibb.co/m5xG5N9J/Khales-White-Logo.png"}
              alt="Khales Logo"
              width={100}
              height={40}
              priority
            />
          </Logo>
          <NavLinksDesktop>
            {Object.entries(heroNavLinks).map(([key, link]) => (
              <a key={key} onClick={() => scrollToSection(key)}>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CloseIcon onClick={() => setMenuOpen(false)}>
                <FaTimes />
              </CloseIcon>
              {Object.entries(heroNavLinks).map(([key, link]) => (
                <a key={key} onClick={() => scrollToSection(key)}>
                  {link}
                </a>
              ))}
            </MobileNavOverlay>
          )}
        </AnimatePresence>
        <HeroMainContent
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.3, delayChildren: 0.5 },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <Headline>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  variants={{
                    hidden: { y: "110%" },
                    visible: {
                      y: "0%",
                      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  شركاؤك في الرفاهية
                </motion.div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.div
                  variants={{
                    hidden: { y: "110%" },
                    visible: {
                      y: "0%",
                      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  للتصميم و البناء
                </motion.div>
              </div>
            </Headline>
          </motion.div>
          <HeroCTAButton
            as={motion.a}
            variants={itemVariants}
            onClick={() => scrollToSection("register")}
          >
            ابدأ التصميم{" "}
          </HeroCTAButton>
        </HeroMainContent>
      </HeroWrapper>

      {/* --- ALL OTHER SECTIONS ARE THE SAME --- */}
      <SectionWrapper
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <DecorativeShape
          className="shape"
          data-factor="30"
          style={{
            top: "10%",
            right: "5%",
            width: "100px",
            height: "100px",
            background: "rgba(102, 161, 9, 0.05)",
            borderRadius: "50%",
          }}
        />
        <DecorativeShape
          className="shape"
          data-factor="-20"
          style={{
            bottom: "15%",
            left: "5%",
            width: "80px",
            height: "80px",
            border: "1px solid rgba(102, 161, 9, 0.1)",
          }}
        />
        <ContentContainer>
          <motion.div
            ref={pmRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ServiceBlock>
              <TextColumn variants={itemVariants}>
                <SectionTitle>إدارة المشاريع:</SectionTitle>
                <SectionSubtitle>
                  مع خالص، مشروعك في أيدٍ أمينة.
                </SectionSubtitle>
              </TextColumn>
              <TextColumn variants={itemVariants}>
                <Paragraph>
                  نتولى في خالص إدارة العملية بالكامل لنمنحك راحة البال، حيث
                  نتكفل بجميع المراحل من الموافقات والإجراءات الأولية إلى
                  الإشراف اليومي والتسليم في الموعد. مهمتنا هي ضمان سير العمل
                  بسلاسة، دون أي عناء من جانبك.
                </Paragraph>
                <ConsultButton onClick={() => scrollToSection("register")}>
                  {" "}
                  ابدأ التصميم{" "}
                </ConsultButton>
              </TextColumn>
            </ServiceBlock>
          </motion.div>
          <Divider
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            ref={engRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ServiceBlock>
              <TextColumn variants={itemVariants}>
                <SectionTitle>الاستشارات الهندسية</SectionTitle>
                <Paragraph>
                  يعمل فريق مهندسينا على إعداد مخططات دقيقة ومتكاملة تتوافق مع
                  متطلبات الموقع، مع إجراء مراجعة شاملة لكل جزئية لضمان السلامة
                  والكفاءة واستمرارية الأداء على المدى الطويل.
                </Paragraph>
                <ConsultButton onClick={() => scrollToSection("register")}>
                  {" "}
                  ابدأ التصميم{" "}
                </ConsultButton>
              </TextColumn>
              <CardsGrid variants={containerVariants}>
                {engineeringServicesData.map((service) => (
                  <ServiceCard
                    key={service.title}
                    variants={itemVariants}
                    onClick={() => setSelectedImg(service.imageUrl)}
                  >
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                    />
                    <h4>{service.title}</h4>
                  </ServiceCard>
                ))}
              </CardsGrid>
            </ServiceBlock>
          </motion.div>
        </ContentContainer>
      </SectionWrapper>
      <SectionWrapper
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <DecorativeShape
          className="shape"
          data-factor="-15"
          style={{
            top: "5%",
            left: "5%",
            width: "120px",
            height: "120px",
            background: "rgba(102, 161, 9, 0.04)",
            borderRadius: "50%",
          }}
        />
        <ContentContainer>
          <motion.div
            ref={interiorRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <InteriorSectionHeader variants={itemVariants}>
              <SectionTitle>التصميم الداخلي</SectionTitle>
              <Paragraph style={{ margin: "0 auto 1.5rem auto" }}>
                نبتكر تصاميم داخلية فريدة تعكس ذوقك الرفيع وتلبي احتياجاتك
                اليومية. نترجم رؤيتك إلى واقع ملموس، ونخلق مساحات تجمع بين
                الأناقة والوظيفة، لتحويل منزلك إلى ملاذ مريح ومفعم بالحياة.
              </Paragraph>
              <ConsultButton onClick={() => scrollToSection("register")}>
                {" "}
                ابدأ التصميم{" "}
              </ConsultButton>
            </InteriorSectionHeader>
            <InteriorGalleryGrid variants={containerVariants}>
              {interiorGalleryUrls.map((url, i) => (
                <GalleryImageWrapper
                  key={i}
                  variants={itemVariants}
                  className={`gallery-item-${i}`}
                  onClick={() => setSelectedImg(url)}
                >
                  <Image
                    src={url}
                    alt={`Interior Design ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                  />
                </GalleryImageWrapper>
              ))}
            </InteriorGalleryGrid>
          </motion.div>
          <Divider
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            ref={landscapeRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ServiceBlock>
              <TextColumn variants={itemVariants}>
                <SectionTitle>تصميم الحدائق</SectionTitle>
                <Paragraph>
                  نحن نبتكر مساحات خارجية فريدة، حيث تلتقي الطبيعة بالفن. نصمم
                  لكم حدائق ومناظر طبيعية تكون امتداداً لمنازلكم ونمط حياتكم، مع
                  التركيز على خلق توازن مثالي بين الجمال البصري والراحة العملية،
                  واستغلال أفضل لما يتيحه المناخ والبيئة المحلية.
                </Paragraph>
                <ConsultButton onClick={() => scrollToSection("register")}>
                  {" "}
                  ابدأ التصميم{" "}
                </ConsultButton>
              </TextColumn>
              <DetailedImageColumn
                variants={itemVariants}
                onClick={() =>
                  setSelectedImg(
                    "https://i.ibb.co/zVgMq5QD/Whats-App-Image-2025-07-02-at-18-44-22-a78d9d06.jpg"
                  )
                }
              >
                <Image
                  src="https://i.ibb.co/zVgMq5QD/Whats-App-Image-2025-07-02-at-18-44-22-a78d9d06.jpg"
                  alt="تصميم الحدائق "
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 992px) 100vw, 50vw"
                />
              </DetailedImageColumn>
            </ServiceBlock>
          </motion.div>
        </ContentContainer>
      </SectionWrapper>

      {/* --- FORM SECTION WITH VALIDATION --- */}
      <FormSectionWrapper
        ref={registerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <DecorativeShape
          className="shape"
          data-factor="20"
          style={{
            top: "20%",
            right: "15%",
            width: "70px",
            height: "70px",
            background: "rgba(102, 161, 9, 0.06)",
            borderRadius: "50%",
          }}
        />
        <ContentContainer>
          <FormContentContainer
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FormInfoColumn>
              <motion.h1 variants={itemVariants}>سجل اهتمامك</motion.h1>
              <motion.p variants={itemVariants}>
                املأ النموذج وسيقوم أحد أعضاء فريقنا بالتواصل معك قريبًا لمناقشة
                مشروعك. <a href="mailto:info@khales.ae">info@khales.ae</a>
              </motion.p>
            </FormInfoColumn>
            <motion.div variants={itemVariants} ref={dropdownRef}>
              <Form onSubmit={handleSubmit} noValidate>
                <FormGroup>
                  <FormInput
                    style={{
                      borderBottomColor: errors.name ? "#e74c3c" : "#ccc",
                    }}
                    name="name"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <ErrorText
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors.name}
                      </ErrorText>
                    )}
                  </AnimatePresence>
                </FormGroup>
                <FormGroup>
                  <FormInput
                    style={{
                      borderBottomColor: errors.email ? "#e74c3c" : "#ccc",
                    }}
                    name="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <ErrorText
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors.email}
                      </ErrorText>
                    )}
                  </AnimatePresence>
                </FormGroup>
                <FormGroup>
                  <PhoneInputWrapper $hasError={!!errors.phone}>
                    <span>🇦🇪</span>
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
                  <DropdownContainer
                    $hasError={!!errors.emirate}
                    onClick={() => {
                      setBudgetOpen(false);
                      setEmirateOpen((prev) => !prev);
                    }}
                  >
                    <FormInput
                      as="div"
                      style={{
                        border: "none",
                        color: formData.emirate ? "#333" : "#888",
                      }}
                    >
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
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDropdownSelect("emirate", e);
                              }}
                            >
                              {e}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      )}
                    </AnimatePresence>
                  </DropdownContainer>
                  <AnimatePresence>
                    {errors.emirate && (
                      <ErrorText
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors.emirate}
                      </ErrorText>
                    )}
                  </AnimatePresence>
                </FormGroup>
                <FormGroup>
                  <DropdownContainer
                    $hasError={!!errors.budget}
                    onClick={() => {
                      setEmirateOpen(false);
                      setBudgetOpen((prev) => !prev);
                    }}
                  >
                    <FormInput
                      as="div"
                      style={{
                        border: "none",
                        color: formData.budget ? "#333" : "#888",
                      }}
                    >
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
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDropdownSelect("budget", b);
                              }}
                            >
                              {b}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      )}
                    </AnimatePresence>
                  </DropdownContainer>
                  <AnimatePresence>
                    {errors.budget && (
                      <ErrorText
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors.budget}
                      </ErrorText>
                    )}
                  </AnimatePresence>
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
                  ? "تم الإرسال بنجاح! سنتواصل معك قريباً."
                  : `حدث خطأ: ${
                      typeof submitStatus === "string" &&
                      submitStatus !== "error"
                        ? submitStatus
                        : "يرجى المحاولة مرة أخرى."
                    }`}
              </ModalContent>
            </ModalOverlay>
          )}
        </ContentContainer>
      </FormSectionWrapper>

      <AnimatePresence>
        {selectedImg && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <LightboxImage
              src={selectedImg}
              alt="Enlarged view"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullPageLayout;
