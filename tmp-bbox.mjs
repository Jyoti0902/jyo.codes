import sharp from "sharp";
const SRC = "C:/Users/skumar1/Downloads/WhatsApp Image 2026-10-29 at 11.41.21 AM.jpeg";
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
console.log("size", W, H, C);
for (const win of [{ x0: 240, y0: 680, x1: 430, y1: 980, name: "left" }, { x0: 760, y0: 700, x1: 960, y1: 990, name: "right" }]) {
  let minX = 1e9, minY = 1e9, maxX = -1, maxY = -1, count = 0;
  for (let y = win.y0; y <= win.y1; y++) {
    for (let x = win.x0; x <= win.x1; x++) {
      const p = (y * W + x) * C;
      const r = data[p], g = data[p + 1], b = data[p + 2];
      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const s = mx ? ((mx - mn) / mx) * 100 : 0;
      if (l > 150 && s < 30) {
        count++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(win.name, "count", count, "bbox", minX, minY, maxX, maxY);
}
