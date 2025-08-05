// components/FaqSchema/FaqSchema.js
"use client"; // This component will use a client-side script tag

import React from "react";
import Script from "next/script";

// This component takes an array of questions and generates the FAQPage schema
const FaqSchema = ({ questions = [] }) => {
  // Don't render the schema if there are no questions
  if (!questions || questions.length === 0) {
    return null;
  }

  // Format the questions into the structure Google expects
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.content,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default FaqSchema;
