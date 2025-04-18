import styled from "styled-components";
import { Column, Row } from "../../utils/Globalstyles";
import Image from "next/image";

export const FooterContainer = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 10rem 0 0rem 0;
  height: 100%;
`;

export const FooterWrapper = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

export const FooterSubscription = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  padding: 24px;
  color: black;
`;

export const FooterSubHeading = styled.p`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-bottom: 24px;
  font-size: 24px;
`;

export const FooterRow = styled(Row)`
  flex-wrap: wrap;
  @media screen and (max-width: 820px) {
    > div {
      width: 20%;
    }

    > div:first-child {
      width: 100%;
    }
  }

  @media screen and (max-width: 420px) {
    flex-direction: column;
    align-items: center;

    * {
      width: 100%;
      text-align: center;
    }
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
`;

export const FooterColumn = styled(Column)`
  @media screen and (max-width: 999px) {
    align-items: center;
    grid-column: 1/-1;
  }
`;

export const FooterSubText = styled.p`
  margin-bottom: 24px;
  font-size: 20px;
`;

export const FooterLinksContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 820px) {
    padding-top: 32px;
  }
`;

export const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  text-align: left;
  box-sizing: border-box;
  color: #66a109;

  @media screen and (max-width: 1000px) {
    align-items: center;
  }
`;

export const FooterLinkTitle = styled.h2`
  margin-bottom: 16px;
`;

export const FooterLink = styled.span`
  color: rgb(0, 0, 0);
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    color: #3333333;
    transition: 0.3s ease-out;
  }
`;

export const FooterLogo = styled.span`
  color: rgba(255, 255, 255, 0.2);
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 9rem;
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;

export const SocialIcon = styled(Image)`
  margin-right: 10px;
  width: 150px;
`;

export const FooterRights = styled.div`
  color: #333333;
  margin-bottom: 16px;
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  border-top: 1px solidrgb(255, 255, 255);
  padding: 1rem 0;
  margin: 1rem 0 0;
`;

export const FooterSocialIcon = styled.a`
  color: #66a109;
  font-size: 24px;
`;

export const FooterAddress = styled.div`
  color: #66a109;
  margin: 0.4rem auto 0.4rem;
  max-width: 20rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 2;
  text-align: center;

  @media screen and (min-width: 1000px) {
    margin-left: 0px;
    text-align: left;
    margin-right: 1rem;
  }
`;
