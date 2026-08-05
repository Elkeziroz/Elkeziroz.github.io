import { prisma } from "@/lib/prisma";

export const DEFAULT_SETTINGS: Record<string, string> = {
  // GENERAL & BRANDING
  site_name: "Miyobi Network",
  logo_url: "/images/logo.png",
  hero_badge: "Java + Bedrock 1.20+",
  hero_title: "MIYOBI",
  hero_slogan: "Donde nacen nuevas aventuras.",
  hero_description:
    "Una experiencia premium para Minecraft Java y Bedrock. Explora un universo diseñado para jugadores que buscan calidad, estabilidad y una comunidad inolvidable.",
  hero_bg_url: "/images/hero-bg.png",

  // GALERÍA PRINCIPAL (HOME)
  gallery_title_1: "Mundo Survival 1.20+",
  gallery_sub_1: "Exploración y construcciones protegidas",
  gallery_img_1: "/images/survival.png",

  gallery_title_2: "BoxPvP Arena & Minas",
  gallery_sub_2: "Acción continua y rangos",
  gallery_img_2: "/images/boxpvp.png",

  gallery_title_3: "Comunidad & Eventos",
  gallery_sub_3: "Torneos y actividades semanales",
  gallery_img_3: "/images/hero-bg.png",

  // SURVIVAL
  survival_title: "SURVIVAL 1.20+",
  survival_slogan: "Supervivencia mejorada, economía real y comunidad sin límites.",
  survival_desc:
    "Protege tus construcciones, únete a un trabajo, participa en subastas entre jugadores y compite con tu clan en un universo diseñado para durar.",
  survival_bg_url: "/images/survival.png",
  survival_gallery_1: "/images/survival.png",
  survival_gallery_2: "/images/hero-bg.png",
  survival_gallery_3: "/images/boxpvp.png",
  survival_gallery_4: "/images/survival.png",

  // BOXPVP
  boxpvp_title: "BOXPVP EXTREME",
  boxpvp_slogan: "Minas por rangos, kits legendarios y combate continuo.",
  boxpvp_desc:
    "Evoluciona tus armas en minas progresivas, abre cajas de botín místico y domina los eventos KOTH en la arena de combate de Miyobi.",
  boxpvp_bg_url: "/images/boxpvp.png",
  boxpvp_gallery_1: "/images/boxpvp.png",
  boxpvp_gallery_2: "/images/hero-bg.png",
  boxpvp_gallery_3: "/images/survival.png",
  boxpvp_gallery_4: "/images/boxpvp.png",

  // WIKI & REGLAS COMPLETA
  wiki_badge: "Guía & Wiki Oficial",
  wiki_title: "WIKI & GUÍAS MIYOBI",
  wiki_slogan: "Todo el conocimiento para dominar el servidor.",
  wiki_description:
    "Encuentra tutoriales de inicio, atajos de comandos, economía de subastas, guías de modalidades, reglas de la comunidad y preguntas frecuentes.",
  wiki_bg_url: "/images/hero-bg.png",
  wiki_rules_title: "REGLAS PRINCIPALES DEL SERVIDOR",
  wiki_rules_content:
    "1. Respeto mutuo entre todos los jugadores y miembros del staff.\n2. Prohibido el uso de clientes modificados, hacks o exploits (X-Ray, KillAura, Fly, AutoClicker).\n3. Prohibido el grifeo o robo en terrenos protegidos de Survival.\n4. Prohibido la venta de ítems del juego por dinero real ajeno a la tienda oficial.",

  // CONEXIÓN & REDES
  ip_java: "miyobi.minehut.gg",
  ip_bedrock: "bedrock.miyobi.gg",
  port_bedrock: "19132",

  discord_url: "https://discord.gg/PNAHW9yHZu",
  instagram_url: "https://instagram.com",
  tiktok_url: "https://tiktok.com",
  store_url: "/tienda",

  // TIENDA OFICIAL
  store_title: "TIENDA OFICIAL MIYOBI",
  store_slogan: "Mejora tu aventura en el juego. Adquiere rangos VIP, cajas místicas, paquetes de monedas y cosméticos exclusivos.",
  store_discount_active: "true",
  store_discount_code: "MIYOBI20",
  store_discount_text: "¡20% DE DESCUENTO EN TODA LA TIENDA!",

  // BANNER DE ANUNCIO GLOBAL
  announcement_enabled: "false",
  announcement_text: "¡Bienvenidos a Miyobi Network! Explora nuestras modalidades Survival y BoxPvP.",

  // CONFIGURACIÓN Y PREGUNTAS DINÁMICAS DE POSTULACIONES AL STAFF
  applications_open: "true",
  applications_title: "FORMULARIO DE STAFF",
  applications_slogan: "Conéctate con tu cuenta de Discord para autorrellenar automáticamente tu usuario y correo verificado.",
  applications_closed_msg: "Las postulaciones al equipo de Staff se encuentran cerradas en este momento. Mantente atento a los anuncios oficiales en nuestro servidor de Discord.",

  application_questions_json: JSON.stringify([
    {
      id: "q_exp",
      label: "Experiencia Previa en Staff (Opcional)",
      type: "text",
      options: "",
      required: false
    },
    {
      id: "q_why",
      label: "¿Por qué te gustaría formar parte del equipo de Miyobi? *",
      type: "text",
      options: "",
      required: true
    },
    {
      id: "q_scenario",
      label: "Situación: ¿Cómo actuarías si ves a un jugador usando hacks o tóxico? *",
      type: "text",
      options: "",
      required: true
    }
  ]),
};

// Fetch all settings as a key-value record with defaults fallback
export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const dbSettings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };

    for (const item of dbSettings) {
      if (item.value !== null && item.value !== undefined) {
        settingsMap[item.key] = item.value;
      }
    }

    return settingsMap;
  } catch (error) {
    console.error("Error loading site settings:", error);
    return DEFAULT_SETTINGS;
  }
}

// Get a single setting by key
export async function getSiteSetting(key: string): Promise<string> {
  try {
    const item = await prisma.siteSetting.findUnique({
      where: { key },
    });
    return item?.value ?? DEFAULT_SETTINGS[key] ?? "";
  } catch {
    return DEFAULT_SETTINGS[key] ?? "";
  }
}
