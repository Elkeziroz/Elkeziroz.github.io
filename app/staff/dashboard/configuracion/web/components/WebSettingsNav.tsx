"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Sparkles, BookOpen, Shield, Swords, MessageSquare, LayoutGrid, ClipboardList, ShoppingBag } from "lucide-react";

const NAV_ITEMS = [
  { href: "/staff/dashboard/configuracion/web", label: "Menú Principal", icon: LayoutGrid, key: "index" },
  { href: "/staff/dashboard/configuracion/web/servidor", label: "Servidor & IP", icon: Terminal, key: "servidor" },
  { href: "/staff/dashboard/configuracion/web/inicio", label: "Inicio & Hero", icon: Sparkles, key: "inicio" },
  { href: "/staff/dashboard/configuracion/web/wiki", label: "Wiki & Reglas", icon: BookOpen, key: "wiki" },
  { href: "/staff/dashboard/configuracion/web/survival", label: "Survival", icon: Shield, key: "survival" },
  { href: "/staff/dashboard/configuracion/web/boxpvp", label: "BoxPvP", icon: Swords, key: "boxpvp" },
  { href: "/staff/dashboard/configuracion/web/postulaciones", label: "Postulaciones", icon: ClipboardList, key: "postulaciones" },
  { href: "/staff/dashboard/configuracion/web/tienda", label: "Tienda VIP", icon: ShoppingBag, key: "tienda" },
  { href: "/staff/dashboard/configuracion/web/redes", label: "Redes & Banner", icon: MessageSquare, key: "redes" },
];

export default function WebSettingsNav({ activeKey }: { activeKey: string }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl mb-8">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeKey === item.key || pathname === item.href;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition duration-200 ${
              isActive
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                : "text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={14} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
