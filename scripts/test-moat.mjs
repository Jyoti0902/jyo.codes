import sharp from "sharp";

async function testMoat() {
  const { data, info } = await sharp("public/momo/test_s00.png")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const W = info.width, H = info.height, C = info.channels;

  // 1. Mark character pixels (dark or saturated)
  const isChar = new Uint8Array(W * H);
  const queue = [];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * C;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const bright = (r + g + b) / 3;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx > 0 ? (mx - mn) / mx : 0;

      // Definite character pixel
      if (bright < 225 || (sat > 0.06 && bright < 248)) {
        isChar[y * W + x] = 1;
        queue.push((y * W + x));
      }
    }
  }

  console.log("Initial character seed pixels:", queue.length);

  // 2. BFS expand from character through white pixels where bright >= 247
  // The moat (shadow) has bright < 246, so BFS will stop at the outer edge of the white border!
  const inSticker = new Uint8Array(isChar);

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % W;
    const cy = Math.floor(curr / W);

    // 4 neighbors
    const neighbors = [
      [cx - 1, cy],
      [cx + 1, cy],
      [cx, cy - 1],
      [cx, cy + 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
        const npos = ny * W + nx;
        if (!inSticker[npos]) {
          const idx = npos * C;
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          const bright = (r + g + b) / 3;

          // If bright >= 247 (white sticker border), add to sticker!
          // Note: we also allow a max distance from character so it doesn't leak if there's a tiny gap
          if (bright >= 247) {
            inSticker[npos] = 1;
            queue.push(npos);
          }
        }
      }
    }
  }

  console.log("Total sticker pixels after expansion:", queue.length);

  // 3. Create transparent PNG
  const rgba = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const pos = y * W + x;
      const srcIdx = pos * C;
      const dstIdx = pos * 4;

      rgba[dstIdx] = data[srcIdx];
      rgba[dstIdx + 1] = data[srcIdx + 1];
      rgba[dstIdx + 2] = data[srcIdx + 2];
      rgba[dstIdx + 3] = inSticker[pos] ? 255 : 0;
    }
  }

  await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toFile("public/momo/test_cutout_00.png");

  console.log("Saved public/momo/test_cutout_00.png successfully!");
}

testMoat();

