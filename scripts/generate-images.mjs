// Regenerates the brand raster images (hero, social cards, icons) from inline SVG.
// Run with:  node scripts/generate-images.mjs
// Re-run whenever the brand or a hero needs refreshing.
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => resolve(root, p);

const INK = '#0E0E10';
const PAPER = '#F7F7F5';
const AMBER = '#FFC400';
const MUTED = '#9A9AA5';
const FONT = "'Space Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";

mkdirSync(out('public/og'), { recursive: true });
mkdirSync(out('src/assets'), { recursive: true });

// --- Brand monogram (used for favicons & app icon) ---
const monogram = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${INK}"/>
  <text x="256" y="340" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="240" letter-spacing="-8" fill="${AMBER}">BB</text>
  <path d="M392 104 l18 37 39 7 -28 27 7 39 -36 -19 -36 19 7 -39 -28 -27 39 -7z" fill="${AMBER}"/>
</svg>`;

// --- Default social card (home / fallback) ---
const ogDefault = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="50%" cy="18%" r="75%">
      <stop offset="0%" stop-color="#21210f"/>
      <stop offset="60%" stop-color="${INK}"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="470" y="96" width="120" height="120" rx="26" fill="${AMBER}"/>
  <text x="530" y="182" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="66" fill="${INK}">BB</text>
  <text x="660" y="182" font-family="${FONT}" font-weight="700" font-size="58" fill="${PAPER}">The Buzz Break</text>
  <text x="600" y="360" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="64" fill="${PAPER}">Money &amp; tech that</text>
  <text x="600" y="434" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="64" fill="${AMBER}">actually matters.</text>
  <text x="600" y="520" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="30" fill="${MUTED}">No hype. No jargon. Not financial advice.</text>
</svg>`;

// --- Post social card (Binance story) ---
const ogBinance = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <text x="80" y="520" font-family="${FONT}" font-weight="700" font-size="300" fill="${AMBER}" fill-opacity="0.12">$6.3B</text>
  <text x="80" y="150" font-family="${FONT}" font-weight="700" font-size="30" letter-spacing="6" fill="${AMBER}">CRYPTO · EXPLAINER</text>
  <text x="80" y="256" font-family="${FONT}" font-weight="700" font-size="76" fill="${PAPER}">The $6.3B Binance hack,</text>
  <text x="80" y="340" font-family="${FONT}" font-weight="700" font-size="76" fill="${PAPER}">explained.</text>
  <text x="80" y="432" font-family="${FONT}" font-weight="700" font-size="52" fill="${AMBER}">Is your money safe?</text>
  <rect x="80" y="520" width="52" height="52" rx="12" fill="${AMBER}"/>
  <text x="106" y="557" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="28" fill="${INK}">BB</text>
  <text x="150" y="556" font-family="${FONT}" font-weight="700" font-size="30" fill="${PAPER}">The Buzz Break</text>
</svg>`;

// --- Article hero (16:9) ---
const hero = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="h" cx="50%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#26260f"/>
      <stop offset="65%" stop-color="${INK}"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#h)"/>
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="225" x2="1600" y2="225"/>
    <line x1="0" y1="450" x2="1600" y2="450"/>
    <line x1="0" y1="675" x2="1600" y2="675"/>
  </g>
  <text x="800" y="500" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="360" fill="${AMBER}" fill-opacity="0.10">$6.3B</text>
  <text x="800" y="300" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="34" letter-spacing="10" fill="${AMBER}">THE BIGGEST CRYPTO HACK EVER</text>
  <text x="800" y="470" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="128" fill="${PAPER}">Is your money safe?</text>
  <text x="800" y="560" text-anchor="middle" font-family="${FONT}" font-weight="500" font-size="40" fill="${MUTED}">Binance just lost about $6.3 billion. Here's what it means.</text>
  <rect x="690" y="760" width="56" height="56" rx="13" fill="${AMBER}"/>
  <text x="718" y="800" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="30" fill="${INK}">BB</text>
  <text x="762" y="799" font-family="${FONT}" font-weight="700" font-size="34" fill="${PAPER}">The Buzz Break</text>
</svg>`;

// --- Post social card (AI bubble story) ---
const ogAiBubble = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <text x="905" y="430" font-family="${FONT}" font-weight="700" font-size="230" fill="${AMBER}" fill-opacity="0.10">?</text>
  <text x="80" y="132" font-family="${FONT}" font-weight="700" font-size="30" letter-spacing="6" fill="${AMBER}">MARKETS · EXPLAINER</text>
  <text x="80" y="238" font-family="${FONT}" font-weight="700" font-size="76" fill="${PAPER}">The AI selloff</text>
  <text x="80" y="326" font-family="${FONT}" font-weight="700" font-size="56" fill="${PAPER}">Bubble warning &#8212; or</text>
  <text x="80" y="398" font-family="${FONT}" font-weight="700" font-size="56" fill="${AMBER}">a sale on the future?</text>
  <rect x="80" y="520" width="52" height="52" rx="12" fill="${AMBER}"/>
  <text x="106" y="557" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="28" fill="${INK}">BB</text>
  <text x="150" y="556" font-family="${FONT}" font-weight="700" font-size="30" fill="${PAPER}">The Buzz Break</text>
</svg>`;

// --- Article hero (AI bubble, 16:9) ---
const heroAiBubble = `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="ab" cx="52%" cy="30%" r="82%">
      <stop offset="0%" stop-color="#26260f"/>
      <stop offset="65%" stop-color="${INK}"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#ab)"/>
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="225" x2="1600" y2="225"/>
    <line x1="0" y1="450" x2="1600" y2="450"/>
    <line x1="0" y1="675" x2="1600" y2="675"/>
    <line x1="400" y1="0" x2="400" y2="900"/>
    <line x1="800" y1="0" x2="800" y2="900"/>
    <line x1="1200" y1="0" x2="1200" y2="900"/>
  </g>
  <polyline points="300,712 540,664 760,560 980,470 1168,356" fill="none" stroke="${AMBER}" stroke-width="26" stroke-opacity="0.12" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="300,712 540,664 760,560 980,470 1168,356" fill="none" stroke="${AMBER}" stroke-width="9" stroke-opacity="0.85" stroke-linecap="round" stroke-linejoin="round"/>
  <polygon points="1168,356 1147,388 1131,361" fill="${AMBER}" fill-opacity="0.85"/>
  <text x="1232" y="432" font-family="${FONT}" font-weight="700" font-size="300" fill="${AMBER}" fill-opacity="0.9">?</text>
  <text x="120" y="212" font-family="${FONT}" font-weight="700" font-size="34" letter-spacing="10" fill="${AMBER}">MARKETS · EXPLAINER</text>
  <text x="120" y="332" font-family="${FONT}" font-weight="700" font-size="104" fill="${PAPER}">Is the AI boom</text>
  <text x="120" y="440" font-family="${FONT}" font-weight="700" font-size="104" fill="${PAPER}">a bubble?</text>
  <text x="120" y="512" font-family="${FONT}" font-weight="500" font-size="38" fill="${MUTED}">AI stocks just had their worst month in over a year.</text>
  <rect x="120" y="762" width="56" height="56" rx="13" fill="${AMBER}"/>
  <text x="148" y="802" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="30" fill="${INK}">BB</text>
  <text x="192" y="801" font-family="${FONT}" font-weight="700" font-size="34" fill="${PAPER}">The Buzz Break</text>
</svg>`;

async function render(svg, size, path) {
	const img = sharp(Buffer.from(svg));
	if (size) img.resize(size, size, { fit: 'contain' });
	await img.png().toFile(out(path));
	console.log('wrote', path);
}

await render(ogDefault, null, 'public/og/default.png');
await render(ogBinance, null, 'public/og/binance-hack.png');
await render(hero, null, 'src/assets/binance-hack-hero.png');
await render(ogAiBubble, null, 'public/og/ai-bubble.png');
await render(heroAiBubble, null, 'src/assets/ai-bubble-hero.png');
await render(monogram, 512, 'public/favicon-512.png');
await render(monogram, 180, 'public/apple-touch-icon.png');
await render(monogram, 32, 'public/favicon-32.png');

console.log('done');
