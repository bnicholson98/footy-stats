import Link from "next/link";
import { notFound } from "next/navigation";
import { getProvider } from "../../../lib/football";
import { EntityImage } from "../../../components/entity-image";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = await getProvider().getTeam(id);

  if (!team) notFound();

  const details = [
    team.country,
    team.founded && `Est. ${team.founded}`,
    team.venue,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <EntityImage src={team.crestUrl} alt={team.name} size={64} />
        <div>
          <h1 className="text-3xl font-bold">{team.name}</h1>
          {details && <p className="mt-1 text-gray-400">{details}</p>}
        </div>
      </div>

      {team.squad.length > 0 ? (
        <>
          <h2 className="mb-4 text-xl font-semibold">Squad</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-left text-xs text-gray-400 uppercase tracking-wide">
                  <th className="pb-3 pr-4 w-12">#</th>
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3">Position</th>
                </tr>
              </thead>
              <tbody>
                {team.squad.map((player) => (
                  <tr
                    key={player.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-3 pr-4 text-gray-500 tabular-nums">
                      {player.shirtNumber ?? "—"}
                    </td>
                    <td className="py-3 pr-4 font-medium">
                      <Link
                        href={`/players/${player.id}`}
                        className="hover:text-white transition-colors"
                      >
                        {player.name}
                      </Link>
                    </td>
                    <td className="py-3 text-gray-400">
                      {player.position ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No squad data available.</p>
      )}
    </>
  );
}