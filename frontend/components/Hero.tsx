export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-16 relative bg-ivory">
      <p className="font-body text-[0.72rem] font-semibold tracking-eyebrow uppercase text-crimson mb-8 animate-fade-up">
        Infrastruttura per la conservazione del patrimonio
      </p>

      <h1 className="font-display text-[clamp(3.2rem,7vw,7.5rem)] font-extrabold leading-monumental tracking-tight text-carbon max-w-[900px] mb-10 animate-fade-up animation-delay-200">
        Il registro{" "}
        <em className="italic font-medium text-crimson">immutabile</em>{" "}
        del patrimonio mondiale
      </h1>

      <p className="font-body text-[clamp(1rem,1.3vw,1.25rem)] font-light leading-relaxed text-carbon-soft max-w-[600px] mb-14 animate-fade-up animation-delay-400">
        Notarizzazione crittografica delle micro-donazioni destinate al
        restauro architettonico. Ogni contributo verificabile. Ogni centesimo
        tracciabile.
      </p>

      <div className="animate-fade-up animation-delay-600">
        <p className="font-body text-[0.72rem] font-semibold tracking-[0.3em] uppercase text-stone mb-4">
          Progetti attivi
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#"
            className="group font-body text-xs font-semibold tracking-wide uppercase text-carbon border-[1.5px] border-carbon px-8 py-3.5 inline-flex items-center gap-2.5 relative overflow-hidden transition-all duration-300 hover:text-ivory hover:border-crimson"
          >
            <span className="absolute inset-0 bg-crimson w-0 group-hover:w-full transition-all duration-300 -z-10" />
            Venezia
            <span className="text-[0.75rem] group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
          <span className="font-body text-xs font-semibold tracking-wide uppercase text-stone border-[1.5px] border-stone-pale px-8 py-3.5 cursor-default">
            Prossimamente
          </span>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-10 hidden md:flex items-center gap-4 animate-fade-up animation-delay-800">
        <div className="w-10 h-px bg-stone-light relative overflow-hidden">
          <span className="absolute inset-0 bg-crimson animate-scroll-pulse" />
        </div>
        <span className="font-body text-[0.72rem] font-medium tracking-[0.2em] uppercase text-stone">
          Scorri
        </span>
      </div>
    </section>
  );
}
