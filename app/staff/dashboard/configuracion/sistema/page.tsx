import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { getRolePermissions } from "@/lib/permissions";
import PermissionsEditorClient from "./PermissionsEditorClient";
import {
  Wrench,
  Database,
  Server,
  KeyRound,
  ArrowLeft,
  UserCheck,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "Sistema & Permisos | Miyobi Staff",
  description: "Matriz de permisos personalizable por rango, estado técnico e información del sistema.",
};

export default async function SistemaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/staff");
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    redirect("/staff/access-denied");
  }

  const userRole = await getStaffRole(session.user.discordId);
  const userLevel = userRole?.level || 10;
  const isOwner = userLevel >= 100;

  const rolePermissions = await getRolePermissions();

  return (
    <main className="text-white space-y-8 max-w-6xl mx-auto pb-16">
      {/* Back Link */}
      <Link
        href="/staff/dashboard/configuracion"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} className="text-pink-400" /> Volver a Configuración General
      </Link>

      {/* Header Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-500/10">
              <Wrench className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-pink-400">
                Arquitectura & Control de Acceso
              </span>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Sistema & Permisos de Staff
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Administración de atribuciones por rango, roles de Discord y salud de la plataforma.
              </p>
            </div>
          </div>
        </div>

        {/* LOGGED IN USER STATUS CARD */}
        <div className="mt-8 rounded-3xl border border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-transparent p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                width={56}
                height={56}
                className="rounded-2xl border-2 border-pink-500/50 object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                <UserCheck size={28} />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{session.user.name}</h2>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  Sesión Verificada ✓
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Discord ID: <strong className="text-white font-mono">{session.user.discordId}</strong>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tu Nivel de Permiso</p>
            <div className="flex items-center justify-end gap-2 mt-0.5">
              <Sparkles size={16} className="text-pink-400" />
              <p className="text-lg font-black text-pink-300">
                {userRole?.name || "Staff"} (Nivel {userLevel})
              </p>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS GRID */}
        <div className="mt-8 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 px-2">
            Estado Técnico del Sistema
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <Database size={16} /> PostgreSQL Database
                </span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-base font-bold text-white">Neon Cloud DB</p>
              <p className="text-[11px] text-zinc-400">Estado: Sincronizado & Operativo</p>
            </div>

            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 backdrop-blur-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                  <KeyRound size={16} /> Discord OAuth
                </span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-400 animate-pulse" />
              </div>
              <p className="text-base font-bold text-white">NextAuth v5 Provider</p>
              <p className="text-[11px] text-zinc-400">Estado: Guild & Roles Active</p>
            </div>

            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-5 backdrop-blur-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300 flex items-center gap-2">
                  <Server size={16} /> Vercel Serverless
                </span>
                <span className="flex h-2.5 w-2.5 rounded-full bg-pink-400 animate-pulse" />
              </div>
              <p className="text-base font-bold text-white">Next.js App Router</p>
              <p className="text-[11px] text-zinc-400">Estado: Server Actions Enabled</p>
            </div>
          </div>
        </div>

        {/* DYNAMIC PERMISSIONS MATRIX EDITOR */}
        <div className="mt-10">
          <PermissionsEditorClient
            initialPermissions={rolePermissions}
            isOwner={isOwner}
            userLevel={userLevel}
          />
        </div>
      </div>
    </main>
  );
}
