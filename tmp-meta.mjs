import sharp from "sharp";
for (const f of ["80-smooth.png", "81-smooth.png"]) {
  const m = await sharp("C:/Users/skumar1/AppData/Local/Temp/opencode/" + f).metadata();
  console.log(f, m.width, m.height, m.channels, m.size);
}
