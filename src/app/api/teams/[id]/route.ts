import { NextResponse } from "next/server";
import { getProvider } from "../../../../lib/football";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const team = await getProvider().getTeam(id);
    if (!team) {
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(team);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 },
    );
  }
}