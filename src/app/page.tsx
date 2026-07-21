import Link from "next/link";
import { getProvider } from "../lib/football";
import { EntityImage } from "../components/entity-image";

const COUNTRY_FLAGS: Record<string, string> = {
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Germany: "🇩🇪",
  France: "🇫🇷",
};

export default async function HomePage() {
  const leagues = await getProvider().getLeagues();

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Leagues</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <Link
            key={league.id}
            href={`/leagues/${league.id}`}
            className="rounded-lg border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-gray-600"
          >
            <div className="mb-3">
              <EntityImage src={league.logoUrl} alt={league.name} size={40} />
            </div>
            <h2 className="text-lg font-semibold">{league.name}</h2>
            <p className="mt-1 text-sm text-gray-400">
              <span className="mr-1.5">{COUNTRY_FLAGS[league.country] ?? "🏳️"}</span>
              {league.country}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}