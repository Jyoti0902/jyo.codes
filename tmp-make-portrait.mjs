import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const OUT_DIR = "D:/Me/2026-Projects/jyo.codes/public/momo";
fs.mkdirSync(OUT_DIR, { recursive: true });

const { data, info } = await sharp(SRC)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Flood fill the near-white background in from the border so the die-cut
// outline goes away too, but enclosed whites (earring details, catchlights)
// stay untouched.
const alpha = new Uint8Array(width * height).fill(255);
const seen = new Uint8Array(width * height);
const stack = new Int32Array(width * height);
let top = 0;

const isWhite = (p) => {
  const i = p * channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  return r >= 240 && g >= 240 && b >= 240;
};
const push = (p) => {
  if (!seen[p] && isWhite(p)) {
    seen[p] = 1;
    stack[top++] = p;
  }
};

for (let x = 0; x < width; x++) {
  push(x);
  push((height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  push(y * width);
  push(y * width + width - 1);
}

while (top > 0) {
  const p = stack[--top];
  alpha[p] = 0;
  const x = p % width;
  const y = (p - x) / width;
  if (x > 0) push(p - 1);
  if (x < width - 1) push(p + 1);
  if (y > 0) push(p - width);
  if (y < height - 1) push(p + width);
}

// Erode the silhouette a few pixels so the sticker's white rim (and its
// JPEG halo) does not survive as a pale outline on the pink badge.
for (let pass = 0; pass < 4; pass++) {
  const before = alpha.slice();
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const p = y * width + x;
      if (!before[p]) continue;
      if (
        !before[p - 1] ||
        !before[p + 1] ||
        !before[p - width] ||
        !before[p + width]
      ) {
        alpha[p] = 0;
      }
    }
  }
}

const rgba = Buffer.alloc(width * height * 4);
for (let p = 0; p < width * height; p++) {
  rgba[p * 4] = data[p * channels];
  rgba[p * 4 + 1] = data[p * channels + 1];
  rgba[p * 4 + 2] = data[p * channels + 2];
  rgba[p * 4 + 3] = alpha[p];
}

const cutout = sharp(rgba, { raw: { width, height, channels: 4 } });

// Trim the transparent margin, then keep a version big enough for a 2x badge.
const trimmed = await cutout.png().toBuffer();
const meta = await sharp(trimmed).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });

await sharp(meta.data)
  .resize({ height: 640, fit: "inside", withoutEnlargement: false })
  .png({ compressionLevel: 9, palette: false })
  .toFile(`${OUT_DIR}/momo-portrait.png`);

const final = await sharp(`${OUT_DIR}/momo-portrait.png`).metadata();
console.log("source", width, "x", height, "-> cutout", meta.info.width, "x", meta.info.height, "-> png", final.width, "x", final.height);
console.log("bytes", fs.statSync(`${OUT_DIR}/momo-portrait.png`).size);
