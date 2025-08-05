// app/[lang]/services/project-manager/page.js

import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ProjectManagerPage from "@/pages/ProjectManagerpage";
import FaqSchema from "@/components/FaqSchema/FaqSchema";

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.projectManagerPage;

  const title =
    lang === "ar"
      ? "خدمة مدير المشروع (ممثل المالك) | مجموعة خالص"
      : "Project Manager (Owner's Representative) Service | Khales Group";

  const description =
    lang === "ar"
      ? "نعمل كممثل رسمي لك لإدارة مشروعك في دبي. نشرف على المقاولين، نتابع التقدم، ونتأكد من الالتزام بالجودة والميزانية نيابة عنك."
      : "Acting as your official representative to manage your project in Dubai. We oversee contractors, monitor progress, and ensure quality and budget adherence on your behalf.";

  const keywords =
    lang === "ar"
      ? [
          "ممثل المالك",
          "مدير مشروع",
          "إشراف على المقاولين",
          "تقارير تقدم المشروع",
          "إدارة مشاريع عقارية",
          "استشاري العميل",
          "متابعة المشاريع",
          "تنسيق المقاولين",
          "خدمات إدارة",
          "مشاريع خاصة دبي",
        ]
      : [
          "owner's representative",
          "client-side project manager",
          "contractor supervision",
          "project progress reporting",
          "real estate project management",
          "client consultant",
          "project monitoring",
          "contractor coordination",
          "management services",
          "private projects Dubai",
        ];

  return generatePageMetadata({
    title: title,
    description: description,
    keywords: keywords,
    lang: lang,
    alternatesUrl: "/services/project-manager",
  });
}

export default async function Page({ params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.projectManagerPage;
  const ctaContent = dictionary.cta;

  return (
    <>
      <FaqSchema questions={pageContent.faq.questions} />
      <ProjectManagerPage
        lang={lang}
        content={pageContent}
        ctaContent={ctaContent}
      />
    </>
  );
}
