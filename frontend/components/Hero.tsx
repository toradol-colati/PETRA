import Image from "next/image";
 
export default function Hero() {
  return (
    <section className="flex flex-col items-center w-full bg-ivory">
      
      {/* Schermata Iniziale: Solo Logo e Titolo */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center pt-20 px-6 md:px-10">
        <div className="mb-0">
         <Image
           src="/Petra-logo.svg"
           alt="Petra"
           width={432}
           height={432}
           className="w-[432px] h-[432px] object-contain opacity-[0.95]"
         />
        </div>
 
        <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-[0.35em] uppercase text-carbon text-center">
          P&nbsp;E&nbsp;T&nbsp;R&nbsp;A
        </h1>
      </div>
 
      {/* Sezione di transizione: Divider e Pilastri */}
      <div className="w-full bg-ivory-deep flex flex-col items-center px-6 md:px-10 py-32 border-t border-stone-pale/50">
        <div className="w-full max-w-[1200px] h-px bg-carbon/10 mb-16" />
 
        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-0 border border-carbon/10">
          {[
            {
              eyebrow: "Missione",
              text: "Preservare il patrimonio culturale dell'umanità.",
            },
            {
              eyebrow: "Protocollo",
              text: "Trasparente, permanente, immutabile.",
            },
            {
              eyebrow: "Impatto",
              text: "Permettiamo a tutti di esserne custodi attivi ed ai responsabili di navigare tra gli alti costi di restauro.",
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className={`p-10 bg-ivory/50 hover:bg-white transition-all duration-500 ease-in-out group ${
                i < 2 ? "border-b md:border-b-0 md:border-r border-carbon/10" : ""
              }`}
            >
              <h3 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-crimson mb-6 group-hover:translate-x-1 transition-transform duration-500">
                {pillar.eyebrow}
              </h3>
              <p className="font-body text-sm font-light leading-[1.85] text-carbon-soft">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}