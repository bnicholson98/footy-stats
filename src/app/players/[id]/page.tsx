import Link from "next/link";
import { notFound } from "next/navigation";
import { getProvider } from "../../../lib/football";
import type { PlayerStats } from "../../../lib/football";
import { EntityImage } from "../../../components/entity-image";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getProvider().getPlayer(id);

  if (!player) notFound();

  return (
    <>
      <div className="mb-8">
        <EntityImage src={player.imageUrl} alt={player.name} size={80} rounded />
        <div>
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p className="mt-1 text-gray-400">
            {[player.position, player.shirtNumber && `#${player.shirtNumber}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <p className="mt-1 text-gray-400">
            {player.team && (
              <Link
                href={`/teams/${player.team.id}`}
                className="hover:text-white transition-colors"
              >
                {player.team.name}
              </Link>
            )}
            {player.team && player.nationality && " · "}
            {player.nationality}
          </p>
          {player.dateOfBirth && (
            <p className="mt-1 text-sm text-gray-500">
              Born {formatDate(player.dateOfBirth)}
            </p>
          )}
        </div>
      </div>

      {player.stats && <StatsGrid stats={player.stats} />}
    </>
  );
}

function StatsGrid({ stats }: { stats: PlayerStats }) {
  const items: { label: string; value: number | undefined }[] = [
    { label: "Appearances", value: stats.appearances },
    { label: "Goals", value: stats.goals },
    { label: "Assists", value: stats.assists },
    { label: "Yellow Cards", value: stats.yellowCards },
    { label: "Red Cards", value: stats.redCards },
    { label: "Minutes", value: stats.minutesPlayed },
  ];

  const visible = items.filter((i) => i.value !== undefined);
  if (visible.length === 0) return null;

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Season Stats</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {visible.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-gray-800 bg-gray-900 p-4"
          >
            <p className="text-2xl font-bold tabular-nums">
              {item.value!.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}