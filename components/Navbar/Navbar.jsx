// components/Navbar/Navbar.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled, { css } from "styled-components";
import { FaTimes, FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

// Custom hook to detect clicks outside of a component
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
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

// ===================================================================
// STYLED COMPONENTS
// ===================================================================
const COLORS = {
  primary: "#66a109",
  primaryDarker: "#5a8f08",
  white: "#ffffff",
  darkText: "#1a1a1a",
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
    background: rgba(255, 254, 254, 0.8);
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: none;
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

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
    color: ${COLORS.darkText};
    z-index: 1001;
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
  color: ${({ $isActive }) => ($isActive ? COLORS.primary : COLORS.darkText)};

  &:hover {
    color: ${COLORS.primary};
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    text-align: center;
    padding: 1.5rem;
    justify-content: center;
    font-size: 1.2rem;
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
  width: 220px;
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
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: ${({ $isActive }) => ($isActive ? COLORS.primary : COLORS.darkText)};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  text-align: left;
  font-size: 1rem;
  &:hover {
    background-color: #f4f4f4;
    color: ${COLORS.primary};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media screen and (max-width: 960px) {
    display: none;
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

const MobileCTAWrapper = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    display: block;
    width: 100%;
    margin-top: auto;
    padding-top: 2rem;
  }
`;

const LanguageButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem;
`;

const CurrentFlag = styled.img`
  width: 28px;
  height: auto;
  border-radius: 4px;
`;

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FlagIcon = styled.img`
  width: 24px;
  height: auto;
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

// ===================================================================
// MAIN NAVBAR COMPONENT
// ===================================================================
export default function Navbar({ lang, navigation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const pathname = usePathname();
  const navRef = useRef();

  useClickOutside(navRef, () => {
    setOpenDropdown(null);
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname, lang]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  const handleDropdownToggle = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // ======================= THE FIX IS HERE =======================
  // This is your original, working function. It correctly splits the full
  // pathname (e.g., /en/about-us) and replaces the locale part.
  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  // ===============================================================

  const navItems = navigation?.items || [];
  const ctaButtonText = navigation?.ctaButton || "Loading...";

  const LanguageSwitcher = ({ isMobile = false }) => (
    <div style={{ position: "relative" }}>
      <MenuLink as="div" onClick={() => handleDropdownToggle("language")}>
        <LanguageButton>
          <CurrentFlag
            src={
              lang === "en"
                ? "https://flagcdn.com/w40/us.png"
                : "https://flagcdn.com/w40/sa.png"
            }
            alt="Current language"
          />
          {isMobile && <span>{lang === "en" ? "Language" : "اللغة"}</span>}
        </LanguageButton>
        <ArrowIcon $isOpen={openDropdown === "language"} />
      </MenuLink>
      <SubMenu
        $isOpen={openDropdown === "language"}
        style={!isMobile ? { left: "50%", transform: "translateX(-50%)" } : {}}
      >
        <SubMenuItem>
          <SubMenuLink
            href={redirectedPathName("en")}
            $isActive={lang === "en"}
          >
            <LanguageOption>
              <FlagIcon src="https://flagcdn.com/w40/us.png" alt="USA Flag" />
              <span>English</span>
            </LanguageOption>
          </SubMenuLink>
        </SubMenuItem>
        <SubMenuItem>
          <SubMenuLink
            href={redirectedPathName("ar")}
            $isActive={lang === "ar"}
          >
            <LanguageOption>
              <FlagIcon src="https://flagcdn.com/w40/sa.png" alt="KSA Flag" />
              <span>العربية</span>
            </LanguageOption>
          </SubMenuLink>
        </SubMenuItem>
      </SubMenu>
    </div>
  );

  return (
    <NavWrapper $isScrolled={isScrolled}>
      <NavbarContainer $isScrolled={isScrolled}>
        <NavLogoLink href={`/${lang}`}>
          <NavIcon src="/assets/Khales-Logo.png" alt="Khales Logo" />
        </NavLogoLink>

        <MobileIcon onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>

        <NavMenu $isOpen={isMobileMenuOpen} ref={navRef}>
          {navItems.map((item) => {
            const hasChildren = item.isDropdown;
            const fullPath = item.path ? `/${lang}${item.path}` : "#";
            const isActive = hasChildren
              ? item.children.some(
                  (child) => pathname === `/${lang}${child.path}`
                )
              : pathname === `/${lang}${item.path}`;

            return (
              <MenuItem key={item.label}>
                <MenuLink
                  as={hasChildren ? "div" : Link}
                  href={fullPath}
                  $isActive={isActive}
                  onClick={
                    hasChildren
                      ? () => handleDropdownToggle(item.label)
                      : undefined
                  }
                >
                  {item.label}
                  {hasChildren && (
                    <ArrowIcon $isOpen={openDropdown === item.label} />
                  )}
                </MenuLink>
                {hasChildren && (
                  <SubMenu $isOpen={openDropdown === item.label}>
                    {item.children.map((child) => (
                      <SubMenuItem key={child.label}>
                        <SubMenuLink
                          href={`/${lang}${child.path}`}
                          $isActive={pathname === `/${lang}${child.path}`}
                        >
                          {child.label}
                        </SubMenuLink>
                      </SubMenuItem>
                    ))}
                  </SubMenu>
                )}
              </MenuItem>
            );
          })}

          <MenuItem className="mobile-only-lang">
            <LanguageSwitcher isMobile={true} />
          </MenuItem>
          <style jsx global>{`
            .mobile-only-lang {
              display: none;
            }
            @media screen and (max-width: 960px) {
              .mobile-only-lang {
                display: flex;
                width: 100%;
                justify-content: center;
              }
            }
          `}</style>

          <MobileCTAWrapper>
            <CTAButton href={`/${lang}/booking`}>{ctaButtonText}</CTAButton>
          </MobileCTAWrapper>
        </NavMenu>

        <NavActions>
          <LanguageSwitcher />
          <CTAButton href={`/${lang}/booking`}>{ctaButtonText}</CTAButton>
        </NavActions>
      </NavbarContainer>
    </NavWrapper>
  );
}
