import styled from "styled-components";

export const WhyUsSection = styled.section`
  background-color: #fff;
  display: flex;
  padding: 94px 80px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1450px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export const HeaderLayout = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

export const TitleColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 75%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 25%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const TitleSection = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  font-family: Be Vietnam, -apple-system, Roboto, Helvetica, sans-serif;
  justify-content: start;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export const BrandLabel = styled.div`
  border-radius: 20px;
  align-self: start;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 40px;
  color: #66a109;
  font-weight: 700;
  line-height: 1.3;
  justify-content: start;
`;

export const BrandIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 20px;
  align-self: stretch;
  margin: auto 0;
  flex-shrink: 0;
`;

export const BrandText = styled.span`
  color: #66a109;
  align-self: stretch;
  margin: auto 0;
`;

export const MainHeading = styled.h1`
  color: #000;
  font-size: 64px;
  font-weight: 400;
  line-height: 83px;
  margin-top: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
    line-height: 57px;
  }
`;

export const ExploreButton = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  display: flex;
  margin-top: 128px;
  padding: 20px 30px 20px 30px;
  gap: 16px;
  font-family: Be Vietnam, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 24px;
  color: #f8f8f8;
  font-weight: 500;
  letter-spacing: 0.96px;
  line-height: 1;
  width: 100%;
  background-color: #66a109;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    margin-top: 40px;
    padding: 20px;
  }
`;

export const ButtonText = styled.span`
  color: #f8f8f8;
  align-self: stretch;
  margin: auto 0;
`;

export const ButtonIcon = styled.img`
  aspect-ratio: 3.38;
  object-fit: contain;
  object-position: center;
  width: 27px;
  stroke-width: 1px;
  stroke: #f8f8f8;
  align-self: stretch;
  margin: auto 0;
  flex-shrink: 0;
`;

export const FeaturesContainer = styled.div`
  align-self: start;
  display: flex;
  margin-top: 28px;
  align-items: start;
  gap: 40px 87px;
  font-family: Be Vietnam, -apple-system, Roboto, Helvetica, sans-serif;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export const FeatureCard = styled.article`
  min-width: 240px;
  width: 322px;
`;

export const FeatureIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 70px;
`;

export const FeatureContent = styled.div`
  margin-top: 20px;
  max-width: 100%;
  width: 322px;
`;

export const FeatureHeading = styled.h2`
  color: #000;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.3;
`;

export const FeatureDescription = styled.p`
  color: #a6afb5;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin-top: 16px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #a6afb5;
  background-color: #a6afb5;
  margin-top: 59px;
  width: 1140px;
  max-width: 100%;
  height: 1px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export const BottomImage = styled.img`
  aspect-ratio: 1.78;
  object-fit: contain;
  object-position: center;
  width: 100%;
  align-self: center;
  margin-top: 60px;
  max-width: 981px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;
