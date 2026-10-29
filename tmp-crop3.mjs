import sharp from "sharp";
await sharp("C:/Users/skumar1/AppData/Local/Temp/opencode/94-nearest-blur.png").extract({ left: 630, top: 480, width: 140, height: 140 }).resize(700, 700, { kernel: "nearest" }).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/97-bindi-after.png");
console.log("ok");
