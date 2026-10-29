import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-toon.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace(
`await sharp(Buffer.from(px.map((v) => Math.max(0, Math.min(255, Math.round(v))))), {
  raw: { width: W, height: H, channels: 3 },
})`,
`const outBuf = Buffer.alloc(W * H * 3);
for (let i = 0; i < outBuf.length; i++) {
  outBuf[i] = Math.max(0, Math.min(255, Math.round(px[i])));
}
await sharp(outBuf, { raw: { width: W, height: H, channels: 3 } })`);
fs.writeFileSync(f, s);
console.log("ok");
