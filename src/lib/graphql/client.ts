import { GraphQLClient, gql } from "graphql-request";
import { MatchSummary, TimelineDataset, TimelineKey } from "@/lib/types";

// Resolves to a same-origin URL both in the browser and on the server
// (Next.js dev/prod server), so the same client works for SSR and for
// client-side re-fetches triggered from ChartPanel.
function endpoint() {
  if (typeof window !== "undefined") return "/api/graphql";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${base}/api/graphql`;
}

function client() {
  return new GraphQLClient(endpoint());
}

export const MATCH_SUMMARY_QUERY = gql`
  query MatchSummary {
    matchSummary {
      id
      stage
      bestOf
      gameNumber
      seriesScore
      clock
      teamA {
        id
        name
        shortName
        seasonRecord
        accent
        players { id name role kills deaths assists kdaRating }
      }
      teamB {
        id
        name
        shortName
        seasonRecord
        accent
        players { id name role kills deaths assists kdaRating }
      }
      goldLead { leadingTeamId amount }
      killScore
      towerScore
      winProbability { leadingTeamId percent }
      objectives { type label icon teamACount teamBCount teamATotal }
    }
  }
`;

export const TIMELINE_QUERY = gql`
  query Timeline($key: String!) {
    timeline(key: $key) {
      key
      chartType
      caption
      labels
      series { label teamId data }
    }
  }
`;

export async function fetchMatchSummary(): Promise<MatchSummary> {
  const data = await client().request<{ matchSummary: MatchSummary }>(MATCH_SUMMARY_QUERY);
  return data.matchSummary;
}

export async function fetchTimeline(key: TimelineKey): Promise<TimelineDataset> {
  const data = await client().request<{ timeline: TimelineDataset }>(TIMELINE_QUERY, { key });
  return data.timeline;
}
