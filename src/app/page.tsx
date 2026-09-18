import { ScoreBoard } from "@/components/ScoreBoard";
import { StatStrip } from "@/components/StatStrip";
import { ChartPanel } from "@/components/ChartPanel";
import { RosterList } from "@/components/RosterList";
import { ObjectiveTracker } from "@/components/ObjectiveTracker";
import { ThemeToggle } from "@/components/ThemeToggle";
import { fetchMatchSummary, fetchTimeline } from "@/lib/graphql/client";

// Renders on the server on every request so the "LIVE" dashboard always
// reflects the latest match data from the GraphQL API.
export const dynamic = "force-dynamic";

export default async function Home() {
  // Both calls go through the same GraphQL schema exposed at /api/graphql --
  // fetched directly on the server here for a fast first paint, and again
  // from the browser (see ChartPanel) whenever the viewer switches tabs.
  const [match, goldTimeline] = await Promise.all([
    fetchMatchSummary(),
    fetchTimeline("gold"),
  ]);

  return (
    <>
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark">EA</div>
          ESPORTS ANALYTICS
        </div>
        <div className="top-right">
          <div className="live-pill">
            <span className="live-dot" />
            LIVE — {match.stage.toUpperCase()}
          </div>
          <ThemeToggle />
        </div>
      </div>

      <ScoreBoard match={match} />
      <StatStrip match={match} />

      <div className="main-grid">
        <ChartPanel initialTimeline={goldTimeline} />

        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Roster</div>
              <div className="panel-sub">Hover a player for live form</div>
            </div>
          </div>
          <RosterList teamA={match.teamA} teamB={match.teamB} />
          <ObjectiveTracker objectives={match.objectives} />
        </div>
      </div>

      <footer>
        Portfolio project — Next.js, TypeScript, and GraphQL, deployed on Vercel.
      </footer>
    </>
  );
}
