"use server";

import { auth } from "@/auth";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { prisma } from "@/lib/prisma";
import { MANAGED_ROLES, PERMISSION_DEFINITIONS } from "@/lib/permissionsTypes";
import { updateGlobalSyncTimestamp } from "@/actions/sync";
import { revalidatePath } from "next/cache";

export async function updateRolePermissions(formData: FormData) {
  const session = await auth();

  if (!session?.user?.discordId) {
    throw new Error("No autorizado");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    throw new Error("Sin permisos de Staff");
  }

  const userRole = await getStaffRole(session.user.discordId);
  if (!userRole || userRole.level < 100) {
    throw new Error("Solo el Owner (Nivel 100) puede modificar la matriz de permisos de los rangos.");
  }

  const newPermissionsMap: Record<string, Record<string, boolean>> = {};

  for (const role of MANAGED_ROLES) {
    newPermissionsMap[role.key] = {};
    for (const perm of PERMISSION_DEFINITIONS) {
      const fieldKey = `perm_${role.key}_${perm.key}`;
      const isChecked = formData.get(fieldKey) === "true" || formData.get(fieldKey) === "on";
      newPermissionsMap[role.key][perm.key] = isChecked;
    }
  }

  const jsonValue = JSON.stringify(newPermissionsMap);

  await prisma.siteSetting.upsert({
    where: { key: "role_permissions_json" },
    update: { value: jsonValue },
    create: { key: "role_permissions_json", value: jsonValue },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
  revalidatePath("/staff/dashboard/configuracion");
  revalidatePath("/staff/dashboard/configuracion/sistema");
  revalidatePath("/staff/dashboard/configuracion/web");
  revalidatePath("/staff/dashboard/solicitudes");

  return { success: true };
}
