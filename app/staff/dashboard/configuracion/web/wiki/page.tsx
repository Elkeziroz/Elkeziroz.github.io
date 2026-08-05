import { getSiteSettings } from "@/lib/settings";
import { updateWebSettings } from "@/actions/settings";
import Link from "next/link";
import { BookOpen, Save, ArrowLeft, Image as ImageIcon, FileText, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Personalizar Página de la Wiki | Miyobi Staff",
  description: "Personalización completa de la Wiki, cabecera, textos, imagen de fondo y reglas oficiales.",
};

export default async function WikiSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <main className="text-white space-y-8 max-w-4xl mx-auto pb-16">
      {/* Back Link to Smartphone Settings Index */}
      <Link
        href="/staff/dashboard/configuracion/web"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver a Ajustes de la Web
      </Link>

      {/* Main Container - Dedicated Wiki Settings Screen */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-400">
                Personalización de Página
              </span>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Personalizar Wiki & Reglas (/wiki)
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Modifica todos los textos, la insignia, la imagen de cabecera y el reglamento oficial.
              </p>
            </div>
          </div>
        </div>

        <form action={updateWebSettings} className="mt-8 space-y-8">

          {/* 1. CABECERA & HERO DE LA WIKI */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 border-b border-white/10 pb-3">
              <Sparkles size={18} />
              <h2 className="text-base font-bold text-white">1. Cabecera & Banner Principal de la Wiki</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Insignia Superior (Badge)</label>
                <input
                  name="wiki_badge"
                  defaultValue={settings.wiki_badge}
                  placeholder="Guía & Wiki Oficial"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Título Principal de la Wiki</label>
                <input
                  name="wiki_title"
                  defaultValue={settings.wiki_title}
                  placeholder="WIKI & GUÍAS MIYOBI"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Eslogan Subtítulo</label>
              <input
                name="wiki_slogan"
                defaultValue={settings.wiki_slogan}
                placeholder="Todo el conocimiento para dominar el servidor."
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Descripción Larga de la Wiki</label>
              <textarea
                name="wiki_description"
                defaultValue={settings.wiki_description}
                rows={3}
                placeholder="Encuentra tutoriales de inicio, atajos de comandos, economía y reglas..."
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <ImageIcon size={14} className="text-cyan-400" /> URL Imagen de Fondo de Cabecera
              </label>
              <input
                name="wiki_bg_url"
                defaultValue={settings.wiki_bg_url}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs font-mono text-zinc-300 outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* 2. REGLAMENTO OFICIAL DE LA COMUNIDAD */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 border-b border-white/10 pb-3">
              <FileText size={18} />
              <h2 className="text-base font-bold text-white">2. Reglamento Oficial de la Comunidad</h2>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Título de la Sección de Reglas</label>
              <input
                name="wiki_rules_title"
                defaultValue={settings.wiki_rules_title}
                placeholder="REGLAS PRINCIPALES DEL SERVIDOR"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Contenido Detallado de las Reglas (Línea por Línea)</label>
              <textarea
                name="wiki_rules_content"
                defaultValue={settings.wiki_rules_content}
                rows={8}
                placeholder="1. Respeto mutuo...&#10;2. Cero cheats o hacks...&#10;3. Prohibido grifeo..."
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition"
              />
            </div>
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
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-105"
            >
              <Save size={16} /> Guardar Personalización de la Wiki
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
