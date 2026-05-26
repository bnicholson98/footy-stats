import type { FootballProvider } from "../provider";
import type { League, StandingRow, Team, Player } from "../types";

// ── Leagues ──────────────────────────────────────────────────

const leagues: League[] = [
  { id: "premier-league", name: "Premier League", country: "England", season: "2024/25" },
  { id: "la-liga", name: "La Liga", country: "Spain", season: "2024/25" },
  { id: "serie-a", name: "Serie A", country: "Italy", season: "2024/25" },
  { id: "bundesliga", name: "Bundesliga", country: "Germany", season: "2024/25" },
  { id: "ligue-1", name: "Ligue 1", country: "France", season: "2024/25" },
];

// ── Standings ────────────────────────────────────────────────

const standings: Record<string, StandingRow[]> = {
  "premier-league": [
    {
      position: 1,
      team: { id: "t-liverpool", name: "Liverpool", shortName: "LIV" },
      played: 20, won: 15, drawn: 3, lost: 2,
      goalsFor: 45, goalsAgainst: 15, goalDifference: 30, points: 48,
    },
    {
      position: 2,
      team: { id: "t-arsenal", name: "Arsenal", shortName: "ARS" },
      played: 20, won: 14, drawn: 4, lost: 2,
      goalsFor: 40, goalsAgainst: 12, goalDifference: 28, points: 46,
    },
    {
      position: 3,
      team: { id: "t-mancity", name: "Manchester City", shortName: "MCI" },
      played: 20, won: 12, drawn: 4, lost: 4,
      goalsFor: 42, goalsAgainst: 20, goalDifference: 22, points: 40,
    },
    {
      position: 4,
      team: { id: "t-chelsea", name: "Chelsea", shortName: "CHE" },
      played: 20, won: 11, drawn: 5, lost: 4,
      goalsFor: 35, goalsAgainst: 18, goalDifference: 17, points: 38,
    },
    {
      position: 5,
      team: { id: "t-tottenham", name: "Tottenham Hotspur", shortName: "TOT" },
      played: 20, won: 10, drawn: 5, lost: 5,
      goalsFor: 34, goalsAgainst: 22, goalDifference: 12, points: 35,
    },
    {
      position: 6,
      team: { id: "t-newcastle", name: "Newcastle United", shortName: "NEW" },
      played: 20, won: 10, drawn: 4, lost: 6,
      goalsFor: 30, goalsAgainst: 20, goalDifference: 10, points: 34,
    },
    {
      position: 7,
      team: { id: "t-manunited", name: "Manchester United", shortName: "MUN" },
      played: 20, won: 8, drawn: 6, lost: 6,
      goalsFor: 28, goalsAgainst: 24, goalDifference: 4, points: 30,
    },
    {
      position: 8,
      team: { id: "t-brighton", name: "Brighton & Hove Albion", shortName: "BHA" },
      played: 20, won: 8, drawn: 5, lost: 7,
      goalsFor: 26, goalsAgainst: 25, goalDifference: 1, points: 29,
    },
  ],
  "la-liga": [
    {
      position: 1,
      team: { id: "t-realmadrid", name: "Real Madrid", shortName: "RMA" },
      played: 20, won: 14, drawn: 4, lost: 2,
      goalsFor: 38, goalsAgainst: 14, goalDifference: 24, points: 46,
    },
    {
      position: 2,
      team: { id: "t-barcelona", name: "FC Barcelona", shortName: "BAR" },
      played: 20, won: 14, drawn: 3, lost: 3,
      goalsFor: 48, goalsAgainst: 20, goalDifference: 28, points: 45,
    },
    {
      position: 3,
      team: { id: "t-atletico", name: "Atlético Madrid", shortName: "ATM" },
      played: 20, won: 13, drawn: 4, lost: 3,
      goalsFor: 32, goalsAgainst: 14, goalDifference: 18, points: 43,
    },
    {
      position: 4,
      team: { id: "t-athletic", name: "Athletic Club", shortName: "ATH" },
      played: 20, won: 11, drawn: 5, lost: 4,
      goalsFor: 28, goalsAgainst: 16, goalDifference: 12, points: 38,
    },
    {
      position: 5,
      team: { id: "t-realsociedad", name: "Real Sociedad", shortName: "RSO" },
      played: 20, won: 9, drawn: 7, lost: 4,
      goalsFor: 26, goalsAgainst: 18, goalDifference: 8, points: 34,
    },
    {
      position: 6,
      team: { id: "t-villarreal", name: "Villarreal", shortName: "VIL" },
      played: 20, won: 9, drawn: 5, lost: 6,
      goalsFor: 30, goalsAgainst: 24, goalDifference: 6, points: 32,
    },
    {
      position: 7,
      team: { id: "t-betis", name: "Real Betis", shortName: "BET" },
      played: 20, won: 8, drawn: 6, lost: 6,
      goalsFor: 25, goalsAgainst: 22, goalDifference: 3, points: 30,
    },
    {
      position: 8,
      team: { id: "t-girona", name: "Girona", shortName: "GIR" },
      played: 20, won: 7, drawn: 5, lost: 8,
      goalsFor: 24, goalsAgainst: 28, goalDifference: -4, points: 26,
    },
  ],
  "serie-a": [
    {
      position: 1,
      team: { id: "t-inter", name: "Inter Milan", shortName: "INT" },
      played: 20, won: 15, drawn: 3, lost: 2,
      goalsFor: 42, goalsAgainst: 16, goalDifference: 26, points: 48,
    },
    {
      position: 2,
      team: { id: "t-napoli", name: "SSC Napoli", shortName: "NAP" },
      played: 20, won: 14, drawn: 4, lost: 2,
      goalsFor: 36, goalsAgainst: 14, goalDifference: 22, points: 46,
    },
    {
      position: 3,
      team: { id: "t-juventus", name: "Juventus", shortName: "JUV" },
      played: 20, won: 11, drawn: 7, lost: 2,
      goalsFor: 30, goalsAgainst: 15, goalDifference: 15, points: 40,
    },
    {
      position: 4,
      team: { id: "t-acmilan", name: "AC Milan", shortName: "MIL" },
      played: 20, won: 11, drawn: 4, lost: 5,
      goalsFor: 34, goalsAgainst: 22, goalDifference: 12, points: 37,
    },
    {
      position: 5,
      team: { id: "t-atalanta", name: "Atalanta", shortName: "ATA" },
      played: 20, won: 11, drawn: 3, lost: 6,
      goalsFor: 38, goalsAgainst: 24, goalDifference: 14, points: 36,
    },
    {
      position: 6,
      team: { id: "t-lazio", name: "SS Lazio", shortName: "LAZ" },
      played: 20, won: 10, drawn: 4, lost: 6,
      goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 34,
    },
    {
      position: 7,
      team: { id: "t-roma", name: "AS Roma", shortName: "ROM" },
      played: 20, won: 8, drawn: 5, lost: 7,
      goalsFor: 24, goalsAgainst: 22, goalDifference: 2, points: 29,
    },
    {
      position: 8,
      team: { id: "t-fiorentina", name: "Fiorentina", shortName: "FIO" },
      played: 20, won: 7, drawn: 6, lost: 7,
      goalsFor: 22, goalsAgainst: 24, goalDifference: -2, points: 27,
    },
  ],
  bundesliga: [
    {
      position: 1,
      team: { id: "t-bayern", name: "Bayern Munich", shortName: "FCB" },
      played: 18, won: 14, drawn: 2, lost: 2,
      goalsFor: 48, goalsAgainst: 16, goalDifference: 32, points: 44,
    },
    {
      position: 2,
      team: { id: "t-leverkusen", name: "Bayer Leverkusen", shortName: "B04" },
      played: 18, won: 13, drawn: 3, lost: 2,
      goalsFor: 40, goalsAgainst: 18, goalDifference: 22, points: 42,
    },
    {
      position: 3,
      team: { id: "t-dortmund", name: "Borussia Dortmund", shortName: "BVB" },
      played: 18, won: 11, drawn: 3, lost: 4,
      goalsFor: 36, goalsAgainst: 22, goalDifference: 14, points: 36,
    },
    {
      position: 4,
      team: { id: "t-leipzig", name: "RB Leipzig", shortName: "RBL" },
      played: 18, won: 10, drawn: 4, lost: 4,
      goalsFor: 32, goalsAgainst: 20, goalDifference: 12, points: 34,
    },
    {
      position: 5,
      team: { id: "t-stuttgart", name: "VfB Stuttgart", shortName: "STU" },
      played: 18, won: 9, drawn: 5, lost: 4,
      goalsFor: 30, goalsAgainst: 20, goalDifference: 10, points: 32,
    },
    {
      position: 6,
      team: { id: "t-frankfurt", name: "Eintracht Frankfurt", shortName: "SGE" },
      played: 18, won: 9, drawn: 3, lost: 6,
      goalsFor: 28, goalsAgainst: 24, goalDifference: 4, points: 30,
    },
    {
      position: 7,
      team: { id: "t-freiburg", name: "SC Freiburg", shortName: "SCF" },
      played: 18, won: 7, drawn: 5, lost: 6,
      goalsFor: 22, goalsAgainst: 22, goalDifference: 0, points: 26,
    },
    {
      position: 8,
      team: { id: "t-wolfsburg", name: "VfL Wolfsburg", shortName: "WOB" },
      played: 18, won: 6, drawn: 5, lost: 7,
      goalsFor: 20, goalsAgainst: 24, goalDifference: -4, points: 23,
    },
  ],
  "ligue-1": [
    {
      position: 1,
      team: { id: "t-psg", name: "Paris Saint-Germain", shortName: "PSG" },
      played: 20, won: 16, drawn: 2, lost: 2,
      goalsFor: 50, goalsAgainst: 14, goalDifference: 36, points: 50,
    },
    {
      position: 2,
      team: { id: "t-monaco", name: "AS Monaco", shortName: "MON" },
      played: 20, won: 13, drawn: 4, lost: 3,
      goalsFor: 38, goalsAgainst: 18, goalDifference: 20, points: 43,
    },
    {
      position: 3,
      team: { id: "t-marseille", name: "Olympique Marseille", shortName: "OM" },
      played: 20, won: 12, drawn: 3, lost: 5,
      goalsFor: 34, goalsAgainst: 20, goalDifference: 14, points: 39,
    },
    {
      position: 4,
      team: { id: "t-lille", name: "LOSC Lille", shortName: "LIL" },
      played: 20, won: 11, drawn: 5, lost: 4,
      goalsFor: 28, goalsAgainst: 16, goalDifference: 12, points: 38,
    },
    {
      position: 5,
      team: { id: "t-lyon", name: "Olympique Lyonnais", shortName: "OL" },
      played: 20, won: 10, drawn: 4, lost: 6,
      goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 34,
    },
    {
      position: 6,
      team: { id: "t-nice", name: "OGC Nice", shortName: "NIC" },
      played: 20, won: 9, drawn: 5, lost: 6,
      goalsFor: 26, goalsAgainst: 20, goalDifference: 6, points: 32,
    },
    {
      position: 7,
      team: { id: "t-lens", name: "RC Lens", shortName: "LEN" },
      played: 20, won: 8, drawn: 5, lost: 7,
      goalsFor: 24, goalsAgainst: 22, goalDifference: 2, points: 29,
    },
    {
      position: 8,
      team: { id: "t-rennes", name: "Stade Rennais", shortName: "REN" },
      played: 20, won: 7, drawn: 4, lost: 9,
      goalsFor: 22, goalsAgainst: 28, goalDifference: -6, points: 25,
    },
  ],
};

// ── Teams ────────────────────────────────────────────────────
// Every team in standings gets a basic entry (empty squad).
// The four detailed teams below override with full squad data.

const detailedTeams: Record<string, Team> = {
  "t-arsenal": {
    id: "t-arsenal",
    name: "Arsenal",
    shortName: "ARS",
    country: "England",
    founded: 1886,
    venue: "Emirates Stadium",
    squad: [
      { id: "p-raya", name: "David Raya", position: "Goalkeeper", shirtNumber: 22 },
      { id: "p-saliba", name: "William Saliba", position: "Defender", shirtNumber: 2 },
      { id: "p-rice", name: "Declan Rice", position: "Midfielder", shirtNumber: 41 },
      { id: "p-odegaard", name: "Martin Ødegaard", position: "Midfielder", shirtNumber: 8 },
      { id: "p-saka", name: "Bukayo Saka", position: "Forward", shirtNumber: 7 },
      { id: "p-havertz", name: "Kai Havertz", position: "Forward", shirtNumber: 29 },
    ],
  },
  "t-barcelona": {
    id: "t-barcelona",
    name: "FC Barcelona",
    shortName: "BAR",
    country: "Spain",
    founded: 1899,
    venue: "Estadi Olímpic Lluís Companys",
    squad: [
      { id: "p-terstegen", name: "Marc-André ter Stegen", position: "Goalkeeper", shirtNumber: 1 },
      { id: "p-araujo", name: "Ronald Araújo", position: "Defender", shirtNumber: 4 },
      { id: "p-pedri", name: "Pedri", position: "Midfielder", shirtNumber: 8 },
      { id: "p-raphinha", name: "Raphinha", position: "Forward", shirtNumber: 11 },
      { id: "p-yamal", name: "Lamine Yamal", position: "Forward", shirtNumber: 19 },
      { id: "p-lewandowski", name: "Robert Lewandowski", position: "Forward", shirtNumber: 9 },
    ],
  },
  "t-bayern": {
    id: "t-bayern",
    name: "Bayern Munich",
    shortName: "FCB",
    country: "Germany",
    founded: 1900,
    venue: "Allianz Arena",
    squad: [
      { id: "p-neuer", name: "Manuel Neuer", position: "Goalkeeper", shirtNumber: 1 },
      { id: "p-upamecano", name: "Dayot Upamecano", position: "Defender", shirtNumber: 2 },
      { id: "p-kimmich", name: "Joshua Kimmich", position: "Midfielder", shirtNumber: 6 },
      { id: "p-musiala", name: "Jamal Musiala", position: "Midfielder", shirtNumber: 42 },
      { id: "p-sane", name: "Leroy Sané", position: "Forward", shirtNumber: 10 },
      { id: "p-kane", name: "Harry Kane", position: "Forward", shirtNumber: 9 },
    ],
  },
  "t-inter": {
    id: "t-inter",
    name: "Inter Milan",
    shortName: "INT",
    country: "Italy",
    founded: 1908,
    venue: "San Siro",
    squad: [
      { id: "p-sommer", name: "Yann Sommer", position: "Goalkeeper", shirtNumber: 1 },
      { id: "p-bastoni", name: "Alessandro Bastoni", position: "Defender", shirtNumber: 95 },
      { id: "p-barella", name: "Nicolò Barella", position: "Midfielder", shirtNumber: 23 },
      { id: "p-calhanoglu", name: "Hakan Çalhanoğlu", position: "Midfielder", shirtNumber: 20 },
      { id: "p-thuram", name: "Marcus Thuram", position: "Forward", shirtNumber: 9 },
      { id: "p-lautaro", name: "Lautaro Martínez", position: "Forward", shirtNumber: 10 },
    ],
  },
};

const teams: Record<string, Team> = {};
for (const rows of Object.values(standings)) {
  for (const row of rows) {
    teams[row.team.id] = { ...row.team, squad: [] };
  }
}
Object.assign(teams, detailedTeams);

// ── Players ──────────────────────────────────────────────────

const arsRef = { id: "t-arsenal", name: "Arsenal", shortName: "ARS" };
const barRef = { id: "t-barcelona", name: "FC Barcelona", shortName: "BAR" };
const bayRef = { id: "t-bayern", name: "Bayern Munich", shortName: "FCB" };
const intRef = { id: "t-inter", name: "Inter Milan", shortName: "INT" };

const players: Record<string, Player> = {
  // ── Arsenal ──
  "p-raya": {
    id: "p-raya", name: "David Raya", position: "Goalkeeper", shirtNumber: 22,
    team: arsRef, nationality: "Spain", dateOfBirth: "1995-09-15",
    stats: { appearances: 20, goals: 0, assists: 0, yellowCards: 1, redCards: 0, minutesPlayed: 1800 },
  },
  "p-saliba": {
    id: "p-saliba", name: "William Saliba", position: "Defender", shirtNumber: 2,
    team: arsRef, nationality: "France", dateOfBirth: "2001-03-24",
    stats: { appearances: 19, goals: 1, assists: 0, yellowCards: 4, redCards: 0, minutesPlayed: 1710 },
  },
  "p-rice": {
    id: "p-rice", name: "Declan Rice", position: "Midfielder", shirtNumber: 41,
    team: arsRef, nationality: "England", dateOfBirth: "1999-01-14",
    stats: { appearances: 19, goals: 3, assists: 5, yellowCards: 6, redCards: 0, minutesPlayed: 1650 },
  },
  "p-odegaard": {
    id: "p-odegaard", name: "Martin Ødegaard", position: "Midfielder", shirtNumber: 8,
    team: arsRef, nationality: "Norway", dateOfBirth: "1998-12-17",
    stats: { appearances: 15, goals: 5, assists: 7, yellowCards: 2, redCards: 0, minutesPlayed: 1280 },
  },
  "p-saka": {
    id: "p-saka", name: "Bukayo Saka", position: "Forward", shirtNumber: 7,
    team: arsRef, nationality: "England", dateOfBirth: "2001-09-05",
    stats: { appearances: 18, goals: 8, assists: 10, yellowCards: 3, redCards: 0, minutesPlayed: 1520 },
  },
  "p-havertz": {
    id: "p-havertz", name: "Kai Havertz", position: "Forward", shirtNumber: 29,
    team: arsRef, nationality: "Germany", dateOfBirth: "1999-06-11",
    stats: { appearances: 20, goals: 9, assists: 3, yellowCards: 3, redCards: 0, minutesPlayed: 1600 },
  },
  // ── Barcelona ──
  "p-terstegen": {
    id: "p-terstegen", name: "Marc-André ter Stegen", position: "Goalkeeper", shirtNumber: 1,
    team: barRef, nationality: "Germany", dateOfBirth: "1992-04-30",
    stats: { appearances: 10, goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 900 },
  },
  "p-araujo": {
    id: "p-araujo", name: "Ronald Araújo", position: "Defender", shirtNumber: 4,
    team: barRef, nationality: "Uruguay", dateOfBirth: "1999-03-07",
    stats: { appearances: 12, goals: 1, assists: 0, yellowCards: 3, redCards: 0, minutesPlayed: 1020 },
  },
  "p-pedri": {
    id: "p-pedri", name: "Pedri", position: "Midfielder", shirtNumber: 8,
    team: barRef, nationality: "Spain", dateOfBirth: "2002-11-25",
    stats: { appearances: 17, goals: 4, assists: 6, yellowCards: 2, redCards: 0, minutesPlayed: 1380 },
  },
  "p-raphinha": {
    id: "p-raphinha", name: "Raphinha", position: "Forward", shirtNumber: 11,
    team: barRef, nationality: "Brazil", dateOfBirth: "1996-12-14",
    stats: { appearances: 19, goals: 10, assists: 8, yellowCards: 4, redCards: 0, minutesPlayed: 1580 },
  },
  "p-yamal": {
    id: "p-yamal", name: "Lamine Yamal", position: "Forward", shirtNumber: 19,
    team: barRef, nationality: "Spain", dateOfBirth: "2007-07-13",
    stats: { appearances: 18, goals: 7, assists: 9, yellowCards: 1, redCards: 0, minutesPlayed: 1400 },
  },
  "p-lewandowski": {
    id: "p-lewandowski", name: "Robert Lewandowski", position: "Forward", shirtNumber: 9,
    team: barRef, nationality: "Poland", dateOfBirth: "1988-08-21",
    stats: { appearances: 20, goals: 15, assists: 4, yellowCards: 2, redCards: 0, minutesPlayed: 1700 },
  },
  // ── Bayern Munich ──
  "p-neuer": {
    id: "p-neuer", name: "Manuel Neuer", position: "Goalkeeper", shirtNumber: 1,
    team: bayRef, nationality: "Germany", dateOfBirth: "1986-03-27",
    stats: { appearances: 16, goals: 0, assists: 0, yellowCards: 1, redCards: 0, minutesPlayed: 1440 },
  },
  "p-upamecano": {
    id: "p-upamecano", name: "Dayot Upamecano", position: "Defender", shirtNumber: 2,
    team: bayRef, nationality: "France", dateOfBirth: "1998-10-27",
    stats: { appearances: 17, goals: 1, assists: 0, yellowCards: 5, redCards: 1, minutesPlayed: 1480 },
  },
  "p-kimmich": {
    id: "p-kimmich", name: "Joshua Kimmich", position: "Midfielder", shirtNumber: 6,
    team: bayRef, nationality: "Germany", dateOfBirth: "1995-02-08",
    stats: { appearances: 18, goals: 2, assists: 8, yellowCards: 4, redCards: 0, minutesPlayed: 1600 },
  },
  "p-musiala": {
    id: "p-musiala", name: "Jamal Musiala", position: "Midfielder", shirtNumber: 42,
    team: bayRef, nationality: "Germany", dateOfBirth: "2003-02-26",
    stats: { appearances: 18, goals: 10, assists: 5, yellowCards: 1, redCards: 0, minutesPlayed: 1500 },
  },
  "p-sane": {
    id: "p-sane", name: "Leroy Sané", position: "Forward", shirtNumber: 10,
    team: bayRef, nationality: "Germany", dateOfBirth: "1996-01-11",
    stats: { appearances: 15, goals: 6, assists: 4, yellowCards: 2, redCards: 0, minutesPlayed: 1100 },
  },
  "p-kane": {
    id: "p-kane", name: "Harry Kane", position: "Forward", shirtNumber: 9,
    team: bayRef, nationality: "England", dateOfBirth: "1993-07-28",
    stats: { appearances: 18, goals: 20, assists: 7, yellowCards: 2, redCards: 0, minutesPlayed: 1580 },
  },
  // ── Inter Milan ──
  "p-sommer": {
    id: "p-sommer", name: "Yann Sommer", position: "Goalkeeper", shirtNumber: 1,
    team: intRef, nationality: "Switzerland", dateOfBirth: "1988-12-17",
    stats: { appearances: 20, goals: 0, assists: 0, yellowCards: 0, redCards: 0, minutesPlayed: 1800 },
  },
  "p-bastoni": {
    id: "p-bastoni", name: "Alessandro Bastoni", position: "Defender", shirtNumber: 95,
    team: intRef, nationality: "Italy", dateOfBirth: "1999-04-13",
    stats: { appearances: 19, goals: 2, assists: 3, yellowCards: 3, redCards: 0, minutesPlayed: 1700 },
  },
  "p-barella": {
    id: "p-barella", name: "Nicolò Barella", position: "Midfielder", shirtNumber: 23,
    team: intRef, nationality: "Italy", dateOfBirth: "1997-02-07",
    stats: { appearances: 19, goals: 4, assists: 6, yellowCards: 5, redCards: 0, minutesPlayed: 1620 },
  },
  "p-calhanoglu": {
    id: "p-calhanoglu", name: "Hakan Çalhanoğlu", position: "Midfielder", shirtNumber: 20,
    team: intRef, nationality: "Turkey", dateOfBirth: "1994-02-08",
    stats: { appearances: 18, goals: 6, assists: 4, yellowCards: 6, redCards: 0, minutesPlayed: 1500 },
  },
  "p-thuram": {
    id: "p-thuram", name: "Marcus Thuram", position: "Forward", shirtNumber: 9,
    team: intRef, nationality: "France", dateOfBirth: "1997-08-06",
    stats: { appearances: 20, goals: 12, assists: 5, yellowCards: 3, redCards: 0, minutesPlayed: 1650 },
  },
  "p-lautaro": {
    id: "p-lautaro", name: "Lautaro Martínez", position: "Forward", shirtNumber: 10,
    team: intRef, nationality: "Argentina", dateOfBirth: "1997-08-22",
    stats: { appearances: 20, goals: 14, assists: 3, yellowCards: 2, redCards: 0, minutesPlayed: 1720 },
  },
};

// ── Provider ─────────────────────────────────────────────────

export class MockProvider implements FootballProvider {
  async getLeagues(): Promise<League[]> {
    return leagues;
  }

  async getLeague(id: string): Promise<League | null> {
    return leagues.find((l) => l.id === id) ?? null;
  }

  async getStandings(leagueId: string): Promise<StandingRow[]> {
    return standings[leagueId] ?? [];
  }

  async getTeam(id: string): Promise<Team | null> {
    return teams[id] ?? null;
  }

  async getPlayer(id: string): Promise<Player | null> {
    return players[id] ?? null;
  }
}