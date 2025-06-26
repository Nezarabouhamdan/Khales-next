import React from "react";
import {
  HeaderContainer,
  HeaderLayout,
  TitleColumn,
  ButtonColumn,
  TitleSection,
  BrandLabel,
  BrandIcon,
  BrandText,
  MainHeading,
  ExploreButton,
  ButtonText,
  ButtonIcon,
} from "./WhyUsStyles";

const WhyUsHeader = () => {
  return (
    <HeaderContainer>
      <HeaderLayout>
        <TitleColumn>
          <TitleSection>
            <BrandLabel>
              <BrandIcon
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7ecbe4e2e4cd3c7bde2ad93b9d04bcc8175c808?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
                alt="Khales brand icon"
              />
              <BrandText>Why Khales</BrandText>
            </BrandLabel>
            <MainHeading>Elevating Home Construction Standards</MainHeading>
          </TitleSection>
        </TitleColumn>
        <ButtonColumn>
          <ExploreButton
            type="button"
            aria-label="Explore more about our services"
          >
            <ButtonText>Explore More</ButtonText>
            <ButtonIcon
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e125cc178537ec9789247aaf83a515070cd5fb2?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
              alt=""
            />
          </ExploreButton>
        </ButtonColumn>
      </HeaderLayout>
    </HeaderContainer>
  );
};

export default WhyUsHeader;
