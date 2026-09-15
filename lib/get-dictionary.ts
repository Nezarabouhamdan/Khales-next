import type { Locale } from "@/i18n-config";
import type { Dictionary } from "@/dictionaries/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en").then((module) => module.dictionary),
  ar: () => import("@/dictionaries/ar").then((module) => module.dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
};
