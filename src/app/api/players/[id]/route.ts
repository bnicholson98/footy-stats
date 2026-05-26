import { NextResponse } from "next/server";
import { getProvider } from "../../../../lib/football";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const player = await getProvider().getPlayer(id);
    if (!player) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(player);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch player" },
      { status: 500 },
    );
  }
}