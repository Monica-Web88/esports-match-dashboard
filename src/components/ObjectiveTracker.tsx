import { ObjectiveCount } from "@/lib/types";

export function ObjectiveTracker({ objectives }: { objectives: ObjectiveCount[] }) {
  return (
    <div>
      <div className="roster-divider">OBJECTIVE CONTROL</div>
      <div className="obj-list">
        {objectives.map((obj) => (
          <div className="obj-item" key={obj.type}>
            <div className="obj-icon">{obj.icon}</div>
            <div className="obj-track">
              <div
                className="obj-fill"
                style={{ width: `${Math.round((obj.teamACount / obj.teamATotal) * 100)}%` }}
              />
            </div>
            <div className="obj-count">
              {obj.teamACount}–{obj.teamBCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
