"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MultiStepFormnew from "@/components/New Stepper/MultiStepForm";

// The main page wrapper that controls the background and top padding
const Wrapper = styled.section`
  position: relative; /* This is crucial for positioning the decorative shapes */
  width: 100%;
  min-height: 100vh;
  z-index: 1; /* Ensure wrapper is behind modals but in front of body */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px; /* Restored original top padding */
  padding-bottom: 50px;
  background: #f8f9fa; /* The light gray background */
  overflow: hidden; /* Prevents shapes from spilling out */
`;

// The decorative shape component is moved here
const DecorativeShape = ({ initialX, initialY, size, stiffness, rtl }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Use finalX to handle RTL layout correctly
  const finalX = rtl ? `calc(100% - ${initialX} - ${size})` : initialX;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) / (width / 2);
      const y = (clientY - (top + height / 2)) / (height / 2);
      setPosition({ x: x * stiffness, y: y * stiffness });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [stiffness]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "absolute",
        top: initialY,
        left: finalX,
        width: size,
        height: size,
        backgroundColor: "rgba(102, 161, 9, 0.08)", // Kept the subtle green
        borderRadius: "50%",
        zIndex: -1, // Places it behind the form content
        x: position.x,
        y: position.y,
        transition: { type: "spring", stiffness: 200, damping: 30 },
      }}
    />
  );
};

export default function BookingPageClient({ lang, content }) {
  if (!content) {
    return null;
  }
  const isRTL = lang === "ar";

  return (
    <Wrapper>
      {/* Decorative shapes are placed in the main wrapper to position correctly */}
      <DecorativeShape
        initialX="15%"
        initialY="15%"
        size="300px"
        stiffness={15}
        rtl={isRTL}
      />
      <DecorativeShape
        initialX="65%"
        initialY="50%"
        size="450px"
        stiffness={10}
        rtl={isRTL}
      />

      {/* The form component no longer has its own wrapper, it's just the form itself */}
      <MultiStepFormnew lang={lang} content={content} />
    </Wrapper>
  );
}
