import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const regions = [
  { cx: 327, cy: 816, rx: 46, ry: 92 },
  { cx: 856, cy: 843, rx: 44, ry: 96 },
  { cx: 705, cy: 546, rx: 14, ry: 14 },
  { cx: 762, cy: 781, rx: 16, ry: 16 },
];

const mask = new Uint8Array(W * H);
for (const m of regions) {
  for (let y = Math.max(0, Math.floor(m.cy - m.ry)); y <= Math.min(H - 1, m.cy + m.ry); y++) {
    for (let x = Math.max(0, Math.floor(m.cx - m.rx)); x <= Math.min(W - 1, m.cx + m.rx); x++) {
      const dx = (x - m.cx) / m.rx;
      const dy = (y - m.cy) / m.ry;
      if (dx * dx + dy * dy <= 1) mask[y * W + x] = 1;
    }
  }
}

// Bright, desaturated pixels are the earring itself: never copy those in.
const silver = (p) => {
  const r = data[p * 3];
  const g = data[p * 3 + 1];
  const b = data[p * 3 + 2];
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  return l > 185 && Math.max(r, g, b) - Math.min(r, g, b) < 32;
};

// Nearest-boundary fill: every hole pixel copies the closest pixel outside.
const src = new Int32Array(W * H).fill(-1);
const queue = new Int32Array(W * H);
let head = 0;
let tail = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!mask[p]) continue;
    const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
    const k = nb.find((q) => q >= 0 && !mask[q] && !silver(q));
    if (k === undefined) continue;
    src[p] = k;
    queue[tail++] = p;
  }
}
while (head < tail) {
  const p = queue[head++];
  const x = p % W;
  const y = (p - x) / W;
  const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
  for (const q of nb) {
    if (q < 0 || !mask[q] || src[q] !== -1) continue;
    src[q] = src[p];
    queue[tail++] = q;
  }
}
for (let p = 0; p < W * H; p++) {
  if (mask[p] && src[p] === -1) {
    const x = p % W;
    const y = (p - x) / W;
    const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
    const k = nb.find((q) => q >= 0 && !mask[q]);
    if (k !== undefined) src[p] = k;
  }
}

const filled = Buffer.alloc(W * H * 3);
for (let p = 0; p < W * H; p++) {
  const s = mask[p] ? src[p] : p;
  filled[p * 3] = data[s * 3];
  filled[p * 3 + 1] = data[s * 3 + 1];
  filled[p * 3 + 2] = data[s * 3 + 2];
}

// Blur hard inside the patches and feather the patch border into the photo.
const blurred = await sharp(filled, { raw: { width: W, height: H, channels: 3 } })
  .blur(9)
  .raw()
  .toBuffer();

const finalBuf = Buffer.alloc(W * H * 3);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!mask[p]) {
      finalBuf[p * 3] = data[p * 3];
      finalBuf[p * 3 + 1] = data[p * 3 + 1];
      finalBuf[p * 3 + 2] = data[p * 3 + 2];
      continue;
    }
    // distance-ish feather: 1 deep inside, 0 at the rim
    let depth = 0;
    for (let r = 1; r <= 8; r++) {
      let inside = true;
      for (let dy = -r; dy <= r && inside; dy++) {
        for (let dx = -r; dx <= r && inside; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H || !mask[ny * W + nx]) inside = false;
        }
      }
      if (!inside) break;
      depth = r;
    }
    const a = Math.min(1, depth / 6);
    for (let c = 0; c < 3; c++) {
      finalBuf[p * 3 + c] = data[p * 3 + c] * (1 - a) + blurred[p * 3 + c] * a;
    }
  }
}

await sharp(finalBuf, { raw: { width: W, height: H, channels: 3 } })
  .png()
  .toFile(`${TMP}/98-heal2.png`);
console.log("ok");
