import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateGlobalSyncTimestamp } from "@/actions/sync";

const BRIDGE_SECRET = process.env.VELOCITY_BRIDGE_SECRET || "miyobi_secret_key_2026";

// GET: Velocity queries pending sanctions to execute in game
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("x-velocity-secret");
    if (authHeader !== BRIDGE_SECRET) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const pendingSanctions = await prisma.sanctionQueue.findMany({
      where: { executed: false },
      orderBy: { createdAt: "asc" },
      take: 20,
    });

    return NextResponse.json({ pending: pendingSanctions });
  } catch (error) {
    console.error("Error fetching pending sanctions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Velocity confirms execution of sanction
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("x-velocity-secret");
    if (authHeader !== BRIDGE_SECRET) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta ID de sanción" }, { status: 400 });
    }

    const item = await prisma.sanctionQueue.update({
      where: { id },
      data: { executed: true },
    });

    // Also record in Punishment table if player exists
    const player = await prisma.player.findUnique({
      where: { username: item.username },
    });

    if (player) {
      await prisma.punishment.create({
        data: {
          playerId: player.id,
          type: item.type,
          reason: item.reason,
          duration: item.duration || "permanente",
          staff: item.issuedBy,
          active: true,
        },
      });
    }

    await updateGlobalSyncTimestamp();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error confirming sanction execution:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
