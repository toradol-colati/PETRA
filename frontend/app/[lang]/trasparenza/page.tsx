import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import { getDictionary } from "@/app/dictionaries";
import type { Locale } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  return {
    title: dict.transparency.title,
    description: dict.transparency.intro.substring(0, 155),
  };
}

interface BatchData {
  id: string;
  rootHash: string;
  xrplTxHash: string | null;
  status: string;
  leafCount: number;
  totalAmount: number;
  createdAt: string;
}

async function fetchBatches(): Promise<BatchData[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/batches`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function truncateHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
}

export default async function TrasparenzaPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);
  const t = dict.transparency;
  const h = t.tableHeaders;

  const batches = await fetchBatches();
  const hasBatches = batches.length > 0;

  return (
    <section className="pt-40 pb-24 md:pb-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div>
              <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32">
                {t.title}
              </p>
            </div>
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-8">
                {t.title}
              </h1>
              <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px]">
                {t.intro}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Batch Table */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <div className="border border-stone-pale overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-stone-pale bg-ivory-deep">
                      <th className="p-4 text-left font-body text-[10px] font-bold tracking-[0.2em] uppercase text-carbon-soft">
                        {h.id}
                      </th>
                      <th className="p-4 text-left font-body text-[10px] font-bold tracking-[0.2em] uppercase text-carbon-soft">
                        {h.donations}
                      </th>
                      <th className="p-4 text-left font-body text-[10px] font-bold tracking-[0.2em] uppercase text-carbon-soft">
                        {h.rootHash}
                      </th>
                      <th className="p-4 text-left font-body text-[10px] font-bold tracking-[0.2em] uppercase text-carbon-soft">
                        {h.xrplTx}
                      </th>
                      <th className="p-4 text-left font-body text-[10px] font-bold tracking-[0.2em] uppercase text-carbon-soft">
                        {h.status}
                      </th>
                      <th className="p-4 text-left font-body text-[10px] font-bold tracking-[0.2em] uppercase text-carbon-soft">
                        {h.date}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasBatches ? (
                      batches.map((batch) => (
                        <tr
                          key={batch.id}
                          className="border-b border-stone-pale/50 hover:bg-parchment transition-colors duration-300"
                        >
                          <td className="p-4 font-body text-xs text-carbon font-mono">
                            {truncateHash(batch.id)}
                          </td>
                          <td className="p-4 font-body text-xs text-carbon">
                            {batch.leafCount} ({formatCents(batch.totalAmount)})
                          </td>
                          <td className="p-4 font-body text-xs text-carbon font-mono">
                            {truncateHash(batch.rootHash)}
                          </td>
                          <td className="p-4 font-body text-xs">
                            {batch.xrplTxHash ? (
                              <a
                                href={`https://testnet.xrpl.org/transactions/${batch.xrplTxHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-crimson hover:text-crimson-dark transition-colors duration-300"
                              >
                                {truncateHash(batch.xrplTxHash)}
                              </a>
                            ) : (
                              <span className="text-stone">—</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span
                              className={`font-body text-[10px] font-bold tracking-widest uppercase ${
                                batch.status === "COMMITTED"
                                  ? "text-green-700"
                                  : batch.status === "FAILED"
                                  ? "text-crimson"
                                  : "text-stone"
                              }`}
                            >
                              {batch.status}
                            </span>
                          </td>
                          <td className="p-4 font-body text-xs text-carbon-soft">
                            {new Date(batch.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-12 text-center">
                          <p className="font-body text-sm font-light leading-[1.8] text-stone">
                            {t.emptyState}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Verification Process */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div />
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-12">
                {t.howTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-stone-pale">
                {t.howSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 group ${
                      i < t.howSteps.length - 1
                        ? "border-b md:border-b border-stone-pale"
                        : ""
                    } ${i % 2 === 0 ? "md:border-r border-stone-pale" : ""}`}
                  >
                    <div className="font-display text-[2rem] font-extrabold text-stone-pale leading-none mb-4 group-hover:text-crimson transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="font-body text-xs font-light leading-[1.7] text-carbon-soft">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
