export type ThemeMode = "dark" | "light";

export interface Player {
  id: string;
  name: string;
  role: "Top" | "Jungle" | "Mid" | "Bot" | "Support";
  kills: number;
  deaths: number;
  assists: number;
  kdaRating: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  seasonRecord: string;
  accent: "red" | "blue";
  players: Player[];
}

export interface ObjectiveCount {
  type: "dragon" | "tower" | "baron";
  label: string;
  icon: string;
  teamACount: number;
  teamBCount: number;
  teamATotal: number;
}

export interface MatchSummary {
  id: string;
  stage: string;
  bestOf: number;
  gameNumber: number;
  seriesScore: [number, number];
  clock: string;
  teamA: Team;
  teamB: Team;
  goldLead: {
    leadingTeamId: string;
    amount: number;
  };
  killScore: [number, number];
  towerScore: [number, number];
  winProbability: {
    leadingTeamId: string;
    percent: number;
  };
  objectives: ObjectiveCount[];
}

export type TimelineKey = "gold" | "kills" | "objectives" | "winprob";

export interface TimelineSeries {
  label: string;
  teamId: string;
  data: number[];
}

export interface TimelineDataset {
  key: TimelineKey;
  chartType: "line" | "bar";
  caption: string;
  labels: string[];
  series: TimelineSeries[];
}

export interface MatchData {
  summary: MatchSummary;
  timelines: Record<TimelineKey, TimelineDataset>;
}
