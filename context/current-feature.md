# Current Feature


<!-- Feature name and short description -->

**Prisma + Neon PostgreSQL Setup** — Set up Prisma ORM (v7) with a serverless Neon PostgreSQL database and the initial schema.

## Status


<!-- Not started | In Progress | Completed -->

In Progress

##  Goals 

<!-- Goals and requirements -->

- Use Neon PostgreSQL (serverless)
- Create initial schema based on the data models in `context/project-overview.md` (will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes


## Notes

<!-- Any extra notes -->

- Use **Prisma 7** — it has breaking changes. Read the upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup guide: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- `DATABASE_URL` points to the Neon **development** branch; a separate **production** branch exists
- Always create migrations with `prisma migrate dev` — never `db push` unless specified
- References: `context/features/database-spec.md`, `context/project-overview.md`, `context/coding-standards.md`

## History 

<!-- Keep this updated. Earliest to latest -->

- **Initial setup:** Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4 project scaffolded; starter assets removed and placeholder home page added (branch `lesson-01-setup`, commit `6c247c7`)
- **Dashboard UI Phase 1:** ShadCN initialized (button, input, kbd), dark mode by default, `/dashboard` route with layout, top bar (search, New Collection, New Item — display only) and sidebar/main placeholders (branch `feature/dashboard-phase-1`) — Completed
- **Dashboard UI Phase 2:** ShadCN avatar added; collapsible sidebar (icon-only when collapsed) with item types linking to `/items/TYPE`, favorite and recent collections nested under Collections, user avatar area at the bottom, sidebar toggle in the top bar and overlay drawer on mobile, all using mock data (branch `feature/dashboard-phase-2`) — Completed
- **Dashboard UI Phase 3:** ShadCN card added; main dashboard area with 4 stats cards (items, collections, favorite items, favorite collections), recent collections grid, pinned items and 10 most recent items, plus a shared `TypeIcon` component and item-type helpers, all using mock data (branch `feature/dashboard-phase-3`) — Completed
