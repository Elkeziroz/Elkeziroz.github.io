import { getSiteSettings } from "@/lib/settings";
import { updateWebSettings } from "@/actions/settings";
import Link from "next/link";
import WebSettingsNav from "../components/WebSettingsNav";
import { Terminal, Save, ArrowLeft, Image as ImageIcon } from "lucide-react";

export const metadata = {
  title: "Ajustes de Servidor & IP | Miyobi Staff",
  description: "Configuración de IPs, puertos, nombre del sitio y logo oficial.",
};

export default async function ServidorSettingsPage() {
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
        <WebSettingsNav activeKey="servidor" />

        <div className="flex items-center gap-3 border-b border-white/10 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Terminal className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              1. Servidor & Datos de Conexión
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Personaliza las IPs de Java/Bedrock, el puerto y el nombre e icono principal de la marca.
            </p>
          </div>
        </div>

        <form action={updateWebSettings} className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Nombre de la Web / Servidor</label>
              <input
                name="site_name"
                defaultValue={settings.site_name}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <ImageIcon size={14} className="text-pink-400" /> Logo Oficial (Navbar & Footer)
              </label>
              <input
                name="logo_url"
                defaultValue={settings.logo_url}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs font-mono text-zinc-300 outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">IP Servidor Java</label>
              <input
                name="ip_java"
                defaultValue={settings.ip_java}
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-mono text-pink-300 outline-none focus:border-pink-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">IP Bedrock & Puerto</label>
              <div className="flex gap-2 mt-2">
                <input
                  name="ip_bedrock"
                  defaultValue={settings.ip_bedrock}
                  className="w-2/3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-mono text-violet-300 outline-none focus:border-pink-500 transition"
                />
                <input
                  name="port_bedrock"
                  defaultValue={settings.port_bedrock}
                  className="w-1/3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-mono text-zinc-300 outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105"
            >
              <Save size={16} /> Guardar Ajustes de Servidor
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
