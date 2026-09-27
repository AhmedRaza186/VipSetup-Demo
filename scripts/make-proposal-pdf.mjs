// Prints /#proposal to an A4 PDF: public/VIP-Setup-Proposal.pdf (also copied into dist/).
// Run via `npm run proposal` (builds first so the page is current).
import { copyFile, readFile } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright';

const OUT = 'public/VIP-Setup-Proposal.pdf';
const server = await preview({ preview: { port: 4188, strictPort: true } });
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  await page.goto('http://localhost:4188/#proposal', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });

  const pages = ((await readFile(OUT, 'latin1')).match(/\/Type\s*\/Page[^s]/g) || []).length;
  const expected = await page.locator('.proposal-sheet').count();
  if (pages !== expected) console.warn(`Warning: PDF has ${pages} pages but the proposal has ${expected} sheets. Trim the content in src/data/proposal.js.`);
  await copyFile(OUT, 'dist/VIP-Setup-Proposal.pdf');
  console.log(`Wrote ${OUT} (${pages} pages)`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
