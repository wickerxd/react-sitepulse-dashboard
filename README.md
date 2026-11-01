# Safe With Carmen

Supervisor dashboard for workplace safety. The app visualizes worker compliance with personal protective equipment (PPE), biometrics, alerts, incidents, construction-site risk, and Unitree robot patrol data.

This project was built as a front-end take-home assignment. It is a client-only React application with static mock data and no backend or real API integration.

## Screens

All seven assignment screens are implemented:

1. **Overview** - KPI tiles, worker list with search and filters, worker detail panel, and alert feed.
2. **Worker history** - compliance trend, biometrics, and incident history for a selected worker.
3. **Roles** - compliance, violations, and incidents compared by job role.
4. **Construction sites** - compliance and alerts per site, monthly trends, and a risk-zone map.
5. **Accidents** - accidents by month and shift hour, weather and fatigue analysis, and an incident registry.
6. **Robot** - Unitree robot status, live detections, zone coverage, patrol route, and detection history.
7. **Recommendations** - personalized PPE recommendations, compliance gauge, PPE gaps, and suggested training.

## Tech stack

- React 19 with functional components and hooks
- TypeScript
- Vite
- Material UI 9
- MUI X Charts
- React Router 7

## Getting started

Use Node.js 20 or newer.

```sh
npm install
npm run dev
```

The app is available at `http://localhost:5173`.

## Available scripts

```sh
npm run dev      # start the development server
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```text
src/
  components/   reusable UI components and dashboard sections
  layouts/      shared application shell
  pages/        one component per assignment screen
  data.ts       typed mock data
  types.ts      shared domain types
  App.tsx       application routes
  main.tsx      theme and application entry point
```

## Design decisions

- **Material UI** is used for layout, cards, tables, chips, and form controls to keep the UI consistent and responsive without custom CSS.
- **MUI X Charts** handles trend, comparison, and distribution charts.
- **Hardcoded data** lives in `src/data.ts` and is typed in `src/types.ts`. Page-level aggregates are derived from the same dataset so figures stay consistent across screens.
- **Greek UI labels** match the assignment data and target users. Code, types, and component names remain in English.
- **Responsive layout** uses MUI Grid breakpoints and flexible panels, with desktop and tablet as the primary targets.
- **Navigation** links the dashboard, worker history, and recommendation screens. Worker names link to their history, and worker pages link to personalized recommendations.
- **Accessibility basics** include semantic headings, table labels, button labels, and progress indicators with descriptive `aria-label` values.

## Data

All data is fictional and stored locally. There is no persistence, authentication, or network layer. Acknowledge, send, and filter actions are UI-only where applicable.

## Deployment

The project can be deployed to Vercel or Netlify using the Vite preset:

- Build command: `npm run build`
- Output directory: `dist`

SPA fallback configuration is included in `vercel.json` and `public/_redirects`, so client-side routes work on refresh.
