import fs from "node:fs";
const file = "D:/Me/2026-Projects/jyo.codes/tmp-heal.mjs";
let src = fs.readFileSync(file, "utf8");

const start = src.indexOf("// Each earring hangs over hair");
const end = src.indexOf("const healed = Buffer.alloc");
if (start < 0 || end < 0) throw new Error("anchors not found");

const replacement = `// Grow the surrounding colours into the painted-out area (nearest-boundary
// fill), then smudge it vertically so hair keeps its strand direction.
const queue = new Int32Array(W * H);
const from = new Int32Array(W * H).fill(-1);
let head = 0;
let tail = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!masked[p]) continue;
    const neighbours = [
      x > 0 ? p - 1 : -1,
      x < W - 1 ? p + 1 : -1,
      y > 0 ? p - W : -1,
      y < H - 1 ? p + W : -1,
    ];
    const known = neighbours.find((q) => q >= 0 && !masked[q] && from[q] === -1);
    if (known === undefined) continue;
    from[p] = known;
    queue[tail++] = p;
  }
}
while (head < tail) {
  const p = queue[head++];
  const source = from[p];
  for (let c = 0; c < 3; c++) rgb[p * 3 + c] = rgb[source * 3 + c];
  const x = p % W;
  const y = (p - x) / W;
  const neighbours = [
    x > 0 ? p - 1 : -1,
    x < W - 1 ? p + 1 : -1,
    y > 0 ? p - W : -1,
    y < H - 1 ? p + W : -1,
  ];
  for (const q of neighbours) {
    if (q < 0 || !masked[q] || from[q] !== -1) continue;
    from[q] = p;
    queue[tail++] = q;
  }
}

for (let pass = 0; pass < 6; pass++) {
  const before = rgb.slice();
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!masked[p]) continue;
      for (let c = 0; c < 3; c++) {
        rgb[p * 3 + c] =
          (before[(p - W) * 3 + c] * 2 +
            before[(p + W) * 3 + c] * 2 +
            before[(p - 1) * 3 + c] +
            before[(p + 1) * 3 + c]) /
          6;
      }
    }
  }
}

`;

src = src.slice(0, start) + replacement + src.slice(end);
fs.writeFileSync(file, src);
console.log("patched");
