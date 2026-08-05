"use server";

import { auth } from "@/auth";
import { isStaffMember } from "@/lib/discord";
import { prisma } from "@/lib/prisma";
import { updateGlobalSyncTimestamp } from "@/actions/sync";
import { revalidatePath } from "next/cache";

export async function submitStaffApplication(formData: FormData) {
  const minecraftName = formData.get("minecraftName") as string;
  const discordTag = formData.get("discordTag") as string;
  const discordId = (formData.get("discordId") as string) || null;
  const email = (formData.get("email") as string) || null;
  const ageStr = formData.get("age") as string;
  const country = formData.get("country") as string;
  const roleApplying = formData.get("roleApplying") as string;
  const hoursPerDay = formData.get("hoursPerDay") as string;

  if (
    !minecraftName ||
    !discordTag ||
    !ageStr ||
    !country ||
    !roleApplying
  ) {
    throw new Error("Todos los campos requeridos deben ser completados.");
  }

  const age = parseInt(ageStr, 10);
  if (isNaN(age) || age < 12 || age > 99) {
    throw new Error("Por favor introduce una edad válida.");
  }

  // Collect all dynamic answers
  const dynamicAnswers: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("dyn_") && typeof value === "string") {
      const questionLabel = key.replace("dyn_", "");
      dynamicAnswers[questionLabel] = value.trim();
    }
  }

  // Backward compatibility fallback fields
  const experience = (formData.get("experience") as string) || dynamicAnswers["Experiencia Previa en Staff (Opcional)"] || "Ninguna";
  const whyJoin = (formData.get("whyJoin") as string) || dynamicAnswers["¿Por qué te gustaría formar parte del equipo de Miyobi? *"] || "Ver respuestas dinámicas";
  const scenarioAns = (formData.get("scenarioAns") as string) || dynamicAnswers["Situación: ¿Cómo actuarías si ves a un jugador usando hacks o tóxico? *"] || "Sin respuesta";

  await prisma.staffApplication.create({
    data: {
      minecraftName: minecraftName.trim(),
      discordTag: discordTag.trim(),
      discordId: discordId ? discordId.trim() : null,
      email: email ? email.trim() : null,
      age,
      country: country.trim(),
      roleApplying: roleApplying.trim(),
      experience: experience.trim(),
      hoursPerDay: (hoursPerDay || "1-2 horas").trim(),
      whyJoin: whyJoin.trim(),
      scenarioAns: scenarioAns.trim(),
      answersJson: JSON.stringify(dynamicAnswers),
    },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard/solicitudes");
  revalidatePath("/postulaciones");
  return { success: true };
}

export async function updateApplicationStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user?.discordId) throw new Error("No autorizado");

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) throw new Error("Sin permisos");

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  if (!id || !status) return;

  await prisma.staffApplication.update({
    where: { id },
    data: { status },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard/solicitudes");
}

export async function deleteApplication(formData: FormData) {
  const session = await auth();
  if (!session?.user?.discordId) throw new Error("No autorizado");

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) throw new Error("Sin permisos");

  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.staffApplication.delete({
    where: { id },
  });

  await updateGlobalSyncTimestamp();

  revalidatePath("/staff/dashboard/solicitudes");
}
