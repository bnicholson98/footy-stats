import { z } from "zod";

export const teamRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  crestUrl: z.string().url().optional(),
});

export const leagueSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  logoUrl: z.string().url().optional(),
  season: z.string(),
});

export const standingRowSchema = z.object({
  position: z.number().int(),
  team: teamRefSchema,
  played: z.number().int(),
  won: z.number().int(),
  drawn: z.number().int(),
  lost: z.number().int(),
  goalsFor: z.number().int(),
  goalsAgainst: z.number().int(),
  goalDifference: z.number().int(),
  points: z.number().int(),
});

export const playerRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string().optional(),
  shirtNumber: z.number().int().optional(),
});

export const playerStatsSchema = z.object({
  appearances: z.number().int().optional(),
  goals: z.number().int().optional(),
  assists: z.number().int().optional(),
  yellowCards: z.number().int().optional(),
  redCards: z.number().int().optional(),
  minutesPlayed: z.number().int().optional(),
});

export const teamSchema = teamRefSchema.extend({
  country: z.string().optional(),
  founded: z.number().int().optional(),
  venue: z.string().optional(),
  squad: z.array(playerRefSchema),
});

export const playerSchema = playerRefSchema.extend({
  team: teamRefSchema.optional(),
  nationality: z.string().optional(),
  dateOfBirth: z.string().optional(),
  stats: playerStatsSchema.optional(),
});