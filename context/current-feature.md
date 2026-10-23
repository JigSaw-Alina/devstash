# Current Feature


<!-- Feature name and short description -->

**Dashboard Items** — Replace the mock item data in the dashboard main area (pinned items and recent items) with real data from the Neon database via Prisma. It should look the same as it does now.

## Status


<!-- Not started | In Progress | Completed -->

Completed

##  Goals 

<!-- Goals and requirements -->

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in the server component (replace `src/lib/mock-data.ts` usage for pinned and recent items)
- Item card icon/border derived from the item type
- Display item type tags and everything else currently shown on the cards
- If there are no pinned items, don't display the pinned section
- Update the collection stats display


## Notes

<!-- Any extra notes -->

- Layout and design already exist — keep the current design
- References: `context/features/dashboard-items-spec.md`, `context/screenshots/dashboard-ui-main.png`, `prisma/schema.prisma`

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
