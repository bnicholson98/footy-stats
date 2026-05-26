import { NextResponse } from "next/server";
import { getProvider } from "../../../../lib/football";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const league = await getProvider().getLeague(id);
    if (!league) {
      return NextResponse.json(
        { error: "League not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(league);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch league" },
      { status: 500 },
    );
  }
}