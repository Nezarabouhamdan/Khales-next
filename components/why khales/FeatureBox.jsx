import React from "react";
import {
  FeatureCard,
  FeatureIcon,
  FeatureContent,
  FeatureHeading,
  FeatureDescription,
} from "./WhyUsStyles";

const FeatureBox = ({ iconSrc, iconAlt, heading, description }) => {
  return (
    <FeatureCard>
      <FeatureIcon src={iconSrc} alt={iconAlt} />
      <FeatureContent>
        <FeatureHeading>{heading}</FeatureHeading>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureContent>
    </FeatureCard>
  );
};

export default FeatureBox;
