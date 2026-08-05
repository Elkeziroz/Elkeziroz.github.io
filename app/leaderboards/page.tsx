import { getTopPlayersData } from "@/lib/leaderboards";
import { getSiteSettings } from "@/lib/settings";
import LeaderboardsClient from "../top/LeaderboardsClient";

export const metadata = {
  title: "Leaderboards & Top Jugadores | Miyobi Network",
  description: "Revisa las clasificaciones oficiales de Miyobi Network.",
};

export default async function LeaderboardsAliasPage() {
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
