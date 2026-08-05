import type { ReactNode } from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import {
  Settings,
  CalendarDays,
  Bell,
  Globe2,
  Wrench,
  CheckSquare,
  ClipboardList,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  Bot
} from "lucide-react";

export const metadata = {
  title: "Configuración | Miyobi Staff",
  description: "Panel de configuración interna y accesos para el equipo de administración de Miyobi.",
};

export default async function ConfiguracionPage() {
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

  return (
    <main className="text-white space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl transition duration-300 hover:border-pink-500/30">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <span className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
          Panel de Administración Exclusivo (Admin & Owner)
        </span>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">
              Configuración del Sistema
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Administra eventos, avisos internos, asignación de tareas, matriz de permisos y opciones globales de la web.
            </p>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 border-t border-white/10 pt-8">
          <ConfigCard
            icon={<CheckSquare className="h-6 w-6 text-pink-400" />}
            title="Tareas Asignadas a Staff"
            description="Asigna tareas a usuarios verificados de Discord, define prioridades y monitorea avances."
            href="/staff/dashboard/tareas"
            badge="Equipo"
          />

          <ConfigCard
            icon={<ShieldCheck className="h-6 w-6 text-pink-400" />}
            title="Matriz de Permisos & Accesos"
            description="Personaliza individualmente lo que puede ver y ejecutar cada rango inferior a Owner."
            href="/staff/dashboard/configuracion/sistema"
            badge="Permisos"
          />

          <ConfigCard
            icon={<ShieldAlert className="h-6 w-6 text-pink-400" />}
            title="Moderación & Sanciones (Velocity)"
            description="Monitorea usuarios conectados en vivo vía Velocity Proxy y aplica baneo o sanción directa."
            href="/staff/dashboard/usuarios"
            badge="Moderación"
          />

          <ConfigCard
            icon={<ClipboardList className="h-6 w-6 text-pink-400" />}
            title="Solicitudes de Staff"
            description="Revisa postulaciones recibidas con Discord OAuth verificado, acepta o rechaza aspirantes."
            href="/staff/dashboard/solicitudes"
            badge="Reclutamiento"
          />

          <ConfigCard
            icon={<HelpCircle className="h-6 w-6 text-pink-400" />}
            title="Constructor de Preguntas"
            description="Añade, edita o elimina preguntas dinámicas (abiertas o cerradas) del formulario de reclutamiento."
            href="/staff/dashboard/configuracion/web/postulaciones"
            badge="Formulario"
          />

          <ConfigCard
            icon={<Globe2 className="h-6 w-6 text-pink-400" />}
            title="Ajustes Generales de la Web"
            description="Personaliza de forma independiente logos, hero, galerías, wiki, modalidades e IPs."
            href="/staff/dashboard/configuracion/web"
            badge="Plataforma"
          />

          <ConfigCard
            icon={<CalendarDays className="h-6 w-6 text-pink-400" />}
            title="Gestión de Eventos"
            description="Crea, edita o programa anuncios de eventos visibles en la página principal."
            href="/staff/dashboard/configuracion/eventos"
            badge="Público"
          />

          <ConfigCard
            icon={<Bot className="h-6 w-6 text-pink-400" />}
            title="Bot de Discord"
            description="Personaliza mensajes de bienvenida, despedida, descripciones de tickets, imágenes y colores del bot en vivo."
            href="/staff/dashboard/configuracion/bot"
            badge="Discord Bot"
          />

          <ConfigCard
            icon={<Bell className="h-6 w-6 text-pink-400" />}
            title="Avisos Internos Staff"
            description="Publica comunicados e instrucciones oficiales para todo el equipo."
            href="/staff/dashboard/configuracion/avisos/crear"
            badge="Interno"
          />
        </div>
      </div>
    </main>
  );
}

function ConfigCard({
  icon,
  title,
  description,
  href,
  badge,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:bg-white/10"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-500 group-hover:text-white transition duration-300">
            {icon}
          </div>
          {badge && (
            <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>

        <h2 className="mt-5 text-lg font-bold text-white group-hover:text-pink-300 transition">
          {title}
        </h2>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-end text-xs font-bold text-pink-400 gap-1 opacity-0 group-hover:opacity-100 transition">
        Acceder <ArrowRight size={14} />
      </div>
    </Link>
  );
}