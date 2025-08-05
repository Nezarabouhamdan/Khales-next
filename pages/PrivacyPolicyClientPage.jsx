"use client";

import React from "react";
import styled from "styled-components";

// --- Styled Components (from your original file) ---
const PolicyContainer = styled.div`
  max-width: 800px;
  margin: 10rem auto 4rem; /* Added more top margin to clear the navbar */
  padding: 2rem 3rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: "Inter", sans-serif;
  color: #333;
  direction: ${(props) => props.dir};

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 8rem auto 2rem;
  }
`;

const PolicyHeader = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  border-bottom: 2px solid #66a109;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-inline-start: 25px;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 0.5rem;
`;

const LastUpdatedText = styled.p`
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  margin-top: 3rem;
  text-align: center;
`;

const ContactLink = styled.a`
  color: #66a109;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const PhoneNumber = styled.p`
  direction: ltr;
  unicode-bidi: embed;
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
`;

// --- The Refactored Main Component ---
export default function PrivacyPolicyClientPage({ lang, content }) {
  // ================== THE FIX IS HERE ==================
  // If the `content` prop is missing for any reason,
  // we render a simple fallback instead of crashing.
  if (!content) {
    return (
      <PolicyContainer>
        <PolicyHeader>Content Not Available</PolicyHeader>
        <Paragraph>
          The content for this page could not be loaded. Please check the
          dictionary files.
        </Paragraph>
      </PolicyContainer>
    );
  }
  // =====================================================

  return (
    <PolicyContainer dir={lang === "ar" ? "rtl" : "ltr"}>
      <PolicyHeader>{content.title}</PolicyHeader>

      {content.sections?.map((section, index) => (
        <Section key={index}>
          <SectionTitle>{section.heading}</SectionTitle>
          {section.content && <Paragraph>{section.content}</Paragraph>}

          {section.list && (
            <UnorderedList>
              {section.list.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </UnorderedList>
          )}

          {section.extra && <Paragraph>{section.extra}</Paragraph>}

          {section.contactDetails && (
            <div>
              {section.contactDetails.map((detail, i) => {
                const parts = detail.split(/:(.*)/s);
                const label = parts[0];
                const value = parts[1]?.trim();
                const isEmail =
                  label.toLowerCase().includes("email") ||
                  label.includes("البريد الإلكتروني");
                const isPhone =
                  label.toLowerCase().includes("phone") ||
                  label.includes("رقم التواصل");

                if (isEmail && value) {
                  return (
                    <Paragraph key={i}>
                      {label}:{" "}
                      <ContactLink href={`mailto:${value}`}>
                        {value}
                      </ContactLink>
                    </Paragraph>
                  );
                }
                if (isPhone && value) {
                  return (
                    <PhoneNumber key={i} dir={lang === "ar" ? "rtl" : "ltr"}>
                      {label}: {value}
                    </PhoneNumber>
                  );
                }
                return <Paragraph key={i}>{detail}</Paragraph>;
              })}
            </div>
          )}
        </Section>
      ))}

      <LastUpdatedText>{content.lastUpdated}</LastUpdatedText>
    </PolicyContainer>
  );
}
