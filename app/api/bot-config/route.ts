import { NextResponse } from "next/server";
import { getBotConfigAction } from "@/app/staff/dashboard/configuracion/bot/actions";

export async function GET() {
  try {
    const config = await getBotConfigAction();
    return NextResponse.json(config, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error en API /api/bot-config:", error);
    return NextResponse.json({ error: "Error al obtener configuración del bot" }, { status: 500 });
  }
}
