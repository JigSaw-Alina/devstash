# Current Feature


<!-- Feature name and short description -->

**Dashboard UI Phase 3** — Phase 3 of 3 for the dashboard UI layout: main content area with stats, collections and items.

## Status


<!-- Not started | In Progress | Completed -->

In Progress

##  Goals 

<!-- Goals and requirements -->

- The main area to the right
- Recent collections
- Pinned items
- 10 recent items
- 4 stats cards at the top: number of items, collections, favorite items and favorite collections (not in screenshot)


## Notes

<!-- Any extra notes -->

- Use the mock data from `src/lib/mock-data.ts` — import directly until the database is implemented
- References: `context/screenshots/dashboard-ui-main.png`, `context/project-overview.md`, `context/features/dashboard-phase-1-spec.md`, `context/features/dashboard-phase-2-spec.md`

## History 

<!-- Keep this updated. Earliest to latest -->

- **Initial setup:** Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4 project scaffolded; starter assets removed and placeholder home page added (branch `lesson-01-setup`, commit `6c247c7`)
- **Dashboard UI Phase 1:** ShadCN initialized (button, input, kbd), dark mode by default, `/dashboard` route with layout, top bar (search, New Collection, New Item — display only) and sidebar/main placeholders (branch `feature/dashboard-phase-1`) — Completed
- **Dashboard UI Phase 2:** ShadCN avatar added; collapsible sidebar (icon-only when collapsed) with item types linking to `/items/TYPE`, favorite and recent collections nested under Collections, user avatar area at the bottom, sidebar toggle in the top bar and overlay drawer on mobile, all using mock data (branch `feature/dashboard-phase-2`) — Completed
