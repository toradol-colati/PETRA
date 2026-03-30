export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative bg-carbon text-ivory py-24 md:py-40 px-6 md:px-10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-crimson" />

      <div className="max-w-[1200px] mx-auto">
        <div className="font-display text-[clamp(5rem,10vw,9rem)] font-extrabold text-carbon-soft leading-none mb-8 opacity-[0.15]">
          I
        </div>

        <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[1.15] mb-12 max-w-[750px]">
          Il patrimonio crolla.
          <br />
          <em className="italic text-crimson-light">
            La burocrazia osserva.
          </em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="font-body text-base font-light leading-relaxed text-stone-light">
            <p>
              Ogni anno miliardi di euro di fondi pubblici vengono stanziati
              per la conservazione del patrimonio architettonico. Ogni anno,
              palazzi storici continuano a deteriorarsi. Il problema non è la
              scarsità di risorse. Il problema è un apparato burocratico che
              trasforma l&apos;urgenza in procedure, i cantieri in decenni di
              attesa, i fondi in voci contabili che non raggiungono mai la
              pietra.
            </p>
            <p className="mt-6">
              Petra bypassa l&apos;intero sistema. Connette il turista
              direttamente al cantiere tramite micro-donazioni tracciate
              crittograficamente, eliminando ogni intermediario. Non è carità.
              È infrastruttura.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-10">
            {[
              {
                value: "7+",
                label:
                  "Anni medi per un restauro finanziato dallo Stato",
              },
              {
                value: "68%",
                label: "Fondi dispersi in apparato amministrativo",
              },
              {
                value: "0",
                label: "Intermediari tra donatore e cantiere",
              },
            ].map((stat, i) => (
              <div key={i} className="border-l-2 border-crimson pl-6">
                <div className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-ivory leading-none">
                  {stat.value}
                </div>
                <div className="font-body text-xs font-normal text-stone mt-1.5 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
