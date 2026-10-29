import sharp from "sharp";
const cut = await sharp("C:/Users/skumar1/AppData/Local/Temp/opencode/92-patch.png")
  .resize({ height: 220 })
  .extract({ left: 0, top: 0, width: 220, height: 220 })
  .png()
  .toBuffer();
await sharp({ create: { width: 300, height: 300, channels: 4, background: "#f9d8dd" } })
  .composite([{ input: cut, gravity: "center" }])
  .resize(600, 600, { kernel: "nearest" })
  .png()
  .toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/93-small.png");
console.log("ok");
