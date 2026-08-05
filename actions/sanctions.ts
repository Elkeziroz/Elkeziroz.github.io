"use server";

import { auth } from "@/auth";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { checkStaffPermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { updateGlobalSyncTimestamp } from "@/actions/sync";
import { revalidatePath } from "next/cache";

export async function issueSanction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.discordId) {
    throw new Error("No autorizado");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    throw new Error("Sin permisos de Staff");
  }

  const staffRole = await getStaffRole(session.user.discordId);
  const canManageUsers = staffRole ? await checkStaffPermission(staffRole.level, "can_manage_users") : false;

  if (!canManageUsers && (!staffRole || staffRole.level < 40)) {
    throw new Error("No tienes permisos suficientes para sancionar jugadores.");
  }

  const username = formData.get("username") as string;
  const type = (formData.get("type") as string) || "BAN";
  const reason = (formData.get("reason") as string) || "Uso de hacks o conducta inapropiada";
  const duration = (formData.get("duration") as string) || "permanente";

  if (!username) {
    throw new Error("El nombre de usuario de Minecraft es obligatorio.");
  }

  // Create queue item for Velocity Proxy
  await prisma.sanctionQueue.create({
    data: {
      username: username.trim(),
      type: type.toUpperCase(),
      reason: reason.trim(),
      duration: duration.trim(),
      issuedBy: session.user.name || "Staff",
      executed: false,
    },
  });

  // Also check if player is currently in database and record punishment
  const existingPlayer = await prisma.player.findUnique({
    where: { username: username.trim() },
  });

  if (existingPlayer) {
    await prisma.punishment.create({
      data: {
        playerId: existingPlayer.id,
        type: type.toUpperCase(),
        reason: reason.trim(),
        duration: duration.trim(),
        staff: session.user.name || "Staff",
        active: true,
      },
    });
  }

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard/usuarios");
  revalidatePath(`/staff/dashboard/usuarios/${username}`);

  return { success: true };
}
