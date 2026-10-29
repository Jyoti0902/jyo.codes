import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-detect.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace(
`await sharp(SRC)
  .composite([{ input: overlayPng }])
  .extract({ left: 240, top: 660, width: 720, height: 320 })
  .resize(1440)
  .png()
  .toFile(\`\${TMP}/G0-mask.png\`);`,
`const merged = await sharp(SRC).composite([{ input: overlayPng }]).png().toBuffer();
await sharp(merged).extract({ left: 240, top: 660, width: 760, height: 330 }).resize(1520).png().toFile(\`\${TMP}/G0-mask.png\`);`);
fs.writeFileSync(f, s);
