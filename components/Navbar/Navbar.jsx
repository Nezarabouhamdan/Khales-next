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
  const servicePaths = [
    "/service",
    "/ProjectManagement",
    "/Developmentplanning",
    "/ArchitectureDesign",
    "/Projectfeasability",
    "/EngineeringConsultancy",
    "/InteriorDesign",
    "/LandscapingDesign",
    "/Investing",
    "/Fit-OutDesign",
  ];
  const [width] = useDeviceSize();

  const homePaths = ["/", "/ABOUTUS", "/PROJECTS", "/Blogs"];
  const isServicePath = () => {
    return servicePaths.some(
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

  const tabE = [
    "Home",
    "Services",
    "Project Management",
    "Development Planning",
    "Architecture",
    "Project Feasibility Study", // Updated from "Projects feasibility study"
    "Engineering Consultancy",
    "Interior Design",
    "Landscaping",
    "Investing", // Updated from "Real Estate"
    "Fit-Out",
    "Portfolio",
    "Connect",
    "About Khales",
    "Blogs",
    "FAQ",
    "Language",
    "Arabic",
    "English",
    "View All Services",
  ];

  const tabA = [
    "الرئيسية",
    "الخدمات",
    "إدارة مشاريع",
    "مخطط تطوير",
    "المعمارية",
    "دراسة جدوى", // Updated from previous Arabic term
    "استشارات هندسية",
    "تصميم داخلي",
    "المناظر الطبيعية",
    "الإستثمار", // Updated from "العقارات"
    "التجهيز الداخلي",
    "المشاريع",
    "اتصل بنا",
    "نبذة عنا",
    "المدونة",
    "الاسئلة الشائعه",
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

  let boxClassSubMenuHome = ["sub__menus"];
  if (isMenuSubMenuHome) {
    boxClassSubMenuHome.push("sub__menus__Active");
  }

  const [isMenuSubMenu, setMenuSubMenu] = useState(false);

  let boxClassSubMenu = ["sub__menus"];
  if (isMenuSubMenu) boxClassSubMenu.push("sub__menus__Active");

  const [isMenuSubMenu4, setMenuSubMenu4] = useState(false);
  let boxClassSubMenu4 = ["sub__menus"];
  if (isMenuSubMenu4) boxClassSubMenu4.push("sub__menus__Active");

  const handleClick = () => setShow(!show);
  const toggleSubmenuHome = () => {
    setMenuSubMenuHome(!isMenuSubMenuHome);
    setMenuSubMenu(false);
    setMenuSubMenu4(false);
  };

  const toggleSubmenu = () => {
    setMenuSubMenu(!isMenuSubMenu);
    setMenuSubMenuHome(false);
    setMenuSubMenu4(false);
  };

  const toggleSubmenu4 = () => {
    setMenuSubMenu4(!isMenuSubMenu4);
    setMenuSubMenuHome(false);
    setMenuSubMenu(false);
  };

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
              <li
                onClick={toggleSubmenuHome}
                className={`menu-item sub__menus__arrows ${
                  isHomePath() ? "active-home" : ""
                }`}
              >
                <Link href="#">
                  <Text
                    style={{
                      color: isHomePath() ? "#66a109" : "black",
                    }}
                  >
                    {tabs[0]}
                  </Text>
                </Link>
                <ul className={boxClassSubMenuHome.join(" ")}>
                  <li>
                    <Link
                      href="/ABOUTUS"
                      onClick={toggleClass}
                      className="is-active"
                    >
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
                    <Link
                      href="/PROJECTS"
                      onClick={toggleClass}
                      className="is-active"
                    >
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
                    <Link
                      href="/Blogs"
                      onClick={toggleClass}
                      className="is-active"
                    >
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

              <li
                onClick={toggleSubmenu}
                className={`menu-item sub__menus__arrows ${
                  isServicePath() ? "active-service" : ""
                }`}
              >
                <Link href="#">
                  <Text
                    style={{
                      color: isServicePath() ? "#66a109" : "BLACK",
                    }}
                  >
                    {tabs[1]}
                  </Text>
                </Link>
                <ul className={boxClassSubMenu.join(" ")}>
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/ProjectManagement`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/ProjectManagement"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[2]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/Developmentplanning`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/Developmentplanning"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[3]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/Projectfeasability`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/Projectfeasability"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[5]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/EngineeringConsultancy`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/EngineeringConsultancy"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[6]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/InteriorDesign`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/InteriorDesign"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[7]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/LandscapingDesign`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/LandscapingDesign"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[8]}
                      </Text>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/Investing`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/Investing" ? "#66a109" : "black",
                        }}
                      >
                        {tabs[9]}
                      </Text>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/service`}
                    >
                      <Text
                        style={{
                          color: pathname === "/service" ? "#66a109" : "black",
                        }}
                      >
                        {tabs[19]}
                      </Text>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      onClick={toggleClass}
                      className="is-active"
                      href={`/Fit-OutDesign`}
                    >
                      <Text
                        style={{
                          color:
                            pathname === "/Fit-OutDesign"
                              ? "#66a109"
                              : "black",
                        }}
                      >
                        {tabs[10]}
                      </Text>
                    </Link>
                  </li> */}
                </ul>
              </li>

              <li className="menu-item">
                <Link
                  href="/Contact"
                  onClick={toggleClass}
                  className="is-active"
                >
                  <Text
                    style={{
                      color: pathname === "/Contact" ? "#66a109" : "black",
                    }}
                  >
                    {tabs[12]}
                  </Text>
                </Link>
              </li>

              <li
                onClick={toggleSubmenu4}
                className="menu-item sub__menus__arrows"
              >
                <Link href="#">
                  <Text
                    style={{
                      color: pathname === "/sss" ? "#66a109" : "black",
                    }}
                  >
                    {tabs[16]}
                  </Text>
                </Link>
                <ul className={boxClassSubMenu4.join(" ")}>
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
                      <Text
                        style={{
                          color: pathname === "/sss" ? "#66a109" : "black",
                        }}
                      >
                        {tabs[17]}
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
                      <Text
                        style={{
                          color: pathname === "/sss" ? "#66a109" : "black",
                        }}
                      >
                        {tabs[18]}
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
