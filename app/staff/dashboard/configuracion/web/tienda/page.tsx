import { getSiteSettings } from "@/lib/settings";
import { updateWebSettings } from "@/actions/settings";
import Link from "next/link";
import WebSettingsNav from "../components/WebSettingsNav";
import { ShoppingBag, Save, ArrowLeft, Tag, Globe, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Personalizar Tienda Oficial | Miyobi Staff",
  description: "Configuración de enlace de pasarela Tebex, título, eslogan y cupones de descuento.",
};

export default async function StoreSettingsPage() {
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
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <WebSettingsNav activeKey="tienda" />

        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/10">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-400">
              Personalización de Tienda
            </span>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              Configuración de la Tienda Oficial
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Configura el enlace de pago externo (Tebex/CraftingStore), promociones activas y cupones de descuento.
            </p>
          </div>
        </div>

        <form action={updateWebSettings} className="mt-8 space-y-8">

          {/* 1. ENLACE DE PAGO Y PASARELA EXTERNA */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
              <Globe size={18} />
              <h2 className="text-base font-bold text-white">1. Enlace de Pasarela de Pago Externa</h2>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                URL Oficial de la Tienda / Tebex Store
              </label>
              <input
                name="store_url"
                defaultValue={settings.store_url}
                placeholder="https://tienda.miyobi.gg"
                className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-amber-300 font-mono outline-none focus:border-amber-500 transition"
              />
              <p className="text-[11px] text-zinc-400 mt-1.5">
                Redirige a los jugadores a tu tienda Tebex, CraftingStore o pasarela de pago configurada.
              </p>
            </div>
          </div>

          {/* 2. TÍTULO Y ESLOGAN DE LA TIENDA */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
              <MessageSquare size={18} />
              <h2 className="text-base font-bold text-white">2. Título & Eslogan de la Tienda</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Título Principal</label>
                <input
                  name="store_title"
                  defaultValue={settings.store_title}
                  placeholder="TIENDA OFICIAL MIYOBI"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Eslogan Promocional</label>
                <input
                  name="store_slogan"
                  defaultValue={settings.store_slogan}
                  placeholder="Adquiere rangos VIP, cajas místicas y paquetes de monedas..."
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>
          </div>

          {/* 3. CUPONES Y DESCUENTOS EN VIVO */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
              <Tag size={18} />
              <h2 className="text-base font-bold text-white">3. Banner de Descuento & Cupones</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Estado del Descuento</label>
                <select
                  name="store_discount_active"
                  defaultValue={settings.store_discount_active}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white outline-none focus:border-amber-500 transition"
                >
                  <option value="true" className="bg-[#09090b]">Activo (Mostrar Banner)</option>
                  <option value="false" className="bg-[#09090b]">Inactivo (Ocultar Banner)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Código de Cupón</label>
                <input
                  name="store_discount_code"
                  defaultValue={settings.store_discount_code}
                  placeholder="MIYOBI20"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-mono font-bold text-amber-300 outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">Texto del Banner</label>
                <input
                  name="store_discount_text"
                  defaultValue={settings.store_discount_text}
                  placeholder="¡20% DE DESCUENTO EN TODA LA TIENDA!"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-500 transition"
                />
              </div>
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
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:scale-105"
            >
              <Save size={16} /> Guardar Ajustes de la Tienda
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
