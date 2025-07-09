// components/MeetTheTeam.jsx
"use client";

import React from "react";
import styled from "styled-components";
import { FaLinkedinIn, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "@/Context/Languagecontext"; // Adjust path if needed

//================================================================
// 1. DYNAMIC CONTENT
//================================================================
const contentData = {
  eng: {
    label: "Our Experts",
    title: "Meet our team members",
    subtitle:
      "We believe in the power of collective genius. Our multidisciplinary team of architects, designers, and engineers collaborate to turn visionary ideas into reality.",
    buttons: {
      apply: "Apply Now",
      contact: "Contact Us",
    },
    team: [
      {
        imgSrc:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
        name: "Zane Robott",
        title: "Founder & CEO",
        bio: "A visionary leader with a passion for innovation and design excellence.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        name: "Mays Murnay",
        title: "Lead Architect",
        bio: "Expert in translating complex client needs into breathtaking architectural forms.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        name: "Aluala Almario",
        title: "Head of Design",
        bio: "Curates our signature aesthetic, blending modernism with timeless elegance.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
        name: "Amelia Biriya",
        title: "Project Manager",
        bio: "Ensures every project is executed flawlessly, on time, and within budget.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200",
        name: "Stanislav Barna",
        title: "Lead Engineer",
        bio: "Drives our technical innovation, ensuring structural integrity and sustainability.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=200",
        name: "Antony Vist",
        title: "Head of Client Relations",
        bio: "Fosters lasting partnerships through unparalleled service and communication.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
    ],
  },
  ar: {
    label: "خبراؤنا",
    title: "تعرف على أعضاء فريقنا",
    subtitle:
      "نؤمن بقوة العبقرية الجماعية. يتعاون فريقنا متعدد التخصصات من المهندسين المعماريين والمصممين والمهندسين لتحويل الأفكار الطموحة إلى واقع ملموس.",
    buttons: {
      apply: "قدم الآن",
      contact: "اتصل بنا",
    },
    team: [
      {
        imgSrc:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
        name: "زين روبوت",
        title: "المؤسس والرئيس التنفيذي",
        bio: "قائد ذو رؤية وشغف بالابتكار والتميز في التصميم.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        name: "ميس مورناي",
        title: "كبير المهندسين المعماريين",
        bio: "خبير في ترجمة احتياجات العملاء المعقدة إلى أشكال معمارية مذهلة.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        name: "ألولا الماريو",
        title: "رئيس قسم التصميم",
        bio: "تشرف على جمالياتنا المميزة، وتمزج بين الحداثة والأناقة الخالدة.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
        name: "أميليا بيريا",
        title: "مديرة المشاريع",
        bio: "تضمن تنفيذ كل مشروع بشكل لا تشوبه شائبة، في الوقت المحدد وضمن الميزانية.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200",
        name: "ستانيسلاف بارنا",
        title: "كبير المهندسين",
        bio: "يقود ابتكارنا التقني، ويضمن السلامة الهيكلية والاستدامة.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
      {
        imgSrc:
          "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=200",
        name: "أنتوني فيست",
        title: "رئيس علاقات العملاء",
        bio: "يعزز الشراكات الدائمة من خلال خدمة وتواصل لا مثيل لهما.",
        socials: [{ icon: <FaLinkedinIn />, url: "#" }],
      },
    ],
  },
};

//================================================================
// 2. STYLED COMPONENTS
//================================================================
const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  direction: ${(props) => props.dir};
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Header = styled.div`
  max-width: 600px;
  margin-bottom: 4rem;
`;
const Label = styled.p`
  color: #66a109;
  font-weight: 500;
  font-size: 0.9rem;
  background-color: #e8f5e9;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  display: inline-block;
  margin-bottom: 1rem;
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;
const Subtitle = styled.p`
  color: #555;
  line-height: 1.8;
  margin: 1rem 0 1.5rem 0;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #66a109;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 161, 9, 0.3);
    transform: translateY(-3px);
  }
`;
const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: #1a1a1a;
  border: 1px solid #ccc;
  /* RTL FIX: Reverse flex direction for icon placement */
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};
  &:hover {
    background-color: #1a1a1a;
    color: white;
    border-color: #1a1a1a;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem 2rem;
  width: 100%;
`;

const HoverOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%; /* Cover entire image */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%);
  border-radius: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.2rem;
  transform: translateY(15px);
  opacity: 0;
  transition: all 0.3s ease;
  &:hover {
    color: #66a109;
    transform: translateY(-2px) !important;
  }
`;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-8px);
  }
  &:hover ${HoverOverlay} {
    opacity: 1;
  }
  &:hover ${SocialIcon} {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 1.5rem;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: all 0.3s ease-out;
  }

  ${MemberCard}:hover &::before {
    border-color: #66a109;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const MemberInfo = styled.div``;
const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
`;
const JobTitle = styled.p`
  color: #66a109;
  font-weight: 500;
  margin: 0.25rem 0 0.75rem 0;
`;
const Bio = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: #555;
`;

//================================================================
// 3. MAIN COMPONENT
//================================================================
const MeetTheTeam = () => {
  const { language } = useLanguage();
  const content = contentData[language] || contentData.eng;
  const isRTL = language === "ar";

  return (
    <SectionWrapper dir={isRTL ? "rtl" : "ltr"}>
      <ContentWrapper>
        <Header>
          <Label>{content.label}</Label>
          <Title>{content.title}</Title>
          <Subtitle>{content.subtitle}</Subtitle>
          <ButtonsWrapper>
            <PrimaryButton href="#">{content.buttons.apply}</PrimaryButton>
            <SecondaryButton href="#" dir={isRTL ? "rtl" : "ltr"}>
              <span>{content.buttons.contact}</span>
              {/* RTL FIX: Conditional arrow icon */}
              {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
            </SecondaryButton>
          </ButtonsWrapper>
        </Header>

        <TeamGrid>
          {content.team.map((member, index) => (
            <MemberCard key={index}>
              <ImageWrapper>
                <ProfileImage src={member.imgSrc} alt={member.name} />
                <HoverOverlay>
                  <SocialIconsContainer>
                    {member.socials.map((social, i) => (
                      <SocialIcon
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ transitionDelay: `${i * 0.1}s` }}
                      >
                        {social.icon}
                      </SocialIcon>
                    ))}
                  </SocialIconsContainer>
                </HoverOverlay>
              </ImageWrapper>
              <MemberInfo>
                <Name>{member.name}</Name>
                <JobTitle>{member.title}</JobTitle>
                <Bio>{member.bio}</Bio>
              </MemberInfo>
            </MemberCard>
          ))}
        </TeamGrid>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default MeetTheTeam;
