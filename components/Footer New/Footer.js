"use client";

import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../Context/Languagecontext"; // Make sure this path is correct

// --- DATA FOR TRANSLATIONS ---
const footerContent = {
  // ... (data is unchanged)
  eng: {
    description:
      "Khales Group, your trusted partner in transforming visions into successful projects.",
    servicesTitle: "Our Services",
    servicesLinks: [
      { text: "Project Management", href: "/ProjectManagement" },
      { text: "Engineering consultancy", href: "/EngineeringConsultancy" },
      { text: "Investing", href: "/Investing" },
      { text: "Interior Design", href: "/InteriorDesign" },
      { text: "Landscaping", href: "/LandscapingDesign" },
    ],
    companyTitle: "Company",
    companyLinks: [
      { text: "About", href: "/ABOUTUS" },
      { text: "Contact us", href: "/Contact" },
      { text: "Portfolio", href: "#" },
      { text: "Book Consultation", href: "/booking" },
      { text: "Blogs", href: "/Blogs" },
    ],
    contactTitle: "Contact us",
    copyright: "Copyright © 2025 KHALES",
    legal: {
      rights: "All Rights Reserved",
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
    },
  },
  ar: {
    description: "مجموعة خالص، شريككم الموثوق في تحويل الرؤى إلى مشاريع ناجحة.",
    servicesTitle: "خدماتنا",
    servicesLinks: [
      { text: "إدارة المشاريع", href: "/ProjectManagement" },
      { text: "الاستشارات الهندسية", href: "/EngineeringConsultancy" },
      { text: "الاستثمار", href: "/Investing" },
      { text: "التصميم الداخلي", href: "/InteriorDesign" },
      { text: "مناظر طبيعية", href: "/LandscapingDesign" },
    ],
    companyTitle: "الشركة",
    companyLinks: [
      { text: "من نحن", href: "/ABOUTUS" },
      { text: "اتصل بنا", href: "/Contact" },
      { text: "أعمالنا", href: "#" },
      { text: "احجز استشارة", href: "/booking" },
      { text: "المدونة", href: "/Blogs" },
    ],
    contactTitle: "اتصل بنا",
    copyright: "حقوق النشر © 2025 خالص",
    legal: {
      rights: "جميع الحقوق محفوظة",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
    },
  },
};

// --- STYLED COMPONENTS ---

const FooterWrapper = styled.footer`
  background-color: #ffffff;
  border-top: 1px solid #eff0f6;
  direction: ${(props) => props.dir};
`;

const Container = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: 96px 24px 48px;

  @media (min-width: 1024px) {
    padding: 96px 96px 48px;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 48px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 64px;
    margin-bottom: 64px;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 1024px) {
    grid-column: span 1;
  }
`;

const LogoImg = styled.img`
  width: 92px;
  height: auto; // Use auto height to maintain aspect ratio
  object-fit: contain;
`;

const Description = styled.p`
  color: rgba(0, 0, 0, 0.81);
  font-family: Inter;
  font-size: 23px;
  line-height: 30px;
  max-width: 310px;
  margin: 0;
`;

const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

const SocialLink = styled.a`
  display: block;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ColumnTitle = styled.h3`
  color: #000000;
  font-family: Inter;
  font-size: 25px;
  font-weight: 700;
  line-height: 22px;
  margin: 0;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const NavLink = styled.a`
  color: rgba(0, 0, 0, 0.81);
  font-family: Inter;
  font-size: 20px;
  line-height: 20px;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: #66a109;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(0, 0, 0, 0.81);
  font-family: Inter;
  font-size: 18px;
  line-height: 20px;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: #66a109;
  }
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9dbe9;
  margin-bottom: 24px;
`;

const BottomFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
`;

const Copyright = styled.div`
  color: rgba(0, 0, 0, 0.81);
  font-family: Inter;
  font-size: 18px;
  line-height: 30px;
`;

const LegalLinks = styled.div`
  color: rgba(0, 0, 0, 0.81);
  font-family: Inter;
  font-size: 18px;
  line-height: 30px;

  @media (min-width: 768px) {
    text-align: ${(props) => (props.isRTL ? "left" : "right")};
  }
`;

const LegalLink = styled.a`
  color: #66a109;
  text-decoration: underline;
  transition: text-decoration 0.15s ease;

  &:hover {
    text-decoration: none;
  }
`;

// ✨ NEW: A component to force LTR direction for specific text like phone numbers.
const LtrText = styled.span`
  direction: ltr;
  unicode-bidi: isolate;
  display: inline-block;
`;

// --- SVG ICONS (Unchanged) ---
// ... (all your SVG components remain here)
const FacebookIcon = () => (
  <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
    <path
      d="M7.31339 18.395V10.1844H10.2081L10.6415 6.98452H7.31331V4.94155C7.31331 4.01512 7.58348 3.38381 8.97893 3.38381L10.7586 3.38301V0.521091C10.4508 0.482165 9.39429 0.39502 8.16531 0.39502C5.59929 0.39502 3.84255 1.88619 3.84255 4.62474V6.98452H0.94043V10.1844H3.84255V18.3949H7.31339V18.395Z"
      fill="#66A109"
    />
  </svg>
);
const PinterestIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
    <g clipPath="url(#clip0_pinterest)">
      <path
        d="M9.51345 0C4.27182 0 0.0229492 4.24888 0.0229492 9.48971C0.0229492 13.5106 2.52303 16.9448 6.05387 18.217C5.97074 17.4658 5.89632 16.3147 6.08632 15.4945C6.2597 14.7527 7.05136 11.4095 7.05136 11.4095C7.05136 11.4095 6.80437 10.9163 6.80437 10.188C6.80437 9.04321 7.46857 8.18979 8.29507 8.18979C8.99807 8.18979 9.3377 8.71704 9.3377 9.35038C9.3377 10.0573 8.88803 11.1142 8.65607 12.0951C8.46212 12.9145 9.06695 13.5826 9.87603 13.5826C11.3398 13.5826 12.464 12.0397 12.464 9.81746C12.464 7.84542 11.0477 6.46712 9.02262 6.46712C6.67849 6.46712 5.30099 8.22463 5.30099 10.0399C5.30099 10.7485 5.57332 11.5093 5.91453 11.9225C5.98182 12.004 5.99132 12.0761 5.97153 12.1592C5.90899 12.4205 5.77045 12.9802 5.74274 13.0958C5.70632 13.2454 5.62557 13.277 5.4712 13.205C4.46341 12.7355 3.83403 11.2607 3.83403 10.0835C3.83403 7.48521 5.72295 5.09992 9.28466 5.09992C12.1465 5.09992 14.3727 7.13925 14.3727 9.86417C14.3727 12.7063 12.5819 14.9918 10.0945 14.9918C9.25932 14.9918 8.47241 14.558 8.20324 13.9848C8.20324 13.9848 7.78999 15.5578 7.68945 15.9426C7.50341 16.6527 7.00149 17.5425 6.66503 18.084C7.43691 18.3223 8.25312 18.449 9.09862 18.449C14.3426 18.449 18.5907 14.2001 18.5907 8.95929C19.0055 4.24888 14.7574 0.000791667 9.51345 0.000791667V0Z"
        fill="#66A109"
      />
    </g>
    <defs>
      <clipPath id="clip0_pinterest">
        <rect width="19" height="19" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const InstagramIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
    <path
      d="M9.5 1.7c2.5 0 2.8 0 3.8 0.1 0.9 0 1.4 0.2 1.7 0.3 0.4 0.2 0.7 0.4 1 0.7 0.3 0.3 0.5 0.6 0.7 1 0.1 0.3 0.3 0.8 0.3 1.7 0.1 1 0.1 1.3 0.1 3.8s0 2.8-0.1 3.8c0 0.9-0.2 1.4-0.3 1.7-0.2 0.4-0.4 0.7-0.7 1-0.3 0.3-0.6 0.5-1 0.7-0.3 0.1-0.8 0.3-1.7 0.3-1 0.1-1.3 0.1-3.8 0.1s-2.8 0-3.8-0.1c-0.9 0-1.4-0.2-1.7-0.3-0.4-0.2-0.7-0.4-1-0.7-0.3-0.3-0.5-0.6-0.7-1-0.1-0.3-0.3-0.8-0.3-1.7-0.1-1-0.1-1.3-0.1-3.8s0-2.8 0.1-3.8c0-0.9 0.2-1.4 0.3-1.7 0.2-0.4 0.4-0.7 0.7-1 0.3-0.3 0.6-0.5 1-0.7 0.3-0.1 0.8-0.3 1.7-0.3 1-0.1 1.3-0.1 3.8-0.1zm0-1.7c-2.5 0-2.8 0-3.8 0.1s-1.7 0.2-2.3 0.4c-0.6 0.2-1.1 0.5-1.6 1s-0.8 1-1 1.6c-0.2 0.6-0.3 1.3-0.4 2.3-0.1 1-0.1 1.3-0.1 3.8s0 2.8 0.1 3.8 0.2 1.7 0.4 2.3c0.2 0.6 0.5 1.1 1 1.6s1 0.8 1.6 1c0.6 0.2 1.3 0.3 2.3 0.4 1 0.1 1.3 0.1 3.8 0.1s2.8 0 3.8-0.1 1.7-0.2 2.3-0.4c0.6-0.2 1.1-0.5 1.6-1s0.8-1 1-1.6c0.2-0.6 0.3-1.3 0.4-2.3 0.1-1 0.1-1.3 0.1-3.8s0-2.8-0.1-3.8-0.2-1.7-0.4-2.3c-0.2-0.6-0.5-1.1-1-1.6s-1-0.8-1.6-1c-0.6-0.2-1.3-0.3-2.3-0.4-1-0.1-1.3-0.1-3.8-0.1v0z"
      fill="#66A109"
    />
    <path
      d="M9.5 4.6c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 8.1c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2z"
      fill="#66A109"
    />
    <circle cx="14.6" cy="4.4" r="1.1" fill="#66A109" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
    <path
      d="M0.849609 3.31507C0.849609 2.73786 1.05232 2.26167 1.45772 1.8865C1.86312 1.51131 2.39016 1.32373 3.0388 1.32373C3.67587 1.32373 4.1913 1.50842 4.58513 1.87784C4.99053 2.2588 5.19324 2.75518 5.19324 3.36702C5.19324 3.92113 4.99633 4.38288 4.6025 4.7523C4.19711 5.13325 3.66428 5.32373 3.00405 5.32373H2.98668C2.3496 5.32373 1.83417 5.13325 1.44034 4.7523C1.04651 4.37135 0.849609 3.89227 0.849609 3.31507ZM1.07548 18.4666V6.89949H4.93262V18.4666H1.07548ZM7.06969 18.4666H10.9268V12.0077C10.9268 11.6037 10.9732 11.292 11.0658 11.0726C11.228 10.6801 11.4741 10.3482 11.8042 10.077C12.1344 9.80568 12.5484 9.67005 13.0465 9.67005C14.3438 9.67005 14.9925 10.5416 14.9925 12.2848V18.4666H18.8496V11.8345C18.8496 10.126 18.4442 8.83022 17.6334 7.9471C16.8226 7.06399 15.7512 6.62243 14.4191 6.62243C12.9249 6.62243 11.7608 7.26312 10.9268 8.54451V8.57914H10.9095L10.9268 8.54451V6.89949H7.06969C7.09285 7.26889 7.10444 8.41751 7.10444 10.3454C7.10444 12.2732 7.09285 14.9803 7.06969 18.4666Z"
      fill="#66A109"
    />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <path
      d="M18.3332 2.94971V11.283C18.3332 11.8356 18.1137 12.3655 17.723 12.7562C17.3323 13.1469 16.8024 13.3664 16.2498 13.3664H3.74984C3.1973 13.3664 2.6674 13.1469 2.2767 12.7562C1.886 12.3655 1.6665 11.8356 1.6665 11.283V2.94971"
      stroke="black"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3332 2.94954C18.3332 2.39701 18.1137 1.86711 17.723 1.47641C17.3323 1.0857 16.8024 0.866211 16.2498 0.866211H3.74984C3.1973 0.866211 2.6674 1.0857 2.2767 1.47641C1.886 1.86711 1.6665 2.39701 1.6665 2.94954L8.89567 7.46343C9.22678 7.67038 9.60938 7.7801 9.99984 7.7801C10.3903 7.7801 10.7729 7.67038 11.104 7.46343L18.3332 2.94954Z"
      stroke="black"
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
      stroke="black"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- MAIN FOOTER COMPONENT ---
const Footer = () => {
  const { language } = useLanguage();
  const content = footerContent[language] || footerContent.eng;
  const isRTL = language === "ar";

  return (
    <FooterWrapper dir={isRTL ? "rtl" : "ltr"}>
      <Container>
        <MainGrid>
          {/* Brand Section */}
          <BrandSection>
            {/* IMPORTANT: Replace this src with your actual logo image URL */}
            <LogoImg
              src="https://i.ibb.co/jZxqpqmM/Khales-Logo-K-favicon.png"
              alt="Khales Group Logo"
            />
            <Description>{content.description}</Description>
            <SocialMedia>
              <SocialLink href="#" aria-label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="#" aria-label="Pinterest">
                <PinterestIcon />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
            </SocialMedia>
          </BrandSection>

          {/* Our Services Column */}
          <Column>
            <ColumnTitle>{content.servicesTitle}</ColumnTitle>
            <NavList>
              {content.servicesLinks.map((link) => (
                <NavLink key={link.text} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </NavList>
          </Column>

          {/* Company Column */}
          <Column>
            <ColumnTitle>{content.companyTitle}</ColumnTitle>
            <NavList>
              {content.companyLinks.map((link) => (
                <NavLink key={link.text} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </NavList>
          </Column>

          {/* Contact us Column */}
          <Column>
            <ColumnTitle>{content.contactTitle}</ColumnTitle>
            <ContactList>
              <ContactLink href="mailto:info@khales.ae">
                <IconWrapper>
                  <MailIcon />
                </IconWrapper>
                {/* Email is naturally LTR, so no wrapper needed */}
                info@khales.ae
              </ContactLink>
              <ContactLink href="tel:+971551299880">
                <IconWrapper>
                  <PhoneIcon />
                </IconWrapper>
                {/* ✨ UPDATED: Wrap the phone number in our LTR component */}
                <LtrText>+971 55 129 9880</LtrText>
              </ContactLink>
            </ContactList>
          </Column>
        </MainGrid>

        <Divider />

        {/* Bottom Footer */}
        <BottomFooter>
          <Copyright>{content.copyright}</Copyright>
          <LegalLinks isRTL={isRTL}>
            {content.legal.rights} |{" "}
            <LegalLink href="#">{content.legal.terms}</LegalLink> |{" "}
            <LegalLink href="#">{content.legal.privacy}</LegalLink>
          </LegalLinks>
        </BottomFooter>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
