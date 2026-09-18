"use client";

import { useEffect, useState } from "react";
import { ThemeMode } from "@/lib/types";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("esports-dashboard-theme") as ThemeMode | null;
      if (stored === "light" || stored === "dark") {
        setMode(stored);
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) -- default theme stands.
    }
  }, []);

  function toggle() {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("esports-dashboard-theme", next);
    } catch {
      // ignore -- theme still applies for this session
    }
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {mode === "dark" ? "◐" : "◑"}
    </button>
  );
}
