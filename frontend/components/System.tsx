export default function System() {
  return (
    <section
      id="sistema"
      className="bg-ivory-deep py-24 md:py-40 px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ── BLOCK A: Protocol Flow ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
          {/* Sidebar Label */}
          <div>
            <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32">
              PROTOCOLLO
            </p>
          </div>
 
          {/* Content */}
          <div>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
              Donazioni
            </h2>
            <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-12">
              scansionando un QR code oppure tramite la Petra App.
            </p>
 
            {/* 3-Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
              {[
                {
                  num: "01",
                  title: "Scansiona",
                  desc: "il QR code che trovi in giro.",
                },
                {
                  num: "02",
                  title: "Dona",
                  desc: "in modo istantaneo.",
                },
                {
                  num: "03",
                  title: "Certifica",
                  desc: "ogni donazione.",
                },
              ].map((step, i) => (
                <div
                  key={step.num}
                  className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                    i < 2
                      ? "border-b md:border-b-0 md:border-r border-stone-pale"
                      : ""
                  }`}
                >
                  <div className="font-display text-[3rem] font-extrabold text-stone-pale leading-none mb-5 group-hover:text-crimson transition-colors duration-300">
                    {step.num}
                  </div>
                  <div className="font-body text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-3">
                    {step.title}
                  </div>
                  <div className="font-body text-xs font-light leading-[1.7] text-stone">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* ── BLOCK B: Economia e Registro ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
          <div />
 
          <div>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
              Petra Cards e Petri
            </h2>
            <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-12">
              Ogni donazione genera una Petra Card. Ogni interazione genera dei Petri.
            </p>
 
            {/* 3 Cards: Petra Cards, Album, Classifica */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
              {[
                {
                  icon: "◈",
                  title: "Petra Cards",
                  desc: "Soulbound Tokens generati dall\u2019hash della tua donazione. Collezionabili, verificabili, permanenti.",
                },
                {
                  icon: "▣",
                  title: "Petra Album",
                  desc: "La tua collezione personale. Ogni card acquisita popola il tuo Petra Album.",
                },
                {
                  icon: "§",
                  title: "Classifica Petri",
                  desc: "Ogni interazione genera Petri. Scala la classifica dei mecenate.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                    i < 2
                      ? "border-b md:border-b-0 md:border-r border-stone-pale"
                      : ""
                  }`}
                >
                  <div className="w-12 h-12 border-[1.5px] border-crimson flex items-center justify-center font-display text-xl font-extrabold text-crimson mb-6 group-hover:bg-crimson group-hover:text-ivory transition-all duration-300">
                    {card.icon}
                  </div>
                  <div className="font-body text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-3">
                    {card.title}
                  </div>
                  <div className="font-body text-xs font-light leading-[1.7] text-stone">
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* ── BLOCK C: PWA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <div />
 
          <div>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
              Petra Web App
            </h2>
            <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px] mb-12">
              Aggiungila alla Home direttamente dal browser.
            </p>
 
            {/* 2 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-stone-pale">
              {[
                {
                  title: "Mappa Stilizzata",
                  desc: "Visualizza la nostra mappa.",
                },
                {
                  title: "Offline",
                  desc: "Visualizza album, cards e classifica. Anche senza connessione.",
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                    i === 0
                      ? "border-b md:border-b-0 md:border-r border-stone-pale"
                      : ""
                  }`}
                >
                  <div className="font-body text-xs font-bold tracking-[0.12em] uppercase text-carbon mb-3">
                    {feat.title}
                  </div>
                  <div className="font-body text-xs font-light leading-[1.7] text-stone">
                    {feat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 