import sharp from "sharp";
const TMP = "C:/Users/skumar1/AppData/Local/Temp/opencode";
const { data, info } = await sharp(TMP + "/K0-healed.png").removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const at = (x, y) => [data[(y * W + x) * 3], data[(y * W + x) * 3 + 1], data[(y * W + x) * 3 + 2]];
console.log("330,885", at(330, 885));
console.log("340,880", at(340, 880));
// find bright pixels inside the left ellipse region
let best = [];
for (let y = 720; y <= 910; y++) {
  for (let x = 277; x <= 388; x++) {
    const [r, g, b] = at(x, y);
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    if (l > 150) best.push([x, y, Math.round(l)]);
  }
}
console.log("left bright count", best.length, best.slice(0, 12));
let best2 = [];
for (let y = 772; y <= 946; y++) {
  for (let x = 812; x <= 908; x++) {
    const [r, g, b] = at(x, y);
    const l = 0.299 * r + 0.587 * g + 0.114 * b;
    if (l > 150) best2.push([x, y, Math.round(l)]);
  }
}
console.log("right bright count", best2.length, best2.slice(0, 12));
