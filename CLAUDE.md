# DevStatsh

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

@AGENTS.md


## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md


## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (flat config in `eslint.config.mjs`, using `eslint-config-next`)

No test framework is configured yet.

## Stack

- Next.js 16.4 (App Router) with React 19.3 and TypeScript
- Tailwind CSS v4, wired through `@tailwindcss/turbopack`; global styles are in `src/app/globals.css`
- Geist / Geist Mono fonts loaded via `next/font/google` in `src/app/layout.tsx` and exposed as the CSS variables `--font-geist-sans` / `--font-geist-mono`

## Architecture

This is an early-stage app (it has only a placeholder home page). All routes live under `src/app/` and follow App Router conventions. The root layout uses the globally generated `LayoutProps<"/">` type for its props, not a hand-written props type. Use the generated route types (`LayoutProps`, `PageProps`) for new layouts and pages as well.

Next.js 16 changes APIs compared with older versions. Before you use a Next.js API, check the bundled docs in `node_modules/next/dist/docs/`.
