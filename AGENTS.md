# Corporate Khodam Detector — agent guide

## Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — typecheck + production build
- `npm run lint` — ESLint
- No test framework configured.

## Stack
- Next.js 16 App Router (no Pages Router), React 19
- Tailwind CSS v4 (`@import "tailwindcss"` — not `@tailwind` directives)
- Path alias `@/*` → `./src/*`
- Only extra dep: `html-to-image` (for PNG card download)

## Architecture
- Fully client-side. No backend, no database, no server actions, no API routes.
- All logic is pure functions in `src/lib/` and `src/data/` — deterministic generation from name + job role.
- Root page (`src/app/page.tsx`) uses `'use client'` — state-driven, no server data fetching.

## Key directories
| Path | Purpose |
|---|---|
| `src/types/` | Shared TS types + constants (JobRole, Rarity, JOB_ROLES, RARITY_CONFIG) |
| `src/data/` | Static khodam database (42 entities) |
| `src/lib/` | Pure logic: seed hash, generator, utils |
| `src/components/ui/` | Reusable primitives (Button, Card, Input, Select, Badge) |
| `src/components/khodam/` | Domain components (Form, Card, Result, RarityBadge, DownloadButton) |
| `src/components/layout/` | Header, Footer, Container |

## Conventions
- UI primitives are generic, domain components go in `khodam/`.
- All components that use browser APIs, event handlers, or React state include `'use client'`.
- `html-to-image.toPng()` captures the card DOM for download — requires a ref on the card wrapper.
- Tailwind v4 `@theme inline` block in `globals.css` for CSS custom properties.

## Deployment
- Deploy to Vercel via `vercel --prod` (or git push with Vercel git integration).
- Static export possible (no dynamic server features used).
