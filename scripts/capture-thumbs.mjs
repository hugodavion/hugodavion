/**
 * Vignettes projets pour le portfolio Hugo Davion.
 * Usage : npx playwright install chromium && node scripts/capture-thumbs.mjs
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'projects');

const captures = [
  { file: 'maison-ela.jpg', url: 'https://www.lamaisondela.com/' },
  { file: 'quai-reves.jpg', url: 'https://quai-des-reves.vercel.app/' },
  { file: 'etcbc.jpg', url: 'https://www.etcbc-charpente.com/' },
  { file: 'bulle.jpg', url: 'https://bullechatbot.vercel.app/' },
  { file: 'bulletonsite.jpg', url: 'https://www.bulletonsite.com/' },
];

await mkdir(outDir, { recursive: true });

let browser;
try {
  browser = await chromium.launch();
  for (const shot of captures) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    try {
      console.log(`Capture ${shot.url}`);
      await page.goto(shot.url, { waitUntil: 'networkidle', timeout: 90000 });
      await page.waitForTimeout(shot.wait ?? 2000);
      await page.screenshot({
        path: path.join(outDir, shot.file),
        type: 'jpeg',
        quality: 85,
      });
      console.log(`  → ${shot.file}`);
    } catch (err) {
      console.warn(`  Échec ${shot.file}:`, err.message);
    } finally {
      await page.close();
    }
  }
} catch (err) {
  console.warn('Playwright:', err.message);
} finally {
  await browser?.close();
}

console.log('Terminé.');
