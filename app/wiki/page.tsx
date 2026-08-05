import WikiClient from "./WikiClient";
import { getSiteSettings } from "@/lib/settings";

export const metadata = {
  title: "Wiki & Guías | Miyobi",
  description: "Guía completa de Miyobi: modos, reglas, comandos y contenido del servidor.",
};

export default async function WikiPage() {
  const settings = await getSiteSettings();
  return <WikiClient settings={settings} />;
}
