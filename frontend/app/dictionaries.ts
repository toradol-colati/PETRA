import { cache } from "react";
import type { Locale } from "../i18n.config";

const dictionaries = {
  it: () => import("../dictionaries/it.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = cache(async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.it();
});

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
