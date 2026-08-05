import { getSiteSettings } from "@/lib/settings";
import { updateWebSettings } from "@/actions/settings";
import Link from "next/link";
import WebSettingsNav from "../components/WebSettingsNav";
import { Sparkles, Save, ArrowLeft, Image as ImageIcon, Layers } from "lucide-react";

export const metadata = {
  title: "Ajustes de Inicio & Hero | Miyobi Staff",
  description: "Configuración de textos del Hero e imágenes independientes de la galería Home.",
};

export default async function InicioSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <main className="text-white space-y-8 max-w-4xl mx-auto pb-12">
      <Link
        href="/staff/dashboard/configuracion/web"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver al Menú de Ajustes Web
      </Link>

      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl">
        <WebSettingsNav activeKey="inicio" />

        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              2. Página Principal (Inicio & Hero)
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Personaliza el banner de bienvenida del Hero y las 3 capturas independientes de la Galería principal.
            </p>
          </div>
        </div>

        <form action={updateWebSettings} className="mt-8 space-y-8">
          {/* HERO TEXTS */}
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Insignia Superior (Badge)</label>
                <input
                  name="hero_badge"
                  defaultValue={settings.hero_badge}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Título Principal (Hero Title)</label>
                <input
                  name="hero_title"
                  defaultValue={settings.hero_title}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Eslogan Subtítulo</label>
              <input
                name="hero_slogan"
                defaultValue={settings.hero_slogan}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Descripción Larga del Hero</label>
              <textarea
                name="hero_description"
                defaultValue={settings.hero_description}
                className="mt-2 h-24 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <ImageIcon size={14} className="text-pink-400" /> URL Imagen de Fondo del Hero
              </label>
              <input
                name="hero_bg_url"
                defaultValue={settings.hero_bg_url}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs font-mono text-zinc-300 outline-none focus:border-pink-500 transition"
              />
            </div>
          </div>

          {/* GALLERY IMAGES */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
              <Layers size={16} /> Capturas de la Galería Principal (Home)
            </h2>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
                <p className="text-xs font-bold text-white">Imagen Galería 1 (Survival)</p>
                <input name="gallery_title_1" defaultValue={settings.gallery_title_1} placeholder="Título" className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs text-white" />
                <input name="gallery_img_1" defaultValue={settings.gallery_img_1} placeholder="URL Imagen" className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs font-mono text-zinc-300" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
                <p className="text-xs font-bold text-white">Imagen Galería 2 (BoxPvP)</p>
                <input name="gallery_title_2" defaultValue={settings.gallery_title_2} placeholder="Título" className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs text-white" />
                <input name="gallery_img_2" defaultValue={settings.gallery_img_2} placeholder="URL Imagen" className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs font-mono text-zinc-300" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
                <p className="text-xs font-bold text-white">Imagen Galería 3 (Comunidad)</p>
                <input name="gallery_title_3" defaultValue={settings.gallery_title_3} placeholder="Título" className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs text-white" />
                <input name="gallery_img_3" defaultValue={settings.gallery_img_3} placeholder="URL Imagen" className="w-full rounded-xl border border-white/10 bg-black/40 p-2 text-xs font-mono text-zinc-300" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105"
            >
              <Save size={16} /> Guardar Ajustes de Inicio
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
