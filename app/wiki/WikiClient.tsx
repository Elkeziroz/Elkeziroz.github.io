"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ShieldCheck,
  Users,
  Search,
  Copy,
  Check,
  Terminal,
  ChevronDown,
  Zap,
  Coins,
  Swords,
  Shield,
  Layers,
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  X,
  HelpCircle,
  Star,
  Compass
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerModal from "@/components/ui/ServerModal";
import Button from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";

// Category definitions
const CATEGORIES = [
  { id: "todos", label: "Todo", icon: Layers },
  { id: "guias", label: "Primeros Pasos", icon: BookOpen },
  { id: "comandos", label: "Comandos", icon: Terminal },
  { id: "modalidades", label: "Modalidades", icon: Gamepad2 },
  { id: "economia", label: "Economía", icon: Coins },
  { id: "reglas", label: "Reglas", icon: ShieldCheck },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

// Interactive Commands dataset
const COMMANDS = [
  {
    cmd: "/spawn",
    desc: "Teleporta inmediatamente al punto de aparición principal del servidor.",
    category: "General",
    tags: ["Esencial", "Teletransporte"],
    popular: true
  },
  {
    cmd: "/rtp",
    desc: "Teletransporte aleatorio al mapa para explorar o buscar terreno donde construir.",
    category: "Survival",
    tags: ["Exploración", "Survival"],
    popular: true
  },
  {
    cmd: "/sethome [nombre]",
    desc: "Guarda tu ubicación actual como punto de hogar para volver cuando quieras.",
    category: "General",
    tags: ["Hogar", "Esencial"],
    popular: true
  },
  {
    cmd: "/home [nombre]",
    desc: "Te teletransporta a uno de tus hogares guardados.",
    category: "General",
    tags: ["Hogar"]
  },
  {
    cmd: "/tpa <jugador>",
    desc: "Envía una solicitud de teletransporte a otro jugador conectado.",
    category: "General",
    tags: ["Social"],
    popular: true
  },
  {
    cmd: "/tpaccept",
    desc: "Acepta la solicitud de teletransporte enviada por otro jugador.",
    category: "General",
    tags: ["Social"]
  },
  {
    cmd: "/claim",
    desc: "Protege el área en la que estás parado para evitar grifeos o robos.",
    category: "Survival",
    tags: ["Protección", "Seguridad"],
    popular: true
  },
  {
    cmd: "/claim trust <jugador>",
    desc: "Otorga permisos de construcción y uso en tu terreno protegido a un amigo.",
    category: "Survival",
    tags: ["Protección", "Amigos"]
  },
  {
    cmd: "/ah",
    desc: "Abre la casa de subastas (Auction House) para comprar y vender objetos entre jugadores.",
    category: "Economía",
    tags: ["Mercado", "Ventas"],
    popular: true
  },
  {
    cmd: "/shop",
    desc: "Accede a la tienda virtual del servidor para comprar minerales, bloques e ítems.",
    category: "Economía",
    tags: ["Tienda"]
  },
  {
    cmd: "/balance",
    desc: "Muestra tu saldo de dinero actual en el servidor.",
    category: "Economía",
    tags: ["Dinero"]
  },
  {
    cmd: "/pay <jugador> <cantidad>",
    desc: "Transfiere dinero de tu saldo directamente a otro jugador.",
    category: "Economía",
    tags: ["Dinero", "Transferencia"]
  },
  {
    cmd: "/clan create <nombre>",
    desc: "Crea tu propio clan para competir con tus amigos en la clasificación global.",
    category: "Clanes",
    tags: ["Clanes", "PvP"]
  },
  {
    cmd: "/clan deposit <cantidad>",
    desc: "Deposita monedas en el banco del clan para financiar mejoras y habilidades.",
    category: "Clanes",
    tags: ["Clanes", "Banco"]
  },
  {
    cmd: "/warp [lugar]",
    desc: "Viaja rápidamente a los puntos de interés principales (pvp, minas, eventos).",
    category: "General",
    tags: ["Teletransporte"]
  },
  {
    cmd: "/daily",
    desc: "Reclama tu recompensa diaria por conectarte a Miyobi.",
    category: "General",
    tags: ["Recompensas"],
    popular: true
  },
  {
    cmd: "/mina",
    desc: "Teleporta a las minas activas para farmear materiales (BoxPvP / Survival).",
    category: "BoxPvP",
    tags: ["Farm", "BoxPvP"],
    popular: true
  },
  {
    cmd: "/crates",
    desc: "Teleporta a la zona de cajas misteriosas para abrir tus llaves y conseguir botín.",
    category: "BoxPvP",
    tags: ["Llaves", "Botín"]
  }
];

// Modes guide dataset
const MODES_INFO = [
  {
    id: "survival",
    title: "Survival Custom 1.20+",
    icon: Shield,
    badge: "Popular",
    badgeColor: "border-pink-500/40 bg-pink-500/10 text-pink-300",
    description: "Una experiencia de supervivencia mejorada con economía equilibrada, protecciones de terreno, misiones diarias, subastas y un sistema de clanes único.",
    stats: [
      { label: "Dificultad", val: "Normal +" },
      { label: "Protección", val: "Claims" },
      { label: "Economía", val: "Subastas / Jobs" }
    ],
    highlights: [
      "Sistema de Claims anti-grifeo intuitivo y seguro.",
      "Trabajos (Jobs) para ganar dinero al minar, pescar o talar.",
      "Mercado de subastas (/ah) activo entre jugadores.",
      "Dungeons y jefes personalizados con botín exclusivo."
    ]
  },
  {
    id: "boxpvp",
    title: "BoxPvP Extreme",
    icon: Swords,
    badge: "PvP & Acción",
    badgeColor: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    description: "Compite en minas tematizadas, craftea armaduras legendarias y domina las arenas de combate constante. Progresión rápida y llena de adrenalina.",
    stats: [
      { label: "Minas", val: "15+ Rangos" },
      { label: "Combate", val: "Arena KOTH" },
      { label: "Encantamientos", val: "Custom Nivel Max" }
    ],
    highlights: [
      "Minas por rangos progresivos con tradeos únicos.",
      "Encantamientos especiales y Shards de poder.",
      "Cajas (Crates) de botín épico con llaves obtenibles en eventos.",
      "Zona KOTH (King of the Hill) y eventos de arena automáticos."
    ]
  }
];

// FAQ dataset
const FAQS = [
  {
    q: "¿Cómo me conecto al servidor desde Bedrock (Consolas, Móvil, Windows)?",
    a: "Para conectarte desde Minecraft Bedrock usa la IP: bedrock.miyobi.gg con el puerto por defecto (19132). Es compatible con las versiones oficiales más recientes."
  },
  {
    q: "¿Cómo puedo proteger mis construcciones contra grifeos?",
    a: "En Survival puedes usar el comando /claim o colocar tu bloque de protección inicial. Invita a tus amigos con /claim trust <jugador> para otorgarles permisos específicos."
  },
  {
    q: "¿Cómo consigo dinero dentro del servidor?",
    a: "Gana monedas uniéndote a un trabajo (/jobs), vendiendo minerales y objetos en la tienda (/shop), comerciando con otros usuarios en la casa de subastas (/ah) o completando misiones diarias."
  },
  {
    q: "¿Qué hago si pierdo mis cosas o encuentro un error?",
    a: "Nuestro equipo de Staff está disponible 24/7. Abre un ticket de soporte de inmediato en nuestro servidor de Discord o consulta a un Administrador en el juego."
  },
  {
    q: "¿Hay kits gratuitos para nuevos jugadores?",
    a: "¡Sí! Al entrar por primera vez recibes tu kit inicial de inicio. Además, utiliza el comando /daily todos los días para obtener recompensas extra como monedas, llaves y pociones."
  }
];

// Rules dataset
const RULES = [
  {
    title: "Respeto & Convivencia",
    description: "Queda prohibido el acoso, la discriminación, los insultos graves o el spam masivo en chat público y privado.",
    icon: Users
  },
  {
    title: "Cero Cheats / Hacks",
    description: "No se permite el uso de clientes modificados (KillAura, Fly, X-Ray), macros o autoclickers que otorguen ventajas injustas.",
    icon: ShieldCheck
  },
  {
    title: "Prohibido Explotar Bugs",
    description: "Cualquier error o bug debe reportarse al Staff. Duplicar objetos o abusar de fallos causará sanción permanente.",
    icon: Zap
  },
  {
    title: "Fair Play & Construcción",
    description: "Respeta las protecciones ajenas. No construyas estructuras ofensivas ni hagas trampas de spawn.",
    icon: BookOpen
  }
];

export default function WikiClient({ settings }: { settings?: Record<string, string> }) {
  const [openModal, setOpenModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [commandSubCategory, setCommandSubCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Copy helper
  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`Copiado "${label}" al portapapeles`);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  // Filter commands
  const filteredCommands = useMemo(() => {
    return COMMANDS.filter((cmd) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        cmd.cmd.toLowerCase().includes(query) ||
        cmd.desc.toLowerCase().includes(query) ||
        cmd.tags.some((t) => t.toLowerCase().includes(query));

      const matchesSubCat =
        commandSubCategory === "Todos" ||
        cmd.category === commandSubCategory ||
        (commandSubCategory === "Populares" && cmd.popular);

      const matchesMainCat =
        activeCategory === "todos" ||
        activeCategory === "comandos" ||
        (activeCategory === "economia" && cmd.category === "Economía") ||
        (activeCategory === "modalidades" && (cmd.category === "Survival" || cmd.category === "BoxPvP")) ||
        (activeCategory === "guias" && cmd.category === "General");

      return matchesSearch && matchesSubCat && matchesMainCat;
    });
  }, [searchQuery, commandSubCategory, activeCategory]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return FAQS;
    const query = searchQuery.toLowerCase();
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <Navbar onPlay={() => setOpenModal(true)} />

      <main className="bg-[#09090b] text-white">

        {/* HERO SECTION MATCHING HOME PAGE BACKGROUND & STYLE */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-20">
          {/* Background Image (Same as Home Page Hero) */}
          <Image
            src={settings?.wiki_bg_url || "/images/hero-bg.png"}
            alt="Miyobi Wiki"
            fill
            priority
            className="object-cover scale-[1.03]"
          />

          {/* Dark Overlays (Same as Home Page Background) */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute left-1/2 top-[25%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[220px]" />
          <div className="absolute right-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-fuchsia-400/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

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

              {/* Badge (Same as Home Page) */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md"
              >
                {settings?.wiki_badge || "Guía & Wiki Oficial"}
              </motion.div>

              {/* Title (Same typography structure as Home Page Title) */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="select-none text-4xl font-black tracking-[0.15em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,.65)] sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {settings?.wiki_title || "MIYOBI WIKI"}
              </motion.h1>

              {/* Slogan */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="mt-6 text-xl font-light leading-relaxed text-white/95 sm:text-2xl"
              >
                {settings?.wiki_slogan || "Todo el conocimiento para dominar el servidor."}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.8 }}
                className="mt-4 max-w-2xl text-base leading-8 text-white/70 mx-auto"
              >
                {settings?.wiki_description || "Consulta comandos interactivos, guías de modalidad, reglas de la comunidad y respuestas rápidas."}
              </motion.p>

              {/* SEARCH INPUT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative mt-8 mx-auto max-w-2xl"
              >
                <div className="relative flex items-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-1 shadow-2xl backdrop-blur-2xl transition duration-300 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300 shrink-0 ml-1">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar comandos, reglas, guías o FAQs (ej: /claim, IP, subastas)..."
                    className="w-full bg-transparent px-4 py-3 text-base text-white placeholder-white/50 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition"
                      title="Limpiar búsqueda"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Search suggestions */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="text-white/60 font-medium">Búsquedas rápidas:</span>
                  {[
                    { label: "/claim", icon: Shield },
                    { label: "IP Bedrock", icon: Gamepad2 },
                    { label: "/ah", icon: Coins },
                    { label: "Survival", icon: Compass },
                    { label: "/rtp", icon: Zap }
                  ].map((sug) => {
                    const Icon = sug.icon;
                    return (
                      <button
                        key={sug.label}
                        onClick={() => setSearchQuery(sug.label)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 transition duration-200 hover:border-pink-500/50 hover:bg-white/15 hover:text-white"
                      >
                        <Icon size={12} className="text-pink-400" />
                        {sug.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

            </div>

            {/* QUICK IPS & SERVERS CARDS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Java IP Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Servidor Java</h3>
                      <p className="text-xs text-white/60">PC • Versión 1.20+</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                    Online
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <code className="font-mono text-sm font-semibold text-pink-300">
                    miyobi.minehut.gg
                  </code>
                  <button
                    onClick={() => handleCopy("miyobi.minehut.gg", "IP Java")}
                    className="flex items-center gap-1.5 rounded-xl bg-pink-500/20 border border-pink-500/30 px-3 py-1.5 text-xs font-semibold text-pink-200 hover:bg-pink-500 hover:text-white transition"
                  >
                    <Copy size={13} />
                    Copiar IP
                  </button>
                </div>
              </div>

              {/* Bedrock IP Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                      <Gamepad2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Servidor Bedrock</h3>
                      <p className="text-xs text-white/60">Consolas / Móviles / Windows</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
                    Online
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <code className="font-mono text-sm font-semibold text-fuchsia-300">
                    bedrock.miyobi.gg
                  </code>
                  <button
                    onClick={() => handleCopy("bedrock.miyobi.gg", "IP Bedrock")}
                    className="flex items-center gap-1.5 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 px-3 py-1.5 text-xs font-semibold text-fuchsia-200 hover:bg-pink-500 hover:text-white transition"
                  >
                    <Copy size={13} />
                    Copiar IP
                  </button>
                </div>
              </div>

              {/* Highlights & Actions Card */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10 sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    <Star size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Comunidad & Tienda</h3>
                    <p className="text-xs text-white/60">Discord oficial y Rangos VIP</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <Link
                    href="/tienda"
                    className="flex-1 text-center rounded-2xl border border-pink-500/30 bg-pink-500/20 py-2.5 text-xs font-bold text-pink-300 transition hover:bg-pink-500 hover:text-white"
                  >
                    Ver Tienda VIP
                  </Link>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="flex-1 text-center rounded-2xl border border-white/20 bg-white/10 py-2.5 text-xs font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
                  >
                    Instrucciones
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* STICKY CATEGORIES FILTER BAR */}
        <section className="sticky top-0 z-40 border-y border-white/10 bg-[#09090b]/95 backdrop-blur-2xl py-3 shadow-2xl">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2 py-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`group flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition duration-300 ${
                      isActive
                        ? "border border-pink-500/50 bg-pink-500/20 text-pink-300 shadow-[0_0_25px_rgba(236,72,153,0.25)]"
                        : "border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-pink-400" : "text-white/60 group-hover:text-white"} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* MAIN WIKI CONTENT */}
        <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8 space-y-24">

          {/* COMMANDS CHEAT SHEET */}
          {(activeCategory === "todos" || activeCategory === "comandos" || activeCategory === "economia" || activeCategory === "guias" || activeCategory === "modalidades") && (
            <div className="scroll-mt-20" id="comandos">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
                    <Terminal size={14} /> CHEAT-SHEET OFICIAL
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    Comandos del Servidor
                  </h2>
                  <p className="mt-1 text-sm text-white/70">
                    Haz clic en cualquier comando para copiarlo a tu portapapeles al instante.
                  </p>
                </div>

                {/* Subcategory Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-2xl w-fit">
                  {["Todos", "Populares", "General", "Survival", "Economía", "Clanes", "BoxPvP"].map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => setCommandSubCategory(subCat)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                        commandSubCategory === subCat
                          ? "bg-pink-500 text-white shadow-md"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {subCat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commands Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredCommands.map((cmdItem) => (
                    <motion.div
                      layout
                      key={cmdItem.cmd}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <code className="font-mono text-sm font-bold text-pink-300 bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 rounded-xl tracking-tight">
                            {cmdItem.cmd}
                          </code>
                          <button
                            onClick={() => handleCopy(cmdItem.cmd, cmdItem.cmd)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-pink-500/40 hover:bg-pink-500 hover:text-white shrink-0"
                            title="Copiar comando"
                          >
                            <Copy size={14} />
                          </button>
                        </div>

                        <p className="mt-4 text-xs sm:text-sm leading-6 text-white/80">
                          {cmdItem.desc}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/5">
                        <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                          {cmdItem.category}
                        </span>
                        {cmdItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-pink-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredCommands.length === 0 && (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-white/60">
                  <Search className="mx-auto h-8 w-8 text-pink-400 mb-3 opacity-60" />
                  <p className="text-lg font-semibold text-white">No se encontraron comandos</p>
                  <p className="text-sm mt-1">Prueba seleccionando &quot;Todos&quot; o borra la búsqueda.</p>
                </div>
              )}
            </div>
          )}

          {/* GAME MODES SECTION */}
          {(activeCategory === "todos" || activeCategory === "modalidades" || activeCategory === "guias") && (
            <div className="scroll-mt-20" id="modalidades">
              <div className="border-b border-white/10 pb-6">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
                  <Gamepad2 size={14} /> NUESTROS UNIVERSOS
                </span>
                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                  Modalidades de Juego
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Explora las mecánicas únicas de nuestras modalidades principales.
                </p>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {MODES_INFO.map((mode) => {
                  const Icon = mode.icon;

                  return (
                    <div
                      key={mode.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-pink-500/40 hover:bg-white/10"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                            <Icon size={28} />
                          </div>
                          <span className={`rounded-full border px-3.5 py-1 text-xs font-bold tracking-wide ${mode.badgeColor}`}>
                            {mode.badge}
                          </span>
                        </div>

                        <h3 className="mt-6 text-2xl font-black text-white sm:text-3xl">{mode.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/80">{mode.description}</p>

                        {/* Stats Bar */}
                        <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/40 p-3 text-center">
                          {mode.stats.map((s) => (
                            <div key={s.label}>
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{s.label}</p>
                              <p className="mt-1 text-xs font-bold text-pink-300">{s.val}</p>
                            </div>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div className="mt-6 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
                            Puntos Destacados:
                          </h4>
                          {mode.highlights.map((h) => (
                            <div key={h} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                              <CheckCircle2 size={16} className="mt-0.5 text-pink-400 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10">
                        <Link
                          href={`/${mode.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-pink-500/30 bg-pink-500/20 px-6 py-3 text-xs sm:text-sm font-bold text-pink-300 transition hover:bg-pink-500 hover:text-white"
                        >
                          Ver detalles de {mode.title} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* RULES SECTION */}
          {(activeCategory === "todos" || activeCategory === "reglas") && (
            <div className="scroll-mt-20" id="reglas">
              <div className="border-b border-white/10 pb-6">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
                  <ShieldCheck size={14} /> NORMATIVA MIYOBI
                </span>
                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                  Reglas Principales
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Normas básicas para garantizar la mejor convivencia y juego limpio.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {RULES.map((rule) => {
                  const Icon = rule.icon;

                  return (
                    <div
                      key={rule.title}
                      className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:bg-white/10"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30 group-hover:bg-pink-500 group-hover:text-white transition duration-300">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-5 text-base font-bold text-white">{rule.title}</h3>
                      <p className="mt-3 text-xs leading-6 text-white/70">{rule.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ SECTION */}
          {(activeCategory === "todos" || activeCategory === "faq" || activeCategory === "guias") && (
            <div className="scroll-mt-20" id="faq">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-400">
                    <HelpCircle size={14} /> RESPUESTAS RÁPIDAS
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    Preguntas Frecuentes
                  </h2>
                  <p className="mt-1 text-sm text-white/70">
                    Resuelve tus dudas sobre conexión, cuentas y jugabilidad.
                  </p>
                </div>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === null ? 0 : null)}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:border-white/30 hover:text-white transition w-fit"
                >
                  {openFaqIndex === null ? "Expandir FAQ" : "Contraer FAQ"}
                </button>
              </div>

              <div className="mt-8 space-y-4 max-w-4xl mx-auto">
                {filteredFaqs.map((faq, index) => {
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
                        <ChevronDown
                          size={18}
                          className={`text-pink-400 shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-pink-300" : ""
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
          )}

          {/* OFFICIAL CTA SECTION FROM HOME PAGE */}
          <CTA onPlay={() => setOpenModal(true)} />

        </section>
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
