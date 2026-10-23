# Projects Showcase — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `projects-showcase`) on 2026-10-23.

## What it is

A client-only showcase of two generic sample project records (data/projects.json: "Portfolio Site" and "API Server") arranged as an ikebana-style composition, with search, an All/Featured view and one open study.

## Who it is for

A portfolio visitor who wants to see a calm way to present a few projects.

## What works today

1. Select a stem to open its study (image, description, technologies).
2. Search name, description or technology; switch between All and Featured. If a filter hides the open study, the first visible one opens, and nothing opens when nothing matches.
3. Copy the `/api/mcp` endpoint URL.
4. `/api/mcp` answers JSON-RPC with `get_all`, `get_by_id` and `search` over the same two records (the three tools the page lists), plus a GET catalog; unknown tools and methods get JSON-RPC errors.
5. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No configurable showcase generator, themes, logo uploads, galleries, embedded demos or setup-time claims (removed from the portfolio card in the 2026-10 review).
- The two records are placeholders, not the real project list (that lives on bookchaowalit.com, portfolio-site-web).
- No editing or storage.

## Live URL and deploy state

- Live: https://projects-showcase.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-projects-showcase-frontend` was last deployed to production on 2026-10-08 (CLI, commit 024414e, before the Next 16.4.2 CVE patch). The CVE patch deploy is queued with the coordinator (Vercel free-plan deploy limit hit on 2026-10-23). Its Git link names the old repository `bookchaowalit/bookchaowalit-projects-showcase-frontend`, so a push to `main` does not deploy: the L2 work stays undeployed until the owner reconnects Vercel Git to this repository (owner action D9). `NEXT_PUBLIC_SENTRY_DSN` is already set on the Vercel project (Sentry project `portfolio-projects-showcase-web`, org `personal-yu0`).

## Boundaries

- Browser-only apart from the stateless, read-only `/api/mcp` route.
