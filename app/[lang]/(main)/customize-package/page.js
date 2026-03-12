import CustomizePackageForm from "@/app/components/CustomizePackageForm";
import { dictionary as ar } from "@/dictionaries/ar";
import { dictionary as en } from "@/dictionaries/en";

const dictionaries = { ar, en };

export async function generateMetadata({ params: { lang } }) {
  const dict = dictionaries[lang] || dictionaries.en;
  return {
    title: dict.customizePackagePage.metaTitle,
    description: dict.customizePackagePage.metaDescription,
  };
}

export default function CustomizePackagePage({ params: { lang } }) {
  const dict = dictionaries[lang] || dictionaries.en;

  return (
    <div className="container mx-auto px-4 py-8">
      <CustomizePackageForm dict={dict} />
    </div>
  );
}
