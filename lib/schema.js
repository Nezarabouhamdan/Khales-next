// lib/schema.js

// This object can be adapted for language if needed
export const getHomePageSchema = (lang) => {
  // You can translate the 'name' and 'description' fields here
  const name =
    lang === "ar"
      ? "خالص - شركة رائدة للهندسة المعمارية في دبي"
      : "Khales - Premier Architecture & Interior Design Company Dubai, UAE";
  const description =
    lang === "ar"
      ? "وصف باللغة العربية..."
      : "Dubai's premier architecture and interior design company...";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    // ... all the other properties from your original object
  };
};
