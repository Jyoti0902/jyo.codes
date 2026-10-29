import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const OUT_DIR = "D:/Me/2026-Projects/jyo.codes/public/momo";

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// --- 1. Take out the bindi and the nose ring -------------------------------
const spots = [
  { cx: 705, cy: 546, rx: 15, ry: 15 }, // bindi
  { cx: 762, cy: 781, rx: 17, ry: 17 }, // nose ring
];
const masked = new Uint8Array(W * H);
for (const m of spots) {
  for (let y = m.cy - m.ry; y <= m.cy + m.ry; y++) {
    for (let x = m.cx - m.rx; x <= m.cx + m.rx; x++) {
      const dx = (x - m.cx) / m.rx;
      const dy = (y - m.cy) / m.ry;
      if (dx * dx + dy * dy <= 1) masked[y * W + x] = 1;
    }
  }
}

const rgb = new Float32Array(W * H * 3);
for (let p = 0; p < W * H; p++) {
  rgb[p * 3] = data[p * C];
  rgb[p * 3 + 1] = data[p * C + 1];
  rgb[p * 3 + 2] = data[p * C + 2];
}

const b = [0, 0, 0];
let bc = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!masked[p]) continue;
    const edge =
      (x > 0 && !masked[p - 1]) ||
      (x < W - 1 && !masked[p + 1]) ||
      (y > 0 && !masked[p - W]) ||
      (y < H - 1 && !masked[p + W]);
    if (!edge) continue;
    b[0] += rgb[p * 3];
    b[1] += rgb[p * 3 + 1];
    b[2] += rgb[p * 3 + 2];
    bc++;
  }
}
for (let p = 0; p < W * H; p++) {
  if (!masked[p]) continue;
  rgb[p * 3] = b[0] / bc;
  rgb[p * 3 + 1] = b[1] / bc;
  rgb[p * 3 + 2] = b[2] / bc;
}
for (let iter = 0; iter < 700; iter++) {
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!masked[p]) continue;
      for (let c = 0; c < 3; c++) {
        rgb[p * 3 + c] =
          (rgb[(p - 1) * 3 + c] +
            rgb[(p + 1) * 3 + c] +
            rgb[(p - W) * 3 + c] +
            rgb[(p + W) * 3 + c]) /
          4;
      }
    }
  }
}

const healed = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H * 3; i++) healed[i] = Math.max(0, Math.min(255, Math.round(rgb[i])));

// --- 2. Drop a lock of hair over each earring ------------------------------
const leftPatch = await sharp(healed, { raw: { width: W, height: H, channels: 3 } })
  .extract({ left: 205, top: 590, width: 78, height: 420 })
  .resize(150, 440, { fit: "fill" })
  .png()
  .toBuffer();
const rightPatch = await sharp(healed, { raw: { width: W, height: H, channels: 3 } })
  .extract({ left: 900, top: 620, width: 78, height: 420 })
  .resize(140, 470, { fit: "fill" })
  .png()
  .toBuffer();

const leftPath = "M282 590 C 244 690, 240 830, 262 1010 L 382 1010 C 348 860, 350 700, 392 600 Z";
const rightPath = "M792 660 C 786 780, 800 900, 828 1020 L 962 1020 C 928 900, 918 780, 912 670 Z";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <clipPath id="lockLeft"><path d="${leftPath}"/></clipPath>
    <clipPath id="lockRight"><path d="${rightPath}"/></clipPath>
  </defs>
  <g clip-path="url(#lockLeft)">
    <image href="data:image/png;base64,${leftPatch.toString("base64")}" x="240" y="590" width="150" height="430" preserveAspectRatio="none"/>
  </g>
  <g clip-path="url(#lockRight)">
    <image href="data:image/png;base64,${rightPatch.toString("base64")}" x="782" y="660" width="190" height="370" preserveAspectRatio="none"/>
  </g>
</svg>`;

const composited = await sharp(healed, { raw: { width: W, height: H, channels: 3 } })
  .composite([{ input: Buffer.from(svg) }])
  .removeAlpha()
  .raw()
  .toBuffer();
await sharp(composited, { raw: { width: W, height: H, channels: 3 } })
  .png()
  .toFile(`${TMP}/75-locked.png`);
console.log("wrote 75-locked");
