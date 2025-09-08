// components/utils/SiteProtection.js
"use client";

import { useEffect } from "react";

// This component will handle client-side effects for site protection
export default function SiteProtection({ children }) {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return <>{children}</>;
}
