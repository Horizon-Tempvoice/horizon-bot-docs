# Welcome cards

Generates the step images for the bot's welcome message from `src/app/welcome-cards/page.tsx`.

Output:
- `public/img/welcome/setup.png`, `usage.png`: used by the bot (`WelcomeAssets` in `WelcomeService.kt`)
- `tools/welcome-cards/svg/*.svg`: editable copies for Inkscape or Illustrator

## Run

1. Start the docs dev server in the repo root: `yarn dev` (the page only exists in dev, at `/docs/welcome-cards`)
2. In this folder, once: `npm install && npx playwright install chromium`
3. `npm run generate`

`DOCS_URL` overrides the dev server address (default `http://localhost:3000`). The script uses Playwright's full Chromium in headless mode, so the separate headless shell isn't needed. `CHROMIUM_PATH` points it at another Chromium binary instead.

If `npx playwright install chromium` hangs after the download, unzip the archive it left in `/tmp` (`playwright-download-chromium-*.zip`) into `~/.cache/ms-playwright/chromium-1148/` and create an empty `INSTALLATION_COMPLETE` file there.

## SVG notes

Text stays editable. Labels use Bricolage Grotesque ExtraBold, the rest Noto Sans. Install both from Google Fonts before editing, otherwise the editor substitutes another font. Shadows are not exported.
