export type LeagueId = string;
export type TeamId = string;
export type PlayerId = string;

export interface League {
  id: LeagueId;
  name: string;
  country: string;
  logoUrl?: string;
  season: string;
}

export interface StandingRow {
  position: number;
  team: TeamRef;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface TeamRef {
  id: TeamId;
  name: string;
  shortName?: string;
  crestUrl?: string;
}

export interface Team extends TeamRef {
  country?: string;
  founded?: number;
  venue?: string;
  squad: PlayerRef[];
}

export interface PlayerRef {
  id: PlayerId;
  name: string;
  position?: string;
  shirtNumber?: number;
}

export interface Player extends PlayerRef {
  team?: TeamRef;
  nationality?: string;
  dateOfBirth?: string;
  stats?: PlayerStats;
}

export interface PlayerStats {
  appearances?: number;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
  minutesPlayed?: number;
}