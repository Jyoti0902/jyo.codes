import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const HEALED = "C:/Users/skumar1/AppData/Local/Temp/opencode/98-heal2.png";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const OUT_DIR = "D:/Me/2026-Projects/jyo.codes/public/momo";
fs.mkdirSync(OUT_DIR, { recursive: true });

// --- 1. cartoon pass over the healed portrait ------------------------------
const { data, info } = await sharp(HEALED)
  .resize({ height: 800 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

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

bilateral(4, 3.2, 40);
bilateral(3, 2.8, 30);

// Lift the saturation a touch so the flat areas read as illustration.
for (let p = 0; p < W * H; p++) {
  const r = px[p * 3];
  const g = px[p * 3 + 1];
  const b = px[p * 3 + 2];
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  px[p * 3] = l + (r - l) * 1.14;
  px[p * 3 + 1] = l + (g - l) * 1.14;
  px[p * 3 + 2] = l + (b - l) * 1.14;
}

// --- 2. posterise into flat cartoon tones ---------------------------------
const LEVELS = 14;
for (let i = 0; i < px.length; i++) {
  px[i] = Math.max(0, Math.min(255, Math.round((px[i] / 255) * (LEVELS - 1)) * (255 / (LEVELS - 1))));
}

const flat = Buffer.alloc(W * H * 3);
for (let i = 0; i < flat.length; i++) flat[i] = Math.round(px[i]);

// --- 3. cut the sticker out of the white background ------------------------
const alpha = new Uint8Array(W * H).fill(255);
const seen = new Uint8Array(W * H);
const stack = new Int32Array(W * H);
let top = 0;
const isWhite = (p) => flat[p * 3] >= 238 && flat[p * 3 + 1] >= 238 && flat[p * 3 + 2] >= 238;
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
  rgba[p * 4] = flat[p * 3];
  rgba[p * 4 + 1] = flat[p * 3 + 1];
  rgba[p * 4 + 2] = flat[p * 3 + 2];
  rgba[p * 4 + 3] = alpha[p];
}

await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .trim({ threshold: 1 })
  .resize({ height: 640 })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/momo-portrait.png`);

await sharp(`${OUT_DIR}/momo-portrait.png`)
  .resize({ height: 220 })
  .toFile(`${TMP}/99-portrait-220.png`);
const m = await sharp(`${OUT_DIR}/momo-portrait.png`).metadata();
console.log("portrait", m.width, "x", m.height);
