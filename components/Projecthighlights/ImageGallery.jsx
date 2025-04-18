import React from "react";
import styled from "styled-components";

const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 20px;
  height: 300px;
  role: img;
  aria-label: ${(props) => props.alt};
`;

const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      <ImageContainer src={images[0]} alt="Project floorplan" />
      <ImageContainer src={images[1]} alt="Building exterior view" />
      <ImageContainer src={images[2]} alt="Interior design showcase" />
    </Gallery>
  );
};

export default ImageGallery;
