import { prisma } from "@/lib/prisma";
import { updateTaskStatus } from "@/actions/tasks";
import Image from "next/image";
import Link from "next/link";
import { ClipboardList, CheckCircle2, Clock, Sparkles, ArrowRight, Check } from "lucide-react";

const PRIORITY_BADGES: Record<string, { label: string; bg: string }> = {
  LOW: { label: "Baja", bg: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400" },
  NORMAL: { label: "Normal", bg: "border-blue-500/30 bg-blue-500/10 text-blue-300" },
  HIGH: { label: "Alta", bg: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
  URGENT: { label: "🚨 Urgente", bg: "border-red-500/40 bg-red-500/15 text-red-300 animate-pulse" },
};

export default async function StaffTasks({
  username,
  isOwnerOrAdmin = false,
}: {
  username?: string | null;
  isOwnerOrAdmin?: boolean;
}) {
  // Fetch tasks assigned to current user, or top 6 tasks if admin
  const tasks = await prisma.staffTask.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  // Filter tasks relevant to this user if not owner/admin, or show all
  const userTasks = username
    ? tasks.filter((t) => t.assignedTo.toLowerCase().includes(username.toLowerCase()) || isOwnerOrAdmin)
    : tasks;

  const activeTasks = userTasks.filter((t) => t.status !== "COMPLETED");

  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-500/10">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Tareas Asignadas</h2>
              <p className="text-xs text-zinc-400">Instrucciones y pendientes del equipo de Staff.</p>
            </div>
          </div>

          {activeTasks.length > 0 && (
            <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-bold text-pink-300">
              {activeTasks.length} Pendientes
            </span>
          )}
        </div>

        {/* TASKS LIST */}
        {userTasks.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-black/30 p-8 text-center space-y-3">
            <Sparkles className="mx-auto h-8 w-8 text-pink-400" />
            <p className="text-sm font-bold text-white">¡No tienes tareas pendientes!</p>
            <p className="text-xs text-zinc-400">
              Cuando un administrador te asigne una instrucción, aparecerá listada en esta sección.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userTasks.map((task) => {
              const priorityInfo = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.NORMAL;
              const isCompleted = task.status === "COMPLETED";

              return (
                <div
                  key={task.id}
                  className={`rounded-2xl border p-4 backdrop-blur-xl transition duration-200 space-y-3 ${
                    isCompleted
                      ? "border-white/5 bg-black/20 opacity-60"
                      : "border-white/10 bg-black/40 hover:border-pink-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {task.assignedToAvatar ? (
                        <Image
                          src={task.assignedToAvatar}
                          alt={task.assignedTo}
                          width={36}
                          height={36}
                          className="rounded-xl border border-pink-500/30 object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300 font-bold text-xs">
                          {task.assignedTo.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-white">{task.assignedTo}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${priorityInfo.bg}`}>
                            {priorityInfo.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400">
                          Asignado por: <span className="text-pink-300 font-semibold">{task.assignedBy}</span>
                        </p>
                      </div>
                    </div>

                    {/* STATUS ACTION */}
                    <form action={updateTaskStatus}>
                      <input type="hidden" name="taskId" value={task.id} />
                      <input
                        type="hidden"
                        name="status"
                        value={isCompleted ? "PENDING" : "COMPLETED"}
                      />
                      <button
                        type="submit"
                        className={`flex h-8 w-8 items-center justify-center rounded-xl border transition ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-white/5 text-zinc-400 border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300"
                        }`}
                        title={isCompleted ? "Marcar como pendiente" : "Marcar como completada"}
                      >
                        <Check size={16} />
                      </button>
                    </form>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white">{task.title}</h3>
                    <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER LINK TO FULL TASKS PAGE (ONLY FOR ADMIN/OWNER) */}
      {isOwnerOrAdmin && (
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/staff/dashboard/tareas"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-pink-300 hover:border-pink-500/40 hover:bg-white/10 transition"
          >
            <span>Gestión Completa de Tareas</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}