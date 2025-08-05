// components/Footer New/Footer.js
"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

// --- SVG ICONS (Complete, as provided in your original code) ---
const FacebookIcon = () => (
  <svg viewBox="0 0 11 19">
    <path
      d="M7.31339 18.395V10.1844H10.2081L10.6415 6.98452H7.31331V4.94155C7.31331 4.01512 7.58348 3.38381 8.97893 3.38381L10.7586 3.38301V0.521091C10.4508 0.482165 9.39429 0.39502 8.16531 0.39502C5.59929 0.39502 3.84255 1.88619 3.84255 4.62474V6.98452H0.94043V10.1844H3.84255V18.3949H7.31339V18.395Z"
      fill="currentColor"
    />
  </svg>
);
const PinterestIcon = () => (
  <svg viewBox="0 0 19 19">
    <g clipPath="url(#clip0_pinterest)">
      <path
        d="M9.51345 0C4.27182 0 0.0229492 4.24888 0.0229492 9.48971C0.0229492 13.5106 2.52303 16.9448 6.05387 18.217C5.97074 17.4658 5.89632 16.3147 6.08632 15.4945C6.2597 14.7527 7.05136 11.4095 7.05136 11.4095C7.05136 11.4095 6.80437 10.9163 6.80437 10.188C6.80437 9.04321 7.46857 8.18979 8.29507 8.18979C8.99807 8.18979 9.3377 8.71704 9.3377 9.35038C9.3377 10.0573 8.88803 11.1142 8.65607 12.0951C8.46212 12.9145 9.06695 13.5826 9.87603 13.5826C11.3398 13.5826 12.464 12.0397 12.464 9.81746C12.464 7.84542 11.0477 6.46712 9.02262 6.46712C6.67849 6.46712 5.30099 8.22463 5.30099 10.0399C5.30099 10.7485 5.57332 11.5093 5.91453 11.9225C5.98182 12.004 5.99132 12.0761 5.97153 12.1592C5.90899 12.4205 5.77045 12.9802 5.74274 13.0958C5.70632 13.2454 5.62557 13.277 5.4712 13.205C4.46341 12.7355 3.83403 11.2607 3.83403 10.0835C3.83403 7.48521 5.72295 5.09992 9.28466 5.09992C12.1465 5.09992 14.3727 7.13925 14.3727 9.86417C14.3727 12.7063 12.5819 14.9918 10.0945 14.9918C9.25932 14.9918 8.47241 14.558 8.20324 13.9848C8.20324 13.9848 7.78999 15.5578 7.68945 15.9426C7.50341 16.6527 7.00149 17.5425 6.66503 18.084C7.43691 18.3223 8.25312 18.449 9.09862 18.449C14.3426 18.449 18.5907 14.2001 18.5907 8.95929C19.0055 4.24888 14.7574 0.000791667 9.51345 0.000791667V0Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_pinterest">
        <rect width="19" height="19" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 19 19">
    <path
      d="M0.849609 3.31507C0.849609 2.73786 1.05232 2.26167 1.45772 1.8865C1.86312 1.51131 2.39016 1.32373 3.0388 1.32373C3.67587 1.32373 4.1913 1.50842 4.58513 1.87784C4.99053 2.2588 5.19324 2.75518 5.19324 3.36702C5.19324 3.92113 4.99633 4.38288 4.6025 4.7523C4.19711 5.13325 3.66428 5.32373 3.00405 5.32373H2.98668C2.3496 5.32373 1.83417 5.13325 1.44034 4.7523C1.04651 4.37135 0.849609 3.89227 0.849609 3.31507ZM1.07548 18.4666V6.89949H4.93262V18.4666H1.07548ZM7.06969 18.4666H10.9268V12.0077C10.9268 11.6037 10.9732 11.292 11.0658 11.0726C11.228 10.6801 11.4741 10.3482 11.8042 10.077C12.1344 9.80568 12.5484 9.67005 13.0465 9.67005C14.3438 9.67005 14.9925 10.5416 14.9925 12.2848V18.4666H18.8496V11.8345C18.8496 10.126 18.4442 8.83022 17.6334 7.9471C16.8226 7.06399 15.7512 6.62243 14.4191 6.62243C12.9249 6.62243 11.7608 7.26312 10.9268 8.54451V8.57914H10.9095L10.9268 8.54451V6.89949H7.06969C7.09285 7.26889 7.10444 8.41751 7.10444 10.3454C7.10444 12.2732 7.09285 14.9803 7.06969 18.4666Z"
      fill="currentColor"
    />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 16 16">
    <path
      d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.85.174 1.431.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.85-.04 1.43-.174 1.942-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.198-.51.333-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.297c-.04-.85-.174-1.431-.372-1.942a3.916 3.916 0 0 0-.923-1.417A3.916 3.916 0 0 0 13.24.42c-.51-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 1.442c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.282.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.843.038-1.096.047-3.231.047s-2.389-.009-3.232-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.282-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.231 0-2.136.008-2.389.046-3.232.036-.78.166-1.204.275-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.843-.038 1.096-.047 3.231-.047z"
      fill="currentColor"
    />
    <path
      d="M8 4.865a3.135 3.135 0 1 0 0 6.27 3.135 3.135 0 0 0 0-6.27zM8 9.583a1.583 1.583 0 1 1 0-3.166 1.583 1.583 0 0 1 0 3.166z"
      fill="currentColor"
    />
    <path
      d="M12.021 3.25a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92z"
      fill="currentColor"
    />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <path
      d="M18.3332 2.94971V11.283C18.3332 11.8356 18.1137 12.3655 17.723 12.7562C17.3323 13.1469 16.8024 13.3664 16.2498 13.3664H3.74984C3.1973 13.3664 2.6674 13.1469 2.2767 12.7562C1.886 12.3655 1.6665 11.8356 1.6665 11.283V2.94971"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3332 2.94954C18.3332 2.39701 18.1137 1.86711 17.723 1.47641C17.3323 1.0857 16.8024 0.866211 16.2498 0.866211H3.74984C3.1973 0.866211 2.6674 1.0857 2.2767 1.47641C1.886 1.86711 1.6665 2.39701 1.6665 2.94954L8.89567 7.46343C9.22678 7.67038 9.60938 7.7801 9.99984 7.7801C10.3903 7.7801 10.7729 7.67038 11.104 7.46343L18.3332 2.94954Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
    <path
      d="M12.2514 17.3851L12.2605 17.3915C13.0476 17.8926 13.982 18.1102 14.9095 18.0084C15.837 17.9065 16.7019 17.4913 17.3615 16.8313L17.9344 16.2584C18.0614 16.1315 18.1621 15.9808 18.2308 15.815C18.2995 15.6492 18.3349 15.4714 18.3349 15.2919C18.3349 15.1124 18.2995 14.9347 18.2308 14.7688C18.1621 14.603 18.0614 14.4524 17.9344 14.3255L15.5178 11.9107C15.3909 11.7838 15.2403 11.683 15.0745 11.6143C14.9086 11.5456 14.7309 11.5102 14.5514 11.5102C14.3719 11.5102 14.1941 11.5456 14.0283 11.6143C13.8625 11.683 13.7118 11.7838 13.5849 11.9107C13.3287 12.1669 12.9813 12.3108 12.619 12.3108C12.2567 12.3108 11.9092 12.1669 11.653 11.9107L7.78901 8.04586C7.53287 7.78963 7.38897 7.44217 7.38897 7.07987C7.38897 6.71757 7.53287 6.3701 7.78901 6.11388C7.91598 5.987 8.0167 5.83633 8.08542 5.67051C8.15414 5.50468 8.18951 5.32694 8.18951 5.14744C8.18951 4.96794 8.15414 4.79019 8.08542 4.62437C8.0167 4.45854 7.91598 4.30788 7.78901 4.18099L5.37336 1.76625C5.11714 1.51011 4.76967 1.36621 4.40737 1.36621C4.04507 1.36621 3.69761 1.51011 3.44138 1.76625L2.86753 2.33919C2.20768 2.99883 1.79262 3.86385 1.69093 4.79131C1.58924 5.71878 1.80701 6.65318 2.30825 7.44012L2.31371 7.44923C4.9609 11.3658 8.33434 14.7386 12.2514 17.3851V17.3851Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- STYLED COMPONENTS (Your original code, unchanged) ---
const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  color: #5a6475;
  border-top: 1px solid #e9ecef;
  font-family: "Inter", sans-serif;
  direction: ${(props) => props.dir};
`;
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  @media (min-width: 1024px) {
    padding: 5rem 2rem 2.5rem;
  }
`;
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1.5fr repeat(3, 1fr);
    gap: 4rem;
    margin-bottom: 4rem;
  }
`;
const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
`;
const LogoImg = styled.img`
  width: 80px;
  height: auto;
  object-fit: contain;
`;
const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  max-width: 320px;
  margin: 0;
`;
const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};
`;
const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e9ecef;
  transition: background-color 0.2s ease, transform 0.2s ease;
  svg {
    transition: fill 0.2s ease;
    fill: #5a6475;
    width: 18px;
    height: 18px;
  }
  &:hover {
    background-color: #66a109;
    transform: translateY(-2px);
    svg {
      fill: #ffffff;
    }
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const ColumnTitle = styled.h3`
  color: #1a202c;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;
const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const NavLink = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: #5a6475;
  transition: color 0.2s ease;
  &:hover {
    color: #66a109;
  }
`;
const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  text-decoration: none;
  color: #5a6475;
  transition: color 0.2s ease;
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};
  svg {
    transition: stroke 0.2s ease;
    stroke: #5a6475;
  }
  &:hover {
    color: #66a109;
    svg {
      stroke: #66a109;
    }
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e9ecef;
  margin-bottom: 1.5rem;
`;
const BottomFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Copyright = styled.div`
  font-size: 0.875rem;
  text-align: center;
`;
const LegalLinks = styled.div`
  font-size: 0.875rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  span {
    margin: 0 0.25rem;
  }
`;
const LegalLink = styled(Link)`
  color: #5a6475;
  text-decoration: none;
  &:hover {
    color: #66a109;
    text-decoration: underline;
  }
`;
const LtrText = styled.span`
  direction: ltr;
  unicode-bidi: isolate;
  display: inline-block;
`;

// --- MAIN REFACTORED COMPONENT ---
export default function Footer({ lang, content }) {
  // Robust checks for content and its properties
  if (!content || !content.legal) {
    return null; // or a loading skeleton
  }

  const dir = lang === "ar" ? "rtl" : "ltr";
  const servicesLinks = content.servicesLinks || [];
  const companyLinks = content.companyLinks || [];
  const legalInfo = content.legal || {};

  return (
    <FooterWrapper dir={dir}>
      <Container>
        <MainGrid>
          <BrandSection>
            <LogoImg
              src="https://i.ibb.co/jZxqpqmM/Khales-Logo-K-favicon.png"
              alt="Khales Group Logo"
            />
            <Description>{content.description}</Description>
            <SocialMedia dir={dir}>
              <SocialIconLink
                href="https://www.facebook.com/Khales.ae/"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.pinterest.com/khalesae/"
                aria-label="Pinterest"
              >
                <PinterestIcon />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.instagram.com/khales.ae/"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.linkedin.com/company/khales-ae/"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </SocialIconLink>
            </SocialMedia>
          </BrandSection>

          <Column>
            <ColumnTitle>{content.servicesTitle}</ColumnTitle>
            <NavList>
              {servicesLinks.map((link) => (
                <NavLink key={link.text} href={`/${lang}${link.href}`}>
                  {link.text}
                </NavLink>
              ))}
            </NavList>
          </Column>

          <Column>
            <ColumnTitle>{content.companyTitle}</ColumnTitle>
            <NavList>
              {companyLinks.map((link) => (
                <NavLink key={link.text} href={`/${lang}${link.href}`}>
                  {link.text}
                </NavLink>
              ))}
            </NavList>
          </Column>

          <Column>
            <ColumnTitle>{content.contactTitle}</ColumnTitle>
            <ContactList>
              <ContactLink href="mailto:info@khales.ae" dir={dir}>
                <MailIcon />
                <LtrText>info@khales.ae</LtrText>
              </ContactLink>
              <ContactLink href="tel:+971551299880" dir={dir}>
                <PhoneIcon />
                <LtrText>+971 55 129 9880</LtrText>
              </ContactLink>
            </ContactList>
          </Column>
        </MainGrid>

        <Divider />

        <BottomFooter>
          <Copyright>{content.copyright}</Copyright>
          <LegalLinks>
            {legalInfo.rights}
            <span>|</span>
            <LegalLink href={`/${lang}${legalInfo.terms.href}`}>
              {legalInfo.terms.text}
            </LegalLink>
            <span>|</span>
            <LegalLink href={`/${lang}${legalInfo.privacy.href}`}>
              {legalInfo.privacy.text}
            </LegalLink>
          </LegalLinks>
        </BottomFooter>
      </Container>
    </FooterWrapper>
  );
}
