// Generates web-sized WebP variants from the full-resolution originals in assets-src/.
// Output: public/images/<path>-<width>.webp for each width in WIDTHS (capped at source width).
// Brand files are copied as-is, plus a 64px favicon.
import { readdir, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'public/images';
const WIDTHS = [640, 1280, 1920];
const QUALITY = 72;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
  );
  return files.flat();
}

async function processBrand() {
  const out = path.join(OUT, 'brand');
  await mkdir(out, { recursive: true });
  await copyFile(path.join(SRC, 'brand/logo.png'), path.join(out, 'logo.png'));
  await sharp(path.join(SRC, 'brand/favicon.jpg')).resize(64, 64).png().toFile(path.join(out, 'favicon.png'));
}

async function processPhoto(file) {
  const rel = path.relative(SRC, file).replace(/\.(jpe?g|png)$/i, '');
  const outDir = path.join(OUT, path.dirname(rel));
  await mkdir(outDir, { recursive: true });

  const { width } = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (widths.length === 0) widths.push(width);

  for (const w of widths) {
    await sharp(file)
      .rotate()
      .resize({ width: w })
      .webp({ quality: QUALITY })
      .toFile(path.join(outDir, `${path.basename(rel)}-${w}.webp`));
  }
}

const files = (await walk(SRC)).filter((f) => !f.startsWith(path.join(SRC, 'brand')));
await processBrand();
await Promise.all(files.map(processPhoto));
console.log(`Optimized ${files.length} images into ${OUT}/`);
