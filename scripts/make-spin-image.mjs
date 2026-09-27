// Cuts a circular, transparent-background pizza for the scroll "spin" scene.
// Output: public/images/spin/loaded-supreme-{600,1200}.webp
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'assets-src/food/premium-pizza/loaded-supreme.jpg';
// Pizza centre and radius as fractions of the (square) source image, tuned by eye.
const CX = 0.522;
const CY = 0.51;
const R = 0.455;

await mkdir('public/images/spin', { recursive: true });
const { width } = await sharp(SRC).metadata();
const size = Math.round(R * 2 * width);
const left = Math.round(CX * width - size / 2);
const top = Math.round(CY * width - size / 2);

const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
);

const cut = await sharp(SRC)
  .extract({ left: Math.max(0, left), top: Math.max(0, top), width: size, height: size })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

for (const w of [600, 1200]) {
  await sharp(cut).resize(w, w).webp({ quality: 78, alphaQuality: 90 }).toFile(`public/images/spin/loaded-supreme-${w}.webp`);
}
console.log('Wrote public/images/spin/');
