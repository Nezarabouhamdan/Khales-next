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
    background: rgba(255, 254, 254, 0.3);
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
  transition: height 0.3s ease;
  @media (max-width: 1200px) {
    height: 30px;
  }
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
  transition: gap 0.3s ease;
  @media (max-width: 1200px) {
    gap: 0.2rem;
  }
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
    overflow-y: auto;
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
    flex-direction: column;
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

  @media (max-width: 1200px) {
    font-size: 14px;
    padding: 0.5rem 0.4rem;
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
  @media (max-width: 1200px) {
    margin-left: 2px;
  }
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
  justify-content: center; // Centered text for all submenu items
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: ${({ $isActive }) => ($isActive ? COLORS.primary : COLORS.darkText)};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  text-align: center;
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
  @media (max-width: 1200px) {
    gap: 1rem;
  }
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const LanguageButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LanguageLabel = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: ${COLORS.darkText};
  @media (max-width: 1200px) {
    font-size: 14px;
  }
  @media screen and (max-width: 960px) {
    font-size: 1.2rem;
  }
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

const MegaMenu = styled.div`
  position: absolute;
  top: 65px;
  left: 50%;
  width: 550px; // A good width for a balanced look
  background-color: ${COLORS.white};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  padding: 1.5rem 1rem;
  display: flex;
  gap: 1rem;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) =>
    $isOpen
      ? "translateY(0) translateX(-50%)"
      : "translateY(-10px) translateX(-50%)"};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  @media screen and (max-width: 960px) {
    position: static;
    flex-direction: column;
    width: 100%;
    transform: none;
    box-shadow: none;
    border: none;
    background-color: #f7f7f7;
    margin-top: 0.5rem;
    padding: 0.5rem;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  }
`;

const MegaMenuColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MegaMenuTitle = styled.div`
  font-weight: 700; // Bolder title
  color: ${COLORS.darkText};
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  text-align: center;
  border-bottom: 1px solid #eee; // Subtle separator
  @media (max-width: 960px) {
    background-color: #ebebeb;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    padding: 0.75rem;
    border-bottom: none;
  }
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

  useClickOutside(navRef, () => setOpenDropdown(null));

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

  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const navItems = navigation?.items || [];

  const MainNavLinks = () => (
    <>
      {navItems.map((item) => {
        const hasChildren = item.isDropdown;
        const isMegaMenu = item.isMegaMenu;
        const fullPath = item.path ? `/${lang}${item.path}` : "#";
        const isActive = hasChildren
          ? item.children.some((child) =>
              (child.links || [child]).some(
                (link) => pathname === `/${lang}${link.path}`
              )
            )
          : pathname === `/${lang}${item.path}`;

        return (
          <MenuItem key={item.label}>
            <MenuLink
              as={hasChildren ? "div" : Link}
              href={fullPath}
              $isActive={isActive}
              onClick={
                hasChildren ? () => handleDropdownToggle(item.label) : undefined
              }
            >
              {item.label}
              {hasChildren && (
                <ArrowIcon $isOpen={openDropdown === item.label} />
              )}
            </MenuLink>
            {hasChildren &&
              (isMegaMenu ? (
                <MegaMenu $isOpen={openDropdown === item.label}>
                  {item.children.map((column) => (
                    <MegaMenuColumn key={column.title}>
                      <MegaMenuTitle>{column.title}</MegaMenuTitle>
                      {column.links.map((link) => (
                        <SubMenuItem key={link.label}>
                          <SubMenuLink
                            href={`/${lang}${link.path}`}
                            $isActive={pathname === `/${lang}${link.path}`}
                          >
                            {link.label}
                          </SubMenuLink>
                        </SubMenuItem>
                      ))}
                    </MegaMenuColumn>
                  ))}
                </MegaMenu>
              ) : (
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
              ))}
          </MenuItem>
        );
      })}
    </>
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
          <MainNavLinks />
          <MenuItem className="mobile-only-lang">
            <MenuLink as="div" onClick={() => handleDropdownToggle("language")}>
              <LanguageButton>
                <LanguageLabel>{lang === "en" ? "EN" : "AR"}</LanguageLabel>
              </LanguageButton>
              <ArrowIcon $isOpen={openDropdown === "language"} />
            </MenuLink>
            <SubMenu $isOpen={openDropdown === "language"}>
              <SubMenuItem>
                <SubMenuLink
                  href={redirectedPathName("en")}
                  $isActive={lang === "en"}
                >
                  <LanguageOption>
                    <FlagIcon
                      src="https://flagcdn.com/w40/us.png"
                      alt="USA Flag"
                    />
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
                    <FlagIcon
                      src="https://flagcdn.com/w40/sa.png"
                      alt="KSA Flag"
                    />
                    <span>العربية</span>
                  </LanguageOption>
                </SubMenuLink>
              </SubMenuItem>
            </SubMenu>
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
        </NavMenu>
        <NavActions>
          <MenuItem>
            <MenuLink as="div" onClick={() => handleDropdownToggle("language")}>
              <LanguageButton>
                <LanguageLabel>{lang === "en" ? "EN" : "AR"}</LanguageLabel>
              </LanguageButton>
              <ArrowIcon $isOpen={openDropdown === "language"} />
            </MenuLink>
            <SubMenu $isOpen={openDropdown === "language"}>
              <SubMenuItem>
                <SubMenuLink
                  href={redirectedPathName("en")}
                  $isActive={lang === "en"}
                >
                  <LanguageOption>
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
                    <span>العربية</span>
                  </LanguageOption>
                </SubMenuLink>
              </SubMenuItem>
            </SubMenu>
          </MenuItem>
        </NavActions>
      </NavbarContainer>
    </NavWrapper>
  );
}
