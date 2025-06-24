"use client";
import React from "react";
import styled from "styled-components";

const FooterContact = () => {
  const contactInfo = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/673963eed607bfdaeafb33d48e535e780566ae0e?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      text: "(406) 555-0120",
      href: "tel:+14065550120",
      type: "phone",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf7347cf0639d067ff2d6a91bba56b24fd307376?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      text: "Hey@boostim.com",
      href: "mailto:Hey@boostim.com",
      type: "email",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a1f7dd81d3557c1eece98927a8d4b2dcecb86420?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      text: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      href: "https://maps.google.com/?q=2972+Westheimer+Rd.+Santa+Ana,+Illinois+85486",
      type: "address",
    },
  ];

  return (
    <ContactSection>
      <ContactTitle>Contact</ContactTitle>
      <ContactList>
        {contactInfo.map((contact, index) => (
          <ContactItem key={index}>
            <ContactLink
              href={contact.href}
              aria-label={`Contact us via ${contact.type}: ${contact.text}`}
            >
              <ContactIcon src={contact.icon} alt={`${contact.type} icon`} />
              <ContactText>{contact.text}</ContactText>
            </ContactLink>
          </ContactItem>
        ))}
      </ContactList>
    </ContactSection>
  );
};

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 14px;
  color: rgba(155, 155, 156, 1);
  font-weight: 400;
  letter-spacing: -0.28px;
  width: 240px;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
`;

const ContactTitle = styled.h4`
  color: rgba(25, 32, 49, 1);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.18px;
  margin: 0;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 40px 0 0 0;
  width: 100%;
`;

const ContactItem = styled.li`
  margin-bottom: 15px;

  &:first-child {
    margin-bottom: 15px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactLink = styled.a`
  display: flex;
  align-items: stretch;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(25, 32, 49, 1);
  }

  &:focus {
    outline: 2px solid rgba(25, 32, 49, 1);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const ContactIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  flex-shrink: 0;
  align-self: flex-start;
`;

const ContactText = styled.span`
  margin: auto 0;
  line-height: 24px;
  flex: 1;
`;

export default FooterContact;
