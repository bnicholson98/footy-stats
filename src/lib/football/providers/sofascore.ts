import { z } from "zod";
import type { FootballProvider } from "../provider";
import { ProviderError } from "../provider";
import type { League, StandingRow, Team, Player, PlayerStats } from "../types";

// ── League config (hardcoded — update season IDs once/year) ──

const LEAGUES = [
  { tournamentId: 17, seasonId: 76986, name: "Premier League", country: "England", season: "2025/26" },
  { tournamentId: 8, seasonId: 77559, name: "La Liga", country: "Spain", season: "2025/26" },
  { tournamentId: 23, seasonId: 76457, name: "Serie A", country: "Italy", season: "2025/26" },
  { tournamentId: 35, seasonId: 77333, name: "Bundesliga", country: "Germany", season: "2025/26" },
  { tournamentId: 34, seasonId: 77356, name: "Ligue 1", country: "France", season: "2025/26" },
];

const POSITION_MAP: Record<string, string> = {
  F: "Forward",
  M: "Midfielder",
  D: "Defender",
  G: "Goalkeeper",
};

// ── Image URLs ───────────────────────────────────────────────

// Public SofaScore CDN, deterministic from IDs — no API call, no RapidAPI quota.
const IMG_BASE = "https://img.sofascore.com/api/v1";
const leagueLogoUrl  = (id: string | number) => `${IMG_BASE}/unique-tournament/${id}/image`;
const teamCrestUrl   = (id: string | number) => `${IMG_BASE}/team/${id}/image`;
const playerImageUrl = (id: string | number) => `${IMG_BASE}/player/${id}/image`;

// ── SofaScore response schemas (only fields we consume) ──────

const ssTeamRef = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string().optional(),
  nameCode: z.string().optional(),
});

// Player detail embeds tournament context on the team object
const ssTeamWithTournament = ssTeamRef.extend({
  tournament: z
    .object({ uniqueTournament: z.object({ id: z.number() }) })
    .optional(),
});

const ssStandingRow = z.object({
  position: z.number(),
  team: ssTeamRef,
  matches: z.number(),
  wins: z.number(),
  draws: z.number(),
  losses: z.number(),
  scoresFor: z.number(),
  scoresAgainst: z.number(),
  points: z.number(),
});

const ssStandingsResponse = z.object({
  standings: z.array(z.object({ rows: z.array(ssStandingRow) })),
});

const ssTeamDetailResponse = z.object({
  team: z.object({
    id: z.number(),
    name: z.string(),
    shortName: z.string().optional(),
    nameCode: z.string().optional(),
    country: z.object({ name: z.string() }).optional(),
    venue: z.object({ name: z.string() }).optional(),
    foundationDateTimestamp: z.number().optional(),
  }),
});

const ssPlayer = z.object({
  id: z.number(),
  name: z.string(),
  position: z.string().optional(),
  shirtNumber: z.number().optional(),
  country: z.object({ name: z.string() }).optional(),
  dateOfBirth: z.string().optional(),
  team: ssTeamWithTournament.optional(),
});

const ssSquadResponse = z.object({
  players: z.array(z.object({ player: ssPlayer })),
});

const ssPlayerDetailResponse = z.object({ player: ssPlayer });

const ssStatsResponse = z.object({
  statistics: z.object({
    appearances: z.number().optional(),
    goals: z.number().optional(),
    assists: z.number().optional(),
    yellowCards: z.number().optional(),
    redCards: z.number().optional(),
    minutesPlayed: z.number().optional(),
  }),
});

// ── Fetch helper ─────────────────────────────────────────────

const API_HOST = "sofascore.p.rapidapi.com";
const BASE_URL = `https://${API_HOST}`;

async function fetchApi(
  path: string,
  params: Record<string, string | number>,
): Promise<unknown> {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) throw new ProviderError("RAPIDAPI_KEY env var is not set");

  const url = new URL(path, BASE_URL);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }

  const res = await fetch(url, {
    headers: { "x-rapidapi-host": API_HOST, "x-rapidapi-key": key },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new ProviderError(
      `SofaScore API error: ${res.status} ${res.statusText}`,
    );
  }

  return res.json();
}

function parse<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (e) {
    throw new ProviderError("Unexpected SofaScore response shape", e);
  }
}

function mapPosition(pos?: string): string | undefined {
  return pos ? (POSITION_MAP[pos] ?? pos) : undefined;
}

// ── Provider ─────────────────────────────────────────────────

export class SofascoreProvider implements FootballProvider {
  private leagueMap = new Map(
    LEAGUES.map((l) => [String(l.tournamentId), l]),
  );

  async getLeagues(): Promise<League[]> {
    return LEAGUES.map((l) => ({
      id: String(l.tournamentId),
      name: l.name,
      country: l.country,
      season: l.season,
      logoUrl: leagueLogoUrl(l.tournamentId),
    }));
  }

  async getLeague(id: string): Promise<League | null> {
    const cfg = this.leagueMap.get(id);
    if (!cfg) return null;
    return {
      id: String(cfg.tournamentId),
      name: cfg.name,
      country: cfg.country,
      season: cfg.season,
      logoUrl: leagueLogoUrl(cfg.tournamentId),
    };
  }

  async getStandings(leagueId: string): Promise<StandingRow[]> {
    const cfg = this.leagueMap.get(leagueId);
    if (!cfg) return [];

    const data = await fetchApi("/tournaments/get-standings", {
      tournamentId: cfg.tournamentId,
      seasonId: cfg.seasonId,
      type: "total",
    });
    if (!data) return [];

    const { standings } = parse(ssStandingsResponse, data);
    if (standings.length === 0) return [];

    return standings[0].rows.map((row) => ({
      position: row.position,
      team: {
        id: String(row.team.id),
        name: row.team.name,
        shortName: row.team.nameCode ?? row.team.shortName,
        crestUrl: teamCrestUrl(row.team.id),
      },
      played: row.matches,
      won: row.wins,
      drawn: row.draws,
      lost: row.losses,
      goalsFor: row.scoresFor,
      goalsAgainst: row.scoresAgainst,
      goalDifference: row.scoresFor - row.scoresAgainst,
      points: row.points,
    }));
  }

  async getTeam(id: string): Promise<Team | null> {
    const [detailData, squadData] = await Promise.all([
      fetchApi("/teams/detail", { teamId: id }),
      // Squad is supplementary — don't fail the whole request
      fetchApi("/teams/get-squad", { teamId: id }).catch(() => null),
    ]);
    if (!detailData) return null;

    const { team: t } = parse(ssTeamDetailResponse, detailData);

    const squad = squadData
      ? parse(ssSquadResponse, squadData).players.map(({ player: p }) => ({
          id: String(p.id),
          name: p.name,
          position: mapPosition(p.position),
          shirtNumber: p.shirtNumber,
          imageUrl: playerImageUrl(p.id),
        }))
      : [];

    return {
      id: String(t.id),
      name: t.name,
      shortName: t.nameCode ?? t.shortName,
      crestUrl: teamCrestUrl(t.id),
      country: t.country?.name,
      founded: t.foundationDateTimestamp
        ? new Date(t.foundationDateTimestamp * 1000).getUTCFullYear()
        : undefined,
      venue: t.venue?.name,
      squad,
    };
  }

  async getPlayer(id: string): Promise<Player | null> {
    const data = await fetchApi("/players/detail", { playerId: id });
    if (!data) return null;

    const { player: p } = parse(ssPlayerDetailResponse, data);
    const tournamentId = p.team?.tournament?.uniqueTournament?.id;

    const player: Player = {
      id: String(p.id),
      name: p.name,
      position: mapPosition(p.position),
      shirtNumber: p.shirtNumber,
      imageUrl: playerImageUrl(p.id), 
      team: p.team
        ? {
            id: String(p.team.id),
            name: p.team.name,
            shortName: p.team.nameCode ?? p.team.shortName,
            crestUrl: teamCrestUrl(p.team.id),
          }
        : undefined,
      nationality: p.country?.name,
      dateOfBirth: p.dateOfBirth?.split("T")[0],
    };

    if (tournamentId) {
      const stats = await this.fetchPlayerStats(id, tournamentId);
      if (stats) player.stats = stats;
    }

    return player;
  }

  // Fails silently — stats are supplementary
  private async fetchPlayerStats(
    playerId: string,
    tournamentId: number,
  ): Promise<PlayerStats | undefined> {
    const cfg = this.leagueMap.get(String(tournamentId));
    if (!cfg) return undefined;

    try {
      const data = await fetchApi("/players/get-statistics", {
        playerId,
        tournamentId: cfg.tournamentId,
        seasonId: cfg.seasonId,
        type: "overall",
      });
      if (!data) return undefined;

      const { statistics: s } = parse(ssStatsResponse, data);
      return {
        appearances: s.appearances,
        goals: s.goals,
        assists: s.assists,
        yellowCards: s.yellowCards,
        redCards: s.redCards,
        minutesPlayed: s.minutesPlayed,
      };
    } catch {
      return undefined;
    }
  }
}