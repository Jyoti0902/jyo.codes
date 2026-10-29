import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const lum = new Float32Array(W * H);
const sat = new Float32Array(W * H);
const hue = new Float32Array(W * H);
for (let p = 0; p < W * H; p++) {
  const r = data[p * C], g = data[p * C + 1], b = data[p * C + 2];
  lum[p] = 0.299 * r + 0.587 * g + 0.114 * b;
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  sat[p] = mx === 0 ? 0 : (mx - mn) / mx * 100;
  let h = 0;
  if (mx === mn) h = 0;
  else if (mx === r) h = ((g - b) / (mx - mn)) % 6;
  else if (mx === g) h = (b - r) / (mx - mn) + 2;
  else h = (r - g) / (mx - mn) + 4;
  hue[p] = (h * 60 + 360) % 360;
}

// skin: warm orange and fairly bright
const isSkin = (p) => sat[p] > 45 && lum[p] > 115 && hue[p] > 5 && hue[p] < 45;
const isMetal = (p) => lum[p] > 115 && sat[p] < 45;

const windows = [
  { x0: 255, y0: 690, x1: 405, y1: 930 },
  { x0: 780, y0: 715, x1: 930, y1: 960 },
];

const mask = new Uint8Array(W * H);
for (const win of windows) {
  // seed with the silver bits
  const local = new Uint8Array(W * H);
  for (let y = win.y0; y <= win.y1; y++) {
    for (let x = win.x0; x <= win.x1; x++) {
      const p = y * W + x;
      if (isMetal(p)) local[p] = 1;
    }
  }
  // grow over anything that is not skin and not the white background
  for (let iter = 0; iter < 14; iter++) {
    const before = local.slice();
    for (let y = win.y0; y <= win.y1; y++) {
      for (let x = win.x0; x <= win.x1; x++) {
        const p = y * W + x;
        if (before[p] || isSkin(p)) continue;
        if (lum[p] > 244 && sat[p] < 12) continue; // background
        if (
          before[p - 1] || before[p + 1] || before[p - W] || before[p + W] ||
          before[p - W - 1] || before[p - W + 1] || before[p + W - 1] || before[p + W + 1]
        ) local[p] = 1;
      }
    }
  }
  for (let p = 0; p < W * H; p++) if (local[p]) mask[p] = 1;
}

// close small gaps, then drop specks
let work = mask;
for (let pass = 0; pass < 3; pass++) {
  const before = work.slice();
  work = before.slice();
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (before[p]) continue;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) n += before[p + dy * W + dx];
      if (n >= 5) work[p] = 1;
    }
  }
}

const overlay = Buffer.alloc(W * H * 4);
for (let p = 0; p < W * H; p++) {
  overlay[p * 4] = 255;
  overlay[p * 4 + 1] = 0;
  overlay[p * 4 + 2] = 0;
  overlay[p * 4 + 3] = work[p] ? 110 : 0;
}

const overlayPng = await sharp(overlay, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const merged = await sharp(SRC).composite([{ input: overlayPng }]).png().toBuffer();
await sharp(merged).extract({ left: 240, top: 660, width: 760, height: 330 }).resize(1520).png().toFile(`${TMP}/G0-mask.png`);
console.log("ok");
