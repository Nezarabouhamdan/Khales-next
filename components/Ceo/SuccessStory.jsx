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
                <AuthorImageColumn>
                  <AuthorImage
                    src={authorImageUrl}
                    alt={`${authorName} - ${authorTitle}`}
                  />
                </AuthorImageColumn>
                <AuthorCardColumn>
                  <AuthorCard>
                    <AuthorName>{authorName}</AuthorName>
                    <AuthorJobTitle>{authorTitle}</AuthorJobTitle>
                  </AuthorCard>
                </AuthorCardColumn>
              </AuthorLayoutContainer>
            </AuthorSection>
          </AuthorColumn>
        </TestimonialSection>
      </ContentWrapper>
    </MainContainer>
  );
};

// --- STYLED COMPONENTS ---

const MainContainer = styled.section`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 12px 70px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const ContentWrapper = styled.div`
  margin-left: 15px;
  width: 100%;
  max-width: 1450px;
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
  align-items: center;
  justify-content: center;
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
  color: #000;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Title = styled.h1`
  color: #000;
  font-size: 70px;
  font-weight: 800;
  line-height: 1.1;
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
  font-size: 70px;
  font-weight: 700;
  line-height: 1;
  margin-left: 19px;

  letter-spacing: -3.3px;
  z-index: 10;
  margin-top: 20px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const TestimonialText = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 100;
  letter-spacing: -0.28px;
  align-self: stretch;
  margin-left: 19px;
  margin-top: 10px;
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
    margin-left: 0;
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthorCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 100%;
  margin-left: 0px;
  position: relative;
`;

const AuthorCard = styled.div`
  border-radius: 8px;
  background-color: rgba(102, 161, 9, 1);
  z-index: 10;
  color: #fff;
  padding: 38px 48px;
  margin-top: -200px;

  /* Adjust width to look good with the newly sized image */
  width: 90%;
  max-width: 450px;

  @media (max-width: 991px) {
    margin-top: -80px;
    padding-left: 20px;
    padding-right: 20px;
    width: 90%;
  }
`;

const AuthorName = styled.h2`
  color: #fff;
  font-size: 50px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.7px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const AuthorJobTitle = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.31px;
  margin-top: 17px;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 20px;
  }
`;

const AuthorImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  /* This controls the image size, restoring its original look */
  width: 75%;
  max-width: 480px;
  margin-left: 0px;
`;

const AuthorImage = styled.img`
  aspect-ratio: 0.78;
  object-fit: cover;
  object-position: center;
  width: 100%;
  border-radius: 10px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default SuccessStory;
