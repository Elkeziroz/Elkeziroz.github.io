"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Coins,
  Users,
  Swords,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Gamepad2,
  CheckCircle2,
  Maximize2,
  Terminal,
  X,
  Zap,
  Compass,
  HelpCircle,
  Star,
  ImageIcon,
  Sparkle
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerModal from "@/components/ui/ServerModal";
import Button from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";

// Survival Mechanics
const SURVIVAL_FEATURES = [
  {
    title: "Protecciones de Terreno (Claims)",
    description: "Evita el grifeo y robos asegurando tu terreno de forma rápida con el comando /claim o bloques de protección.",
    icon: Shield,
    badge: "Anti-Grifeo",
    color: "from-pink-500/20 to-pink-500/5 text-pink-300"
  },
  {
    title: "Economía Real & Subastas (/ah)",
    description: "Comercia libremente con otros jugadores en la Casa de Subastas o vende tus excedentes de recursos en la tienda.",
    icon: Coins,
    badge: "Comercio Libre",
    color: "from-amber-500/20 to-amber-500/5 text-amber-300"
  },
  {
    title: "Sistema de Trabajos (Jobs)",
    description: "Gana dinero mientras juegas seleccionando entre profesiones como Minero, Leñador, Agricultor o Cazador.",
    icon: Zap,
    badge: "Dinero Activo",
    color: "from-cyan-500/20 to-cyan-500/5 text-cyan-300"
  },
  {
    title: "Clanes & Clasificación Global",
    description: "Crea tu propio clan con tus amigos, sube de nivel el banco del clan y lucha por estar en el Top 1 del servidor.",
    icon: Users,
    badge: "Competitivo",
    color: "from-violet-500/20 to-violet-500/5 text-violet-300"
  },
  {
    title: "Dungeons & Jefes Custom",
    description: "Adéntrate en mazmorras peligrosas, enfréntate a jefes poderosos con tu equipo y consigue botín legendario.",
    icon: Swords,
    badge: "PvE Épico",
    badgeColor: "border-red-500/30 text-red-300 bg-red-500/10",
    color: "from-red-500/20 to-red-500/5 text-red-300"
  },
  {
    title: "Misiones & Recompensas Diarias",
    description: "Completa retos diarios (/daily) para ganar llaves de cajas misteriosas, dinero y potenciadores de experiencia.",
    icon: Sparkles,
    badge: "Recompensas",
    color: "from-emerald-500/20 to-emerald-500/5 text-emerald-300"
  }
];

// Survival Commands
const SURVIVAL_COMMANDS = [
  { cmd: "/claim", desc: "Protege el terreno en el que te encuentras parado." },
  { cmd: "/claim trust <jugador>", desc: "Otorga permisos a un amigo en tu protección." },
  { cmd: "/rtp", desc: "Teletransporte aleatorio para buscar terreno libre." },
  { cmd: "/sethome [nombre]", desc: "Guarda tu ubicación actual como hogar." },
  { cmd: "/home [nombre]", desc: "Viaja instantáneamente a tu hogar guardado." },
  { cmd: "/ah", desc: "Abre el mercado de subastas entre jugadores." },
  { cmd: "/jobs join <trabajo>", desc: "Únete a un trabajo para empezar a ganar monedas." },
  { cmd: "/daily", desc: "Reclama tu recompensa diaria en el servidor." },
];

// Survival Gallery Items
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Spawn Principal de Survival",
    category: "Spawn",
    image: "/images/survival.png",
    description: "El punto de encuentro inicial rodeado de portales, tiendas y PNJ de misiones."
  },
  {
    id: 2,
    title: "Construcciones de la Comunidad",
    category: "Villas",
    image: "/images/hero-bg.png",
    description: "Ciudades y bases protegidas creadas por los jugadores de la comunidad."
  },
  {
    id: 3,
    title: "Zona de Cajas & Mercado",
    category: "Mercado",
    image: "/images/boxpvp.png",
    description: "El centro neurálgico del comercio donde abrir tus llaves y vender ítems."
  },
  {
    id: 4,
    title: "Mapa del Mundo Survival 1.20+",
    category: "Villas",
    image: "/images/survival.png",
    description: "Un mundo masivo listo para explorar con estructuras y biomas generados."
  }
];

// Survival FAQs
const SURVIVAL_FAQS = [
  {
    q: "¿Cómo aseguro mi primera casa en Survival?",
    a: "Usa el comando /claim al estar sobre tu construcción o coloca el bloque de protección que recibes en tu kit inicial. El terreno quedará 100% protegido contra otros jugadores."
  },
  {
    q: "¿Puedo jugar con amigos en la misma protección?",
    a: "¡Claro que sí! Usa el comando /claim trust <nombre_jugador> para darle permisos completos de construcción y apertura de cofres a tu compañero."
  },
  {
    q: "¿Cómo consigo dinero rápido para comprar en la tienda?",
    a: "Te recomendamos unirte a un trabajo con /jobs y luego vender tus minerales o cultivos cosechados en la Casa de Subastas (/ah) a otros jugadores."
  },
  {
    q: "¿Hay límite de hogares (homes)?",
    a: "Los usuarios normales cuentan con varios homes con /sethome. Al adquirir rangos VIP en la tienda obtienes espacio para homes ilimitados y comandos exclusivos."
  }
];

export default function SurvivalClient({ settings }: { settings?: Record<string, string> }) {
  const [openModal, setOpenModal] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("Todas");
  const [lightboxImage, setLightboxImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Copy handler
  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setToastMessage(`Copiado "${label}"`);
    setTimeout(() => {
      setCopiedCmd(null);
      setToastMessage(null);
    }, 2500);
  }, []);

  const galleryItems = useMemo(() => [
    {
      id: 1,
      title: "Spawn Principal de Survival",
      category: "Spawn",
      image: settings?.survival_gallery_1 || "/images/survival.png",
      description: "El punto de encuentro inicial rodeado de portales, tiendas y PNJ de misiones."
    },
    {
      id: 2,
      title: "Construcciones de la Comunidad",
      category: "Villas",
      image: settings?.survival_gallery_2 || "/images/hero-bg.png",
      description: "Ciudades y bases protegidas creadas por los jugadores de la comunidad."
    },
    {
      id: 3,
      title: "Zona de Cajas & Mercado",
      category: "Mercado",
      image: settings?.survival_gallery_3 || "/images/boxpvp.png",
      description: "El centro neurálgico del comercio donde abrir tus llaves y vender ítems."
    },
    {
      id: 4,
      title: "Mapa del Mundo Survival 1.20+",
      category: "Villas",
      image: settings?.survival_gallery_4 || "/images/survival.png",
      description: "Un mundo masivo listo para explorar con estructuras y biomas generados."
    }
  ], [settings]);

  // Filter gallery
  const filteredGallery = useMemo(() => {
    if (selectedGalleryCategory === "Todas") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedGalleryCategory);
  }, [selectedGalleryCategory, galleryItems]);

  return (
    <>
      <Navbar logoUrl={settings?.logo_url} onPlay={() => setOpenModal(true)} />

      <main className="bg-[#09090b] text-white">

        {/* HERO SECTION MATCHING HOME PAGE AESTHETICS */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20">
          {/* Background Image */}
          <Image
            src={settings?.survival_bg_url || "/images/survival.png"}
            alt="Miyobi Survival Custom"
            fill
            priority
            className="object-cover scale-[1.03]"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute left-1/2 top-[20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[220px]" />
          <div className="absolute right-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-fuchsia-400/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]" />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
            }}
          />

          {/* Bottom Gradient Transition to #09090b */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />

          {/* HERO CONTENT */}
          <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md"
              >
                <Shield size={14} className="text-pink-400" /> Modalidad Principal
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="select-none text-4xl font-black tracking-[0.15em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,.7)] sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {settings?.survival_title || "SURVIVAL 1.20+"}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="mt-6 text-xl font-light leading-relaxed text-white/95 sm:text-2xl"
              >
                {settings?.survival_slogan || "Supervivencia mejorada, economía real y comunidad sin límites."}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.8 }}
                className="mt-4 max-w-2xl text-base leading-8 text-white/70 mx-auto"
              >
                Protege tus construcciones, únete a un trabajo, participa en subastas entre jugadores y compite con tu clan en un universo diseñado para durar.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button size="lg" onClick={() => setOpenModal(true)}>
                  JUGAR EN SURVIVAL
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    const galleryElem = document.getElementById("galeria");
                    galleryElem?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  VER GALERÍA
                </Button>
              </motion.div>

            </div>

            {/* QUICK STATS & IPS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { label: "Protección", val: "Claims Anti-Grifeo", icon: Shield },
                { label: "Economía", val: "Subastas + Jobs", icon: Coins },
                { label: "Comunidad", val: "Clanes & Dungeons", icon: Users },
                { label: "Versión", val: "Java & Bedrock 1.20+", icon: Gamepad2 }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10 text-center"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-3">
                      <Icon size={20} />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-white/50">{item.label}</p>
                    <p className="mt-1 text-sm font-bold text-white">{item.val}</p>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </section>

        {/* MECHANICS & FEATURES SECTION */}
        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
              <Sparkles size={14} /> MECÁNICAS DE JUEGO
            </span>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">
              ¿Qué hace especial a nuestro Survival?
            </h2>
            <p className="mt-4 text-base text-white/70">
              Diseñado desde cero para ofrecer diversión continua tanto a constructores como a aventureros y comerciantes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SURVIVAL_FEATURES.map((feat) => {
              const Icon = feat.icon;

              return (
                <div
                  key={feat.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:bg-white/10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feat.color} border border-white/10`}>
                        <Icon size={24} />
                      </div>
                      <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-[11px] font-bold text-pink-300">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">{feat.title}</h3>
                    <p className="mt-3 text-xs sm:text-sm leading-6 text-white/75">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AESTHETIC IMAGE GALLERY SECTION */}
        <section id="galeria" className="scroll-mt-24 border-t border-white/10 bg-black/30 py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
                  <ImageIcon size={14} /> CAPTURAS EN VIVO
                </span>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">
                  Galería de Survival
                </h2>
                <p className="mt-3 text-sm text-white/70 max-w-xl">
                  Descubre los escenarios, zonas de spawn y construcciones creadas en nuestro servidor.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl w-fit">
                {["Todas", "Spawn", "Villas", "Mercado"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedGalleryCategory(cat)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      selectedGalleryCategory === cat
                        ? "bg-pink-500 text-white shadow-lg"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* IMAGE GRID */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredGallery.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setLightboxImage(item)}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl transition duration-500 hover:border-pink-500/50 hover:shadow-[0_20px_50px_rgba(236,72,153,0.2)]"
                  >
                    <div className="relative h-72 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition" />

                      {/* Top Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full border border-pink-500/30 bg-black/60 px-3 py-1 text-xs font-bold text-pink-300 backdrop-blur-md">
                          {item.category}
                        </span>
                      </div>

                      {/* Expand Icon Hover Button */}
                      <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300">
                        <Maximize2 size={16} />
                      </div>

                      {/* Caption Content */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/70 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* COMMANDS CHEAT SHEET FOR SURVIVAL */}
        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
                <Terminal size={14} /> GUÍA RÁPIDA
              </span>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Comandos de Survival
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Haz clic en cualquier comando para copiarlo a tu portapapeles.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SURVIVAL_COMMANDS.map((cmdItem) => (
              <div
                key={cmdItem.cmd}
                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-xs font-bold text-pink-300 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-xl">
                      {cmdItem.cmd}
                    </code>
                    <button
                      onClick={() => handleCopy(cmdItem.cmd, cmdItem.cmd)}
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-pink-500/40 hover:bg-pink-500 hover:text-white"
                      title="Copiar comando"
                    >
                      {copiedCmd === cmdItem.cmd ? (
                        <Check size={14} className="text-green-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-white/75">
                    {cmdItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SURVIVAL FAQ ACCORDION */}
        <section className="border-t border-white/10 bg-black/20 py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
                <HelpCircle size={14} /> PREGUNTAS SOBRE SURVIVAL
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Preguntas Frecuentes de Survival
              </h2>
            </div>

            <div className="mt-10 space-y-4">
              {SURVIVAL_FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-xl transition duration-300 hover:border-pink-500/40"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3 pr-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-500/20 text-xs text-pink-300 font-mono border border-pink-500/30">
                          ?
                        </span>
                        {faq.q}
                      </span>
                      <X
                        size={18}
                        className={`text-pink-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "rotate-0 opacity-60"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-white/5 bg-black/40 px-6 py-5"
                        >
                          <p className="text-xs sm:text-sm leading-7 text-white/80">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <CTA onPlay={() => setOpenModal(true)} />

      </main>

      <Footer settings={settings} />

      {/* SERVER MODAL */}
      <ServerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        ipJava={settings?.ip_java}
        ipBedrock={settings?.ip_bedrock}
        portBedrock={settings?.port_bedrock}
      />

      {/* LIGHTBOX IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full overflow-hidden rounded-3xl border border-white/20 bg-[#09090b] shadow-2xl"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-pink-500 transition"
              >
                <X size={20} />
              </button>

              <div className="relative h-[60vh] sm:h-[70vh] w-full">
                <Image
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-black/80 border-t border-white/10">
                <span className="rounded-full bg-pink-500/20 border border-pink-500/30 px-3 py-1 text-xs font-bold text-pink-300">
                  {lightboxImage.category}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white">{lightboxImage.title}</h3>
                <p className="mt-2 text-sm text-white/70">{lightboxImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-pink-500/40 bg-black/90 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              <Check size={14} />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
