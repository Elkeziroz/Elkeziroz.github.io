"use server";

import fs from "fs";
import path from "path";
import { auth } from "@/auth";
import { isStaffMember } from "@/lib/discord";
import { getStaffRole } from "@/lib/discordRoles";
import { prisma } from "@/lib/prisma";

const BOT_CONFIG_PATH = path.join(process.cwd(), "MiyobiBotOficial", "bot_config.json");
const DB_SETTING_KEY = "BOT_CONFIG";

export interface TicketCategory {
  customId: string;
  label: string;
  emoji: string;
  description: string;
  categoryId: string;
  title: string;
  ticketNamePrefix: string;
}

export interface RuleButton {
  label: string;
  emoji: string;
  description: string;
  url: string;
}

export interface BotConfigData {
  welcome: {
    enabled: boolean;
    channelId: string;
    title: string;
    subtitle: string;
    message: string;
    backgroundUrl: string;
    embedColor?: string;
  };
  goodbye: {
    enabled: boolean;
    channelId: string;
    title: string;
    subtitle: string;
    message: string;
    backgroundUrl: string;
    embedColor?: string;
  };
  tickets: {
    panelTitle: string;
    panelDescription: string;
    panelImageUrl: string;
    embedColor?: string;
    categories?: TicketCategory[];
  };
  rules: {
    title: string;
    description: string;
    rulesUrl: string;
    embedColor?: string;
    buttons?: RuleButton[];
  };
  confessions: {
    channelId: string;
    logChannelId: string;
    footerText: string;
    embedColor?: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    footerText: string;
    logoUrl: string;
  };
}

const DEFAULT_TICKET_CATEGORIES: TicketCategory[] = [
  { customId: "support_general", label: "Soporte General", emoji: "<:mundo:1414703463224311961>", description: "Dudas y consultas generales.", categoryId: "1399886060703453224", title: "<:mundo:1414703463224311961> Soporte General", ticketNamePrefix: "🌍-general-" },
  { customId: "report_user", label: "Reporte usuario", emoji: "<:hacker:1414703911431831652>", description: "Reporta a un jugador que rompe las reglas.", categoryId: "1399887555792601198", title: "<:hacker:1414703911431831652> Reporte de usuario", ticketNamePrefix: "🎭-reporte-usuario-" },
  { customId: "report_bug", label: "Reporte bug", emoji: "<:virus:1414702825413279765>", description: "Reporta errores del servidor.", categoryId: "1399887592518058184", title: "<:virus:1414702825413279765> Reporte de bug", ticketNamePrefix: "👾-reporte-bug-" },
  { customId: "appeals", label: "Apelaciones", emoji: "<:reglas:1414705343904088074>", description: "Apela una sanción injusta.", categoryId: "1399887679084036206", title: "<:reglas:1414705343904088074> Apelaciones", ticketNamePrefix: "📜-apelacion-" },
  { customId: "shop_support", label: "Soporte Tienda", emoji: "<:dinero:1414704567635021844>", description: "Problemas con compras o pagos.", categoryId: "1399887795127849053", title: "💰 Soporte de tienda", ticketNamePrefix: "🏪-tienda-" },
  { customId: "report_staff", label: "Reporte Staff", emoji: "<:policia:1414703166812848361>", description: "Quejas sobre miembros del equipo.", categoryId: "1399887837570138144", title: "👮 Reporte de Staff", ticketNamePrefix: "👮-reporte-staff-" }
];

const DEFAULT_RULE_BUTTONS: RuleButton[] = [
  { emoji: "🌐", label: "Sitio Web", description: "Visita nuestra página oficial.", url: "https://miyobimc.com" },
  { emoji: "🛒", label: "Tienda", description: "Consulta nuestra tienda oficial.", url: "https://tienda.miyobimc.com" },
  { emoji: "📜", label: "Reglamento", description: "Lee el reglamento completo aquí.", url: "https://miyobimc.com/reglas" }
];

const DEFAULT_BOT_CONFIG: BotConfigData = {
  welcome: {
    enabled: true,
    channelId: "1399262359243067494",
    title: "¡BIENVENIDO A MIYOBIMC!",
    subtitle: "Bienvenido a nuestra comunidad",
    message: "✨ ¡Bienvenido/a a la comunidad de **MiyobiMC**, {user}!",
    backgroundUrl: "https://i.imgur.com/deUePDN.png",
    embedColor: "#FF5FA2",
  },
  goodbye: {
    enabled: true,
    channelId: "1473021840598368469",
    title: "¡ADIÓS AMIGO!",
    subtitle: "Esperamos verte de nuevo pronto",
    message: "👋 ¡Hasta luego **{username}**!",
    backgroundUrl: "https://i.imgur.com/deUePDN.png",
    embedColor: "#F43F5E",
  },
  tickets: {
    panelTitle: "🎫 CENTRO DE ATENCIÓN Y SOPORTE | MIYOBIMC",
    panelDescription:
      "Es importante que haga un buen uso tanto de los tickets como de las categorías de los tickets.\n\nSi usted no responde en un plazo de 12-24 horas el staff tiene la obligación de cerrar el ticket.",
    panelImageUrl: "https://i.imgur.com/GtE11wM.png",
    embedColor: "#DB0F64",
    categories: DEFAULT_TICKET_CATEGORIES,
  },
  rules: {
    title: "📜 REGLAMENTO OFICIAL | MIYOBIMC",
    description:
      "Te recomendamos revisar las reglas en este enlace para mantener un ambiente agradable y respetuoso.\n\nÚltima modificación: <t:1773008940:D>",
    rulesUrl: "https://miyobimc.com/reglas",
    embedColor: "#D92AF4",
    buttons: DEFAULT_RULE_BUTTONS,
  },
  confessions: {
    channelId: "1417194209550798921",
    logChannelId: "1480350518772633742",
    footerText: "Usa /confesar para enviar la tuya",
    embedColor: "#10B981",
  },
  theme: {
    primaryColor: "#FF5FA2",
    secondaryColor: "#D946EF",
    footerText: "MiyobiMC • Donde nacen nuevas aventuras",
    logoUrl: "https://i.imgur.com/YSYAoQa.png",
  },
};

function formatConfig(parsed: any): BotConfigData {
  return {
    welcome: { ...DEFAULT_BOT_CONFIG.welcome, ...parsed.welcome },
    goodbye: { ...DEFAULT_BOT_CONFIG.goodbye, ...parsed.goodbye },
    tickets: {
      ...DEFAULT_BOT_CONFIG.tickets,
      ...parsed.tickets,
      categories: Array.isArray(parsed.tickets?.categories) ? parsed.tickets.categories : DEFAULT_TICKET_CATEGORIES,
    },
    rules: {
      ...DEFAULT_BOT_CONFIG.rules,
      ...parsed.rules,
      buttons: Array.isArray(parsed.rules?.buttons) ? parsed.rules.buttons : DEFAULT_RULE_BUTTONS,
    },
    confessions: { ...DEFAULT_BOT_CONFIG.confessions, ...parsed.confessions },
    theme: { ...DEFAULT_BOT_CONFIG.theme, ...parsed.theme },
  };
}

/**
 * Obtiene la configuración del bot desde Prisma Database o bot_config.json
 */
export async function getBotConfigAction(): Promise<BotConfigData> {
  // 1. Intentar desde la base de datos Prisma (Compatible con Vercel Serverless)
  try {
    const dbSetting = await prisma.siteSetting.findUnique({
      where: { key: DB_SETTING_KEY },
    });

    if (dbSetting?.value) {
      const parsed = JSON.parse(dbSetting.value);
      return formatConfig(parsed);
    }
  } catch (error) {
    console.error("Error leyendo BOT_CONFIG de Prisma DB:", error);
  }

  // 2. Fallback a archivo de sistema local
  try {
    if (fs.existsSync(BOT_CONFIG_PATH)) {
      const content = fs.readFileSync(BOT_CONFIG_PATH, "utf-8");
      const parsed = JSON.parse(content);
      return formatConfig(parsed);
    }
  } catch (error) {
    console.error("Error leyendo bot_config.json local:", error);
  }

  return DEFAULT_BOT_CONFIG;
}

/**
 * Guarda los cambios de configuración en la Base de Datos (Prisma) y opcionalmente en bot_config.json si el sistema de archivos no es de solo lectura.
 */
export async function saveBotConfigAction(newConfig: BotConfigData) {
  const session = await auth();

  if (!session?.user?.discordId) {
    return { success: false, error: "No autenticado." };
  }

  const isStaff = await isStaffMember(session.user.discordId);
  if (!isStaff) {
    return { success: false, error: "Acceso denegado: No eres miembro del staff." };
  }

  const staffRole = await getStaffRole(session.user.discordId);
  if (!staffRole || staffRole.level < 90) {
    return { success: false, error: "Acceso restringido: Se requiere rol de Admin u Owner." };
  }

  try {
    const configJsonString = JSON.stringify(newConfig, null, 2);

    // 1. Guardar en Base de Datos Prisma (Funciona 100% en Vercel Serverless)
    await prisma.siteSetting.upsert({
      where: { key: DB_SETTING_KEY },
      update: { value: configJsonString },
      create: { key: DB_SETTING_KEY, value: configJsonString },
    });

    // 2. Intentar guardar en disco local si el entorno lo permite (Ignora EROFS en Vercel)
    try {
      const parentDir = path.dirname(BOT_CONFIG_PATH);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.writeFileSync(BOT_CONFIG_PATH, configJsonString, "utf-8");
    } catch (fsError: any) {
      console.log("Nota: Guardado en disco ignorado por sistema de archivos de solo lectura (Vercel Serverless).");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error guardando BOT_CONFIG:", error);
    return { success: false, error: error.message || "Error al guardar la configuración." };
  }
}
