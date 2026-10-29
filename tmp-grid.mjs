import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const W = 1254, H = 1254;
let grid = "";
for (let x = 0; x <= W; x += 100) {
  grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#00b7ff" stroke-width="1" opacity="0.6"/>`;
  grid += `<text x="${x + 3}" y="16" font-size="16" fill="#005f86">${x}</text>`;
}
for (let y = 0; y <= H; y += 100) {
  grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#00b7ff" stroke-width="1" opacity="0.6"/>`;
  grid += `<text x="4" y="${y - 4}" font-size="16" fill="#005f86">${y}</text>`;
}
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${grid}</svg>`);
await sharp(SRC).composite([{ input: svg }]).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/70-grid.png");
console.log("ok");
