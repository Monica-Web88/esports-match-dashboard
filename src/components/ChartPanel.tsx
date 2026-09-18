"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
  Tooltip,
  Filler,
  LineController,
  BarController
} from "chart.js";
import { fetchTimeline } from "@/lib/graphql/client";
import { TimelineDataset, TimelineKey } from "@/lib/types";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Legend, Tooltip, Filler, LineController, BarController);

const TABS: { key: TimelineKey; label: string }[] = [
  { key: "gold", label: "Gold diff" },
  { key: "kills", label: "Kill timeline" },
  { key: "objectives", label: "Objective control" },
  { key: "winprob", label: "Win probability" },
];

const SERIES_COLORS = ["#e6394a", "#5b9bff"];

export function ChartPanel({ initialTimeline }: { initialTimeline: TimelineDataset }) {
  const [activeKey, setActiveKey] = useState<TimelineKey>(initialTimeline.key);
  const [dataset, setDataset] = useState<TimelineDataset>(initialTimeline);
  const [fading, setFading] = useState(false);
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  // Cache timelines already fetched this session so re-clicking a tab is instant.
  const cache = useRef<Map<TimelineKey, TimelineDataset>>(new Map([[initialTimeline.key, initialTimeline]]));

  async function selectTab(key: TimelineKey) {
    if (key === activeKey) return;
    setActiveKey(key);
    setFading(true);

    // Small delay lets the CSS opacity transition play before we swap data.
    await new Promise((resolve) => setTimeout(resolve, 220));

    let next = cache.current.get(key);
    if (!next) {
      setLoading(true);
      // Live GraphQL query -- each tab click asks the API route for that
      // timeline's data, the same way a real dashboard would refresh a
      // single chart without reloading the whole page.
      next = await fetchTimeline(key);
      cache.current.set(key, next);
      setLoading(false);
    }

    setDataset(next);
    setFading(false);
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const gridColor = "rgba(148, 163, 184, 0.12)";
    const tickColor = "var(--white-500)";

    chartRef.current = new Chart(canvasRef.current, {
      type: dataset.chartType,
      data: {
        labels: dataset.labels,
        datasets: dataset.series.map((s, i) => {
          const color = SERIES_COLORS[i % SERIES_COLORS.length];
          if (dataset.chartType === "bar") {
            return {
              label: s.label,
              data: s.data,
              backgroundColor: color,
              borderRadius: 4,
              maxBarThickness: 18,
            };
          }
          return {
            label: s.label,
            data: s.data,
            borderColor: color,
            backgroundColor: `${color}26`,
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2.5,
          };
        }),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 700, easing: "easeOutQuart" },
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            display: true,
            labels: { usePointStyle: true, boxWidth: 8, font: { family: "Inter", size: 11.5 } },
          },
        },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
          y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { size: 11 } } },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [dataset]);

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <div className="panel-title">Match trends</div>
          <div className="panel-sub">Click a stat to change the view</div>
        </div>
        <div className="tab-row" role="tablist" aria-label="Chart selection">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeKey === tab.key}
              className={`tab-btn${activeKey === tab.key ? " active" : ""}`}
              onClick={() => selectTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`chart-wrap${fading || loading ? " fading" : ""}`}>
        <canvas ref={canvasRef} role="img" aria-label={dataset.caption} />
      </div>
      <div className="chart-caption">{dataset.caption}</div>
    </div>
  );
}
