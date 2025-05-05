"use client";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";
function Calltoaction() {
  useEffect(() => {
    // Define the global function once gtag is available
    if (typeof window !== "undefined" && !window.gtag_report_conversion) {
      window.gtag_report_conversion = function (url) {
        const callback = function () {
          if (typeof url !== "undefined") {
            window.location = url;
          }
        };
        window.gtag?.("event", "conversion", {
          send_to: "AW-10827937555/udi-CPyU5cEaEJPulKso",
          value: 1.0,
          currency: "AED",
          event_callback: callback,
        });
        return false;
      };
    }
  }, []);

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
