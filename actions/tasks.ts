"use server";

import { auth } from "@/auth";
import { isStaffMember } from "@/lib/discord";
import { prisma } from "@/lib/prisma";
import { updateGlobalSyncTimestamp } from "@/actions/sync";
import { revalidatePath } from "next/cache";

export async function createStaffTask(formData: FormData) {
  const session = await auth();
  if (!session?.user?.discordId) throw new Error("No autorizado");

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) throw new Error("Sin permisos de Staff");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const assignedToData = formData.get("assignedToData") as string; // Format: "Username|Avatar|RoleName"
  const priority = (formData.get("priority") as string) || "NORMAL";

  if (!title || !description || !assignedToData) {
    throw new Error("Por favor completa el título, descripción y asignado.");
  }

  const [assignedTo, assignedToAvatar, assignedToRole] = assignedToData.split("|");

  await prisma.staffTask.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      assignedTo: assignedTo.trim(),
      assignedToAvatar: assignedToAvatar?.trim() || null,
      assignedToRole: assignedToRole?.trim() || null,
      assignedBy: session.user.name || "Administrador",
      priority,
      status: "PENDING",
    },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
  revalidatePath("/staff/dashboard/tareas");
  return { success: true };
}

export async function updateTaskStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user?.discordId) throw new Error("No autorizado");

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) throw new Error("Sin permisos de Staff");

  const taskId = formData.get("taskId") as string;
  const status = formData.get("status") as string;

  if (!taskId || !status) return;

  await prisma.staffTask.update({
    where: { id: taskId },
    data: { status },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
  revalidatePath("/staff/dashboard/tareas");
}

export async function deleteStaffTask(formData: FormData) {
  const session = await auth();
  if (!session?.user?.discordId) throw new Error("No autorizado");

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) throw new Error("Sin permisos de Staff");

  const taskId = formData.get("taskId") as string;
  if (!taskId) return;

  await prisma.staffTask.delete({
    where: { id: taskId },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard");
  revalidatePath("/staff/dashboard/tareas");
}
