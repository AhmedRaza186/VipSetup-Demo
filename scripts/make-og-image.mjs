// Builds the 1200x630 social/WhatsApp link preview image: public/images/og.jpg
import sharp from 'sharp';

const W = 1200;
const H = 630;

const photo = await sharp('assets-src/food/premium-pizza/vip-sp-sriracha.jpg')
  .resize(600, H, { fit: 'cover' })
  .toBuffer();

const logo = await sharp('assets-src/brand/logo.png').resize({ height: 230 }).toBuffer();

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="600" y="0" width="120" height="${H}" fill="url(#fade)"/>
  <text x="70" y="330" font-family="Poppins, 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="64" fill="#171717">Come hungry.</text>
  <text x="70" y="410" font-family="Poppins, 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="64" fill="#171717">Leave saying</text>
  <text x="70" y="490" font-family="Poppins, 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="64" fill="#CC252C">HMMM.</text>
  <rect x="70" y="535" width="70" height="8" rx="4" fill="#F4AC1C"/>
  <text x="160" y="545" font-family="Poppins, 'Segoe UI', Arial, sans-serif" font-weight="600" font-size="24" fill="#6B6B6B" letter-spacing="3">PIZZA · BURGERS · KARACHI</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } })
  .composite([
    { input: photo, left: W - 600, top: 0 },
    { input: text, left: 0, top: 0 },
    { input: logo, left: 30, top: 10 },
  ])
  .jpeg({ quality: 82 })
  .toFile('public/images/og.jpg');

console.log('Wrote public/images/og.jpg');
