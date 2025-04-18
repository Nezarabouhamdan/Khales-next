import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./Styles.css";
import { EffectCube, Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
// configure Swiper to use modules

function CubeSwiper() {
  return (
    <div>
      {" "}
      <Swiper
        effect={"cube"}
        autoplay={{
          delay: 750,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1500}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 40,
          shadowScale: 0.5,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCube, Pagination, Autoplay]} // Added Autoplay here
        className="swipercube"
      >
        <SwiperSlide className="swipercube-slide">
          <Image src="https://i.ibb.co/RmkrGcG/pool-min.jpg" alt="cube img 1" fill />
        </SwiperSlide>
        <SwiperSlide className="swipercube-slide">
          <Image src="https://i.ibb.co/xKhfYtPD/interior-min.jpg" alt="cube img 2" fill />
        </SwiperSlide>
        <SwiperSlide className="swipercube-slide">
          <Image fill src="https://i.ibb.co/XrwLfbVn/khales-ae-arab-construction-luxury-engineering-make-it-crea-adbc814e-5da3-4265-a683-b41679c9a755-3-e.png" alt="cube img 3" />
        </SwiperSlide>
        <SwiperSlide className="swipercube-slide">
          <Image fill src="https://i.ibb.co/HDQkwccZ/khales-ae-Modern-minimalist-interior-staircase-open-plan-desi-2ba91f49-ab7b-4ab5-972a-69e06f911a30-1.png" alt="cube img 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CubeSwiper;
