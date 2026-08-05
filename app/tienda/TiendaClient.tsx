"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Box,
  Coins,
  Zap,
  ShoppingBag,
  Sparkles,
  Check,
  Tag,
  X,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  Flame,
  Swords,
  Shield,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerModal from "@/components/ui/ServerModal";

type Modality = "selection" | "boxpvp" | "survival";
type Category = "rangos" | "cajas" | "monedas" | "extras";

type StoreItem = {
  id: string;
  modality: "boxpvp" | "survival";
  category: Category;
  title: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  badgeColor?: string;
  perks: string[];
  gradient: string;
  icon: string;
};

const STORE_ITEMS: StoreItem[] = [
  // ================= BOXPVP ITEMS =================
  {
    id: "box-rank-1",
    modality: "boxpvp",
    category: "rangos",
    title: "RANGO GLADIADOR",
    price: "$5.99 USD",
    originalPrice: "$7.99 USD",
    badge: "INICIO BOXPVP",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    icon: "⚔️",
    perks: [
      "Prefijo especial [GLADIADOR] en la Arena BoxPvP",
      "Acceso a la Mina VIP de Hierro y Oro",
      "Kit Gladiador semanal con espada P2 y armadura encantada",
      "Multiplicador x1.2 de dinero al picar en minas",
      "Comando /feed para reponer comida en combate",
    ],
  },
  {
    id: "box-rank-2",
    modality: "boxpvp",
    category: "rangos",
    title: "RANGO TITÁN",
    price: "$11.99 USD",
    originalPrice: "$15.99 USD",
    badge: "MÁS POPULAR 💥",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    icon: "⚡",
    perks: [
      "Todo lo incluido en el Rango Gladiador",
      "Prefijo exclusivo [TITÁN] animado",
      "Acceso a la Mina Mítica de Diamante",
      "Kit Titán semanal con armadura P4 y Manzanas de Notched",
      "Multiplicador x1.5 de monedas en BoxPvP",
      "Acceso a /enderchest en medio de la arena",
      "3 Llaves KOTH semanales de regalo",
    ],
  },
  {
    id: "box-rank-3",
    modality: "boxpvp",
    category: "rangos",
    title: "RANGO ASESINO",
    price: "$19.99 USD",
    originalPrice: "$25.99 USD",
    badge: "ESTATUS EXTREMO",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    icon: "🗡️",
    perks: [
      "Beneficios de Gladiador y Titán incluidos",
      "Prefijo sangriento [ASESINO]",
      "Acceso a la Mina Inframundita Suprema",
      "Kit Asesino con Espada Filo 5 e ítems PvP únicos",
      "Efecto de velocidad I permanente en la arena",
      "Multiplicador x2.0 de botín al picar",
    ],
  },
  {
    id: "box-crate-1",
    modality: "boxpvp",
    category: "cajas",
    title: "PACK LLAVES MINA DIAMANTE (x5)",
    price: "$4.99 USD",
    originalPrice: "$6.99 USD",
    badge: "MINAS EXCLUSIVAS",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    gradient: "from-cyan-500/20 to-transparent",
    icon: "💎",
    perks: [
      "5 Llaves de Caja de Mina Diamante",
      "Posibilidad de obtener Picos Eficiencia 5 y Manzanas Doradas",
      "Desbloqueo inmediato en el spawn de BoxPvP",
    ],
  },
  {
    id: "box-crate-2",
    modality: "boxpvp",
    category: "cajas",
    title: "PACK LLAVES KOTH & ARENA (x10)",
    price: "$9.99 USD",
    originalPrice: "$14.99 USD",
    badge: "RECOMENDADO",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
    gradient: "from-red-500/20 to-transparent",
    icon: "📦",
    perks: [
      "10 Llaves de Cajas KOTH de Eventos",
      "Contiene Sets Inframundita y Armas de Combate",
      "1,000 Coins de regalo para BoxPvP",
    ],
  },
  {
    id: "box-coin-1",
    modality: "boxpvp",
    category: "monedas",
    title: "PAQUETE 5,000 COINS BOXPVP",
    price: "$7.99 USD",
    originalPrice: "$9.99 USD",
    gradient: "from-amber-500/15 to-transparent",
    icon: "🪙",
    perks: [
      "5,000 Coins directas a tu cuenta de BoxPvP",
      "Para comprar mejoras de rango de mina en el juego",
      "Acreditación automática",
    ],
  },
  {
    id: "box-extra-1",
    modality: "boxpvp",
    category: "extras",
    title: "PASE DE BATALLA BOXPVP",
    price: "$6.99 USD",
    badge: "TEMPORADA 1",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    gradient: "from-pink-500/20 to-transparent",
    icon: "📜",
    perks: [
      "Desbloquea la ruta Premium del Pase de Batalla",
      "50 Niveles de recompensas exclusivas",
      "Cosméticos, efectos de muerte y monedas",
    ],
  },

  // ================= SURVIVAL ITEMS =================
  {
    id: "surv-rank-1",
    modality: "survival",
    category: "rangos",
    title: "RANGO EXPLORADOR",
    price: "$4.99 USD",
    originalPrice: "$6.99 USD",
    badge: "INICIO SURVIVAL",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    icon: "🌲",
    perks: [
      "Prefijo verde [EXPLORADOR] en chat",
      "Comando /fly en tus protecciones de terreno",
      "Kit Explorador semanal (Herramientas Netherite)",
      "3 Terrenos protegidos adicionales (30x30)",
      "Acceso a subastas VIP entre jugadores",
    ],
  },
  {
    id: "surv-rank-2",
    modality: "survival",
    category: "rangos",
    title: "RANGO ALQUIMISTA",
    price: "$9.99 USD",
    originalPrice: "$13.99 USD",
    badge: "MÁS POPULAR ⭐",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
    icon: "🧪",
    perks: [
      "Beneficios de Explorador incluidos",
      "Prefijo místico [ALQUIMISTA]",
      "Acceso a /workbench, /craft y /hat",
      "6 Terrenos protegidos de máximo tamaño",
      "Kit Alquimista mensual con pociones nivel 3",
      "Acceso a la zona de spawners VIP",
    ],
  },
  {
    id: "surv-rank-3",
    modality: "survival",
    category: "rangos",
    title: "RANGO REY SURVIVAL",
    price: "$18.99 USD",
    originalPrice: "$24.99 USD",
    badge: "CORONA SUPREMA 👑",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    icon: "👑",
    perks: [
      "Acceso a todos los beneficios anteriores",
      "Prefijo dorado [REY] en chat y tablist",
      "Acceso a /fly global en cualquier mundo Survival",
      "12 Terrenos protegidos sin límite de bloques",
      "Kit Rey semanal con huevos de mobs raros",
      "3 Llaves Místicas semanales de regalo",
    ],
  },
  {
    id: "surv-crate-1",
    modality: "survival",
    category: "cajas",
    title: "PACK LLAVES TESORO SURVIVAL (x5)",
    price: "$3.99 USD",
    gradient: "from-amber-500/20 to-transparent",
    icon: "🗝️",
    perks: [
      "5 Llaves de Caja Tesoro Survival",
      "Items de construcción raros, Elytras y Shulkers",
      "Apertura instantánea en el Spawn",
    ],
  },
  {
    id: "surv-extra-1",
    modality: "survival",
    category: "extras",
    title: "PACK 5 TERRENOS PROTEGIDOS EXTRA",
    price: "$4.99 USD",
    gradient: "from-emerald-500/20 to-transparent",
    icon: "🏞️",
    perks: [
      "Aumenta en 5 el límite máximo de tus terrenos",
      "Protege grandes ciudades y construcciones",
      "Permanente en tu cuenta",
    ],
  },
  {
    id: "surv-extra-2",
    modality: "survival",
    category: "extras",
    title: "CREACIÓN DE CLAN VIP SURVIVAL",
    price: "$5.99 USD",
    gradient: "from-violet-500/20 to-transparent",
    icon: "🛡️",
    perks: [
      "Fundar tu propio Clan VIP oficial",
      "Bandera y prefijo de clan personalizado",
      "Hasta 40 miembros en el clan",
    ],
  },
];

export default function TiendaClient({
  settings,
}: {
  settings?: Record<string, string>;
}) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedModality, setSelectedModality] = useState<Modality>("selection");
  const [activeCategory, setActiveCategory] = useState<Category>("rangos");
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [minecraftUser, setMinecraftUser] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const storeTitle = settings?.store_title || "TIENDA OFICIAL MIYOBI";
  const storeSlogan = settings?.store_slogan || "Selecciona una modalidad para explorar sus rangos VIP, cajas místicas y objetos exclusivos.";
  const discountActive = settings?.store_discount_active !== "false";
  const discountCode = settings?.store_discount_code || "MIYOBI20";
  const discountText = settings?.store_discount_text || "¡20% DE DESCUENTO EN TODA LA TIENDA!";
  const externalStoreUrl = settings?.store_url || "https://tienda.miyobi.gg";

  const currentModalityItems = STORE_ITEMS.filter((item) => item.modality === selectedModality);
  const filteredItems = currentModalityItems.filter((item) => item.category === activeCategory);

  const handleCheckout = (item: StoreItem) => {
    setSelectedItem(item);
  };

  const executePurchase = () => {
    if (!minecraftUser.trim()) return;
    const finalUrl = externalStoreUrl.startsWith("http")
      ? externalStoreUrl
      : `https://${externalStoreUrl}`;
    window.open(finalUrl, "_blank");
  };

  return (
    <>
      <Navbar logoUrl={settings?.logo_url} onPlay={() => setOpenModal(true)} />

      <main className="bg-[#08080c] text-white min-h-screen">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-14">
          <Image
            src={settings?.hero_bg_url || "/images/hero-bg.png"}
            alt="Tienda Oficial Miyobi Network"
            fill
            priority
            className="object-cover scale-[1.03]"
          />

          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute left-1/2 top-[15%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[200px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            {/* DISCOUNT PROMO BANNER */}
            {discountActive && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-amber-500/20 px-5 py-2 text-xs font-bold text-amber-300 backdrop-blur-md shadow-lg shadow-amber-500/10"
              >
                <Flame size={16} className="text-amber-400 animate-pulse" />
                <span>{discountText}</span>
                <span className="rounded-full bg-amber-400 text-black px-2 py-0.5 text-[10px] font-black uppercase font-mono">
                  CÓDIGO: {discountCode}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-black tracking-[0.12em] text-white sm:text-6xl md:text-7xl"
            >
              {storeTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-4 text-base sm:text-lg font-light text-zinc-300 max-w-3xl mx-auto"
            >
              {storeSlogan}
            </motion.p>
          </div>
        </section>

        {/* STEP 1: MODALITY SELECTION CARDS (GATEWAY) */}
        {selectedModality === "selection" && (
          <section className="mx-auto max-w-6xl px-6 pb-32">
            <div className="text-center mb-10">
              <span className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-pink-300">
                Paso 1: Selecciona una Modalidad
              </span>
              <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl">
                ¿En qué servidor deseas adquirir tus beneficios?
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* CARD 1: BOXPVP EXTREME */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setSelectedModality("boxpvp");
                  setActiveCategory("rangos");
                }}
                className="group relative cursor-pointer overflow-hidden rounded-[3rem] border border-red-500/30 bg-[#0c0a12] p-8 shadow-2xl transition duration-500 hover:border-red-500/70 hover:shadow-red-500/20"
              >
                <Image
                  src={settings?.boxpvp_bg_url || "/images/boxpvp.png"}
                  alt="BoxPvP Tienda"
                  fill
                  className="object-cover opacity-45 transition duration-700 group-hover:scale-110 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a12] via-[#0c0a12]/70 to-transparent" />
                <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-red-500/20 blur-3xl group-hover:bg-red-500/35 transition duration-500" />

                <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-300 backdrop-blur-md">
                      <Swords size={14} /> BOXPVP EXTREME
                    </span>

                    <h3 className="mt-4 text-3xl font-black text-white group-hover:text-red-400 transition sm:text-4xl">
                      TIENDA BOXPVP
                    </h3>

                    <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-light">
                      Rangos Gladiador y Titán, minas exclusivas, llaves KOTH de eventos y pases de batalla.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                      Explorar Objetos de BoxPvP
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-red-500/30 group-hover:scale-105 transition">
                      Entrar a la Tienda <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* CARD 2: SURVIVAL CUSTOM */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setSelectedModality("survival");
                  setActiveCategory("rangos");
                }}
                className="group relative cursor-pointer overflow-hidden rounded-[3rem] border border-emerald-500/30 bg-[#08120c] p-8 shadow-2xl transition duration-500 hover:border-emerald-500/70 hover:shadow-emerald-500/20"
              >
                <Image
                  src={settings?.survival_bg_url || "/images/survival.png"}
                  alt="Survival Tienda"
                  fill
                  className="object-cover opacity-45 transition duration-700 group-hover:scale-110 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08120c] via-[#08120c]/70 to-transparent" />
                <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl group-hover:bg-emerald-500/35 transition duration-500" />

                <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                      <Shield size={14} /> SURVIVAL CUSTOM 1.20+
                    </span>

                    <h3 className="mt-4 text-3xl font-black text-white group-hover:text-emerald-400 transition sm:text-4xl">
                      TIENDA SURVIVAL
                    </h3>

                    <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-light">
                      Rangos VIP con comando /fly, protecciones de terreno gigantes, llaves de tesoro y clanes.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Explorar Objetos de Survival
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition">
                      Entrar a la Tienda <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* STEP 2: MODALITY SPECIFIC PRODUCTS STORE */}
        {selectedModality !== "selection" && (
          <section className="mx-auto max-w-6xl px-6 pb-28">
            {/* BACK TO SELECTION & SWITCH MODE HEADER */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
              <button
                onClick={() => setSelectedModality("selection")}
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition"
              >
                <ArrowLeft size={16} className="text-pink-400" /> ← Cambiar de Modalidad
              </button>

              {/* Mode Switcher pill */}
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl">
                <button
                  onClick={() => {
                    setSelectedModality("boxpvp");
                    setActiveCategory("rangos");
                  }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    selectedModality === "boxpvp"
                      ? "bg-red-500/30 border border-red-500/50 text-red-300 shadow-lg shadow-red-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Swords size={14} /> BoxPvP Extreme
                </button>

                <button
                  onClick={() => {
                    setSelectedModality("survival");
                    setActiveCategory("rangos");
                  }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    selectedModality === "survival"
                      ? "bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Shield size={14} /> Survival Custom
                </button>
              </div>
            </div>

            {/* HIGHLY AESTHETIC CATEGORY TABS (NO ALL PRODUCTS MIX) */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setActiveCategory("rangos")}
                className={`inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3 text-xs font-bold transition duration-200 ${
                  activeCategory === "rangos"
                    ? "border-pink-500 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-pink-500/30 scale-105"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-pink-500/30 hover:bg-white/10"
                }`}
              >
                <Crown size={16} className="text-amber-400" /> Rangos VIP
              </button>

              <button
                onClick={() => setActiveCategory("cajas")}
                className={`inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3 text-xs font-bold transition duration-200 ${
                  activeCategory === "cajas"
                    ? "border-pink-500 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-pink-500/30 scale-105"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-pink-500/30 hover:bg-white/10"
                }`}
              >
                <Box size={16} className="text-cyan-400" /> Cajas Místicas
              </button>

              {selectedModality === "boxpvp" && (
                <button
                  onClick={() => setActiveCategory("monedas")}
                  className={`inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3 text-xs font-bold transition duration-200 ${
                    activeCategory === "monedas"
                      ? "border-pink-500 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-pink-500/30 scale-105"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:border-pink-500/30 hover:bg-white/10"
                  }`}
                >
                  <Coins size={16} className="text-amber-400" /> Coins & Monedas
                </button>
              )}

              <button
                onClick={() => setActiveCategory("extras")}
                className={`inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3 text-xs font-bold transition duration-200 ${
                  activeCategory === "extras"
                    ? "border-pink-500 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-pink-500/30 scale-105"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-pink-500/30 hover:bg-white/10"
                }`}
              >
                <Zap size={16} className="text-violet-400" /> Extras & Terrenos
              </button>
            </div>

            {/* CLEAN & ORGANIZED PRODUCT CARDS GRID */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/95 p-7 backdrop-blur-3xl shadow-2xl transition duration-300 hover:-translate-y-1.5 hover:border-pink-500/40 bg-gradient-to-b ${item.gradient}`}
                >
                  <div>
                    {/* Item Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="text-xl font-black text-white">{item.title}</h3>
                          <p className="text-[11px] uppercase tracking-wider text-pink-400 font-bold">
                            {selectedModality.toUpperCase()} • {item.category.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {item.badge && (
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Price Tag */}
                    <div className="my-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white tracking-wide">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm font-semibold text-zinc-500 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Perks List */}
                    <div className="space-y-2.5 mb-8">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
                        Beneficios Incluidos:
                      </p>
                      <ul className="space-y-2">
                        {item.perks.map((perk, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-400 mt-0.5">
                              <Check size={10} />
                            </span>
                            <span className="leading-snug">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handleCheckout(item)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-500/30 transition duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <ShoppingBag size={16} /> Comprar Ahora
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* CHECKOUT MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0d0d15] p-6 sm:p-8 shadow-2xl space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedItem.icon}</span>
                  <div>
                    <h2 className="text-lg font-black text-white">{selectedItem.title}</h2>
                    <p className="text-xs text-pink-400 font-bold">
                      {selectedItem.price} • {selectedItem.modality.toUpperCase()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Input for Minecraft Username */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Tu Usuario de Minecraft (IGN) *
                  </label>
                  <input
                    type="text"
                    required
                    value={minecraftUser}
                    onChange={(e) => setMinecraftUser(e.target.value)}
                    placeholder="Ej: Steve_MC"
                    className="mt-2 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                  />
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Asegúrate de escribir correctamente tu usuario para recibir tus beneficios al instante en {selectedItem.modality.toUpperCase()}.
                  </p>
                </div>

                {/* Pasarelas de Pago */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Pasarela / Método de Pago
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`rounded-2xl border p-3 text-xs font-bold flex items-center justify-center gap-2 transition ${
                        paymentMethod === "paypal"
                          ? "border-pink-500 bg-pink-500/20 text-white"
                          : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      <CreditCard size={16} /> PayPal / Tarjeta
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mercadopago")}
                      className={`rounded-2xl border p-3 text-xs font-bold flex items-center justify-center gap-2 transition ${
                        paymentMethod === "mercadopago"
                          ? "border-pink-500 bg-pink-500/20 text-white"
                          : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20"
                      }`}
                    >
                      <Tag size={16} /> MercadoPago / OXXO
                    </button>
                  </div>
                </div>

                {/* Coupon Info */}
                {discountActive && (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <Tag size={14} /> Cupón Aplicado: <strong>{discountCode}</strong>
                    </span>
                    <span className="text-emerald-400 font-bold">20% OFF</span>
                  </div>
                )}
              </div>

              {/* Submit Checkout */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs text-zinc-400 flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" /> Pago Seguro 256-bit
                </div>

                <button
                  onClick={executePurchase}
                  disabled={!minecraftUser.trim()}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition disabled:opacity-50"
                >
                  Continuar al Pago <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
