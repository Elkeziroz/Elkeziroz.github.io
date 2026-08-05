import { getSiteSettings } from "@/lib/settings";
import { updateWebSettings } from "@/actions/settings";
import Link from "next/link";
import WebSettingsNav from "../components/WebSettingsNav";
import QuestionBuilderClient from "./QuestionBuilderClient";
import { ClipboardList, Save, ArrowLeft, ToggleLeft, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Personalizar Postulaciones al Staff | Miyobi Staff",
  description: "Configuración de preguntas dinámicas, estado de reclutamiento y textos del formulario de postulaciones.",
};

export default async function PostulacionesSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <main className="text-white space-y-8 max-w-4xl mx-auto pb-16">
      {/* Back Link */}
      <Link
        href="/staff/dashboard/configuracion/web"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver a Ajustes de la Web
      </Link>

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <WebSettingsNav activeKey="postulaciones" />

        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
            <ClipboardList className="h-7 w-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-400">
              Personalización de Reclutamiento
            </span>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              Configuración de Postulaciones al Staff
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Abre/cierra postulaciones y administra dinámicamente las preguntas del formulario público (/postulaciones).
            </p>
          </div>
        </div>

        <form action={updateWebSettings} className="mt-8 space-y-8">

          {/* 1. ESTADO DE POSTULACIONES (ABRIR / CERRAR) */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 border-b border-white/10 pb-3">
              <ToggleLeft size={18} />
              <h2 className="text-base font-bold text-white">1. Estado del Reclutamiento</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Apertura de Postulaciones
                </label>
                <select
                  name="applications_open"
                  defaultValue={settings.applications_open}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white outline-none focus:border-emerald-500 transition"
                >
                  <option value="true" className="bg-[#09090b]">Abiertas (Formulario Activo)</option>
                  <option value="false" className="bg-[#09090b]">Cerradas (Formulario Desactivado)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Mensaje si están Cerradas
                </label>
                <input
                  name="applications_closed_msg"
                  defaultValue={settings.applications_closed_msg}
                  placeholder="Las postulaciones están cerradas temporalmente..."
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

          {/* 2. TEXTOS CABECERA DEL FORMULARIO */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-emerald-400 border-b border-white/10 pb-3">
              <MessageSquare size={18} />
              <h2 className="text-base font-bold text-white">2. Título & Eslogan del Formulario</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Título Principal</label>
                <input
                  name="applications_title"
                  defaultValue={settings.applications_title}
                  placeholder="FORMULARIO DE STAFF"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Subtítulo Eslogan</label>
                <input
                  name="applications_slogan"
                  defaultValue={settings.applications_slogan}
                  placeholder="Conéctate con tu cuenta de Discord..."
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          </div>

          {/* 3. DYNAMIC QUESTION BUILDER */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <QuestionBuilderClient initialJson={settings.application_questions_json} />
          </div>

          {/* SAVE BUTTON */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/staff/dashboard/configuracion/web"
              className="text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              ← Cancelar y volver
            </Link>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105"
            >
              <Save size={16} /> Guardar Ajustes de Postulaciones
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
