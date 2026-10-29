import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const OUT_DIR = "D:/Me/2026-Projects/jyo.codes/public/momo";
fs.mkdirSync(OUT_DIR, { recursive: true });

const { data, info } = await sharp(SRC)
  .resize({ width: 760, fit: "inside" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const S = W / 1254;

const px = new Float32Array(W * H * 3);
for (let p = 0; p < W * H; p++) {
  px[p * 3] = data[p * 3];
  px[p * 3 + 1] = data[p * 3 + 1];
  px[p * 3 + 2] = data[p * 3 + 2];
}

function bilateral(radius, sigmaSpace, sigmaColor) {
  const out = new Float32Array(px.length);
  const space = [];
  for (let d = -radius; d <= radius; d++) {
    for (let e = -radius; e <= radius; e++) {
      space.push([d, e, Math.exp(-(d * d + e * e) / (2 * sigmaSpace * sigmaSpace))]);
    }
  }
  const colorScale = -1 / (2 * sigmaColor * sigmaColor);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = (y * W + x) * 3;
      const cr = px[p];
      const cg = px[p + 1];
      const cb = px[p + 2];
      let sr = 0, sg = 0, sb = 0, sw = 0;
      for (const [d, e, ws] of space) {
        const nx = x + d;
        const ny = y + e;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const q = (ny * W + nx) * 3;
        const dr = px[q] - cr;
        const dg = px[q + 1] - cg;
        const db = px[q + 2] - cb;
        const w = ws * Math.exp((dr * dr + dg * dg + db * db) * colorScale);
        sr += px[q] * w;
        sg += px[q + 1] * w;
        sb += px[q + 2] * w;
        sw += w;
      }
      out[p] = sr / sw;
      out[p + 1] = sg / sw;
      out[p + 2] = sb / sw;
    }
  }
  px.set(out);
}

bilateral(4, 3.4, 42);
bilateral(3, 3, 34);

// --- heal: bindi, nose ring and the earrings ------------------------------
const masks = [
  { cx: 705 * S, cy: 546 * S, rx: 15 * S, ry: 15 * S },
  { cx: 762 * S, cy: 781 * S, rx: 17 * S, ry: 17 * S },
  { cx: 200, cy: 494, rx: 36, ry: 66 },
  { cx: 518, cy: 512, rx: 35, ry: 66 },
];
const hole = new Uint8Array(W * H);
for (const m of masks) {
  for (let y = Math.max(0, Math.floor(m.cy - m.ry)); y <= Math.min(H - 1, m.cy + m.ry); y++) {
    for (let x = Math.max(0, Math.floor(m.cx - m.rx)); x <= Math.min(W - 1, m.cx + m.rx); x++) {
      const dx = (x - m.cx) / m.rx;
      const dy = (y - m.cy) / m.ry;
      if (dx * dx + dy * dy <= 1) hole[y * W + x] = 1;
    }
  }
}

const seed = [0, 0, 0];
let seedCount = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!hole[p]) continue;
    const edge =
      (x > 0 && !hole[p - 1]) ||
      (x < W - 1 && !hole[p + 1]) ||
      (y > 0 && !hole[p - W]) ||
      (y < H - 1 && !hole[p + W]);
    if (!edge) continue;
    seed[0] += px[p * 3];
    seed[1] += px[p * 3 + 1];
    seed[2] += px[p * 3 + 2];
    seedCount++;
  }
}
for (let p = 0; p < W * H; p++) {
  if (!hole[p]) continue;
  px[p * 3] = seed[0] / seedCount;
  px[p * 3 + 1] = seed[1] / seedCount;
  px[p * 3 + 2] = seed[2] / seedCount;
}
for (let iter = 0; iter < 600; iter++) {
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!hole[p]) continue;
      for (let c = 0; c < 3; c++) {
        px[p * 3 + c] =
          (px[(p - 1) * 3 + c] +
            px[(p + 1) * 3 + c] +
            px[(p - W) * 3 + c] +
            px[(p + W) * 3 + c]) /
          4;
      }
    }
  }
}

// --- a lock of hair drawn over each ear, so the healed patch disappears ---
const leftLock = `<path d="M170 402 C 148 472, 149 544, 165 624 L 248 624 C 221 548, 221 470, 252 404 C 226 384, 195 382, 170 402 Z" fill="url(#hairGrad)"/>`;
const rightLock = `<path d="M492 450 C 474 512, 478 578, 494 648 L 578 648 C 559 582, 556 512, 568 454 C 542 434, 514 434, 492 450 Z" fill="url(#hairGrad)"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="hairGrad" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#332722"/>
      <stop offset="55%" stop-color="#261c18"/>
      <stop offset="100%" stop-color="#1d1512"/>
    </linearGradient>
    <filter id="soften" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur stdDeviation="3.2"/>
    </filter>
  </defs>
  <g filter="url(#soften)">${leftLock}${rightLock}</g>
</svg>`;

const smoothed = Buffer.alloc(W * H * 3);
for (let i = 0; i < smoothed.length; i++) {
  smoothed[i] = Math.max(0, Math.min(255, Math.round(px[i])));
}

const compositeInput = await sharp(smoothed, {
  raw: { width: W, height: H, channels: 3 },
})
  .composite([{ input: Buffer.from(svg) }])
  .removeAlpha()
  .raw()
  .toBuffer();

const out = new Uint8Array(W * H * 3);
for (let i = 0; i < out.length; i++) out[i] = Math.max(0, Math.min(255, compositeInput[i]));

// --- cut the sticker out of its white background --------------------------
const alpha = new Uint8Array(W * H).fill(255);
const seen = new Uint8Array(W * H);
const stack = new Int32Array(W * H);
let top = 0;
const isWhite = (p) =>
  out[p * 3] >= 240 && out[p * 3 + 1] >= 240 && out[p * 3 + 2] >= 240;
const push = (p) => {
  if (!seen[p] && isWhite(p)) {
    seen[p] = 1;
    stack[top++] = p;
  }
};
for (let x = 0; x < W; x++) {
  push(x);
  push((H - 1) * W + x);
}
for (let y = 0; y < H; y++) {
  push(y * W);
  push(y * W + W - 1);
}
while (top > 0) {
  const p = stack[--top];
  alpha[p] = 0;
  const x = p % W;
  const y = (p - x) / W;
  if (x > 0) push(p - 1);
  if (x < W - 1) push(p + 1);
  if (y > 0) push(p - W);
  if (y < H - 1) push(p + W);
}
for (let pass = 0; pass < 3; pass++) {
  const before = alpha.slice();
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!before[p]) continue;
      if (!before[p - 1] || !before[p + 1] || !before[p - W] || !before[p + W]) alpha[p] = 0;
    }
  }
}

const rgba = Buffer.alloc(W * H * 4);
for (let p = 0; p < W * H; p++) {
  rgba[p * 4] = out[p * 3];
  rgba[p * 4 + 1] = out[p * 3 + 1];
  rgba[p * 4 + 2] = out[p * 3 + 2];
  rgba[p * 4 + 3] = alpha[p];
}

await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .trim({ threshold: 1 })
  .resize({ height: 640 })
  .png({ compressionLevel: 9 })
  .toFile(`${TMP}/91-portrait.png`);
await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .png()
  .toFile(`${TMP}/91-full.png`);
console.log("done");
