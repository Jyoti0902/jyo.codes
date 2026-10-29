import fs from "node:fs";
import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const b64 = fs.readFileSync("D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png").toString("base64");
const meta = await sharp("D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png").metadata();
for (const size of [88, 96, 112]) {
  const h = Math.round(size * 1.15);
  const w = Math.round((meta.width / meta.height) * h);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs><clipPath id="c"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></clipPath></defs>
    <g clip-path="url(#c)">
      <rect width="${size}" height="${size}" fill="#f9d8dd"/>
      <image href="data:image/png;base64,${b64}" x="${(size - w) / 2}" y="${size - h + 2}" width="${w}" height="${h}"/>
    </g>
  </svg>`;
  await sharp(Buffer.from(svg)).resize(size * 5, size * 5, { kernel: "nearest" }).png().toFile(`${TMP}/D1-badge-${size}.png`);
}
console.log("ok");
