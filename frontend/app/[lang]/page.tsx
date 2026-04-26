import Hero from "@/components/Hero";
import ProtocolBanner from "@/components/ProtocolBanner";
import Network from "@/components/Network";
import { getDictionary } from "@/app/dictionaries";
import type { Locale } from "@/i18n.config";

export default async function Home({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <>
      <Hero dict={dict.hero} />
      <ProtocolBanner dict={dict} lang={params.lang} />
      <Network dict={dict.network} lang={params.lang} />
    </>
  );
}