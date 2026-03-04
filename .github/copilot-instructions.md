# Copilot Instructions – Sistema de Cronograma TE 2026

Project timeline manager for SME/SUPEB's 5 educational technology projects (Backoffice, Banco de Questões, Plataforma Maker, Gestor 3.1, E-Learning), spanning Feb–Dec 2026.

## Commands

```bash
npm run dev       # start dev server at http://localhost:3000
npm run build     # production build
npm run lint      # eslint (no test suite exists)
```

## Architecture

**Data flow:**
1. On boot, `DataInitializer` fetches `/api/cronograma` (server JSON).
2. API always returns data: either from `data/cronograma.json` or default data structure if file doesn't exist.
3. Parsed data is loaded into Zustand store (`useCronogramaStore`).
4. Every mutation in the store calls `setData()`, which POSTs the full state to `/api/cronograma`, writing `data/cronograma.json`. State is also persisted to `localStorage` via `zustand/middleware/persist` (key: `cronograma-storage`).
5. Components read from the store via hooks; no prop-drilling.

**API routes** (`app/api/`):
- `GET/POST /api/cronograma` – reads/writes `data/cronograma.json`, creates it with default data if doesn't exist
- `GET /api/csv-inicial` – (optional) serves `public/cronograma-inicial.csv` for import feature only

**Key layers:**
- `types/cronograma.ts` – single source of truth for all interfaces (`Project → Phase → Feature → WeekAssignment`) and the `MONTHS` constant (Feb–Dec 2026)
- `store/cronogramaStore.ts` – all mutations; always call `setData(get().data)` after `set()` to trigger server sync
- `lib/csvParser.ts` – parses/exports `;`-delimited CSV with structure `Project;Phase;Feature;week1responsible;week2responsible;...` (44 week columns)
- `lib/reportGenerator.ts` – generates PPTX and Markdown reports via `pptxgenjs`
- `components/` – all components use `'use client'`; no server components outside `app/layout.tsx`

## Key Conventions

**Responsible color map** (used in timeline cells and reports):
| Key | Color | Person/Role |
|-----|-------|-------------|
| `dev` | blue | Developers |
| `jonatas` | green | Jonatas |
| `guga` | purple | Guga |
| `te` | orange | Equipe TE |
| `autor` | pink | Content authors |

CSV responsible values are case-insensitive; multiple responsibles per week use `/` separator (e.g., `dev/autor`).

**IDs** are generated as `Date.now().toString()` or simple string slugs — not UUIDs.

**`WeekAssignment.status`** defaults to `'planned'`; the UI does not currently expose status editing.

**`MONTHS` constant** in `types/cronograma.ts` is the canonical list of timeline months. Any month-related logic should reference it, not hardcode strings.

**Tailwind CSS v4** is used with `@tailwindcss/postcss`. Config is in `tailwind.config.ts`.

**Duplicate config files**: Both `next.config.js` and `next.config.ts` exist (and `postcss.config.js` + `postcss.config.mjs`). The `.ts` / `.mjs` variants are the active ones.
