import fs from "node:fs";

const file = "D:/Me/2026-Projects/jyo.codes/tmp-heal.mjs";
let src = fs.readFileSync(file, "utf8");

const start = src.indexOf("// Seed the masked area");
const end = src.indexOf("const healed = Buffer.alloc");
if (start < 0 || end < 0) throw new Error("anchors not found");

const replacement = `// Each earring hangs over hair, so fill the patch with the hair directly
// above it: the strands line up and the lock reads as hair in front of the ear.
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!masked[p]) continue;
    let source = -1;
    for (let dy = 240; dy < 520 && source < 0; dy += 20) {
      const sy = y - dy;
      if (sy < 0) break;
      const q = sy * W + x;
      if (!masked[q]) source = q;
    }
    if (source < 0) continue;
    rgb[p * 3] = rgb[source * 3];
    rgb[p * 3 + 1] = rgb[source * 3 + 1];
    rgb[p * 3 + 2] = rgb[source * 3 + 2];
  }
}

// Soften the patch edges so the copied lock blends in.
for (let pass = 0; pass < 3; pass++) {
  const before = rgb.slice();
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!masked[p]) continue;
      for (let c = 0; c < 3; c++) {
        rgb[p * 3 + c] =
          (before[(p - 1) * 3 + c] +
            before[(p + 1) * 3 + c] +
            before[(p - W) * 3 + c] +
            before[(p + W) * 3 + c]) /
          4;
      }
    }
  }
}

`;

src = src.slice(0, start) + replacement + src.slice(end);
fs.writeFileSync(file, src);
console.log("patched");
