import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isStaffMember } from "@/lib/discord";
import { updateApplicationStatus, deleteApplication } from "@/actions/postulaciones";
import Image from "next/image";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Trash2,
  Clock,
  CalendarDays,
  User,
  ShieldCheck,
  Disc as DiscordIcon,
  Mail,
  Globe,
  Sparkles,
  MessageSquare,
  Scale
} from "lucide-react";

export const metadata = {
  title: "Solicitudes de Staff | Miyobi Staff",
  description: "Panel de gestión y evaluación visual de postulaciones recibidas.",
};

export default async function SolicitudesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/staff");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    redirect("/staff/access-denied");
  }

  const applications = await prisma.staffApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pendingCount = applications.filter((a) => a.status === "PENDING").length;
  const acceptedCount = applications.filter((a) => a.status === "ACCEPTED").length;
  const rejectedCount = applications.filter((a) => a.status === "REJECTED").length;

  return (
    <main className="text-white space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl transition duration-300 hover:border-pink-500/30">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-500/10">
              <ClipboardList className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-pink-400">
                Administración & Reclutamiento
              </span>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Postulaciones al Staff ({applications.length})
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Revisa detalladamente cada solicitud recibida con verificación de Discord.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center">
              <p className="text-xs font-bold text-amber-400">Pendientes</p>
              <p className="text-xl font-black text-white">{pendingCount}</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-center">
              <p className="text-xs font-bold text-emerald-400">Aceptadas</p>
              <p className="text-xl font-black text-white">{acceptedCount}</p>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-center">
              <p className="text-xs font-bold text-red-400">Rechazadas</p>
              <p className="text-xl font-black text-white">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATIONS CARDS LIST */}
      <div className="space-y-6">
        {applications.length === 0 ? (
          <div className="rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-16 text-center space-y-3">
            <ClipboardList className="mx-auto h-12 w-12 text-zinc-600" />
            <h3 className="text-xl font-bold text-white">No hay postulaciones registradas</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Las nuevas postulaciones enviadas por los usuarios desde la web aparecerán aquí en tiempo real.
            </p>
          </div>
        ) : (
          applications.map((app) => {
            const statusConfig =
              app.status === "ACCEPTED"
                ? {
                    badge: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
                    glow: "hover:border-emerald-500/40 shadow-emerald-500/5",
                    text: "Aceptada ✓",
                  }
                : app.status === "REJECTED"
                ? {
                    badge: "border-red-500/40 bg-red-500/15 text-red-300",
                    glow: "hover:border-red-500/40 shadow-red-500/5",
                    text: "Rechazada ✗",
                  }
                : {
                    badge: "border-amber-500/40 bg-amber-500/15 text-amber-300 animate-pulse",
                    glow: "hover:border-pink-500/40 shadow-pink-500/5",
                    text: "Pendiente de Revisión",
                  };

            const mcAvatarUrl = `https://crafatar.com/avatars/${encodeURIComponent(app.minecraftName)}?size=64&default=MHR&overlay=true`;

            return (
              <div
                key={app.id}
                className={`relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-6 sm:p-8 backdrop-blur-3xl shadow-2xl transition duration-300 ${statusConfig.glow} space-y-6`}
              >
                {/* TOP HEADER: MINECRAFT HEAD & DISCORD TAG & STATUS */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    {/* Minecraft Head Avatar */}
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-pink-500/40 bg-black/60 shadow-lg shadow-pink-500/10">
                      <Image
                        src={mcAvatarUrl}
                        alt={app.minecraftName}
                        width={56}
                        height={56}
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-2xl font-black text-white tracking-wide">
                          {app.minecraftName}
                        </h2>
                        <span className={`rounded-full border px-3 py-0.5 text-xs font-bold ${statusConfig.badge}`}>
                          {statusConfig.text}
                        </span>
                        <span className="rounded-full border border-pink-500/30 bg-pink-500/15 px-3 py-0.5 text-xs font-bold text-pink-300">
                          {app.roleApplying}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-zinc-400 flex items-center gap-2">
                        <span>Aspirante a Staff</span>
                        <span>•</span>
                        <span className="text-zinc-500">ID: {app.id.slice(0, 10)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-500 shrink-0 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <CalendarDays size={14} className="text-pink-400" />
                    {app.createdAt.toLocaleDateString()} a las {app.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* VERIFIED CONTACT CARDS GRID */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Discord Account */}
                  <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 space-y-1">
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      <DiscordIcon size={14} /> Account Discord
                    </div>
                    <p className="text-sm font-mono font-bold text-white truncate">{app.discordTag}</p>
                    {app.discordId && (
                      <p className="text-[10px] text-indigo-300/70 font-mono">ID: {app.discordId}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 space-y-1">
                    <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      <Mail size={14} /> Correo Verificado
                    </div>
                    <p className="text-sm font-mono font-bold text-white truncate">{app.email || "No registrado"}</p>
                  </div>

                  {/* Age & Country */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-1">
                    <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                      <Globe size={14} className="text-pink-400" /> Edad & Ubicación
                    </div>
                    <p className="text-sm font-bold text-white">{app.age} años • {app.country}</p>
                  </div>

                  {/* Daily Availability */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-1">
                    <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                      <Clock size={14} className="text-amber-400" /> Disponibilidad
                    </div>
                    <p className="text-sm font-bold text-white">{app.hoursPerDay}</p>
                  </div>
                </div>

                {/* ESSAY & DYNAMIC ANSWERS SECTION */}
                <div className="space-y-4 pt-2">
                  {(() => {
                    let parsedAnswers: Record<string, string> | null = null;
                    if (app.answersJson) {
                      try {
                        parsedAnswers = JSON.parse(app.answersJson);
                      } catch (e) {
                        parsedAnswers = null;
                      }
                    }

                    if (parsedAnswers && Object.keys(parsedAnswers).length > 0) {
                      return Object.entries(parsedAnswers).map(([label, ans]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400">
                            <Sparkles size={14} /> {label}
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light whitespace-pre-wrap">
                            {ans || "Sin respuesta"}
                          </p>
                        </div>
                      ));
                    }

                    return (
                      <>
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400">
                            <Sparkles size={14} /> Experiencia Previa en Staff
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {app.experience}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400">
                            <MessageSquare size={14} /> ¿Por qué le gustaría formar parte de Miyobi?
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                            &quot;{app.whyJoin}&quot;
                          </p>
                        </div>

                        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-300">
                            <Scale size={14} /> Situación Hipotética de Moderación
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-light">
                            {app.scenarioAns}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* ACTION BUTTONS BAR */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-zinc-500 italic">
                    Gestionado por el equipo de administración de Miyobi
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <form action={updateApplicationStatus}>
                      <input type="hidden" name="id" value={app.id} />
                      <input type="hidden" name="status" value="ACCEPTED" />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-xs font-bold text-emerald-300 transition duration-200 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                      >
                        <CheckCircle2 size={16} /> Aceptar Postulación
                      </button>
                    </form>

                    <form action={updateApplicationStatus}>
                      <input type="hidden" name="id" value={app.id} />
                      <input type="hidden" name="status" value="REJECTED" />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 text-xs font-bold text-amber-300 transition duration-200 hover:bg-amber-500 hover:text-white hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
                      >
                        <XCircle size={16} /> Rechazar Postulación
                      </button>
                    </form>

                    <form action={deleteApplication}>
                      <input type="hidden" name="id" value={app.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300 transition duration-200 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
                      >
                        <Trash2 size={16} /> Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
