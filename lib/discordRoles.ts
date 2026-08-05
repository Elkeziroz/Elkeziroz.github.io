import { DISCORD_ROLES } from "./roles";
import { getDiscordMember } from "./discord";

type DiscordMember = {
  roles?: string[];
};

type StaffRole = {
  name: string;
  level: number;
};

function buildStaffRole(roles: string[]): StaffRole {
  if (roles.includes(DISCORD_ROLES.OWNER)) {
    return { name: "Owner", level: 100 };
  }

  if (roles.includes(DISCORD_ROLES.ADMIN)) {
    return { name: "Administrador", level: 90 };
  }

  if (roles.includes(DISCORD_ROLES.SMOD)) {
    return { name: "Supervisor", level: 80 };
  }

  if (roles.includes(DISCORD_ROLES.DEV)) {
    return { name: "Developer", level: 70 };
  }

  if (roles.includes(DISCORD_ROLES.MOD)) {
    return { name: "Moderador", level: 60 };
  }

  if (roles.includes(DISCORD_ROLES.SOPORTE)) {
    return { name: "Soporte", level: 40 };
  }

  if (roles.includes(DISCORD_ROLES.AYUDANTE)) {
    return { name: "Ayudante", level: 20 };
  }

  return { name: "Staff", level: 10 };
}

export function getStaffRoleFromMember(
  member: DiscordMember | null
): StaffRole | null {
  const roles = member?.roles;

  if (!roles?.length) {
    return null;
  }

  return buildStaffRole(roles);
}

export function isStaffRoles(
  roles?: string[] | DiscordMember | null
): boolean {
  const roleList = Array.isArray(roles) ? roles : roles?.roles ?? [];
  return roleList.some((role) =>
    Object.values(DISCORD_ROLES).includes(role)
  );
}

export async function getStaffRole(discordId: string) {
  const member = await getDiscordMember(discordId);
  return getStaffRoleFromMember(member);
}