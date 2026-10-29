import sharp from "sharp";
const { data, info } = await sharp("C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg").resize({ width: 760, fit: "inside" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = new Float32Array(W * H * 3);
for (let p = 0; p < W * H; p++) { px[p*3] = data[p*3]; px[p*3+1] = data[p*3+1]; px[p*3+2] = data[p*3+2]; }
const outBuf = Buffer.alloc(W * H * 3);
for (let i = 0; i < outBuf.length; i++) outBuf[i] = Math.max(0, Math.min(255, Math.round(px[i])));
await sharp(outBuf, { raw: { width: W, height: H, channels: 3 } }).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/83-copytest.png");
console.log("ok");
