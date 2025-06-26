"use client";
import React from "react";
import styled from "styled-components";

const ImagesSection = () => {
  return (
    <ImagesContainer>
      <ImagesWrapper>
        <TopImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8bebdf1f5482e8e11aac0fc8f206336137aa0eb?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
          alt="Service illustration"
        />
        <BottomImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ba874ea558120e17e7bc2af15c5e65372ef0983?placeholderIfAbsent=true&apiKey=aa3beaa1347a405eb89ef941921d55f8"
          alt="Service process illustration"
        />
      </ImagesWrapper>
    </ImagesContainer>
  );
};

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 46%;
  margin-left: 0px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  flex-direction: column;
  align-self: stretch;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const TopImage = styled.img`
  aspect-ratio: 1.88;
  object-fit: contain;
  object-position: center;
  width: 752px;
  max-width: 100%;
`;

const BottomImage = styled.img`
  aspect-ratio: 1.98;
  object-fit: contain;
  object-position: center;
  width: 752px;
  align-self: end;
  margin-top: 48px;
  max-width: 100%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default ImagesSection;
