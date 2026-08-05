import { getSiteSettings } from "@/lib/settings";
import { updateWebSettings } from "@/actions/settings";
import Link from "next/link";
import WebSettingsNav from "../components/WebSettingsNav";
import ImageUploaderInput from "../../components/ImageUploaderInput";
import { Shield, Save, ArrowLeft, Image as ImageIcon, Layers } from "lucide-react";

export const metadata = {
  title: "Ajustes de Survival | Miyobi Staff",
  description: "Configuración de textos e imágenes de la modalidad Survival.",
};

export default async function SurvivalSettingsPage() {
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
        <WebSettingsNav activeKey="survival" />

        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              4. Modalidad Survival Custom (/survival)
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Personaliza el fondo del Hero, títulos y las 4 imágenes independientes de la galería de Survival.
            </p>
          </div>
        </div>

        <form action={updateWebSettings} className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Título de Survival</label>
              <input
                name="survival_title"
                defaultValue={settings.survival_title}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Subtítulo Eslogan</label>
              <input
                name="survival_slogan"
                defaultValue={settings.survival_slogan}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Descripción de Survival</label>
            <textarea
              name="survival_desc"
              defaultValue={settings.survival_desc}
              className="mt-2 h-20 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
            />
          </div>

          <ImageUploaderInput
            name="survival_bg_url"
            defaultValue={settings.survival_bg_url}
            label="Imagen Fondo Hero de Survival"
          />

          {/* GALERÍA DE SURVIVAL */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
              <Layers size={16} /> 4 Imágenes Independientes para Galería de Survival
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5 space-y-2">
                <ImageUploaderInput
                  name="survival_gallery_1"
                  defaultValue={settings.survival_gallery_1}
                  label="Imagen 1 (Spawn)"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5 space-y-2">
                <ImageUploaderInput
                  name="survival_gallery_2"
                  defaultValue={settings.survival_gallery_2}
                  label="Imagen 2 (Villas)"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5 space-y-2">
                <ImageUploaderInput
                  name="survival_gallery_3"
                  defaultValue={settings.survival_gallery_3}
                  label="Imagen 3 (Mercado)"
                />
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3.5 space-y-2">
                <ImageUploaderInput
                  name="survival_gallery_4"
                  defaultValue={settings.survival_gallery_4}
                  label="Imagen 4 (Mundo)"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105"
            >
              <Save size={16} /> Guardar Ajustes de Survival
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
