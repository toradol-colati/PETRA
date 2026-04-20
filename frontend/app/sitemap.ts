import type { MetadataRoute } from "next";

const BASE_URL = "https://petra.io";
const LOCALES = ["it", "en"];
const ROUTES = [
  "",
  "/problema",
  "/chi-siamo",
  "/per-gli-enti",
  "/privacy",
  "/termini",
  "/trasparenza",
  "/progetti/venezia",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );
}
