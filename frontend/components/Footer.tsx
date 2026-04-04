export default function Footer() {
  return (
    <footer className="bg-carbon text-stone border-t border-crimson py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 pb-16 border-b border-white/5">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-bold tracking-[0.35em] uppercase text-ivory mb-6">
              P&nbsp;E&nbsp;T&nbsp;R&nbsp;A
            </div>
            <p className="font-body text-xs font-light leading-relaxed text-stone-light max-w-[280px] opacity-70">
              per la tutela del patrimonio culturale.
            </p>
          </div>
 
          {/* Sistema */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              Sistema
            </div>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="#sistema" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Protocollo
                </a>
              </li>
              <li>
                <a href="#sistema" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Petra Cards e Petri
                </a>
              </li>
              <li>
                <a href="#sistema" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Web App e Mappe
                </a>
              </li>
            </ul>
          </div>
 
          {/* Network */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              Network
            </div>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="#network" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Progetti Attivi
                </a>
              </li>
              <li>
                <a href="#network" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Diventa Partner
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Whitepaper
                </a>
              </li>
            </ul>
          </div>
 
          {/* Istituzionale */}
          <div>
            <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-8">
              Legal
            </div>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="#" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Termini di Servizio
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-xs text-stone hover:text-ivory transition-colors duration-500">
                  Licenze
                </a>
              </li>
            </ul>
          </div>
        </div>
 
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 opacity-40">
          <div className="font-body text-[10px] text-stone-light tracking-widest uppercase">
            © 2026 PETRA — Protocol for Cultural Heritage.
          </div>
          <div className="flex gap-8">
            <a href="#" className="font-body text-[10px] text-stone-light hover:text-ivory transition-colors duration-500 uppercase tracking-widest">
              Cookie
            </a>
            <a href="#" className="font-body text-[10px] text-stone-light hover:text-ivory transition-colors duration-500 uppercase tracking-widest">
              GDPR
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}