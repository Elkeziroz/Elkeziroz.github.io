"use server";

import { prisma } from "@/lib/prisma";

export async function createPunishment(data: {
  username: string;
  type: string;
  reason: string;
  duration: string;
}) {

  const player = await prisma.player.findUnique({
    where: {
      username: data.username,
    },
  });


  if (!player) {
    throw new Error("Jugador no encontrado");
  }



  await prisma.punishment.create({
    data: {
      type: data.type,
      reason: data.reason,
      duration: data.duration,
      staff: "Administrador",

      playerId: player.id,
    },
  });

}