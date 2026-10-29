import fs from "node:fs";
const file = "D:/Me/2026-Projects/jyo.codes/tmp-portrait.mjs";
let s = fs.readFileSync(file, "utf8");
const fill = fs.readFileSync("D:/Me/2026-Projects/jyo.codes/tmp-fill.js", "utf8");

const anchor = "for (let y = 0; y < H; y++) {\n  for (let x = 0; x < W; x++) {\n    const p = y * W + x;\n    if (!hole[p]) continue;\n    let found = -1;";
const start = s.indexOf(anchor);
const endMark = "// ---------------------------------------------------- 4. feathered composite";
const end = s.indexOf(endMark);
if (start < 0 || end < 0) throw new Error("anchors missing " + start + " " + end);
s = s.slice(0, start) + fill + "\n" + s.slice(end);
// feather a touch tighter now that the tones match locally
s = s.replace("Math.min(1, depth[p] / 16)", "Math.min(1, depth[p] / 7)");
fs.writeFileSync(file, s);
console.log("patched");
