"use client";
import { useLanguage } from "@/Context/Languagecontext";
import { contactData } from "@/data/contactData";
import React, { useEffect, useState } from "react";
import ContactUs from "@/components/ContactForm/ContactUs";
import CTASection from "@/components/Homecontact/CTASection";
import OfficeLocationsFinal from "@/components/Locations/L2";
const ContactPage = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // change metadata from client side
  useEffect(() => {
    document.title = `${language === "ar" ? "تواصل معنا" : "Contact us"}`;
  }, [language]);

  // Get translated services data array (flat list)
  const services = contactData[language] || contactData["eng"];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Create chunks of 3 items for each row
  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const serviceChunks = chunkArray(services, 3);

  return (
    <>
      {" "}
      <div style={{ display: "grid", placeItems: "center", margin: "70px" }}>
        <ContactUs />{" "}
      </div>
      <OfficeLocationsFinal />
      <CTASection />
    </>
  );
};

export default ContactPage;
