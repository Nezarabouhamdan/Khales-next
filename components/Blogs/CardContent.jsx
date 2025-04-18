import React from "react";
import styled from "styled-components";
import { StyledButton } from "../Homecontact/CTAButton";
import Image from "next/image";

const CardContent = ({
  title,
  authorImage,
  authorName,
  date,
  description,
  isRTL = false,
  buttonText,
}) => {
  return (
    <Content $isRTL={isRTL}>
      <Title $isRTL={isRTL}>{title}</Title>
      <ContentWrapper>
        <MetaInfo $isRTL={isRTL}>
          <AuthorInfo $isRTL={isRTL}>
            <AuthorAvatar src={authorImage} alt={authorName} />
            <AuthorName>{authorName}</AuthorName>
          </AuthorInfo>
          <Separator aria-hidden="true" />
          <PublishDate>{date}</PublishDate>
        </MetaInfo>
        <Description $isRTL={isRTL}>{description}</Description>
        <ViewPostContainer $isRTL={isRTL}>
          <StyledButton href={'#'} $isRTL={isRTL}>{buttonText}</StyledButton>
        </ViewPostContainer>
      </ContentWrapper>
    </Content>
  );
};

const Content = styled.div`
  align-self: start;
  margin-top: 25px;
  padding: 0 20px 20px;
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
`;

const Title = styled.h2`
  color: #121416;
  font-size: 24px;
  font-family: ${(props) => (props.$isRTL ? "'Playfair'" : "'Playfair', serif")};
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
`;

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  flex-direction: column;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: ${(props) => (props.$isRTL ? "flex-end" : "flex-start")};
  flex-wrap: wrap;
  font-family: ${(props) => (props.$isRTL ? "'Playfair'" : "'Playfair', serif")};
  font-size: 16px;
  color: #6c757d;
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${(props) => (props.$isRTL ? "'Playfair'" : "'Playfair', serif")};
  font-size: 16px;
  color: #121416;
  font-weight: 700;
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};
`;

const AuthorAvatar = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.span``;

const Separator = styled.div`
  background-color: rgba(108, 117, 125, 0.4);
  width: 36px;
  height: 1px;
`;

const PublishDate = styled.time``;

const Description = styled.p`
  color: #838383;
  font-size: 16px;
  font-family: ${(props) => (props.$isRTL ? "'Playfair'" : "'Playfair', serif")};
  font-weight: 400;
  line-height: 1.6;
  margin: 20px 0;
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
`;

const ViewPostContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isRTL ? "flex-start" : "flex-end")};
  width: 100%;
  margin-top: 15px;
`;

export default CardContent;
