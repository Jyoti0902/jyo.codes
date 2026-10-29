import sharp from "sharp";
const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const base = sharp(SRC);
await sharp(SRC).extract({ left: 250, top: 690, width: 160, height: 250 }).resize(480).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/71-left-ear.png");
await sharp(SRC).extract({ left: 780, top: 750, width: 160, height: 250 }).resize(480).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/71-right-ear.png");
await sharp(SRC).extract({ left: 650, top: 500, width: 120, height: 110 }).resize(480).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/71-bindi.png");
console.log("ok");
