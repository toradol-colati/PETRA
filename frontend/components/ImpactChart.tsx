"use client";

import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";

interface ScenarioData {
  label: string;
  visitors: string;
  conversionRate: string;
  avgDonation: string;
  annualRevenue: number;
  facades: number;
  color: string;
}

const SCENARIOS: ScenarioData[] = [
  {
    label: "Conservativo",
    visitors: "30M",
    conversionRate: "0.5%",
    avgDonation: "€5",
    annualRevenue: 750000,
    facades: 15,
    color: "bg-stone",
  },
  {
    label: "Base",
    visitors: "30M",
    conversionRate: "1%",
    avgDonation: "€5",
    annualRevenue: 1500000,
    facades: 30,
    color: "bg-crimson",
  },
  {
    label: "Ottimistico",
    visitors: "30M",
    conversionRate: "3%",
    avgDonation: "€5",
    annualRevenue: 4500000,
    facades: 90,
    color: "bg-carbon",
  },
];

const MAX_REVENUE = 4500000;

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents);
}

interface ImpactChartProps {
  dict: {
    title: string;
    subtitle: string;
    scenarioLabel: string;
    visitorsLabel: string;
    conversionLabel: string;
    avgLabel: string;
    revenueLabel: string;
    facadesLabel: string;
  };
}

export default function ImpactChart({ dict }: ImpactChartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h3 className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-bold leading-[1.15] tracking-wide text-carbon mb-4">
        {dict.title}
      </h3>
      <p className="font-body text-sm font-light leading-[1.8] text-carbon-soft max-w-[600px] mb-12">
        {dict.subtitle}
      </p>

      <div className="flex flex-col gap-6 mb-12">
        {SCENARIOS.map((s, i) => {
          const pct = (s.annualRevenue / MAX_REVENUE) * 100;
          return (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-xs font-bold tracking-[0.12em] uppercase text-carbon">
                  {s.label}
                </span>
                <span className="font-body text-xs font-light text-carbon-soft">
                  {formatCurrency(s.annualRevenue)}/anno → {s.facades} facciate
                </span>
              </div>
              <div className="w-full h-8 bg-ivory-deep border border-stone-pale relative overflow-hidden">
                <div
                  className={`h-full ${s.color} transition-all duration-1000 ease-out`}
                  style={{ width: visible ? `${pct}%` : "0%" }}
                />
              </div>
              <div className="flex gap-6">
                <span className="font-body text-[10px] text-stone">
                  {dict.conversionLabel}: {s.conversionRate}
                </span>
                <span className="font-body text-[10px] text-stone">
                  {dict.avgLabel}: {s.avgDonation}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-body text-[10px] font-light text-stone italic">
        {dict.visitorsLabel}: ~30M/anno. {dict.facadesLabel}: ~€50.000/facciata.
      </p>
    </div>
  );
}
