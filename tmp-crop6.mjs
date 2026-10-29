import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
await sharp(TMP + "/K0-healed.png").extract({ left: 260, top: 700, width: 150, height: 230 }).resize(600).png().toFile(TMP + "/K2-left.png");
await sharp(TMP + "/K0-healed.png").extract({ left: 790, top: 760, width: 150, height: 190 }).resize(600).png().toFile(TMP + "/K2-right.png");
console.log("ok");
