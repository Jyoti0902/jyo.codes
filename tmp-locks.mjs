import sharp from "sharp";

const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const W = 1254, H = 1254;

const left = "M262 600 C 240 700, 246 820, 268 960 L 372 960 C 344 850, 344 720, 386 610 Z";
const right = "M846 640 C 866 720, 870 830, 858 970 L 762 970 C 786 860, 786 740, 752 650 Z";

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <path d="${left}" fill="#ff0000" fill-opacity="0.45"/>
  <path d="${right}" fill="#0066ff" fill-opacity="0.45"/>
</svg>`;

await sharp(SRC)
  .composite([{ input: Buffer.from(overlay) }])
  .png()
  .toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/74-locks.png");
console.log("ok");
