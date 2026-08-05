import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { getBotConfigAction } from "./actions";
import BotConfigEditorClient from "./BotConfigEditorClient";

export const metadata = {
  title: "Personalización del Bot | Miyobi Staff",
  description: "Panel de administración exclusivo para la configuración del bot de Discord MiyobiBot.",
};

export default async function BotConfigPage() {
  const session = await auth();

  if (!session?.user?.discordId) {
    redirect("/staff");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    redirect("/staff/access-denied");
  }

  const staffRole = await getStaffRole(session.user.discordId);
  if (!staffRole || staffRole.level < 90) {
    redirect("/staff/dashboard");
  }

  const initialConfig = await getBotConfigAction();

  return (
    <main className="text-white space-y-8 max-w-6xl mx-auto pb-16">
      <BotConfigEditorClient initialConfig={initialConfig} />
    </main>
  );
}
