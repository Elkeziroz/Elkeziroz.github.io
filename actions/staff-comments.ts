"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { getStaffRole } from "@/lib/discordRoles";
import { updateGlobalSyncTimestamp } from "@/actions/sync";

export async function createNoticeComment(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const noticeId = formData.get("noticeId")?.toString();
  const message = formData.get("message")?.toString();

  if (!noticeId || !message) {
    return;
  }

  await prisma.noticeComment.create({
    data: {
      noticeId,
      message,
      userId: session.user.discordId ?? "",
      author: session.user.name ?? "Staff",
      authorImage: session.user.image ?? null,
      authorRole: "Staff",
    },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
}

export async function deleteNoticeComment(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    return;
  }

  const commentId = formData.get("commentId")?.toString();

  if (!commentId) {
    return;
  }

  const comment = await prisma.noticeComment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    return;
  }

  const staffRole = await getStaffRole(session.user.discordId);

  const isOwner = comment.userId === session.user.discordId;
  const isAdmin = staffRole && staffRole.level >= 90;

  // Solo el creador o Admin/Owner puede borrar
  if (!isOwner && !isAdmin) {
    return;
  }

  await prisma.noticeComment.delete({
    where: {
      id: commentId,
    },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
}