# Current Feature


<!-- Feature name and short description -->

**Seed Data** — Replace `prisma/seed.ts` with a seed script that populates the database with a demo user, system item types, collections and sample items for development and demos.

## Status


<!-- Not started | In Progress | Completed -->

Completed

##  Goals 

<!-- Goals and requirements -->

- Overwrite the existing `prisma/seed.ts`
- Demo user: `demo@devstash.io`, name "Demo User", password `12345678` hashed with bcryptjs (12 rounds), `isPro: false`, `emailVerified` set to the current date
- System item types (`isSystem: true`, icons are Lucide React component names):
  - snippet — `Code` — `#3b82f6`
  - prompt — `Sparkles` — `#8b5cf6`
  - command — `Terminal` — `#f97316`
  - note — `StickyNote` — `#fde047`
  - file — `File` — `#6b7280`
  - image — `Image` — `#ec4899`
  - link — `Link` — `#10b981`
- Collections and items owned by the demo user:
  - **React Patterns** (_Reusable React patterns and hooks_) — 3 TypeScript snippets: custom hooks (useDebounce, useLocalStorage, etc.), component patterns (context providers, compound components), utility functions
  - **AI Workflows** (_AI prompts and workflow automations_) — 3 prompts: code review, documentation generation, refactoring assistance
  - **DevOps** (_Infrastructure and deployment resources_) — 1 snippet (Docker / CI/CD config), 1 command (deployment script), 2 links (real documentation URLs)
  - **Terminal Commands** (_Useful shell commands for everyday development_) — 4 commands: git operations, Docker commands, process management, package manager utilities
  - **Design Resources** (_UI/UX resources and references_) — 4 links (real URLs): CSS/Tailwind references, component libraries, design systems, icon libraries


## Notes

<!-- Any extra notes -->

- Seed should be safe to re-run (upsert or clear the demo user's data first)
- Add `bcryptjs` as a dependency if it isn't installed
- References: `context/features/seed-spec.md`, `prisma/schema.prisma`, `context/coding-standards.md`

## History 

<!-- Keep this updated. Earliest to latest -->

- **Initial setup:** Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4 project scaffolded; starter assets removed and placeholder home page added (branch `lesson-01-setup`, commit `6c247c7`)
- **Dashboard UI Phase 1:** ShadCN initialized (button, input, kbd), dark mode by default, `/dashboard` route with layout, top bar (search, New Collection, New Item — display only) and sidebar/main placeholders (branch `feature/dashboard-phase-1`) — Completed
- **Dashboard UI Phase 2:** ShadCN avatar added; collapsible sidebar (icon-only when collapsed) with item types linking to `/items/TYPE`, favorite and recent collections nested under Collections, user avatar area at the bottom, sidebar toggle in the top bar and overlay drawer on mobile, all using mock data (branch `feature/dashboard-phase-2`) — Completed
- **Dashboard UI Phase 3:** ShadCN card added; main dashboard area with 4 stats cards (items, collections, favorite items, favorite collections), recent collections grid, pinned items and 10 most recent items, plus a shared `TypeIcon` component and item-type helpers, all using mock data (branch `feature/dashboard-phase-3`) — Completed
- **Prisma + Neon PostgreSQL Setup:** Prisma 7 with Neon PostgreSQL (development branch), initial schema including NextAuth models, indexes and cascade deletes, initial migrations and a system item types seed (branch `feature/database-setup`, commit `661ef20`) — Completed
- **Seed Data:** `prisma/seed.ts` rewritten to seed the demo user (bcryptjs-hashed password), 7 system item types, 5 collections and 18 items, safe to re-run; `scripts/test-db.ts` added to read back and verify the demo data (branch `feature/seed-data`) — Completed
