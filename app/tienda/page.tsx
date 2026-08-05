import { getSiteSettings } from "@/lib/settings";
import TiendaClient from "./TiendaClient";

export const metadata = {
  title: "Tienda Oficial VIP | Miyobi Network",
  description: "Adquiere rangos VIP, llaves legendarias, paquetes de monedas y beneficios exclusivos para Minecraft Java y Bedrock.",
};

export default async function TiendaPage() {
  const settings = await getSiteSettings();

  return <TiendaClient settings={settings} />;
}
