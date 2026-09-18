import { MatchSummary } from "@/lib/types";

export function StatStrip({ match }: { match: MatchSummary }) {
  const leadingTeam = match.goldLead.leadingTeamId === match.teamA.id ? match.teamA : match.teamB;
  const favoredTeam =
    match.winProbability.leadingTeamId === match.teamA.id ? match.teamA : match.teamB;

  return (
    <div className="stat-strip">
      <div className="stat-card">
        <div className="stat-label">Gold lead</div>
        <div className="stat-value pos">+{(match.goldLead.amount / 1000).toFixed(1)}k</div>
        <div className="stat-sub">{leadingTeam.name}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Kills</div>
        <div className="stat-value">
          {match.killScore[0]} <span className="stat-sep">–</span> {match.killScore[1]}
        </div>
        <div className="stat-sub">across {match.clock}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Towers</div>
        <div className="stat-value">
          {match.towerScore[0]} <span className="stat-sep">–</span> {match.towerScore[1]}
        </div>
        <div className="stat-sub">live objective count</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Win probability</div>
        <div className="stat-value pos">{match.winProbability.percent}%</div>
        <div className="stat-sub">{favoredTeam.name} favored</div>
      </div>
    </div>
  );
}
