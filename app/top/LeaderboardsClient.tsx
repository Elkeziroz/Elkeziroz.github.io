"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Swords,
  Coins,
  Vote,
  Search,
  Crown,
  Sparkles,
  Flame,
  User,
  Medal,
  Award,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerModal from "@/components/ui/ServerModal";
import { LeaderboardPlayer } from "@/lib/leaderboards";

export default function LeaderboardsClient({
  topKills,
  topCoins,
  topVotes,
  settings,
}: {
  topKills: LeaderboardPlayer[];
  topCoins: LeaderboardPlayer[];
  topVotes: LeaderboardPlayer[];
  settings?: Record<string, string>;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"kills" | "coins" | "votes">("kills");
  const [searchQuery, setSearchQuery] = useState("");

  const currentList =
    activeTab === "kills"
      ? topKills
      : activeTab === "coins"
      ? topCoins
      : topVotes;

  const filteredList = currentList.filter((p) =>
    p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top1 = currentList[0];
  const top2 = currentList[1];
  const top3 = currentList[2];
  const restList = filteredList.filter(
    (p) => p.id !== top1?.id && p.id !== top2?.id && p.id !== top3?.id
  );

  return (
    <>
      <Navbar logoUrl={settings?.logo_url} onPlay={() => setOpenModal(true)} />

      <main className="bg-[#08080c] text-white min-h-screen">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16">
          <Image
            src={settings?.hero_bg_url || "/images/hero-bg.png"}
            alt="Tabla de Clasificación Miyobi"
            fill
            priority
            className="object-cover scale-[1.03]"
          />

          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute left-1/2 top-[15%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/20 blur-[220px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-amber-300 backdrop-blur-md"
            >
              <Trophy size={14} className="text-amber-400" /> Hall de la Fama Miyobi
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-black tracking-[0.12em] text-white sm:text-6xl md:text-7xl"
            >
              TABLA DE CLASIFICACIÓN
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-4 text-base sm:text-lg font-light text-zinc-300 max-w-2xl mx-auto"
            >
              Conoce a los jugadores más dominantes en BoxPvP, los magnates de la economía y los principales votantes de Miyobi Network.
            </motion.p>

            {/* TAB SELECTOR BUTTONS */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveTab("kills");
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3 text-xs font-bold transition duration-200 ${
                  activeTab === "kills"
                    ? "border-red-500 bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/30 scale-105"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-red-500/30 hover:bg-white/10"
                }`}
              >
                <Swords size={16} className="text-red-400" /> Top Asesinos BoxPvP
              </button>

              <button
                onClick={() => {
                  setActiveTab("coins");
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3 text-xs font-bold transition duration-200 ${
                  activeTab === "coins"
                    ? "border-amber-500 bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/30 scale-105"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-amber-500/30 hover:bg-white/10"
                }`}
              >
                <Coins size={16} className="text-amber-400" /> Top Economía & Coins
              </button>

              <button
                onClick={() => {
                  setActiveTab("votes");
                  setSearchQuery("");
                }}
                className={`inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3 text-xs font-bold transition duration-200 ${
                  activeTab === "votes"
                    ? "border-pink-500 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-pink-500/30 scale-105"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-pink-500/30 hover:bg-white/10"
                }`}
              >
                <Vote size={16} className="text-pink-400" /> Top Votantes del Mes
              </button>
            </div>
          </div>
        </section>

        {/* TOP 3 PODIUM SECTION */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* 2nd PLACE PODIUM (SILVER) */}
            {top2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="order-2 md:order-1 flex flex-col items-center"
              >
                <div className="relative mb-3">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full border border-slate-300/40 bg-slate-500/20 px-3 py-0.5 text-xs font-black text-slate-200 backdrop-blur-md">
                    #2 LUGAR 🥈
                  </span>
                  <img
                    src={`https://mc-heads.net/avatar/${top2.username}/96`}
                    alt={top2.username}
                    className="h-20 w-20 rounded-2xl border-2 border-slate-300 bg-black/60 shadow-xl shadow-slate-500/20"
                  />
                </div>

                <div className="w-full rounded-t-[2rem] border border-slate-400/30 bg-gradient-to-b from-slate-500/20 via-[#0d0d15] to-[#08080c] p-6 text-center shadow-2xl backdrop-blur-xl">
                  <h3 className="text-lg font-black text-white">{top2.username}</h3>
                  <p className="mt-1 text-xs text-slate-300 font-mono font-bold">
                    {activeTab === "kills"
                      ? `${top2.kills} Asesinatos (KDR: ${top2.kdr})`
                      : activeTab === "coins"
                      ? `${top2.coins.toLocaleString()} Coins`
                      : `${top2.votes} Votos`}
                  </p>

                  <span className="mt-3 inline-block rounded-full bg-slate-400/20 text-slate-300 px-3 py-1 text-[11px] font-bold">
                    {top2.currentServer || "Offline"}
                  </span>
                </div>
              </motion.div>
            )}

            {/* 1st PLACE PODIUM (GOLD CROWN) */}
            {top1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="order-1 md:order-2 flex flex-col items-center md:-translate-y-4"
              >
                <div className="relative mb-4">
                  <Crown className="absolute -top-9 left-1/2 -translate-x-1/2 h-8 w-8 text-amber-400 animate-bounce" />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-amber-400/50 bg-amber-500/30 px-3.5 py-0.5 text-xs font-black text-amber-300 backdrop-blur-md shadow-lg shadow-amber-500/30">
                    #1 CAMPEÓN 👑
                  </span>
                  <img
                    src={`https://mc-heads.net/avatar/${top1.username}/128`}
                    alt={top1.username}
                    className="h-28 w-28 rounded-3xl border-4 border-amber-400 bg-black/60 shadow-2xl shadow-amber-500/30"
                  />
                </div>

                <div className="w-full rounded-t-[2.5rem] border border-amber-500/40 bg-gradient-to-b from-amber-500/25 via-[#120f18] to-[#08080c] p-7 text-center shadow-2xl backdrop-blur-3xl">
                  <h3 className="text-2xl font-black text-white">{top1.username}</h3>
                  <p className="mt-1 text-sm text-amber-300 font-mono font-black">
                    {activeTab === "kills"
                      ? `${top1.kills} KILLS (KDR: ${top1.kdr})`
                      : activeTab === "coins"
                      ? `${top1.coins.toLocaleString()} MIYOBI COINS`
                      : `${top1.votes} VOTOS TOTALES`}
                  </p>

                  <span className="mt-4 inline-block rounded-full border border-amber-400/40 bg-amber-400 text-black px-4 py-1 text-xs font-black uppercase tracking-wider">
                    LÍDER ABSOLUTO 🔥
                  </span>
                </div>
              </motion.div>
            )}

            {/* 3rd PLACE PODIUM (BRONZE) */}
            {top3 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-3 flex flex-col items-center"
              >
                <div className="relative mb-3">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full border border-amber-700/40 bg-amber-900/30 px-3 py-0.5 text-xs font-black text-amber-400 backdrop-blur-md">
                    #3 LUGAR 🥉
                  </span>
                  <img
                    src={`https://mc-heads.net/avatar/${top3.username}/96`}
                    alt={top3.username}
                    className="h-20 w-20 rounded-2xl border-2 border-amber-700 bg-black/60 shadow-xl shadow-amber-900/20"
                  />
                </div>

                <div className="w-full rounded-t-[2rem] border border-amber-700/30 bg-gradient-to-b from-amber-900/20 via-[#0d0d15] to-[#08080c] p-6 text-center shadow-2xl backdrop-blur-xl">
                  <h3 className="text-lg font-black text-white">{top3.username}</h3>
                  <p className="mt-1 text-xs text-amber-400 font-mono font-bold">
                    {activeTab === "kills"
                      ? `${top3.kills} Asesinatos (KDR: ${top3.kdr})`
                      : activeTab === "coins"
                      ? `${top3.coins.toLocaleString()} Coins`
                      : `${top3.votes} Votos`}
                  </p>

                  <span className="mt-3 inline-block rounded-full bg-amber-900/30 text-amber-300 px-3 py-1 text-[11px] font-bold">
                    {top3.currentServer || "Offline"}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* FULL RANKING TABLE SECTION */}
        <section className="mx-auto max-w-5xl px-6 pb-28">
          <div className="rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
              <div>
                <h2 className="text-xl font-black text-white sm:text-2xl flex items-center gap-2">
                  <Award size={20} className="text-pink-400" /> Ranking General (#4 al #50)
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Actualización en tiempo real vía Velocity Proxy.
                </p>
              </div>

              {/* SEARCH FILTER */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar jugador..."
                  className="w-full sm:w-64 rounded-2xl border border-white/15 bg-black/40 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>

            {/* TABLE LIST */}
            <div className="space-y-3">
              {restList.map((player, index) => {
                const rankNum = index + 4;
                return (
                  <div
                    key={player.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-xl transition hover:border-pink-500/30 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-center text-sm font-black text-zinc-400 font-mono">
                        #{rankNum}
                      </span>
                      <img
                        src={`https://mc-heads.net/avatar/${player.username}/48`}
                        alt={player.username}
                        className="h-9 w-9 rounded-xl border border-white/15 bg-black/40"
                      />
                      <div>
                        <p className="text-sm font-black text-white">{player.username}</p>
                        <p className="text-[11px] text-zinc-400">
                          Servidor: <span className="text-pink-300 font-semibold">{player.currentServer || "Lobby"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-white font-mono">
                        {activeTab === "kills"
                          ? `${player.kills} Kills`
                          : activeTab === "coins"
                          ? `${player.coins.toLocaleString()} Coins`
                          : `${player.votes} Votos`}
                      </p>
                      {activeTab === "kills" && (
                        <p className="text-[11px] text-zinc-400 font-mono">KDR: {player.kdr}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />

      <ServerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        ipJava={settings?.ip_java}
        ipBedrock={settings?.ip_bedrock}
        portBedrock={settings?.port_bedrock}
      />
    </>
  );
}
