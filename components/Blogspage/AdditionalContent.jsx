import React from "react";
import styled from "styled-components";

const AdditionalContent = () => {
  return (
    <>
      <SectionTitle>Eu ridiculus fringilla aenean</SectionTitle>
      <SectionParagraph>
        Sociis consequat adipiscing sit curabitur donec sem luctus cras natoque
        vulputate dolor eget dapibus. Nec vitae eros ullamcorper laoreet dapibus
        mus ac ante viverra. A aenean sit augue curabitur et parturient nisi sed
        enim. Nulla nec quis sit quisque sem commodo ultricies neque. Lorem eget
        venenatis dui ante luctus ultricies tellus montes. Quis in sapien
        tempus.
        <br />
        <br />
      </SectionParagraph>
      <NumberedList>
        <br />
        1-Crisp fresh iconic elegant timeless clean perfume
        <br />
        2-Neck straight sharp silhouette and dart detail
        <br />
        3-Machine wash cold slim fit premium stretch selvedge denim comfortable
        low waist
        <br />
      </NumberedList>
      <ClosingParagraph>
        See-through delicate embroidered organza blue lining luxury acetate-mix
        stretch pleat detailing. Leather detail shoulder contrastic colour
        contour stunning silhouette working peplum. Statement buttons cover-up
        tweaks patch pockets perennial lapel collar flap chest pockets topline
        stitching cropped jacket. Effortless comfortable full leather lining
        eye-catching unique detail to the toe low 'cut-away' sides clean and
        sleek. Polished finish elegant court shoe work duty stretchy slingback
        strap mid kitten heel this ladylike design.
        <br />
      </ClosingParagraph>
      <FooterSection>
        <FooterContent />
      </FooterSection>
      <FooterDivider />
    </>
  );
};

const SectionTitle = styled.h2`
  color: rgba(18, 20, 22, 1);
  font-size: 40px;
  font-family:
    Europa-Bold,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 80px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const SectionParagraph = styled.p`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family:
    Europa-Regular,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 20px;
  margin-right: -2px;
  width: 1083px;
  align-self: stretch;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const NumberedList = styled.div`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family:
    Europa-Regular,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 42px;
  margin-left: 64px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ClosingParagraph = styled.p`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family:
    Europa-Regular,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 24px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FooterSection = styled.footer`
  margin-top: 303px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  margin-top: 27px;
  align-items: start;
  gap: 40px 54px;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FooterDivider = styled.div`
  display: flex;
  margin-top: 57px;
  align-items: start;
  gap: 40px 54px;
  justify-content: start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export default AdditionalContent;
