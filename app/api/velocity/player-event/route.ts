import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateGlobalSyncTimestamp } from "@/actions/sync";

const BRIDGE_SECRET = process.env.VELOCITY_BRIDGE_SECRET || "miyobi_secret_key_2026";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("x-velocity-secret");
    if (authHeader !== BRIDGE_SECRET) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { event, username, uuid, server, ipAddress } = body;

    if (!username || !event) {
      return NextResponse.json({ error: "Parámetros incompletos" }, { status: 400 });
    }

    const playerUuid = uuid || username;

    if (event === "JOIN" || event === "SWITCH") {
      await prisma.player.upsert({
        where: { username },
        update: {
          uuid: playerUuid,
          isOnline: true,
          currentServer: server || "Lobby",
          ipAddress: ipAddress || null,
          lastLogin: new Date(),
        },
        create: {
          username,
          uuid: playerUuid,
          isOnline: true,
          currentServer: server || "Lobby",
          ipAddress: ipAddress || null,
          firstJoin: new Date(),
          lastLogin: new Date(),
        },
      });
    } else if (event === "LEAVE") {
      await prisma.player.updateMany({
        where: { username },
        data: {
          isOnline: false,
          currentServer: "Desconectado",
        },
      });
    }

    await updateGlobalSyncTimestamp();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/velocity/player-event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
