import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/dictionaries";

interface FooterProps {
  dict: Dictionary["footer"];
  lang: string;
}

export default function Footer({ dict, lang }: FooterProps) {
  return (
    <footer className="bg-carbon text-stone border-t border-crimson py-16 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-bold tracking-[0.35em] uppercase text-ivory mb-6">
              P&nbsp;E&nbsp;T&nbsp;R&nbsp;A
            </div>
            <p className="font-body text-xs font-light leading-relaxed text-stone max-w-[280px] opacity-70 mb-10">
              {dict.brand}
            </p>
            <Image
              src="/repo-PETRA/Petra-logo.svg"
              alt="Petra"
              width={160}
              height={160}
              className="w-40 h-40 object-contain opacity-30 hover:opacity-100 transition-opacity duration-500"
            />
          </div>

          {/* Protocollo */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              {dict.systemLabel}
            </div>
            <ul className="flex flex-col gap-3.5">
              {dict.systemLinks.map((link) => (
                <li key={link.id}>
                  <Link href={`/${lang}/protocollo#${link.id}`} className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Il Problema */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              {dict.problemLabel}
            </div>
            <ul className="flex flex-col gap-3.5">
              {dict.problemLinks.map((link) => (
                <li key={link.id}>
                  <Link href={`/${lang}/problema#${link.id}`} className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chi Siamo */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              {dict.aboutLabel}
            </div>
            <ul className="flex flex-col gap-3.5">
              {dict.aboutLinks.map((link) => (
                <li key={link.id}>
                  <Link href={`/${lang}/chi-siamo#${link.id}`} className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 opacity-40">
          <div className="font-body text-[10px] text-stone tracking-widest uppercase">
            {dict.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}