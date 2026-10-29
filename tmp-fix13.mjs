import fs from "node:fs";
const file = "D:/Me/2026-Projects/jyo.codes/tmp-portrait.mjs";
let s = fs.readFileSync(file, "utf8");

const start = s.indexOf("for (let y = 0; y < H; y++) {\n  for (let x = 0; x < W; x++) {\n    const p = y * W + x;\n    if (!hole[p]) continue;\n    let tone = null;");
const endMark = "// ---------------------------------------------------- 4. feathered composite";
const end = s.indexOf(endMark);
if (start < 0 || end < 0) throw new Error("anchors missing");

const replacement = `for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!hole[p]) continue;
    if (cls[p] === BG) {
      px[p * 3] = 252;
      px[p * 3 + 1] = 252;
      px[p * 3 + 2] = 252;
      continue;
    }
    const hairTone = hairMean(x, y) ?? hairWide(x, y) ?? [45, 35, 30];
    const skinTone = skinMean(x, y) ?? skinWide(x, y) ?? [200, 150, 120];
    // inverse-distance blend: hair wins inside the hair, skin wins near the
    // cheek, and the seam between them fades instead of drawing a line
    const dh2 = 1 / Math.pow(dist[p * 3] + 1, 1.6);
    const ds2 = 1 / Math.pow(dist[p * 3 + 1] + 1, 1.6);
    const w = dh2 / (dh2 + ds2);
    for (let c = 0; c < 3; c++) px[p * 3 + c] = hairTone[c] * w + skinTone[c] * (1 - w);
  }
}

`;
s = s.slice(0, start) + replacement + s.slice(end);
fs.writeFileSync(file, s);
console.log("patched");
