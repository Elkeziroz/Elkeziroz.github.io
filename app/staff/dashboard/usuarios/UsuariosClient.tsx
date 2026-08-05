"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Wifi,
  WifiOff,
  UserCheck,
  UserX,
  Gavel,
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowLeft,
  Server
} from "lucide-react";
import { issueSanction } from "@/actions/sanctions";

type PlayerItem = {
  id: string;
  username: string;
  uuid: string;
  isOnline: boolean;
  currentServer?: string | null;
  ipAddress?: string | null;
  lastLogin: Date | string;
  punishments?: any[];
};

type ServerStatusItem = {
  serverKey: string;
  name: string;
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  ramUsage?: string | null;
  updatedAt: Date | string;
};

type SanctionQueueItem = {
  id: string;
  username: string;
  type: string;
  reason: string;
  duration?: string | null;
  issuedBy: string;
  executed: boolean;
  createdAt: Date | string;
};

export default function UsuariosClient({
  players,
  serverStatus,
  pendingSanctions,
}: {
  players: PlayerItem[];
  serverStatus: ServerStatusItem | null;
  pendingSanctions: SanctionQueueItem[];
}) {
  const [activeTab, setActiveTab] = useState<"online" | "all" | "pending">("online");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerItem | null>(null);
  const [sanctionModalOpen, setSanctionModalOpen] = useState(false);

  const onlinePlayers = players.filter((p) => p.isOnline);
  const filteredPlayers = (activeTab === "online" ? onlinePlayers : players).filter((p) =>
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenSanctionModal = (player: PlayerItem) => {
    setSelectedPlayer(player);
    setSanctionModalOpen(true);
  };

  return (
    <main className="text-white space-y-8 max-w-7xl mx-auto pb-16">
      {/* HEADER CARD */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-8 shadow-2xl backdrop-blur-3xl">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-red-300">
                <Gavel size={14} /> Moderación & Jugadores
              </span>
              <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Control de Usuarios & Sanciones
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                Monitorea usuarios conectados vía Velocity Proxy y aplica bans, mutes o sanción directa desde la web.
              </p>
            </div>
          </div>

          <Link
            href="/staff/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:border-white/20 hover:text-white transition"
          >
            <ArrowLeft size={14} /> Volver al Dashboard
          </Link>
        </div>

        {/* LIVE VELOCITY PROXY STATUS METRICS */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-6">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Proxy Velocity</p>
              <p className="mt-1 text-lg font-bold text-white flex items-center gap-2">
                {serverStatus?.isOnline ? (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-emerald-400">Conectado (En Vivo)</span>
                  </>
                ) : (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="text-zinc-400">Esperando Plugin</span>
                  </>
                )}
              </p>
            </div>
            <Server className="h-8 w-8 text-zinc-500" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Jugadores Conectados</p>
              <p className="mt-1 text-2xl font-black text-pink-300">
                {onlinePlayers.length} <span className="text-xs text-zinc-500 font-normal">Online</span>
              </p>
            </div>
            <Users className="h-8 w-8 text-pink-400" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Sanciones Pendientes</p>
              <p className="mt-1 text-2xl font-black text-amber-400">
                {pendingSanctions.filter((s) => !s.executed).length}
              </p>
            </div>
            <Gavel className="h-8 w-8 text-amber-400" />
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/50 p-1.5 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("online")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === "online"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <UserCheck size={14} /> Conectados ({onlinePlayers.length})
          </button>

          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === "all"
                ? "bg-pink-500/20 border border-pink-500/40 text-pink-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Users size={14} /> Todos los Usuarios ({players.length})
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === "pending"
                ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Clock size={14} /> Cola Velocity ({pendingSanctions.length})
          </button>
        </div>

        {/* SEARCH INPUT */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por usuario Minecraft..."
            className="w-full sm:w-72 rounded-2xl border border-white/15 bg-black/40 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-pink-500 transition"
          />
        </div>
      </div>

      {/* PLAYERS LIST / GRID */}
      {activeTab !== "pending" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-zinc-400">
              <UserX className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
              <p className="text-sm font-bold text-white">No se encontraron jugadores</p>
              <p className="text-xs text-zinc-500 mt-1">
                {activeTab === "online"
                  ? "No hay jugadores conectados en este momento en el Proxy Velocity."
                  : "No hay registros coincidentes con la búsqueda."}
              </p>
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <div
                key={player.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a10]/90 p-5 backdrop-blur-2xl transition duration-300 hover:border-pink-500/40 hover:bg-white/5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={`https://mc-heads.net/avatar/${player.username}/64`}
                      alt={player.username}
                      className="h-11 w-11 rounded-xl border border-white/15 bg-black/40 shadow"
                    />
                    <div>
                      <h3 className="text-base font-black text-white group-hover:text-pink-300 transition">
                        {player.username}
                      </h3>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        Server: <span className="font-bold text-amber-300">{player.currentServer || "Lobby"}</span>
                      </p>
                    </div>
                  </div>

                  {player.isOnline ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-zinc-400">
                      Offline
                    </span>
                  )}
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Sanciones: <strong className="text-white">{player.punishments?.length || 0}</strong></span>
                  <button
                    onClick={() => handleOpenSanctionModal(player)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/20 transition"
                  >
                    <Gavel size={13} /> Sancionar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* PENDING SANCTIONS QUEUE LIST */}
      {activeTab === "pending" && (
        <div className="rounded-3xl border border-white/10 bg-[#0a0a10]/95 p-6 backdrop-blur-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock size={16} className="text-amber-400" /> Cola de Sanciones Web ➔ Velocity Proxy
          </h3>

          {pendingSanctions.length === 0 ? (
            <p className="text-xs text-zinc-400 italic py-4">No hay sanciones pendientes en cola.</p>
          ) : (
            <div className="space-y-2">
              {pendingSanctions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg border border-red-500/30 bg-red-500/20 px-2 py-1 font-bold text-red-300 font-mono uppercase">
                      {s.type}
                    </span>
                    <div>
                      <p className="font-bold text-white">{s.username}</p>
                      <p className="text-zinc-400 text-[11px]">Razón: {s.reason}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold uppercase rounded-full px-2 py-0.5 border ${
                      s.executed
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                    }`}>
                      {s.executed ? "Ejecutado ✓" : "Pendiente de Ejecución..."}
                    </span>
                    <p className="text-[10px] text-zinc-500 mt-1">Por: {s.issuedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SANCTION MODAL */}
      {sanctionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-red-500/30 bg-[#0c0a12] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Gavel className="h-6 w-6 text-red-400" />
                <div>
                  <h2 className="text-base font-bold text-white">Aplicar Sanción Directa</h2>
                  <p className="text-xs text-red-300 font-mono">Usuario: {selectedPlayer?.username}</p>
                </div>
              </div>

              <button
                onClick={() => setSanctionModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form
              action={async (formData) => {
                await issueSanction(formData);
                setSanctionModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <input type="hidden" name="username" value={selectedPlayer?.username || ""} />

              <div>
                <label className="font-bold text-zinc-300 uppercase">Tipo de Sanción *</label>
                <select
                  name="type"
                  className="mt-1.5 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-white outline-none focus:border-red-500"
                >
                  <option value="BAN" className="bg-[#09090b]">BANEO (Expulsión Permanente/Temporal)</option>
                  <option value="MUTE" className="bg-[#09090b]">MUTEO (Silenciar en Chat)</option>
                  <option value="KICK" className="bg-[#09090b]">KICK (Expulsar del Servidor)</option>
                  <option value="WARN" className="bg-[#09090b]">ADVERTENCIA / WARN</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-300 uppercase">Duración</label>
                <input
                  name="duration"
                  defaultValue="permanente"
                  placeholder="Ej: 7d, 24h, permanente"
                  className="mt-1.5 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-white outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 uppercase">Motivo / Razón *</label>
                <textarea
                  name="reason"
                  required
                  rows={3}
                  placeholder="Escribe la razón detallada de la sanción..."
                  className="mt-1.5 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSanctionModalOpen(false)}
                  className="rounded-2xl border border-white/10 px-4 py-3 font-semibold text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-500/30 hover:scale-105 transition"
                >
                  <Gavel size={14} /> Confirmar Sanción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
