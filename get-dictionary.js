// get-dictionary.js

// We can use a dynamic import to only load the dictionary...
const dictionaries = {
  en: () => import("./dictionaries/en.js").then((module) => module.dictionary),
  ar: () => import("./dictionaries/ar.js").then((module) => module.dictionary),
};

export const getDictionary = async (locale) => {
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
};
