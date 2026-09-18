import { getMatchData } from "@/lib/data/matchData";
import { TimelineKey } from "@/lib/types";

export const resolvers = {
  Query: {
    matchSummary: async () => {
      const data = await getMatchData();
      return data.summary;
    },
    timeline: async (_: unknown, args: { key: string }) => {
      const data = await getMatchData();
      const key = args.key as TimelineKey;
      return data.timelines[key] ?? null;
    },
    timelines: async () => {
      const data = await getMatchData();
      return Object.values(data.timelines);
    },
  },
};
