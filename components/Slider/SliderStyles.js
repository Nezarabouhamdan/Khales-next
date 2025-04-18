
import styled, { keyframes } from "styled-components";
import Slider from "react-slick";
import Image from "next/image";

// Styled Components (unchanged)
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1280,
};

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-50%) scale(1.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const PrevArrow = styled(ArrowButton)`
  left: 25px;
`;

export const NextArrow = styled(ArrowButton)`
  right: 25px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
  justify-content: ${(props) => (props.$page ? "space-evenly" : "space-between")};
  align-content: flex-start;
  align-items: flex-start;
  width: 70vw;
  @media screen and (max-width: 968px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1200px) {
    justify-content: space-evenly;
  }
`;

export const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: black;
  height: 95vh;
  @media screen and (max-width: 968px) {
    flex-direction: column;
    height: 75vh;
  }
`;

export const creativeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -60%) scale(0.8) rotate(-10deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
`;

export const AnimatedSlideContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  z-index: 1;
  animation: ${creativeIn} 1s ease-out;
`;

export const StyledSlider = styled(Slider)`
  .slick-slide {
    position: relative;
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 95vh;
    overflow: hidden;
  }

  .slick-dots {
    color: white;
    bottom: 20px;
  }
`;

export const ContentColumn = styled.div`
  margin-top: 42%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 40vw;
    margin-top: 50%;
    margin-right: 00px;
  }
  @media (max-width: 968px) {
    height: 20vh;
    width: 100vw;
    margin-top: 00%;
    margin-right: 0;
  }
`;

export const SlideContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  z-index: 1;
`;

export const SlideImage = styled(Image)`
  width: 100vw;
  object-fit: fill;
  border-radius: 15px;
  height: 100vh;
  display: ${({ loaded }) => (loaded ? "block" : "none")};
  @media (max-width: 968px) {
    object-fit: cover;
    width: 100%;
    height: 95vh;
  }
`;

export const Column = styled.div`
  display: flex;
  width: ${(props) => (props.$rtl ? "38vw" : "70vw")};
  flex-direction: column;
  margin-top: 30%;
  @media (max-width: 1200px) {
    width: 40vw;
    margin-right: 00px;
  }
  @media (max-width: 968px) {
    height: 50vh;
    margin-top: -15%;
    justify-content: flex-end;
    align-items: flex-end;
    align-content: flex-end;
    width: 100vw;
    margin-right: 0;
  }
`;

export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  width: 90%;
  font-size: 40px;
  line-height: 50px;

  @media (width<981px) {
    margin-right: 0px;
    width: 70%;
    font-size: 18px;
  }
`;

export const Subtitle = styled.h5`
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  font-family: "Inter ExtraLight", sans-serif;
  font-size: 30px;
  margin-top: 0px;

  @media (max-width: ${breakpoints.lg}px) {
    font-size: 25px;
  }

  @media (max-width: ${breakpoints.md}px) {
    font-size: 20px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: 18px;
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: 16px;
  }
`;

export const TextContianer = styled.div`
  font-family: "Inter";
  width: 700px;
  height: 400px;
  margin-top: 120px;
  @media (max-width: 968px) {
    width: 100%;
  }
`;

export const Paragraph = styled.p`
  font-family: "Inter ExtraLight", sans-serif;
  font-size: 20px;
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  width: 90%;

  @media (max-width: ${breakpoints.lg}px) {
    width: 60%;
    font-size: 15px;
  }

  @media (max-width: ${breakpoints.md}px) {
    margin-top: 20px;
    font-size: 13px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    font-size: 12px;
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: 11px;
  }
`;