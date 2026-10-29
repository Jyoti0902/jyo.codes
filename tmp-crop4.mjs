import sharp from "sharp";
const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
await sharp(SRC).extract({ left: 230, top: 640, width: 220, height: 320 }).resize(660).png().toFile(TMP + "/B1-left-src.png");
await sharp(SRC).extract({ left: 760, top: 680, width: 220, height: 320 }).resize(660).png().toFile(TMP + "/B1-right-src.png");
console.log("ok");
