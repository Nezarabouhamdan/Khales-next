"use client";
import React, { useState, useEffect } from "react";
import BlogGrid from "@/components/Blogs/BlogGrid";
import HeroSlider from "@/components/Slider/Slider"; // Assuming this is the correct path
import CTASection from "@/components/Homecontact/CTASection";

export default function BlogsPageClient({ lang, posts, ctaSectionContent }) {
  const [isLoading, setIsLoading] = useState(true);

  // Use the first blog post for the hero slider content
  const heroSlides =
    posts?.length > 0
      ? [
          {
            id: posts[0].id,
            image: posts[0].coverImage,
            title: posts[0].title,
            content: posts[0].description,
            // Pass the correct button link
            buttonLink: `/${lang}/blog/${posts[0].slug}`,
            button: "Read More",
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
      <BlogGrid cardsData={posts} lang={lang} />
      <CTASection lang={lang} content={ctaSectionContent} />
    </div>
  );
}
