import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import "./styles.css";

// import required modules
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import { useLanguage } from "../../Context/Languagecontext";
const Section = styled.section`
  margin-bottom: 40px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
  color: black;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const ContentSection = ({ data }) => {
  const { language } = useLanguage();
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={"auto"}
      freeMode={true}
      scrollbar={true}
      mousewheel={true}
      modules={[FreeMode, Scrollbar, Mousewheel]}
      className="swiperscroll"
    >
      <SwiperSlide className="swiperscroll-slide">
        <Paragraph $rtl={language === "ar"}>{data[0]}</Paragraph>
        <Paragraph $rtl={language === "ar"}>{data[1]}</Paragraph>
        <Paragraph $rtl={language === "ar"}>{data[2]}</Paragraph>
        <Paragraph $rtl={language === "ar"}>{data[3]}</Paragraph>
      </SwiperSlide>
    </Swiper>
  );
};

export default ContentSection;
