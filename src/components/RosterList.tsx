import { Team } from "@/lib/types";

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function RosterList({ teamA, teamB }: { teamA: Team; teamB: Team }) {
  return (
    <div>
      <div className="roster-divider">{teamA.name.toUpperCase()}</div>
      <div className="roster-list">
        {teamA.players.map((p) => (
          <div className="player-row" key={p.id}>
            <div className="player-avatar avatar-red">{initials(p.name)}</div>
            <div className="player-info">
              <div className="pname">{p.name}</div>
              <div className="prole">{p.role}</div>
            </div>
            <div className="player-kda">
              {p.kills}/{p.deaths}/{p.assists}
              <span className="kda-sub">{p.kdaRating.toFixed(1)} KDA</span>
            </div>
          </div>
        ))}
      </div>

      <div className="roster-divider">{teamB.name.toUpperCase()}</div>
      <div className="roster-list">
        {teamB.players.map((p) => (
          <div className="player-row" key={p.id}>
            <div className="player-avatar avatar-blue">{initials(p.name)}</div>
            <div className="player-info">
              <div className="pname">{p.name}</div>
              <div className="prole">{p.role}</div>
            </div>
            <div className="player-kda">
              {p.kills}/{p.deaths}/{p.assists}
              <span className="kda-sub">{p.kdaRating.toFixed(1)} KDA</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
