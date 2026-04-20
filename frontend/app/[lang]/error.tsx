"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-[500px] text-center">
        <div className="font-display text-[5rem] font-extrabold text-stone-pale leading-none mb-8">
          !
        </div>
        <h2 className="font-display text-3xl font-bold text-carbon mb-6">
          Si è verificato un errore
        </h2>
        <p className="font-body text-sm font-light text-carbon-soft mb-12 leading-[1.8]">
          {error.message || "Qualcosa è andato storto. Riprova tra qualche istante."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="font-body text-xs font-bold tracking-widest uppercase text-ivory bg-carbon px-12 py-5 hover:bg-crimson transition-colors duration-500"
          >
            Riprova
          </button>
          <Link
            href="/"
            className="font-body text-xs font-bold tracking-widest uppercase text-carbon border border-carbon px-12 py-5 hover:bg-carbon hover:text-ivory transition-all duration-500"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}
