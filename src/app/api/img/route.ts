import { type NextRequest, NextResponse } from "next/server";
const ALLOWED = new Set(["img.sofascore.com"]);
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  if (!raw) return new NextResponse("Missing url", { status: 400 });
  let parsed: URL;
  try { parsed = new URL(raw); } catch { return new NextResponse("Bad url", { status: 400 }); }
  if (!ALLOWED.has(parsed.hostname)) return new NextResponse("Blocked", { status: 403 });
  const upstream = await fetch(raw, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      Referer: "https://www.sofascore.com/",
    },
  });
  if (!upstream.ok) return new NextResponse(null, { status: upstream.status });
  return new NextResponse(await upstream.arrayBuffer(), {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}