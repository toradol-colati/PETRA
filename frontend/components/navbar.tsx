"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/app/dictionaries";

interface NavbarProps {
  dict: Dictionary["nav"];
  lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const otherLang = lang === "it" ? "en" : "it";
  const switchedPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  const navLinks = [
    { href: "#sistema", label: dict.protocol },
    { href: "#network", label: dict.network },
    { href: `/${lang}/problema`, label: dict.problem },
    { href: `/${lang}/chi-siamo`, label: dict.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    } else {
      window.location.href = `/${lang}/${href}`;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-stone-pale backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "px-6 md:px-10 py-3 bg-ivory/[0.97]"
            : "px-6 md:px-10 py-5 bg-ivory/[0.92]"
        }`}
      >
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Image
            src="/repo-PETRA/Petra-logo.svg"
            alt="Petra"
            width={50}
            height={50}
            className="w-12 h-12 object-contain"
          />
          <span className="font-display text-xl font-bold tracking-institutional uppercase text-carbon">
            P&nbsp;E&nbsp;T&nbsp;R&nbsp;A
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <button
                    onClick={() => handleAnchorClick(link.href)}
                    className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-carbon-soft hover:text-crimson transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-crimson group-hover:w-full transition-all duration-300" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-carbon-soft hover:text-crimson transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-crimson group-hover:w-full transition-all duration-300" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link
            href={switchedPath}
            className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson border border-crimson/30 px-4 py-2 hover:bg-crimson hover:text-ivory transition-all duration-300"
          >
            {dict.langSwitch}
          </Link>
        </div>

        <button
          className="flex md:hidden flex-col gap-[5px] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-[1.5px] bg-carbon transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-carbon transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-carbon transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 bg-ivory z-40 pt-24 px-6 flex flex-col gap-6">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.href}
                onClick={() => handleAnchorClick(link.href)}
                className="font-display text-3xl font-semibold text-carbon text-left pb-2 border-b border-stone-pale hover:text-crimson transition-colors duration-300"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-semibold text-carbon text-left pb-2 border-b border-stone-pale hover:text-crimson transition-colors duration-300"
              >
                {link.label}
              </Link>
            )
          )}

          <Link
            href={switchedPath}
            onClick={() => setMobileOpen(false)}
            className="font-body text-sm font-bold tracking-[0.2em] uppercase text-crimson pt-4"
          >
            {dict.langSwitch}
          </Link>
        </div>
      )}
    </>
  );
}