import Link from "next/link";
import { notFound } from "next/navigation";
import { getProvider } from "../../../lib/football";

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = getProvider();
  const [league, standings] = await Promise.all([
    provider.getLeague(id),
    provider.getStandings(id),
  ]);

  if (!league) notFound();

  return (
    <>
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          ← Leagues
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{league.name}</h1>
        <p className="mt-1 text-gray-400">
          {league.country} · {league.season}
        </p>
      </div>

      {standings.length === 0 ? (
        <p className="text-gray-500">No standings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm tabular-nums">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="pb-3 pr-3 w-8">#</th>
                <th className="pb-3 pr-3">Team</th>
                <th className="pb-3 pr-3 text-center">P</th>
                <th className="pb-3 pr-3 text-center">W</th>
                <th className="pb-3 pr-3 text-center">D</th>
                <th className="pb-3 pr-3 text-center">L</th>
                <th className="pb-3 pr-3 text-center hidden sm:table-cell">GF</th>
                <th className="pb-3 pr-3 text-center hidden sm:table-cell">GA</th>
                <th className="pb-3 pr-3 text-center">GD</th>
                <th className="pb-3 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr
                  key={row.position}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 pr-3 text-gray-500">{row.position}</td>
                  <td className="py-3 pr-3 font-medium">
                    <Link
                      href={`/teams/${row.team.id}`}
                      className="hover:text-white transition-colors"
                    >
                      <span className="text-gray-500 mr-2 text-xs">
                        {row.team.shortName}
                      </span>
                      {row.team.name}
                    </Link>
                  </td>
                  <td className="py-3 pr-3 text-center text-gray-400">
                    {row.played}
                  </td>
                  <td className="py-3 pr-3 text-center text-gray-400">
                    {row.won}
                  </td>
                  <td className="py-3 pr-3 text-center text-gray-400">
                    {row.drawn}
                  </td>
                  <td className="py-3 pr-3 text-center text-gray-400">
                    {row.lost}
                  </td>
                  <td className="py-3 pr-3 text-center text-gray-400 hidden sm:table-cell">
                    {row.goalsFor}
                  </td>
                  <td className="py-3 pr-3 text-center text-gray-400 hidden sm:table-cell">
                    {row.goalsAgainst}
                  </td>
                  <GDCell value={row.goalDifference} />
                  <td className="py-3 text-center font-bold">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function GDCell({ value }: { value: number }) {
  const color =
    value > 0
      ? "text-green-400"
      : value < 0
        ? "text-red-400"
        : "text-gray-400";
  const display = value > 0 ? `+${value}` : value;

  return (
    <td className={`py-3 pr-3 text-center ${color}`}>{display}</td>
  );
}