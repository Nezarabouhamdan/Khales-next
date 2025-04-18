import BookingPage from "@/pages/BookingPage";
import React from "react";

export const metadata = {
  title: "Book an appointemt - Khales",
  description:
    "Welcome to Khales. Explore our luxury design and project management solutions.",
  keywords: [
    "Khales",
    "Luxury Design",
    "Interior Design",
    "Architecture",
    "Project Management",
    "Construction",
    "Khales Projects",
  ],
  authors: [{ name: "Khales Team", url: "http://localhost:3000/" }],
  creator: "Khales",
  metadataBase: new URL("http://localhost:3000/"),
  openGraph: {
    title: "Book an appointemt - Khales",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
    url: "http://localhost:3000/",
    siteName: "Khales",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book an appointemt - Khales",
    description:
      "Welcome to Khales. Explore our luxury design and project management solutions.",
  },
};

const Booking = () => {
  return <BookingPage />;
};

export default Booking;
