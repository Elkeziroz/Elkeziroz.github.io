import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Edit3, Star, Link2, Gift, Timer, Flag, ArrowLeft, Save, CalendarDays } from "lucide-react";
import { updateEvent } from "@/actions/events";

export const metadata = {
  title: "Editar Evento | Miyobi Staff",
  description: "Modificación de datos del evento público.",
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="text-white space-y-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/staff/dashboard/configuracion/eventos"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver a Lista de Eventos
      </Link>

      {/* Main Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl transition duration-300 hover:border-pink-500/30">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <span className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
          Modificación de Anuncio
        </span>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Edit3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">
              Editar Evento: {event.title}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Modifica las fechas, descripción, recompensas y opciones del evento.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form action={updateEvent} className="mt-10 space-y-6 border-t border-white/10 pt-8">
          <input type="hidden" name="id" value={event.id} />

          {/* Título */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Título del Evento
            </label>
            <input
              name="title"
              defaultValue={event.title}
              required
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Descripción
            </label>
            <textarea
              name="description"
              defaultValue={event.description}
              required
              className="mt-2 h-36 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
            />
          </div>

          {/* Date & Preview */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-pink-400" /> Fecha del Evento
              </label>
              <input
                name="date"
                type="date"
                defaultValue={event.date.toISOString().split("T")[0]}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            {event.image && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Imagen Promocional Actual
                </p>
                <img
                  src={event.image}
                  alt={event.title}
                  className="mt-2 h-24 w-full rounded-2xl object-cover border border-white/10"
                />
              </div>
            )}
          </div>

          {/* Destacado */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-center gap-3">
            <input
              name="featured"
              type="checkbox"
              id="edit-featured"
              defaultChecked={event.featured}
              className="h-5 w-5 rounded-lg accent-pink-500"
            />
            <label htmlFor="edit-featured" className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2 cursor-pointer select-none">
              <Star className="h-4 w-4 text-amber-400" /> Evento destacado en página principal
            </label>
          </div>

          {/* Discord & Recompensas */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Link2 className="h-4 w-4 text-pink-400" /> Enlace de Discord
              </label>
              <input
                name="discordUrl"
                defaultValue={event.discordUrl ?? ""}
                placeholder="https://discord.gg/PNAHW9yHZu"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Gift className="h-4 w-4 text-pink-400" /> Recompensas
              </label>
              <textarea
                name="rewards"
                defaultValue={event.rewards ?? ""}
                placeholder="🥇 Primer lugar: Rango VIP"
                className="mt-2 h-24 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>
          </div>

          {/* Programación Automática Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Timer className="h-4 w-4 text-pink-400" /> Publicación Automática
              </label>
              <input
                name="publishAt"
                type="datetime-local"
                defaultValue={event.publishAt ? event.publishAt.toISOString().slice(0, 16) : ""}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Flag className="h-4 w-4 text-pink-400" /> Finalización del Evento
              </label>
              <input
                name="endAt"
                type="datetime-local"
                defaultValue={event.endAt ? event.endAt.toISOString().slice(0, 16) : ""}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white outline-none focus:border-pink-500 transition"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)] active:scale-95"
            >
              <Save className="h-4 w-4" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}