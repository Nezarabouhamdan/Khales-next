// src/components/CustomCursor/CustomCursor.js

"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none; /* This is crucial - the cursor itself should not be interactive */
  z-index: 10000;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 1))
    drop-shadow(0px 0px 2px rgba(0, 0, 0, 1));
`;

const StyledArrowSVG = styled(motion.svg)`
  position: absolute;
  /* The x/y props in the component will handle the transform for perfect alignment */
  mix-blend-mode: difference;
`;

const CursorAura = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 9999;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(102, 161, 9, 0.25) 0%,
    rgba(102, 161, 9, 0) 70%
  );
  transform: translate(-50%, -50%); /* Center the aura on its own coordinates */
`;

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const auraX = useSpring(cursorX, springConfig);
  const auraY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // --- REVISED, MORE ROBUST HOVER LOGIC ---
    const handleMouseOver = (e) => {
      // Check if the element being hovered over is interactive
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Listen to events on the whole document for reliability
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

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
          // --- THE PIXEL-PERFECT OFFSET ---
          // This moves the SVG container itself so the tip of the arrow
          // is exactly where the browser's real cursor event fires.
          x="-3.63"
          y="-3.63"
        >
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
          scale: isHovering ? 3 : 1, // Using scale directly is cleaner
        }}
      />
    </>
  );
};

export default CustomCursor;
