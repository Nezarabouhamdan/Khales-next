"use client"; // هذا هو السطر الأهم لحل المشكلة
import React from "react";
import styled from "styled-components";
// STYLED COMPONENT for this section
const StyledEnhancedContent = styled.section`
padding: 4rem 2rem;
background-color: #ffffff;
direction: 
isRTL ? "rtl" : "ltr")};
.content-container {
max-width: 1100px;
margin: 0 auto;
}
h2 {
font-size: 2.2rem;
font-weight: 700;
color: #333;
margin-bottom: 2rem;
text-align: 
isRTL ? "right" : "left")};
}
p {
font-size: 1.1rem;
line-height: 1.9;
color: #555;
margin-bottom: 1.5rem;
}
`;
// THE COMPONENT ITSELF
export default function EnhancedContent({ lang }) {
  const isRTL = lang === "ar";
  const content =
    lang === "ar"
      ? {
          title: "خالص - رواد الهندسة المعمارية والتصميم الداخلي في دبي",
          intro:
            "نحن في خالص نقدم خدمات شاملة في مجال الهندسة المعمارية والتصميم الداخلي في دبي والإمارات العربية المتحدة. مع خبرة تزيد عن عقد من الزمن، نحن متخصصون في تحويل الرؤى إلى واقع ملموس من خلال حلول تصميمية مبتكرة ومتطورة.",
          services:
            "خدماتنا تشمل التصميم المعماري للمباني السكنية والتجارية، التصميم الداخلي الفاخر، تصميم المناظر الطبيعية، إدارة المشاريع الشاملة، والاستشارات الهندسية المتخصصة. نحن نعمل مع العملاء في جميع أنحاء دولة الإمارات بما في ذلك دبي وأبوظبي والشارقة.",
          expertise:
            "فريقنا من المهندسين المعماريين والمصممين الداخليين المحترفين يجمع بين الخبرة التقنية والإبداع الفني لتقديم مشاريع استثنائية تلبي أعلى معايير الجودة والاستدامة. نحن نفخر بسجلنا الحافل في تنفيذ مشاريع متنوعة تشمل الفلل الفاخرة، المكاتب التجارية، الفنادق، والمجمعات السكنية.",
        }
      : {
          title:
            "Khales - Premier Architecture & Interior Design Company in Dubai",
          intro:
            "At Khales, we provide comprehensive architecture and interior design services throughout Dubai and the United Arab Emirates. With over a decade of experience, we specialize in transforming visions into reality through innovative and sophisticated design solutions that exceed client expectations.",
          services:
            "Our services encompass architectural design for residential and commercial buildings, luxury interior design, landscape design, comprehensive project management, and specialized engineering consultancy. We serve clients across the UAE including Dubai, Abu Dhabi, Sharjah, and other emirates, delivering exceptional results for every project.",
          expertise:
            "Our team of professional architects and interior designers combines technical expertise with artistic creativity to deliver outstanding projects that meet the highest standards of quality and sustainability. We pride ourselves on our proven track record of executing diverse projects including luxury villas, commercial offices, hotels, residential complexes, and mixed-use developments throughout the region.",
        };
  return (
    <StyledEnhancedContent $isRTL={isRTL}>
      <div className="content-container">
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
        <p>{content.services}</p>
        <p>{content.expertise}</p>
      </div>
    </StyledEnhancedContent>
  );
}
