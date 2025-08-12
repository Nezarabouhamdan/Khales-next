// app/[lang]/services/project-management/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectManagementPage from "@/pages/ProjectManagementPage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.projectManagementPage;

  const title =
    lang === "ar"
      ? "إدارة المشاريع 360 درجة في دبي | مجموعة خالص"
      : "360 Project Management Services in Dubai | Khales Group";

  const description =
    lang === "ar"
      ? "نقدم خدمة إدارة مشاريع متكاملة (360) من الفكرة إلى التسليم. ندير التصميم، الموافقات، الإنشاءات، والميزانية لضمان نجاح مشروعك في الإمارات."
      : "We offer a fully integrated 360 project management service from concept to handover. We manage design, approvals, construction, and budget to ensure your project's success in the UAE.";

  const keywords =
    lang === "ar"
      ? [
          "إدارة المشاريع دبي",
          "إدارة الإنشاءات",
          "استشارات إدارة المشاريع",
          "تسليم المشاريع",
          "تخطيط المشاريع",
          "مراقبة التكاليف",
          "مكتب إدارة المشاريع",
          "مشاريع تسليم مفتاح",
          "إدارة المقاولين",
          "تنسيق التصميم",
          "موافقات المشاريع",
        ]
      : [
          "project management Dubai",
          "construction management",
          "PMC services",
          "project delivery",
          "project planning",
          "cost control",
          "PMO",
          "turnkey projects",
          "contractor management",
          "design coordination",
          "project approvals",
        ];

  return generatePageMetadata({
    title: title,
    description: description,
    keywords: keywords,
    lang: lang,
    alternatesUrl: "/services/ProjectManagement",
  });
}

export default async function Page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.projectManagementPage;
  const ctaContent = dictionary.cta;

  return (
    <>
      <FaqSchema questions={pageContent.faq.questions} />
      <ProjectManagementPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
