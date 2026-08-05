import Link from "next/link";
import Image from "next/image";
import { Home, ClipboardList, Ticket, ShieldCheck, Settings, ArrowLeft, ExternalLink, CheckSquare } from "lucide-react";
import { auth } from "@/auth";
import { getStaffRole } from "@/lib/discordRoles";
import { checkStaffPermission } from "@/lib/permissions";
import MobileSidebar from "./MobileSidebar";

export default async function Sidebar() {
  const session = await auth();

  if (!session?.user?.discordId) {
    return null;
  }

  const staffRole = await getStaffRole(session.user.discordId);

  if (!staffRole) {
    return null;
  }

  const canReviewApps = await checkStaffPermission(staffRole.level, "can_review_apps");
  const canManageWeb = await checkStaffPermission(staffRole.level, "can_manage_web");
  const canManageEvents = await checkStaffPermission(staffRole.level, "can_manage_events");
  const canCreateNotices = await checkStaffPermission(staffRole.level, "can_create_notices");
  const canManageTasks = await checkStaffPermission(staffRole.level, "can_manage_tasks");
  const canManageUsers = await checkStaffPermission(staffRole.level, "can_manage_users");

  const showSettings = staffRole.level >= 90;

  const items = [
    {
      name: "Inicio",
      href: "/staff/dashboard",
      icon: <Home className="h-5 w-5" />,
      show: true,
    },
    {
      name: "Tareas Staff",
      href: "/staff/dashboard/tareas",
      icon: <CheckSquare className="h-5 w-5" />,
      show: canManageTasks,
    },
    {
      name: "Solicitudes",
      href: "/staff/dashboard/solicitudes",
      icon: <ClipboardList className="h-5 w-5" />,
      show: canReviewApps || staffRole.level >= 60,
    },
    {
      name: "Tickets",
      href: "/staff/dashboard/tickets",
      icon: <Ticket className="h-5 w-5" />,
      show: staffRole.level >= 20,
    },
    {
      name: "Moderación",
      href: "/staff/dashboard/usuarios",
      icon: <ShieldCheck className="h-5 w-5" />,
      show: canManageUsers || staffRole.level >= 40,
    },
  ];

  const settingsItem = {
    name: "Configuración",
    href: "/staff/dashboard/configuracion",
    icon: <Settings className="h-5 w-5" />,
    show: showSettings,
  };

  const visibleItems = items.filter((item) => item.show);

  return (
    <>
      {/* Sidebar móvil */}
      <MobileSidebar
        items={visibleItems}
        settingsItem={
          showSettings
            ? settingsItem
            : { ...settingsItem, href: "/staff/dashboard" }
        }
      />

      {/* Sidebar escritorio */}
      <aside className="fixed left-6 top-6 bottom-6 hidden w-72 rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-6 shadow-2xl backdrop-blur-3xl lg:flex lg:flex-col justify-between">
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <Image
              src="/images/logo.png"
              alt="Miyobi"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-pink-500/30"
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-pink-400">
                Miyobi Staff
              </p>
              <h2 className="text-lg font-black text-white">Panel de Control</h2>
            </div>
          </div>

          {/* User Role Card */}
          <div className="mt-4 rounded-2xl border border-pink-500/20 bg-pink-500/10 p-3 text-xs">
            <span className="text-zinc-400">Rango Actual:</span>
            <p className="font-bold text-pink-300 mt-0.5">{staffRole.name}</p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2">
            {visibleItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-300 transition duration-200 hover:border hover:border-pink-500/30 hover:bg-white/10 hover:text-white"
              >
                <span className="text-pink-400">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            {showSettings && (
              <Link
                href={settingsItem.href}
                className="flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-300 transition duration-200 hover:border hover:border-pink-500/30 hover:bg-white/10 hover:text-white"
              >
                <span className="text-pink-400">{settingsItem.icon}</span>
                <span>Configuración</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Footer Link back to Website */}
        <div className="pt-6 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-zinc-300 hover:border-pink-500/40 hover:bg-white/10 hover:text-white transition"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft size={14} className="text-pink-400" /> Volver a la Web
            </span>
            <ExternalLink size={12} className="text-zinc-500" />
          </Link>
        </div>
      </aside>
    </>
  );
}