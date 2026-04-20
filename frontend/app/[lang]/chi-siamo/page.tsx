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
    title: dict.about.title,
    description: dict.about.intro.substring(0, 155),
  };
}

export default async function ChiSiamoPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const t = dict.about;

  return (
    <section className="pt-40 pb-24 md:pb-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Opening question */}
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
              <p className="font-body text-base font-light leading-[1.9] text-carbon max-w-[700px]">
                {t.intro}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Mission statement */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.missionTitle}
              </h2>
              <p className="font-body text-sm font-light leading-[1.9] text-carbon-soft max-w-[700px]">
                {t.mission}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Team */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.teamTitle}
              </h2>
              <div className="border border-stone-pale max-w-[600px]">
                {t.team.map((member) => (
                  <div key={member.name} className="p-8 md:p-10">
                    <div className="font-body text-sm font-bold tracking-[0.12em] uppercase text-carbon mb-2">
                      {member.name}
                    </div>
                    <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-6">
                      {member.role}
                    </div>
                    <p className="font-body text-sm font-light leading-[1.9] text-carbon-soft">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* From research to protocol */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.thesisTitle}
              </h2>
              <div className="border-l-2 border-crimson pl-8 max-w-[700px]">
                <p className="font-body text-sm font-light leading-[1.9] text-carbon-soft">
                  {t.thesis}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Support network */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.supportTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-stone-pale">
                {t.supporters.map((s, i) => (
                  <div
                    key={s.name}
                    className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i === 0
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="font-body text-sm font-bold tracking-[0.12em] uppercase text-carbon mb-3 group-hover:text-crimson transition-colors duration-300">
                      {s.name}
                    </div>
                    <p className="font-body text-sm font-light leading-[1.9] text-carbon-soft">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Contact */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-8">
                {t.contactTitle}
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${t.email}`}
                  className="font-body text-sm font-light text-crimson hover:text-crimson-dark transition-colors duration-300"
                >
                  {t.email}
                </a>
                <a
                  href="#"
                  className="font-body text-sm font-light text-carbon-soft hover:text-carbon transition-colors duration-300"
                >
                  {t.linkedin}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
