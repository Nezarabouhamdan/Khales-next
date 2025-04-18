"use client";
import * as React from "react";
import styled from "styled-components";
import logo from "../../public/assets/Khales-Logo.png";
import { useLanguage } from "../../Context/Languagecontext";
import Image from "next/image";

const AboutSection = () => {
  const { language } = useLanguage();

  // Multilingual content
  const content = {
    eng: {
      welcome:
        "Welcome to Khales Project Management Consultant, your trusted partner in transforming visions into successful projects. With over 10 years of experience in the field, we pride ourselves on delivering exceptional project management and consultancy services that surpass expectations.",
      description:
        "Our progressive mindset and innovative strategies have shaped our remarkable track record, helping businesses and individuals alike to turn their dreams into tangible achievements. We are not just a service provider; we are your strategic partner in bringing your ideas to life.",
      location:
        "Situated strategically across the UAE, including Abu Dhabi, Dubai, Sharjah, and Fujairah, our local presence allows us to offer tailored solutions with the collective expertise of our dedicated team. Our adaptability to the ever-evolving landscape of the UAE enables us to consistently meet the dynamic demands of the market.",
      clientele:
        "We serve a diverse clientele, from startups to well-established entities, who place their trust in our dedication to quality and precision. Our clients are the cornerstone of our success, and their satisfaction fuels our drive to exceed expectations time and again.",
      commitment:
        "Our unwavering commitment to quality and a client-centric approach have positioned us as one of the leading project management consultants in the region. Whether your project is grand or modest, we approach every endeavor with the same passion and meticulous planning.",
      button: "Learn More",
    },
    ar: {
      welcome:
        "شريككم الموثوق في تحويل الرؤى إلى مشاريع ناجحة. مع أكثر من 10 سنوات من الخبرة في هذا المجال، نفخر بتقديم خدمات إدارة المشاريع والاستشارات التي تتجاوز التوقعات.",
      description:
        "تُعد خالص مثالاً يحتذى به في التفكير المتقدم والاستراتيجيات المبتكرة التي ساهمت في بناء سجل حافل بالنجاحات. نحن نساعد الشركات والأفراد على تحويل أحلامهم إلى إنجازات ملموسة. لسنا مجرد مزود خدمة، بل نحن شريك استراتيجي يعمل على تجسيد أفكاركم وتحقيق أهدافكم.",
      location:
        "بفضل تواجدنا الاستراتيجي في جميع أنحاء دولة الإمارات، بما في ذلك أبوظبي، دبي، الشارقة، والفجيرة، نتمكن من تقديم حلول مخصصة تعتمد على خبرة فريقنا المتفاني. إن قدرتنا على التكيف مع البيئة المتغيرة باستمرار في الإمارات تمكّننا من تلبية المتطلبات الديناميكية للسوق بشكل مستمر.",
      clientele:
        "نفتخر بخدمة عملاء متنوعين، بدءاً من الشركات الناشئة وصولاً إلى الكيانات الراسخة التي وضعت ثقتها في تفانينا في تقديم الجودة والدقة. عملاؤنا هم حجر الأساس لنجاحنا، ورضاهم هو الدافع الذي يحفزنا على تجاوز التوقعات مراراً وتكراراً.",
      commitment:
        "إن التزامنا الثابت بالجودة ونهجنا الذي يركز على العميل جعلا منا واحدة من أبرز شركات استشارات إدارة المشاريع في المنطقة. سواء كان مشروعك ضخماً أو بسيطاً، نتعامل مع كل مهمة بنفس الشغف والتخطيط الدقيق لتحقيق النجاح.",
      button: "تعرف أكثر",
    },
  };

  return (
    <MainContainer>
      <ContentWrapper>
        <Header $dir={language === "ar" ? "rtl" : "ltr"}>
          <LogoContainer>
            <CompanyName>
              Khales<DomainText>.ae</DomainText>
            </CompanyName>
          </LogoContainer>
        </Header>
        <ContentLayout $dir={language === "ar" ? "rtl" : "ltr"}>
          <TextContent>
            <WelcomeParagraph>{content[language].welcome}</WelcomeParagraph>
            <DescriptionParagraph>
              {content[language].description}
            </DescriptionParagraph>
            <LocationParagraph>{content[language].location}</LocationParagraph>
            <ClienteleParagraph>
              {content[language].clientele}
            </ClienteleParagraph>
            <CommitmentParagraph>
              {content[language].commitment}
            </CommitmentParagraph>
            <ButtonContainer>
              <LearnMoreButton
                aria-label={
                  language === "ar"
                    ? "تعرف أكثر على خدماتنا"
                    : "Learn more about our services"
                }
              >
                {content[language].button}
              </LearnMoreButton>
            </ButtonContainer>
          </TextContent>
          <ImageContainer>
            <AboutImage
              src={logo}
              alt={
                language === "ar"
                  ? "فريق خالز للاستشارات الإدارية في العمل"
                  : "Khales Project Management Consultancy team at work"
              }
            />
          </ImageContainer>
        </ContentLayout>
      </ContentWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  min-height: screen;
  background-color: #ffffff;
`;

const ContentWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 40px 240px;
  max-width: none;

  @media (max-width: 991px) {
    padding: 32px 20px;
    max-width: 991px;
  }

  @media (max-width: 640px) {
    padding: 24px 16px;
    max-width: 640px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  direction: ${(props) => props.$dir || "ltr"};
  text-align: ${(props) => (props.$dir === "rtl" ? "right" : "left")};
`;

const LogoContainer = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #333333;
  font-family: ${(props) => props.theme.fontFamily};
`;

const CompanyName = styled.span`
  color: #333333;
`;

const DomainText = styled.span`
  color: #66a109;
`;

const ContentLayout = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  direction: ${(props) => props.$dir || "ltr"};
  text-align: ${(props) => (props.$dir === "rtl" ? "right" : "left")};

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const TextContent = styled.article`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  font-family: ${(props) => props.theme.fontFamily};

  @media (max-width: 991px) {
    gap: 24px;
  }

  @media (max-width: 640px) {
    gap: 20px;
  }
`;

const BaseParagraph = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  font-family: ${(props) => props.theme.fontFamily};
`;

const WelcomeParagraph = styled(BaseParagraph)``;
const DescriptionParagraph = styled(BaseParagraph)``;
const LocationParagraph = styled(BaseParagraph)``;
const ClienteleParagraph = styled(BaseParagraph)``;
const CommitmentParagraph = styled(BaseParagraph)``;

const ButtonContainer = styled.div`
  margin-top: 32px;

  @media (max-width: 991px) {
    margin-top: 24px;
  }

  @media (max-width: 640px) {
    margin-top: 20px;
  }
`;

const LearnMoreButton = styled.button`
  background-color: #545454;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    fill 150ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  font-family: ${(props) => props.theme.fontFamily};

  &:hover {
    background-color: #404040;
  }

  &:focus {
    outline: 2px solid #4caf50;
    outline-offset: 2px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const AboutImage = styled(Image)`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

export default AboutSection;
