import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Dictionary } from "@/app/dictionaries";

interface ContactBannerProps {
  dict: Dictionary["contactBanner"];
}

export default function ContactBanner({ dict }: ContactBannerProps) {
  return (
    <section className="bg-carbon py-24 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto text-center">
        <FadeIn>
          <div className="max-w-[800px] mx-auto">
            <p className="font-display text-[clamp(1.2rem,3vw,2rem)] leading-snug text-ivory mb-12">
              {dict.text}
            </p>
            <Link
              href="mailto:petra.veneta@gmail.com"
              className="inline-block border border-crimson/50 px-10 py-5 text-crimson font-body text-xs font-bold uppercase tracking-widest hover:bg-crimson hover:text-ivory transition-all duration-500"
            >
              {dict.cta}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
