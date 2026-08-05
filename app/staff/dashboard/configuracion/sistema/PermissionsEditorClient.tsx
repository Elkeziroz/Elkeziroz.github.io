"use client";

import { useState } from "react";
import {
  MANAGED_ROLES,
  PERMISSION_DEFINITIONS,
  PermissionKey
} from "@/lib/permissionsTypes";
import { updateRolePermissions } from "@/actions/permissions";
import { Save, ShieldCheck, Lock, CheckCircle2, Check, X } from "lucide-react";

export default function PermissionsEditorClient({
  initialPermissions,
  isOwner,
  userLevel,
}: {
  initialPermissions: Record<string, Record<PermissionKey, boolean>>;
  isOwner: boolean;
  userLevel: number;
}) {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const togglePermission = (roleKey: string, permKey: PermissionKey) => {
    if (!isOwner) return;

    setPermissions((prev) => {
      const currentRolePerms = prev[roleKey] || {};
      const currentVal = currentRolePerms[permKey] ?? false;

      return {
        ...prev,
        [roleKey]: {
          ...currentRolePerms,
          [permKey]: !currentVal,
        },
      };
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isOwner) return;

    setSaving(true);
    setMsg(null);

    const formData = new FormData(e.currentTarget);
    try {
      await updateRolePermissions(formData);
      setMsg("¡Matriz de permisos de rangos actualizada con éxito!");
      setTimeout(() => setMsg(null), 4000);
    } catch (err: any) {
      setMsg(err.message || "Error al actualizar los permisos.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-pink-400" /> Matriz de Permisos Personalizable por Rango
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {isOwner
              ? "Como Owner (Nivel 100), puedes activar o desactivar dinámicamente qué funciones puede ver y ejecutar cada rango."
              : "Consulta las atribuciones y capacidades configuradas por el Owner para cada nivel de Staff."}
          </p>
        </div>

        {isOwner && (
          <span className="rounded-full border border-pink-500/40 bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-300 shrink-0">
            Modo Edición Owner Habilitado ✓
          </span>
        )}
      </div>

      {msg && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-300 flex items-center gap-3">
          <CheckCircle2 size={18} />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PERMISSIONS MATRIX TABLE */}
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-zinc-400 font-bold uppercase tracking-wider">
                <th className="p-4 sm:p-5 min-w-[220px]">Función / Módulo del Sistema</th>
                {MANAGED_ROLES.map((role) => (
                  <th key={role.key} className="p-4 text-center min-w-[110px]">
                    <div className="text-white font-black">{role.name}</div>
                    <div className="text-[10px] text-pink-400 font-mono">Nivel {role.level}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {PERMISSION_DEFINITIONS.map((perm) => (
                <tr key={perm.key} className="hover:bg-white/5 transition">
                  <td className="p-4 sm:p-5">
                    <p className="font-bold text-white text-sm">{perm.label}</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{perm.description}</p>
                  </td>

                  {MANAGED_ROLES.map((role) => {
                    const isChecked = permissions[role.key]?.[perm.key] ?? false;
                    const fieldName = `perm_${role.key}_${perm.key}`;

                    return (
                      <td key={role.key} className="p-4 text-center align-middle">
                        {/* Hidden Input for Form Submission */}
                        <input
                          type="hidden"
                          name={fieldName}
                          value={isChecked ? "true" : "false"}
                        />

                        {isOwner ? (
                          <button
                            type="button"
                            onClick={() => togglePermission(role.key, perm.key)}
                            className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
                              isChecked
                                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-md shadow-emerald-500/20 hover:scale-110"
                                : "border-white/10 bg-black/40 text-zinc-600 hover:border-white/30 hover:text-zinc-400"
                            }`}
                            title={`Alternar ${perm.label} para ${role.name}`}
                          >
                            {isChecked ? <Check size={18} /> : <X size={16} />}
                          </button>
                        ) : (
                          <div className="flex justify-center">
                            {isChecked ? (
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <Check size={16} />
                              </span>
                            ) : (
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-zinc-600 border border-white/10">
                                <Lock size={14} />
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SAVE BUTTON FOR OWNER */}
        {isOwner && (
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-pink-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Guardando cambios..." : "Guardar Matriz de Permisos de Rangos"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
