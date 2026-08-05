"use client";

import { useState } from "react";
import { 
  Bot, 
  Sparkles, 
  Ticket, 
  FileText, 
  MessageSquare, 
  Palette, 
  Save, 
  Check, 
  RotateCcw,
  Info,
  Layers,
  Image as ImageIcon,
  Hash as HashIcon,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
  Link,
  ExternalLink,
  Smile
} from "lucide-react";
import { BotConfigData, TicketCategory, RuleButton, saveBotConfigAction } from "./actions";

interface Props {
  initialConfig: BotConfigData;
}

export default function BotConfigEditorClient({ initialConfig }: Props) {
  const [config, setConfig] = useState<BotConfigData>(initialConfig);
  const [activeTab, setActiveTab] = useState<"welcome" | "tickets" | "rules" | "theme">("welcome");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveBotConfigAction(config);
      if (res.success) {
        setStatusMessage({ type: "success", text: "✨ ¡Configuración del bot guardada y aplicada exitosamente!" });
      } else {
        setStatusMessage({ type: "error", text: res.error || "Ocurrió un error al guardar." });
      }
    } catch (e: any) {
      setStatusMessage({ type: "error", text: "Error inesperado al guardar la configuración." });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de restablecer los cambios a los valores iniciales?")) {
      setConfig(initialConfig);
      setStatusMessage(null);
    }
  };

  const categories = config.tickets.categories || [];
  const ruleButtons = config.rules.buttons || [];

  const handleAddCategory = () => {
    const newCat: TicketCategory = {
      customId: `cat_${Date.now()}`,
      label: "Nueva Categoría",
      emoji: "❓",
      description: "Descripción de la categoría de soporte",
      categoryId: "1399886060703453224",
      title: "❓ Nueva Consulta",
      ticketNamePrefix: "ticket-",
    };
    setConfig({
      ...config,
      tickets: {
        ...config.tickets,
        categories: [...categories, newCat],
      },
    });
  };

  const handleUpdateCategory = (index: number, updated: Partial<TicketCategory>) => {
    const next = [...categories];
    next[index] = { ...next[index], ...updated };
    setConfig({
      ...config,
      tickets: {
        ...config.tickets,
        categories: next,
      },
    });
  };

  const handleRemoveCategory = (index: number) => {
    const next = categories.filter((_, i) => i !== index);
    setConfig({
      ...config,
      tickets: {
        ...config.tickets,
        categories: next,
      },
    });
  };

  const handleAddRuleButton = () => {
    const newBtn: RuleButton = {
      emoji: "🔗",
      label: "Nuevo Enlace",
      description: "Haz clic para acceder al enlace.",
      url: "https://miyobimc.com",
    };
    setConfig({
      ...config,
      rules: {
        ...config.rules,
        buttons: [...ruleButtons, newBtn],
      },
    });
  };

  const handleUpdateRuleButton = (index: number, updated: Partial<RuleButton>) => {
    const next = [...ruleButtons];
    next[index] = { ...next[index], ...updated };
    setConfig({
      ...config,
      rules: {
        ...config.rules,
        buttons: next,
      },
    });
  };

  const handleRemoveRuleButton = (index: number) => {
    const next = ruleButtons.filter((_, i) => i !== index);
    setConfig({
      ...config,
      rules: {
        ...config.rules,
        buttons: next,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-3xl transition duration-300 hover:border-pink-500/30">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
              Personalización Exclusiva (Admin & Owner)
            </span>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white sm:text-4xl">
                  Personalizador del Bot de Discord
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Edita en tiempo real textos, imágenes, mensajes de bienvenida, descripciones de tickets y colores.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              Deshacer
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl border border-pink-500/40 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] transition hover:scale-105 hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)] active:scale-95 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mensaje de Estado */}
        {statusMessage && (
          <div
            className={`mt-6 rounded-2xl border p-4 text-sm font-medium transition ${
              statusMessage.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-rose-500/30 bg-rose-500/10 text-rose-300"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* NAVEGACIÓN POR PESTAÑAS */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => setActiveTab("welcome")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
              activeTab === "welcome"
                ? "border border-pink-500/40 bg-pink-500/20 text-pink-300 shadow-lg"
                : "border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Bienvenida & Despedida
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
              activeTab === "tickets"
                ? "border border-pink-500/40 bg-pink-500/20 text-pink-300 shadow-lg"
                : "border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Ticket className="h-4 w-4" />
            Sistema de Tickets
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rules")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
              activeTab === "rules"
                ? "border border-pink-500/40 bg-pink-500/20 text-pink-300 shadow-lg"
                : "border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FileText className="h-4 w-4" />
            Reglamento & Confesiones
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("theme")}
            className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition ${
              activeTab === "theme"
                ? "border border-pink-500/40 bg-pink-500/20 text-pink-300 shadow-lg"
                : "border border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Palette className="h-4 w-4" />
            Estilo & Colores
          </button>
        </div>
      </div>

      {/* CONTENIDO DE LAS PESTAÑAS */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* FORMULARIO DE EDICIÓN */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. PESTAÑA BIENVENIDA Y DESPEDIDA */}
          {activeTab === "welcome" && (
            <div className="space-y-6">
              {/* Bloque Bienvenida */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-pink-400" />
                    <h2 className="text-lg font-bold text-white">Sistema de Bienvenidas</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        welcome: { ...config.welcome, enabled: !config.welcome.enabled },
                      })
                    }
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    {config.welcome.enabled ? (
                      <ToggleRight className="h-7 w-7 text-pink-400" />
                    ) : (
                      <ToggleLeft className="h-7 w-7 text-zinc-600" />
                    )}
                    {config.welcome.enabled ? "Activado" : "Desactivado"}
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      ID Canal de Bienvenida
                    </label>
                    <input
                      type="text"
                      value={config.welcome.channelId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          welcome: { ...config.welcome, channelId: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      URL Imagen de Fondo (Canvas)
                    </label>
                    <input
                      type="text"
                      value={config.welcome.backgroundUrl}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          welcome: { ...config.welcome, backgroundUrl: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Título Encabezado
                    </label>
                    <input
                      type="text"
                      value={config.welcome.title}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          welcome: { ...config.welcome, title: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={config.welcome.subtitle}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          welcome: { ...config.welcome, subtitle: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Mensaje de Texto (Variables: <code className="text-pink-400">{"{user}"}</code>, <code className="text-pink-400">{"{username}"}</code>)
                    </label>
                    <input
                      type="text"
                      value={config.welcome.message}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          welcome: { ...config.welcome, message: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-pink-400 mb-2">
                      Color Embed Bienvenida (Independiente)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.welcome.embedColor || "#FF5FA2"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            welcome: { ...config.welcome, embedColor: e.target.value },
                          })
                        }
                        className="h-10 w-12 rounded-xl border-0 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.welcome.embedColor || "#FF5FA2"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            welcome: { ...config.welcome, embedColor: e.target.value },
                          })
                        }
                        className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque Despedida */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-rose-400" />
                    <h2 className="text-lg font-bold text-white">Sistema de Despedidas</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        goodbye: { ...config.goodbye, enabled: !config.goodbye.enabled },
                      })
                    }
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    {config.goodbye.enabled ? (
                      <ToggleRight className="h-7 w-7 text-pink-400" />
                    ) : (
                      <ToggleLeft className="h-7 w-7 text-zinc-600" />
                    )}
                    {config.goodbye.enabled ? "Activado" : "Desactivado"}
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      ID Canal de Despedida
                    </label>
                    <input
                      type="text"
                      value={config.goodbye.channelId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          goodbye: { ...config.goodbye, channelId: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      URL Imagen de Fondo (Canvas)
                    </label>
                    <input
                      type="text"
                      value={config.goodbye.backgroundUrl}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          goodbye: { ...config.goodbye, backgroundUrl: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Título Encabezado
                    </label>
                    <input
                      type="text"
                      value={config.goodbye.title}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          goodbye: { ...config.goodbye, title: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={config.goodbye.subtitle}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          goodbye: { ...config.goodbye, subtitle: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Mensaje de Texto
                    </label>
                    <input
                      type="text"
                      value={config.goodbye.message}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          goodbye: { ...config.goodbye, message: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                      Color Embed Despedida (Independiente)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.goodbye.embedColor || "#F43F5E"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            goodbye: { ...config.goodbye, embedColor: e.target.value },
                          })
                        }
                        className="h-10 w-12 rounded-xl border-0 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.goodbye.embedColor || "#F43F5E"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            goodbye: { ...config.goodbye, embedColor: e.target.value },
                          })
                        }
                        className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-rose-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PESTAÑA SISTEMA DE TICKETS */}
          {activeTab === "tickets" && (
            <div className="space-y-6">
              {/* Configuración Embed Principal */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <Ticket className="h-5 w-5 text-pink-400" />
                  <h2 className="text-lg font-bold text-white">Panel de Tickets (/setup-tickets)</h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Título del Panel de Tickets
                  </label>
                  <input
                    type="text"
                    value={config.tickets.panelTitle}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        tickets: { ...config.tickets, panelTitle: e.target.value },
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Descripción del Panel
                  </label>
                  <textarea
                    rows={3}
                    value={config.tickets.panelDescription}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        tickets: { ...config.tickets, panelDescription: e.target.value },
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      URL del Banner / Imagen Adjunta
                    </label>
                    <input
                      type="text"
                      value={config.tickets.panelImageUrl}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          tickets: { ...config.tickets, panelImageUrl: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-pink-400 mb-2">
                      Color Embed Tickets (Independiente)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.tickets.embedColor || "#DB0F64"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            tickets: { ...config.tickets, embedColor: e.target.value },
                          })
                        }
                        className="h-10 w-12 rounded-xl border-0 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.tickets.embedColor || "#DB0F64"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            tickets: { ...config.tickets, embedColor: e.target.value },
                          })
                        }
                        className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* GESTOR DE CATEGORÍAS Y SECCIONES DE TICKETS */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="h-5 w-5 text-pink-400" />
                      Categorías y Secciones de Tickets ({categories.length})
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Personaliza los emojis, nombres, descripciones e IDs de Discord para cada categoría.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="inline-flex items-center gap-2 rounded-xl border border-pink-500/40 bg-pink-500/20 px-4 py-2 text-xs font-bold text-pink-300 hover:bg-pink-500/30 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Categoría
                  </button>
                </div>

                <div className="space-y-4">
                  {categories.map((cat, index) => (
                    <div
                      key={cat.customId || index}
                      className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-4 transition hover:border-pink-500/30"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2 font-bold text-sm text-white">
                          <span className="rounded-lg bg-pink-500/20 px-2 py-1 text-pink-300 font-mono text-xs">
                            #{index + 1}
                          </span>
                          <span>{cat.emoji || "❓"}</span>
                          <span>{cat.label || "Sin título"}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(index)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Eliminar
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            Emoji (Unicode o Discord Custom)
                          </label>
                          <input
                            type="text"
                            value={cat.emoji}
                            onChange={(e) => handleUpdateCategory(index, { emoji: e.target.value })}
                            placeholder="Ej. <:mundo:1414703463224311961> o 🌍"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            Nombre de la Sección (Label)
                          </label>
                          <input
                            type="text"
                            value={cat.label}
                            onChange={(e) => handleUpdateCategory(index, { label: e.target.value })}
                            placeholder="Ej. Soporte General"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            ID Categoría Discord
                          </label>
                          <input
                            type="text"
                            value={cat.categoryId}
                            onChange={(e) => handleUpdateCategory(index, { categoryId: e.target.value })}
                            placeholder="ID del canal de categoría"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            Prefijo Canal de Ticket
                          </label>
                          <input
                            type="text"
                            value={cat.ticketNamePrefix}
                            onChange={(e) => handleUpdateCategory(index, { ticketNamePrefix: e.target.value })}
                            placeholder="Ej. 🌍-general-"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            ID Único del Botón (customId)
                          </label>
                          <input
                            type="text"
                            value={cat.customId}
                            onChange={(e) => handleUpdateCategory(index, { customId: e.target.value })}
                            placeholder="Ej. support_general"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            Título Encabezado Ticket
                          </label>
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => handleUpdateCategory(index, { title: e.target.value })}
                            placeholder="Título dentro del ticket"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                          Descripción de la Categoría
                        </label>
                        <input
                          type="text"
                          value={cat.description}
                          onChange={(e) => handleUpdateCategory(index, { description: e.target.value })}
                          placeholder="Explicación breve que se muestra en el panel de tickets"
                          className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. PESTAÑA REGLAMENTO Y CONFESIONES */}
          {activeTab === "rules" && (
            <div className="space-y-6">
              {/* Reglamento Embed */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <FileText className="h-5 w-5 text-pink-400" />
                  <h2 className="text-lg font-bold text-white">Reglamento Oficial (/enviar-reglas)</h2>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Título del Embed
                  </label>
                  <input
                    type="text"
                    value={config.rules.title}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        rules: { ...config.rules, title: e.target.value },
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Descripción / Introducción del Reglamento
                  </label>
                  <textarea
                    rows={3}
                    value={config.rules.description}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        rules: { ...config.rules, description: e.target.value },
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Enlace Principal del Reglamento (URL por defecto)
                    </label>
                    <input
                      type="text"
                      value={config.rules.rulesUrl}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          rules: { ...config.rules, rulesUrl: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-fuchsia-400 mb-2">
                      Color Embed Reglamento (Independiente)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.rules.embedColor || "#D92AF4"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            rules: { ...config.rules, embedColor: e.target.value },
                          })
                        }
                        className="h-10 w-12 rounded-xl border-0 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.rules.embedColor || "#D92AF4"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            rules: { ...config.rules, embedColor: e.target.value },
                          })
                        }
                        className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-fuchsia-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* GESTOR DE BOTONES Y ENLACES DEL REGLAMENTO */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Link className="h-5 w-5 text-pink-400" />
                      Botones y Enlaces Personalizados ({ruleButtons.length})
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Configura el emoji, etiqueta, descripción y la URL a la que te manda cada botón del reglamento.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddRuleButton}
                    className="inline-flex items-center gap-2 rounded-xl border border-pink-500/40 bg-pink-500/20 px-4 py-2 text-xs font-bold text-pink-300 hover:bg-pink-500/30 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar Botón / Enlace
                  </button>
                </div>

                <div className="space-y-4">
                  {ruleButtons.map((btn, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-4 transition hover:border-pink-500/30"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2 font-bold text-sm text-white">
                          <span className="rounded-lg bg-pink-500/20 px-2 py-1 text-pink-300 font-mono text-xs">
                            #{index + 1}
                          </span>
                          <span>{btn.emoji || "🔗"}</span>
                          <span>{btn.label || "Sin título"}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveRuleButton(index)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Eliminar
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            Emoji del Botón
                          </label>
                          <input
                            type="text"
                            value={btn.emoji}
                            onChange={(e) => handleUpdateRuleButton(index, { emoji: e.target.value })}
                            placeholder="Ej. 🌐, 🛒, 📜"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                            Etiqueta / Nombre
                          </label>
                          <input
                            type="text"
                            value={btn.label}
                            onChange={(e) => handleUpdateRuleButton(index, { label: e.target.value })}
                            placeholder="Ej. Sitio Web, Tienda, Reglas"
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1 flex items-center gap-1">
                            <span>URL de Destino (Enlace)</span>
                            <ExternalLink className="h-3 w-3 text-pink-400" />
                          </label>
                          <input
                            type="text"
                            value={btn.url}
                            onChange={(e) => handleUpdateRuleButton(index, { url: e.target.value })}
                            placeholder="https://miyobimc.com/..."
                            className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                          Descripción del Botón
                        </label>
                        <input
                          type="text"
                          value={btn.description}
                          onChange={(e) => handleUpdateRuleButton(index, { description: e.target.value })}
                          placeholder="Explicación breve que acompaña al botón"
                          className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Confesiones */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <MessageSquare className="h-5 w-5 text-pink-400" />
                  <h2 className="text-lg font-bold text-white">Confesiones Anónimas (/confesar)</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      ID Canal Público de Confesiones
                    </label>
                    <input
                      type="text"
                      value={config.confessions.channelId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          confessions: { ...config.confessions, channelId: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      ID Canal Log / Moderación
                    </label>
                    <input
                      type="text"
                      value={config.confessions.logChannelId}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          confessions: { ...config.confessions, logChannelId: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Pie de Página (Footer)
                    </label>
                    <input
                      type="text"
                      value={config.confessions.footerText}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          confessions: { ...config.confessions, footerText: e.target.value },
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                      Color Embed Confesiones (Independiente)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.confessions.embedColor || "#10B981"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            confessions: { ...config.confessions, embedColor: e.target.value },
                          })
                        }
                        className="h-10 w-12 rounded-xl border-0 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.confessions.embedColor || "#10B981"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            confessions: { ...config.confessions, embedColor: e.target.value },
                          })
                        }
                        className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. PESTAÑA ESTILO Y COLORES */}
          {activeTab === "theme" && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Palette className="h-5 w-5 text-pink-400" />
                <h2 className="text-lg font-bold text-white">Identidad Visual & Colores del Bot</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Color Primario (Hex Embeds)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.theme.primaryColor}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, primaryColor: e.target.value },
                        })
                      }
                      className="h-10 w-12 rounded-xl border-0 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.primaryColor}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, primaryColor: e.target.value },
                        })
                      }
                      className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Color Secundario (Neón)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.theme.secondaryColor}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, secondaryColor: e.target.value },
                        })
                      }
                      className="h-10 w-12 rounded-xl border-0 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.secondaryColor}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          theme: { ...config.theme, secondaryColor: e.target.value },
                        })
                      }
                      className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Texto del Pie de Página (Footer Global)
                </label>
                <input
                  type="text"
                  value={config.theme.footerText}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      theme: { ...config.theme, footerText: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  URL Logo Oficial (Icono Footer)
                </label>
                <input
                  type="text"
                  value={config.theme.logoUrl}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      theme: { ...config.theme, logoUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* VISTA PREVIA EN VIVO (PREVIEW CARD) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-24 rounded-3xl border border-white/10 bg-[#0c0c14]/90 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400 border-b border-white/10 pb-3 mb-4">
              <Layers className="h-4 w-4" />
              Vista Previa Embed Discord
            </div>

            <div
              className="rounded-2xl border-l-4 p-4 space-y-3 bg-[#11111c] text-white shadow-inner transition-colors duration-300"
              style={{ 
                borderLeftColor: activeTab === "tickets" 
                  ? (config.tickets.embedColor || config.theme.primaryColor || "#DB0F64")
                  : activeTab === "rules"
                  ? (config.rules.embedColor || config.theme.primaryColor || "#D92AF4")
                  : activeTab === "welcome"
                  ? (config.welcome.embedColor || config.theme.primaryColor || "#FF5FA2")
                  : (config.theme.primaryColor || "#FF5FA2")
              }}
            >
              <div className="flex items-center gap-2">
                {config.theme.logoUrl && (
                  <img
                    src={config.theme.logoUrl}
                    alt="Logo"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                )}
                <h3 className="font-bold text-sm text-white">
                  {activeTab === "tickets"
                    ? config.tickets.panelTitle
                    : activeTab === "rules"
                    ? config.rules.title
                    : config.welcome.title}
                </h3>
              </div>

              <p className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {activeTab === "tickets"
                  ? config.tickets.panelDescription
                  : activeTab === "rules"
                  ? config.rules.description
                  : config.welcome.message}
              </p>

              {/* VISTA PREVIA CATEGORÍAS DE TICKETS */}
              {activeTab === "tickets" && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-pink-400 block mb-1">
                    Componentes de Tickets V2
                  </span>
                  {categories.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5 text-xs"
                    >
                      <div className="flex-1 pr-2 min-w-0">
                        <div className="font-bold text-zinc-200 truncate">
                          {c.emoji || "❓"} • {c.label || "Categoría"}
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate">
                          {c.description}
                        </div>
                      </div>
                      <span className="shrink-0 rounded-lg bg-zinc-700/60 px-2.5 py-1 text-[10px] font-semibold text-zinc-200">
                        Abrir
                      </span>
                    </div>
                  ))}

                  {config.tickets.panelImageUrl && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={config.tickets.panelImageUrl}
                        alt="Banner"
                        className="w-full h-28 object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* VISTA PREVIA BOTONES DEL REGLAMENTO */}
              {activeTab === "rules" && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-pink-400 block mb-1">
                    Enlaces Interáctivos
                  </span>
                  {ruleButtons.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 border border-white/5 text-xs"
                    >
                      <div className="flex-1 pr-2 min-w-0">
                        <div className="font-bold text-zinc-200 truncate flex items-center gap-1">
                          <span>{b.emoji || "🔗"}</span>
                          <span>{b.label || "Enlace"}</span>
                        </div>
                        <div className="text-[11px] text-zinc-400 truncate">
                          {b.description}
                        </div>
                      </div>
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-pink-500/20 px-2 py-1 text-[10px] font-bold text-pink-300 border border-pink-500/30 hover:bg-pink-500/30"
                      >
                        <ExternalLink className="h-2.5 w-2.5" />
                        Abrir
                      </a>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                <span>{config.theme.footerText}</span>
                <span>Hoy a las {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-zinc-400 text-center">
              💡 Los cambios se sincronizan en vivo al hacer clic en <strong>Guardar Cambios</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
