import fs from "node:fs";
const file = "D:/Me/2026-Projects/jyo.codes/tmp-heal.mjs";
let src = fs.readFileSync(file, "utf8");

src = src.replace(
  `const dark = (p) => {
  const l = 0.299 * healedSrc[p * 3] + 0.587 * healedSrc[p * 3 + 1] + 0.114 * healedSrc[p * 3 + 2];
  return l < 120;
};`,
  `const dark = (p) => {
  const i = p * C;
  const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  return l < 120;
};`,
);

src = src.replace(
  `const healedSrc = Buffer.alloc(W * H * 3);
for (let p = 0; p < W * H; p++) {
  healedSrc[p * 3] = data[p * C];
  healedSrc[p * 3 + 1] = data[p * C + 1];
  healedSrc[p * 3 + 2] = data[p * C + 2];
}

`,
  "",
);

fs.writeFileSync(file, src);
console.log("patched");
