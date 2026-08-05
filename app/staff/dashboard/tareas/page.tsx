import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { isStaffMember, getDiscordStaffMembersList } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { prisma } from "@/lib/prisma";
import { updateTaskStatus, deleteStaffTask } from "@/actions/tasks";
import CreateTaskModal from "./CreateTaskModal";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Trash2,
  UserCheck,
  Calendar,
  Sparkles,
  ArrowLeft,
  Filter,
  Check
} from "lucide-react";

export const metadata = {
  title: "Tareas del Staff | Miyobi Staff",
  description: "Asignación y seguimiento de tareas internas para el equipo de Staff de Miyobi.",
};

const PRIORITY_BADGES: Record<string, { label: string; bg: string }> = {
  LOW: { label: "Baja", bg: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400" },
  NORMAL: { label: "Normal", bg: "border-blue-500/30 bg-blue-500/10 text-blue-300" },
  HIGH: { label: "Alta", bg: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
  URGENT: { label: "🚨 Urgente", bg: "border-red-500/40 bg-red-500/15 text-red-300 animate-pulse" },
};

const STATUS_BADGES: Record<string, { label: string; bg: string }> = {
  PENDING: { label: "Pendiente", bg: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
  IN_PROGRESS: { label: "En Proceso", bg: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300" },
  COMPLETED: { label: "Completada ✓", bg: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
};

import { checkStaffPermission } from "@/lib/permissions";

export default async function TareasPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/staff");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    redirect("/staff/access-denied");
  }

  const staffRole = await getStaffRole(session.user.discordId);
  const canManageTasks = staffRole ? await checkStaffPermission(staffRole.level, "can_manage_tasks") : false;

  if (!canManageTasks) {
    redirect("/staff/dashboard");
  }

  // Fetch all tasks & live Discord Staff list
  const [tasks, staffMembers] = await Promise.all([
    prisma.staffTask.findMany({
      orderBy: { createdAt: "desc" },
    }),
    getDiscordStaffMembersList(),
  ]);

  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const inProgressCount = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <main className="text-white space-y-8 max-w-6xl mx-auto pb-16">
      {/* Back Link */}
      <Link
        href="/staff/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver al Dashboard
      </Link>

      {/* Header Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-500/10">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-pink-400">
                Organización de Equipo
              </span>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Tareas Asignadas al Staff
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Asigna tareas individuales a los miembros de Discord y monitorea su progreso.
              </p>
            </div>
          </div>

          <CreateTaskModal staffMembers={staffMembers} />
        </div>

        {/* METRICS COUNTERS GRID */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl space-y-1">
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Total Tareas</p>
            <p className="text-3xl font-black text-white">{tasks.length}</p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 backdrop-blur-xl space-y-1">
            <p className="text-xs text-amber-300 uppercase tracking-wider font-bold">Pendientes</p>
            <p className="text-3xl font-black text-amber-400">{pendingCount}</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 backdrop-blur-xl space-y-1">
            <p className="text-xs text-cyan-300 uppercase tracking-wider font-bold">En Proceso</p>
            <p className="text-3xl font-black text-cyan-400">{inProgressCount}</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-xl space-y-1">
            <p className="text-xs text-emerald-300 uppercase tracking-wider font-bold">Completadas</p>
            <p className="text-3xl font-black text-emerald-400">{completedCount}</p>
          </div>
        </div>

        {/* TASKS LIST */}
        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 px-2">
              Lista de Tareas ({tasks.length})
            </h2>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 space-y-3">
              <Sparkles className="mx-auto h-10 w-10 text-pink-400" />
              <h3 className="text-lg font-bold text-white">No hay tareas creadas todavía</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Utiliza el botón superior &quot;Asignar Tarea a Staff&quot; para enviar instrucciones a un usuario de Discord.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {tasks.map((task) => {
                const priorityInfo = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.NORMAL;
                const statusInfo = STATUS_BADGES[task.status] || STATUS_BADGES.PENDING;

                return (
                  <div
                    key={task.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition duration-300 hover:border-pink-500/40 space-y-6"
                  >
                    <div className="space-y-4">
                      {/* ASSIGNEE HEADER */}
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          {task.assignedToAvatar ? (
                            <Image
                              src={task.assignedToAvatar}
                              alt={task.assignedTo}
                              width={44}
                              height={44}
                              className="rounded-2xl border border-pink-500/30 object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
                              {task.assignedTo.slice(0, 2).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white text-sm">{task.assignedTo}</h3>
                              {task.assignedToRole && (
                                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-pink-300">
                                  {task.assignedToRole}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-400 mt-0.5">
                              Asignado por <span className="text-zinc-300 font-semibold">{task.assignedBy}</span>
                            </p>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <form action={deleteStaffTask}>
                          <input type="hidden" name="taskId" value={task.id} />
                          <button
                            type="submit"
                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition"
                            title="Eliminar tarea"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>

                      {/* TASK CONTENT */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${priorityInfo.bg}`}>
                            {priorityInfo.label}
                          </span>
                          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${statusInfo.bg}`}>
                            {statusInfo.label}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white leading-snug">{task.title}</h4>
                        <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-light whitespace-pre-wrap">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    {/* STATUS UPDATER BAR */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Calendar size={12} /> {task.createdAt.toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-2">
                        <form action={updateTaskStatus}>
                          <input type="hidden" name="taskId" value={task.id} />
                          <input type="hidden" name="status" value="PENDING" />
                          <button
                            type="submit"
                            className={`rounded-xl px-2.5 py-1 text-[10px] font-bold border transition ${
                              task.status === "PENDING"
                                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                            }`}
                          >
                            Pendiente
                          </button>
                        </form>

                        <form action={updateTaskStatus}>
                          <input type="hidden" name="taskId" value={task.id} />
                          <input type="hidden" name="status" value="IN_PROGRESS" />
                          <button
                            type="submit"
                            className={`rounded-xl px-2.5 py-1 text-[10px] font-bold border transition ${
                              task.status === "IN_PROGRESS"
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                                : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                            }`}
                          >
                            En Proceso
                          </button>
                        </form>

                        <form action={updateTaskStatus}>
                          <input type="hidden" name="taskId" value={task.id} />
                          <input type="hidden" name="status" value="COMPLETED" />
                          <button
                            type="submit"
                            className={`rounded-xl px-2.5 py-1 text-[10px] font-bold border transition ${
                              task.status === "COMPLETED"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
                            }`}
                          >
                            Completada
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
