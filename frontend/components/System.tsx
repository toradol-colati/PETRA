import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/app/dictionaries";

interface SystemProps {
  dict: Dictionary["system"];
}

export default function System({ dict }: SystemProps) {
  return (
    <section
      id="sistema"
      className="bg-ivory-deep py-24 md:py-40 px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ── BLOCK A: Come Funziona ── */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div>
              <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32">
                {dict.sidebarLabel}
              </p>
            </div>

            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {dict.blockA.title}
              </h2>
              <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-12">
                {dict.blockA.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
                {dict.blockA.steps.map((step, i) => (
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

        {/* ── BLOCK B: Il Certificato ── */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />

            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {dict.blockB.title}
              </h2>
              <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-12">
                {dict.blockB.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
                {dict.blockB.cards.map((card, i) => (
                  <div
                    key={i}
                    className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i < 2
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="w-12 h-12 border-[1.5px] border-crimson flex items-center justify-center font-display text-xl font-extrabold text-crimson mb-6 group-hover:bg-crimson group-hover:text-ivory transition-all duration-300">
                      {card.icon}
                    </div>
                    <div className="font-body text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-3">
                      {card.title}
                    </div>
                    <div className="font-body text-xs font-light leading-[1.7] text-stone">
                      {card.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── BLOCK C: Dove Vanno i Fondi ── */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div />

            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {dict.blockC.title}
              </h2>
              <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-12">
                {dict.blockC.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-stone-pale">
                {dict.blockC.features.map((feat, i) => (
                  <div
                    key={i}
                    className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i === 0
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="font-body text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-3">
                      {feat.title}
                    </div>
                    <div className="font-body text-xs font-light leading-[1.7] text-stone">
                      {feat.desc}
                    </div>
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