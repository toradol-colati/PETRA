import "../globals.css";
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getDictionary } from "@/app/dictionaries";
import type { Locale } from "@/i18n.config";
import { i18n } from "@/i18n.config";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale = params.lang === "en" ? "en_US" : "it_IT";
  const description =
    params.lang === "en"
      ? "Digital infrastructure for the conservation of cultural and artistic heritage."
      : "Infrastruttura digitale per la conservazione del patrimonio culturale e artistico.";

  return {
    metadataBase: new URL("https://petra.io"),
    title: {
      default: "PETRA",
      template: "%s — PETRA",
    },
    description,
    openGraph: {
      title: "PETRA",
      description,
      url: "https://petra.io",
      siteName: "PETRA",
      images: [
        {
          url: "/og-image.png",
          width: 1024,
          height: 1024,
          alt: "PETRA - Cultural Heritage Conservation",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "PETRA",
      description,
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/Petra-logo.svg",
      shortcut: "/Petra-logo.svg",
      apple: "/Petra-logo.svg",
    },
    manifest: "/manifest.json",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans">
        <Navbar dict={dict.nav} lang={params.lang} />
        <main className="min-h-screen bg-ivory selection:bg-crimson selection:text-parchment">
          {children}
        </main>
        <Footer dict={dict.footer} lang={params.lang} />

      </body>
    </html>
  );
}