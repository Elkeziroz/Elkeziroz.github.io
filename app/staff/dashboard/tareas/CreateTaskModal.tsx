"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X, Check, Disc as DiscordIcon, UserCheck, AlertCircle, Shield, Clock } from "lucide-react";
import { createStaffTask } from "@/actions/tasks";
import type { DiscordStaffUser } from "@/lib/discord";

export default function CreateTaskModal({
  staffMembers,
}: {
  staffMembers: DiscordStaffUser[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    try {
      await createStaffTask(formData);
      setIsOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al crear la tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition duration-200"
      >
        <Plus size={16} /> Asignar Tarea a Staff
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0d0d15] p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Asignar Tarea a Staff</h2>
                  <p className="text-xs text-zinc-400">Selecciona a un miembro verificado de Discord</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {errorMsg && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-xs font-semibold text-red-300 flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SELECT ASSIGNEE FROM DISCORD STAFF */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-pink-400">
                  Miembro del Staff (Sincronizado desde Discord) *
                </label>

                {staffMembers.length > 0 ? (
                  <select
                    name="assignedToData"
                    required
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3.5 text-sm text-white font-semibold outline-none focus:border-pink-500 transition"
                  >
                    <option value="" className="bg-[#0d0d15]">-- Selecciona a un miembro del Staff --</option>
                    {staffMembers.map((member) => (
                      <option
                        key={member.discordId}
                        value={`${member.username}|${member.avatar}|${member.roleName}`}
                        className="bg-[#0d0d15]"
                      >
                        {member.username} ({member.roleName})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="assignedToData"
                    required
                    placeholder="Ej: Steve_MC|https://cdn.discordapp.com/embed/avatars/0.png|Moderador"
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3.5 text-sm text-white outline-none focus:border-pink-500 transition"
                  />
                )}
              </div>

              {/* TÍTULO DE LA TAREA */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Título de la Tarea *
                </label>
                <input
                  name="title"
                  required
                  placeholder="Ej: Revisar postulaciones pendientes de Builder"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 transition"
                />
              </div>

              {/* DESCRIPCIÓN & INSTRUCCIONES */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Descripción & Detalle de la Instrucción *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Explica detalladamente qué debe realizar el miembro del staff..."
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 transition"
                />
              </div>

              {/* PRIORIDAD */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Nivel de Prioridad *
                </label>
                <select
                  name="priority"
                  defaultValue="NORMAL"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
                >
                  <option value="LOW" className="bg-[#0d0d15]">Baja (Sin prisa)</option>
                  <option value="NORMAL" className="bg-[#0d0d15]">Normal (Estándar)</option>
                  <option value="HIGH" className="bg-[#0d0d15]">Alta (Prioritaria)</option>
                  <option value="URGENT" className="bg-[#0d0d15]">🚨 Urgente (Atención Inmediata)</option>
                </select>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-zinc-300 hover:bg-white/10 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition disabled:opacity-50"
                >
                  <Check size={16} /> {loading ? "Guardando..." : "Asignar Tarea"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
