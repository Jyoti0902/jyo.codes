import fs from "node:fs";
const f = "D:/Me/2026-Projects/jyo.codes/tmp-portrait.mjs";
let s = fs.readFileSync(f, "utf8");

// 1. feather the repair instead of a hard patch edge
s = s.replace(
`const healed = Buffer.alloc(W * H * 3);
for (let i = 0; i < healed.length; i++) healed[i] = Math.max(0, Math.min(255, Math.round(px[i])));`,
`// Feather the patch rim so no straight edge shows: full strength deep inside,
// fading out over the last 14 px.
const depth = new Int32Array(W * H);
for (let p = 0; p < W * H; p++) if (!hole[p]) depth[p] = 0;
const dq = new Int32Array(W * H);
let dh = 0;
let dt = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (!hole[p]) continue;
    const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
    if (nb.some((q) => q >= 0 && !hole[q])) {
      depth[p] = 1;
      dq[dt++] = p;
    }
  }
}
while (dh < dt) {
  const p = dq[dh++];
  const x = p % W;
  const y = (p - x) / W;
  const nb = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
  for (const q of nb) {
    if (q < 0 || !hole[q] || depth[q]) continue;
    depth[q] = depth[p] + 1;
    dq[dt++] = q;
  }
}

const healed = Buffer.alloc(W * H * 3);
for (let p = 0; p < W * H; p++) {
  if (!hole[p]) {
    for (let c = 0; c < 3; c++) healed[p * 3 + c] = data[p * C + c];
    continue;
  }
  const a = Math.min(1, depth[p] / 14);
  for (let c = 0; c < 3; c++) {
    const orig = data[p * C + c];
    healed[p * 3 + c] = Math.max(0, Math.min(255, Math.round(orig * (1 - a) + px[p * 3 + c] * a)));
  }
}`);

fs.writeFileSync(f, s);
console.log(s.includes("Feather the patch rim") ? "ok" : "FAILED");
