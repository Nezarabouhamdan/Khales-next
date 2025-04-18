"use client";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button2 } from "../../utils/Globalstyles";
import {
  AnimatedSlideContent,
  Column,
  ContentColumn,
  NextArrow,
  Paragraph,
  PrevArrow,
  Row,
  SlideContent,
  SlideImage,
  SliderWrapper,
  StyledSlider,
  TextContianer,
  Title,
} from "./SliderStyles"

// HeroSlider Component
const HeroSlider = ({ slides, language, isLoading, rtl }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Disable interactions if there's only 1 slide
  const isSingleSlide = slides.length === 1;

  const settings = {
    infinite: slides.length > 1, // Disable infinite loop for 1 slide
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: slides.length > 1, // Disable autoplay for 1 slide
    autoplaySpeed: 2500,
    rtl: rtl,
    arrows: slides.length > 1, // Hide arrows for 1 slide

    swipe: slides.length > 1, // Disable swiping for 1 slide
    draggable: slides.length > 1, // Disable dragging for 1 slide
    dots: slides.length > 1, // Hide dots for 1 slide
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <SliderWrapper>
      {isLoading ? (
        <Skeleton height="95vh" width="100%" />
      ) : (
        <StyledSlider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id}>
              <SlideImage
                src={slide.image}
                alt={slide.title}
                fill
                loading="lazy"
                style={{ filter: "brightness(70%)" }}
              />
              <AnimatedSlideContent key={currentSlide}>
                <SlideContent>
                  <Row $rtl={rtl}>
                    <Column $rtl={rtl}>
                      <TextContianer>
                        <Title $rtl={rtl}>{slide.title}</Title>
                        <Paragraph $rtl={rtl}>{slide.content}</Paragraph>
                      </TextContianer>
                    </Column>
                    <ContentColumn>
                      <Button2>{slide.button}</Button2>
                    </ContentColumn>
                  </Row>
                </SlideContent>
              </AnimatedSlideContent>
            </div>
          ))}
        </StyledSlider>
      )}
    </SliderWrapper>
  );
};
export default HeroSlider;
