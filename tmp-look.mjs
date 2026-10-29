import sharp from "sharp";
const f = "D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png";
await sharp({ create: { width: 700, height: 700, channels: 4, background: "#f9d8dd" } })
  .composite([{ input: f, gravity: "center" }])
  .png()
  .toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/A1-badge.png");
// close-ups of the two ear areas
const m = await sharp(f).metadata();
console.log(m.width, m.height);
await sharp(f).extract({ left: 40, top: 300, width: 180, height: 200 }).resize(720).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/A1-left.png");
await sharp(f).extract({ left: 240, top: 300, width: 180, height: 200 }).resize(720).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/A1-right.png");
console.log("ok");
