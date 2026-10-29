import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
await sharp("D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png").resize({ height: 108 }).png().toFile(TMP + "/E0.png");
console.log("ok");
