// src/components/Navbar/Navbar.js
// --- CORRECTED CODE WITH MOBILE FIXES ---
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled, { css } from "styled-components";
import { FaTimes, FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
// --- 1. IMPORT YOUR LANGUAGE CONTEXT HOOK ---
// Make sure this path is correct for your project structure
import { useLanguage } from "../../Context/Languagecontext";
// A custom hook to detect clicks outside of a component
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
// --- DATA-DRIVEN MENU ---
const menuData = [
  {
    label: "Home",
    labelAr: "الرئيسية",
    isDropdown: true,
    children: [
      { label: "About Khales", labelAr: "نبذة عنا", path: "/ABOUTUS" },
      { label: "Blogs", labelAr: "المدونة", path: "/Blogs" },
    ],
  },
  {
    label: "Project Management",
    labelAr: "إدارة مشاريع",
    isDropdown: true,
    children: [
      {
        label: "360 Project Management",
        labelAr: "خدمة إدارة المشروع الشاملة",
        path: "/ProjectManagement",
      },
      {
        label: "Project Manager",
        labelAr: "مدير المشروع",
        path: "/ProjectManager",
      },
      {
        label: "Development Planning",
        labelAr: "التخطيط التطويري",
        path: "/Developmentplanning",
      },
      {
        label: "Feasibility Study",
        labelAr: "دراسة الجدوى",
        path: "/Projectfeasability",
      },
    ],
  },
  {
    label: "Engineering Consultancy",
    labelAr: "استشارات هندسية",
    isDropdown: true,
    children: [
      {
        label: "Engineering Design",
        labelAr: "التصميم الهندسي",
        path: "/EngineeringDesign",
      },
      {
        label: "Engineering Supervision",
        labelAr: "الإشراف الهندسي",
        path: "/EngineeringSupervision",
      },
      {
        label: "Interior Designing",
        labelAr: "التصميم الداخلي",
        path: "/InteriorDesign",
      },
      {
        label: "Landscaping",
        labelAr: "تنسيق الحدائق",
        path: "/LandscapingDesign",
      },
    ],
  },
  {
    label: "Connect",
    labelAr: "اتصل بنا",
    path: "/Contact",
    isDropdown: false,
  },
  {
    label: "Language",
    labelAr: "اللغة",
    isDropdown: true,
    children: [
      { label: "English", labelAr: "الإنجليزية", langCode: "eng" },
      { label: "Arabic", labelAr: "العربية", langCode: "ar" },
    ],
  },
];

// --- STYLED COMPONENTS (With modifications) ---

const COLORS = {
  primary: "#66a109",
  primaryDarker: "#5a8f08",
  white: "#ffffff",
  darkText: "#1a1a1a",
  darkBg: "#222222",
};

const NavWrapper = styled.nav`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition: height 0.3s ease-in-out;

  ${({ $isScrolled }) =>
    $isScrolled &&
    css`
      height: 80px;
    `}
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  width: 100%;
  max-width: 1400px;
  margin: 0 24px;
  padding: 0 20px;
  border-radius: 7px;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
  background: rgba(255, 254, 254, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid
    ${({ $isScrolled }) =>
      $isScrolled ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)"};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 960px) {
    margin: 0;
    border-radius: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 254, 254, 0.6);
    border: none;
    border-bottom: 1px solid
      ${({ $isScrolled }) =>
        $isScrolled ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"};
    box-shadow: none;
    backdrop-filter: blur(10px);
  }
`;

const NavLogoLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const NavIcon = styled.img`
  height: 40px;
  width: auto;
`;

// --- MODIFICATION 1 ---
// Added an `$isMobileMenuOpen` prop to control the color of the close (FaTimes) icon.
const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
    // When the menu is open, the background is white, so the icon must be dark.
    color: ${({ $isMobileMenuOpen, $isScrolled }) =>
      $isMobileMenuOpen
        ? COLORS.darkText
        : $isScrolled
        ? COLORS.darkText
        : COLORS.darkText};
    transition: color 0.3s ease-in-out;
    z-index: 1001; // Ensure it's on top
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  gap: 1rem;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    opacity: 1;
    transition: all 0.5s ease;
    background: ${COLORS.white};
    padding: 100px 2rem 2rem 2rem;
    // Add space for the button at the bottom
    justify-content: flex-start;
  }
`;

const MenuItem = styled.li`
  position: relative;
  height: 65px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 960px) {
    width: 100%;
    height: auto;
    justify-content: center;
  }
`;

const MenuLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  color: ${({ $isScrolled, $isActive }) =>
    $isActive
      ? COLORS.primary
      : $isScrolled
      ? COLORS.darkText
      : COLORS.darkText};
  text-shadow: ${({ $isScrolled }) =>
    $isScrolled ? "none" : "0 1px 3px rgba(0, 0, 0, 0.3)"};

  &:hover {
    color: ${COLORS.primary};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    text-align: center;
    padding: 1.5rem;
    justify-content: center;
    font-size: 1.2rem;
    text-shadow: none;
    color: ${({ $isActive }) => ($isActive ? COLORS.primary : COLORS.darkText)};

    &:hover {
      background-color: #f4f4f4;
      border-radius: 8px;
    }
  }
`;

const ArrowIcon = styled(MdKeyboardArrowDown)`
  margin-left: 4px;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 65px;
  left: 50%;
  width: 260px;
  background-color: ${COLORS.white};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  list-style: none;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) =>
    $isOpen
      ? "translateY(0) translateX(-50%)"
      : "translateY(-10px) translateX(-50%)"};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  @media screen and (max-width: 960px) {
    position: static;
    transform: none;
    box-shadow: none;
    border: none;
    width: 100%;
    background-color: #f7f7f7;
    margin-top: 0.5rem;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  }
`;

const SubMenuItem = styled.li`
  width: 100%;
`;

const SubMenuLink = styled(Link)`
  display: block;
  padding: 0.75rem 1.25rem;
  color: ${({ $isActive }) => ($isActive ? COLORS.primary : COLORS.darkText)};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  text-align: left;

  &:hover {
    background-color: #f4f4f4;
    color: ${COLORS.primary};
  }
`;

const SubMenuButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.25rem;
  color: ${({ $isActive }) => ($isActive ? COLORS.primary : COLORS.darkText)};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  font-size: 1rem;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
    color: ${COLORS.primary};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 960px) {
    display: none; // This hides the button on mobile in its original position
  }
`;

const CTAButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${COLORS.primaryDarker};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 161, 9, 0.3);
  }
`;

// --- MODIFICATION 2 ---
// A new styled component for the button when it's inside the mobile menu.
const MobileCTAWrapper = styled.div`
  display: none; // Hidden by default

  @media screen and (max-width: 960px) {
    display: block;
    width: 100%;
    margin-top: 2rem; // Add some space above the button
  }
`;
const Section = styled.iframe`
  display: flex;
  flex-direction: coulmn;
  justify-content: space-evenly;
  align-content: spcae-evenly;
  width: 100%;
  align-items: space-between;
  text-align: left;
  grid: 3f2f;
  color: red;
  background-color: blue;
  margin-left: 3rem;
  margin-right: 3rem;
  padding: 2px 30px 20px 30px;
  border: 1px solid black;
  border-radius: 8px;
  flex-wrap: wrap;
`;

// --- MAIN NAVBAR COMPONENT ---
const Navbar = () => {
  const { language, changeLanguage } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const pathname = usePathname();
  const navRef = useRef();

  useClickOutside(navRef, () => setOpenDropdown(null));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleDropdownToggle = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setOpenDropdown(null);
  };

  const isDropdownActive = (children) => {
    return children.some((child) => pathname === child.path);
  };

  return (
    <NavWrapper $isScrolled={isScrolled}>
      <NavbarContainer $isScrolled={isScrolled}>
        <NavLogoLink href="/">
          <NavIcon src="/assets/Khales-Logo.png" alt="Khales Logo" />
        </NavLogoLink>

        {/* --- MODIFICATION 1 (Applied) --- */}
        {/* Pass the $isMobileMenuOpen prop to the MobileIcon styled component */}
        <MobileIcon
          $isScrolled={isScrolled}
          $isMobileMenuOpen={isMobileMenuOpen}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>

        <NavMenu $isOpen={isMobileMenuOpen} ref={navRef}>
          {menuData.map((item) => {
            const label = language === "ar" ? item.labelAr : item.label;
            const isActive = item.isDropdown
              ? isDropdownActive(item.children)
              : pathname === item.path;

            return (
              <MenuItem key={item.label}>
                <MenuLink
                  as={item.isDropdown ? "div" : Link}
                  href={item.path || "#"}
                  $isActive={isActive}
                  $isScrolled={isScrolled}
                  onClick={
                    item.isDropdown
                      ? () => handleDropdownToggle(item.label)
                      : () => setMobileMenuOpen(false)
                  }
                >
                  {label}
                  {item.isDropdown && (
                    <ArrowIcon $isOpen={openDropdown === item.label} />
                  )}
                </MenuLink>

                {item.isDropdown && (
                  <SubMenu $isOpen={openDropdown === item.label}>
                    {item.children.map((child) => (
                      <SubMenuItem key={child.label}>
                        {child.path ? (
                          <SubMenuLink
                            href={child.path}
                            $isActive={pathname === child.path}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {language === "ar" ? child.labelAr : child.label}
                          </SubMenuLink>
                        ) : (
                          <SubMenuButton
                            $isActive={language === child.langCode}
                            onClick={() => handleLanguageChange(child.langCode)}
                          >
                            {language === "ar" && child.labelAr
                              ? child.labelAr
                              : child.label}
                          </SubMenuButton>
                        )}
                      </SubMenuItem>
                    ))}
                  </SubMenu>
                )}
              </MenuItem>
            );
          })}

          {/* --- MODIFICATION 2 (Applied) --- */}
          {/* Add the CTA button inside a mobile-only wrapper within the NavMenu */}
          <MobileCTAWrapper>
            <CTAButton href="/Landing/eng">
              {language === "eng" ? "Book Consultation" : "أحجز موعدك الآن"}
            </CTAButton>
          </MobileCTAWrapper>
        </NavMenu>

        <NavActions>
          <CTAButton href="/booking">
            {language === "eng" ? "Book Consultation" : "أحجز موعدك الآن"}
          </CTAButton>
        </NavActions>
      </NavbarContainer>
    </NavWrapper>
  );
};

export default Navbar;
