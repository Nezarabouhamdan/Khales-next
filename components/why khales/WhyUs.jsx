import React from "react";
import WhyUsHeader from "./WhyUsHeader";
import FeatureBox from "./FeatureBox";
import {
  WhyUsSection,
  MainContainer,
  FeaturesContainer,
  Divider,
  BottomImage,
} from "./WhyUsStyles";

const WhyUs = () => {
  const features = [
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c79dddb69ee2000df607ec04b2d5ee67b3473d27?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      iconAlt: "Quality craftsmanship icon",
      heading: "Quality Craftsmanship",
      description:
        "Vel purus etiam sollicitudin ac amet sed maecenas. Condimentum nascetur cras id scelerisque. Penatibus amet elit est.",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8f34e59850b9f1543fca565753da55542ac7af26?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      iconAlt: "Customization options icon",
      heading: "Customization Options",
      description:
        "Vel purus etiam sollicitudin ac amet sed maecenas. Condimentum nascetur cras id scelerisque. Penatibus amet elit est.",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/12a984ce3608834ba75cd2f6b91e0ebba18d593f?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8",
      iconAlt: "Timely completion icon",
      heading: "Timely Completion",
      description:
        "Vel purus etiam sollicitudin ac amet sed maecenas. Condimentum nascetur cras id scelerisque. Penatibus amet elit est.",
    },
  ];

  return (
    <WhyUsSection aria-labelledby="why-us-heading">
      <MainContainer>
        <WhyUsHeader />
        <FeaturesContainer role="list" aria-label="Our key features">
          {features.map((feature, index) => (
            <div key={index} role="listitem">
              <FeatureBox
                iconSrc={feature.iconSrc}
                iconAlt={feature.iconAlt}
                heading={feature.heading}
                description={feature.description}
              />
            </div>
          ))}
        </FeaturesContainer>
        <Divider role="separator" aria-hidden="true" />
        <BottomImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/43669622fd4b3514cac8865258635e91e530500e?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
          alt="Construction project showcase demonstrating our quality standards"
        />
      </MainContainer>
    </WhyUsSection>
  );
};

export default WhyUs;
