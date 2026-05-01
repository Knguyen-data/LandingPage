# CLAUDE.md

This file provides repo-specific guidance for Claude Code when working in this project.

---

ALWAYS activate `claude-code` skill before starting any implementation.

## Project overview

This repo is the Dash Booking landing page: a static Next.js app with typed locale content and shared landing-page sections.

## Read first

Before implementation, read:
- `docs/codebase-summary.md`
- `docs/design-guidelines.md`
- `package.json`

## Source of truth

- `src/app/` — Next.js routes, layouts, global styles
- `src/components/landing/` — shared landing page sections and page composition
- `src/content/landing/` — typed locale content modules
- `src/lib/assets/normalized-public-assets.ts` — normalized public asset references
- `public/assets/` — static media
- `tests/` — contract and regression coverage

## Working rules

- Keep the page static-first and mobile-first.
- Keep localized copy in typed modules under `src/content/landing/`.
- Keep shared page composition in `src/components/landing/dashbooking-landing-page.tsx`.
- Route locales remain `/vi`, `/en`, `/fr`, with Vietnamese as the default redirect.
- Do not reintroduce removed sections such as calendar proof or the separate why section unless the approved landing structure changes.
- Update docs when section order, pricing, locale content, or trust messaging changes.
- Prefer editing existing files over creating new abstractions.

## Validation

Run before finishing significant code changes:
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
