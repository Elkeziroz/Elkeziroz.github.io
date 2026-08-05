import PostulacionesClient from "./PostulacionesClient";
import { getSiteSettings } from "@/lib/settings";
import { auth } from "@/auth";

export const metadata = {
  title: "Postulación al Staff | Miyobi Network",
  description: "Formulario de postulación oficial con autenticación de Discord para unirse al equipo de Miyobi.",
};

export default async function PostulacionesPage() {
  const settings = await getSiteSettings();
  const session = await auth();

  return <PostulacionesClient settings={settings} session={session} />;
}
