// get-dictionary.js
import "server-only";

// We can use a dynamic import to only load the dictionary for the requested locale
const dictionaries = {
  en: () => import("./dictionaries/en.js").then((module) => module.dictionary),
  ar: () => import("./dictionaries/ar.js").then((module) => module.dictionary),
};

export const getDictionary = async (locale) => {
  // Fallback to 'en' if the locale is not found or invalid
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
};
