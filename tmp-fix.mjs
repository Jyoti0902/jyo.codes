import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-final.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace(
`const composited = await sharp(healed, { raw: { width: W, height: H, channels: 3 } })
  .composite([{ input: Buffer.from(svg) }])
  .raw()
  .toBuffer();`,
`const composited = await sharp(healed, { raw: { width: W, height: H, channels: 3 } })
  .composite([{ input: Buffer.from(svg) }])
  .removeAlpha()
  .raw()
  .toBuffer();`);
fs.writeFileSync(f, s);
console.log("ok");
