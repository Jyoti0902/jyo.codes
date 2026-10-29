import fs from "node:fs";
import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const b64 = fs.readFileSync("D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png").toString("base64");
const m = await sharp("D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png").metadata();
const size = 700;
const h = Math.round(size * 1.15);
const w = Math.round((m.width / m.height) * h);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs><clipPath id="c"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></clipPath></defs>
  <g clip-path="url(#c)">
    <rect width="${size}" height="${size}" fill="#f9d8dd"/>
    <image href="data:image/png;base64,${b64}" x="${(size - w) / 2}" y="${size - h + 12}" width="${w}" height="${h}"/>
  </g>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(TMP + "/M1-badge-700.png");
console.log("ok");
