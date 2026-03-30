export default function Registry() {
  return (
    <section
      id="registry"
      className="bg-parchment border-y border-stone-pale py-24 md:py-40 px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div>
          <p className="font-body text-[0.72rem] font-semibold tracking-eyebrow uppercase text-crimson mb-5">
            Registro pubblico
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[1.15] mb-8">
            Verificabilità matematica, non promesse
          </h2>
          <p className="font-body text-base font-light leading-relaxed text-carbon-soft mb-8">
            Ogni lotto di donazioni viene crittograficamente sigillato in un
            Merkle Tree. La Root Hash risultante è iniettata nel campo Memo
            di una transazione XRPL, creando una prova immutabile e
            pubblicamente verificabile. Nessun fondo può essere distratto
            senza alterare l&apos;hash — e alterare l&apos;hash è
            matematicamente impossibile.
          </p>

          {/* JSON Block */}
          <div className="bg-carbon text-ivory p-8 font-mono text-xs leading-[1.8] relative overflow-hidden">
            <span className="absolute top-3 right-4 font-body text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-crimson-light">
              XRPL MEMO FIELD
            </span>
            <div className="opacity-60">{"{"}</div>
            <div className="opacity-60">
              &nbsp;&nbsp;&quot;Account&quot;:
              &quot;rPetraMaster...x4Kj&quot;,
            </div>
            <div className="opacity-60">
              &nbsp;&nbsp;&quot;TransactionType&quot;:
              &quot;Payment&quot;,
            </div>
            <div className="text-crimson-light">
              &nbsp;&nbsp;&quot;Memos&quot;: [{"{"}{" "}
            </div>
            <div className="text-crimson-light">
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;MemoData&quot;:
              &quot;a3f8c1...e7b204&quot;,
            </div>
            <div className="text-crimson-light">
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;MemoType&quot;:
              &quot;merkle-root/sha256&quot;
            </div>
            <div className="text-crimson-light">
              &nbsp;&nbsp;{"}"}],
            </div>
            <div className="opacity-60">
              &nbsp;&nbsp;&quot;Ledger&quot;: 84291057,
            </div>
            <div className="opacity-60">
              &nbsp;&nbsp;&quot;validated&quot;: true
            </div>
            <div className="opacity-60">{"}"}</div>
          </div>
        </div>

        {/* Merkle Tree */}
        <div>
          <div className="bg-ivory border border-stone-pale p-10 text-center">
            <p className="font-body text-[0.72rem] font-semibold tracking-[0.3em] uppercase text-stone mb-8">
              Struttura Merkle Tree
            </p>

            <div className="flex flex-col items-center gap-5">
              <div className="font-mono text-[0.65rem] px-4 py-2.5 border border-crimson text-crimson font-semibold bg-crimson/[0.04] tracking-wider">
                ROOT: a3f8c1...e7b2
              </div>

              <div className="flex justify-center gap-8 text-stone-pale text-[0.7rem]">
                <span>╱</span>
                <span>╲</span>
              </div>

              <div className="flex gap-3">
                <div className="font-mono text-[0.65rem] px-3 py-2 border border-stone-pale text-stone bg-parchment tracking-wider">
                  H(AB): 7d2e...f1a9
                </div>
                <div className="font-mono text-[0.65rem] px-3 py-2 border border-stone-pale text-stone bg-parchment tracking-wider">
                  H(CD): b4c8...3e7f
                </div>
              </div>

              <div className="flex justify-center gap-4 text-stone-pale text-[0.7rem]">
                <span>╱</span>
                <span>╲</span>
                <span className="ml-4">╱</span>
                <span>╲</span>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                {["Don. A", "Don. B", "Don. C", "Don. D"].map(
                  (label) => (
                    <div
                      key={label}
                      className="font-mono text-[0.65rem] px-3 py-2 border border-stone-pale text-stone bg-parchment tracking-wider"
                    >
                      {label}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
