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
    title: dict.privacy.title,
    description: dict.privacy.sections[0].content.substring(0, 155),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const t = dict.privacy;

  return (
    <section className="pt-40 pb-24 md:pb-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div>
              <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32">
                Legal
              </p>
            </div>
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {t.title}
              </h1>
              <p className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-stone mb-16">
                {t.lastUpdated}
              </p>

              <div className="flex flex-col gap-12 max-w-[700px]">
                {t.sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="font-body text-sm font-bold tracking-[0.12em] uppercase text-carbon mb-3">
                      {section.title}
                    </h2>
                    <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
