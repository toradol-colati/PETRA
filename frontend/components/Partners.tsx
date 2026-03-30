const CARDS = [
  {
    icon: "§",
    title: "Enti del Terzo Settore",
    text: "Integra il protocollo di donazione nei tuoi progetti di restauro. Tracciabilità crittografica dei fondi, dashboard di monitoraggio, reportistica automatica per i bilanci sociali.",
    link: "Richiedi accesso",
  },
  {
    icon: "◈",
    title: "Hospitality & Ristorazione",
    text: "Posiziona i QR code nella tua struttura. I tuoi ospiti donano al patrimonio locale, tu allinei il tuo brand alla conservazione architettonica della città che ti ospita.",
    link: "Diventa partner",
  },
  {
    icon: "▣",
    title: "Amministrazioni Locali",
    text: "Adotta l'infrastruttura per i cantieri comunali. I turisti finanziano direttamente il restauro, riducendo la dipendenza dai trasferimenti statali e accelerando gli interventi.",
    link: "Contatta il team",
  },
];

export default function Partners() {
  return (
    <section id="b2b" className="bg-ivory py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-16">
          <div>
            <p className="font-body text-[0.72rem] font-semibold tracking-eyebrow uppercase text-crimson mb-5">
              Rete dei partner
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[1.15]">
              Attiva il nodo nella tua città
            </h2>
          </div>
          <p className="font-body text-base font-light leading-relaxed text-carbon-soft self-end">
            Petra opera come infrastruttura SaaS. Enti del Terzo Settore,
            hotel storici e ristoratori possono integrare il protocollo per
            convogliare i flussi turistici verso il restauro locale,
            trasformando la presenza commerciale in leva di conservazione.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-stone-pale">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 hover:bg-ivory-deep transition-colors duration-300 ${
                i < CARDS.length - 1
                  ? "border-b md:border-b-0 md:border-r border-stone-pale"
                  : ""
              }`}
            >
              <div className="w-12 h-12 border-[1.5px] border-crimson flex items-center justify-center font-display text-2xl font-extrabold text-crimson mb-6">
                {card.icon}
              </div>
              <div className="font-body text-xs font-bold tracking-wider uppercase text-carbon mb-4">
                {card.title}
              </div>
              <div className="font-body text-xs font-light leading-[1.7] text-stone mb-6">
                {card.text}
              </div>
              <a
                href="#"
                className="font-body text-[0.72rem] font-semibold tracking-wide uppercase text-crimson inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
              >
                {card.link} <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="mailto:partner@petra.fund"
            className="font-body text-xs font-semibold tracking-wide uppercase text-ivory bg-crimson px-10 py-4 inline-flex items-center gap-2.5 hover:bg-crimson-dark transition-colors duration-300"
          >
            Richiedi una demo <span>→</span>
          </a>
          <a
            href="#"
            className="font-body text-xs font-semibold tracking-wide uppercase text-carbon border-[1.5px] border-carbon px-10 py-3.5 inline-flex items-center gap-2.5 hover:bg-carbon hover:text-ivory transition-all duration-300"
          >
            Scarica il whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}
