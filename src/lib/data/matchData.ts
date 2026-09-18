import { MatchData } from "@/lib/types";

/**
 * Mock match-history data, shaped the way Riot's public esports/match-v5
 * style APIs return match data (team + participant objects, per-minute
 * timeline frames). Swap `getMatchData()` below for a real fetch against
 * Riot's esports API (or a stored match-history JSON export) once you have
 * API credentials -- the GraphQL schema and every component that consumes
 * it stay unchanged.
 */
const MOCK_MATCH: MatchData = {
  summary: {
    id: "match-2026-grandfinal-g4",
    stage: "Grand Final",
    bestOf: 5,
    gameNumber: 4,
    seriesScore: [2, 1],
    clock: "28:41",
    teamA: {
      id: "team-phoenix-reign",
      name: "Phoenix Reign",
      shortName: "PR",
      seasonRecord: "Upper Bracket · 14-3 season",
      accent: "red",
      players: [
        { id: "p1", name: "Kairo", role: "Top", kills: 4, deaths: 1, assists: 2, kdaRating: 2.4 },
        { id: "p2", name: "Juno", role: "Jungle", kills: 3, deaths: 0, assists: 6, kdaRating: 3.1 },
        { id: "p3", name: "Vellis", role: "Mid", kills: 5, deaths: 1, assists: 3, kdaRating: 2.7 },
        { id: "p4", name: "Ashdown", role: "Bot", kills: 2, deaths: 1, assists: 5, kdaRating: 2.2 },
        { id: "p5", name: "Reyes", role: "Support", kills: 0, deaths: 1, assists: 8, kdaRating: 2.0 },
      ],
    },
    teamB: {
      id: "team-steel-vipers",
      name: "Steel Vipers",
      shortName: "SV",
      seasonRecord: "Lower Bracket · 11-5 season",
      accent: "blue",
      players: [
        { id: "p6", name: "Tobric", role: "Top", kills: 2, deaths: 3, assists: 1, kdaRating: 1.0 },
        { id: "p7", name: "Mireya", role: "Jungle", kills: 1, deaths: 2, assists: 4, kdaRating: 1.4 },
        { id: "p8", name: "Halden", role: "Mid", kills: 3, deaths: 2, assists: 2, kdaRating: 1.6 },
        { id: "p9", name: "Ozren", role: "Bot", kills: 2, deaths: 1, assists: 3, kdaRating: 1.9 },
        { id: "p10", name: "Peck", role: "Support", kills: 1, deaths: 1, assists: 6, kdaRating: 1.6 },
      ],
    },
    goldLead: { leadingTeamId: "team-phoenix-reign", amount: 4200 },
    killScore: [14, 9],
    towerScore: [6, 3],
    winProbability: { leadingTeamId: "team-phoenix-reign", percent: 64 },
    objectives: [
      { type: "dragon", label: "Dragons", icon: "🐲", teamACount: 3, teamBCount: 1, teamATotal: 4 },
      { type: "tower", label: "Towers", icon: "🗼", teamACount: 6, teamBCount: 3, teamATotal: 9 },
      { type: "baron", label: "Baron", icon: "👑", teamACount: 1, teamBCount: 0, teamATotal: 1 },
    ],
  },
  timelines: {
    gold: {
      key: "gold",
      chartType: "line",
      caption: "Gold difference between teams, sampled every two minutes.",
      labels: ["2m","4m","6m","8m","10m","12m","14m","16m","18m","20m","22m","24m","26m","28m"],
      series: [
        {
          label: "Phoenix Reign gold lead",
          teamId: "team-phoenix-reign",
          data: [120, 340, 600, 510, 980, 1450, 1800, 2100, 1950, 2600, 3100, 3400, 3900, 4200],
        },
      ],
    },
    kills: {
      key: "kills",
      chartType: "bar",
      caption: "Kills secured by each team per two-minute window.",
      labels: ["2m","4m","6m","8m","10m","12m","14m","16m","18m","20m","22m","24m","26m","28m"],
      series: [
        { label: "Phoenix Reign", teamId: "team-phoenix-reign", data: [0,1,1,0,2,1,1,2,0,1,2,1,0,1] },
        { label: "Steel Vipers", teamId: "team-steel-vipers", data: [0,0,1,1,0,1,0,1,1,1,0,1,1,1] },
      ],
    },
    objectives: {
      key: "objectives",
      chartType: "line",
      caption: "Cumulative dragons, towers and Baron secured over time.",
      labels: ["2m","4m","6m","8m","10m","12m","14m","16m","18m","20m","22m","24m","26m","28m"],
      series: [
        { label: "Phoenix Reign objectives", teamId: "team-phoenix-reign", data: [0,1,1,2,3,3,4,5,5,6,7,7,8,9] },
        { label: "Steel Vipers objectives", teamId: "team-steel-vipers", data: [0,0,1,1,1,2,2,2,3,3,3,4,4,4] },
      ],
    },
    winprob: {
      key: "winprob",
      chartType: "line",
      caption: "Modeled win probability for Phoenix Reign across the game.",
      labels: ["2m","4m","6m","8m","10m","12m","14m","16m","18m","20m","22m","24m","26m","28m"],
      series: [
        { label: "Phoenix Reign win %", teamId: "team-phoenix-reign", data: [51,53,55,52,58,61,60,63,59,65,68,66,70,64] },
      ],
    },
  },
};

/**
 * Simulates an async data source (a real integration would call Riot's
 * esports API or read a stored match-history JSON file here).
 */
export async function getMatchData(): Promise<MatchData> {
  return MOCK_MATCH;
}
