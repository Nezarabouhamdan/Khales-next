"use client";
import React, { useState, useEffect } from "react";
import BlogGrid from "@/components/Blogs/BlogGrid";
import HeroSlider from "@/components/Slider/Slider"; // Assuming this is the correct path
import CTASection from "@/components/Homecontact/CTASection";

export default function BlogsPageClient({ lang, posts, ctaSectionContent }) {
  const [isLoading, setIsLoading] = useState(true);

  // Reverse the posts array
  const reversedPosts = posts ? [...posts].reverse() : [];

  // Use the first blog post from reversed array for the hero slider content
  const heroSlides =
    reversedPosts?.length > 0
      ? [
          {
            id: reversedPosts[0].id,
            image: reversedPosts[0].coverImage,
            title: reversedPosts[0].title,
            content: reversedPosts[0].description,
            // Pass the correct button link
            buttonLink: `/${lang}/blog/${reversedPosts[0].slug}`,
            buttonText: "Read More",
          },
        ]
      : [];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <HeroSlider
        slides={heroSlides}
        language={lang}
        isLoading={isLoading}
        rtl={lang === "ar"}
      />
      <BlogGrid cardsData={reversedPosts} lang={lang} />
      <CTASection lang={lang} content={ctaSectionContent} />
    </div>
  );
}
