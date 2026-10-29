import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const F = "D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png";
const m = await sharp(F).metadata();
console.log(m.width, m.height);
await sharp(F).extract({ left: 60, top: 330, width: 140, height: 180 }).resize(560).png().toFile(TMP + "/L1-left.png");
await sharp(F).extract({ left: 250, top: 330, width: 140, height: 180 }).resize(560).png().toFile(TMP + "/L1-right.png");
console.log("ok");
