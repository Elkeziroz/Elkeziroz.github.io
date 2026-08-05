import { NextResponse } from "next/server";
import { getGlobalSyncTimestamp } from "@/actions/sync";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const lastUpdate = await getGlobalSyncTimestamp();
  return NextResponse.json(
    { lastUpdate },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    }
  );
}
