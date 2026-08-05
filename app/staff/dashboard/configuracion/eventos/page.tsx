import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CalendarDays, Clock3, Flag, Plus, Star, ToggleLeft, Trash2, ArrowLeft, Edit3, Sparkles } from "lucide-react";
import {
  deleteEvent,
  toggleEventStatus,
} from "@/actions/events";

export const metadata = {
  title: "Gestión de Eventos | Miyobi Staff",
  description: "Administra los eventos públicos y anuncios del servidor.",
};

type EventType = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  date: Date;
  active: boolean;
  featured: boolean;
  discordUrl: string | null;
  rewards: string | null;
  publishAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
};

function getEventStatus(event: EventType) {
  const now = new Date();

  if (!event.active) {
    return {
      text: "Oculto",
      badge: "border-red-500/40 bg-red-500/10 text-red-300",
    };
  }

  if (event.publishAt && now < event.publishAt) {
    return {
      text: "Programado",
      badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    };
  }

  if (event.endAt && now > event.endAt) {
    return {
      text: "Finalizado",
      badge: "border-zinc-500/40 bg-zinc-500/10 text-zinc-400",
    };
  }

  return {
    text: "Activo",
    badge: "border-green-500/40 bg-green-500/10 text-green-400",
  };
}

export default async function EventsPage() {
  const events: EventType[] = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="text-white space-y-8">
      {/* Back Link */}
      <Link
        href="/staff/dashboard/configuracion"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver a Configuración
      </Link>

      {/* Main Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl transition duration-300 hover:border-pink-500/30">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
              Gestión de Anuncios
            </span>

            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Eventos Públicos
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Administra los eventos visibles en la página principal para toda la comunidad.
            </p>
          </div>

          <Link
            href="/staff/dashboard/configuracion/eventos/crear"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-105 shrink-0"
          >
            <Plus className="h-4 w-4" />
            Crear Nuevo Evento
          </Link>
        </div>

        {/* EVENTS LIST */}
        <div className="mt-8 space-y-6">
          {events.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-black/30 p-12 text-center text-zinc-400">
              <Sparkles className="mx-auto h-8 w-8 text-pink-400 opacity-60 mb-3" />
              <p className="text-base font-bold text-white">No hay eventos creados</p>
              <p className="text-xs mt-1">Haz clic en &quot;Crear Nuevo Evento&quot; para publicar el primero.</p>
            </div>
          ) : (
            events.map((event) => {
              const status = getEventStatus(event);

              return (
                <div
                  key={event.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col sm:flex-row gap-5 min-w-0">
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="h-28 w-full sm:w-44 rounded-2xl object-cover shrink-0 border border-white/10"
                        />
                      )}

                      <div className="min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg sm:text-xl font-bold text-white">
                            {event.title}
                          </h2>

                          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${status.badge}`}>
                            {status.text}
                          </span>

                          {event.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                              <Star className="h-3 w-3" /> Destacado
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-pink-400" />
                            {event.date.toLocaleDateString()}
                          </span>
                          {event.publishAt && (
                            <span className="flex items-center gap-1.5">
                              <Clock3 className="h-3.5 w-3.5 text-amber-400" />
                              Pub: {event.publishAt.toLocaleDateString()}
                            </span>
                          )}
                          {event.endAt && (
                            <span className="flex items-center gap-1.5">
                              <Flag className="h-3.5 w-3.5 text-zinc-500" />
                              Fin: {event.endAt.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0 border-t border-white/10 pt-4 md:border-t-0 md:pt-0">
                      <form action={toggleEventStatus}>
                        <input type="hidden" name="id" value={event.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 transition"
                        >
                          <ToggleLeft className="h-4 w-4" />
                          {event.active ? "Ocultar" : "Publicar"}
                        </button>
                      </form>

                      <Link
                        href={`/staff/dashboard/configuracion/eventos/${event.id}/editar`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-300 transition"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Editar
                      </Link>

                      <form action={deleteEvent}>
                        <input type="hidden" name="id" value={event.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}