import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const OUT = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const OUT_DIR = "D:/Me/2026-Projects/jyo.codes/public/momo";
fs.mkdirSync(OUT_DIR, { recursive: true });

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// --- 1. Paint out the jewellery and the bindi -------------------------------
const masks = [
  { cx: 327, cy: 820, rx: 46, ry: 88 }, // left jhumka
  { cx: 856, cy: 845, rx: 42, ry: 92 }, // right jhumka
  { cx: 705, cy: 546, rx: 14, ry: 14 }, // bindi
  { cx: 762, cy: 781, rx: 16, ry: 16 }, // nose ring
];

const masked = new Uint8Array(W * H);
const asHair = new Uint8Array(W * H);
for (const m of masks) {
  for (let y = Math.max(0, m.cy - m.ry); y <= Math.min(H - 1, m.cy + m.ry); y++) {
    for (let x = Math.max(0, m.cx - m.rx); x <= Math.min(W - 1, m.cx + m.rx); x++) {
      const dx = (x - m.cx) / m.rx;
      const dy = (y - m.cy) / m.ry;
      if (dx * dx + dy * dy <= 1) {
        masked[y * W + x] = 1;
        if (y < 700 || m.cx < 500 || m.cx > 800) asHair[y * W + x] = 1;
      }
    }
  }
}

const rgb = new Float32Array(W * H * 3);
for (let p = 0; p < W * H; p++) {
  rgb[p * 3] = data[p * C];
  rgb[p * 3 + 1] = data[p * C + 1];
  rgb[p * 3 + 2] = data[p * C + 2];
}

// Rebuild the earring patches as hair (they hang over a lock in front of the
// ear), and the bindi / nose ring as the skin around them.
const dark = (p) => {
  const i = p * C;
  const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  return l < 120;
};
const queue = new Int32Array(W * H);
const from = new Int32Array(W * H).fill(-1);
let head = 0;
let tail = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!masked[p]) continue;
    const neighbours = [
      x > 0 ? p - 1 : -1,
      x < W - 1 ? p + 1 : -1,
      y > 0 ? p - W : -1,
      y < H - 1 ? p + W : -1,
    ];
    const known = neighbours.find(
      (q) => q >= 0 && !masked[q] && from[q] === -1 && (!asHair[p] || dark(q)),
    );
    if (known === undefined) continue;
    from[p] = known;
    queue[tail++] = p;
  }
}
while (head < tail) {
  const p = queue[head++];
  const source = from[p];
  for (let c = 0; c < 3; c++) rgb[p * 3 + c] = rgb[source * 3 + c];
  const x = p % W;
  const y = (p - x) / W;
  const neighbours = [
    x > 0 ? p - 1 : -1,
    x < W - 1 ? p + 1 : -1,
    y > 0 ? p - W : -1,
    y < H - 1 ? p + W : -1,
  ];
  for (const q of neighbours) {
    if (q < 0 || !masked[q] || from[q] !== -1) continue;
    from[q] = p;
    queue[tail++] = q;
  }
}

for (let pass = 0; pass < 6; pass++) {
  const before = rgb.slice();
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!masked[p]) continue;
      for (let c = 0; c < 3; c++) {
        rgb[p * 3 + c] =
          (before[(p - W) * 3 + c] * 2 +
            before[(p + W) * 3 + c] * 2 +
            before[(p - 1) * 3 + c] +
            before[(p + 1) * 3 + c]) /
          6;
      }
    }
  }
}

const healed = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H * 3; i++) healed[i] = Math.max(0, Math.min(255, Math.round(rgb[i])));
await sharp(healed, { raw: { width: W, height: H, channels: 3 } })
  .png()
  .toFile(`${OUT}/72-healed.png`);

// --- 2. Cut the sticker out of its white background ------------------------
const alpha = new Uint8Array(W * H).fill(255);
const seen = new Uint8Array(W * H);
const stack = new Int32Array(W * H);
let top = 0;
const isWhite = (p) => {
  const i = p * 3;
  return healed[i] >= 240 && healed[i + 1] >= 240 && healed[i + 2] >= 240;
};
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
for (let pass = 0; pass < 4; pass++) {
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
  rgba[p * 4] = healed[p * 3];
  rgba[p * 4 + 1] = healed[p * 3 + 1];
  rgba[p * 4 + 2] = healed[p * 3 + 2];
  rgba[p * 4 + 3] = alpha[p];
}

const cutBg = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .trim({ threshold: 1 })
  .png()
  .toBuffer({ resolveWithObject: true });
await sharp(cutBg.data).png().toFile(`${OUT}/73-cutout-healed.png`);
console.log("healed cutout", cutBg.info.width, "x", cutBg.info.height);
