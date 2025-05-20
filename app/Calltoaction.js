"use client";
import { useEffect } from "react";
import "./globals.css";

function Calltoaction() {
  const handleClick = (e) => {
    // Report conversion without preventing default
    window.gtag_report_conversion("tel:+971551299880");
  };

  return (
    <a href="tel:+971551299880" className="float2" onClick={handleClick}>
      <i className="fa fa-phone my-float2"></i>
    </a>
  );
}

export default Calltoaction;
