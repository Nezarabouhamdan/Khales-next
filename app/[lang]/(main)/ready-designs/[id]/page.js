import { getDictionary } from "@/get-dictionary";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import DesignDetailsClient from "@/app/DesignDetailsClient";

export async function generateMetadata({ params }) {
  const { lang, id } = params;
  const dictionary = await getDictionary(lang);
  const design = dictionary.readyDesignsPage?.gallery?.designs?.find(
    (d) => d.id.toString() === id,
  );

  return {
    title: design ? `${design.title} | خالص` : "تفاصيل التصميم | خالص",
    description: design?.desc || "تفاصيل التصميم المعماري",
  };
}

export default async function SingleDesignPage({ params }) {
  const { lang, id } = params;
  const dictionary = await getDictionary(lang);
  const content = dictionary.readyDesignsPage?.designDetails;
  const isRtl = lang === "ar";

  const design = dictionary.readyDesignsPage?.gallery?.designs?.find(
    (d) => d.id.toString() === id,
  );

  if (!design) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <h2 className="text-2xl font-bold mb-4">{content?.notFound}</h2>
        <Link
          href={`/${lang}/ready-designs`}
          className="flex items-center gap-2 text-[#66a109] font-bold"
        >
          {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          {content?.backBtn}
        </Link>
      </div>
    );
  }

  return <DesignDetailsClient design={design} content={content} lang={lang} />;
}
