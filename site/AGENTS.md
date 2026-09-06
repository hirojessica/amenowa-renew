# Prototype Instructions

## Approved amenowa direction

- Use the selected Nature & Science mock at ../output/design-proposals/2026-09-05/01-nature-science.png as the visual reference.
- Preserve its white editorial layout, Japanese serif headlines, curved hero image boundary and WORKS rows.
- User reported a clipped, flat wave tip in the hero on 2026-09-06. Keep the desktop/tablet wave inside the image bounds (leftmost turn at 2%) with continuous tangents; maintain one shared clip-path so breakpoints cannot restore the clipped curve.
- User requested image placeholders for now. This explicitly overrides generic skill rules requiring generated final imagery.
- On 2026-09-06, user requested recreating the two images in HOME's hero and water-cycle concept sections. Those two frames now use generated assets based on the selected mock; other image areas remain placeholders.
- User supplied official transparent logo assets on 2026-09-06: amenowa_2_1.png (602x309 symbol) and amenowa_1.png (1307x278 wordmark). Use these PNGs unchanged for header and footer. The symbol's solid pixel color is #0081a6; --brand, buttons and accents must match this value. This replaces the earlier #0086c1 estimate and cropped wordmark.
- All pages are a demo on hirojessica/amenowa-renew, main, GitHub Pages. Do not change amenowa.co.jp.
- NEWS uses Pages CMS. User confirmed GitHub account availability. Contact recipient is configured separately; demo must not transmit messages.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
