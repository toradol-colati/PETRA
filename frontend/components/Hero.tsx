import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/app/dictionaries";

interface HeroProps {
  dict: Dictionary["hero"];
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section className="flex flex-col items-center w-full bg-ivory">
      <div className="min-h-screen w-full flex flex-col items-center justify-center pt-16 px-6 md:px-10">
        <FadeIn>
          <div className="mb-0 flex justify-center">
            <Image
              src="/repo-PETRA/Petra-logo.svg"
              alt="Petra"
              width={320}
              height={320}
              className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[320px] md:h-[320px] object-contain opacity-[0.95]"
            />
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <h1 className="font-display text-[clamp(2rem,7vw,6.5rem)] font-bold tracking-[0.35em] uppercase text-carbon text-center mt-4 md:mt-0">
            P&nbsp;E&nbsp;T&nbsp;R&nbsp;A
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <p className="mt-4 md:mt-6 font-body text-[10px] sm:text-xs md:text-sm tracking-widest uppercase text-carbon-soft text-center px-4">
            {dict.subtitle}
          </p>
        </FadeIn>
      </div>

      <div className="w-full bg-ivory-deep flex flex-col items-center px-6 md:px-10 py-16 md:py-32 border-t border-stone-pale/50">
        <FadeIn>
          <div className="w-full max-w-[1200px] h-px bg-carbon/10 mb-12 md:mb-16" />
        </FadeIn>

        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-0 border border-carbon/10">
          {dict.pillars.map((pillar, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div
                className={`p-6 sm:p-8 md:p-10 bg-ivory/50 hover:bg-white transition-all duration-500 ease-in-out group h-full ${
                  i < 2 ? "border-b md:border-b-0 md:border-r border-carbon/10" : ""
                }`}
              >
                <h3 className="font-body text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-crimson mb-4 md:mb-6 group-hover:translate-x-1 transition-transform duration-500">
                  {pillar.eyebrow}
                </h3>
                <p className="font-body text-[13px] md:text-sm font-light leading-[1.85] text-carbon-soft">
                  {pillar.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}