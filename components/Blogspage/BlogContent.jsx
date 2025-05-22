import React from "react";
import styled from "styled-components";
import QuoteBlock from "./QuoteBlock";

const BlogContent = () => {
  return (
    <ContentContainer>
      <ContentWrapper>
        <MainParagraph>
          Structured gripped tape invisible moulded cups for sauppor firm hold
          strong powermesh front liner sport detail. Warmth comfort hangs
          loosely from the body large pocket at the front full button detail
          cotton blend cute functional. Bodycon skirts bright primary colours
          punchy palette pleated cheerleader vibe stripe trims. Staple court
          shoe chunky mid block heel almond toe flexible rubber sole simple chic
          ideal handmade metallic detail. Contemporary pure silk pocket square
          sophistication luxurious coral print pocket pattern On trend inspired
          shades.
          <br />
          <br />
          Striking pewter studded epaulettes silver zips inner drawstring waist
          channel urban edge single-breasted jacket. Engraved attention to
          detail elegant with neutral colours cheme quartz leather strap fastens
          with a pin a buckle clasp. Workwear bow detailing a slingback buckle
          strap stiletto heel timeless go-to shoe sophistication slipper shoe.
          Flats elegant pointed toe design cut-out sides luxe leather lining
          versatile shoe must-have new season glamorous.
          <br />
        </MainParagraph>
        <QuoteBlock />
        <SecondParagraph>
          Foam padding in the insoles leather finest quality staple flat slip-on
          design pointed toe off-duty shoe. Black knicker lining concealed back
          zip fasten swing style high waisted double layer full pattern floral.
          Polished finish elegant court shoe work duty stretchy slingback strap
          mid kitten heel this ladylike design
          <br />
          <br />
          Eget aenean tellus venenatis. Donec odio tempus. Felis arcu{" "}
          <LinkText
            href="https://blueprinttheme.com/the-influencers/sapien-lorem-libero-augue-tincidunt/#"
            target="_blank"
          >
            pretium metus
          </LinkText>{" "}
          nullam quam aenean sociis quis sem neque vici libero. Venenatis nullam
          fringilla pretium magnis aliquam nunc vulputate integer augue
          ultricies cras. Eget viverra feugiat cras ut. Sit natoque montes
          tempus ligula eget vitae pede rhoncus maecenas consectetuer commodo
          condimentum aenean.
          <br />
        </SecondParagraph>
      </ContentWrapper>
    </ContentContainer>
  );
};

const ContentContainer = styled.section`
  flex-grow: 1;
  color: rgba(18, 20, 22, 1);
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const MainParagraph = styled.p`
  font-size: 18px;
  font-family:
    Europa-Regular,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  line-height: 33px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SecondParagraph = styled.p`
  font-size: 18px;
  font-family:
    Europa-Regular,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 40px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const LinkText = styled.a`
  text-decoration: underline;
  color: inherit;
`;

export default BlogContent;
