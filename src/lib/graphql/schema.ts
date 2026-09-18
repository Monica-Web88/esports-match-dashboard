export const typeDefs = /* GraphQL */ `
  type Player {
    id: ID!
    name: String!
    role: String!
    kills: Int!
    deaths: Int!
    assists: Int!
    kdaRating: Float!
  }

  type Team {
    id: ID!
    name: String!
    shortName: String!
    seasonRecord: String!
    accent: String!
    players: [Player!]!
  }

  type GoldLead {
    leadingTeamId: String!
    amount: Int!
  }

  type WinProbability {
    leadingTeamId: String!
    percent: Int!
  }

  type Objective {
    type: String!
    label: String!
    icon: String!
    teamACount: Int!
    teamBCount: Int!
    teamATotal: Int!
  }

  type MatchSummary {
    id: ID!
    stage: String!
    bestOf: Int!
    gameNumber: Int!
    seriesScore: [Int!]!
    clock: String!
    teamA: Team!
    teamB: Team!
    goldLead: GoldLead!
    killScore: [Int!]!
    towerScore: [Int!]!
    winProbability: WinProbability!
    objectives: [Objective!]!
  }

  type TimelineSeries {
    label: String!
    teamId: String!
    data: [Int!]!
  }

  type TimelineDataset {
    key: String!
    chartType: String!
    caption: String!
    labels: [String!]!
    series: [TimelineSeries!]!
  }

  type Query {
    "Full match summary: teams, players, live scoreline."
    matchSummary: MatchSummary!
    "A single chart timeline, selected by key (gold | kills | objectives | winprob)."
    timeline(key: String!): TimelineDataset
    "All chart timelines at once."
    timelines: [TimelineDataset!]!
  }
`;
