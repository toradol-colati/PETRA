import Link from "next/link";
import type { Dictionary } from "@/app/dictionaries";

interface FooterProps {
  dict: Dictionary["footer"];
  lang: string;
}

export default function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="bg-carbon text-stone border-t border-crimson py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 pb-16 border-b border-white/5">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-bold tracking-[0.35em] uppercase text-ivory mb-6">
              P&nbsp;E&nbsp;T&nbsp;R&nbsp;A
            </div>
            <p className="font-body text-xs font-light leading-relaxed text-stone max-w-[280px] opacity-70">
              {dict.brand}
            </p>
          </div>

          {/* Sistema */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              {dict.systemLabel}
            </div>
            <ul className="flex flex-col gap-3.5">
              {dict.systemLinks.map((label) => (
                <li key={label}>
                  <a href="#sistema" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Network */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              {dict.networkLabel}
            </div>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="#network" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  {dict.activeProjects}
                </a>
              </li>
              <li>
                <a href="#network" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  {dict.becomePartner}
                </a>
              </li>
              <li>
                <a href="mailto:info@petra-protocol.org" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  {dict.contacts}
                </a>
              </li>
              <li>
                <Link href={`/${lang}/per-gli-enti`} className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  {dict.institutionsLink}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/trasparenza`} className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  {dict.transparencyLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              {dict.legalLabel}
            </div>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link href={`/${lang}/privacy`} className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  {dict.privacyLink}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/termini`} className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  {dict.termsLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 opacity-40">
          <div className="font-body text-[10px] text-stone tracking-widest uppercase">
            {dict.copyright}
          </div>
          <Link
            href={`/${lang}/privacy`}
            className="font-body text-[10px] text-stone hover:text-ivory transition-colors duration-500 tracking-widest uppercase"
          >
            {dict.cookieText}
          </Link>
        </div>
      </div>
    </footer>
  );
}