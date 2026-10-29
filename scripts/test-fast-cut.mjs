import sharp from "sharp";

async function testFastCut(srcPath, outPath, R = 13) {
  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;

  // 1. Identify character / prop pixels
  const isChar = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * C;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const bright = (r + g + b) / 3;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx > 0 ? (mx - mn) / mx : 0;

      // Character / prop pixel
      if (bright < 225 || (sat > 0.06 && bright < 248)) {
        isChar[y * W + x] = 1;
      }
    }
  }

  // 2. Fill any internal holes (e.g. eye whites, teeth, highlights)
  // Any pixel not reachable from the image borders through non-char pixels is internal!
  const isOutside = new Uint8Array(W * H);
  const outQueue = new Int32Array(W * H);
  let oHead = 0, oTail = 0;

  for (let x = 0; x < W; x++) {
    if (!isChar[x]) { isOutside[x] = 1; outQueue[oTail++] = x; }
    const bot = (H - 1) * W + x;
    if (!isChar[bot]) { isOutside[bot] = 1; outQueue[oTail++] = bot; }
  }
  for (let y = 0; y < H; y++) {
    const left = y * W;
    if (!isChar[left] && !isOutside[left]) { isOutside[left] = 1; outQueue[oTail++] = left; }
    const right = y * W + W - 1;
    if (!isChar[right] && !isOutside[right]) { isOutside[right] = 1; outQueue[oTail++] = right; }
  }

  while (oHead < oTail) {
    const curr = outQueue[oHead++];
    const cx = curr % W;
    const cy = Math.floor(curr / W);

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < W - 1 ? curr + 1 : -1,
      cy > 0 ? curr - W : -1,
      cy < H - 1 ? curr + W : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && !isChar[n] && !isOutside[n]) {
        isOutside[n] = 1;
        outQueue[oTail++] = n;
      }
    }
  }

  // Every pixel that is NOT outside is part of the character (including inside eye whites, teeth)
  for (let i = 0; i < W * H; i++) {
    if (!isOutside[i]) {
      isChar[i] = 1;
    }
  }

  // 3. BFS distance transform for dilation
  const dist = new Int16Array(W * H).fill(-1);
  const queue = new Int32Array(W * H);
  let head = 0, tail = 0;

  for (let i = 0; i < W * H; i++) {
    if (isChar[i]) {
      dist[i] = 0;
      queue[tail++] = i;
    }
  }

  while (head < tail) {
    const curr = queue[head++];
    const d = dist[curr];
    if (d >= R) continue;

    const cx = curr % W;
    const cy = Math.floor(curr / W);

    if (cx > 0 && dist[curr - 1] === -1) { dist[curr - 1] = d + 1; queue[tail++] = curr - 1; }
    if (cx < W - 1 && dist[curr + 1] === -1) { dist[curr + 1] = d + 1; queue[tail++] = curr + 1; }
    if (cy > 0 && dist[curr - W] === -1) { dist[curr - W] = d + 1; queue[tail++] = curr - W; }
    if (cy < H - 1 && dist[curr + W] === -1) { dist[curr + W] = d + 1; queue[tail++] = curr + W; }
  }

  // 4. Construct output RGBA buffer
  const rgba = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const pos = y * W + x;
      const srcIdx = pos * C;
      const dstIdx = pos * 4;
      const d = dist[pos];

      if (d === 0) {
        // Character pixel: exact original RGB, alpha 255
        rgba[dstIdx] = data[srcIdx];
        rgba[dstIdx + 1] = data[srcIdx + 1];
        rgba[dstIdx + 2] = data[srcIdx + 2];
        rgba[dstIdx + 3] = 255;
      } else if (d > 0 && d <= R - 2) {
        // Die-cut white border: crisp clean white, alpha 255
        rgba[dstIdx] = 255;
        rgba[dstIdx + 1] = 255;
        rgba[dstIdx + 2] = 255;
        rgba[dstIdx + 3] = 255;
      } else if (d === R - 1) {
        // Anti-aliased outer edge
        rgba[dstIdx] = 255;
        rgba[dstIdx + 1] = 255;
        rgba[dstIdx + 2] = 255;
        rgba[dstIdx + 3] = 190;
      } else if (d === R) {
        // Soft outer feather
        rgba[dstIdx] = 255;
        rgba[dstIdx + 1] = 255;
        rgba[dstIdx + 2] = 255;
        rgba[dstIdx + 3] = 75;
      } else {
        // Outside transparent
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;
      }
    }
  }

  // 5. Trim transparent margins so sticker is neatly bounded
  const trimmed = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .trim()
    .png()
    .toFile(outPath);

  console.log(`Saved ${outPath}: ${trimmed.width}x${trimmed.height}`);
}

async function run() {
  await testFastCut("public/momo/stickers/01-neutral.png", "public/momo/stickers/cut_01-neutral.png");
  await testFastCut("public/momo/stickers/10-sleepy-zzz.png", "public/momo/stickers/cut_10-sleepy-zzz.png");
}

run();

