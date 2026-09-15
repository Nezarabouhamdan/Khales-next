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

  // Always render the same tree on server and client - branching on
  // `typeof window` here (the previous version of this file did) makes the
  // server-rendered HTML and the first client render structurally
  // different, which is exactly what triggers a hydration mismatch.
  // StyleSheetManager is a harmless no-op pass-through once hydrated.
  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
