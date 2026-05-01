# Codebase Summary

## Scope
Dash Booking landing page, built as a static Next.js app with locale-aware content modules and section-based landing components.

## Current structure
- `src/app/` handles the Next.js routes and global layout.
- `src/components/landing/` contains the shared landing page sections.
- `src/content/landing/` stores typed locale content and shared landing data.
- `public/assets/` contains the static media used by the page.
- `tests/` covers the page behavior and content expectations.

## Landing implementation notes
- The landing page is assembled from reusable sections in a fixed order.
- Content is localized through typed content modules and a locale map.
- The page emphasizes Google booking trust, pricing clarity, and AI receptionist demos.
- The current direction is static-only; no visible phone number, calendar proof section, or separate why section is part of the approved landing experience.

## Maintenance notes
- Keep content and docs aligned when the landing order or pricing changes.
- Update design guidance when trust signals, section order, or locale content changes.
- Avoid documenting removed sections as active UX unless they return in implementation.