import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
await sharp(TMP + "/98-heal2.png").extract({ left: 230, top: 640, width: 220, height: 320 }).resize(660).png().toFile(TMP + "/B2-left-healed.png");
await sharp(TMP + "/98-heal2.png").extract({ left: 760, top: 680, width: 220, height: 320 }).resize(660).png().toFile(TMP + "/B2-right-healed.png");
console.log("ok");
