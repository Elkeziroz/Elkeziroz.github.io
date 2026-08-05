import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { checkStaffPermission } from "@/lib/permissions";
import { signOutAction } from "@/actions";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ShieldCheck, LogOut } from "lucide-react";

import StaffNotices from "./components/StaffNotices";
import StaffTasks from "./components/StaffTasks";

export const metadata = {
  title: "Panel Staff | Miyobi",
  description: "Panel de control y avisos privados para el equipo de Staff de Miyobi.",
};

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/staff");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    redirect("/staff/access-denied");
  }

  const staffRole = await getStaffRole(session.user.discordId);

  const notices = await prisma.staffNotice.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      reactions: true,
      comments: true,
    },
  }).catch((err) => {
    console.error("Error fetching staff notices:", err?.message || err);
    return [];
  });

  const canManageTasks = staffRole ? await checkStaffPermission(staffRole.level, "can_manage_tasks") : false;

  return (
    <main className="min-h-screen bg-transparent text-white space-y-8">
      {/* HEADER CARD */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-8 shadow-2xl backdrop-blur-3xl transition duration-300 hover:border-pink-500/30">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Avatar Discord"
                width={80}
                height={80}
                className="rounded-full border-2 border-pink-500/40 shadow-lg shadow-pink-500/20"
              />
            )}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-pink-300">
                <ShieldCheck size={14} /> Miyobi Staff Panel
              </span>
              <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Bienvenido, {session.user.name}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Rango Asignado: <span className="font-bold text-pink-300">{staffRole?.name ?? "Staff"}</span>
              </p>
            </div>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-zinc-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 transition"
            >
              <LogOut size={14} /> Cerrar Sesión
            </button>
          </form>
        </div>

        {/* QUICK METRICS BAR */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Avisos Recientes</p>
            <p className="mt-1 text-xl font-bold text-pink-300">{notices.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Estado Servidor</p>
            <p className="mt-1 text-xl font-bold text-green-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
              Operativo
            </p>
          </div>
        </div>
      </section>

      {/* DASHBOARD CONTENT GRID */}
      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.75fr]">
        <StaffNotices
          notices={notices}
          userId={session.user.discordId}
          canDelete={staffRole ? staffRole.level >= 90 : false}
        />

        <StaffTasks
          username={session.user.name}
          isOwnerOrAdmin={canManageTasks}
        />
      </div>
    </main>
  );
}
