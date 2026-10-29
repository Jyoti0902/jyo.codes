import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const OUT_DIR = "D:/Me/2026-Projects/jyo.codes/public/momo";
fs.mkdirSync(OUT_DIR, { recursive: true });

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const lum = new Float32Array(W * H);
const sat = new Float32Array(W * H);
for (let p = 0; p < W * H; p++) {
  const r = data[p * C], g = data[p * C + 1], b = data[p * C + 2];
  lum[p] = 0.299 * r + 0.587 * g + 0.114 * b;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  sat[p] = mx ? ((mx - mn) / mx) * 100 : 0;
}

// ---------------------------------------------------- 1. regions to rebuild
// Each ellipse covers the jewellery plus a margin, so the feathered rim sits
// on clean photo instead of on leftover silver.
const spots = [
  { cx: 332.5, cy: 814, rx: 55, ry: 94 }, // left jhumka
  { cx: 860, cy: 859, rx: 48, ry: 87 }, // right jhumka
  { cx: 705, cy: 546, rx: 18, ry: 18 }, // bindi
];
const hole = new Uint8Array(W * H);
for (const m of spots) {
  for (let y = Math.max(0, Math.floor(m.cy - m.ry)); y <= Math.min(H - 1, m.cy + m.ry); y++) {
    for (let x = Math.max(0, Math.floor(m.cx - m.rx)); x <= Math.min(W - 1, m.cx + m.rx); x++) {
      const dx = (x - m.cx) / m.rx;
      const dy = (y - m.cy) / m.ry;
      if (dx * dx + dy * dy <= 1) hole[y * W + x] = 1;
    }
  }
}

// ------------------------------------------- 2. hair, skin or background?
// Multi-source BFS from each class; the nearest clean pixel decides what the
// hole pixel should be. That keeps the hairline, the jaw and the silhouette.
const HAIR = 0, SKIN = 1, BG = 2;
const cls = new Int8Array(W * H).fill(-1);
const dist = new Int32Array(W * H * 3).fill(1 << 30);
const qx = new Int32Array(W * H);
const qy = new Int32Array(W * H);

const isBg = (p) => lum[p] > 240 && sat[p] < 10;
const isHair = (p) => lum[p] < 95 && !isBg(p);
const isSkin = (p) => sat[p] > 40 && lum[p] > 100 && !isBg(p);

[isHair, isSkin, isBg].forEach((test, k) => {
  let head = 0;
  let tail = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (hole[p] || !test(p)) continue;
      dist[p * 3 + k] = 0;
      qx[tail] = x;
      qy[tail] = y;
      tail++;
    }
  }
  while (head < tail) {
    const x = qx[head];
    const y = qy[head];
    head++;
    const d = dist[(y * W + x) * 3 + k] + 1;
    for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const q = ny * W + nx;
      if (dist[q * 3 + k] <= d) continue;
      dist[q * 3 + k] = d;
      qx[tail] = nx;
      qy[tail] = ny;
      tail++;
    }
  }
});

for (let p = 0; p < W * H; p++) {
  if (!hole[p]) continue;
  let best = HAIR;
  for (let k = 1; k < 3; k++) if (dist[p * 3 + k] < dist[p * 3 + best]) best = k;
  cls[p] = best;
}

// Per-row hair tone, so the rebuilt hair matches the real hair above it.
const hairRow = new Float32Array(H * 3);
{
  const cols = [[236, 268], [470, 560], [690, 760], [770, 800]];
  const known = new Uint8Array(H);
  for (let y = 0; y < H; y++) {
    const samples = [];
    for (const [x0, x1] of cols) {
      for (let x = x0; x <= x1; x++) {
        const p = y * W + x;
        if (hole[p] || !isHair(p)) continue;
        samples.push(p);
      }
    }
    if (samples.length < 6) continue;
    for (let c = 0; c < 3; c++) hairRow[y * 3 + c] = samples.reduce((s, p) => s + data[p * C + c], 0) / samples.length;
    known[y] = 1;
  }
  for (let y = 0; y < H; y++) {
    if (known[y]) continue;
    let a = y - 1;
    while (a >= 0 && !known[a]) a--;
    let b = y + 1;
    while (b < H && !known[b]) b++;
    for (let c = 0; c < 3; c++) {
      const va = a >= 0 ? hairRow[a * 3 + c] : 45;
      const vb = b < H ? hairRow[b * 3 + c] : va;
      const t = a >= 0 && b < H ? (y - a) / (b - a) : 0;
      hairRow[y * 3 + c] = va * (1 - t) + vb * t;
    }
  }
}

// ------------------------------------------------------------ 3. the repair
const px = new Float32Array(W * H * 3);
for (let p = 0; p < W * H; p++) {
  px[p * 3] = data[p * C];
  px[p * 3 + 1] = data[p * C + 1];
  px[p * 3 + 2] = data[p * C + 2];
}

// Fills the jewellery areas with the *local* hair / skin tone, measured from
// clean pixels of the same class in a wide window. That keeps highlights and
// shadows where they belong, so a rebuilt patch blends into its surroundings.
const boxMean = (test, radius) => {
  const sum = new Float64Array((W + 1) * (H + 1) * 4);
  for (let y = 0; y < H; y++) {
    let rowR = 0, rowG = 0, rowB = 0, rowN = 0;
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (!hole[p] && test(p)) {
        rowR += data[p * C];
        rowG += data[p * C + 1];
        rowB += data[p * C + 2];
        rowN++;
      }
      const up = y * (W + 1) + x + 1;
      const here = (y + 1) * (W + 1) + x + 1;
      sum[here * 4] = sum[up * 4] + rowR;
      sum[here * 4 + 1] = sum[up * 4 + 1] + rowG;
      sum[here * 4 + 2] = sum[up * 4 + 2] + rowB;
      sum[here * 4 + 3] = sum[up * 4 + 3] + rowN;
    }
  }
  return (x, y) => {
    const x0 = Math.max(0, x - radius);
    const x1 = Math.min(W - 1, x + radius);
    const y0 = Math.max(0, y - radius);
    const y1 = Math.min(H - 1, y + radius);
    const a = y0 * (W + 1) + x0;
    const b = y0 * (W + 1) + x1 + 1;
    const c = (y1 + 1) * (W + 1) + x0;
    const d = (y1 + 1) * (W + 1) + x1 + 1;
    const n = sum[d * 4 + 3] - sum[b * 4 + 3] - sum[c * 4 + 3] + sum[a * 4 + 3];
    if (n < 40) return null;
    return [
      (sum[d * 4] - sum[b * 4] - sum[c * 4] + sum[a * 4]) / n,
      (sum[d * 4 + 1] - sum[b * 4 + 1] - sum[c * 4 + 1] + sum[a * 4 + 1]) / n,
      (sum[d * 4 + 2] - sum[b * 4 + 2] - sum[c * 4 + 2] + sum[a * 4 + 2]) / n,
    ];
  };
};

const hairMean = boxMean((p) => lum[p] < 95 && !(lum[p] > 240 && sat[p] < 10), 26);
const hairWide = boxMean((p) => lum[p] < 120 && !(lum[p] > 240 && sat[p] < 10), 70);
const skinMean = boxMean((p) => sat[p] > 40 && lum[p] > 100 && lum[p] < 240, 26);
const skinWide = boxMean((p) => sat[p] > 25 && lum[p] > 95 && lum[p] < 245, 60);

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!hole[p]) continue;
    if (cls[p] === BG) {
      px[p * 3] = 252;
      px[p * 3 + 1] = 252;
      px[p * 3 + 2] = 252;
      continue;
    }
    const hairTone = hairMean(x, y) ?? hairWide(x, y) ?? [45, 35, 30];
    const skinTone = skinMean(x, y) ?? skinWide(x, y) ?? [200, 150, 120];
    // inverse-distance blend: hair wins inside the hair, skin wins near the
    // cheek, and the seam between them fades instead of drawing a line
    const dh2 = 1 / Math.pow(dist[p * 3] + 1, 1.6);
    const ds2 = 1 / Math.pow(dist[p * 3 + 1] + 1, 1.6);
    const w = dh2 / (dh2 + ds2);
    for (let c = 0; c < 3; c++) px[p * 3 + c] = hairTone[c] * w + skinTone[c] * (1 - w);
  }
}

// ---------------------------------------------------- 4. feathered composite
const depth = new Int32Array(W * H);
const dq = new Int32Array(W * H);
let dh = 0;
let dt = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!hole[p]) continue;
    const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
    if (nb.some((q) => q >= 0 && !hole[q])) {
      depth[p] = 1;
      dq[dt++] = p;
    }
  }
}
while (dh < dt) {
  const p = dq[dh++];
  const x = p % W;
  const y = (p - x) / W;
  const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
  for (const q of nb) {
    if (q < 0 || !hole[q] || depth[q]) continue;
    depth[q] = depth[p] + 1;
    dq[dt++] = q;
  }
}

const healed = Buffer.alloc(W * H * 3);
for (let p = 0; p < W * H; p++) {
  const a = hole[p] ? Math.min(1, depth[p] / 7) : 0;
  for (let c = 0; c < 3; c++) {
    healed[p * 3 + c] = Math.max(0, Math.min(255, Math.round(data[p * C + c] * (1 - a) + px[p * 3 + c] * a)));
  }
}

for (const [x, y] of [[330, 885], [340, 880], [320, 870], [855, 905], [860, 915], [350, 858]]) {
  const p = y * W + x;
  console.log("probe", x, y, "hole", hole[p], "cls", cls[p], "depth", depth[p]);
}

await sharp(healed, { raw: { width: W, height: H, channels: 3 } }).png().toFile(`${TMP}/K0-healed.png`);

// ----------------------------------------------------------- 5. cartoon pass
const small = await sharp(healed, { raw: { width: W, height: H, channels: 3 } })
  .resize({ height: 800, kernel: "lanczos3" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const w2 = small.info.width;
const h2 = small.info.height;
const buf = new Float32Array(w2 * h2 * 3);
for (let p = 0; p < w2 * h2; p++) {
  buf[p * 3] = small.data[p * 3];
  buf[p * 3 + 1] = small.data[p * 3 + 1];
  buf[p * 3 + 2] = small.data[p * 3 + 2];
}

function bilateral(radius, sigmaSpace, sigmaColor) {
  const out = new Float32Array(buf.length);
  const space = [];
  for (let d = -radius; d <= radius; d++) {
    for (let e = -radius; e <= radius; e++) {
      space.push([d, e, Math.exp(-(d * d + e * e) / (2 * sigmaSpace * sigmaSpace))]);
    }
  }
  const colorScale = -1 / (2 * sigmaColor * sigmaColor);
  for (let y = 0; y < h2; y++) {
    for (let x = 0; x < w2; x++) {
      const p = (y * w2 + x) * 3;
      const cr = buf[p];
      const cg = buf[p + 1];
      const cb = buf[p + 2];
      let sr = 0, sg = 0, sb = 0, sw = 0;
      for (const [d, e, ws] of space) {
        const nx = x + d;
        const ny = y + e;
        if (nx < 0 || ny < 0 || nx >= w2 || ny >= h2) continue;
        const q = (ny * w2 + nx) * 3;
        const dr = buf[q] - cr;
        const dg = buf[q + 1] - cg;
        const db = buf[q + 2] - cb;
        const w = ws * Math.exp((dr * dr + dg * dg + db * db) * colorScale);
        sr += buf[q] * w;
        sg += buf[q + 1] * w;
        sb += buf[q + 2] * w;
        sw += w;
      }
      out[p] = sr / sw;
      out[p + 1] = sg / sw;
      out[p + 2] = sb / sw;
    }
  }
  buf.set(out);
}

bilateral(4, 3.2, 40);
bilateral(3, 2.8, 30);

for (let p = 0; p < w2 * h2; p++) {
  const r = buf[p * 3];
  const g = buf[p * 3 + 1];
  const b = buf[p * 3 + 2];
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  buf[p * 3] = l + (r - l) * 1.15;
  buf[p * 3 + 1] = l + (g - l) * 1.15;
  buf[p * 3 + 2] = l + (b - l) * 1.15;
}

const LEVELS = 14;
for (let i = 0; i < buf.length; i++) {
  buf[i] = Math.max(0, Math.min(255, Math.round((buf[i] / 255) * (LEVELS - 1)) * (255 / (LEVELS - 1))));
}

const flat = Buffer.alloc(w2 * h2 * 3);
for (let i = 0; i < flat.length; i++) flat[i] = Math.round(buf[i]);

// ------------------------------------------------------- 6. cut out the white
const alpha = new Uint8Array(w2 * h2).fill(255);
const seen = new Uint8Array(w2 * h2);
const stack = new Int32Array(w2 * h2);
let top = 0;
const isWhite = (p) => flat[p * 3] >= 236 && flat[p * 3 + 1] >= 236 && flat[p * 3 + 2] >= 236;
const push = (p) => {
  if (!seen[p] && isWhite(p)) {
    seen[p] = 1;
    stack[top++] = p;
  }
};
for (let x = 0; x < w2; x++) {
  push(x);
  push((h2 - 1) * w2 + x);
}
for (let y = 0; y < h2; y++) {
  push(y * w2);
  push(y * w2 + w2 - 1);
}
while (top > 0) {
  const p = stack[--top];
  alpha[p] = 0;
  const x = p % w2;
  const y = (p - x) / w2;
  if (x > 0) push(p - 1);
  if (x < w2 - 1) push(p + 1);
  if (y > 0) push(p - w2);
  if (y < h2 - 1) push(p + w2);
}
for (let pass = 0; pass < 3; pass++) {
  const before = alpha.slice();
  for (let y = 1; y < h2 - 1; y++) {
    for (let x = 1; x < w2 - 1; x++) {
      const p = y * w2 + x;
      if (!before[p]) continue;
      if (!before[p - 1] || !before[p + 1] || !before[p - w2] || !before[p + w2]) alpha[p] = 0;
    }
  }
}

const rgba = Buffer.alloc(w2 * h2 * 4);
for (let p = 0; p < w2 * h2; p++) {
  rgba[p * 4] = flat[p * 3];
  rgba[p * 4 + 1] = flat[p * 3 + 1];
  rgba[p * 4 + 2] = flat[p * 3 + 2];
  rgba[p * 4 + 3] = alpha[p];
}

await sharp(rgba, { raw: { width: w2, height: h2, channels: 4 } })
  .trim({ threshold: 1 })
  .resize({ height: 640 })
  .png({ compressionLevel: 9 })
  .toFile(`${OUT_DIR}/momo-portrait.png`);

await sharp(`${OUT_DIR}/momo-portrait.png`).resize({ height: 240 }).png().toFile(`${TMP}/K1-portrait-240.png`);
const m = await sharp(`${OUT_DIR}/momo-portrait.png`).metadata();
console.log("portrait", m.width, "x", m.height, fs.statSync(`${OUT_DIR}/momo-portrait.png`).size, "bytes");
