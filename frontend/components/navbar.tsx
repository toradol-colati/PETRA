"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#mechanics", label: "Protocollo" },
  { href: "#registry", label: "Registro" },
  { href: "#b2b", label: "Partner" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-stone-pale backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "px-10 py-3 bg-ivory/[0.97]" : "px-10 py-5 bg-ivory/[0.92]"
        }`}
      >
        <a
          href="#"
          className="font-display text-[1.4rem] font-bold tracking-institutional uppercase text-carbon"
        >
          P<span className="text-crimson">E</span>TRA
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="font-body text-xs font-medium tracking-wide uppercase text-carbon-soft hover:text-crimson transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-crimson group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

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
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-display text-3xl font-semibold text-carbon text-left pb-2 border-b border-stone-pale hover:text-crimson transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
