import React from "react";

import FullPageLayout from "./FullPageLayout";
export const metadata = {
  title: "خالص | شركاؤك في الرفاهية للتصميم والبناء في الإمارات",
  description:
    "خالص للاستشارات الهندسية: خبراء في إدارة المشاريع، التصميم الداخلي الفاخر، تصميم الحدائق، وخدمات البناء المتكاملة في دبي، أبوظبي، وكافة الإمارات. نحوّل رؤيتك إلى واقع ملموس.",

  keywords: [
    "Khales",
    "Luxury Design",
    "Interior Design",
    "Architecture",
    "Project Management",
    "Construction",
    "Khales Projects",
  ],
  authors: [{ name: "Khales Team", url: "http://www.khales.ae/" }],
  creator: "Khales",
  metadataBase: new URL("http://www.khales.ae/"),
  openGraph: {
    title: "Portfolio",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://www.khales.ae/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};
function page() {
  return (
    <div>
      <FullPageLayout />
    </div>
  );
}

export default page;
