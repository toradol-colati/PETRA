const STEPS = [
  {
    num: "01",
    title: "Scansione",
    desc: "Il turista inquadra il QR code posizionato sul cantiere di restauro. Viene reindirizzato alla PWA senza installazione, senza registrazione.",
  },
  {
    num: "02",
    title: "Donazione",
    desc: "Checkout istantaneo via Stripe. Apple Pay, Google Pay, carta. L'email inserita per la ricevuta crea silenziosamente il profilo donatore.",
  },
  {
    num: "03",
    title: "Notarizzazione",
    desc: "La transazione viene aggregata nel batch giornaliero. L'hash crittografico (Merkle Root) è registrato sul ledger pubblico XRPL.",
  },
  {
    num: "04",
    title: "Certificato",
    desc: "Il donatore riceve una Petra Card unica, generata deterministicamente dal proprio hash. Collezionabile, verificabile, permanente.",
  },
];

export default function Mechanics() {
  return (
    <section id="mechanics" className="bg-ivory py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <p className="font-body text-[0.72rem] font-semibold tracking-eyebrow uppercase text-crimson mb-5">
            Protocollo operativo
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[1.15] max-w-[650px]">
            Dal QR code al certificato digitale in 90 secondi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border border-stone-pale">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`p-8 md:p-10 hover:bg-ivory-deep transition-colors duration-300 relative group ${
                i < STEPS.length - 1
                  ? "border-b xl:border-b-0 xl:border-r border-stone-pale"
                  : ""
              } ${
                i === 1
                  ? "md:border-r-0 xl:border-r border-stone-pale"
                  : ""
              }`}
            >
              <div className="font-display text-[3.5rem] font-extrabold text-stone-pale leading-none mb-6 group-hover:text-crimson transition-colors duration-300">
                {step.num}
              </div>
              <div className="font-body text-xs font-bold tracking-wider uppercase text-carbon mb-4">
                {step.title}
              </div>
              <div className="font-body text-xs font-light leading-[1.7] text-stone">
                {step.desc}
              </div>

              {i < STEPS.length - 1 && (
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-ivory border border-stone-pale hidden xl:flex items-center justify-center z-10 text-[0.6rem] text-stone">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
