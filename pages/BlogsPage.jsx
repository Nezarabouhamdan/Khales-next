// app/BlogsPage.js
"use client";
import React, { useEffect, useState } from "react";
import BlogGrid from "../components/Blogs/BlogGrid";
import HeroSlider from "../components/Slider/Slider";
import { useLanguage } from "../Context/Languagecontext";
import CTASection from "../components/Homecontact/CTASection";
import { blogCardsData } from "../data/BlogData"; // Only import blogCardsData now

function BlogsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  // Extract hero slides from the first blog post
  const heroSlides = {
    eng: [
      {
        id: 1,
        image: blogCardsData[0].eng.coverImage, // Using first blog's image
        title: blogCardsData[0].eng.title,
        content: blogCardsData[0].eng.description,
        button: "Start Your Project Today",
      },
    ],
    ar: [
      {
        id: 1,
        image: blogCardsData[0].ar.coverImage, // Using first blog's image
        title: blogCardsData[0].ar.title,
        content: blogCardsData[0].ar.description,
        button: "ابدأ مشروعك اليوم",
      },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <HeroSlider
        slides={heroSlides[language] || heroSlides["eng"]}
        language={language}
        isLoading={isLoading}
        rtl={language === "ar"}
      />
      <BlogGrid cardsData={blogCardsData} />
      <CTASection />
    </div>
  );
}

export default BlogsPage;
