import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay, Pagination } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const SwiperContainer = styled.div`
  width: 100%;
  height: 600px; // Set a fixed height for the slider
  position: relative;

  @media (max-width: 991px) {
    height: 400px;
  }

  @media (max-width: 640px) {
    height: 300px;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function VerticalSlider() {
  return (
    <SwiperContainer>
      <Swiper
        direction={"vertical"}
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        modules={[EffectCube, Pagination, Autoplay]}
        className="swipervertical"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SwiperSlide key={index}>
            <SlideImage
              src="https://i.ibb.co/DPKhyq7k/khales-ae-real-photograph-of-a-super-luxury-modern-mansion-fr-c2c57d33-5a47-4ccb-b054-498b16745d23-3.png"
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
}
