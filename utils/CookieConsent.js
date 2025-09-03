// src/components/CookieConsent.jsx
"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

// --- STYLED COMPONENTS ---

const BannerWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000; // High z-index to be on top of everything
  background-color: #1a1a1a; // Matches your dark theme elements
  color: #e0e0e0;
  font-family: ${({ lang }) =>
    lang === "ar" ? "var(--font-tajawal)" : "var(--font-inter)"};
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
  border-top: 1px solid #333;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

const BannerText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  flex: 1;

  a {
    color: #66a109; // Your brand's accent color
    text-decoration: underline;
    &:hover {
      color: #88cc0c;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const BaseButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const AcceptButton = styled(BaseButton)`
  background-color: #66a109;
  color: #ffffff;

  &:hover {
    background-color: #77b80a;
    transform: translateY(-2px);
  }
`;

const RejectButton = styled(BaseButton)`
  background-color: #333;
  color: #e0e0e0;

  &:hover {
    background-color: #444;
  }
`;

// --- MAIN COMPONENT LOGIC ---

const bannerVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: { y: "100%", transition: { ease: "easeOut", duration: 0.3 } },
};

const CookieConsent = ({ lang, content }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // We delay showing the banner slightly to avoid layout shift on initial load
    const timer = setTimeout(() => {
      const consent = Cookies.get("cookie_consent");
      if (!consent) {
        setShowBanner(true);
      }
    }, 1500); // 1.5-second delay

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (consentType) => {
    Cookies.set("cookie_consent", consentType, { expires: 365, path: "/" });
    setShowBanner(false);

    // Ensure gtag is available before calling it
    if (typeof window.gtag === "function") {
      const consentState = consentType === "accepted" ? "granted" : "denied";
      window.gtag("consent", "update", {
        analytics_storage: consentState,
      });
    }
  };

  if (!content) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <BannerWrapper
          lang={lang}
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ContentWrapper>
            <BannerText>
              {content.text}
              {/* This assumes you will have a privacy policy page */}
              {/* <a href={`/${lang}/privacy-policy`}> {content.learnMore}</a> */}
            </BannerText>
            <ButtonsWrapper>
              <RejectButton onClick={() => handleConsent("rejected")}>
                {content.reject}
              </RejectButton>
              <AcceptButton onClick={() => handleConsent("accepted")}>
                {content.accept}
              </AcceptButton>
            </ButtonsWrapper>
          </ContentWrapper>
        </BannerWrapper>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
