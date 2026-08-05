import { getSiteSettings } from "@/lib/settings";
import { updateWebSettings } from "@/actions/settings";
import Link from "next/link";
import WebSettingsNav from "../components/WebSettingsNav";
import { MessageSquare, Save, ArrowLeft, Megaphone } from "lucide-react";

export const metadata = {
  title: "Ajustes de Redes & Banner | Miyobi Staff",
  description: "Configuración de enlaces a redes sociales y banner de anuncios.",
};

export default async function RedesSettingsPage() {
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
        <WebSettingsNav activeKey="redes" />

        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              6. Redes Sociales & Banner de Anuncio Global
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Administra las URLs externas y la visibilidad del banner flotante superior.
            </p>
          </div>
        </div>

        <form action={updateWebSettings} className="mt-8 space-y-8">
          {/* REDES SOCIALES */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-pink-400">
              Enlaces Sociales & Tienda VIP
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Enlace de Discord</label>
                <input
                  name="discord_url"
                  defaultValue={settings.discord_url}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-mono text-indigo-300 outline-none focus:border-pink-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Enlace de Instagram</label>
                <input
                  name="instagram_url"
                  defaultValue={settings.instagram_url}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-mono text-pink-300 outline-none focus:border-pink-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Enlace de TikTok</label>
                <input
                  name="tiktok_url"
                  defaultValue={settings.tiktok_url}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-mono text-cyan-300 outline-none focus:border-pink-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Enlace de la Tienda VIP</label>
                <input
                  name="store_url"
                  defaultValue={settings.store_url}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          </div>

          {/* BANNER GLOBAL */}
          <div className="border-t border-white/10 pt-6 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Megaphone size={16} /> Banner Flotante de Anuncio Global
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Estado del Banner</label>
                <select
                  name="announcement_enabled"
                  defaultValue={settings.announcement_enabled}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
                >
                  <option value="false" className="bg-[#09090b]">Desactivado (Oculto)</option>
                  <option value="true" className="bg-[#09090b]">Activo (Visible en la cabecera)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Texto del Anuncio Global</label>
                <input
                  name="announcement_text"
                  defaultValue={settings.announcement_text}
                  placeholder="Ej: ¡Descuentos especiales del 20% en rangos VIP!"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105"
            >
              <Save size={16} /> Guardar Ajustes Sociales & Banner
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
