import { MatchSummary } from "@/lib/types";
import { PhoenixIcon } from "@/components/icons/PhoenixIcon";
import { ViperIcon } from "@/components/icons/ViperIcon";


export function ScoreBoard({ match }: { match: MatchSummary }) {
  const [seriesA, seriesB] = match.seriesScore;

  return (
    <div className="scoreboard">
      <div className="team">
        <div className="team-crest crest-a"><PhoenixIcon /></div>
        <div>
          <div className="team-name">{match.teamA.name}</div>
          <div className="team-record">{match.teamA.seasonRecord}</div>
        </div>
      </div>

      <div className="score-center">
        <div className="score-num">
          <span>{seriesA}</span>
          <span className="score-sep">–</span>
          <span>{seriesB}</span>
        </div>
        <div className="match-meta">
          {match.stage.toUpperCase()} · BEST OF {match.bestOf} · GAME {match.gameNumber}
        </div>
        <div className="game-clock">{match.clock} elapsed</div>
      </div>

      <div className="team right">
        <div className="team-crest crest-b"><ViperIcon /></div>
        <div>
          <div className="team-name">{match.teamB.name}</div>
          <div className="team-record">{match.teamB.seasonRecord}</div>
        </div>
      </div>
    </div>
  );
}
