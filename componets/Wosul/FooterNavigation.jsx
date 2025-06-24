"use client";
import React from "react";
import styled from "styled-components";

const FooterNavigation = () => {
  const navigationLinks = [
    { text: "Service", href: "/service" },
    { text: "Agency", href: "/agency" },
    { text: "Case Study", href: "/case-study" },
    { text: "Resource", href: "/resource" },
    { text: "Contact", href: "/contact" },
  ];

  const licenseLinks = [
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Copyright", href: "/copyright" },
    { text: "Email Address", href: "/email" },
  ];

  return (
    <NavigationContainer>
      <NavigationColumn>
        <ColumnTitle>Navigation</ColumnTitle>
        <LinksList>
          {navigationLinks.map((link, index) => (
            <ListItem key={index}>
              <FooterLink href={link.href}>{link.text}</FooterLink>
            </ListItem>
          ))}
        </LinksList>
      </NavigationColumn>

      <NavigationColumn>
        <ColumnTitle>Licence</ColumnTitle>
        <LinksList>
          {licenseLinks.map((link, index) => (
            <ListItem key={index}>
              <FooterLink href={link.href}>{link.text}</FooterLink>
            </ListItem>
          ))}
        </LinksList>
      </NavigationColumn>
    </NavigationContainer>
  );
};

const NavigationContainer = styled.nav`
  display: flex;
  min-width: 240px;
  align-items: start;
  gap: 115px;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
    gap: 40px;
  }
`;

const NavigationColumn = styled.div`
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 86px;
`;

const ColumnTitle = styled.h4`
  color: rgba(25, 32, 49, 1);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.18px;
  margin: 0;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 40px 0 0 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FooterLink = styled.a`
  color: rgba(155, 155, 156, 1);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.28px;
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(25, 32, 49, 1);
  }

  &:focus {
    outline: 2px solid rgba(25, 32, 49, 1);
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export default FooterNavigation;
