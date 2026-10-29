import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-toon.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace("80-smooth.png", "81-smooth.png");
fs.writeFileSync(f, s);
