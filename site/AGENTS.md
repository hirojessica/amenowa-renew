# Prototype Instructions

## Approved amenowa direction

- Use the selected Nature & Science mock at ../output/design-proposals/2026-09-05/01-nature-science.png as the visual reference.
- Preserve its white editorial layout, Japanese serif headlines, curved hero image boundary and WORKS rows.
- User requested a slimmer, more balanced header on 2026-09-06. Header height: desktop 84px, tablet 76px, mobile 68px. Header contact button: desktop 180x48px, tablet 164x44px, mobile drawer 52px high. Keep adequate surrounding whitespace and the corporate blue; the earlier tall mock header is superseded by this feedback. Mobile menu positioning must derive from --header-height.
- User requested better balance for HOME's Works CTA on 2026-09-07. Keep the hero button at 260x60px with 16px text on desktop, and 240x56px with 15px text at 1200px and below. Use even 24px horizontal padding and a 24px arrow; avoid viewport-scaled width or oversized left padding. This feedback supersedes the earlier mock's large hero CTA.
- User reported a clipped, flat wave tip in the hero on 2026-09-06. Keep the desktop/tablet wave inside the image bounds (leftmost turn at 2%) with continuous tangents; maintain one shared clip-path so breakpoints cannot restore the clipped curve.
- User requested image placeholders for now. This explicitly overrides generic skill rules requiring generated final imagery.
- On 2026-09-06, user supplied asahi.jpg for ABOUT's representative photo. Use public/images/representative-asahi.jpg unchanged, retaining its square composition and full image on desktop and mobile. Other ABOUT image placeholders remain.
- On 2026-09-06, user requested recreating the two images in HOME's hero and water-cycle concept sections. Those two frames now use generated assets based on the selected mock; other image areas remain placeholders.
- User supplied official transparent logo assets on 2026-09-06: amenowa_2_1.png (602x309 symbol) and amenowa_1.png (1307x278 wordmark). Use these PNGs unchanged for header and footer. The symbol's solid pixel color is #0081a6; --brand, buttons and accents must match this value. This replaces the earlier #0086c1 estimate and cropped wordmark.
- All pages are a demo on hirojessica/amenowa-renew, main, GitHub Pages. Do not change amenowa.co.jp.
- User requested the same favicon as production on 2026-09-06. Keep the original production PNGs in public/assets/ unchanged; index.html declares the 32px, 192px, Apple touch and Windows tile variants. See ../docs/image-assets.md for source URLs.
- NEWS uses Pages CMS. User confirmed GitHub account availability. Contact recipient is configured separately; demo must not transmit messages.
- On 2026-09-06, migrate the four published WordPress posts (430, 421, 401, 396) into NEWS, replacing sample articles. Keep titles, original publication dates, categories and body wording. Include their two inline photos and PDF from public/uploads/wordpress; omit placeholder images when the original article has no image. One WordPress draft is excluded. Migration mapping is in ../docs/news-migration.md. This is a snapshot, not automatic WordPress synchronization.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
