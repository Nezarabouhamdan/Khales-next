"use client";
import Footer from "@/components/Footer New/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import styled from "styled-components";
import { useLanguage } from "@/Context/Languagecontext"; // Adjust if your path is different
function page() {
  return (
    <div>
      <Navbar />
      <PrivacyPolicyPage />
      <Footer />
    </div>
  );
}

export default page;

// components/legal/PrivacyPolicyPage.jsx

// 1. Structured data from your provided text
const policyData = {
  eng: {
    title: "Privacy Policy",
    lastUpdated: "This Privacy Policy was last updated on March 26, 2025.",
    sections: [
      {
        heading: "Introduction",
        content: `We at Khales Project Management value your privacy and are committed to safeguarding it by adhering to this privacy policy ("Policy"). This Policy outlines how we collect, use, maintain, and disclose your personal information ("Personal Information") on our website ("Website") and related products and services (collectively, "Services"). It also details your options regarding our use of your personal information and how you can access and update it.`,
      },
      {
        heading: "Agreement to Policy",
        content: `This Policy is a legally binding agreement between you ("User", "you" or "your") and Khales Project Management ("Khales", "we", "us" or "our"). By accessing or using our Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. If you do not agree to the terms of this Policy, you must discontinue the use of our Website and Services.`,
      },
      {
        heading: "Collection of Personal Information",
        content: `We collect and process personal information that you voluntarily provide to us when registering on the Website, subscribing to a newsletter, filling out a form, or interacting with our Services. This information may include, but is not limited to:`,
        list: [
          "Name and contact information (such as email address and phone number)",
          "Geolocation data (where applicable)",
          "Device and usage information",
        ],
        extra: `You can choose not to provide us with your Personal Information; however, doing so may prevent you from using certain features of our Website and Services.`,
      },
      {
        heading: "Use of Collected Information",
        content: `We use your Personal Information for the following purposes:`,
        list: [
          "To improve user experience and enhance our Services",
          "To respond to inquiries and support requests",
          "To comply with legal obligations",
          "To run and maintain our Website and Services",
        ],
        extra: `We process your information with your consent or as required to fulfill our contractual obligations to you, comply with legal requirements, or protect legitimate business interests.`,
      },
      {
        heading: "Data Security",
        content: `We implement robust security measures to protect your Personal Information from unauthorized access, alteration, or disclosure. While we take reasonable precautions, please be aware that no transmission of data over the internet can be entirely secure.`,
      },
      {
        heading: "Disclosure of Information",
        content: `We may share your Personal Information with trusted partners and service providers to assist in operating our Website and delivering our Services. These partners are bound by confidentiality obligations and are not permitted to use your data for any other purpose.`,
      },
      {
        heading: "Retention of Information",
        content: `We retain your Personal Information for as long as necessary to fulfill the purposes outlined in this Policy unless a longer retention period is required or permitted by law.`,
      },
      {
        heading: "Your Data Protection Rights",
        content: `You have the right to:`,
        list: [
          "Access, update, or delete your Personal Information",
          "Restrict or object to the processing of your data",
          "Withdraw consent at any time",
        ],
      },
      {
        heading: "Changes to This Policy",
        content: `We may update this Policy periodically to reflect changes in our practices or for legal or regulatory reasons. Any changes will be posted on this page, and your continued use of our Website and Services constitutes your acceptance of the updated Policy.`,
      },
      {
        heading: "Contact Us",
        content: `If you have any questions or concerns about this Policy or your personal data, please contact us at:`,
        contactDetails: ["Email: info@khales.ae", "Phone: +971551299880"],
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "تم آخر تحديث لسياسة الخصوصية هذه في 26 مارس 2025.",
    sections: [
      {
        heading: "مقدمة",
        content: `نحن في "خالص لإدارة المشاريع" نُقدر خصوصيتكم ونلتزم بحمايتها من خلال الالتزام بسياسة الخصوصية هذه ("السياسة"). تحدد هذه السياسة كيفية جمعنا واستخدامنا وحفظنا والإفصاح عن معلوماتكم الشخصية ("المعلومات الشخصية") على موقعنا الإلكتروني ("الموقع الإلكتروني") والمنتجات والخدمات ذات الصلة (يُشار إليها مجتمعة بـ "الخدمات"). كما تفصل هذه السياسة خياراتكم المتعلقة باستخدامنا لمعلوماتكم الشخصية وكيفية الوصول إليها وتحديثها.`,
      },
      {
        heading: "الموافقة على السياسة",
        content: `تُعد هذه السياسة اتفاقية ملزمة قانونيًا بينكم ("المستخدم"، "أنت" أو "الخاص بكم") وبين "خالص لإدارة المشاريع" ("خالص"، "نحن"، "لنا" أو "الخاص بنا"). من خلال الوصول إلى موقعنا الإلكتروني وخدماتنا أو استخدامها، فإنكم تقرون بأنكم قد قرأتم وفهمتم ووافقتم على الالتزام بشروط هذه السياسة. إذا كنتم لا توافقون على شروط هذه السياسة، يجب عليكم التوقف عن استخدام موقعنا الإلكتروني وخدماتنا.`,
      },
      {
        heading: "جمع المعلومات الشخصية",
        content: ` نقوم بجمع ومعالجة المعلومات الشخصية التي تقدمونها لنا طواعية عند التسجيل على الموقع الإلكتروني، أو الاشتراك في رسالة إخبارية، أو ملء نموذج، أو التفاعل مع خدماتنا. قد تتضمن هذه المعلومات، على سبيل المثال لا الحصر:`,
        list: [
          "الاسم ومعلومات الاتصال (مثل عنوان البريد الإلكتروني ورقم الهاتف)",
          "بيانات الموقع الجغرافي (حيثما ينطبق)",
          "معلومات الجهاز والاستخدام",
        ],
        extra: `يمكنكم اختيار عدم تزويدنا بمعلوماتكم الشخصية؛ ومع ذلك، قد يمنعكم ذلك من استخدام بعض ميزات موقعنا الإلكتروني وخدماتنا.`,
      },
      {
        heading: "استخدام المعلومات التي تم جمعها",
        content: `نستخدم معلوماتكم الشخصية للأغراض التالية:`,
        list: [
          "تحسين تجربة المستخدم وتعزيز خدماتنا",
          "الرد على الاستفسارات وطلبات الدعم",
          "الامتثال للالتزامات القانونية",
          "تشغيل وصيانة موقعنا الإلكتروني وخدماتنا",
        ],
        extra: `نقوم بمعالجة معلوماتكم بموافقتكم أو حسب الحاجة لتنفيذ التزاماتنا التعاقدية تجاهكم، أو الامتثال للمتطلبات القانونية، أو حماية مصالحنا التجارية المشروعة.`,
      },
      {
        heading: "أمن البيانات",
        content: `نطبق إجراءات أمنية قوية لحماية معلوماتكم الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح. على الرغم من اتخاذنا احتياطات معقولة، يرجى العلم أنه لا يمكن أن يكون نقل البيانات عبر الإنترنت آمنًا تمامًا.`,
      },
      {
        heading: "الإفصاح عن المعلومات",
        content: `قد نشارك معلوماتكم الشخصية مع شركاء ومزودي خدمات موثوقين للمساعدة في تشغيل موقعنا الإلكتروني وتقديم خدماتنا. يلتزم هؤلاء الشركاء بالتزامات السرية ولا يُسمح لهم باستخدام بياناتكم لأي غرض آخر.`,
      },
      {
        heading: "الاحتفاظ بالمعلومات",
        content: `نحتفظ بمعلوماتكم الشخصية طالما كان ذلك ضروريًا لتحقيق الأغراض الموضحة في هذه السياسة، ما لم يتطلب القانون أو يسمح بفترة احتفاظ أطول.`,
      },
      {
        heading: "حقوق حماية البيانات الخاصة بكم",
        content: `لكم الحق في:`,
        list: [
          "الوصول إلى معلوماتكم الشخصية أو تحديثها أو حذفها",
          "تقييد أو الاعتراض على معالجة بياناتكم",
          "سحب الموافقة في أي وقت",
        ],
      },
      {
        heading: "التغييرات على هذه السياسة",
        content: `قد نقوم بتحديث هذه السياسة بشكل دوري لتعكس التغييرات في ممارساتنا أو لأسباب قانونية أو تنظيمية. سيتم نشر أي تغييرات على هذه الصفحة، ويشكل استمرار استخدامكم لموقعنا الإلكتروني وخدماتنا قبولكم للسياسة المحدثة.`,
      },
      {
        heading: "الاتصال بنا",
        content: `إذا كانت لديكم أي أسئلة أو استفسارات حول هذه السياسة أو بياناتكم الشخصية، يرجى الاتصال بنا على:`,
        contactDetails: [
          "البريد الإلكتروني: info@khales.ae",
          "رقم التواصل: +971551299880",
        ],
      },
    ],
  },
};

// 2. Styled Components for clean and readable layout
const PolicyContainer = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem 3rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: "Inter", sans-serif;
  color: #333;
  direction: ${(props) => props.dir};

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 2rem auto;
  }
`;

const PolicyHeader = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  border-bottom: 2px solid #66a109;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
`;

const UnorderedList = styled.ul`
  list-style-type: disc;
  padding-inline-start: 25px; /* Handles LTR and RTL padding correctly */
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 0.5rem;
`;

const LastUpdatedText = styled.p`
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  margin-top: 3rem;
  text-align: center;
`;

const ContactLink = styled.a`
  color: #66a109;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const PhoneNumber = styled.p`
  direction: ltr;
  unicode-bidi: embed;
  text-align: ${(props) => (props.dir === "rtl" ? "right" : "left")};
`;

// 3. The main component
const PrivacyPolicyPage = () => {
  const { language } = useLanguage();
  const content = policyData[language] || policyData.eng;

  return (
    <PolicyContainer dir={language === "ar" ? "rtl" : "ltr"}>
      <PolicyHeader>{content.title}</PolicyHeader>

      {content.sections.map((section, index) => (
        <Section key={index}>
          <SectionTitle>{section.heading}</SectionTitle>
          {section.content && <Paragraph>{section.content}</Paragraph>}

          {section.list && (
            <UnorderedList>
              {section.list.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </UnorderedList>
          )}

          {section.extra && <Paragraph>{section.extra}</Paragraph>}

          {section.contactDetails && (
            <div>
              {section.contactDetails.map((detail, i) => {
                const isEmail =
                  detail.toLowerCase().startsWith("email:") ||
                  detail.toLowerCase().startsWith("البريد الإلكتروني:");
                const isPhone =
                  detail.toLowerCase().startsWith("phone:") ||
                  detail.toLowerCase().startsWith("رقم التواصل:");
                if (isEmail) {
                  const email = detail.split(":")[1].trim();
                  return (
                    <Paragraph key={i}>
                      {detail.split(":")[0]}:{" "}
                      <ContactLink href={`mailto:${email}`}>
                        {email}
                      </ContactLink>
                    </Paragraph>
                  );
                }
                if (isPhone) {
                  const phone = detail.split(":")[1].trim();
                  return (
                    <PhoneNumber
                      key={i}
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      {detail.split(":")[0]}: {phone}
                    </PhoneNumber>
                  );
                }
                return <Paragraph key={i}>{detail}</Paragraph>;
              })}
            </div>
          )}
        </Section>
      ))}

      <LastUpdatedText>{content.lastUpdated}</LastUpdatedText>
    </PolicyContainer>
  );
};
