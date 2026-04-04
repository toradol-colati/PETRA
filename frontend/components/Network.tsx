export default function Network() {
  return (
    <section id="network" className="bg-ivory-deep py-32 md:py-48 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-20">
          {/* Sidebar Label */}
          <div>
            <p className="font-body text-xs font-bold tracking-[0.3em] uppercase text-stone lg:sticky lg:top-32">
              Network
            </p>
          </div>
 
          <div>
            {/* ── City Nodes ── */}
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-carbon mb-6">
              Progetti Attivi
            </h2>
            <p className="font-body text-base font-light leading-relaxed text-carbon-soft max-w-[700px] mb-16">
              Ogni progetto ha la sua interfaccia. Garantiamo
              interoperabilità e continuità dell&apos;account di ogni donatore.
            </p>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-carbon/15 mb-32">
              {[
                {
                  city: "Venezia",
                  status: "INCOMING",
                  active: true,
                },
                {
                  city: "loading...",
                  status: "loading...",
                  active: false,
                },
                {
                  city: "....",
                  status: "....",
                  active: false,
                },
              ].map((node, i) => (
                <div
                  key={i}
                  className={`p-12 flex flex-col items-center justify-center min-h-[200px] transition-all duration-700 group ${
                    node.active
                      ? "hover:bg-carbon cursor-pointer"
                      : "opacity-40"
                  } ${
                    i < 2
                      ? "border-b sm:border-b-0 sm:border-r border-carbon/15"
                      : ""
                  }`}
                >
                  <div
                    className={`font-body text-sm font-bold tracking-[0.25em] uppercase mb-3 transition-colors duration-500 ${
                      node.active
                        ? "text-carbon group-hover:text-ivory"
                        : "text-stone"
                    }`}
                  >
                    {node.city}
                  </div>
                  <div
                    className={`font-body text-[10px] font-widest transition-colors duration-500 ${
                      node.active
                        ? "text-stone group-hover:text-stone-pale"
                        : "text-stone-light"
                    }`}
                  >
                    {node.status}
                  </div>
                </div>
              ))}
            </div>
 
            {/* ── Partner Onboarding ── */}
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-carbon mb-6">
              Diventa Partner
            </h2>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-carbon/15 mb-16">
              {[
                {
                  icon: "§",
                  title: "Ente non-profit",
                  desc: "Verifica la possibilità di una collaborazione con Petra.",
                  link: "Collabora",
                },
                {
                  icon: "◈",
                  title: "Attività commerciale",
                  desc: "Allinea il tuo brand alla tutela del patrimonio artistico.",
                  link: "Diventa partner",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`p-12 bg-ivory hover:bg-white transition-all duration-500 group ${
                    i === 0
                      ? "border-b md:border-b-0 md:border-r border-carbon/15"
                      : ""
                  }`}
                >
                  <div className="w-14 h-14 border border-crimson/30 flex items-center justify-center font-display text-2xl text-crimson mb-8 group-hover:bg-crimson group-hover:text-ivory transition-all duration-500">
                    {card.icon}
                  </div>
                  <div className="font-body text-[13px] font-bold tracking-wider uppercase text-carbon mb-4">
                    {card.title}
                  </div>
                  <div className="font-body text-sm font-light leading-relaxed text-carbon-soft/80 mb-8">
                    {card.desc}
                  </div>
                  <a
                    href="#"
                    className="font-body text-xs font-bold uppercase text-crimson flex items-center gap-3 group-hover:gap-5 transition-all duration-500"
                  >
                    {card.link} <span>→</span>
                  </a>
                </div>
              ))}
            </div>
 
            {/* CTA */}
            <div className="pt-8">
              <a
                href="#"
                className="inline-block font-body text-xs font-bold tracking-widest uppercase text-ivory bg-carbon px-12 py-5 hover:bg-crimson transition-colors duration-500"
              >
                Scarica il whitepaper
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
