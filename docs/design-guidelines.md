# Design Guidelines

## DashBooking landing page
- Tone: premium, simple, readable, calm confidence.
- Audience: busy salon owners, including older owners who need clarity fast.
- Structure order: header, hero, trust band, pricing, Canada cities, scope cards, AI demo, Clover/Poynt + add-ons, FAQ, final CTA, footer.
- Mobile-first. Large tap targets. Native audio controls. Semantic HTML.
- Static-only page; no client-side app behavior beyond light interaction affordances.

## Visual system
- Heading font: Nunito Sans 700/800.
- Body font: Inter with Vietnamese support.
- Colors:
  - Brand teal: `#078FA8`
  - Deep teal: `#067A92`
  - Soft aqua: `#27C7BE`
  - Ink: `#16313A`
  - Soft background: `#F7FBFC`
  - Border: `#D8E9ED`
- Surfaces: white/soft-white cards, large radius, soft shadows.
- Motion: subtle hover/press only, reduced-motion safe.

## Content rules
- Public copy must not name competitors.
- Trust wording stays safer: appointment interactions powered, cities, countries, languages.
- Core pricing visually dominant.
- Add-ons visibly secondary.
- No visible phone number in the page chrome or footer.
- Add Google partner trust above pricing and support it with the Google partner badge/link.
- Use a compact locale-specific Google partner label in the header so the badge stays stable on narrow or zoomed displays.
- Vietnamese is launch-default locale, but page routes remain `/vi`, `/en`, `/fr`.

## Implementation rules
- Assets must come from `src/lib/assets/normalized-public-assets.ts`.
- Locale copy belongs in typed content modules under `src/content/landing/`.
- Shared page composition belongs under `src/components/landing/`.
- Global tokens and shared layout styles belong in `src/app/globals.css`.
