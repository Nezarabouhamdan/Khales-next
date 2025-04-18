import styled, { createGlobalStyle } from "styled-components";
import { SecondColor, PrimaryColor, Redcolor } from "../data/GlobalData";
import { motion } from "framer-motion";

export const Globalstyle = createGlobalStyle`*{
box-sizing: border-box;
margin: 0;
padding: 0px;
font-family:  "Playfair";
}`;
export const Container = styled.div`
  width: 100%;
  max-width: 1330px;
  margin: 0 auto;
  padding: 50px;
  @media screen and (max-width: 968px) {
    padding: 0 30px;
  }
`;
export const Section = styled.div`
  color: white;
  padding: 0px;
`;
export const MainHeading = styled(motion.h1)`
  font-size: 35px;
  margin-bottom: 2rem;
  color: ${({ inverse }) => (inverse ? PrimaryColor : SecondColor)};
  width: 100%;
  letter-spacing: 4px;
  text-align: center;
  @media screen and (max-width: 968px) {
    font-size: 22px;
  }
`;
export const MainHeading2 = styled.h1`
  font-size: 20px;
  margin-bottom: 0rem;
  color: ${({ inverse }) => (inverse ? PrimaryColor : SecondColor)};
  letter-spacing: 6px;
  text-align: center;
`;
export const Button = styled(motion.div)`
  border-radius: 8px;
  background: ${({ back }) => (back ? "black" : "none")};
  width: 160px;
  display: flex;
  flex-direcation: row;
  justify-content: space-evenly;
  align-items: center;
  height: 45px;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 12px")};
  font-weight: 1000;
  color: #fff;
  font-size: ${({ fontbig }) => (fontbig ? "20px" : "14px")};
  color: ${({ back }) => (back ? "white" : "white")};
  outline: none;
  border: 2px solidrgb(255, 255, 255);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;

  &:before {
    background: ${({ back }) => (back ? "#fff" : "white")};

    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: all 0.6s ease;
    width: 102%;
    height: 0%;
  }
  &:hover:before {
    height: 200%;
  }
  &:hover {
    z-index: 1;

    color: ${({ back }) => (back ? "black" : "black")};
  }
  @media screen and (max-width: 968px) {
    margin-top: 40px;
    width: 135px;
    font-size: small;
  }
`;
export const Button2 = styled(motion.div)`
  border-radius: 50rem;
  background: ${({ back }) => (back ? "black" : "none")};
  width: 100%;
  display: flex;
  flex-direcation: row;
  justify-content: space-evenly;
  align-items: center;
  height: 45px;
  margin-top: 50px;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 12px")};
  font-weight: 1000;
  font-size: ${({ fontbig }) => (fontbig ? "20px" : "14px")};
  color: ${({ back }) => (back ? "white" : "white")};
  outline: none;
  border: 2px solid WHITE;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;

  &:before {
    background: ${({ back }) => (back ? "#fff" : "#66a109")};

    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: all 0.6s ease;
    width: 102%;
    height: 0%;
  }
  &:hover:before {
    height: 200%;
  }
  &:hover {
    z-index: 1;

    color: ${({ back }) => (back ? "black" : "white")};
  }
  @media screen and (max-width: 968px) {
    margin-top: 40px;
    width: 170px;
    font-size: small;
  }
`;

export const Row = styled(motion.div)`
  display: flex;
  flex-directions: row;
  justify-content: space-evenly;
  align-items: ${({ align }) => (align ? align : "")};
  gap: ${({ gap }) => (gap ? gap : "1rem")};
  padding: ${({ padding }) => (padding ? padding : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
  position: ${({ position }) => (position ? position : "")};
  width: ${({ width }) => (width ? width : "auto")};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "auto")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "auto")};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "auto")};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "")};
`;
export const Row2 = styled(motion.div)`
  display: flex;
  flex-direction: ${(props) => (props.$rtl ? "row-reverse" : "row")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};

  align-items: ${({ align }) => (align ? align : "")};
  gap: ${({ gap }) => (gap ? gap : "3rem")};
  padding: ${({ padding }) => (padding ? padding : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
  position: ${({ position }) => (position ? position : "")};
  width: ${({ width }) => (width ? width : "auto")};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "auto")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "auto")};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "auto")};
  margin-bottom: 50px;
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "")};
  @media screen and (max-width: 968px) {
    padding: 0 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};
  gap: ${({ gap }) => (gap ? gap : "5rem")};
  padding: ${({ padding }) => (padding ? padding : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
  position: ${({ position }) => (position ? position : "")};
  width: ${({ width }) => (width ? width : "auto")};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "auto")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "auto")};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "auto")};
`;

export const Heading = styled(motion.h1)`
  font-size: clamp(1.3rem, 13vw, 3.1rem);
  margin: ${({ margin }) => (margin ? margin : "")};
  margin-bottom: ${({ mb }) => (mb ? mb : "")};
  margin-top: ${({ mt }) => (mt ? mt : "")};
  color: ${({ inverse }) => (inverse ? "black" : "black")};
  letter-spacing: 0.4rem;
  line-height: 1.06;
  text-align: center;
  font-family: "Inter";
  width: ${({ width }) => (width ? width : "100%")};
`;
export const TextWrapper = styled(motion.span)`
  color: ${({ color }) => (color ? "#828282" : "828282")};
  font-size: ${({ size }) => (size ? size : "")};
  font-weight: ${({ weight }) => (weight ? weight : "")};
  letter-spacing: ${({ spacing }) => (spacing ? spacing : "")};
  padding: ${({ padding }) => (padding ? padding : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
  margin-bottom: ${({ mb }) => (mb ? mb : "")};
  margin-top: ${({ mt }) => (mt ? mt : "")};
  font-family: "Inter", sans-serif;
`;
