import { DISCORD_ROLES } from "./roles";
import { getStaffRoleFromMember } from "./discordRoles";

type DiscordUser = {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string;
};

export type DiscordMember = {
  user?: DiscordUser;
  roles?: string[];
};

export type DiscordStaffUser = {
  discordId: string;
  username: string;
  avatar: string;
  roleName: string;
  roleLevel: number;
};

const GUILD_ID = process.env.DISCORD_GUILD_ID;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

async function fetchDiscordMember(
  discordId: string
): Promise<DiscordMember | null> {
  if (!GUILD_ID || !BOT_TOKEN) {
    console.error("Discord env variables missing.");
    return null;
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${discordId}`,
    {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error("Discord API error:", response.status, await response.text());
    return null;
  }

  return (await response.json()) as DiscordMember;
}

export async function getDiscordMember(discordId: string) {
  return await fetchDiscordMember(discordId);
}

export function isStaffRoles(roles?: string[] | DiscordMember | null) {
  const roleList = Array.isArray(roles)
    ? roles
    : roles?.roles ?? [];

  return roleList.some((role) =>
    Object.values(DISCORD_ROLES).includes(role)
  );
}

export async function isStaffMember(discordId: string): Promise<boolean> {
  const member = await fetchDiscordMember(discordId);
  return isStaffRoles(member);
}

// Fetch all staff members from Discord Guild
export async function getDiscordStaffMembersList(): Promise<DiscordStaffUser[]> {
  if (!GUILD_ID || !BOT_TOKEN) {
    return [
      {
        discordId: "1",
        username: "Miyobi Staff Member",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
        roleName: "Staff",
        roleLevel: 50,
      },
    ];
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000`,
      {
        headers: {
          Authorization: `Bot ${BOT_TOKEN}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch guild members from Discord API");
      return [];
    }

    const members: DiscordMember[] = await response.json();
    const staffMembers: DiscordStaffUser[] = [];

    for (const m of members) {
      if (m.user && m.roles && isStaffRoles(m.roles)) {
        const staffRole = getStaffRoleFromMember(m);
        const name = m.user.global_name || m.user.username;
        const avatar = m.user.avatar
          ? `https://cdn.discordapp.com/avatars/${m.user.id}/${m.user.avatar}.png`
          : "https://cdn.discordapp.com/embed/avatars/0.png";

        staffMembers.push({
          discordId: m.user.id,
          username: name,
          avatar,
          roleName: staffRole?.name || "Staff",
          roleLevel: staffRole?.level || 10,
        });
      }
    }

    // Sort by role level descending
    staffMembers.sort((a, b) => b.roleLevel - a.roleLevel);
    return staffMembers;
  } catch (error) {
    console.error("Error fetching Discord staff members:", error);
    return [];
  }
}
