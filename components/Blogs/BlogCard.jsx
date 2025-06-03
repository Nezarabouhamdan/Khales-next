// components/Blogs/BlogCard.js
import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../Context/Languagecontext";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import Link from "next/link"; // Import Link from Next.js

const BlogCard = ({ data, ...props }) => {
  const { language } = useLanguage();
  const content = data[language] || data["eng"];
  const isRTL = language === "ar";

  return (
    <Article dir={isRTL ? "rtl" : "ltr"}>
      {/* Wrap card with Link */}
      <Link href={`/blog/${data.id}`} passHref legacyBehavior>
        <CardLink>
          <CardContainer>
            <CardHeader
              coverImage={content.coverImage}
              tags={content.tags}
              avatarImage={content.authorImage}
              isRTL={isRTL}
            />
            <CardContent
              title={content.title}
              authorImage={content.authorImage}
              authorName={content.authorName}
              date={content.date}
              description={content.description}
              isRTL={isRTL}
              buttonText={content.buttonText}
              link={data.id}
              {...props}
            />
          </CardContainer>
        </CardLink>
      </Link>
    </Article>
  );
};

const Article = styled.article`
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
`;

const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: none;
  }
`;

const CardContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default BlogCard;
