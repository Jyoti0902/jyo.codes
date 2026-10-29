import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-portrait.mjs";
let s = fs.readFileSync(f, "utf8");
s = s.replace(
`await sharp(healed, { raw: { width: W, height: H, channels: 3 } }).png().toFile(\`\${TMP}/K0-healed.png\`);`,
`for (const [x, y] of [[330, 885], [340, 880], [320, 870], [855, 905], [860, 915], [350, 858]]) {
  const p = y * W + x;
  console.log("probe", x, y, "hole", hole[p], "cls", cls[p], "depth", depth[p]);
}

await sharp(healed, { raw: { width: W, height: H, channels: 3 } }).png().toFile(\`\${TMP}/K0-healed.png\`);`);
fs.writeFileSync(f, s);
