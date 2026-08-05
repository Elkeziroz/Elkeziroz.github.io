"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getStaffRole } from "@/lib/discordRoles";
import { updateGlobalSyncTimestamp } from "@/actions/sync";

export async function createStaffNotice(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const title = formData.get("title")?.toString();
  const message = formData.get("message")?.toString();

  if (!title || !message) {
    return;
  }

  const staffRole = await getStaffRole(session.user.discordId);

  // Solo Admin y Owner pueden crear avisos
  if (!staffRole || staffRole.level < 90) {
    return;
  }

  await prisma.staffNotice.create({
    data: {
      title,
      message,
      author: session.user.name ?? "Staff",
      authorId: session.user.discordId ?? "",
      authorImage: session.user.image ?? null,
      authorRole: staffRole.name,
    },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
  redirect("/staff/dashboard");
}

export async function deleteStaffNotice(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const staffRole = await getStaffRole(session.user.discordId);

  // Solo Admin y Owner
  if (!staffRole || staffRole.level < 90) {
    return;
  }

  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  const notice = await prisma.staffNotice.findUnique({
    where: {
      id,
    },
  });

  if (!notice) {
    return;
  }

  await prisma.staffNotice.delete({
    where: {
      id,
    },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
}

export async function toggleNoticeReaction(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const noticeId = formData.get("noticeId")?.toString();
  const type = formData.get("type")?.toString();

  if (!noticeId || !type) {
    return;
  }

  const allowedReactions = [
    "LIKE",
    "LOVE",
    "HAHA",
    "WOW",
    "SAD",
    "DISLIKE",
  ];

  if (!allowedReactions.includes(type)) {
    return;
  }

  const userId = session.user.discordId;

  const existingReaction = await prisma.noticeReaction.findFirst({
    where: {
      noticeId,
      userId,
    },
  });

  if (existingReaction && existingReaction.type === type) {
    await prisma.noticeReaction.delete({
      where: {
        id: existingReaction.id,
      },
    });
  } else if (existingReaction) {
    await prisma.noticeReaction.update({
      where: {
        id: existingReaction.id,
      },
      data: {
        type,
      },
    });
  } else {
    await prisma.noticeReaction.create({
      data: {
        type,
        userId,
        noticeId,
      },
    });
  }

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
}