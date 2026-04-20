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
  return {
    title: dict.institutions.title,
    description: dict.institutions.intro.substring(0, 155),
  };
}

export default async function PerGliEntiPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const t = dict.institutions;

  return (
    <section className="pt-40 pb-24 md:pb-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div>
              <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32">
                {t.title}
              </p>
            </div>
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-8">
                {t.title}
              </h1>
              <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px]">
                {t.intro}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.howTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
                {t.steps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i < 2
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="font-display text-[3rem] font-extrabold text-stone-pale leading-none mb-5 group-hover:text-crimson transition-colors duration-300">
                      {step.num}
                    </div>
                    <div className="font-body text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-3">
                      {step.title}
                    </div>
                    <div className="font-body text-xs font-light leading-[1.7] text-stone">
                      {step.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div />
            <div>
              <a
                href="mailto:info@petra-protocol.org"
                className="inline-block font-body text-xs font-bold tracking-widest uppercase text-ivory bg-carbon px-12 py-5 hover:bg-crimson transition-colors duration-500"
              >
                {t.cta}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
