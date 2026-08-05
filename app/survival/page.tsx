import SurvivalClient from "./SurvivalClient";
import { getSiteSettings } from "@/lib/settings";

export const metadata = {
  title: "Survival Custom 1.20+ | Miyobi",
  description: "Modalidad Survival Custom de Miyobi: protecciones de terreno, economía equilibrada, subastas, trabajos, clanes y misiones en Minecraft Java y Bedrock.",
};

export default async function SurvivalPage() {
  const settings = await getSiteSettings();
  return <SurvivalClient settings={settings} />;
}