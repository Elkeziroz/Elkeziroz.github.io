"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { UserCheck, Clock, Award, Sparkles, Send, Check, ArrowLeft, AlertCircle, LogIn, Mail, Disc as DiscordIcon, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerModal from "@/components/ui/ServerModal";
import { submitStaffApplication } from "@/actions/postulaciones";
import type { Question } from "@/app/staff/dashboard/configuracion/web/postulaciones/QuestionBuilderClient";

export default function PostulacionesClient({
  settings,
  session,
}: {
  settings?: Record<string, string>;
  session?: any;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isLoggedIn = !!session?.user;
  const user = session?.user;
  const isAppsOpen = settings?.applications_open !== "false";

  const appTitle = settings?.applications_title || "FORMULARIO DE STAFF";
  const appSlogan = settings?.applications_slogan || "Conéctate con tu cuenta de Discord para autorrellenar automáticamente tu usuario y correo verificado.";
  const closedMsg = settings?.applications_closed_msg || "Las postulaciones al equipo de Staff se encuentran cerradas en este momento.";

  // Dynamic questions list
  const dynamicQuestions: Question[] = useMemo(() => {
    try {
      if (settings?.application_questions_json) {
        const parsed = JSON.parse(settings.application_questions_json);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error parsing application_questions_json", e);
    }
    return [
      {
        id: "q_1",
        label: "Experiencia Previa en Staff (Opcional)",
        type: "text",
        options: "",
        required: false,
      },
      {
        id: "q_2",
        label: "¿Por qué te gustaría formar parte del equipo de Miyobi? *",
        type: "text",
        options: "",
        required: true,
      },
      {
        id: "q_3",
        label: "Situación: ¿Cómo actuarías si ves a un jugador usando hacks o tóxico? *",
        type: "text",
        options: "",
        required: true,
      },
    ];
  }, [settings]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoggedIn) {
      setErrorMsg("Debes iniciar sesión con Discord primero para verificar tu cuenta.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    try {
      await submitStaffApplication(formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg(err.message || "Error al enviar la postulación. Revisa los datos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar logoUrl={settings?.logo_url} onPlay={() => setOpenModal(true)} />

      <main className="bg-[#09090b] text-white min-h-screen">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20">
          <Image
            src={settings?.hero_bg_url || "/images/hero-bg.png"}
            alt="Postulación Staff Miyobi"
            fill
            priority
            className="object-cover scale-[1.03]"
          />

          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute left-1/2 top-[20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[220px]" />
          <div className="absolute right-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-fuchsia-400/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]" />

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-pink-400" /> {isAppsOpen ? "Postulaciones Abiertas" : "Postulaciones Cerradas"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-black tracking-[0.12em] text-white sm:text-6xl md:text-7xl"
            >
              {appTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl font-light text-zinc-300 max-w-2xl mx-auto"
            >
              {appSlogan}
            </motion.p>

            {/* REQUIREMENTS CARDS */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3 text-left">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
                  <DiscordIcon size={20} />
                </div>
                <h3 className="font-bold text-white text-sm">Discord Verificado</h3>
                <p className="mt-1 text-xs text-zinc-400">Autorrelleno automático y verificación instantánea.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-3">
                  <UserCheck size={20} />
                </div>
                <h3 className="font-bold text-white text-sm">Edad & Madurez</h3>
                <p className="mt-1 text-xs text-zinc-400">Recomendado 14+ años y actitud responsable.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-3">
                  <Clock size={20} />
                </div>
                <h3 className="font-bold text-white text-sm">Disponibilidad</h3>
                <p className="mt-1 text-xs text-zinc-400">Al menos 1-2 horas diarias para moderar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FORM CONTAINER */}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0a0a10]/95 p-8 sm:p-12 shadow-2xl backdrop-blur-3xl">

            {!isAppsOpen ? (
              /* APPLICATIONS CLOSED ALERT CARD */
              <div className="text-center py-12 space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Lock size={40} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Reclutamiento Pausado</h2>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  {closedMsg}
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                  >
                    <ArrowLeft size={16} /> Volver al Inicio
                  </Link>
                </div>
              </div>
            ) : !isLoggedIn ? (
              /* DISCORD LOGIN PROMPT */
              <div className="text-center py-12 space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <DiscordIcon size={40} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Inicia Sesión con Discord para Postular</h2>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Para evitar postulaciones falsas y verificar tu identidad, inicia sesión con Discord. Tu usuario y correo oficial se autorrellenarán automáticamente.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => signIn("discord")}
                    className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-[0_10px_35px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_50px_rgba(99,102,241,0.6)] active:scale-95"
                  >
                    <LogIn size={20} /> Iniciar Sesión con Discord
                  </button>
                </div>
              </div>
            ) : submitted ? (
              /* SUCCESS MESSAGE */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Check size={40} />
                </div>
                <h2 className="text-3xl font-black text-white">¡Postulación Enviada!</h2>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Gracias <strong className="text-pink-300">{user?.name}</strong>. Tu postulación vinculada a tu cuenta de Discord y correo verificado ha sido registrada correctamente.
                </p>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                  >
                    <ArrowLeft size={16} /> Volver al Inicio
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* APPLICATION FORM WITH DISCORD AUTOFILLED USER CARD & DYNAMIC QUESTIONS */
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* DISCORD VERIFIED USER CARD */}
                <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "Discord User"}
                        width={48}
                        height={48}
                        className="rounded-2xl border border-indigo-400/40 object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/30 text-indigo-300">
                        <DiscordIcon size={24} />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{user?.name}</span>
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                          Verificado ✓
                        </span>
                      </div>
                      <p className="text-xs text-indigo-200 flex items-center gap-1 mt-0.5">
                        <Mail size={12} /> {user?.email || "Sin correo"}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-zinc-400 italic">
                    Datos sincronizados desde Discord
                  </span>
                </div>

                {errorMsg && (
                  <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-xs font-semibold text-red-300 flex items-center gap-3">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* HIDDEN INPUTS FOR AUTOFILLED DISCORD DATA */}
                <input type="hidden" name="discordTag" value={user?.name || ""} />
                <input type="hidden" name="discordId" value={user?.discordId || ""} />
                <input type="hidden" name="email" value={user?.email || ""} />

                {/* Minecraft IGN & Discord Display Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Usuario de Minecraft (IGN) *
                    </label>
                    <input
                      name="minecraftName"
                      required
                      placeholder="Ej: Steve_MC"
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Discord Autorrellenado
                    </label>
                    <input
                      value={`${user?.name} (${user?.email})`}
                      disabled
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-mono text-indigo-300 cursor-not-allowed opacity-80"
                    />
                  </div>
                </div>

                {/* Edad & País Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Edad *
                    </label>
                    <input
                      name="age"
                      type="number"
                      required
                      min={12}
                      max={99}
                      placeholder="16"
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      País / Zona Horaria *
                    </label>
                    <input
                      name="country"
                      required
                      placeholder="Ej: México (GMT-6)"
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                    />
                  </div>
                </div>

                {/* Rango & Horas Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Rango al que Postulas *
                    </label>
                    <select
                      name="roleApplying"
                      required
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
                    >
                      <option value="Helper / Soporte" className="bg-[#09090b]">Helper / Soporte</option>
                      <option value="Moderador" className="bg-[#09090b]">Moderador</option>
                      <option value="Builder / Constructor" className="bg-[#09090b]">Builder / Constructor</option>
                      <option value="Creador de Contenido" className="bg-[#09090b]">Creador de Contenido / Streamer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                      Disponibilidad Diaria *
                    </label>
                    <select
                      name="hoursPerDay"
                      required
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
                    >
                      <option value="1 a 2 horas al día" className="bg-[#09090b]">1 a 2 horas al día</option>
                      <option value="3 a 4 horas al día" className="bg-[#09090b]">3 a 4 horas al día</option>
                      <option value="5+ horas al día" className="bg-[#09090b]">5+ horas al día</option>
                    </select>
                  </div>
                </div>

                {/* DYNAMIC QUESTIONS RENDERED FROM ADMIN CONFIGURATION */}
                <div className="space-y-6 pt-4 border-t border-white/10">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-pink-400">
                    Preguntas Específicas de Evaluación
                  </h3>

                  {dynamicQuestions.map((q) => {
                    const inputName = `dyn_${q.label}`;

                    if (q.type === "choice") {
                      const opts = q.options
                        ? q.options.split(",").map((o) => o.trim()).filter(Boolean)
                        : ["Sí", "No"];

                      return (
                        <div key={q.id}>
                          <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                            {q.label} {q.required && "*"}
                          </label>
                          <select
                            name={inputName}
                            required={q.required}
                            className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-pink-500 transition"
                          >
                            <option value="" className="bg-[#09090b]">-- Selecciona una opción --</option>
                            {opts.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#09090b]">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }

                    return (
                      <div key={q.id}>
                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                          {q.label} {q.required && "*"}
                        </label>
                        <textarea
                          name={inputName}
                          required={q.required}
                          rows={3}
                          placeholder="Escribe tu respuesta aquí..."
                          className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Submit button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-pink-500 px-8 py-4 text-base font-bold text-white shadow-[0_10px_35px_rgba(236,72,153,0.4)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_15px_50px_rgba(236,72,153,0.6)] active:scale-95 disabled:opacity-50"
                  >
                    <Send size={18} />
                    {loading ? "Enviando postulación..." : "Enviar Formulario de Postulación"}
                  </button>
                </div>
              </form>
            )}
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
