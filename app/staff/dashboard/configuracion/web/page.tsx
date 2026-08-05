import type { ReactNode } from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import {
  ChevronRight,
  Terminal,
  Sparkles,
  BookOpen,
  Shield,
  Swords,
  MessageSquare,
  ArrowLeft,
  Sliders,
  ClipboardList,
  ShoppingBag
} from "lucide-react";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";

export const metadata = {
  title: "Ajustes de la Web | Miyobi Staff",
  description: "Panel estilo Ajustes de Móvil para personalizar cada función y página de Miyobi.",
};

export default async function WebSettingsIndexPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/staff");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    redirect("/staff/access-denied");
  }

  const staffRole = await getStaffRole(session.user.discordId);
  if (!staffRole || staffRole.level < 90) {
    redirect("/staff/dashboard");
  }

  const settings = await getSiteSettings();

  const appsOpen = settings.applications_open === "true";

  return (
    <main className="text-white space-y-8 max-w-4xl mx-auto pb-16">
      {/* Back Link */}
      <Link
        href="/staff/dashboard/configuracion"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver a Configuración General
      </Link>

      {/* Main Container - Smartphone Style Hub Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-3xl">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-500/10">
              <Sliders className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-pink-400">
                Ajustes del Sistema
              </span>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Ajustes de la Web
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Selecciona una categoría para personalizar en detalle cada sección.
              </p>
            </div>
          </div>
        </div>

        {/* SETTINGS GROUPS (SMARTPHONE PHONE SETTINGS APP STYLE) */}
        <div className="mt-8 space-y-8">

          {/* SECCIÓN 1: RED Y SERVIDOR */}
          <div className="space-y-3">
            <h2 className="px-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Servidor & Plataforma
            </h2>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 divide-y divide-white/10 backdrop-blur-xl shadow-xl">
              <SettingRow
                icon={<Terminal className="h-5 w-5 text-pink-400" />}
                iconBg="bg-pink-500/10 border-pink-500/20"
                title="Servidor, IPs & Datos de Conexión"
                subtitle={`IP Java: ${settings.ip_java} • Bedrock: ${settings.ip_bedrock}`}
                href="/staff/dashboard/configuracion/web/servidor"
                badge="Conexión"
              />

              <SettingRow
                icon={<MessageSquare className="h-5 w-5 text-indigo-400" />}
                iconBg="bg-indigo-500/10 border-indigo-500/20"
                title="Redes Sociales & Banner Global"
                subtitle={`Discord, Instagram, TikTok • Banner: ${settings.announcement_enabled === "true" ? "Activo" : "Inactivo"}`}
                href="/staff/dashboard/configuracion/web/redes"
                badge="Social"
              />
            </div>
          </div>

          {/* SECCIÓN 2: PERSONALIZACIÓN DE PÁGINAS Y RECLUTAMIENTO */}
          <div className="space-y-3">
            <h2 className="px-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Personalizar Páginas & Reclutamiento
            </h2>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 divide-y divide-white/10 backdrop-blur-xl shadow-xl">
              <SettingRow
                icon={<Sparkles className="h-5 w-5 text-amber-400" />}
                iconBg="bg-amber-500/10 border-amber-500/20"
                title="Página de Inicio (Home & Hero)"
                subtitle={`Hero: "${settings.hero_title}" • 3 Capturas de Galería Home`}
                href="/staff/dashboard/configuracion/web/inicio"
                badge="Home"
              />

              <SettingRow
                icon={<BookOpen className="h-5 w-5 text-cyan-400" />}
                iconBg="bg-cyan-500/10 border-cyan-500/20"
                title="Página de Wiki & Reglas"
                subtitle={`Título: "${settings.wiki_title}" • Reglas y cabecera`}
                href="/staff/dashboard/configuracion/web/wiki"
                badge="Wiki"
              />

              <SettingRow
                icon={<Shield className="h-5 w-5 text-pink-400" />}
                iconBg="bg-pink-500/10 border-pink-500/20"
                title="Página de Survival Custom"
                subtitle={`Título: "${settings.survival_title}" • 4 Capturas de Galería`}
                href="/staff/dashboard/configuracion/web/survival"
                badge="Survival"
              />

              <SettingRow
                icon={<Swords className="h-5 w-5 text-violet-400" />}
                iconBg="bg-violet-500/10 border-violet-500/20"
                title="Página de BoxPvP Extreme"
                subtitle={`Título: "${settings.boxpvp_title}" • 4 Capturas de Galería`}
                href="/staff/dashboard/configuracion/web/boxpvp"
                badge="BoxPvP"
              />

              <SettingRow
                icon={<ClipboardList className="h-5 w-5 text-emerald-400" />}
                iconBg="bg-emerald-500/10 border-emerald-500/20"
                title="Formulario de Postulaciones al Staff"
                subtitle={`Estado: ${appsOpen ? "Abiertas (Reclutando)" : "Cerradas"} • Personalizar Preguntas`}
                href="/staff/dashboard/configuracion/web/postulaciones"
                badge="Staff"
              />

              <SettingRow
                icon={<ShoppingBag className="h-5 w-5 text-amber-400" />}
                iconBg="bg-amber-500/10 border-amber-500/20"
                title="Tienda VIP & Cupones de Descuento"
                subtitle={`URL: ${settings.store_url || "/tienda"} • Banner: ${settings.store_discount_active === "true" ? "Activo" : "Inactivo"}`}
                href="/staff/dashboard/configuracion/web/tienda"
                badge="Tienda"
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function SettingRow({
  icon,
  iconBg,
  title,
  subtitle,
  href,
  badge,
}: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between p-4 sm:p-5 transition duration-200 hover:bg-white/10"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${iconBg} group-hover:scale-105 transition duration-200`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-pink-300 transition truncate">
              {title}
            </h3>
            {badge && (
              <span className="hidden sm:inline-block rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 truncate mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition duration-200 shrink-0">
        <ChevronRight size={20} />
      </div>
    </Link>
  );
}
