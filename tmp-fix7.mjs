import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-detect.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace(
`await sharp(SRC)
  .composite([{ input: overlay, raw: { width: W, height: H, channels: 4 } }])`,
`const overlayPng = await sharp(overlay, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
await sharp(SRC)
  .composite([{ input: overlayPng }])`);
fs.writeFileSync(f, s);
