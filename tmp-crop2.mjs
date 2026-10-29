import sharp from "sharp";
await sharp("C:/Users/skumar1/AppData/Local/Temp/opencode/94-nearest-blur.png").extract({ left: 620, top: 460, width: 220, height: 200 }).resize(660).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/95-bindi.png");
await sharp("C:/Users/skumar1/AppData/Local/Temp/opencode/94-nearest-blur.png").extract({ left: 700, top: 720, width: 160, height: 140 }).resize(640).png().toFile("C:/Users/skumar1/AppData/Local/Temp/opencode/95-nose.png");
console.log("ok");
