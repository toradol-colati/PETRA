import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/app/dictionaries";

interface NetworkProps {
  dict: Dictionary["network"];
}

export default function Network({ dict }: NetworkProps) {
  return (
    <section id="network" className="bg-ivory-deep py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-20">
          <div>
            <p className="font-body text-xs font-bold tracking-[0.3em] uppercase text-stone lg:sticky lg:top-32">
              {dict.sidebarLabel}
            </p>
          </div>

          <div>
            {/* ── Progetto Pilota ── */}
            <FadeIn>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-carbon mb-6">
                {dict.projectsTitle}
              </h2>
              <p className="font-body text-base font-light leading-relaxed text-carbon-soft max-w-[700px] mb-16">
                {dict.projectsDescription}
              </p>

              <div className="border border-crimson/15 p-12 mb-32 max-w-[600px] mx-auto">
                <div className="flex flex-col items-center text-center">
                  <div className="font-body text-sm font-bold tracking-[0.25em] uppercase text-carbon mb-3">
                    {dict.venice.city}
                  </div>
                  <div className="font-body text-[10px] tracking-widest uppercase text-crimson mb-6">
                    {dict.venice.status}
                  </div>
                  <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft">
                    {dict.venice.description}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── Partner Onboarding ── */}
            <FadeIn>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-carbon mb-6">
                {dict.partnerTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-carbon/15">
                {dict.partners.map((card, i) => (
                  <div
                    key={i}
                    className={`p-12 bg-ivory hover:bg-white transition-all duration-500 group ${
                      i === 0
                        ? "border-b md:border-b-0 md:border-r border-carbon/15"
                        : ""
                    }`}
                  >
                    <div className="w-14 h-14 border border-crimson/30 flex items-center justify-center font-display text-2xl text-crimson mb-8 group-hover:bg-crimson group-hover:text-ivory transition-all duration-500">
                      {card.icon}
                    </div>
                    <div className="font-body text-[13px] font-bold tracking-wider uppercase text-carbon mb-4">
                      {card.title}
                    </div>
                    <div className="font-body text-sm font-light leading-relaxed text-carbon-soft/80 mb-8">
                      {card.desc}
                    </div>
                    <a
                      href="mailto:info@petra-protocol.org"
                      className="font-body text-xs font-bold uppercase text-crimson flex items-center gap-3 group-hover:gap-5 transition-all duration-500"
                    >
                      {card.link} <span>→</span>
                    </a>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
