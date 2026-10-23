# Current Feature


<!-- Feature name and short description -->

**Stats & Sidebar** — Show the main area stats from the database instead of `src/lib/mock-data.ts`, and show the system item types and real collection data in the sidebar.

## Status


<!-- Not started | In Progress | Completed -->

Completed

##  Goals 

<!-- Goals and requirements -->

- Display stats from database data, keeping the current design/layout
- Display system item types in the sidebar with their icons, linking to `/items/[typename]`
- Add a "View all collections" link under the collections list that goes to `/collections`
- Keep the star icons for favorite collections; for recent collections, show a colored circle based on the most-used item type in that collection
- Add the database functions to `src/lib/db/items.ts` (use `src/lib/db/collections.ts` for reference)


## Notes

<!-- Any extra notes -->

- `src/lib/db/items.ts` already exists from the Dashboard Items feature — extend it rather than recreate it
- References: `context/features/stats-sidebar-spec.md`, `src/lib/db/collections.ts`

## History 

<!-- Keep this updated. Earliest to latest -->

- **Initial setup:** Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4 project scaffolded; starter assets removed and placeholder home page added (branch `lesson-01-setup`, commit `6c247c7`)
- **Dashboard UI Phase 1:** ShadCN initialized (button, input, kbd), dark mode by default, `/dashboard` route with layout, top bar (search, New Collection, New Item — display only) and sidebar/main placeholders (branch `feature/dashboard-phase-1`) — Completed
- **Dashboard UI Phase 2:** ShadCN avatar added; collapsible sidebar (icon-only when collapsed) with item types linking to `/items/TYPE`, favorite and recent collections nested under Collections, user avatar area at the bottom, sidebar toggle in the top bar and overlay drawer on mobile, all using mock data (branch `feature/dashboard-phase-2`) — Completed
- **Dashboard UI Phase 3:** ShadCN card added; main dashboard area with 4 stats cards (items, collections, favorite items, favorite collections), recent collections grid, pinned items and 10 most recent items, plus a shared `TypeIcon` component and item-type helpers, all using mock data (branch `feature/dashboard-phase-3`) — Completed
- **Prisma + Neon PostgreSQL Setup:** Prisma 7 with Neon PostgreSQL (development branch), initial schema including NextAuth models, indexes and cascade deletes, initial migrations and a system item types seed (branch `feature/database-setup`, commit `661ef20`) — Completed
- **Seed Data:** `prisma/seed.ts` rewritten to seed the demo user (bcryptjs-hashed password), 7 system item types, 5 collections and 18 items, safe to re-run; `scripts/test-db.ts` added to read back and verify the demo data (branch `feature/seed-data`) — Completed
- **Dashboard Collections:** `src/lib/db/collections.ts` added; recent collection cards and collection stats now load from the database (scoped to the demo user until auth exists), with the card border color taken from the most-used item type and icons for every type in the collection (branch `feature/dashboard-collections`) — Completed
- **Dashboard Items:** `src/lib/db/items.ts` added; pinned items, the 10 most recent items and item stats now load from the database (scoped to the demo user until auth exists), with the card icon and border color taken from the item type and the pinned section hidden when empty (branch `feature/dashboard-items`) — Completed
- **Stats & Sidebar:** sidebar item types (with icons, database item counts and `/items/[type]` links) and favorite/recent collections now load from the database; recent collections show a colored dot for their most-used item type, a "View all collections" link to `/collections` was added, and the sidebar got a thin themed scrollbar (branch `feature/stats-sidebar`) — Completed
