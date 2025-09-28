// lib/schema.js

// This object can be adapted for language if needed
export const getHomePageSchema = (lang) => {
  // You can translate the 'name' and 'description' fields here
  const name =
    lang === "ar"
      ? "خالص - إدارة المشاريع والاستشارات الهندسية في الإمارات"
      : "Khales - Expert Project Management & Engineering Consultancy in UAE";
  const description =
    lang === "ar"
      ? "شركة رائدة في إدارة المشاريع والاستشارات الهندسية في دبي، متخصصة في المشاريع التجارية والسكنية والفلل الفاخرة في جميع أنحاء الإمارات."
      : "Leading project management and engineering consultancy in Dubai, specializing in commercial, residential, and luxury villa projects across the UAE.";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    // ... all the other properties from your original object
  };
};
