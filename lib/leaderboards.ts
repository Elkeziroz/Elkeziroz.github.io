import { prisma } from "@/lib/prisma";

export type LeaderboardPlayer = {
  id: string;
  username: string;
  uuid: string;
  isOnline: boolean;
  currentServer?: string | null;
  kills: number;
  deaths: number;
  kdr: string;
  coins: number;
  votes: number;
  playtime?: string | null;
};

const SEED_TOP_PLAYERS = [
  { username: "Elkezitoz666", uuid: "1424184548522070066", kills: 1450, deaths: 120, coins: 45800, votes: 32, playtime: "142h", isOnline: true, currentServer: "BoxPvP" },
  { username: "zAlejoo__", uuid: "1424184548522070067", kills: 1120, deaths: 190, coins: 38200, votes: 28, playtime: "118h", isOnline: true, currentServer: "Survival" },
  { username: "Viper_PvP", uuid: "1424184548522070068", kills: 980, deaths: 210, coins: 29400, votes: 24, playtime: "95h", isOnline: false, currentServer: "Desconectado" },
  { username: "Shadow_Ninja", uuid: "1424184548522070069", kills: 840, deaths: 250, coins: 24100, votes: 20, playtime: "82h", isOnline: true, currentServer: "BoxPvP" },
  { username: "Kratos_MC", uuid: "1424184548522070070", kills: 760, deaths: 290, coins: 19800, votes: 19, playtime: "74h", isOnline: false, currentServer: "Desconectado" },
  { username: "Aura_Gamer", uuid: "1424184548522070071", kills: 690, deaths: 310, coins: 17500, votes: 17, playtime: "68h", isOnline: true, currentServer: "Survival" },
  { username: "Nexus_Craft", uuid: "1424184548522070072", kills: 610, deaths: 340, coins: 14900, votes: 15, playtime: "59h", isOnline: false, currentServer: "Desconectado" },
  { username: "Titan_Force", uuid: "1424184548522070073", kills: 540, deaths: 380, coins: 12400, votes: 14, playtime: "52h", isOnline: true, currentServer: "BoxPvP" },
  { username: "Blaze_Storm", uuid: "1424184548522070074", kills: 480, deaths: 410, coins: 10200, votes: 12, playtime: "46h", isOnline: false, currentServer: "Desconectado" },
  { username: "Phoenix_King", uuid: "1424184548522070075", kills: 420, deaths: 430, coins: 8900, votes: 10, playtime: "39h", isOnline: false, currentServer: "Desconectado" },
];

export async function getTopPlayersData(): Promise<{
  topKills: LeaderboardPlayer[];
  topCoins: LeaderboardPlayer[];
  topVotes: LeaderboardPlayer[];
}> {
  try {
    let count = await prisma.player.count();

    // Auto-seed initial top players if database is fresh
    if (count < 5) {
      for (const p of SEED_TOP_PLAYERS) {
        await prisma.player.upsert({
          where: { username: p.username },
          update: {
            kills: p.kills,
            deaths: p.deaths,
            coins: p.coins,
            votes: p.votes,
            playtime: p.playtime,
            isOnline: p.isOnline,
            currentServer: p.currentServer,
          },
          create: {
            username: p.username,
            uuid: p.uuid,
            kills: p.kills,
            deaths: p.deaths,
            coins: p.coins,
            votes: p.votes,
            playtime: p.playtime,
            isOnline: p.isOnline,
            currentServer: p.currentServer,
          },
        });
      }
    }

    const allPlayers = await prisma.player.findMany({
      take: 100,
    });

    const formatted: LeaderboardPlayer[] = allPlayers.map((p) => {
      const kills = p.kills || 0;
      const deaths = p.deaths || 1;
      const kdr = (kills / Math.max(1, deaths)).toFixed(2);
      return {
        id: p.id,
        username: p.username,
        uuid: p.uuid || p.username,
        isOnline: p.isOnline,
        currentServer: p.currentServer,
        kills,
        deaths: p.deaths || 0,
        kdr,
        coins: p.coins || 0,
        votes: p.votes || 0,
        playtime: p.playtime || "0h",
      };
    });

    const topKills = [...formatted].sort((a, b) => b.kills - a.kills);
    const topCoins = [...formatted].sort((a, b) => b.coins - a.coins);
    const topVotes = [...formatted].sort((a, b) => b.votes - a.votes);

    return { topKills, topCoins, topVotes };
  } catch (error) {
    console.error("Error fetching top players:", error);
    return { topKills: [], topCoins: [], topVotes: [] };
  }
}
