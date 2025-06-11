"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import "./Nav.css";

import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavLinks,
  NavItem,
  Text,
} from "./NavbarStyles.js";

import styled from "styled-components";
import useDeviceSize from "../../utils/WindowSize";
import { useLanguage } from "../../Context/Languagecontext.js";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  // Define paths for each category
  const projectManagementPaths = [
    "/ProjectManagement",
    "/ProjectManager",
    "/Developmentplanning",
    "/Projectfeasability",
  ];

  const engineeringConsultancyPaths = [
    "/EngineeringConsultancy",
    "/EngineeringDesign",
    "/EngineeringSupervision",
    "/InteriorDesign",
    "/LandscapingDesign",
  ];

  const allServicePaths = [
    ...projectManagementPaths,
    ...engineeringConsultancyPaths,
    "/service",
  ];

  const [width] = useDeviceSize();

  const homePaths = ["/", "/ABOUTUS", "/PROJECTS", "/Blogs"];

  // Active path checkers
  const isProjectManagementPath = () => {
    return projectManagementPaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    );
  };

  const isEngineeringConsultancyPath = () => {
    return engineeringConsultancyPaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    );
  };

  const isHomePath = () => {
    return homePaths.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    );
  };

  const [isSticky, setSticky] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const pathname = usePathname();

  const handleScroll = () => {
    setSticky(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const StyledButton = styled(Link)`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    z-index: 1;
    border-radius: 5px;
    background-color: rgba(92, 145, 8, 1);
    padding: 11px 25px;
    font-size: 15px;
    color: rgb(255, 255, 255);
    letter-spacing: 0.36px;
    font-weight: 400;
    border: none;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.2s ease;
    text-decoration: none;
    &:hover {
      background-color: #545454;
    }

    &:focus {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }

    @media (max-width: 991px) {
      width: 230px;
      padding-left: 20px;
      padding-right: 20px;
      margin-right: 0px;
    }
  `;

  // Updated tab structure with new service names
  const tabE = [
    "Home",
    "Project Management",
    "Engineering Consultancy",
    "Comprehensive Project Management",
    "Project Manager (Owner's Representative)",
    "Development Planning",
    "Feasibility Study",
    "Engineering Design",
    "Engineering Supervision",
    "Interior Designing",
    "Landscaping",
    "Portfolio",
    "Connect",
    "About Khales",
    "Blogs",
    "Language",
    "Arabic",
    "English",
    "View All Services",
  ];

  const tabA = [
    "الرئيسية",
    "إدارة مشاريع",
    "استشارات هندسية",
    "خدمة إدارة المشروع الشاملة",
    "مدير المشروع (ممثل المالك)",
    "التخطيط التطويري",
    "دراسة الجدوى",
    "التصميم الهندسي",
    "الإشراف الهندسي",
    "التصميم الداخلي",
    "تنسيق الحدائق",
    "المشاريع",
    "اتصل بنا",
    "نبذة عنا",
    "المدونة",
    "اللغة",
    "العربية",
    "الانجليزية",
    "تصفح كل الخدمات",
  ];

  const [show, setShow] = useState(false);
  const [tabs, setTabs] = useState(language === "ar" ? tabA : tabE);

  useEffect(() => {
    setTabs(language === "ar" ? tabA : tabE);
  }, [language]);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  const [isMenu, setisMenu] = useState(false);
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const toggleClass = () => {
    setShow(false);
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
  };

  let boxClass = ["main-menu menu-right menuq1"];
  if (isMenu) {
    boxClass.push("menuq2");
  } else {
    boxClass.push("");
  }

  const [isMenuSubMenuHome, setMenuSubMenuHome] = useState(false);
  const [isMenuSubMenuPM, setMenuSubMenuPM] = useState(false);
  const [isMenuSubMenuEC, setMenuSubMenuEC] = useState(false);
  const [isMenuSubMenuLang, setMenuSubMenuLang] = useState(false);

  // Helper to close all other dropdowns
  const closeOtherDropdowns = (currentDropdown) => {
    const dropdowns = {
      home: setMenuSubMenuHome,
      pm: setMenuSubMenuPM,
      ec: setMenuSubMenuEC,
      lang: setMenuSubMenuLang,
    };

    Object.entries(dropdowns).forEach(([key, setter]) => {
      if (key !== currentDropdown) setter(false);
    });
  };

  const toggleSubmenuHome = () => {
    setMenuSubMenuHome(!isMenuSubMenuHome);
    closeOtherDropdowns("home");
  };

  const toggleSubmenuPM = () => {
    setMenuSubMenuPM(!isMenuSubMenuPM);
    closeOtherDropdowns("pm");
  };

  const toggleSubmenuEC = () => {
    setMenuSubMenuEC(!isMenuSubMenuEC);
    closeOtherDropdowns("ec");
  };

  const toggleSubmenuLang = () => {
    setMenuSubMenuLang(!isMenuSubMenuLang);
    closeOtherDropdowns("lang");
  };

  const handleClick = () => setShow(!show);

  return (
    <Nav className={isSticky ? "sticky" : ""}>
      <NavbarContainer>
        <NavLogo href="/">
          <NavIcon src="/assets/Khales-Logo.png" alt="site logo" />
        </NavLogo>
        <MobileIcon onClick={handleClick}>
          {show ? <FaTimes /> : <CgMenuRight />}
        </MobileIcon>
        <NavMenu $show={show}>
          <NavItem>
            {width <= 960 && (
              <StyledButton href={`/booking`} style={{ margin: "auto" }}>
                {language === "eng" ? "Book Consultation" : "أحجز موعدك الآن"}
              </StyledButton>
            )}
            <ul className={boxClass.join(" ")}>
              {/* Home Dropdown - Reverted to original structure */}
              <li
                onClick={toggleSubmenuHome}
                className={`menu-item sub__menus__arrows ${
                  isHomePath() ? "active-home" : ""
                }`}
              >
                <Link href="#">
                  <Text style={{ color: isHomePath() ? "#66a109" : "black" }}>
                    {tabs[0]}
                  </Text>
                </Link>
                <ul
                  className={
                    isMenuSubMenuHome
                      ? "sub__menus sub__menus__Active"
                      : "sub__menus"
                  }
                >
                  <li>
                    <Link href="/ABOUTUS" onClick={toggleClass}>
                      <Text
                        style={{
                          color: pathname === "/ABOUTUS" ? "#66a109" : "black",
                        }}
                      >
                        {tabs[13]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/PROJECTS" onClick={toggleClass}>
                      <Text
                        style={{
                          color: pathname === "/PROJECTS" ? "#66a109" : "black",
                        }}
                      >
                        {tabs[11]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Blogs" onClick={toggleClass}>
                      <Text
                        style={{
                          color: pathname === "/Blogs" ? "#66a109" : "black",
                        }}
                      >
                        {tabs[14]}
                      </Text>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Project Management Dropdown */}
              <li
                onClick={toggleSubmenuPM}
                className={`menu-item sub__menus__arrows ${
                  isProjectManagementPath() ? "active-service" : ""
                }`}
              >
                <Link href="#">
                  <Text
                    style={{
                      color: isProjectManagementPath() ? "#66a109" : "BLACK",
                    }}
                  >
                    {tabs[1]}
                  </Text>
                </Link>
                <ul
                  className={
                    isMenuSubMenuPM
                      ? "sub__menus sub__menus__Active"
                      : "sub__menus"
                  }
                >
                  <li>
                    <Link href="/ProjectManagement" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/ProjectManagement"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[3]} {/* Comprehensive Project Management */}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/ProjectManager" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/ProjectManager"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[4]} {/* Project Manager */}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Developmentplanning" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/Developmentplanning"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[5]} {/* Development Planning */}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/Projectfeasability" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/Projectfeasability"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[6]} {/* Feasibility Study */}
                      </Text>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Engineering Consultancy Dropdown */}
              <li
                onClick={toggleSubmenuEC}
                className={`menu-item sub__menus__arrows ${
                  isEngineeringConsultancyPath() ? "active-service" : ""
                }`}
              >
                <Link href="#">
                  <Text
                    style={{
                      color: isEngineeringConsultancyPath()
                        ? "#66a109"
                        : "BLACK",
                    }}
                  >
                    {tabs[2]}
                  </Text>
                </Link>
                <ul
                  className={
                    isMenuSubMenuEC
                      ? "sub__menus sub__menus__Active"
                      : "sub__menus"
                  }
                >
                  <li>
                    <Link href="/EngineeringDesign" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/EngineeringDesign"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[7]} {/* Engineering Design */}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/EngineeringSupervision" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/EngineeringSupervision"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[8]} {/* Engineering Supervision */}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/InteriorDesign" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/InteriorDesign"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[9]} {/* Interior Designing */}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link href="/LandscapingDesign" onClick={toggleClass}>
                      <Text
                        style={{
                          color:
                            pathname === "/LandscapingDesign"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[10]} {/* Landscaping */}
                      </Text>
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Contact Link */}
              <li className="menu-item">
                <Link href="/Contact" onClick={toggleClass}>
                  <Text
                    style={{
                      color: pathname === "/Contact" ? "#66a109" : "black",
                    }}
                  >
                    {tabs[12]} {/* Connect */}
                  </Text>
                </Link>
              </li>

              {/* Language Dropdown */}
              <li
                onClick={toggleSubmenuLang}
                className="menu-item sub__menus__arrows"
              >
                <Link href="#">
                  <Text
                    style={{ color: pathname === "/sss" ? "#66a109" : "black" }}
                  >
                    {tabs[15]} {/* Language */}
                  </Text>
                </Link>
                <ul
                  className={
                    isMenuSubMenuLang
                      ? "sub__menus sub__menus__Active"
                      : "sub__menus"
                  }
                >
                  <li>
                    <button
                      onClick={() => handleLanguageChange("ar")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 16px",
                        color: language === "ar" ? "#66a109" : "black",
                      }}
                    >
                      <Text>
                        {tabs[16]} {/* Arabic */}
                      </Text>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLanguageChange("eng")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 16px",
                        color: language === "eng" ? "#66a109" : "black",
                      }}
                    >
                      <Text>
                        {tabs[17]} {/* English */}
                      </Text>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </NavItem>
        </NavMenu>
        <NavMenu>
          <StyledButton href={`/booking`}>
            {language === "eng" ? "Book Consultation" : "أحجز موعدك الآن"}
          </StyledButton>
        </NavMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
