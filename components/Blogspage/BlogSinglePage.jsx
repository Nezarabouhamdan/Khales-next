"use client";
import * as React from "react";
import styled from "styled-components";
import { useLanguage } from "../../Context/Languagecontext"; // Update path as needed
import Image from "next/image"; // Add this import

function BlogSinglePage({ blogData }) {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  // Check if blogData is available
  if (!blogData) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading blog content...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <BlogContainer rtl={isRTL}>
      <HeroSection>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src={blogData.coverImage}
            alt={blogData.title}
            layout="fill"
            objectFit="cover"
            quality={100}
            style={{
              filter: "blur(1px) brightness(0.7)",
              transform: "scale(1.1)", // Helps reduce blur edge cropping
            }}
          />
        </div>

        <HeroContent>
          <ContentWrapper>
            <TitleWrapper>
              <MainTitle rtl={isRTL}>{blogData.title}</MainTitle>
              <Subtitle rtl={isRTL}>{blogData.subtitle}</Subtitle>
            </TitleWrapper>
          </ContentWrapper>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentLayout space={220}>
          <TwoColumnLayout rtl={isRTL}>
            <MainColumn>
              <ArticleContent>
                <TextContent>
                  {blogData.paragraphs.map((para, i) => (
                    <Paragraph key={i} rtl={isRTL}>
                      {para}
                    </Paragraph>
                  ))}

                  <QuoteBlock rtl={isRTL}>
                    {isRTL ? (
                      <>
                        <QuoteText rtl={isRTL}>{blogData.quote}</QuoteText>
                        <QuoteIcon
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5626f45df99f1434dc2edae72652a2e32e076fc2?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf"
                          alt="Quote icon"
                        />
                      </>
                    ) : (
                      <>
                        <QuoteIcon
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5626f45df99f1434dc2edae72652a2e32e076fc2?placeholderIfAbsent=true&apiKey=934bdeb679ca4a59ae6868dceb8afdbf"
                          alt="Quote icon"
                        />
                        <QuoteText rtl={isRTL}>{blogData.quote}</QuoteText>
                      </>
                    )}
                  </QuoteBlock>

                  <SecondParagraph rtl={isRTL}>
                    {blogData.paragraphAfterQuote}
                  </SecondParagraph>
                </TextContent>
              </ArticleContent>
            </MainColumn>

            <SidebarColumn>
              <SidebarContent>
                <div>
                  <SidebarHeading rtl={isRTL}>
                    {isRTL ? "تابعنا" : "Follow Us"}
                  </SidebarHeading>
                  <SocialIconsWrapper>
                    {blogData.socialCounts.map((count, index) => (
                      <SocialIconContainer key={index}>
                        <SocialIcon
                          src={
                            [
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACd0lEQVR4nO2Zv2sUQRTHP+evwigSrCyiAWOpTXpBxcRcCkn8BVrZif+AjUJQSA5Jo4VpbMQiJtrE/CCojZ3YGEQx9nYaE6PRxOJWBp4Qwu7czuzb3Tm4L3zhmn1vPszsm7fvoKWWgtceoArUgGlgEfgO/BWb35+A58AI0CfPBKGKLGgSWAciR/8BJoAzEqsUXQDeeyw+yQvAYJEAR4BXigBb/QLoyhviHLCSI0QkXgUu5wFgzu9QAQDRFtc03x0TaKwEiEj8QAtmpESISHwnK8SlACAi8ZUs1emn0iLMffFQSraJux/YB7QDncBRYLRBjB/AYR8QrRL7EjiQIt/VFLHmXSHOK0HMAjtS5kwDYjyQFqKidGN/kyOEMsi7tFWsT2k3hh0gXEAioDdNwEklkGOWHN3Afcn1328dYo83gtjr2cXGVZjtFoiNjPF/A7ttIFXFTjZJj5Ry9NhAakpJXltyfCniHZxWSjKXEL8iX4saOaZsIJ8V74847VKKH8lnc6KWmgjkqw1ko4lA1rVBBqT522zbdKQ9wXcd85q1JmrZA+Q0Onri0QIlarFEENNDueT9aAs2WxLINmBNs/wOlwRySPvzt98j4HXpnza7y3Ihdsf4mkfeXhuIacR+eQQtuvyuAW2NtvlpE4BMkEI9TQByKg2IOccfAgZZwEFnAwapUuA4KC+QeTzUKVPxUEBWgIN4yjSE9QBA6sBFMup2ACBDKOleiSCjKOuGwzHTAKlr7kTcX2/LBYAsucx4s3SqMzmCTAEdFKh+y5jTB+SNzJ1L03HgsYxJXUFWZfJoYgQjs8iTwE0pDHHaCTwDbgEn5JmWWiJg/QOlYrQmouYwLQAAAABJRU5ErkJggg==",
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACvElEQVR4nO2ZTWsUQRCGn0P04pLE+3oQs1nBi/h1EPVg9GziX1GTP6CoR2MOGvHjP4gRsxtJBH+Cq7nHk27EGIyXtaWgGoaB+ejpWbsX9oUX9jBVXe9OVXVNN4wxRhRoA0tAF/gM7AOmJoov8dkBFnWt2nEO2Kgx6LL8CFysQ8AhYAX4G0CEUcraj4GJqiKOAu8DCjApbmhMzm8iRCqZAn4ADrsIWYkgaJPBZZfCDlkTpoAS29kyQmJMKZOitOhctAMH+AZoKtcKnm3lCVkKLKSZiOVYwbN38oR0RkjIep6Q7RqC6QPPgRuaqkeU8nseeAHsZtiuqQDh24J1vuQJ2fMQ8Bu4C0xSjCngntpUXW8vb4GqTndSLfE68Ez/tf3EQLgKXEu1+h2PdTNRVYTN7Vlgq4TNZqLrND3EZKJKOtk3cSUn97Nq6bLangcOQgqRmrBvwkVEUsyM+ngQSkhfi5aS6ZRFmbAF0xX+jFqESIu1hW08Oae+XoYQIvsE2p18hTxVXwshhEhdoC3WV4i0ZkE7hJCG2vyqQYj4EDRGXchP9TU56qnVC5la82qzWoOQJ+rrZgghMsWis5OvkKvq61XoDXHTQ4R8WtsN8UcIIUZHccFx4JvniPKwgn1tQg50FEcHwL6D7XfgktpeCD00mtQYP1PydFLS6YTayNfg14prZ8J4iJFR3GJOx46e7jPCT9qdbGHbN1FVhBnWp66kxn0t2iJMa038Gdan7raHY8tdnWJlADypE0BDfy9oi3XtTsb18CH0cZBx4Ls8IYsRBGhK8laekFYEARrHWS8T3QiCND6njBangUEEwZoMDspeK6B3diZSPsIBE5Gm2Jbr1Rt68RjTpU+35Gab+WaWA1/FDTSdKl9PJ3EKeB1ARAc4wxDQ0puidT3CqePgwVJ89XTHvl10tTbGGPwf/APThWw4L8JxcwAAAABJRU5ErkJggg==",
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nO2ZvUoDQRSFP1Hs/AFtBQt9A99BwV20FIV0lr6CjQTyID6DnSbqg9gp/iDopkpzZWEaw+zOzFrsHbkHThNuZs+Xu3dmk4DJZOqqI2ACTAHp2VNgDJSpECMF4aXBw5ROiHIXMSATBUEl4LsYkEpBUAn4OwZEMnFQfQcUA5lT2yfyApwAG85nwFuOHdlXtF0H1fbmVU/9Wo4gpae+yBHkHRgAm871jLzmCCKKHFTfAcVA5tSlnSk1j+4s2gKWgRVgD7gEPnIAqQ/Og8C114Eb7SA7MRcHloAHzSAp2gZmOYAsRtRcawa5AJ5d3RNw3lJ7qhXkOPH7965WkPuGNevfCOjwMNobyGfDmvXrPi1oBfnrumIgWEe8slsLmxFs1xL/eNiMiJ0jtG+TmhzUvwGpFISUgL9iQMYKgkrAtzEgpYKgEvAhkRoqCCsNviJRhfv3VMPMVO52iu6EyWTil34AFdRDhxtrT8cAAAAASUVORK5CYII=",
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETUlEQVR4nO2aX4hXVRDHP7bWumhhyaYgpdAffRBBiFCRhdRMIf8UBJr4qKIgyT70VJJo5aqoi+hDT2b0oPSkrmJkf6Do36qglesfLLcENRXD1Vx33SsT84vL+Z37u3PO7+5uiV8Y+K3nzsyZe2fmzMwR7uPexaPAPGAD0AK0AVeBTiX5fULX5Jm5wFD+I6gFFgIHgW4gCSThOQC8rrL6HHVAI3A+YvNZ9AewEhjUV0bMAs4UaIBLp4GXetMA+fTNvWiASzv1yxeK4UBrHxqRKP0APF6UEaP1cyf9RKd0D1WhXtNo0s90BhgRa8SgfnKnpIKbRaXo7VUovQJ8CnwEbALeBrYAHwOHgTuRcrfGpNhQJX8Ca4CJQE2OfAngRcCRCD0zrEbUBZ4T1/WNPxz6toABwGzgt8Dgr7UIbwwMwnFUj8eAfQF638gTWBtQdoivD8uQMwF4Sw81qaX2AzuAZcCoDJ4HgN1G3b/nfZWFRkEXgSc8/NMNft+tSWBkRqb82riHBZUMORgZcOLr7wYG7QVNDC6e0bI/j1++cmY/YSnFP/Pwrg80okSXgac88jYaeLuAR3yGzDMqb3D4XgZ6nGfk72PASc+aS+IFLp408CWa8aLewkUNyhLk90/OM7L58alnpgB/5cj1udiPhv2IJ5TBkv4+dHimOus3Mlzl/Ry56yJ4EmCvz5BTBkY5Y9LYYCwhXs2R+4WHZ7lhP1LQluGygVHScxp7nPWZGYYsypErQwkXc41lURksKU8CO41vnPVnMwx5L0euxJWLVwz7ueVTdsPAuNjh2e+sj80w5Nscud97eJbEGnLOwLjW4Wly1l/MqKPyzqddHr5Vsa512MAorpRGg7MuLuRigUHumx6+FgOfL7bK3MRHPZ70mu4iP/HI3WmQ61bQNYazJ9FkU4bVBsZE3SmN5yukZzkwLxlaWBczI/fyb+VqYf7bCeoxqTUxyi018uSJXhcHjHtxs+g/GAzcNgr4OTVvWqz/1gE86MgckpPWfQfoc8Y663ZW0WiNkxKd1aJtT4Wq2Hf6l6jZ09s/pMWmRb+UVJmYE2CIS+9kyJReZSnwuTZNH2QUifLctgB98ysZUmM8Tyy+Lm/XigGBc+V2i/yVEUZ0aTykIaOhFwxGjNYZWIi+FZa3MxA4HijYl0Jb1cD1ntmtfIHJOgTsCNTVFjJxbDBmjhLJNNEtS9LTRPn9q8aInMY3I923JyNdV8TWAAXSb4T0H7HUTATkTDhkVPC0wxuSfaz0XWACKXORvM6xW+MqnfmKvFtMtF+RK46qMDIn+K8VMADPM2IUBUHuw7/MUCRvP41DBbtTPQVDxpmbPXcb6eZmUkEG9GhgR8eEBZOd6zhpkUv4qgAj2mJSbDVfZ5leK9xJ3XNUY4CUHSv6639ASIZ6TbPW0YjNd2kVO7+33SgE0s9M0yq4RWcA7ep6nTo3+0XL/iZtimJuue6D/wPuAqeA+9L0FIqYAAAAAElFTkSuQmCC",
                            ][index]
                          }
                          alt="Social media icon"
                        />

                        <SocialCount>{count}</SocialCount>
                      </SocialIconContainer>
                    ))}
                  </SocialIconsWrapper>
                </div>
              </SidebarContent>
            </SidebarColumn>
          </TwoColumnLayout>
        </ContentLayout>

        <SectionTitle rtl={isRTL}>{blogData.sectionTitle}</SectionTitle>
        <ThirdParagraph rtl={isRTL}>{blogData.thirdParagraph}</ThirdParagraph>

        <ListSection rtl={isRTL}>
          {blogData.listItems.map((item, index) => (
            <div key={index}>
              {index + 1} - {item}
            </div>
          ))}
        </ListSection>

        <FourthParagraph rtl={isRTL}>
          {blogData.fourthParagraph}
        </FourthParagraph>
      </ContentSection>
    </BlogContainer>
  );
}

// Loading components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fafafa;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #0070f3;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

// Styled components with RTL support
const BlogContainer = styled.article`
  background-color: rgba(250, 250, 250, 1);
  display: flex;
  padding-bottom: 55px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  direction: ${(props) => (props.rtl ? "rtl" : "ltr")};

  @media (max-width: 991px) {
    padding-bottom: 100px;
  }
`;

const HeroSection = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 800px;
  width: 100%;
  padding: 434px 80px 120px;

  @media (max-width: 991px) {
    padding: 100px 20px;
  }
`;

const HeroBackground = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroContent = styled.div`
  position: relative;
  margin-bottom: -24px;
  width: 1084px;
  max-width: 100%;

  @media (max-width: 991px) {
    margin-bottom: 10px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const MainTitle = styled.h1`
  text-shadow: 4px 10px 48px rgba(0, 0, 0, 0.37);
  font-size: 44px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  line-height: 66px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: ${(props) => (props.rtl ? "right" : "left")};
  color: white;
  @media (max-width: 991px) {
    margin-top: 75%;
    font-size: 25px;
    line-height: 32px;
  }
`;

const Subtitle = styled.h2`
  font-size: 48px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  letter-spacing: -1.2px;
  margin-top: 16px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};
  color: white;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const ContentSection = styled.section`
  align-self: center;
  display: flex;
  margin-top: 80px;
  width: 100%;
  max-width: 1643px;
  flex-direction: column;
  align-items: start;
  padding: 0 58px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const ContentLayout = styled.div`
  align-self: stretch;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const TwoColumnLayout = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: ${(props) => (props.rtl ? "row-reverse" : "row")};

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

const MainColumn = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 76%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ArticleContent = styled.div`
  flex-grow: 1;
  color: rgba(18, 20, 22, 1);

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const TextContent = styled.div`
  width: 100%;
  max-width: 1080px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Paragraph = styled.p`
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const QuoteBlock = styled.blockquote`
  display: flex;
  margin-top: 80px;
  width: 100%;
  padding-bottom: 31px;
  align-items: stretch;
  gap: 36px;
  font-family: "Inter", sans-serif;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.rtl ? "row-reverse" : "row")};

  @media (max-width: 991px) {
    margin-top: 40px;
    font-size: 40px;
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
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
    font-size: 40px;
  }
`;

const SecondParagraph = styled.p`
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 40px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SidebarColumn = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 24%;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const SidebarContent = styled.div`
  color: rgba(18, 20, 22, 1);
  font-weight: 400;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const SidebarHeading = styled.h3`
  font-size: 25px;
  font-family: EuropaNuova-Bold, -apple-system, Roboto, Helvetica, sans-serif;
  line-height: 1;
  text-align: ${(props) => (props.rtl ? "right" : "left")};
`;

const SocialIconsWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: start;
  gap: 40px 49px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  white-space: nowrap;
  line-height: 1;
  justify-content: start;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const SocialIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 28px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const SocialIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 28px;
`;

const SocialCount = styled.span`
  margin-top: 16px;
`;

const SectionTitle = styled.h2`
  color: rgba(18, 20, 22, 1);
  font-size: 40px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 80px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const ThirdParagraph = styled.p`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 20px;
  width: 100%;
  align-self: stretch;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ListSection = styled.div`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 42px;
  padding: 0 ${(props) => (props.rtl ? "64px 0 0" : "0 0 0 64px")};
  text-align: ${(props) => (props.rtl ? "right" : "left")};

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 ${(props) => (props.rtl ? "20px 0 0" : "0 0 0 20px")};
  }
`;

const FourthParagraph = styled.p`
  color: rgba(18, 20, 22, 1);
  font-size: 18px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 33px;
  margin-top: 24px;
  text-align: ${(props) => (props.rtl ? "right" : "left")};

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

export default BlogSinglePage;
