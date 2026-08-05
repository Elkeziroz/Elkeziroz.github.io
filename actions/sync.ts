"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateGlobalSyncTimestamp() {
  const now = Date.now().toString();
  try {
    await prisma.siteSetting.upsert({
      where: { key: "last_global_update_timestamp" },
      update: { value: now },
      create: { key: "last_global_update_timestamp", value: now },
    });
  } catch (e) {
    console.error("Error updating global sync timestamp:", e);
  }

  // Invalidate layout cache globally across all pages
  revalidatePath("/", "layout");
}

export async function getGlobalSyncTimestamp(): Promise<number> {
  try {
    const item = await prisma.siteSetting.findUnique({
      where: { key: "last_global_update_timestamp" },
    });
    return item?.value ? parseInt(item.value, 10) : 0;
  } catch (e) {
    return 0;
  }
}
