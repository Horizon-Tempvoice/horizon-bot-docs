import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const baseUrl = process.env.DOCS_URL ?? "http://localhost:3000";
const pngDir = join(here, "../../public/img/welcome");
const svgDir = join(here, "svg");
const rows = ["setup", "usage", "panel"];

mkdirSync(pngDir, { recursive: true });
mkdirSync(svgDir, { recursive: true });

const bundle = await build({
  stdin: {
    contents: 'import { elementToSVG, inlineResources } from "dom-to-svg"; window.__d2s = { elementToSVG, inlineResources };',
    resolveDir: here,
  },
  bundle: true,
  format: "iife",
  write: false,
});

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: "chromium" },
);
const page = await browser.newPage({
  deviceScaleFactor: 2,
  colorScheme: "dark",
  viewport: { width: 1200, height: 900 },
});
await page.goto(`${baseUrl}/docs/welcome-cards`, { waitUntil: "networkidle", timeout: 120_000 });
await page.evaluate(() => document.fonts.ready);
await page.addScriptTag({ content: bundle.outputFiles[0].text });

for (const id of rows) {
  await page.locator(`#${id}`).screenshot({ path: join(pngDir, `${id}.png`), omitBackground: true });
  const cards = page.locator(`#${id} > div`);
  for (let i = 0; i < (await cards.count()); i++) {
    await cards.nth(i).screenshot({ path: join(pngDir, `${id}-${i + 1}.png`), omitBackground: true });
  }

  const svg = await page.evaluate(async (id) => {
    const doc = window.__d2s.elementToSVG(document.getElementById(id));
    await window.__d2s.inlineResources(doc.documentElement);
    for (const el of doc.querySelectorAll("[textLength]")) {
      el.removeAttribute("textLength");
      el.removeAttribute("lengthAdjust");
    }

    const faces = [];
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (!(rule instanceof CSSFontFaceRule)) continue;
        const family = rule.style.getPropertyValue("font-family").replace(/["']/g, "");
        if (family !== "Bricolage Grotesque") continue;
        const url = rule.style.getPropertyValue("src").match(/url\("?([^")]+)"?\)/)?.[1];
        if (!url) continue;
        const buf = await (await fetch(new URL(url, sheet.href ?? location.href))).arrayBuffer();
        let bin = "";
        for (const b of new Uint8Array(buf)) bin += String.fromCharCode(b);
        const range = rule.style.getPropertyValue("unicode-range");
        faces.push(
          `@font-face{font-family:"Bricolage Grotesque";font-weight:200 800;src:url(data:font/woff2;base64,${btoa(bin)}) format("woff2");${range ? `unicode-range:${range};` : ""}}`,
        );
      }
    }
    if (faces.length) {
      const style = doc.createElementNS("http://www.w3.org/2000/svg", "style");
      style.textContent = faces.join("");
      doc.documentElement.prepend(style);
    }
    return new XMLSerializer().serializeToString(doc);
  }, id);

  writeFileSync(join(svgDir, `${id}.svg`), svg);
  console.log(`${id}: png, card pngs + svg written`);
}

await browser.close();
