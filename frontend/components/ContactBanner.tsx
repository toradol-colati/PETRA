import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/app/dictionaries";

interface ContactBannerProps {
  dict: Dictionary["network"];
}

export default function ContactBanner({ dict }: ContactBannerProps) {
  return (
    <section id="contact" className="bg-ivory py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-20">
          {/* Left Column: Sidebar Label */}
          <div>
            <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32 mb-4 lg:mb-0">
              {dict.sidebarLabel}
            </p>
          </div>

          {/* Right Column: CTA Content */}
          <div>
            <FadeIn>
              <h2 className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-carbon mb-6 tracking-tight">
                {dict.ctaTitle}
              </h2>
              
              <p className="font-body text-sm font-light leading-[1.9] text-carbon-soft max-w-[700px]">
                {dict.ctaDescription}
              </p>

              <div className="mt-10">
                <a
                  href="mailto:info@petra-protocol.org"
                  className="inline-block font-body text-xs font-bold tracking-widest uppercase text-carbon border border-carbon px-12 py-5 hover:bg-carbon hover:text-ivory transition-all duration-500"
                >
                  {dict.ctaButton}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
