import sharp from "sharp";
const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
// 6x zoom of the forehead, with a 10px grid so the bindi centre can be read off.
let grid = "";
for (let i = 0; i <= 140; i += 10) {
  grid += `<line x1="${i}" y1="0" x2="${i}" y2="140" stroke="#00b7ff" stroke-width="0.4" opacity="0.55"/>`;
  grid += `<line x1="0" y1="${i}" x2="140" y2="${i}" stroke="#00b7ff" stroke-width="0.4" opacity="0.55"/>`;
}
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140">${grid}</svg>`);
await sharp(SRC)
  .extract({ left: 630, top: 480, width: 140, height: 140 })
  .composite([{ input: svg }])
  .resize(700, 700, { kernel: "nearest" })
  .png()
  .toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/96-bindi-zoom.png");
console.log("ok");
