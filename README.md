# Projects Showcase

Two sample project records shown as a quiet arrangement: select one to open its study, search, or show only the featured one. Placeholder data only.

Live: https://projects-showcase.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does not do

- No editing, uploads, themes or real project list; the two records are placeholders.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: filter and selection rules, MCP route, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `data/projects.json`: the two sample records.
- `lib/projects.ts`: records, images, `filterProjects`, `pickSelected` and `findProject` (used by the page and the MCP route).
- `app/api/mcp/route.ts`: stateless JSON-RPC endpoint with `get_all`, `get_by_id` and `search`, plus a GET catalog.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when `NEXT_PUBLIC_SENTRY_DSN` is unset.
- `app/more-projects/page.tsx`: shared portfolio link page (copied per repository, not a package).
