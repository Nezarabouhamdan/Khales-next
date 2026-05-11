import React from "react";
import { getDictionary } from "@/get-dictionary";
import { generatePageMetadata } from "@/lib/metadata";
import ExamPage from "@/pages/ExamPage";

export async function generateMetadata(props) {
  const { params } = props;
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const pageContent = dictionary.examPage;

  return generatePageMetadata({
    title: pageContent.metaTitle,
    description: pageContent.metaDescription,
    keywords: [],
    lang,
    alternatesUrl: "/exam",
  });
}

export default async function Page(props) {
  const { params } = props;
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <ExamPage lang={lang} content={dictionary.examPage} />;
}
