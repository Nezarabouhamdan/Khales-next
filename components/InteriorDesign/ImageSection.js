import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export const ImageSection = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) {
    return <p>No images available</p>;
  }

  // Create pairs while maintaining original array
  const slides = [];
  for (let i = 0; i < images.length; i += 2) {
    const pair = images.slice(i, i + 2);
    slides.push(pair);
  }

  return (
    <StyledImageSection>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        speed={1500} // Reduced speed for better mobile experience
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
      >
        {slides.map((slideImages, index) => (
          <SwiperSlide key={index}>
            <SlideContainer>
              <TopImage
                src={slideImages[0]}
                alt={`Slide ${index + 1} - Top Image`}
                loading="lazy"
              />

              <BottomImageContainer>
                <GreenBorderBox aria-hidden="true" />
                <BottomImage
                  src={slideImages[1]}
                  alt={`Slide ${index + 1} - Bottom Image`}
                  loading="lazy"
                />
              </BottomImageContainer>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledImageSection>
  );
};

const StyledImageSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 15px;

  @media (max-width: 991px) {
    padding: 0;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  @media (max-width: 991px) {
    gap: 15px;
  }
`;

const TopImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 4px;
  object-fit: cover;
  margin-left: auto;
  margin-right: 196px;

  @media (max-width: 1200px) {
    width: 250px;
    height: 250px;
    margin-right: 126px;
  }

  @media (max-width: 991px) {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    margin: 0;
  }
`;

const BottomImageContainer = styled.div`
  position: relative;
  width: 455px;
  margin-left: 40px;

  @media (max-width: 1200px) {
    width: 305px;
  }

  @media (max-width: 991px) {
    width: 100%;
    margin: 0;
  }
`;

const GreenBorderBox = styled.div`
  position: absolute;
  width: 151px;
  height: 140px;
  border: 2px solid #66a109;
  border-radius: 4px;
  top: -15px;
  left: -15px;
  z-index: 1;

  @media (max-width: 991px) {
    opacity: 0;
  }
`;

const BottomImage = styled.img`
  width: 100%;
  height: 301px;
  border-radius: 4px;
  object-fit: cover;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    height: 250px;
  }

  @media (max-width: 991px) {
    height: auto;
    aspect-ratio: 16/9;
  }
`;
