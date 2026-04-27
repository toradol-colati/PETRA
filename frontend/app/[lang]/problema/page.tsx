import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { getDictionary } from "@/app/dictionaries";
import type { Locale } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const introText = Array.isArray(dict.problem.intro)
    ? dict.problem.intro.join(" ")
    : dict.problem.intro;
  return {
    title: dict.problem.title,
    description: introText.substring(0, 155),
  };
}

export default async function ProblemaPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const t = dict.problem;

  return (
    <section className="pt-40 pb-24 md:pb-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Opening — the hook */}
        <FadeIn>
          <div id="intro" className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div>
              <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32">
                {t.title}
              </p>
            </div>
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-8">
                {t.title}
              </h1>
              <div className="flex flex-col gap-6 max-w-[700px]">
                {(Array.isArray(t.intro) ? t.intro : [t.intro]).map((paragraph, i) => (
                  <p key={i} className="font-body text-base font-light leading-[1.9] text-carbon">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Diagnosis — the economic analysis */}
        <FadeIn>
          <div id="diagnosi" className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.diagnosisTitle}
              </h2>
              <div className="flex flex-col gap-8 max-w-[700px]">
                {t.diagnosis.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-body text-sm font-light leading-[1.9] text-carbon-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Three structural obstacles */}
        <FadeIn>
          <div id="ostacoli" className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.bottlenecksTitle}
              </h2>
              <div className="grid grid-cols-1 gap-0 border border-stone-pale max-w-[700px]">
                {t.bottlenecks.map((b, i) => (
                  <div
                    key={b.title}
                    className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i < t.bottlenecks.length - 1
                        ? "border-b border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-display text-[1.5rem] font-extrabold text-stone-pale leading-none group-hover:text-crimson transition-colors duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-body text-sm font-bold tracking-[0.12em] uppercase text-carbon">
                        {b.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm font-light leading-[1.9] text-carbon-soft">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Closing note — Petra's position */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <div className="border-l-2 border-crimson pl-8 max-w-[700px]">
                <p className="font-body text-sm font-light leading-[1.9] text-carbon">
                  {t.note}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
