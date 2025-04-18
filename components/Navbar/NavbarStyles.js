import Link from "next/link";
import { Container } from "../../utils/Globalstyles";
import styled, { keyframes } from "styled-components";
// In your NavbarStyles.js
// Update your NavbarStyles.js
export const Text = styled.h1`
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  color: black;

  &:hover {
    color: #66a109;
  }

  &[data-active="true"] {
    color: #66a109;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #66a109;
      transform: scaleX(1);
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #66a109;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
`;

// Remove any .is-active or click-based active styles from your CSS

export const NavItem = styled.li`
  height: 80px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);

    ${Text} {
      color: #66a109;
    }
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    &:hover {
      border: none;
      transform: none;
    }
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Nav = styled.nav`
  /* 50% transparent */
  font-size: 10px;
  height: 65px;
  position: absolute; /* Initially absolute */
  top: 0;
  animation: 2s;
  display: flex;
  justify-content: center;
  top: 15px; /* Adjusted top position */

  align-items: center;
  width: 100%;
  z-index: 50;
  background: transparent;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px); /* Adds glass effect */

  &.sticky {
    position: fixed;
    top: 0;
    backdrop-filter: blur(10px); /* Adds glass effect */
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97%;
  border-radius: 9px;
  height: 65px;
  background-color: rgba(235, 233, 233, 0.35); /* Semi-transparent */
  backdrop-filter: blur(25px); /* Glass effect */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* Soft shadow */
  ${Container}

  @media (max-width: 960px) {
    background-color: rgba(235, 233, 233, 0.9); /* More opaque for mobile */
  }
`;

export const NavLogo = styled(Link)`
  color: black;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  margin-left: 20px;
  margin-top: 7px;
  z-index: 50;
`;

export const NavIcon = styled.img`
  width: 6rem;
  @media screen and (max-width: 960px) {
    margin-top: 18px;

    width: 3rem;
  }
`;

export const MobileIcon = styled.div`
  display: none;
  z-index: 50;

  @media screen and (max-width: 960px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    color: black;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  padding: auto;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    padding-top: 30%;
    top: 0;
    left: 0;
    opacity: ${(props) => (props.$show ? 1 : 0)};
    visibility: ${(props) => (props.$show ? "visible" : "hidden")};
    transform: translateY(${(props) => (props.$show ? "0" : "-10px")});
    transition: opacity 0.5s ease;
    background-color: #4f4c4c;
  }

  > li:first-child {
    margin-left: auto;
  }
`;

export const Li = styled.li`
  display: inline-flex;
  list-style: none;
  margin: 0px auto 0;
  padding: 0;
  float: right;
  z-index: 7;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0px 0;
    padding: 0;
    float: center;
    z-index: 7;
  }
`;

export const NavLinks = styled.span`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0rem 0rem;
  height: 100%;

  &:hover {
    color: #c8c9d8;
    transition: all 0.3s ease;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 1rem;
    width: 100%;
    display: table;

    &:hover {
      color: #4b59f7;
      transition: all 0.3s ease;
    }
  }
`;

export const NavBtnLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;
