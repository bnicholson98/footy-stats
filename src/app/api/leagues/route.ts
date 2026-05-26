import { NextResponse } from "next/server";
import { getProvider } from "../../../lib/football";

export async function GET() {
  try {
    const leagues = await getProvider().getLeagues();
    return NextResponse.json(leagues);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch leagues" },
      { status: 500 },
    );
  }
}