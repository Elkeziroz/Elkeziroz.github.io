import { getTopPlayersData } from "@/lib/leaderboards";
import { getSiteSettings } from "@/lib/settings";
import LeaderboardsClient from "./LeaderboardsClient";

export const metadata = {
  title: "Tabla de Clasificación Top Jugadores | Miyobi Network",
  description: "Conoce a los mejores jugadores en BoxPvP Extreme y Survival Custom en Miyobi Network.",
};

export default async function LeaderboardsPage() {
  const { topKills, topCoins, topVotes } = await getTopPlayersData();
  const settings = await getSiteSettings();

  return (
    <LeaderboardsClient
      topKills={topKills}
      topCoins={topCoins}
      topVotes={topVotes}
      settings={settings}
    />
  );
}
