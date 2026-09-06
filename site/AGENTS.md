# Prototype Instructions

## Approved amenowa direction

- Use the selected Nature & Science mock at ../output/design-proposals/2026-09-05/01-nature-science.png as the visual reference.
- Preserve its white editorial layout, Japanese serif headlines, curved hero image boundary and WORKS rows.
- User requested image placeholders for now. This explicitly overrides generic skill rules requiring generated final imagery.
- Corporate accents and logo mark share the single --brand token, #0086c1, visually sampled from the selected mock's blue mark. The public logo silhouette comes from amenowa.co.jp.
- All pages are a demo on hirojessica/amenowa-renew, main, GitHub Pages. Do not change amenowa.co.jp.
- NEWS uses Pages CMS. User confirmed GitHub account availability. Contact recipient is configured separately; demo must not transmit messages.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
