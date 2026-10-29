import sharp from "sharp";
await sharp({ create: { width: 600, height: 700, channels: 4, background: "#f9d8dd" } })
  .composite([{ input: "D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png", gravity: "center" }])
  .png()
  .toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/90-pink-bg.png");
console.log("ok");
