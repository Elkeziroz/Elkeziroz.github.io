import HomeClient from "@/components/HomeClient";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";

export default async function Home() {
  const now = new Date();

  let events: any[] = [];
  let settings: Record<string, string> = {};

  try {
    const results = await Promise.all([
      prisma.event.findMany({
        where: {
          active: true,
          AND: [
            {
              OR: [
                { publishAt: null },
                { publishAt: { lte: now } },
              ],
            },
            {
              OR: [
                { endAt: null },
                { endAt: { gte: now } },
              ],
            },
          ],
        },
        orderBy: [
          { featured: "desc" },
          { date: "asc" },
        ],
      }).catch((err) => {
        console.error("Prisma events query error (quota/connection):", err?.message || err);
        return [];
      }),
      getSiteSettings().catch((err) => {
        console.error("Settings query error:", err?.message || err);
        return {};
      }),
    ]);

    events = results[0] || [];
    settings = results[1] || {};
  } catch (error) {
    console.error("Error loading home page:", error);
    settings = await getSiteSettings();
  }

  return (
    <HomeClient
      events={events}
      settings={settings}
    />
  );
}