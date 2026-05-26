import { NextResponse } from "next/server";
import { getProvider } from "../../../../../lib/football";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const standings = await getProvider().getStandings(id);
    return NextResponse.json(standings);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch standings" },
      { status: 500 },
    );
  }
}