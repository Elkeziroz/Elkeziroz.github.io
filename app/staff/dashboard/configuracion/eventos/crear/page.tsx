import { createEvent } from "@/actions/events";
import Link from "next/link";
import { CalendarDays, Flag, Gift, ImageIcon, Link2, Send, Sparkles, Star, Timer, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Crear Evento | Miyobi Staff",
  description: "Publicación de nuevo evento para la comunidad de Miyobi.",
};

export default function CreateEventPage() {
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
          Anuncios Públicos
        </span>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">
              Crear Nuevo Evento
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Publica eventos visibles en la página principal para motivar a la comunidad.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          action={createEvent}
          encType="multipart/form-data"
          className="mt-10 space-y-6 border-t border-white/10 pt-8"
        >
          {/* Título */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Título del Evento
            </label>
            <input
              name="title"
              required
              placeholder="Ej: Gran Torneo PvP Survival & KOTH"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Descripción del Evento
            </label>
            <textarea
              name="description"
              required
              placeholder="Describe las reglas, mapa y horario del evento..."
              className="mt-2 h-36 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
            />
          </div>

          {/* Dates Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Fecha Evento */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-pink-400" /> Fecha del Evento
              </label>
              <input
                name="date"
                required
                type="date"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            {/* Imagen upload */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-pink-400" /> Imagen Promocional
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-2.5 text-xs text-zinc-300 outline-none focus:border-pink-500 transition file:mr-4 file:rounded-xl file:border-0 file:bg-pink-500/20 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-pink-300"
              />
            </div>
          </div>

          {/* Destacado Checkbox */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-center gap-3">
            <input
              name="featured"
              type="checkbox"
              id="featured-check"
              className="h-5 w-5 rounded-lg accent-pink-500"
            />
            <label htmlFor="featured-check" className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2 cursor-pointer select-none">
              <Star className="h-4 w-4 text-amber-400" /> Destacar este evento en la página principal con insignia dorada.
            </label>
          </div>

          {/* Discord & Recompensas Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Link2 className="h-4 w-4 text-pink-400" /> Enlace de Discord
              </label>
              <input
                name="discordUrl"
                placeholder="https://discord.gg/PNAHW9yHZu"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Gift className="h-4 w-4 text-pink-400" /> Recompensas y Premios
              </label>
              <textarea
                name="rewards"
                placeholder="🥇 1º Lugar: Rango VIP + 1000 Monedas&#10;🥈 2º Lugar: 500 Monedas"
                className="mt-2 h-24 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 transition"
              />
            </div>
          </div>

          {/* Programación Automática Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Timer className="h-4 w-4 text-pink-400" /> Publicación Automática (Opcional)
              </label>
              <input
                name="publishAt"
                type="datetime-local"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <Flag className="h-4 w-4 text-pink-400" /> Finalización del Evento (Opcional)
              </label>
              <input
                name="endAt"
                type="datetime-local"
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
              <Send className="h-4 w-4" />
              Crear y Publicar Evento
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}