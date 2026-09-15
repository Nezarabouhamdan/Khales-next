// get-dictionary.js

// We can use a dynamic import to only load the dictionary...
// Points at the renamed legacy-en/ar.js files, not dictionaries/en.ts /
// ar.ts - those are the new site's dictionaries, a different shape used by
// the new TSX components; this old loader (used only by the restored
// legacy routes) needs the old shape.
const dictionaries = {
  en: () => import("./dictionaries/legacy-en.js").then((module) => module.dictionary),
  ar: () => import("./dictionaries/legacy-ar.js").then((module) => module.dictionary),
};

export const getDictionary = async (locale) => {
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
};
