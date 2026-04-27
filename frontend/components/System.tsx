import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/app/dictionaries";

interface SystemProps {
  dict: Dictionary["system"];
}

export default function System({ dict }: SystemProps) {
  return (
    <section
      id="sistema"
      className="bg-ivory-deep py-20 md:py-40 px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ── BLOCK A: Come Funziona ── */}
        <FadeIn>
          <div id="come-funziona" className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 mb-20 md:mb-32">
            <div>
              <p className="font-body text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32 mb-4 lg:mb-0">
                {dict.sidebarLabel}
              </p>
            </div>

            <div>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {dict.blockA.title}
              </h2>
              <p className="font-body text-[13px] md:text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-8 md:mb-12">
                {dict.blockA.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
                {dict.blockA.steps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`p-6 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i < 2
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="font-display text-[2.5rem] md:text-[3rem] font-extrabold text-stone-pale leading-none mb-4 md:mb-5 group-hover:text-crimson transition-colors duration-300">
                      {step.num}
                    </div>
                    <div className="font-body text-[10px] md:text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-2 md:mb-3">
                      {step.title}
                    </div>
                    <div className="font-body text-[11px] md:text-xs font-light leading-[1.7] text-stone">
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
          <div id="il-certificato" className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 mb-20 md:mb-32">
            <div />

            <div>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {dict.blockB.title}
              </h2>
              <p className="font-body text-[13px] md:text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-8 md:mb-12">
                {dict.blockB.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
                {dict.blockB.cards.map((card, i) => (
                  <div
                    key={i}
                    className={`p-6 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i < 2
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 border-[1.5px] border-crimson flex items-center justify-center font-display text-lg md:text-xl font-extrabold text-crimson mb-4 md:mb-6 group-hover:bg-crimson group-hover:text-ivory transition-all duration-300">
                      {card.icon}
                    </div>
                    <div className="font-body text-[10px] md:text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-2 md:mb-3">
                      {card.title}
                    </div>
                    <div className="font-body text-[11px] md:text-xs font-light leading-[1.7] text-stone">
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
          <div id="dove-vanno-i-fondi" className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16">
            <div />

            <div>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {dict.blockC.title}
              </h2>
              <p className="font-body text-[13px] md:text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-8 md:mb-12">
                {dict.blockC.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-stone-pale">
                {dict.blockC.features.map((feat, i) => (
                  <div
                    key={i}
                    className={`p-6 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i === 0
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="font-body text-[10px] md:text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-2 md:mb-3">
                      {feat.title}
                    </div>
                    <div className="font-body text-[11px] md:text-xs font-light leading-[1.7] text-stone">
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