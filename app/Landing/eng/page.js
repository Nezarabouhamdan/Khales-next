import React from "react";
import FullPageLayouteng from "./FullPageLayouteng";

export const metadata = {
  // SEO: Title is specific, keyword-rich, and under 60 characters.
  title:
    "Khales | Luxury Villa Design, Engineering & Construction in Dubai & Abu Dhabi",

  // SEO: Description is a compelling summary, under 160 characters, and encourages clicks.
  description:
    "Transform your vision into reality with Khales. We specialize in luxury villa design, engineering consultancy, interior design, and full-service construction across the UAE. Partner with us to build your dream home.",

  // SEO: Keywords include brand, services, and location-specific terms.
  keywords: [
    "Khales",
    "Luxury villa design Dubai",
    "Engineering consultants UAE",
    "High-end construction Abu Dhabi",
    "Interior Design",
    "Architecture Firm UAE",
    "Project Management",
    "Landscape Design",
    "Khales Projects",
    "Building contractors in Dubai",
  ],

  authors: [{ name: "Khales Team", url: "https://www.khales.ae/" }],
  creator: "Khales",

  // Sets the base URL for resolving relative paths in metadata.
  metadataBase: new URL("https://www.khales.ae/"),

  // --- Social Media Sharing (Open Graph for Facebook, LinkedIn, etc.) ---
  openGraph: {
    // SEO: Use the same compelling title.
    title:
      "Khales | Luxury Villa Design, Engineering & Construction in Dubai & Abu Dhabi",
    // SEO: Use the same engaging description.
    description:
      "Transform your vision into reality with Khales. We specialize in luxury villa design, engineering, and full-service construction in the UAE.",
    url: "https://www.khales.ae/",
    siteName: "Khales",

    // IMPORTANT: Add a high-quality image for sharing. Recommended size: 1200x630px.
    images: [
      {
        url: "https://www.khales.ae/path-to-your-featured-image.jpg", // REPLACE THIS URL
        width: 1200,
        height: 630,
        alt: "Luxury villa designed by Khales in Dubai",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  // --- Twitter Sharing ---
  twitter: {
    card: "summary_large_image",
    // SEO: Use a consistent title.
    title:
      "Khales | Luxury Villa Design, Engineering & Construction in Dubai & Abu Dhabi",
    // SEO: Use a consistent description.
    description:
      "Transform your vision into reality with Khales. We specialize in luxury villa design, engineering, and full-service construction in the UAE.",
    // SEO: Add your Twitter handle.
    creator: "@YourTwitterHandle", // REPLACE THIS with your actual Twitter handle
    // The image from openGraph will be used by default.
  },
};

// The rest of your component remains the same.
const Page = () => {
  return <FullPageLayouteng />;
};

export default Page;
