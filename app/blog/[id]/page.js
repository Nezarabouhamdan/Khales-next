// app/blog/[id]/page.js
"use client";
import { useParams } from "next/navigation";
import BlogSinglePage from "@/components/Blogspage/BlogSinglePage";

import { blogCardsData } from "@/data/BlogData";
import { useLanguage } from "@/Context/Languagecontext";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find blog by id
    const blog = blogCardsData.find((item) => item.id === parseInt(id));

    if (!blog) {
      setLoading(false);
      return;
    }

    // Get the current language version
    const langData = blog[language] || blog["eng"];

    // Create full blog data structure
    const fullBlogData = {
      id: blog.id,
      coverImage: langData.coverImage,
      title: langData.title,
      ...langData.fullContent, // Spread all fullContent properties
    };

    setBlogData(fullBlogData);
    setLoading(false);
  }, [id, language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <p>The requested blog could not be loaded</p>
      </div>
    );
  }

  return <BlogSinglePage blogData={blogData} />;
}
