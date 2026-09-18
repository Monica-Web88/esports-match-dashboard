# Esports Match Analytics Dashboard

Built with **Next.js 14 (App Router) + TypeScript**, live match data served via
a **GraphQL** API route, deployed on **Vercel**, tested with **Playwright**.

A live esports match dashboard: scoreboard, stat cards, an interactive chart
panel (gold diff, kill timeline, objective control, win probability), and a
roster panel with hover states — built as a portfolio project targeting
esports/web-platform engineering roles.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![GraphQL](https://img.shields.io/badge/GraphQL-yoga-e10098)
![Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33)

## Stack

| Layer          | Choice                                   |
|----------------|-------------------------------------------|
| Framework      | Next.js 14, App Router, React Server Components |
| Language       | TypeScript (strict mode)                  |
| Data layer     | GraphQL (`graphql-yoga` API route + `graphql-request` client) |
| Charts         | Chart.js via `react-chartjs-2`            |
| Testing        | Playwright (end-to-end)                   |
| Hosting        | Vercel                                    |

## Why GraphQL here

The dashboard exposes one schema (`src/lib/graphql/schema.ts`) with three
queries: `matchSummary`, `timeline(key)`, and `timelines`. It's used in two
places:

- **Server-side, on first load** (`src/app/page.tsx`) — the page fetches
  `matchSummary` and the initial `gold` timeline directly from the GraphQL
  endpoint before rendering, so the first paint is fast and fully populated.
- **Client-side, on tab switch** (`src/components/ChartPanel.tsx`) — clicking
  a chart tab (Gold diff / Kill timeline / Objective control / Win
  probability) fires a real GraphQL query for just that timeline, the same
  way a production dashboard would refresh a single chart without reloading
  the page. Results are cached per session so re-clicking a tab is instant.

Visit `/api/graphql` directly in a browser to open the GraphiQL playground
and explore or run queries against the schema by hand.

## Data

`src/lib/data/matchData.ts` currently returns mock match data shaped the way
a real match-history payload looks (teams, players, per-minute timeline
frames) — this is intentional so the schema, resolvers and UI are already
correct for a real feed.

To wire in real data:

1. Replace `getMatchData()` in `src/lib/data/matchData.ts` with a call to
   Riot's public esports API (or a stored match-history JSON export).
2. Leave the GraphQL schema, resolvers, and every React component untouched
   — they only depend on the `MatchData` shape in `src/lib/types.ts`, not on
   where the data came from.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

Three Playwright end-to-end tests cover the interactive parts of the
dashboard:

1. the scoreboard renders both team names and the correct series score
2. clicking a chart tab switches the active tab and updates the chart
3. the theme toggle switches the page between dark and light mode

```bash
npx playwright install --with-deps chromium   # first time only
npm run test:e2e
```

## Deploying to Vercel

This is a standard Next.js app, so it deploys to Vercel with zero config:

```bash
npm i -g vercel
vercel
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) and
Vercel will detect the Next.js framework automatically.

## Project structure

```
src/
  app/
    api/graphql/route.ts   # GraphQL API route (graphql-yoga)
    layout.tsx
    page.tsx                # server component: SSR data fetch
    globals.css
  components/
    ScoreBoard.tsx
    StatStrip.tsx
    ChartPanel.tsx           # client component: tabs + Chart.js + GraphQL
    RosterList.tsx
    ObjectiveTracker.tsx
    ThemeToggle.tsx
  lib/
    graphql/
      schema.ts              # SDL type definitions
      resolvers.ts
      client.ts               # graphql-request wrapper (SSR + client)
    data/matchData.ts         # mock match-history data source
    types.ts
tests/
  e2e/dashboard.spec.ts       # Playwright tests
```


