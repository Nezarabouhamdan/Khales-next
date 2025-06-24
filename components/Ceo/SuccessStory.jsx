"use client";
import styled from "styled-components";

const SuccessStory = ({
  title = "Success Story",
  testimonialContent = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada.",
  testimonialContentSecond = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada",
  authorName = "Majed AlKindi",
  authorTitle = "Ceo and Founder of Khales Group",
  authorImageUrl = "https://cdn.builder.io/api/v1/image/assets/TEMP/be5480bffe065efd04d757dea30c7774c6227289?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf",
}) => {
  return (
    <MainContainer>
      <ContentWrapper>
        <TestimonialSection>
          <TestimonialColumn>
            <TestimonialContent>
              <Title>{title}</Title>
              <QuoteMark>“</QuoteMark>
              <TestimonialText>
                {testimonialContent}
                <br />
                {testimonialContentSecond}
              </TestimonialText>
            </TestimonialContent>
          </TestimonialColumn>
          <AuthorColumn>
            <AuthorSection>
              <AuthorLayoutContainer>
                <AuthorCardColumn>
                  <AuthorCard>
                    <AuthorName>{authorName}</AuthorName>
                    <AuthorJobTitle>{authorTitle}</AuthorJobTitle>
                  </AuthorCard>
                </AuthorCardColumn>
                <AuthorImageColumn>
                  <AuthorImage
                    src={authorImageUrl}
                    alt={`${authorName} - ${authorTitle}`}
                  />
                </AuthorImageColumn>
              </AuthorLayoutContainer>
            </AuthorSection>
          </AuthorColumn>
        </TestimonialSection>
      </ContentWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 129px;
  padding-bottom: 129px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  margin-left: 15px;
  width: 100%;
  max-width: 1952px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const TestimonialSection = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const TestimonialColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 40%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-family: Manrope, -apple-system, Roboto, Helvetica, sans-serif;
  color: #000;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  color: #000;
  font-size: 120px;
  font-weight: 800;
  line-height: 120px;
  letter-spacing: -1.32px;
  margin-left: 19px;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 44px;
  }
`;

const QuoteMark = styled.div`
  color: #66a109;
  font-size: 300px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -3.3px;
  z-index: 10;
  margin-top: -14px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
  @media (max-width: 640px) {
    margin-top: 1px;
  }
`;

const TestimonialText = styled.p`
  color: #000;
  font-size: 25px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: -0.28px;
  align-self: stretch;
  margin-left: 19px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AuthorColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 60%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const AuthorSection = styled.div`
  flex-grow: 1;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const AuthorLayoutContainer = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const AuthorCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 46%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const AuthorCard = styled.div`
  border-radius: 10px;
  background-color: rgba(102, 161, 9, 1);
  z-index: 10;
  margin-top: 482px;
  margin-right: -231px;
  padding-left: 48px;
  padding-right: 48px;
  padding-top: 96px;
  padding-bottom: 38px;
  font-family: Manrope, -apple-system, Roboto, Helvetica, sans-serif;
  color: #fff;
  fill: #66a109;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const AuthorName = styled.h2`
  color: #fff;
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.7px;
  margin-right: 29px;
  @media (max-width: 991px) {
    margin-right: 10px;
    font-size: 40px;
  }
`;

const AuthorJobTitle = styled.p`
  color: #fff;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -0.31px;
  margin-top: 17px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AuthorImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 54%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const AuthorImage = styled.img`
  aspect-ratio: 0.78;
  object-fit: contain;
  object-position: center;
  width: 100%;
  border-radius: 10px;
  flex-grow: 1;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default SuccessStory;
