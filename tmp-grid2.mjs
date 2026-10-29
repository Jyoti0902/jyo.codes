import sharp from "sharp";
const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
async function gridCrop(name, x0, y0, w, h, scale) {
  let g = "";
  for (let i = 0; i <= w; i += 10) {
    g += `<line x1="${i}" y1="0" x2="${i}" y2="${h}" stroke="#00b7ff" stroke-width="0.25" opacity="0.8"/>`;
    if (i % 20 === 0) g += `<text x="${i + 1}" y="9" font-size="7" fill="#004c73">${x0 + i}</text>`;
  }
  for (let i = 0; i <= h; i += 10) {
    g += `<line x1="0" y1="${i}" x2="${w}" y2="${i}" stroke="#00b7ff" stroke-width="0.25" opacity="0.8"/>`;
    if (i % 20 === 0) g += `<text x="1" y="${i - 1}" font-size="7" fill="#004c73">${y0 + i}</text>`;
  }
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${g}</svg>`);
  await sharp(SRC).extract({ left: x0, top: y0, width: w, height: h }).composite([{ input: svg }]).resize(w * scale, h * scale, { kernel: "nearest" }).png().toFile(`${TMP}/${name}.png`);
}
await gridCrop("J1-left-grid", 270, 700, 130, 240, 6);
await gridCrop("J1-right-grid", 800, 760, 130, 200, 6);
console.log("ok");
