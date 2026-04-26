import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/app/dictionaries";

interface ProtocolBannerProps {
  dict: Dictionary;
  lang: string;
}

export default function ProtocolBanner({ dict, lang }: ProtocolBannerProps) {
  return (
    <section id="sistema" className="bg-ivory-deep py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-20">
          <div>
            <p className="font-body text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-stone lg:sticky lg:top-32 mb-4 lg:mb-0">
              {dict.nav.protocol}
            </p>
          </div>

          <div>
            <FadeIn>
              <h2 className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-carbon mb-6 tracking-tight">
                {dict.protocolBanner.title}
              </h2>

              <div className="grid grid-cols-1 gap-0 border border-carbon/15">
                <Link
                  href={`/${lang}/protocollo`}
                  className="block p-8 md:p-12 bg-transparent hover:bg-white transition-all duration-500 group cursor-pointer"
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 border border-crimson/30 flex items-center justify-center font-display text-xl md:text-2xl text-crimson mb-6 md:mb-8 group-hover:bg-crimson group-hover:text-ivory transition-all duration-500">
                    ⌘
                  </div>
                  <div className="font-body text-[11px] md:text-[13px] font-bold tracking-wider uppercase text-carbon mb-3 md:mb-4">
                    {dict.protocolBanner.cardTitle}
                  </div>
                  <div className="font-body text-[13px] md:text-sm font-light leading-relaxed text-carbon-soft/80 mb-6 md:mb-8">
                    {dict.protocolBanner.desc}
                  </div>
                  <span className="font-body text-[10px] md:text-xs font-bold uppercase text-crimson flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
                    {dict.protocolBanner.link} <span>→</span>
                  </span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
