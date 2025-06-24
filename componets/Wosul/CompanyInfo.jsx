"use client";
import React from "react";
import styled from "styled-components";

const CompanyInfo = () => {
  const socialLinks = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d98222a136090a57821a3c120fbee263ff4927c9?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Social media platform 1",
      href: "#",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/75bdeaaffbb320766d5a871c401b3316330a59a7?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Social media platform 2",
      href: "#",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2cb27c156dc9a1e1cd99a8edfe56edbb4162c855?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Social media platform 3",
      href: "#",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e3179fea2aa19f757add00bde4d6eb052062843f?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      alt: "Social media platform 4",
      href: "#",
    },
  ];

  return (
    <CompanySection>
      <CompanyName>MAC</CompanyName>
      <CompanyDescription>
        We offers a comprehensive suite of digital marketing services that cover
        all aspects of our online presence. From SEO and social media marketing
        to content creation and PPC advertising, they have the expertise and
        resources to handle our diverse marketing needs.
      </CompanyDescription>
      <SocialLinksContainer>
        {socialLinks.map((link, index) => (
          <SocialLink key={index} href={link.href} aria-label={link.alt}>
            <SocialIcon src={link.src} alt={link.alt} />
          </SocialLink>
        ))}
      </SocialLinksContainer>
    </CompanySection>
  );
};

const CompanySection = styled.div`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 534px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const CompanyName = styled.h3`
  align-self: stretch;
  gap: 12px;
  font-family:
    Manrope,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 37px;
  color: rgba(2, 4, 7, 1);
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: -1.85px;
  margin: 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const CompanyDescription = styled.p`
  color: rgba(155, 155, 156, 1);
  font-size: 14px;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  line-height: 24px;
  align-self: stretch;
  margin: 30px 0 0 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: start;
  gap: 12px;
  justify-content: start;
`;

const SocialLink = styled.a`
  display: inline-block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid rgba(2, 4, 7, 1);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const SocialIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 34px;
  border-radius: 0px;
  flex-shrink: 0;
`;

export default CompanyInfo;
