import BoxPvPClient from "./BoxPvPClient";
import { getSiteSettings } from "@/lib/settings";

export const metadata = {
  title: "BoxPvP Extreme | Miyobi",
  description: "Modalidad BoxPvP Extreme de Miyobi: minas por rangos, crafteos únicos, arena KOTH, encantamientos custom y cajas misteriosas en Minecraft Java y Bedrock.",
};

export default async function BoxPvPPage() {
  const settings = await getSiteSettings();
  return <BoxPvPClient settings={settings} />;
}
