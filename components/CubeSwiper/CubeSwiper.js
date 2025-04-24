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
          <Image
            src="https://i.ibb.co/gFFG55Cx/4fa612ff-f5df-45ff-a473-d38cef3d2b17.jpg"
            alt="cube img 1"
            fill
          />
        </SwiperSlide>
        <SwiperSlide className="swipercube-slide">
          <Image
            src="https://i.ibb.co/14ZwMyy/6f03f20c-3c54-4929-bbf4-5ca3d1a6d586.jpg"
            alt="cube img 2"
            fill
          />
        </SwiperSlide>
        <SwiperSlide className="swipercube-slide">
          <Image
            fill
            src="https://i.ibb.co/mVcNSCM1/55c99507-b985-4e62-b24b-f3df47a62b12.jpg"
            alt="cube img 3"
          />
        </SwiperSlide>
        <SwiperSlide className="swipercube-slide">
          <Image
            fill
            src="https://i.ibb.co/VGGvczn/ea71d61d-911a-4fa7-a8e1-d1fa9e5201ab.jpg"
            alt="cube img 4"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default CubeSwiper;
