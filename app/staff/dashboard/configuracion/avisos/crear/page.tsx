import { createStaffNotice } from "@/actions/staff-notices";
import Link from "next/link";
import { Bell, User as UserIcon, Send, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Crear Aviso Staff | Miyobi",
  description: "Publicación de comunicados internos para el equipo administrativo.",
};

export default function CreateNoticePage() {
  return (
    <main className="text-white space-y-8 max-w-4xl mx-auto">
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

        <span className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
          Comunicados Internos
        </span>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">
              Crear Aviso Staff
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Publica un comunicado oficial que aparecerá en el panel de todos los miembros del equipo.
            </p>
          </div>
        </div>

        {/* Form */}
        <form action={createStaffNotice} className="mt-10 space-y-6 border-t border-white/10 pt-8">
          {/* Título */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Título del Aviso
            </label>
            <input
              name="title"
              required
              placeholder="Ej: Mantenimiento del servidor el Viernes a las 18:00"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Contenido del Comunicado
            </label>
            <textarea
              name="message"
              required
              placeholder="Escribe los detalles completos del comunicado o instrucciones..."
              className="mt-2 h-44 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
            />
          </div>

          {/* Author Badge Info */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white">Publicación Automática</p>
              <p className="text-zinc-400">
                Se registrará con tu nombre de usuario y tu rango de Discord verificado.
              </p>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)] active:scale-95"
            >
              <Send className="h-4 w-4" />
              Publicar Comunicado
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}