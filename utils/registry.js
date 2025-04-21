"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }) {
  // Create one stylesheet instance per render
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    // Extract the style tags and clear for next render
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // During client-side, just render children normally
  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  // On server, wrap in StyleSheetManager to collect styles
  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
