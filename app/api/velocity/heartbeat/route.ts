import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateGlobalSyncTimestamp } from "@/actions/sync";

const BRIDGE_SECRET = process.env.VELOCITY_BRIDGE_SECRET || "miyobi_secret_key_2026";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("x-velocity-secret");
    if (authHeader !== BRIDGE_SECRET) {
      return NextResponse.json({ error: "No autorizado (Secret Key inválida)" }, { status: 401 });
    }

    const body = await req.json();
    const { serverKey, name, playerCount, maxPlayers, ramUsage, isOnline } = body;

    if (!serverKey) {
      return NextResponse.json({ error: "Falta serverKey" }, { status: 400 });
    }

    await prisma.serverHeartbeat.upsert({
      where: { serverKey },
      update: {
        name: name || "Velocity Proxy",
        playerCount: playerCount ?? 0,
        maxPlayers: maxPlayers ?? 500,
        ramUsage: ramUsage || null,
        isOnline: isOnline ?? true,
      },
      create: {
        serverKey,
        name: name || "Velocity Proxy",
        playerCount: playerCount ?? 0,
        maxPlayers: maxPlayers ?? 500,
        ramUsage: ramUsage || null,
        isOnline: isOnline ?? true,
      },
    });

    await updateGlobalSyncTimestamp();

    return NextResponse.json({ success: true, timestamp: Date.now() });
  } catch (error) {
    console.error("Error in /api/velocity/heartbeat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
