export default function Footer() {
  return (
    <footer className="bg-carbon text-stone border-t-2 border-crimson pt-16 pb-10 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-carbon-soft">
          {/* Brand */}
          <div>
            <div className="font-display text-[1.3rem] font-bold tracking-institutional uppercase text-ivory mb-4">
              P<span className="text-crimson-light">E</span>TRA
            </div>
            <p className="font-body text-xs font-light leading-[1.7] text-stone max-w-[300px]">
              Infrastruttura tecnologica per la notarizzazione crittografica
              delle donazioni destinate alla conservazione del patrimonio
              architettonico mondiale.
            </p>
          </div>

          {/* Protocollo */}
          <div>
            <div className="font-body text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-stone-light mb-5">
              Protocollo
            </div>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#mechanics"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Come funziona
                </a>
              </li>
              <li>
                <a
                  href="#registry"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Registro pubblico
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Documentazione
                </a>
              </li>
            </ul>
          </div>

          {/* Rete */}
          <div>
            <div className="font-body text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-stone-light mb-5">
              Rete
            </div>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#b2b"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Diventa partner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Città attive
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Stampa
                </a>
              </li>
            </ul>
          </div>

          {/* Legale */}
          <div>
            <div className="font-body text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-stone-light mb-5">
              Legale
            </div>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="#"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Termini di Servizio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-body text-xs text-stone hover:text-ivory transition-colors duration-300"
                >
                  Licenza B2B
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="font-body text-[0.72rem] text-stone tracking-wider">
            © 2026 PETRA. Tutti i diritti riservati.
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-body text-[0.72rem] text-stone hover:text-ivory transition-colors duration-300"
            >
              Cookie
            </a>
            <a
              href="#"
              className="font-body text-[0.72rem] text-stone hover:text-ivory transition-colors duration-300"
            >
              GDPR
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
