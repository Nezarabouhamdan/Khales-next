"use client";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";
function Calltoaction() {
  const handleClick = (e) => {
    e.preventDefault();
    window.gtag_report_conversion("tel:+971551299880");
  };

  return (
    <Link
      href="tel:+971551299880"
      className="float2"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <i className="fa fa-phone my-float2"></i>
    </Link>
  );
}
export default Calltoaction;
