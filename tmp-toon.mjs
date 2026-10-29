import fs from "node:fs";
import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";

const { data, info } = await sharp(SRC)
  .resize({ width: 760, fit: "inside" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const f = W / 1254;

const px = new Float32Array(W * H * 3);
for (let p = 0; p < W * H; p++) {
  px[p * 3] = data[p * 3];
  px[p * 3 + 1] = data[p * 3 + 1];
  px[p * 3 + 2] = data[p * 3 + 2];
}

// --- bilateral smoothing, done twice for that painted look ---------------
const bilateral = (radius, sigmaSpace, sigmaColor) => {
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
};

bilateral(4, 3.4, 42);
bilateral(3, 3, 34);
const outBuf = Buffer.alloc(W * H * 3);
for (let i = 0; i < outBuf.length; i++) {
  outBuf[i] = Math.max(0, Math.min(255, Math.round(px[i])));
}
await sharp(outBuf, { raw: { width: W, height: H, channels: 3 } })
  .png()
  .toFile(`${TMP}/86-smooth.png`);
console.log("wrote 80-smooth");
