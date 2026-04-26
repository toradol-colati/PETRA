import System from "@/components/System";
import { getDictionary } from "@/app/dictionaries";
import type { Locale } from "@/i18n.config";

export default async function ProtocolloPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="pt-24 min-h-screen bg-ivory">
      <System dict={dict.system} />
    </div>
  );
}
