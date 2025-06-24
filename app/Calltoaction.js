"use client";
import { useEffect } from "react";
import "./globals.css";

function Calltoaction() {
  const handleClick = (e) => {
    // Report conversion without preventing default
    window.gtag_report_conversion("tel:+971551299880");
  };

  return (
    <a
      id="call"
      className="call"
      href="tel:+971551299880"
      onClick={handleClick}
    >
      <i id="call" className="call"></i>
    </a>
  );
}

export default Calltoaction;
