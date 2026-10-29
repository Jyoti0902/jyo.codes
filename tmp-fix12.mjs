import fs from "node:fs";
const file = "D:/Me/2026-Projects/jyo.codes/tmp-portrait.mjs";
let s = fs.readFileSync(file, "utf8");
s = s.replace(
"const hairMean = boxMean((p) => lum[p] < 95 && !(lum[p] > 240 && sat[p] < 10), 26);",
"const hairMean = boxMean((p) => lum[p] < 95 && !(lum[p] > 240 && sat[p] < 10), 26);\nconst hairWide = boxMean((p) => lum[p] < 120 && !(lum[p] > 240 && sat[p] < 10), 70);");
fs.writeFileSync(file, s);
