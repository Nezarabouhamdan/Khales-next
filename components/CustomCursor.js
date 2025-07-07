// src/components/CustomCursor/CustomCursor.js

"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Wrapper for the custom SVG Arrow. It follows the mouse instantly.
const CursorWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 10000; // Keep the arrow on top

  // The CSS filter creates a clean, non-blending black border
  // Applied twice for a thicker, more solid look.
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))
    drop-shadow(0px 0px 2px rgba(0, 0, 0, 1));
`;

// The custom SVG arrow. The inner fill will have the blend mode.
const StyledArrowSVG = styled(motion.svg)`
  position: absolute;
  transform: translate(-5px, -5px); // Offset to align with the real cursor tip
  // The white fill of the SVG will invert colors.
  mix-blend-mode: difference;
`;

// The soft, green aura that follows the cursor with a delay.
const CursorAura = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 9999;

  // Made the aura larger for a more noticeable shadow
  width: 50px;
  height: 50px;
  border-radius: 50%;

  // The "shadow" effect using your brand color
  background: radial-gradient(
    circle,
    rgba(102, 161, 9, 0.25) 0%,
    rgba(102, 161, 9, 0) 70%
  );

  transform: translate(-50%, -50%);
`;

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Instant position for the arrow
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for the trailing aura. Stiffness is lower for a longer, softer trail.
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const auraX = useSpring(cursorX, springConfig);
  const auraY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable this effect entirely on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Find all interactive elements on the page
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );

    window.addEventListener("mousemove", moveCursor);
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Don't render anything on touch devices
  if (isTouch) {
    return null;
  }

  return (
    <>
      <CursorWrapper style={{ x: cursorX, y: cursorY }}>
        <StyledArrowSVG
          width="24"
          height="24"
          viewBox="0 0 24 24"
          initial={{ scale: 1 }}
          animate={{ scale: isHovering ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* This path has ONLY a white fill. The border is handled by the CSS filter. */}
          <path
            d="M3.63,3.63L21.99,12L12.37,13.25L9.75,21.99L3.63,3.63Z"
            fill="white"
          />
        </StyledArrowSVG>
      </CursorWrapper>

      <CursorAura
        style={{
          x: auraX,
          y: auraY,
          // The aura expands even more on hover for a more pronounced effect
          transform: `translate(-50%, -50%) scale(${isHovering ? 3 : 1})`,
        }}
      />
    </>
  );
};

export default CustomCursor;
