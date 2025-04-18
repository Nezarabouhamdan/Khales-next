import React from "react";
import styled from "styled-components";
import { useLanguage } from "../../Context/Languagecontext";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";

const BlogCard = ({
  data, // Should contain eng/ar versions of content
  ...props
}) => {
  const { language } = useLanguage();
  const content = data[language] || data["eng"]; // Fallback to English
  const isRTL = language === "ar";

  return (
    <Article dir={isRTL ? "rtl" : "ltr"}>
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
          {...props}
        />
      </CardContainer>
    </Article>
  );
};

const Article = styled.article`
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
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

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default BlogCard;
