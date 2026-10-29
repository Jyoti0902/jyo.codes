import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-toon.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace("      const cg = px[p * 3 + 1];\n      const cb = px[p * 3 + 2];", "      const cg = px[p + 1];\n      const cb = px[p + 2];");
s = s.replace("84-smooth.png", "86-smooth.png");
fs.writeFileSync(f, s);
console.log("ok");
