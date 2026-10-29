import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-healblur.mjs";
let s = fs.readFileSync(f, "utf8");

s = s.replace(
`    const k = nb.find((q) => q >= 0 && !mask[q]);`,
`    const k = nb.find((q) => q >= 0 && !mask[q] && !silver(q));`,
);

s = s.replace(
`// Nearest-boundary fill: every hole pixel copies the closest pixel outside.`,
`// Bright, desaturated pixels are the earring itself: never copy those in.
const silver = (p) => {
  const r = data[p * 3];
  const g = data[p * 3 + 1];
  const b = data[p * 3 + 2];
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  return l > 185 && Math.max(r, g, b) - Math.min(r, g, b) < 32;
};

// Nearest-boundary fill: every hole pixel copies the closest pixel outside.`,
);

// Second pass for any pixel the first pass could not reach.
s = s.replace(
`const filled = Buffer.alloc(W * H * 3);`,
`for (let p = 0; p < W * H; p++) {
  if (mask[p] && src[p] === -1) {
    const x = p % W;
    const y = (p - x) / W;
    const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
    const k = nb.find((q) => q >= 0 && !mask[q]);
    if (k !== undefined) src[p] = k;
  }
}

const filled = Buffer.alloc(W * H * 3);`);

s = s.replace("94-nearest-blur.png", "98-heal2.png");
fs.writeFileSync(f, s);
console.log(s.includes("const silver") ? "ok" : "FAILED");
