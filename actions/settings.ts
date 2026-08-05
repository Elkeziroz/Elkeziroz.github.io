"use server";

import { auth } from "@/auth";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { updateGlobalSyncTimestamp } from "@/actions/sync";
import { revalidatePath } from "next/cache";

export async function updateWebSettings(formData: FormData) {
  const session = await auth();

  if (!session?.user?.discordId) {
    throw new Error("No autorizado");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    throw new Error("No tienes permisos de staff");
  }

  const staffRole = await getStaffRole(session.user.discordId);
  if (!staffRole || staffRole.level < 60) {
    throw new Error("Se requiere nivel de permiso 60 o superior para editar la configuración web.");
  }

  const keysToSave = Object.keys(DEFAULT_SETTINGS);

  for (const key of keysToSave) {
    const value = formData.get(key);
    if (value !== null && typeof value === "string") {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }

  await updateGlobalSyncTimestamp();

  revalidatePath("/");
  revalidatePath("/survival");
  revalidatePath("/boxpvp");
  revalidatePath("/wiki");
  revalidatePath("/postulaciones");
  revalidatePath("/staff/dashboard/configuracion/web");
}
