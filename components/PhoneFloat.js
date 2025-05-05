"use client";

import Link from "next/link";
import { useCallback } from "react";
import "../app/globals.css";

export default function PhoneFloat() {
  const phoneNumber = "+971551299880";
  const telUrl = `tel:${phoneNumber}`;

  const handleCallClick = useCallback(
    (e) => {
      e.preventDefault();
      if (typeof window.gtag_report_conversion === "function") {
        // fire conversion, then dial
        window.gtag_report_conversion(telUrl);
      } else {
        // fallback
        window.location.href = telUrl;
      }
    },
    [telUrl]
  );

  return (
    <Link
      href={telUrl}
      onClick={handleCallClick}
      className="float2"
      aria-label="Call us"
    >
      <i className="fa fa-phone my-float2"></i>
    </Link>
  );
}
