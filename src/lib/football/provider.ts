import type { League, Player, StandingRow, Team } from "./types";

// All provider adapters implement this. UI/routes depend only on this interface.
export interface FootballProvider {
  getLeagues(): Promise<League[]>;
  getLeague(id: string): Promise<League | null>;
  getStandings(leagueId: string): Promise<StandingRow[]>;
  getTeam(id: string): Promise<Team | null>;
  getPlayer(id: string): Promise<Player | null>;
}

export class ProviderError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "ProviderError";
  }
}