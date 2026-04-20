import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getDictionary } from "@/app/dictionaries";
import type { Locale } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; id: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);
  const projectData = getStaticProject(params.id, dict);
  if (!projectData) {
    return { title: dict.projectPage.notFound };
  }
  return {
    title: projectData.city,
    description: projectData.description,
  };
}

function getStaticProject(
  id: string,
  dict: Awaited<ReturnType<typeof getDictionary>>
) {
  const projects: Record<string, typeof dict.network.venice> = {
    venezia: dict.network.venice,
    venice: dict.network.venice,
  };
  return projects[id] ?? null;
}

interface LiveProjectData {
  donationCount: number;
  totalDonatedCents: number;
  status: string;
}

async function fetchProjectData(id: string): Promise<LiveProjectData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/api/projects/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export default async function ProgettoPage({
  params,
}: {
  params: { lang: Locale; id: string };
}) {
  const dict = await getDictionary(params.lang);
  const project = getStaticProject(params.id, dict);
  const t = dict.projectPage;

  if (!project) {
    return (
      <section className="pt-40 pb-24 md:pb-40 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
              <div />
              <div>
                <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-8">
                  {t.notFound}
                </h1>
                <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft mb-12">
                  {t.notFoundDesc}
                </p>
                <Link
                  href={`/${params.lang}`}
                  className="font-body text-sm font-light text-crimson hover:text-crimson-dark transition-colors duration-300"
                >
                  {t.backLink}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  // Try to fetch live data from API
  const liveData = await fetchProjectData(params.id);

  return (
    <section className="pt-40 pb-24 md:pb-40 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div>
              <p className="font-body text-xs font-bold tracking-[0.2em] uppercase text-carbon-soft lg:sticky lg:top-32">
                {dict.network.sidebarLabel}
              </p>
            </div>
            <div>
              <Link
                href={`/${params.lang}`}
                className="font-body text-xs font-light text-crimson hover:text-crimson-dark transition-colors duration-300 mb-12 inline-block"
              >
                {t.backLink}
              </Link>

              <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
                {project.city}
              </h1>
              <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-12">
                {project.status}
              </div>
              <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[700px]">
                {project.longDescription}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 mb-24 md:mb-32">
            <div />
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-pale">
                {[
                  { label: t.timelineLabel, value: project.timeline },
                  { label: t.targetLabel, value: project.target },
                  { label: t.partnerLabel, value: project.partner },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`p-8 md:p-10 hover:bg-parchment transition-colors duration-300 ${
                      i < 2
                        ? "border-b md:border-b-0 md:border-r border-stone-pale"
                        : ""
                    }`}
                  >
                    <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-stone mb-3">
                      {item.label}
                    </div>
                    <div className="font-body text-sm font-light leading-[1.8] text-carbon">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Live donation data when API is available */}
        {liveData && (
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
              <div />
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-crimson/20">
                  <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-crimson/20">
                    <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-3">
                      Donazioni raccolte
                    </div>
                    <div className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-carbon leading-none">
                      {formatCents(liveData.totalDonatedCents)}
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="font-body text-[10px] font-bold tracking-[0.25em] uppercase text-crimson mb-3">
                      Numero donazioni
                    </div>
                    <div className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold text-carbon leading-none">
                      {liveData.donationCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
