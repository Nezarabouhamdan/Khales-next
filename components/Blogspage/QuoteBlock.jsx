import React from "react";
import styled from "styled-components";

const QuoteBlock = () => {
  return (
    <QuoteContainer>
      <QuoteIcon
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5626f45df99f1434dc2edae72652a2e32e076fc2?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf"
        alt="Quote icon"
      />
      <QuoteText>
        Knicker lining concealed back zip fasten swing style high waisted double
        layer full pattern floral.
        <br />
      </QuoteText>
    </QuoteContainer>
  );
};

const QuoteContainer = styled.blockquote`
  display: flex;
  margin-top: 80px;
  width: 100%;
  padding-bottom: 31px;
  align-items: stretch;
  gap: 36px;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const QuoteIcon = styled.img`
  aspect-ratio: 1.08;
  object-fit: contain;
  object-position: center;
  width: 41px;
  align-self: start;
  margin-top: 17px;
  flex-shrink: 0;
`;

const QuoteText = styled.p`
  flex-grow: 1;
  flex-shrink: 1;
  width: 990px;
  flex-basis: auto;
  font-family:
    Europa-Bold,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

export default QuoteBlock;
