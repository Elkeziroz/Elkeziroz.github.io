import { prisma } from "@/lib/prisma";
import {
  DEFAULT_ROLE_PERMISSIONS,
  MANAGED_ROLES,
  PermissionKey
} from "./permissionsTypes";

export * from "./permissionsTypes";

export async function getRolePermissions(): Promise<Record<string, Record<PermissionKey, boolean>>> {
  try {
    const dbItem = await prisma.siteSetting.findUnique({
      where: { key: "role_permissions_json" },
    });

    if (dbItem?.value) {
      const parsed = JSON.parse(dbItem.value);
      return { ...DEFAULT_ROLE_PERMISSIONS, ...parsed };
    }
  } catch (e) {
    console.error("Error loading role permissions:", e);
  }
  return DEFAULT_ROLE_PERMISSIONS;
}

export async function checkStaffPermission(roleLevel: number, permissionKey: PermissionKey): Promise<boolean> {
  // Owner (Level 100) ALWAYS has permission
  if (roleLevel >= 100) return true;

  const permissions = await getRolePermissions();
  const role = MANAGED_ROLES.find((r) => r.level === roleLevel);

  if (!role) return false;
  return permissions[role.key]?.[permissionKey] ?? false;
}
