import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const f = "D:/Me/2026-Projects/jyo.codes/public/momo/momo-portrait.png";
// Simulate the badge at the sizes the page uses, then blow back up to inspect.
for (const size of [88, 96, 112]) {
  const circle = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#f9d8dd"/></svg>`,
  );
  const inner = await sharp(f).resize({ height: Math.round(size * 1.12) }).toBuffer();
  const badge = await sharp(circle)
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toBuffer();
  await sharp(badge).resize(size * 5, size * 5, { kernel: "nearest" }).png().toFile(`${TMP}/D1-badge-${size}.png`);
}
console.log("ok");
