"use client";
import { Heroimg, Herosection } from "@/components/Hero/Herostyles";
import { useLanguage } from "@/Context/Languagecontext";
import { contactData } from "@/data/contactData";
import React, { useEffect, useState } from "react";
import img from "../public/assets/Screenshot 2025-03-18 122742.png";
import ContactUs from "@/components/figmaform/ContactUs";
import { GreenText, Title } from "@/components/Whoweare/TextContent";
import CTASection from "@/components/Homecontact/CTASection";
import { Row2 } from "@/utils/Globalstyles";
import ServiceCard from "@/components/Services2 copy/ServiceCard";

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
      <Herosection>
        <Heroimg
          src="https://i.ibb.co/XfxqjCKb/Screenshot-2025-03-18-122742-1.png"
          style={{ filter: "brightness(75%)" }}
          alt=""
        />
      </Herosection>
      <ContactUs />
      <section id="offices-location" aria-label="offices-location">
        <div style={{ display: "grid", placeItems: "center", margin: "70px" }}>
          {" "}
          <Title>
            Offices<GreenText> Location</GreenText>
          </Title>
        </div>
        {serviceChunks.map((chunk, index) => (
          <div key={index}>
            <Row2 rtl={language === "ar" ? true : undefined}>
              {chunk.map((service, idx) => (
                <ServiceCard
                  key={idx}
                  imageSrc={service.image}
                  titlePart1={service.titlePart1}
                  titlePart2={service.titlePart2}
                  description={service.description}
                  buttonText={language === "ar" ? "المزيد" : "Learn More"}
                  rtl={language === "ar"}
                />
              ))}
            </Row2>
          </div>
        ))}
      </section>
      <CTASection />
    </>
  );
};

export default ContactPage;
