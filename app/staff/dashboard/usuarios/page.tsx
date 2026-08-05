import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { checkStaffPermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import UsuariosClient from "./UsuariosClient";

export const metadata = {
  title: "Moderación & Usuarios | Miyobi Staff",
  description: "Monitoreo en vivo de jugadores conectados vía Velocity Proxy y gestión de sanciones.",
};

export default async function UsuariosPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/staff");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    redirect("/staff/access-denied");
  }

  const staffRole = await getStaffRole(session.user.discordId);
  const canManageUsers = staffRole ? await checkStaffPermission(staffRole.level, "can_manage_users") : false;

  if (!canManageUsers && (!staffRole || staffRole.level < 40)) {
    redirect("/staff/dashboard");
  }

  const [players, serverStatus, pendingSanctions] = await Promise.all([
    prisma.player.findMany({
      include: {
        punishments: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { isOnline: "desc" },
      take: 100,
    }),
    prisma.serverHeartbeat.findUnique({
      where: { serverKey: "proxy" },
    }),
    prisma.sanctionQueue.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <UsuariosClient
      players={players}
      serverStatus={serverStatus}
      pendingSanctions={pendingSanctions}
    />
  );
}